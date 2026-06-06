import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, X } from "lucide-react";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import {
  getElevenLabsQuota,
  getPreferredVoiceName,
  getSpeechRate,
  getVoiceEngine,
  isElevenLabsAvailable,
  listEnglishVoices,
  setPreferredVoiceName,
  setSpeechRate,
  setVoiceEngine,
  speak,
  type VoiceEngine,
} from "../../lib/speech";

const SAMPLE = "Welcome to Louis Vuitton. How may I help you today?";

export function VoiceSettings({ open, onClose }: { open: boolean; onClose: () => void }) {
  const trapRef = useFocusTrap(open);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [rate, setRate] = useState(0.95);
  const [engine, setEngine] = useState<VoiceEngine>("browser");
  const [quota, setQuota] = useState(getElevenLabsQuota());

  useEffect(() => {
    if (!open) return;
    setRate(getSpeechRate());
    setSelected(getPreferredVoiceName());
    setEngine(getVoiceEngine());
    setQuota(getElevenLabsQuota());
    let tries = 0;
    const tick = () => {
      const list = listEnglishVoices();
      setVoices(list);
      if (!getPreferredVoiceName() && list[0]) setSelected(list[0].name);
      if (list.length === 0 && tries < 10) {
        tries++;
        setTimeout(tick, 250);
      }
    };
    tick();
  }, [open]);

  if (!open) return null;

  function choose(name: string) {
    setSelected(name);
    setPreferredVoiceName(name);
    speak(SAMPLE);
  }
  function changeRate(r: number) {
    setRate(r);
    setSpeechRate(r);
  }
  function changeEngine(e: VoiceEngine) {
    setEngine(e);
    setVoiceEngine(e);
    setQuota(getElevenLabsQuota());
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-espresso/40 backdrop-blur-sm md:items-center" onClick={onClose}>
      <motion.div
        ref={trapRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-paper p-6 md:rounded-3xl"
        style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
        role="dialog"
        aria-label="Ses ayarları"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-serif text-2xl text-espresso">
            <Volume2 size={20} /> Ses Ayarları
          </h2>
          <button onClick={onClose} className="text-muted hover:text-cognac" aria-label="Kapat">
            <X size={20} />
          </button>
        </div>

        {isElevenLabsAvailable() && (
          <div className="mb-4">
            <p className="mb-2 text-sm font-medium text-espresso">Ses motoru</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => changeEngine("browser")}
                className={`flex-1 rounded-2xl border px-3 py-2 text-sm ${engine === "browser" ? "border-cognac bg-cognac/10" : "border-line"}`}
              >
                Tarayıcı (ücretsiz)
              </button>
              <button
                type="button"
                onClick={() => changeEngine("elevenlabs")}
                className={`flex-1 rounded-2xl border px-3 py-2 text-sm ${engine === "elevenlabs" ? "border-cognac bg-cognac/10" : "border-line"}`}
              >
                Premium (ElevenLabs)
              </button>
            </div>
            {engine === "elevenlabs" && (
              <p className="mt-2 text-xs text-muted">
                Günlük kota: {quota.used}/{quota.limit} karakter kaldı: {quota.remaining}
              </p>
            )}
          </div>
        )}

        <p className="mb-3 text-sm text-muted">
          Cihazındaki en doğal sesi seç. Listenin başındakiler genelde en kaliteli (Natural / Google / Premium).
        </p>

        {voices.length === 0 ? (
          <p className="rounded-2xl bg-cream p-4 text-sm text-muted">
            Ses bulunamadı. Chrome/Edge tarayıcısı genelde daha kaliteli sesler sunar.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {voices.slice(0, 12).map((v) => (
              <button
                key={v.name}
                onClick={() => choose(v.name)}
                className={
                  "flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition " +
                  (selected === v.name ? "border-cognac bg-cognac/10" : "border-line hover:border-cognac")
                }
              >
                <span>
                  <span className="block font-medium text-espresso">{v.name}</span>
                  <span className="block text-xs text-muted">{v.lang}</span>
                </span>
                {selected === v.name && <span className="text-cognac">✓</span>}
              </button>
            ))}
          </div>
        )}

        <div className="mt-5">
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="font-medium text-espresso">Konuşma hızı</span>
            <span className="text-muted">{rate.toFixed(2)}×</span>
          </div>
          <input
            type="range"
            min={0.7}
            max={1.2}
            step={0.05}
            value={rate}
            onChange={(e) => changeRate(Number(e.target.value))}
            className="w-full accent-cognac"
          />
        </div>

        <div className="mt-5 flex gap-2">
          <button onClick={() => speak(SAMPLE)} className="btn-ghost flex-1">
            <Volume2 size={16} /> Örnek dinle
          </button>
          <button onClick={onClose} className="btn-primary flex-1">
            Tamam
          </button>
        </div>
      </motion.div>
    </div>
  );
}
