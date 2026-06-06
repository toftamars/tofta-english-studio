import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useProgress } from "../../context/ProgressContext";
import { useMode } from "../../context/ModeContext";
import { getScenarios } from "../../data";
import { cn } from "../../lib/cn";

export function SimulatorList() {
  const { user } = useAuth();
  const { progress } = useProgress();
  const { mode, modeMeta } = useMode();
  if (!user) return null;
  const cefr = progress?.adaptive?.cefrBand ?? "A2";
  const scenarios = getScenarios(user.profileId, mode, cefr);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="eyebrow">{modeMeta.label} mod</p>
        <h1 className="font-display text-4xl text-espresso">Simülatör</h1>
        <p className="text-muted">
          {scenarios.length} senaryo · sesli sohbet modu ile karşılıklı pratik.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {scenarios.map((s, i) => {
          const done = progress?.scenariosDone.includes(s.slug);
          return (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i }}
            >
              <Link
                to={`/app/simulator/${s.slug}`}
                className="card-luxe flex h-full flex-col gap-2 p-5 transition hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{s.emoji}</span>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-semibold",
                      s.kind === "manager" ? "bg-olive/15 text-olive" : "bg-cognac/15 text-cognac",
                    )}
                  >
                    {s.kind === "manager" ? "Yönetici" : "Müşteri"}
                  </span>
                </div>
                <span className="font-serif text-xl text-espresso">{s.titleTr}</span>
                <span className="text-sm text-muted">{s.descriptionTr}</span>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="text-xs text-muted">Zorluk: {"●".repeat(s.difficulty)}{"○".repeat(3 - s.difficulty)}</span>
                  {done && <span className="text-xs font-semibold text-sage">✓ Tamamlandı</span>}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
