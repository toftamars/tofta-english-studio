// ============================================================
// Ses Motoru — Modüler: Browser TTS + ElevenLabs (opsiyonel)
// ============================================================

export interface SpeakOptions {
  rate?: number;
  lang?: string;
  onEnd?: () => void;
}

export type VoiceEngine = "browser" | "elevenlabs";

const VOICE_KEY = "tofta-voice-name";
const RATE_KEY = "tofta-voice-rate";
const ENGINE_KEY = "tofta-voice-engine";
const QUOTA_KEY = "tofta-elevenlabs-chars";
const QUOTA_DAY_KEY = "tofta-elevenlabs-day";
const DAILY_CHAR_LIMIT = 8000;

const ELEVENLABS_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY as string | undefined;
const ELEVENLABS_VOICE = (import.meta.env.VITE_ELEVENLABS_VOICE_ID as string) || "21m00Tcm4TlvDq8ikWAM";

function scoreVoice(v: SpeechSynthesisVoice): number {
  const lang = v.lang || "";
  if (!/^en/i.test(lang)) return -1;
  const n = (v.name || "").toLowerCase();
  let s = 0;
  if (/en-gb/i.test(lang)) s += 3;
  else if (/en-us|en-au|en-ie/i.test(lang)) s += 2;
  else s += 1;
  if (/natural|neural/.test(n)) s += 8;
  if (/google/.test(n)) s += 6;
  if (/premium|enhanced/.test(n)) s += 5;
  if (/(samantha|karen|serena|sonia|libby|aria|jenny|ryan|daniel|moira|tessa|ava|zoe|allison|evan|nathan|kate|stephanie)/.test(n))
    s += 3;
  if (v.localService === false) s += 2;
  return s;
}

class BrowserVoiceProvider {
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (this.isSupported()) {
      const load = () => {
        this.voices = window.speechSynthesis.getVoices();
      };
      load();
      window.speechSynthesis.onvoiceschanged = load;
    }
  }

  isSupported() {
    return typeof window !== "undefined" && "speechSynthesis" in window;
  }

  englishVoices(): SpeechSynthesisVoice[] {
    if (!this.voices.length && this.isSupported()) this.voices = window.speechSynthesis.getVoices();
    return this.voices
      .map((v) => ({ v, s: scoreVoice(v) }))
      .filter((x) => x.s >= 0)
      .sort((a, b) => b.s - a.s)
      .map((x) => x.v);
  }

  private chooseVoice(): SpeechSynthesisVoice | undefined {
    const eng = this.englishVoices();
    const saved = typeof localStorage !== "undefined" ? localStorage.getItem(VOICE_KEY) : null;
    if (saved) {
      const match = eng.find((v) => v.name === saved) || this.voices.find((v) => v.name === saved);
      if (match) return match;
    }
    return eng[0];
  }

  rate(): number {
    const r = typeof localStorage !== "undefined" ? Number(localStorage.getItem(RATE_KEY)) : NaN;
    return r && r >= 0.5 && r <= 1.3 ? r : 0.95;
  }

  setRate(r: number) {
    try {
      localStorage.setItem(RATE_KEY, String(r));
    } catch {
      /* yoksay */
    }
  }

  setVoiceName(name: string) {
    try {
      localStorage.setItem(VOICE_KEY, name);
    } catch {
      /* yoksay */
    }
  }

  currentVoiceName(): string | null {
    return this.chooseVoice()?.name ?? null;
  }

  speak(text: string, opts: SpeakOptions = {}) {
    if (!this.isSupported()) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const voice = this.chooseVoice();
    u.lang = opts.lang || voice?.lang || "en-US";
    u.rate = opts.rate ?? this.rate();
    u.pitch = 1;
    if (voice) u.voice = voice;
    if (opts.onEnd) u.onend = opts.onEnd;
    window.speechSynthesis.speak(u);
  }

  speakSequence(lines: string[], opts: SpeakOptions = {}) {
    if (!this.isSupported()) return;
    window.speechSynthesis.cancel();
    const voice = this.chooseVoice();
    lines.forEach((line, i) => {
      const u = new SpeechSynthesisUtterance(line);
      u.lang = opts.lang || voice?.lang || "en-US";
      u.rate = opts.rate ?? this.rate();
      if (voice) u.voice = voice;
      if (i === lines.length - 1 && opts.onEnd) u.onend = opts.onEnd;
      window.speechSynthesis.speak(u);
    });
  }

  cancel() {
    if (this.isSupported()) window.speechSynthesis.cancel();
  }
}

function todayKey() {
  return new Date().toDateString();
}

export function getElevenLabsQuota(): { used: number; limit: number; remaining: number } {
  try {
    const day = localStorage.getItem(QUOTA_DAY_KEY);
    const used = day === todayKey() ? Number(localStorage.getItem(QUOTA_KEY) || 0) : 0;
    return { used, limit: DAILY_CHAR_LIMIT, remaining: Math.max(0, DAILY_CHAR_LIMIT - used) };
  } catch {
    return { used: 0, limit: DAILY_CHAR_LIMIT, remaining: DAILY_CHAR_LIMIT };
  }
}

function trackElevenLabsChars(n: number) {
  try {
    const day = todayKey();
    if (localStorage.getItem(QUOTA_DAY_KEY) !== day) {
      localStorage.setItem(QUOTA_DAY_KEY, day);
      localStorage.setItem(QUOTA_KEY, "0");
    }
    const used = Number(localStorage.getItem(QUOTA_KEY) || 0) + n;
    localStorage.setItem(QUOTA_KEY, String(used));
  } catch {
    /* yoksay */
  }
}

let elevenAudio: HTMLAudioElement | null = null;

async function speakElevenLabs(text: string, opts: SpeakOptions = {}): Promise<boolean> {
  if (!ELEVENLABS_KEY) return false;
  const quota = getElevenLabsQuota();
  if (text.length > quota.remaining) return false;

  try {
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": ELEVENLABS_KEY,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_turbo_v2_5",
        voice_settings: { stability: 0.5, similarity_boost: 0.75, speed: opts.rate ?? getSpeechRate() },
      }),
    });
    if (!res.ok) return false;
    const blob = await res.blob();
    trackElevenLabsChars(text.length);
    if (elevenAudio) {
      elevenAudio.pause();
      elevenAudio = null;
    }
    const url = URL.createObjectURL(blob);
    elevenAudio = new Audio(url);
    elevenAudio.onended = () => {
      URL.revokeObjectURL(url);
      opts.onEnd?.();
    };
    await elevenAudio.play();
    return true;
  } catch {
    return false;
  }
}

export function isElevenLabsAvailable(): boolean {
  return Boolean(ELEVENLABS_KEY);
}

export function getVoiceEngine(): VoiceEngine {
  if (!isElevenLabsAvailable()) return "browser";
  try {
    const v = localStorage.getItem(ENGINE_KEY);
    if (v === "elevenlabs" || v === "browser") return v;
  } catch {
    /* yoksay */
  }
  return "browser";
}

export function setVoiceEngine(engine: VoiceEngine) {
  try {
    localStorage.setItem(ENGINE_KEY, engine);
  } catch {
    /* yoksay */
  }
}

const browserProvider = new BrowserVoiceProvider();

export function speak(text: string, opts?: SpeakOptions) {
  if (getVoiceEngine() === "elevenlabs") {
    speakElevenLabs(text, opts).then((ok) => {
      if (!ok) browserProvider.speak(text, opts);
    });
    return;
  }
  browserProvider.speak(text, opts);
}

export function speakSequence(lines: string[], opts?: SpeakOptions) {
  browserProvider.speakSequence(lines, opts);
}

export function cancelSpeech() {
  browserProvider.cancel();
  if (elevenAudio) {
    elevenAudio.pause();
    elevenAudio = null;
  }
}

export function isSpeechSupported() {
  return browserProvider.isSupported();
}

export function listEnglishVoices(): SpeechSynthesisVoice[] {
  return browserProvider.englishVoices();
}
export function getPreferredVoiceName(): string | null {
  return browserProvider.currentVoiceName();
}
export function setPreferredVoiceName(name: string) {
  browserProvider.setVoiceName(name);
}
export function getSpeechRate(): number {
  return browserProvider.rate();
}
export function setSpeechRate(rate: number) {
  browserProvider.setRate(rate);
}

// ---------------- Konuşma Tanıma ----------------

type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((e: { error?: string }) => void) | null;
  onend: (() => void) | null;
}

export function isRecognitionSupported() {
  if (typeof window === "undefined") return false;
  return Boolean(
    (window as unknown as Record<string, unknown>).SpeechRecognition ||
      (window as unknown as Record<string, unknown>).webkitSpeechRecognition,
  );
}

export function getRecognitionErrorMessage(error?: string): string {
  switch (error) {
    case "not-allowed":
      return "Mikrofon izni reddedildi. Ayarlar → Safari/Chrome → Mikrofon iznini aç.";
    case "no-speech":
      return "Ses duyulmadı. Tekrar deneyin ve cihazı ağzınıza yaklaştırın.";
    case "network":
      return "Ağ hatası. Chrome/Edge kullanmayı deneyin.";
    case "aborted":
      return "Dinleme iptal edildi.";
    default:
      return "Mikrofon hatası. Chrome veya Edge ile tekrar deneyin.";
  }
}

export function createRecognizer(): SpeechRecognitionLike | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as Record<string, unknown>;
  const Ctor = (w.SpeechRecognition || w.webkitSpeechRecognition) as SpeechRecognitionCtor | undefined;
  if (!Ctor) return null;
  const rec = new Ctor();
  rec.lang = "en-US";
  rec.interimResults = false;
  rec.maxAlternatives = 1;
  return rec;
}

export { pronunciationScore, analyzePronunciation } from "./pronunciation";
export type { PronunciationAnalysis, WordScore } from "./pronunciation";
