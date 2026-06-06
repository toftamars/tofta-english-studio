import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { LessonSectionKind, UserProgress } from "../types";
import { useAuth } from "./AuthContext";
import {
  defaultProgress,
  levelFromXp,
  progressRepo,
  XP_PER_SCENARIO,
  XP_PER_SECTION,
  XP_PER_UNIT_BONUS,
} from "../lib/storage";
import { getUnits } from "../data";

interface ProgressContextValue {
  progress: UserProgress | null;
  loading: boolean;
  level: ReturnType<typeof levelFromXp>;
  totalUnits: number;
  completedUnits: number;
  completeSection(unitSlug: string, kind: LessonSectionKind, totalSections: number): void;
  recordQuiz(unitSlug: string, score: number, totalSections: number): void;
  completeScenario(slug: string): void;
  isSectionDone(unitSlug: string, kind: LessonSectionKind): boolean;
  isUnitDone(unitSlug: string): boolean;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

const todayStr = () => new Date().toDateString();

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    if (!user) {
      setProgress(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    progressRepo.load(user.profileId, user.id).then((p) => {
      if (!active) return;
      setProgress(touchStreak(p));
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [user]);

  const persist = useCallback(
    (next: UserProgress) => {
      setProgress(next);
      if (user) progressRepo.save(next, user.id);
    },
    [user],
  );

  const totalUnits = user ? getUnits(user.profileId).length : 0;
  const completedUnits = progress
    ? Object.values(progress.units).filter((u) => u.completed).length
    : 0;

  const completeSection = useCallback(
    (unitSlug: string, kind: LessonSectionKind, totalSections: number) => {
      if (!progress) return;
      const next: UserProgress = structuredCloneSafe(progress);
      const unit = next.units[unitSlug] || { sections: {}, completed: false };
      const already = unit.sections[kind];
      unit.sections[kind] = true;
      if (!already) next.xp += XP_PER_SECTION;

      const doneCount = Object.values(unit.sections).filter(Boolean).length;
      if (doneCount >= totalSections && !unit.completed) {
        unit.completed = true;
        next.xp += XP_PER_UNIT_BONUS;
        awardBadge(next, `unit-${unitSlug}`);
      }
      next.units[unitSlug] = unit;
      recomputeBadges(next);
      persist(next);
    },
    [progress, persist],
  );

  const recordQuiz = useCallback(
    (unitSlug: string, score: number, totalSections: number) => {
      if (!progress) return;
      const next: UserProgress = structuredCloneSafe(progress);
      const unit = next.units[unitSlug] || { sections: {}, completed: false };
      const prevBest = unit.quizBest ?? 0;
      if (score > prevBest) unit.quizBest = score;
      if (!unit.sections.quiz) next.xp += XP_PER_SECTION;
      unit.sections.quiz = true;
      const doneCount = Object.values(unit.sections).filter(Boolean).length;
      if (doneCount >= totalSections && !unit.completed) {
        unit.completed = true;
        next.xp += XP_PER_UNIT_BONUS;
      }
      next.units[unitSlug] = unit;
      recomputeBadges(next);
      persist(next);
    },
    [progress, persist],
  );

  const completeScenario = useCallback(
    (slug: string) => {
      if (!progress) return;
      const next: UserProgress = structuredCloneSafe(progress);
      if (!next.scenariosDone.includes(slug)) {
        next.scenariosDone.push(slug);
        next.xp += XP_PER_SCENARIO;
        awardBadge(next, "first-scenario");
      }
      recomputeBadges(next);
      persist(next);
    },
    [progress, persist],
  );

  const isSectionDone = useCallback(
    (unitSlug: string, kind: LessonSectionKind) =>
      Boolean(progress?.units[unitSlug]?.sections[kind]),
    [progress],
  );

  const isUnitDone = useCallback(
    (unitSlug: string) => Boolean(progress?.units[unitSlug]?.completed),
    [progress],
  );

  const level = useMemo(() => levelFromXp(progress?.xp ?? 0), [progress?.xp]);

  return (
    <ProgressContext.Provider
      value={{
        progress,
        loading,
        level,
        totalUnits,
        completedUnits,
        completeSection,
        recordQuiz,
        completeScenario,
        isSectionDone,
        isUnitDone,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

function structuredCloneSafe(p: UserProgress): UserProgress {
  return JSON.parse(JSON.stringify(p));
}

function touchStreak(p: UserProgress): UserProgress {
  const today = todayStr();
  if (p.lastActiveDay === today) return p;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const next = { ...p };
  next.streak = p.lastActiveDay === yesterday ? (p.streak || 0) + 1 : 1;
  next.lastActiveDay = today;
  return next;
}

function awardBadge(p: UserProgress, badge: string) {
  if (!p.badges.includes(badge)) p.badges.push(badge);
}

function recomputeBadges(p: UserProgress) {
  const completed = Object.values(p.units).filter((u) => u.completed).length;
  if (completed >= 1) awardBadge(p, "first-unit");
  if (completed >= 5) awardBadge(p, "halfway");
  if (completed >= 10) awardBadge(p, "all-units");
  if ((p.streak || 0) >= 3) awardBadge(p, "streak-3");
  if ((p.streak || 0) >= 7) awardBadge(p, "streak-7");
  if (p.scenariosDone.length >= 5) awardBadge(p, "role-player");
  if (p.xp >= 300) awardBadge(p, "xp-300");
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}

// eslint-disable-next-line react-refresh/only-export-components
export { defaultProgress };
