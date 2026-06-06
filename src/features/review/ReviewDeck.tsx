import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, RotateCcw } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import { useMode } from "../../context/ModeContext";
import { reviewsDueToday } from "../../lib/adaptive";
import { SpeakButton } from "../../components/ui/SpeakButton";
import { cn } from "../../lib/cn";

export function ReviewDeck() {
  const { progress, gradeReview } = useProgress();
  const { mode } = useMode();
  const due = useMemo(
    () => (progress?.adaptive ? reviewsDueToday(progress.adaptive, mode) : []),
    [progress?.adaptive, mode],
  );
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(0);

  const item = due[i];

  if (!progress?.adaptive || due.length === 0) {
    return (
      <div className="card-luxe p-5 text-sm text-muted">
        <p className="mb-1 flex items-center gap-2 font-serif text-lg text-espresso">
          <Brain size={18} /> Akıllı Tekrar
        </p>
        Bugün tekrar edilecek kart yok. Quiz veya kelimede yanlış yaptıkça burada belirir.
      </div>
    );
  }

  function answer(correct: boolean) {
    if (!item) return;
    gradeReview(item.id, correct);
    setFlipped(false);
    setDone((d) => d + 1);
    setI((idx) => (idx + 1 >= due.length ? 0 : idx + 1));
  }

  return (
    <div className="card-luxe flex flex-col gap-4 p-5">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 font-serif text-lg text-espresso">
          <Brain size={18} /> Akıllı Tekrar
        </p>
        <span className="text-xs text-muted">{due.length} kart · {done} cevaplandı</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={item.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
          <div
            role="button"
            tabIndex={0}
            onClick={() => setFlipped((f) => !f)}
            onKeyDown={(e) => e.key === "Enter" && setFlipped((f) => !f)}
            className="min-h-[100px] cursor-pointer rounded-2xl bg-cream/70 p-4 outline-none focus-visible:ring-2 focus-visible:ring-cognac"
          >
            <p className="font-serif text-xl text-espresso">{flipped ? item.back : item.front}</p>
            {!flipped && <p className="mt-1 text-xs text-muted">Cevabı görmek için dokun</p>}
          </div>
          <div className="mt-2 flex items-center gap-2">
            {item.speak && <SpeakButton text={item.speak} className="!px-3 !py-1.5 text-sm" />}
            <span className="text-xs text-muted capitalize">{item.kind}</span>
          </div>
        </motion.div>
      </AnimatePresence>
      {flipped && (
        <div className="flex gap-2">
          <button onClick={() => answer(false)} className="btn-ghost flex-1 border-plum text-plum">
            Tekrar çalış
          </button>
          <button onClick={() => answer(true)} className="btn-primary flex-1">
            Biliyorum ✓
          </button>
        </div>
      )}
      <Link to="/app/review" className={cn("text-center text-xs font-semibold text-cognac hover:underline")}>
        Tüm tekrar oturumunu aç →
      </Link>
    </div>
  );
}

/** Tam sayfa tekrar oturumu */
export function ReviewPage() {
  return (
    <div className="flex flex-col gap-5">
      <header>
        <p className="eyebrow">Spaced repetition</p>
        <h1 className="font-display text-4xl text-espresso">Akıllı Tekrar</h1>
        <p className="text-sm text-muted">Yanlış yaptığın kelime ve quizler burada — unutmadan tekrar edersin.</p>
      </header>
      <ReviewDeck />
      <button onClick={() => window.history.back()} className="btn-ghost self-start">
        <RotateCcw size={16} /> Geri
      </button>
    </div>
  );
}
