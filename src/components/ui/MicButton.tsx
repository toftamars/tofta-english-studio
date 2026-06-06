import { useState } from "react";
import { Mic } from "lucide-react";
import {
  analyzePronunciation,
  createRecognizer,
  getRecognitionErrorMessage,
  isRecognitionSupported,
} from "../../lib/speech";
import type { PronunciationAnalysis } from "../../lib/pronunciation";
import { cn } from "../../lib/cn";

interface Props {
  target: string;
  onScore?: (score: number) => void;
  onAnalysis?: (analysis: PronunciationAnalysis) => void;
}

/** Mikrofonla telaffuz testi — kelime bazlı geri bildirim */
export function MicButton({ target, onScore, onAnalysis }: Props) {
  const [listening, setListening] = useState(false);
  const [result, setResult] = useState<PronunciationAnalysis & { heard: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const supported = isRecognitionSupported();

  if (!supported) {
    return <span className="text-xs text-muted">Mikrofon için Chrome veya Edge kullanın.</span>;
  }

  function start() {
    const rec = createRecognizer();
    if (!rec) return;
    setListening(true);
    setResult(null);
    setErrorMsg(null);
    rec.start();
    rec.onresult = (e) => {
      const heard = e.results[0][0].transcript;
      const analysis = analyzePronunciation(target, heard);
      setResult({ ...analysis, heard });
      onScore?.(analysis.overall);
      onAnalysis?.(analysis);
    };
    rec.onerror = (e) => {
      setErrorMsg(getRecognitionErrorMessage(e.error));
      setListening(false);
    };
    rec.onend = () => setListening(false);
  }

  return (
    <div className="flex flex-col gap-2" aria-live="polite">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={start}
          className={cn(
            "inline-flex min-h-[44px] items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition",
            listening
              ? "animate-pulse border-plum bg-plum text-white"
              : "border-cognac bg-paper text-cognac hover:bg-cognac hover:text-white",
          )}
        >
          <Mic size={15} />
          {listening ? "Dinliyorum…" : "Söyle"}
        </button>
        {result && (
          <span className={cn("text-sm", result.overall >= 70 ? "text-sage" : "text-plum")}>
            {result.overall >= 70 ? "Harika" : "Tekrar dene"} — %{result.overall}
          </span>
        )}
      </div>
      {errorMsg && <p className="text-xs text-plum">{errorMsg}</p>}
      {result && (
        <div className="text-xs text-muted">
          <p>Duyduğum: &quot;{result.heard}&quot;</p>
          {result.weakWords.length > 0 && (
            <p className="mt-1 text-plum">
              Zayıf kelimeler: <b>{result.weakWords.join(", ")}</b>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
