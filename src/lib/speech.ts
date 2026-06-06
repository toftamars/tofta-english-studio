// ============================================================
// Ses Motoru — Modüler tasarım
//  - Şimdi: tarayıcının yerleşik Web Speech API'si (ücretsiz)
//  - İleride: premium sağlayıcı (ör. ElevenLabs) buraya takılabilir.
//    VoiceProvider arayüzünü uygulayan yeni bir sınıf yazıp
//    `activeProvider` değişkenini değiştirmek yeterli olacak.
// ============================================================

export interface SpeakOptions {
  rate?: number;
  lang?: string;
  onEnd?: () => void;
}

const VOICE_KEY = "tofta-voice-name";
const RATE_KEY = "tofta-voice-rate";

/** İngilizce sesleri kaliteye göre puanlar (yüksek = daha doğal). */
function scoreVoice(v: SpeechSynthesisVoice): number {
  const lang = v.lang || "";
  if (!/^en/i.test(lang)) return -1;
  const n = (v.name || "").toLowerCase();
  let s = 0;
  if (/en-gb/i.test(lang)) s += 3;
  else if (/en-us|en-au|en-ie/i.test(lang)) s += 2;
  else s += 1;
  if (/natural|neural/.test(n)) s += 8; // Microsoft/Edge "Natural" sesleri en iyi
  if (/google/.test(n)) s += 6; // Chrome bulut sesleri
  if (/premium|enhanced/.test(n)) s += 5; // Apple gelişmiş sesler
  if (/(samantha|karen|serena|sonia|libby|aria|jenny|ryan|daniel|moira|tessa|ava|zoe|allison|evan|nathan|kate|stephanie)/.test(n))
    s += 3;
  if (v.localService === false) s += 2; // ağ sesleri genelde daha kaliteli
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

  /** Kaliteye göre sıralı İngilizce sesler. */
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

const browserProvider = new BrowserVoiceProvider();

export function speak(text: string, opts?: SpeakOptions) {
  browserProvider.speak(text, opts);
}

export function speakSequence(lines: string[], opts?: SpeakOptions) {
  browserProvider.speakSequence(lines, opts);
}

export function cancelSpeech() {
  browserProvider.cancel();
}

export function isSpeechSupported() {
  return browserProvider.isSupported();
}

// ---------------- Ses tercihleri (ayarlar için) ----------------

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

// ---------------- Konuşma Tanıma (telaffuz testi) ----------------

type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((e: unknown) => void) | null;
  onend: (() => void) | null;
}

export function isRecognitionSupported() {
  if (typeof window === "undefined") return false;
  return Boolean(
    (window as unknown as Record<string, unknown>).SpeechRecognition ||
      (window as unknown as Record<string, unknown>).webkitSpeechRecognition,
  );
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

function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Hedef cümleyle duyulan cümle arasındaki kelime örtüşme yüzdesi (0-100). */
export function pronunciationScore(target: string, heard: string): number {
  const wa = normalize(target).split(" ").filter(Boolean);
  if (!wa.length) return 0;
  const wb = new Set(normalize(heard).split(" "));
  const hit = wa.filter((w) => wb.has(w)).length;
  return Math.round((hit / wa.length) * 100);
}
