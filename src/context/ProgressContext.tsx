import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { LearningMode, LessonSectionKind, QuizQuestion, UserProgress, VocabItem, DrillExercise } from "../types";
import { useAuth } from "./AuthContext";
import {
  defaultProgress,
  levelFromXp,
  progressRepo,
  XP_PER_SCENARIO,
  XP_PER_SECTION,
  XP_PER_UNIT_BONUS,
  XP_PER_DRILL_CORRECT,
} from "../lib/storage";
import {
  defaultAdaptive,
  gradeReviewItem,
  migrateProgress,
  recordListeningAdaptive,
  recordQuizAdaptive,
  recordScenarioAdaptive,
  recordVocabMiss,
  recordWritingAdaptive,
  recordDrillAdaptive,
  reviewsDueToday,
  unitsForMode,
} from "../lib/adaptive";
import { getUnits } from "../data";

interface ProgressContextValue {
  progress: UserProgress | null;
  loading: boolean;
  level: ReturnType<typeof levelFromXp>;
  totalUnits: number;
  completedUnits: number;
  reviewsDue: number;
  completeSection(unitSlug: string, kind: LessonSectionKind, totalSections: number, mode?: LearningMode): void;
  recordQuiz(
    unitSlug: string,
    score: number,
    totalSections: number,
    mode?: LearningMode,
    wrongQuestions?: QuizQuestion[],
  ): void;
  completeScenario(slug: string, mode?: LearningMode, pronunciationAvg?: number): void;
  recordListeningScore(scorePct: number, mode?: LearningMode): void;
  recordWritingDone(mode?: LearningMode): void;
  recordVocabWrong(items: VocabItem[], mode?: LearningMode): void;
  recordDrillAnswer(correct: boolean, exercise: DrillExercise, wrongText?: string): void;
  gradeReview(reviewId: string, correct: boolean): void;
  setActiveMode(mode: LearningMode): void;
  isSectionDone(unitSlug: string, kind: LessonSectionKind, mode?: LearningMode): boolean;
  isUnitDone(unitSlug: string, mode?: LearningMode): boolean;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

const todayStr = () => new Date().toDateString();

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeMode, setActiveModeState] = useState<LearningMode>("work");

  useEffect(() => {
    let alive = true;
    if (!user) {
      setProgress(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    progressRepo
      .load(user.profileId, user.id)
      .then((p) => {
        if (!alive) return;
        const migrated = migrateProgress(touchStreak(p));
        setProgress(migrated);
        setActiveModeState(migrated.activeMode ?? "work");
      })
      .catch((err) => {
        console.error("İlerleme yüklenemedi:", err);
        if (alive) {
          const d = touchStreak(defaultProgress(user.profileId));
          setProgress(d);
          setActiveModeState(d.activeMode ?? "work");
        }
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [user]);

  const persist = useCallback(
    (next: UserProgress) => {
      setProgress(next);
      if (user) progressRepo.save(next, user.id);
    },
    [user],
  );

  const modeUnits = useCallback(
    (p: UserProgress, mode: LearningMode) => {
      if (!p.unitsByMode) p.unitsByMode = { work: p.units ?? {}, daily: {}, social: {} };
      if (!p.unitsByMode[mode]) p.unitsByMode[mode] = {};
      return p.unitsByMode[mode]!;
    },
    [],
  );

  const cefr = progress?.adaptive?.cefrBand;

  const totalUnits = user
    ? getUnits(user.profileId, activeMode, cefr).length
    : 0;
  const completedUnits = progress
    ? Object.values(unitsForMode(progress, activeMode)).filter((u) => u.completed).length
    : 0;

  const completeSection = useCallback(
    (unitSlug: string, kind: LessonSectionKind, totalSections: number, mode: LearningMode = activeMode) => {
      if (!progress) return;
      const next: UserProgress = structuredCloneSafe(progress);
      const bucket = modeUnits(next, mode);
      const unit = bucket[unitSlug] || { sections: {}, completed: false };
      const already = unit.sections[kind];
      unit.sections[kind] = true;
      if (!already) next.xp += XP_PER_SECTION;

      const doneCount = Object.values(unit.sections).filter(Boolean).length;
      if (doneCount >= totalSections && !unit.completed) {
        unit.completed = true;
        next.xp += XP_PER_UNIT_BONUS;
        awardBadge(next, `unit-${unitSlug}`);
      }
      bucket[unitSlug] = unit;
      if (mode === "work") next.units = bucket;
      recomputeBadges(next);
      persist(next);
    },
    [progress, persist, activeMode, modeUnits],
  );

  const recordQuiz = useCallback(
    (
      unitSlug: string,
      score: number,
      totalSections: number,
      mode: LearningMode = activeMode,
      wrongQuestions: QuizQuestion[] = [],
    ) => {
      if (!progress) return;
      const next: UserProgress = structuredCloneSafe(progress);
      const bucket = modeUnits(next, mode);
      const unit = bucket[unitSlug] || { sections: {}, completed: false };
      const prevBest = unit.quizBest ?? 0;
      if (score > prevBest) unit.quizBest = score;
      if (!unit.sections.quiz) next.xp += XP_PER_SECTION;
      unit.sections.quiz = true;
      const doneCount = Object.values(unit.sections).filter(Boolean).length;
      if (doneCount >= totalSections && !unit.completed) {
        unit.completed = true;
        next.xp += XP_PER_UNIT_BONUS;
      }
      bucket[unitSlug] = unit;
      if (mode === "work") next.units = bucket;

      const adaptive = next.adaptive ?? defaultAdaptive();
      next.adaptive = recordQuizAdaptive(adaptive, mode, unitSlug, score, wrongQuestions);
      recomputeBadges(next);
      persist(next);
    },
    [progress, persist, activeMode, modeUnits],
  );

  const completeScenario = useCallback(
    (slug: string, mode: LearningMode = activeMode, pronunciationAvg = 65) => {
      if (!progress) return;
      const next: UserProgress = structuredCloneSafe(progress);
      if (!next.scenariosDone.includes(slug)) {
        next.scenariosDone.push(slug);
        next.xp += XP_PER_SCENARIO;
        awardBadge(next, "first-scenario");
      }
      const adaptive = next.adaptive ?? defaultAdaptive();
      next.adaptive = recordScenarioAdaptive(adaptive, mode, slug, pronunciationAvg);
      recomputeBadges(next);
      persist(next);
    },
    [progress, persist, activeMode],
  );

  const recordListeningScore = useCallback(
    (scorePct: number, mode: LearningMode = activeMode) => {
      if (!progress) return;
      const next: UserProgress = structuredCloneSafe(progress);
      next.adaptive = recordListeningAdaptive(next.adaptive ?? defaultAdaptive(), mode, scorePct);
      persist(next);
    },
    [progress, persist, activeMode],
  );

  const recordWritingDone = useCallback(
    (mode: LearningMode = activeMode) => {
      if (!progress) return;
      const next: UserProgress = structuredCloneSafe(progress);
      next.adaptive = recordWritingAdaptive(next.adaptive ?? defaultAdaptive(), mode);
      persist(next);
    },
    [progress, persist, activeMode],
  );

  const recordVocabWrong = useCallback(
    (items: VocabItem[], mode: LearningMode = activeMode) => {
      if (!progress) return;
      const next: UserProgress = structuredCloneSafe(progress);
      next.adaptive = recordVocabMiss(next.adaptive ?? defaultAdaptive(), mode, items);
      persist(next);
    },
    [progress, persist, activeMode],
  );

  const recordDrillAnswer = useCallback(
    (correct: boolean, exercise: DrillExercise, _wrongText?: string) => {
      if (!progress) return;
      const next: UserProgress = structuredCloneSafe(progress);
      if (correct) next.xp += XP_PER_DRILL_CORRECT;
      const front = exercise.speak ?? exercise.prompt;
      const back = exercise.answer;
      next.adaptive = recordDrillAdaptive(next.adaptive ?? defaultAdaptive(), activeMode, correct, front, back);
      persist(next);
    },
    [progress, persist, activeMode],
  );

  const gradeReview = useCallback(
    (reviewId: string, correct: boolean) => {
      if (!progress?.adaptive) return;
      const next: UserProgress = structuredCloneSafe(progress);
      const adaptive = next.adaptive!;
      const idx = adaptive.reviews.findIndex((r) => r.id === reviewId);
      if (idx < 0) return;
      const updated = gradeReviewItem(adaptive.reviews[idx], correct);
      if (updated) adaptive.reviews[idx] = updated;
      else adaptive.reviews.splice(idx, 1);
      if (correct) {
        adaptive.skills.vocab = Math.min(100, adaptive.skills.vocab + 2);
        adaptive.cefrBand = adaptive.skills.vocab >= 58 ? "B1" : adaptive.cefrBand;
      }
      adaptive.updatedAt = new Date().toISOString();
      persist(next);
    },
    [progress, persist],
  );

  const setActiveMode = useCallback(
    (mode: LearningMode) => {
      setActiveModeState(mode);
      if (!progress) return;
      const next = { ...progress, activeMode: mode };
      persist(next);
    },
    [progress, persist],
  );

  const isSectionDone = useCallback(
    (unitSlug: string, kind: LessonSectionKind, mode: LearningMode = activeMode) => {
      if (!progress) return false;
      return Boolean(unitsForMode(progress, mode)[unitSlug]?.sections[kind]);
    },
    [progress, activeMode],
  );

  const isUnitDone = useCallback(
    (unitSlug: string, mode: LearningMode = activeMode) => {
      if (!progress) return false;
      return Boolean(unitsForMode(progress, mode)[unitSlug]?.completed);
    },
    [progress, activeMode],
  );

  const level = useMemo(() => levelFromXp(progress?.xp ?? 0), [progress?.xp]);
  const reviewsDue = useMemo(
    () => (progress?.adaptive ? reviewsDueToday(progress.adaptive, activeMode).length : 0),
    [progress?.adaptive, activeMode],
  );

  return (
    <ProgressContext.Provider
      value={{
        progress,
        loading,
        level,
        totalUnits,
        completedUnits,
        reviewsDue,
        completeSection,
        recordQuiz,
        completeScenario,
        recordListeningScore,
        recordWritingDone,
        recordVocabWrong,
        recordDrillAnswer,
        gradeReview,
        setActiveMode,
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
  const allUnits = Object.values(p.unitsByMode ?? { work: p.units }).flatMap((m) => Object.values(m));
  const completed = allUnits.filter((u) => u.completed).length;
  if (completed >= 1) awardBadge(p, "first-unit");
  if (completed >= 5) awardBadge(p, "halfway");
  if (completed >= 18) awardBadge(p, "all-units");
  if ((p.streak || 0) >= 3) awardBadge(p, "streak-3");
  if ((p.streak || 0) >= 7) awardBadge(p, "streak-7");
  if (p.scenariosDone.length >= 5) awardBadge(p, "role-player");
  if (p.xp >= 300) awardBadge(p, "xp-300");
  if (p.adaptive?.cefrBand === "B1") awardBadge(p, "cefr-b1");
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}

export { defaultProgress };
