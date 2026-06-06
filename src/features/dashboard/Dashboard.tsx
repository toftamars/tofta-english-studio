import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Flame, Lightbulb, Sparkles, Theater, Type, X, Zap } from "lucide-react";
import { poolStats } from "../../lib/exercisePool";
import { useAuth } from "../../context/AuthContext";
import { useProgress } from "../../context/ProgressContext";
import { useMode } from "../../context/ModeContext";
import { getUnits, getScenarios, PROFILES, cefrLabel } from "../../data";
import { getWordOfDay } from "../../data/radar";
import { DailyBulletin } from "../radar/DailyBulletin";
import { StudyDeck } from "../study/StudyDeck";
import { ReviewDeck } from "../review/ReviewDeck";

const ONBOARD_KEY = "tofta-onboarded-v1";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Günaydın";
  if (h < 18) return "İyi günler";
  return "İyi akşamlar";
}

export function Dashboard() {
  const { user } = useAuth();
  const { progress, isUnitDone, level, completedUnits, totalUnits, reviewsDue } = useProgress();
  const { mode, modeMeta } = useMode();
  const [showTip, setShowTip] = useState(() => {
    try {
      return !localStorage.getItem(ONBOARD_KEY);
    } catch {
      return false;
    }
  });
  if (!user) return null;
  const profile = PROFILES[user.profileId];
  const cefr = progress?.adaptive?.cefrBand ?? "A2";
  const units = getUnits(user.profileId, mode, cefr);
  const scenarios = getScenarios(user.profileId, mode, cefr);
  const word = getWordOfDay();
  const drillStats = poolStats(user.profileId);

  const nextUnit = units.find((u) => !isUnitDone(u.slug)) ?? units[units.length - 1];
  const nextScenario =
    scenarios.find((s) => !(progress?.scenariosDone ?? []).includes(s.slug)) ?? scenarios[0];

  function dismissTip() {
    setShowTip(false);
    try {
      localStorage.setItem(ONBOARD_KEY, "1");
    } catch {
      /* yoksay */
    }
  }

  return (
    <div className="flex flex-col gap-7">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="eyebrow">{greeting()}, {profile.name}</p>
        <h1 className="font-display text-4xl text-espresso md:text-5xl">
          {modeMeta.emoji} {modeMeta.labelTr} modu · <span className="font-serif italic text-cognac">{cefrLabel(cefr)}</span>
        </h1>
        <p className="mt-1 text-sm text-muted">{modeMeta.descriptionTr}</p>
      </motion.div>

      {/* İlk giriş ipucu */}
      {showTip && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 rounded-2xl border border-gold/40 bg-gold/10 p-4"
        >
          <Lightbulb size={20} className="mt-0.5 shrink-0 text-cognac" />
          <div className="flex-1 text-sm text-espresso">
            <p className="font-semibold">Hoş geldin {profile.name}! 👋</p>
            <p className="text-ink/80">
              Her gün: <b>Günün kelimesi → alıştırma → bir ders → bir senaryo{reviewsDue > 0 ? " → tekrar" : ""}</b>.
              Mod değiştirmek için üstteki {modeMeta.label} etiketine dokun.
            </p>
          </div>
          <button onClick={dismissTip} aria-label="İpucunu kapat" className="rounded-full p-2 text-muted hover:text-cognac">
            <X size={18} />
          </button>
        </motion.div>
      )}

      {/* Bugünkü plan — tek net yol */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="card-luxe overflow-hidden"
      >
        <div className="flex flex-col gap-4 p-6">
          <div>
            <p className="eyebrow mb-1">Bugünkü planın · ~15 dk</p>
            <p className="font-serif text-2xl text-espresso">
              {nextUnit.emoji} {nextUnit.titleTr}
            </p>
            <p className="text-sm text-muted">{nextUnit.goalTr}</p>
          </div>
          <Link to={`/app/lessons/${nextUnit.slug}`} className="btn-primary min-h-[48px] w-full justify-center sm:w-auto sm:self-start">
            Bugünün dersini başla <ArrowRight size={18} />
          </Link>
          <div className="flex flex-wrap gap-2 border-t border-line pt-3">
            <Link to="/app/drill" className="chip min-h-[40px] items-center gap-1.5 hover:border-cognac">
              <Zap size={14} /> Alıştır · <b className="text-espresso">{drillStats.total}+</b> kelime
            </Link>
            <Link to="/app/radar" className="chip min-h-[40px] items-center gap-1.5 hover:border-cognac">
              <Type size={14} /> Kelime: <b className="text-espresso">{word.en}</b>
            </Link>
            {nextScenario && (
              <Link to={`/app/simulator/${nextScenario.slug}`} className="chip min-h-[40px] items-center gap-1.5 hover:border-cognac">
                <Theater size={14} /> Senaryo: {nextScenario.titleTr}
              </Link>
            )}
          </div>
        </div>
      </motion.div>

      {/* Günün özeti */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={<Flame className="text-cognac" />} label="Seri" value={`${progress?.streak ?? 0} gün`} />
        <StatCard icon={<Sparkles className="text-gold" />} label="Seviye" value={`Lv ${level.level} · ${level.title}`} />
        <StatCard icon={<span className="text-lg">📘</span>} label="Üniteler" value={`${completedUnits}/${totalUnits}`} />
      </div>

      {/* Günün LV Bülteni (Work modunda) */}
      {mode === "work" && <DailyBulletin />}

      {/* Akıllı tekrar */}
      <ReviewDeck />

      {/* Otomatik çalışma kartları */}
      {mode === "work" && <StudyDeck />}

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

      {/* Kelime & cümle merkezi */}
      <Link
        to="/app/drill"
        className="card-luxe flex items-center gap-4 bg-gradient-to-br from-cognac/90 to-cognacDeep p-6 text-white transition hover:-translate-y-0.5"
      >
        <Zap size={32} className="text-gold" />
        <div className="flex-1">
          <p className="font-serif text-2xl">Kelime & Cümle Merkezi</p>
          <p className="text-sm text-white/80">
            Ezberle · tamamla · eşleştir · sınırsız tur · {drillStats.total}+ havuz
          </p>
        </div>
        <ArrowRight />
      </Link>

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
