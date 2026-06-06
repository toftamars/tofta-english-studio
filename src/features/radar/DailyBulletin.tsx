import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Radar } from "lucide-react";
import type { RadarItem } from "../../types";
import { getWordOfDay } from "../../data/radar";
import { loadRadar } from "../../lib/radar";
import { SpeakButton } from "../../components/ui/SpeakButton";

// "Günün LV Bülteni" — Dashboard'da kompakt, mobil-öncelikli kart.
export function DailyBulletin() {
  const [top, setTop] = useState<RadarItem | null>(null);
  const word = getWordOfDay();

  useEffect(() => {
    let alive = true;
    loadRadar().then((d) => {
      if (alive) setTop(d.news[0] ?? null);
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 }}
      className="card-luxe overflow-hidden"
    >
      <div className="flex items-center justify-between gap-2 border-b border-line bg-cream/60 px-5 py-3">
        <span className="flex items-center gap-2 text-cognac">
          <Radar size={16} />
          <span className="eyebrow !mb-0">Günün LV Bülteni</span>
        </span>
        <Link to="/app/radar" className="text-xs font-semibold text-cognac hover:underline">
          Tümü →
        </Link>
      </div>

      <div className="flex flex-col gap-4 p-5">
        {/* Günün kelimesi */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-[11px] uppercase tracking-wider text-muted">Günün kelimesi</span>
          <span className="font-serif text-2xl text-espresso">{word.en}</span>
          <span className="text-sm text-muted">— {word.tr}</span>
          <SpeakButton text={word.en} label="" className="!px-2 !py-1" />
        </div>
        <p className="-mt-2 text-sm text-ink/80">{word.note}</p>

        {/* En güncel gelişme */}
        {top && (
          <a
            href={top.url}
            target="_blank"
            rel="noreferrer"
            className="group flex items-start gap-3 rounded-2xl bg-paper/70 p-3 ring-1 ring-line transition hover:ring-cognac/40"
          >
            <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-cream text-base">📰</span>
            <span className="min-w-0">
              <span className="block truncate text-xs text-muted">{top.source}</span>
              <span className="block font-medium leading-snug text-espresso group-hover:text-cognac">
                {top.title}
              </span>
            </span>
            <ArrowRight size={16} className="ml-auto mt-1 shrink-0 text-muted group-hover:text-cognac" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
