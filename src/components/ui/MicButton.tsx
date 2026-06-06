import { useState } from "react";
import { Mic } from "lucide-react";
import { createRecognizer, isRecognitionSupported, pronunciationScore } from "../../lib/speech";
import { cn } from "../../lib/cn";

interface Props {
  target: string;
  onScore?: (score: number) => void;
}

/** Mikrofonla telaffuz testi. Hedef cümleyle örtüşme yüzdesi verir. */
export function MicButton({ target, onScore }: Props) {
  const [listening, setListening] = useState(false);
  const [result, setResult] = useState<{ score: number; heard: string } | null>(null);
  const supported = isRecognitionSupported();

  if (!supported) {
    return (
      <span className="text-xs text-muted">🎤 için Chrome kullanın</span>
    );
  }

  function start() {
    const rec = createRecognizer();
    if (!rec) return;
    setListening(true);
    setResult(null);
    rec.start();
    rec.onresult = (e) => {
      const heard = e.results[0][0].transcript;
      const score = pronunciationScore(target, heard);
      setResult({ score, heard });
      onScore?.(score);
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={start}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition",
          listening
            ? "animate-pulse border-plum bg-plum text-white"
            : "border-cognac bg-paper text-cognac hover:bg-cognac hover:text-white",
        )}
      >
        <Mic size={15} />
        {listening ? "Dinliyorum…" : "Söyle"}
      </button>
      {result && (
        <span className={cn("text-sm", result.score >= 70 ? "text-sage" : "text-plum")}>
          {result.score >= 70 ? "✓ Harika" : "Tekrar dene"} (%{result.score}) · duydum: "{result.heard}"
        </span>
      )}
    </div>
  );
}
