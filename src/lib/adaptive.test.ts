import { describe, expect, it } from "vitest";
import {
  cefrFromSkills,
  cefrProgress,
  defaultAdaptive,
  defaultSkills,
  gradeReviewItem,
  migrateProgress,
  recordDrillAdaptive,
  recordQuizAdaptive,
  recordVocabMiss,
  reviewsDueToday,
} from "./adaptive";
import type { UserProgress } from "../types";

describe("adaptive extended", () => {
  it("deduplicates review items by front text", () => {
    const base = defaultAdaptive();
    const after1 = recordVocabMiss(base, "work", [{ en: "assist", tr: "yardım etmek" }]);
    const after2 = recordVocabMiss(after1, "work", [{ en: "Assist", tr: "yardım etmek" }]);
    expect(after2.reviews.filter((r) => r.front.toLowerCase() === "assist")).toHaveLength(1);
  });

  it("deduplicates quiz wrong answers", () => {
    const base = defaultAdaptive();
    const q = { q: "What is assist?", options: ["a", "b", "c", "d"], answer: 0, explainTr: "Assist = yardım etmek" };
    const after1 = recordQuizAdaptive(base, "work", "unit-1", 40, [q]);
    const after2 = recordQuizAdaptive(after1, "work", "unit-1", 40, [q]);
    expect(after2.reviews.length).toBe(1);
  });

  it("grades review item with SM-2 interval", () => {
    const item = {
      id: "1",
      mode: "work" as const,
      kind: "vocab" as const,
      front: "test",
      back: "deneme",
      dueAt: new Date().toISOString(),
      intervalDays: 1,
      ease: 2.5,
    };
    const graded = gradeReviewItem(item, true);
    expect(graded?.intervalDays).toBeGreaterThan(1);
  });

  it("returns reviews due today", () => {
    const adaptive = defaultAdaptive();
    adaptive.reviews.push({
      id: "x",
      mode: "work",
      kind: "vocab",
      front: "a",
      back: "b",
      dueAt: new Date(Date.now() - 1000).toISOString(),
      intervalDays: 1,
      ease: 2.5,
    });
    expect(reviewsDueToday(adaptive, "work")).toHaveLength(1);
  });

  it("migrates legacy progress shape", () => {
    const legacy = {
      xp: 0,
      streak: 0,
      badges: [],
      scenariosDone: [],
      units: { "unit-1": { completed: false, sections: {}, quizBest: 0 } },
    } as unknown as UserProgress;
    const migrated = migrateProgress(legacy);
    expect(migrated.adaptive).toBeDefined();
    expect(migrated.unitsByMode?.work).toBeDefined();
  });

  it("computes CEFR progress toward next band", () => {
    const skills = defaultSkills();
    expect(cefrProgress(skills, "A1")).toBeGreaterThanOrEqual(0);
    expect(cefrProgress(skills, "A1")).toBeLessThanOrEqual(100);
  });

  it("records drill history entries", () => {
    const base = defaultAdaptive();
    const next = recordDrillAdaptive(base, "work", true, "hello", "merhaba");
    expect(next.history.some((h) => h.kind === "drill")).toBe(true);
  });

  it("bumps CEFR on high skill average", () => {
    expect(cefrFromSkills({ speaking: 80, listening: 80, vocab: 80, grammar: 80, writing: 80 })).toBe("B2");
  });
});
