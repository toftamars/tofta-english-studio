import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { BookOpen, LayoutDashboard, LogOut, Radar, RefreshCw, Settings, ShoppingBag, Sparkles, Theater, TrendingUp, Layers, Zap } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import { useMode } from "../context/ModeContext";
import { PROFILES, cefrLabel } from "../data";
import { ProgressRing } from "./ui/ProgressRing";
import { VoiceSettings } from "../features/settings/VoiceSettings";
import { cn } from "../lib/cn";

const NAV = [
  { to: "/app", label: "Panel", icon: LayoutDashboard, end: true },
  { to: "/app/lessons", label: "Dersler", icon: BookOpen },
  { to: "/app/drill", label: "Alıştır", icon: Zap },
  { to: "/app/simulator", label: "Simülatör", icon: Theater },
  { to: "/app/review", label: "Tekrar", icon: RefreshCw },
  { to: "/app/radar", label: "Radar", icon: Radar },
  { to: "/app/catalog", label: "Katalog", icon: ShoppingBag },
  { to: "/app/progress", label: "Gelişim", icon: TrendingUp },
];

export function Layout() {
  const { user, signOut } = useAuth();
  const { level, completedUnits, totalUnits, progress, reviewsDue } = useProgress();
  const { modeMeta, modeSelected } = useMode();
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);
  if (!user) return null;
  const profile = PROFILES[user.profileId];

  const cefr = progress?.adaptive?.cefrBand ?? "A2";

  async function handleSignOut() {
    await signOut();
    navigate("/");
  }

  return (
    <div className="relative min-h-screen md:grid md:grid-cols-[290px_1fr]">
      <div className="grain" />

      {/* Masaüstü kenar çubuğu */}
      <aside className="z-10 hidden flex-col gap-6 border-line bg-paper/80 p-5 backdrop-blur md:sticky md:top-0 md:flex md:h-screen md:overflow-y-auto md:border-r">
        <div className="flex items-center gap-3">
          <div
            className="grid h-12 w-12 place-items-center rounded-full font-serif text-2xl text-white"
            style={{ background: profile.accent }}
          >
            {profile.name[0]}
          </div>
          <div>
            <p className="font-serif text-xl leading-tight text-espresso">{profile.name}</p>
            <p className="text-xs text-muted">{profile.role}</p>
            <button
              type="button"
              onClick={() => navigate("/app/modes")}
              className="mt-1 inline-flex min-h-[32px] items-center gap-1 rounded-full bg-cream px-3 py-1 text-[11px] font-semibold text-cognac transition hover:bg-cognac/15"
              aria-label="Mod değiştir"
            >
              {modeMeta.emoji} {modeMeta.label} · {cefrLabel(cefr)} ↻
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <ProgressRing pct={level.pct} size={132}>
            <div>
              <p className="font-display text-2xl text-espresso">Lv {level.level}</p>
              <p className="text-[11px] uppercase tracking-wider text-cognac">{level.title}</p>
            </div>
          </ProgressRing>
          <div className="flex gap-2 text-xs">
            <span className="chip">🔥 {progress?.streak ?? 0} gün</span>
            <span className="chip">📘 {completedUnits}/{totalUnits}</span>
            <span className="chip">✦ {progress?.xp ?? 0} XP</span>
            {reviewsDue > 0 && <span className="chip text-cognac">🧠 {reviewsDue}</span>}
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                  isActive ? "bg-espresso text-ivory shadow-soft" : "text-ink hover:bg-cream",
                )
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-1">
          <button
            type="button"
            onClick={() => navigate("/app/modes")}
            className="flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium text-cognac transition hover:bg-cognac/10"
          >
            <Layers size={18} /> Mod değiştir
            {modeSelected && <span className="ml-auto text-xs text-muted">{modeMeta.label}</span>}
          </button>
          <button
            onClick={() => setSettingsOpen(true)}
            className="flex items-center gap-2 rounded-2xl px-4 py-3 text-sm text-muted transition hover:bg-cream hover:text-ink"
          >
            <Settings size={18} /> Ses Ayarları
          </button>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded-2xl px-4 py-3 text-sm text-muted transition hover:bg-cream hover:text-ink"
          >
            <LogOut size={18} /> Çıkış
          </button>
        </div>
      </aside>

      {/* Mobil üst başlık (ince) */}
      <header
        className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-line bg-paper/85 px-4 py-3 backdrop-blur md:hidden"
        style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
      >
        <button
          type="button"
          onClick={() => navigate("/app/modes")}
          className="flex min-w-0 flex-1 flex-col items-start gap-0.5 text-left"
          aria-label="Mod değiştir"
        >
          <span className="flex items-center gap-1.5 text-cognac">
            <Sparkles size={16} />
            <span className="font-serif text-lg leading-tight text-espresso">Tofta English</span>
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-cream px-2 py-0.5 text-[11px] font-semibold text-cognac">
            {modeMeta.emoji} {modeMeta.label} · {cefrLabel(cefr)} ↻
          </span>
        </button>
        <div className="flex shrink-0 items-center gap-1">
          <span className="chip text-xs">🔥 {progress?.streak ?? 0}</span>
          <button
            onClick={() => setSettingsOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-full text-muted transition hover:text-cognac"
            aria-label="Ses Ayarları"
          >
            <Settings size={20} />
          </button>
          <button
            onClick={handleSignOut}
            className="grid h-11 w-11 place-items-center rounded-full text-muted transition hover:text-cognac"
            aria-label="Çıkış"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <main className="z-10 mx-auto w-full max-w-4xl px-4 py-6 pb-28 md:px-10 md:py-8 md:pb-10">
        <Outlet />
      </main>

      {/* Mobil alt navigasyon barı (safe-area) */}
      <nav
        className="fixed inset-x-0 bottom-0 z-30 flex items-stretch border-t border-line bg-paper/95 backdrop-blur md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                "flex min-h-[56px] flex-1 flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium transition",
                isActive ? "text-cognac" : "text-muted hover:text-ink",
              )
            }
          >
            <Icon size={21} />
            <span className="leading-none">{label}</span>
          </NavLink>
        ))}
      </nav>

      <VoiceSettings open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}
