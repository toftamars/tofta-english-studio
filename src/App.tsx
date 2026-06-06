import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Layout } from "./components/Layout";
import { LoginPage } from "./features/auth/LoginPage";
import { Dashboard } from "./features/dashboard/Dashboard";
import { LessonsList } from "./features/lessons/LessonsList";
import { LessonView } from "./features/lessons/LessonView";
import { SimulatorList } from "./features/simulator/SimulatorList";
import { SimulatorPlay } from "./features/simulator/SimulatorPlay";
import { ProgressPage } from "./features/progress/ProgressPage";
import { RadarPage } from "./features/radar/RadarPage";
import { CatalogPage } from "./features/catalog/CatalogPage";

function Protected({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <p className="animate-pulse font-serif text-2xl text-muted">Yükleniyor…</p>
      </div>
    );
  }
  if (!user) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export default function App() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/app" replace /> : <LoginPage />} />
      <Route
        path="/app"
        element={
          <Protected>
            <Layout />
          </Protected>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="lessons" element={<LessonsList />} />
        <Route path="lessons/:slug" element={<LessonView />} />
        <Route path="simulator" element={<SimulatorList />} />
        <Route path="simulator/:slug" element={<SimulatorPlay />} />
        <Route path="radar" element={<RadarPage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="progress" element={<ProgressPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
