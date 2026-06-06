import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useMode } from "./context/ModeContext";
import { Layout } from "./components/Layout";
import { LoginPage } from "./features/auth/LoginPage";
import { ModePickerPage } from "./features/modes/ModePickerPage";

const Dashboard = lazy(() => import("./features/dashboard/Dashboard").then((m) => ({ default: m.Dashboard })));
const LessonsList = lazy(() => import("./features/lessons/LessonsList").then((m) => ({ default: m.LessonsList })));
const LessonView = lazy(() => import("./features/lessons/LessonView").then((m) => ({ default: m.LessonView })));
const SimulatorList = lazy(() => import("./features/simulator/SimulatorList").then((m) => ({ default: m.SimulatorList })));
const SimulatorPlay = lazy(() => import("./features/simulator/SimulatorPlay").then((m) => ({ default: m.SimulatorPlay })));
const ProgressPage = lazy(() => import("./features/progress/ProgressPage").then((m) => ({ default: m.ProgressPage })));
const RadarPage = lazy(() => import("./features/radar/RadarPage").then((m) => ({ default: m.RadarPage })));
const CatalogPage = lazy(() => import("./features/catalog/CatalogPage").then((m) => ({ default: m.CatalogPage })));
const ReviewPage = lazy(() => import("./features/review/ReviewDeck").then((m) => ({ default: m.ReviewPage })));
const DrillPage = lazy(() => import("./features/drill/DrillPage").then((m) => ({ default: m.DrillPage })));

function PageLoader() {
  return (
    <div className="grid min-h-[40vh] place-items-center">
      <p className="animate-pulse font-serif text-xl text-muted">Yükleniyor…</p>
    </div>
  );
}

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

function ModeGate({ children }: { children: React.ReactNode }) {
  const { modeSelected } = useMode();
  const location = useLocation();
  if (!modeSelected && !location.pathname.includes("/app/modes")) {
    return <Navigate to="/app/modes" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  const { user } = useAuth();
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/app" replace /> : <LoginPage />} />
        <Route
          path="/app/modes"
          element={
            <Protected>
              <ModePickerPage />
            </Protected>
          }
        />
        <Route
          path="/app"
          element={
            <Protected>
              <ModeGate>
                <Layout />
              </ModeGate>
            </Protected>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="lessons" element={<LessonsList />} />
          <Route path="lessons/:slug" element={<LessonView />} />
          <Route path="drill" element={<DrillPage />} />
          <Route path="simulator" element={<SimulatorList />} />
          <Route path="simulator/:slug" element={<SimulatorPlay />} />
          <Route path="radar" element={<RadarPage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="progress" element={<ProgressPage />} />
          <Route path="review" element={<ReviewPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
