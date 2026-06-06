import type {
  AdaptiveState,
  CefrBand,
  LearningMode,
  QuizQuestion,
  ReviewItem,
  SkillScores,
  UserProgress,
  VocabItem,
} from "../types";
import { CEFR_ORDER } from "../data/modes";

const DAY_MS = 86400000;

export function defaultSkills(): SkillScores {
  return { speaking: 35, listening: 35, vocab: 35, grammar: 35, writing: 30 };
}

export function defaultAdaptive(): AdaptiveState {
  return {
    cefrBand: "A2",
    skills: defaultSkills(),
    reviews: [],
    history: [],
    updatedAt: new Date().toISOString(),
  };
}

/** Eski progress blob'unu yeni yapıya taşır */
export function migrateProgress(p: UserProgress): UserProgress {
  const next = { ...p };
  if (!next.adaptive) next.adaptive = defaultAdaptive();
  if (!next.unitsByMode) {
    next.unitsByMode = { work: next.units ?? {} };
  } else if (next.units && Object.keys(next.units).length && !next.unitsByMode.work) {
    next.unitsByMode.work = next.units;
  }
  if (!next.activeMode) next.activeMode = "work";
  return next;
}

export function unitsForMode(p: UserProgress, mode: LearningMode) {
  return p.unitsByMode?.[mode] ?? (mode === "work" ? p.units : {}) ?? {};
}

export function avgSkill(skills: SkillScores): number {
  const vals = Object.values(skills);
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}

/** Beceri ortalamasından CEFR bandı hesapla */
export function cefrFromSkills(skills: SkillScores): CefrBand {
  const avg = avgSkill(skills);
  if (avg >= 75) return "B2";
  if (avg >= 58) return "B1";
  if (avg >= 38) return "A2";
  return "A1";
}

function bumpSkill(skills: SkillScores, key: keyof SkillScores, delta: number): SkillScores {
  return { ...skills, [key]: Math.min(100, Math.max(0, skills[key] + delta)) };
}

/** Quiz sonucundan beceri + tekrar kuyruğu güncelle */
export function recordQuizAdaptive(
  adaptive: AdaptiveState,
  mode: LearningMode,
  unitSlug: string,
  scorePct: number,
  wrongQuestions: QuizQuestion[],
): AdaptiveState {
  let skills = adaptive.skills;
  const delta = scorePct >= 80 ? 3 : scorePct >= 50 ? 1 : -1;
  skills = bumpSkill(skills, "grammar", delta);
  skills = bumpSkill(skills, "vocab", delta);

  let reviews = [...adaptive.reviews];
  for (const q of wrongQuestions) {
    reviews.push(makeReviewItem(mode, "quiz", q.q, q.options[q.answer], q.q));
  }

  const cefrBand = cefrFromSkills(skills);
  return {
    ...adaptive,
    skills,
    cefrBand,
    reviews,
    history: [
      ...adaptive.history.slice(-99),
      { date: new Date().toISOString(), kind: `quiz:${unitSlug}`, score: scorePct, mode },
    ],
    updatedAt: new Date().toISOString(),
  };
}

/** Yanlış kelime kartlarını tekrar kuyruğuna ekle */
export function recordVocabMiss(
  adaptive: AdaptiveState,
  mode: LearningMode,
  items: VocabItem[],
): AdaptiveState {
  let reviews = [...adaptive.reviews];
  for (const v of items) {
    reviews.push(makeReviewItem(mode, "vocab", v.en, v.tr, v.en));
  }
  const skills = bumpSkill(adaptive.skills, "vocab", items.length ? -1 : 1);
  return {
    ...adaptive,
    skills,
    cefrBand: cefrFromSkills(skills),
    reviews,
    updatedAt: new Date().toISOString(),
  };
}

/** Simülatör telaffuz / tamamlama */
export function recordScenarioAdaptive(
  adaptive: AdaptiveState,
  mode: LearningMode,
  slug: string,
  pronunciationAvg: number,
): AdaptiveState {
  const delta = pronunciationAvg >= 70 ? 4 : pronunciationAvg >= 45 ? 2 : 0;
  const skills = bumpSkill(bumpSkill(adaptive.skills, "speaking", delta), "listening", delta / 2);
  return {
    ...adaptive,
    skills,
    cefrBand: cefrFromSkills(skills),
    history: [
      ...adaptive.history.slice(-99),
      { date: new Date().toISOString(), kind: `scenario:${slug}`, score: pronunciationAvg, mode },
    ],
    updatedAt: new Date().toISOString(),
  };
}

/** Dinleme anlama quizi */
export function recordListeningAdaptive(
  adaptive: AdaptiveState,
  mode: LearningMode,
  scorePct: number,
): AdaptiveState {
  const delta = scorePct >= 70 ? 3 : scorePct >= 40 ? 1 : -1;
  const skills = bumpSkill(adaptive.skills, "listening", delta);
  return {
    ...adaptive,
    skills,
    cefrBand: cefrFromSkills(skills),
    history: [
      ...adaptive.history.slice(-99),
      { date: new Date().toISOString(), kind: "listening", score: scorePct, mode },
    ],
    updatedAt: new Date().toISOString(),
  };
}

/** Alıştırma turu — kelime/cümle egzersizi */
export function recordDrillAdaptive(
  adaptive: AdaptiveState,
  mode: LearningMode,
  correct: boolean,
  front: string,
  back: string,
): AdaptiveState {
  let skills = bumpSkill(adaptive.skills, "vocab", correct ? 2 : -1);
  if (correct) skills = bumpSkill(skills, "grammar", 1);
  else skills = bumpSkill(skills, "grammar", -1);

  let reviews = [...adaptive.reviews];
  if (!correct && back) {
    reviews.push(makeReviewItem(mode, "vocab", front, back, front));
  }

  return {
    ...adaptive,
    skills,
    cefrBand: cefrFromSkills(skills),
    reviews,
    history: [
      ...adaptive.history.slice(-99),
      { date: new Date().toISOString(), kind: "drill", score: correct ? 100 : 0, mode },
    ],
    updatedAt: new Date().toISOString(),
  };
}

/** Yazma görevi tamamlandı */
export function recordWritingAdaptive(adaptive: AdaptiveState, mode: LearningMode): AdaptiveState {
  const skills = bumpSkill(adaptive.skills, "writing", 2);
  return {
    ...adaptive,
    skills,
    cefrBand: cefrFromSkills(skills),
    history: [
      ...adaptive.history.slice(-99),
      { date: new Date().toISOString(), kind: "writing", score: 100, mode },
    ],
    updatedAt: new Date().toISOString(),
  };
}

function makeReviewItem(
  mode: LearningMode,
  kind: ReviewItem["kind"],
  front: string,
  back: string,
  speak?: string,
): ReviewItem {
  const due = new Date(Date.now() + DAY_MS).toISOString();
  return {
    id: `${mode}-${kind}-${front.slice(0, 24)}-${Date.now()}`,
    mode,
    kind,
    front,
    back,
    speak,
    dueAt: due,
    intervalDays: 1,
    ease: 2.5,
  };
}

/** Bugün tekrar edilmesi gereken kartlar */
export function reviewsDueToday(adaptive: AdaptiveState, mode?: LearningMode): ReviewItem[] {
  const now = Date.now();
  return adaptive.reviews.filter((r) => {
    if (mode && r.mode !== mode) return false;
    return new Date(r.dueAt).getTime() <= now;
  });
}

/** SM-2 basitleştirilmiş: doğru cevap → aralık uzar, yanlış → yarın */
export function gradeReviewItem(item: ReviewItem, correct: boolean): ReviewItem | null {
  if (correct) {
    const intervalDays = Math.max(1, Math.round(item.intervalDays * item.ease));
    const ease = Math.min(3, item.ease + 0.1);
    const dueAt = new Date(Date.now() + intervalDays * DAY_MS).toISOString();
    return { ...item, intervalDays, ease, dueAt };
  }
  return {
    ...item,
    intervalDays: 1,
    dueAt: new Date(Date.now() + DAY_MS).toISOString(),
  };
}

/** Sonraki CEFR bandına ne kadar kaldı (0-100) */
export function cefrProgress(skills: SkillScores, band: CefrBand): number {
  const avg = avgSkill(skills);
  const idx = CEFR_ORDER.indexOf(band);
  const nextBand = CEFR_ORDER[idx + 1];
  if (!nextBand) return 100;
  const thresholds: Record<CefrBand, number> = { A1: 0, A2: 38, B1: 58, B2: 75 };
  const lo = thresholds[band];
  const hi = thresholds[nextBand];
  return Math.min(100, Math.round(((avg - lo) / (hi - lo)) * 100));
}
