import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { BookOpen, LayoutDashboard, LogOut, Radar, Sparkles, Theater, TrendingUp } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import { PROFILES } from "../data";
import { ProgressRing } from "./ui/ProgressRing";
import { cn } from "../lib/cn";

const NAV = [
  { to: "/app", label: "Panel", icon: LayoutDashboard, end: true },
  { to: "/app/lessons", label: "Dersler", icon: BookOpen },
  { to: "/app/simulator", label: "Simülatör", icon: Theater },
  { to: "/app/radar", label: "Radar", icon: Radar },
  { to: "/app/progress", label: "Gelişim", icon: TrendingUp },
];

export function Layout() {
  const { user, signOut } = useAuth();
  const { level, completedUnits, totalUnits, progress } = useProgress();
  const navigate = useNavigate();
  if (!user) return null;
  const profile = PROFILES[user.profileId];

  return (
    <div className="relative min-h-screen md:grid md:grid-cols-[290px_1fr]">
      <div className="grain" />

      <aside className="z-10 flex flex-col gap-6 border-b border-line bg-paper/80 p-5 backdrop-blur md:sticky md:top-0 md:h-screen md:overflow-y-auto md:border-b-0 md:border-r">
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

        <nav className="flex gap-2 md:flex-col">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  "flex flex-1 items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition md:flex-none",
                  isActive ? "bg-espresso text-ivory shadow-soft" : "text-ink hover:bg-cream",
                )
              }
            >
              <Icon size={18} />
              <span className="hidden md:inline">{label}</span>
            </NavLink>
          ))}
        </nav>

        <button
          onClick={async () => {
            await signOut();
            navigate("/");
          }}
          className="mt-auto hidden items-center gap-2 rounded-2xl px-4 py-3 text-sm text-muted transition hover:bg-cream hover:text-ink md:flex"
        >
          <LogOut size={18} /> Çıkış
        </button>
      </aside>

      <main className="z-10 mx-auto w-full max-w-4xl px-4 py-8 md:px-10">
        <div className="mb-6 flex items-center gap-2 text-cognac md:hidden">
          <Sparkles size={16} />
          <span className="font-serif text-lg">Tofta English Studio</span>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
