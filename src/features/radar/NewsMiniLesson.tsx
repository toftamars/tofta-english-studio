import { useState } from "react";
import { motion } from "framer-motion";
import { Newspaper, Sparkles } from "lucide-react";
import type { RadarItem } from "../../types";
import { SpeakButton } from "../../components/ui/SpeakButton";
import { translateToTr } from "../../lib/translate";

/** Radar haberini 3 cümlelik mini derse çevirir */
export function NewsMiniLesson({ item }: { item: RadarItem }) {
  const [open, setOpen] = useState(false);
  const [tr, setTr] = useState<string | null>(null);

  const sentences = [
    `Have you heard about ${item.title.split(" ").slice(0, 6).join(" ")}?`,
    "It's part of our latest Maison news.",
    "Would you like to know more about this collection?",
  ];

  async function loadTr() {
    if (tr) return;
    const t = await translateToTr(item.title);
    if (t) setTr(t);
  }

  if (!open) {
    return (
      <button
        onClick={() => { setOpen(true); loadTr(); }}
        className="inline-flex items-center gap-1.5 rounded-full border border-cognac/30 bg-cognac/5 px-3 py-1.5 text-xs font-semibold text-cognac hover:bg-cognac/10"
      >
        <Sparkles size={13} /> Bu haberi 3 cümleyle anlat
      </button>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 rounded-2xl border border-line bg-cream/50 p-4">
      <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cognac">
        <Newspaper size={14} /> Mini ders — haberi anlat
      </p>
      {tr && <p className="mb-2 text-xs text-muted">Haber (TR): {tr}</p>}
      <ol className="flex flex-col gap-2">
        {sentences.map((s, i) => (
          <li key={i} className="flex items-start justify-between gap-2 rounded-xl bg-paper p-3 text-sm">
            <span className="text-espresso">{i + 1}. {s}</span>
            <SpeakButton text={s} label="" className="shrink-0 !px-2 !py-1" />
          </li>
        ))}
      </ol>
      <p className="mt-2 text-xs text-muted">Bu cümleleri sesli tekrar et — müşteriye haber anlatır gibi.</p>
    </motion.div>
  );
}
