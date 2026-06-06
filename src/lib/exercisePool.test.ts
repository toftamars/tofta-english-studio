import { describe, expect, it } from "vitest";
import { buildExercisePool, clearExercisePoolCache, poolEntriesFromProducts, poolForMode, poolStats } from "./exercisePool";

describe("exercisePool extended", () => {
  it("includes catalog product entries", () => {
    const extra = poolEntriesFromProducts([
      { name: "Capucines BB", line: "Handbags", material: "Taurillon leather", summary: "Iconic bag" },
    ]);
    expect(extra.length).toBeGreaterThan(0);
    const pool = buildExercisePool("hulya", extra);
    expect(pool.some((p) => p.en.includes("Capucines"))).toBe(true);
  });

  it("clears cache and rebuilds", () => {
    clearExercisePoolCache();
    const a = buildExercisePool("hulya");
    clearExercisePoolCache();
    const b = buildExercisePool("hulya");
    expect(a.length).toBe(b.length);
  });

  it("filters pool by mode", () => {
    const work = poolForMode("hulya", "work");
    const daily = poolForMode("hulya", "daily");
    expect(work.length).toBeGreaterThan(50);
    expect(daily.length).toBeGreaterThan(20);
  });

  it("alper profile has work pool", () => {
    const stats = poolStats("alper");
    expect(stats.total).toBeGreaterThan(100);
  });
});
