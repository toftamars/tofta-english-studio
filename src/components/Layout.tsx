import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { BookOpen, LayoutDashboard, LogOut, Radar, Settings, ShoppingBag, Sparkles, Theater, TrendingUp } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import { PROFILES } from "../data";
import { ProgressRing } from "./ui/ProgressRing";
import { VoiceSettings } from "../features/settings/VoiceSettings";
import { cn } from "../lib/cn";

const NAV = [
  { to: "/app", label: "Panel", icon: LayoutDashboard, end: true },
  { to: "/app/lessons", label: "Dersler", icon: BookOpen },
  { to: "/app/simulator", label: "Simülatör", icon: Theater },
  { to: "/app/radar", label: "Radar", icon: Radar },
  { to: "/app/catalog", label: "Katalog", icon: ShoppingBag },
  { to: "/app/progress", label: "Gelişim", icon: TrendingUp },
];

export function Layout() {
  const { user, signOut } = useAuth();
  const { level, completedUnits, totalUnits, progress } = useProgress();
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);
  if (!user) return null;
  const profile = PROFILES[user.profileId];

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
        <div className="flex items-center gap-2 text-cognac">
          <Sparkles size={16} />
          <span className="font-serif text-lg">Tofta English Studio</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="chip text-xs">🔥 {progress?.streak ?? 0}</span>
          <button onClick={() => setSettingsOpen(true)} className="text-muted transition hover:text-cognac" aria-label="Ses Ayarları">
            <Settings size={18} />
          </button>
          <button onClick={handleSignOut} className="text-muted transition hover:text-cognac" aria-label="Çıkış">
            <LogOut size={18} />
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
                "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium transition",
                isActive ? "text-cognac" : "text-muted hover:text-ink",
              )
            }
          >
            <Icon size={20} />
            <span className="leading-none">{label}</span>
          </NavLink>
        ))}
      </nav>

      <VoiceSettings open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}
