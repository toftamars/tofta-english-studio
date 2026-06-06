import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useProgress } from "../../context/ProgressContext";
import { useMode } from "../../context/ModeContext";
import { getUnits, cefrLabel } from "../../data";

export function LessonsList() {
  const { user } = useAuth();
  const { isUnitDone, progress } = useProgress();
  const { mode, modeMeta } = useMode();
  if (!user) return null;
  const cefr = progress?.adaptive?.cefrBand ?? "A2";
  const units = getUnits(user.profileId, mode, cefr);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="eyebrow">{modeMeta.label} mod · {cefrLabel(cefr)}</p>
        <h1 className="font-display text-4xl text-espresso">Dersler</h1>
        <p className="text-muted">{units.length} ünite · seviyene uygun içerik açık.</p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {units.map((u, i) => {
          const done = isUnitDone(u.slug, mode);
          return (
            <motion.div
              key={u.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.03 * i }}
            >
              <Link
                to={`/app/lessons/${u.slug}`}
                className="card-luxe flex h-full items-start gap-4 p-5 transition hover:-translate-y-0.5"
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-cream text-3xl">
                  {u.emoji}
                </span>
                <span className="flex-1">
                  <span className="block font-serif text-xl text-espresso">{u.titleTr}</span>
                  <span className="block text-xs uppercase tracking-wide text-cognac">{u.title}</span>
                  <span className="mt-1 block text-sm text-muted">{u.goalTr}</span>
                </span>
                {done && (
                  <span className="rounded-full bg-sage/15 px-2.5 py-1 text-xs font-semibold text-sage">✓</span>
                )}
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
