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
}

export interface VoiceProvider {
  speak(text: string, opts?: SpeakOptions): void;
  cancel(): void;
  isSupported(): boolean;
}

class BrowserVoiceProvider implements VoiceProvider {
  private preferred?: SpeechSynthesisVoice;

  constructor() {
    if (this.isSupported()) {
      const load = () => {
        const voices = window.speechSynthesis.getVoices();
        this.preferred =
          voices.find((v) => /en-GB/i.test(v.lang) && /female|Google|Libby|Sonia/i.test(v.name)) ||
          voices.find((v) => /en-US/i.test(v.lang)) ||
          voices.find((v) => /^en/i.test(v.lang));
      };
      load();
      window.speechSynthesis.onvoiceschanged = load;
    }
  }

  isSupported() {
    return typeof window !== "undefined" && "speechSynthesis" in window;
  }

  speak(text: string, opts: SpeakOptions = {}) {
    if (!this.isSupported()) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = opts.lang || "en-US";
    u.rate = opts.rate ?? 0.92;
    if (this.preferred) u.voice = this.preferred;
    window.speechSynthesis.speak(u);
  }

  speakSequence(lines: string[], opts: SpeakOptions = {}) {
    if (!this.isSupported()) return;
    window.speechSynthesis.cancel();
    for (const line of lines) {
      const u = new SpeechSynthesisUtterance(line);
      u.lang = opts.lang || "en-US";
      u.rate = opts.rate ?? 0.92;
      if (this.preferred) u.voice = this.preferred;
      window.speechSynthesis.speak(u);
    }
  }

  cancel() {
    if (this.isSupported()) window.speechSynthesis.cancel();
  }
}

const browserProvider = new BrowserVoiceProvider();

// İleride premium sağlayıcıya geçmek için bu satırı değiştirin.
const activeProvider: VoiceProvider = browserProvider;

export function speak(text: string, opts?: SpeakOptions) {
  activeProvider.speak(text, opts);
}

export function speakSequence(lines: string[], opts?: SpeakOptions) {
  browserProvider.speakSequence(lines, opts);
}

export function cancelSpeech() {
  activeProvider.cancel();
}

export function isSpeechSupported() {
  return activeProvider.isSupported();
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
