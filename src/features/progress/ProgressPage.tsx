import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useAuth } from "../../context/AuthContext";
import { useProgress } from "../../context/ProgressContext";
import { getUnits } from "../../data";
import { BADGES } from "../../data/badges";
import { ProgressRing } from "../../components/ui/ProgressRing";
import { cn } from "../../lib/cn";

export function ProgressPage() {
  const { user } = useAuth();
  const { progress, level, completedUnits, totalUnits } = useProgress();
  if (!user || !progress) return null;
  const units = getUnits(user.profileId);

  const chartData = units.map((u) => {
    const up = progress.units[u.slug];
    const sections = up ? Object.values(up.sections).filter(Boolean).length : 0;
    return { name: `#${u.id}`, Bölümler: sections, Quiz: up?.quizBest ? Math.round(up.quizBest / 20) : 0 };
  });

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="eyebrow">İlerleme</p>
        <h1 className="font-display text-4xl text-espresso">Gelişimin</h1>
      </header>

      <div className="grid gap-4 md:grid-cols-[auto_1fr]">
        <div className="card-luxe flex flex-col items-center justify-center gap-2 p-6">
          <ProgressRing pct={level.pct} size={150}>
            <div>
              <p className="font-display text-3xl text-espresso">Lv {level.level}</p>
              <p className="text-xs uppercase tracking-wider text-cognac">{level.title}</p>
            </div>
          </ProgressRing>
          <p className="text-sm text-muted">{level.current} / {level.needed} XP · sonraki seviye</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Stat label="Toplam XP" value={`${progress.xp}`} />
          <Stat label="Günlük seri" value={`${progress.streak} 🔥`} />
          <Stat label="Tamamlanan ünite" value={`${completedUnits}/${totalUnits}`} />
          <Stat label="Simülasyon" value={`${progress.scenariosDone.length}`} />
        </div>
      </div>

      <div className="card-luxe p-6">
        <h2 className="mb-4 font-serif text-2xl text-espresso">Ünite bazında ilerleme</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2d6c2" />
              <XAxis dataKey="name" stroke="#8a7868" fontSize={12} />
              <YAxis stroke="#8a7868" fontSize={12} allowDecimals={false} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "1px solid #e2d6c2", background: "#fbf8f1" }}
              />
              <Bar dataKey="Bölümler" fill="#9c5a3c" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Quiz" fill="#b08a4a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

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
