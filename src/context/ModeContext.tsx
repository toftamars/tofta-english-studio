import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { LearningMode } from "../types";
import { getModeMeta, LEARNING_MODES } from "../data/modes";
import { useAuth } from "./AuthContext";
import { useProgress } from "./ProgressContext";

const MODE_KEY = "tofta-active-mode";

interface ModeContextValue {
  mode: LearningMode;
  setMode: (mode: LearningMode) => void;
  modes: typeof LEARNING_MODES;
  modeMeta: ReturnType<typeof getModeMeta>;
  modeSelected: boolean;
}

const ModeContext = createContext<ModeContextValue | null>(null);

export function ModeProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { progress, setActiveMode } = useProgress();
  const [mode, setModeState] = useState<LearningMode>("work");
  const [modeSelected, setModeSelected] = useState(false);

  useEffect(() => {
    if (!user) {
      setModeSelected(false);
      return;
    }
    const fromProgress = progress?.activeMode;
    const fromStorage = (() => {
      try {
        return localStorage.getItem(`${MODE_KEY}:${user.profileId}`) as LearningMode | null;
      } catch {
        return null;
      }
    })();
    const initial = fromProgress ?? fromStorage ?? null;
    if (initial && LEARNING_MODES.some((m) => m.id === initial)) {
      setModeState(initial);
      setModeSelected(true);
    } else {
      setModeSelected(false);
    }
  }, [user, progress?.activeMode]);

  const setMode = useCallback(
    (next: LearningMode) => {
      setModeState(next);
      setModeSelected(true);
      if (user) {
        try {
          localStorage.setItem(`${MODE_KEY}:${user.profileId}`, next);
        } catch {
          /* yoksay */
        }
        setActiveMode(next);
      }
    },
    [user, setActiveMode],
  );

  const modeMeta = useMemo(() => getModeMeta(mode), [mode]);

  return (
    <ModeContext.Provider value={{ mode, setMode, modes: LEARNING_MODES, modeMeta, modeSelected }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used within ModeProvider");
  return ctx;
}
