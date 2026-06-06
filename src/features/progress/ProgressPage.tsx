import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProgress } from "../../context/ProgressContext";
import { useMode } from "../../context/ModeContext";
import { getUnits, cefrLabel } from "../../data";
import { BADGES } from "../../data/badges";
import { cefrProgress } from "../../lib/adaptive";
import { ProgressRing } from "../../components/ui/ProgressRing";
import { cn } from "../../lib/cn";

const SKILL_LABELS: Record<string, string> = {
  speaking: "Konuşma",
  listening: "Dinleme",
  vocab: "Kelime",
  grammar: "Dilbilgisi",
  writing: "Yazma",
};

export function ProgressPage() {
  const { user } = useAuth();
  const { progress, level, completedUnits, totalUnits } = useProgress();
  const { mode, modeMeta } = useMode();
  if (!user || !progress) return null;
  const cefr = progress.adaptive?.cefrBand ?? "A2";
  const skills = progress.adaptive?.skills;
  const units = getUnits(user.profileId, mode, cefr);

  const skillData = skills
    ? Object.entries(skills).map(([k, v]) => ({ name: SKILL_LABELS[k] ?? k, Puan: v }))
    : [];

  const chartData = units.map((u) => {
    const bucket = progress.unitsByMode?.[mode] ?? progress.units;
    const up = bucket[u.slug];
    const sections = up ? Object.values(up.sections).filter(Boolean).length : 0;
    return { name: u.titleTr.slice(0, 12), Bölümler: sections, Quiz: up?.quizBest ? Math.round(up.quizBest / 20) : 0 };
  });

  const cefrPct = skills ? cefrProgress(skills, cefr) : 0;

  const drillHistory = aggregateDrillHistory(progress.adaptive?.history ?? []);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="eyebrow">{modeMeta.label} mod · Gelişim</p>
        <h1 className="font-display text-4xl text-espresso">Seviyen ve ilerlemen</h1>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Gerçek dil seviyesi (CEFR) */}
        <div className="card-luxe flex flex-col items-center gap-3 p-6">
          <p className="text-xs uppercase tracking-wider text-muted">Gerçek dil seviyen</p>
          <ProgressRing pct={cefrPct} size={140}>
            <div className="text-center">
              <p className="font-display text-3xl text-espresso">{cefr}</p>
              <p className="text-[11px] text-cognac">{cefrLabel(cefr)}</p>
            </div>
          </ProgressRing>
          <p className="text-center text-sm text-muted">
            Sonraki seviyeye <b className="text-espresso">%{cefrPct}</b> — quiz, konuşma ve dinleme seni yükseltir.
          </p>
          <p className="rounded-xl bg-cream/80 px-3 py-2 text-center text-xs text-muted">
            Bu <b>tahmini</b> seviyedir (resmi CEFR sınavı değil). Quiz, simülatör, alıştırma ve tekrar kartları becerilerini günceller.
          </p>
          <Link to="/app/modes" className="text-xs font-semibold text-cognac hover:underline">
            Mod değiştir →
          </Link>
        </div>

        {/* Oyun seviyesi (XP) */}
        <div className="card-luxe flex flex-col items-center gap-3 p-6">
          <p className="text-xs uppercase tracking-wider text-muted">Oyun seviyesi (XP)</p>
          <ProgressRing pct={level.pct} size={140}>
            <div className="text-center">
              <p className="font-display text-3xl text-espresso">Lv {level.level}</p>
              <p className="text-[11px] text-cognac">{level.title}</p>
            </div>
          </ProgressRing>
          <p className="text-sm text-muted">{level.current} / {level.needed} XP</p>
        </div>
      </div>

      {skillData.length > 0 && (
        <div className="card-luxe p-6">
          <h2 className="mb-4 font-serif text-2xl text-espresso">Beceri haritası</h2>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillData} layout="vertical" margin={{ left: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2d6c2" />
                <XAxis type="number" domain={[0, 100]} stroke="#8a7868" fontSize={12} />
                <YAxis type="category" dataKey="name" width={80} stroke="#8a7868" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2d6c2", background: "#fbf8f1" }} />
                <Bar dataKey="Puan" fill="#9c5a3c" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Toplam XP" value={`${progress.xp}`} />
        <Stat label="Seri" value={`${progress.streak} 🔥`} />
        <Stat label="Ünite ({modeMeta.labelTr})" value={`${completedUnits}/${totalUnits}`} />
        <Stat label="Simülasyon" value={`${progress.scenariosDone.length}`} />
      </div>

      {drillHistory.length > 0 && (
        <div className="card-luxe p-6">
          <h2 className="mb-4 font-serif text-2xl text-espresso">Haftalık alıştırma</h2>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={drillHistory} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2d6c2" />
                <XAxis dataKey="name" stroke="#8a7868" fontSize={11} />
                <YAxis stroke="#8a7868" fontSize={12} domain={[0, 100]} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2d6c2", background: "#fbf8f1" }} />
                <Bar dataKey="Ortalama" fill="#6b4c3b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {chartData.length > 0 && (
        <div className="card-luxe p-6">
          <h2 className="mb-4 font-serif text-2xl text-espresso">Mod içi ilerleme</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2d6c2" />
                <XAxis dataKey="name" stroke="#8a7868" fontSize={11} />
                <YAxis stroke="#8a7868" fontSize={12} allowDecimals={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2d6c2", background: "#fbf8f1" }} />
                <Bar dataKey="Bölümler" fill="#9c5a3c" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Quiz" fill="#b08a4a" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="card-luxe p-6">
        <h2 className="mb-4 font-serif text-2xl text-espresso">Rozetler</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {BADGES.map((b) => {
            const earned = progress.badges.includes(b.id);
            return (
              <div
                key={b.id}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-2xl border p-4 text-center transition",
                  earned ? "border-gold bg-gold/10" : "border-line bg-paper opacity-50 grayscale",
                )}
              >
                <span className="text-3xl">{b.emoji}</span>
                <span className="text-sm font-semibold text-espresso">{b.title}</span>
                <span className="text-xs text-muted">{b.descTr}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card-luxe flex flex-col justify-center p-5">
      <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
      <p className="font-display text-3xl text-espresso">{value}</p>
    </div>
  );
}

function aggregateDrillHistory(history: { date: string; kind: string; score: number }[]) {
  const byDay = new Map<string, { total: number; count: number }>();
  for (const h of history.filter((x) => x.kind === "drill")) {
    const day = h.date.slice(0, 10);
    const cur = byDay.get(day) ?? { total: 0, count: 0 };
    byDay.set(day, { total: cur.total + h.score, count: cur.count + 1 });
  }
  return Array.from(byDay.entries())
    .slice(-7)
    .map(([day, { total, count }]) => ({
      name: day.slice(5),
      Ortalama: Math.round(total / count),
    }));
}
