import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Flame, Sparkles, Theater } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useProgress } from "../../context/ProgressContext";
import { getUnits, getScenarios, PROFILES } from "../../data";
import { DailyBulletin } from "../radar/DailyBulletin";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Günaydın";
  if (h < 18) return "İyi günler";
  return "İyi akşamlar";
}

export function Dashboard() {
  const { user } = useAuth();
  const { progress, isUnitDone, level, completedUnits, totalUnits } = useProgress();
  if (!user) return null;
  const profile = PROFILES[user.profileId];
  const units = getUnits(user.profileId);
  const scenarios = getScenarios(user.profileId);

  const nextUnit = units.find((u) => !isUnitDone(u.slug)) ?? units[units.length - 1];

  return (
    <div className="flex flex-col gap-7">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="eyebrow">{greeting()}, {profile.name}</p>
        <h1 className="font-display text-4xl text-espresso md:text-5xl">
          Bugün 15 dakika, <span className="font-serif italic text-cognac">bir adım daha ileri.</span>
        </h1>
      </motion.div>

      {/* Günün özeti */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={<Flame className="text-cognac" />} label="Seri" value={`${progress?.streak ?? 0} gün`} />
        <StatCard icon={<Sparkles className="text-gold" />} label="Seviye" value={`Lv ${level.level} · ${level.title}`} />
        <StatCard icon={<span className="text-lg">📘</span>} label="Üniteler" value={`${completedUnits}/${totalUnits}`} />
      </div>

      {/* Günün LV Bülteni */}
      <DailyBulletin />

      {/* Devam et */}
      {nextUnit && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-luxe overflow-hidden"
        >
          <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="eyebrow mb-1">Kaldığın yerden devam et</p>
              <p className="font-serif text-2xl text-espresso">
                {nextUnit.emoji} {nextUnit.titleTr}
              </p>
              <p className="text-sm text-muted">{nextUnit.goalTr}</p>
            </div>
            <Link to={`/app/lessons/${nextUnit.slug}`} className="btn-primary shrink-0">
              Derse başla <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      )}

      {/* Üniteler ızgarası */}
      <section>
        <h2 className="mb-3 font-serif text-2xl text-espresso">Dersler</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {units.map((u, i) => {
            const done = isUnitDone(u.slug);
            return (
              <motion.div
                key={u.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.03 * i }}
              >
                <Link
                  to={`/app/lessons/${u.slug}`}
                  className="card-luxe flex items-center gap-4 p-4 transition hover:-translate-y-0.5"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cream text-2xl">
                    {u.emoji}
                  </span>
                  <span className="flex-1">
                    <span className="block font-medium text-espresso">{u.titleTr}</span>
                    <span className="block text-xs text-muted">{u.title}</span>
                  </span>
                  {done ? (
                    <span className="rounded-full bg-sage/15 px-2.5 py-1 text-xs font-semibold text-sage">✓</span>
                  ) : (
                    <span className="text-xs text-muted">#{u.id}</span>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Simülatör vurgusu */}
      <Link
        to="/app/simulator"
        className="card-luxe flex items-center gap-4 bg-gradient-to-br from-espresso to-mocha p-6 text-ivory transition hover:-translate-y-0.5"
      >
        <Theater size={32} className="text-gold" />
        <div className="flex-1">
          <p className="font-serif text-2xl">Rol-Yapma Simülatörü</p>
          <p className="text-sm text-ivory/70">
            Gerçek müşteri ve yönetici diyaloglarını oyna · {scenarios.length} senaryo
          </p>
        </div>
        <ArrowRight />
      </Link>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="card-luxe flex items-center gap-3 p-4">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cream">{icon}</div>
      <div>
        <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
        <p className="font-serif text-lg text-espresso">{value}</p>
      </div>
    </div>
  );
}
