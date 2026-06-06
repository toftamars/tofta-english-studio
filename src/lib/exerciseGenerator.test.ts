import { describe, expect, it } from "vitest";
import { generateDrillRound, generateMatchRound, mulberry32 } from "./exerciseGenerator";
import { buildExercisePool, poolStats } from "./exercisePool";
import { cefrFromSkills, defaultSkills, recordDrillAdaptive } from "./adaptive";

describe("exercisePool", () => {
  it("builds a large merged pool from curriculum + bank", () => {
    const pool = buildExercisePool("hulya");
    expect(pool.length).toBeGreaterThan(400);
    const stats = poolStats("hulya");
    expect(stats.total).toBe(pool.length);
    expect(stats.templates).toBeGreaterThan(15);
  });
});

describe("exerciseGenerator", () => {
  it("produces different rounds with different seeds", () => {
    const a = generateDrillRound("hulya", "work", "mixed", 8, 111);
    const b = generateDrillRound("hulya", "work", "mixed", 8, 222);
    expect(a.length).toBe(8);
    expect(b.length).toBe(8);
    expect(a[0].id).not.toBe(b[0].id);
  });

  it("generates cloze and choice exercises", () => {
    const round = generateDrillRound("hulya", "daily", "cloze", 5, 42);
    expect(round.length).toBeGreaterThan(0);
    expect(round.every((e) => e.kind === "cloze")).toBe(true);
  });

  it("generates match round", () => {
    const m = generateMatchRound("hulya", "social", 99);
    expect(m).not.toBeNull();
    expect(m!.kind).toBe("match");
  });

  it("mulberry32 is deterministic", () => {
    const a = mulberry32(123);
    const b = mulberry32(123);
    expect(a()).toBe(b());
  });
});

describe("adaptive", () => {
  it("updates vocab on drill miss", () => {
    const base = { cefrBand: "A2" as const, skills: defaultSkills(), reviews: [], history: [], updatedAt: "" };
    const next = recordDrillAdaptive(base, "work", false, "assist", "yardımcı olmak");
    expect(next.reviews.length).toBe(1);
    expect(next.skills.vocab).toBeLessThan(base.skills.vocab);
  });

  it("maps skills to CEFR bands", () => {
    expect(cefrFromSkills(defaultSkills())).toBe("A1");
    expect(cefrFromSkills({ speaking: 40, listening: 40, vocab: 40, grammar: 40, writing: 40 })).toBe("A2");
  });
});
