import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap, RotateCcw } from "lucide-react";
import type { StudyCard } from "../../types";
import { listProducts } from "../../lib/products";
import { listNotes } from "../../lib/radarNotes";
import { generateStudyCards } from "../../lib/generateCards";
import { SpeakButton } from "../../components/ui/SpeakButton";
import { cn } from "../../lib/cn";

export function StudyDeck() {
  const [cards, setCards] = useState<StudyCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [i, setI] = useState(0);

  useEffect(() => {
    Promise.all([listProducts(), listNotes()])
      .then(([products, notes]) => setCards(generateStudyCards(products, notes)))
      .catch((err) => console.error("Çalışma kartları hazırlanamadı:", err))
      .finally(() => setLoading(false));
  }, []);

  const card = cards[i];

  if (loading) return <p className="animate-pulse text-sm text-muted">Kartlar hazırlanıyor…</p>;

  if (cards.length === 0) {
    return (
      <div className="card-luxe p-5 text-sm text-muted">
        <p className="mb-1 flex items-center gap-2 font-serif text-lg text-espresso">
          <GraduationCap size={18} /> Çalışma Kartların
        </p>
        Katalog'a ürün veya Radar'a atölye notu ekledikçe burada otomatik quiz ve diyalog kartları belirir.
      </div>
    );
  }

  return (
    <div className="card-luxe flex flex-col gap-4 p-5">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 font-serif text-lg text-espresso">
          <GraduationCap size={18} /> Çalışma Kartların
        </p>
        <span className="text-xs text-muted">
          {i + 1} / {cards.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={card.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.2 }}
        >
          <CardBody card={card} />
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between pt-1">
        <span className="rounded-full bg-cream px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-cognac">
          {card.kind === "flashcard" ? "Kelime" : card.kind === "quiz" ? "Quiz" : "Diyalog"} · {card.topic}
        </span>
        <button
          onClick={() => setI((p) => (p + 1) % cards.length)}
          className="btn-primary !px-4 !py-2 text-sm"
        >
          {i + 1 === cards.length ? (
            <>
              <RotateCcw size={15} /> Baştan
            </>
          ) : (
            "Sonraki"
          )}
        </button>
      </div>
    </div>
  );
}

function CardBody({ card }: { card: StudyCard }) {
  const [flipped, setFlipped] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);

  // kart değişince yerel durumu sıfırla
  useEffect(() => {
    setFlipped(false);
    setPicked(null);
  }, [card.id]);

  if (card.kind === "quiz" && card.options) {
    return (
      <div className="flex flex-col gap-3">
        <p className="font-serif text-xl text-espresso">{card.front}</p>
        <div className="grid gap-2">
          {card.options.map((opt, idx) => {
            const isAnswer = idx === card.answerIndex;
            const show = picked !== null;
            return (
              <button
                key={idx}
                onClick={() => picked === null && setPicked(idx)}
                className={cn(
                  "rounded-2xl border px-4 py-3 text-left text-sm transition",
                  !show && "border-line hover:border-cognac",
                  show && isAnswer && "border-green-600 bg-green-50 text-green-800",
                  show && !isAnswer && picked === idx && "border-cognac bg-cognac/10 text-cognac",
                  show && !isAnswer && picked !== idx && "border-line opacity-60",
                )}
              >
                {opt}
              </button>
            );
          })}
        </div>
        {picked !== null && (
          <div className="flex items-center gap-2">
            <SpeakButton text={card.speak || card.front} label="Dinle" className="!px-3 !py-1.5" />
            <span className="text-xs text-muted">
              {picked === card.answerIndex ? "Doğru! 👏" : `Doğru cevap: ${card.back}`}
            </span>
          </div>
        )}
      </div>
    );
  }

  if (card.kind === "dialogue" && card.dialogue) {
    return (
      <div className="flex flex-col gap-3">
        <p className="font-serif text-lg text-espresso">{card.front}</p>
        <div className="flex flex-col gap-2">
          {card.dialogue.map((line, idx) => (
            <div key={idx} className="rounded-2xl bg-cream/70 p-3">
              <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wide text-cognac">{line.speaker}</p>
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm text-ink/90">{line.text}</p>
                <SpeakButton text={line.text} label="" className="!px-2 !py-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // flashcard
  const flip = () => setFlipped((f) => !f);
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={flip}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          flip();
        }
      }}
      className="flex min-h-[120px] w-full cursor-pointer flex-col items-start gap-2 rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-cognac"
      aria-label="Çalışma kartı — çevirmek için dokun"
    >
      <div className="flex w-full items-center justify-between gap-2">
        <p className="font-serif text-2xl text-espresso">{card.front}</p>
        <SpeakButton text={card.speak || card.front} label="" className="!px-2 !py-1" />
      </div>
      {flipped ? (
        <p className="text-sm text-ink/85">{card.back}</p>
      ) : (
        <p className="text-xs text-muted">Çevirmek için dokun ↺</p>
      )}
    </div>
  );
}
