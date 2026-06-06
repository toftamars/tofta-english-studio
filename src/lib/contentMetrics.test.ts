import { describe, expect, it } from "vitest";
import { SCENARIOS_BY_PROFILE_MODE, UNITS_BY_PROFILE_MODE } from "../data/index";
import { buildExercisePool } from "./exercisePool";

describe("content metrics", () => {
  it("hulya has 31 units and 100 scenarios", () => {
    const u = UNITS_BY_PROFILE_MODE.hulya;
    const s = SCENARIOS_BY_PROFILE_MODE.hulya;
    const units = u.work.length + u.daily.length + u.social.length;
    const scenarios = s.work.length + s.daily.length + s.social.length;
    expect(units).toBe(31);
    expect(scenarios).toBe(100);
  });

  it("exercise pool exceeds 400 entries for hulya", () => {
    expect(buildExercisePool("hulya").length).toBeGreaterThanOrEqual(400);
  });
});
