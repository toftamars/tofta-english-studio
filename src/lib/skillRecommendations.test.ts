import { describe, expect, it } from "vitest";
import { recommendForSkills } from "./skillRecommendations";
import { defaultSkills } from "./adaptive";

describe("skillRecommendations", () => {
  it("recommends simulator when speaking is weakest", () => {
    const skills = { ...defaultSkills(), speaking: 10, vocab: 50 };
    const rec = recommendForSkills(skills, "work");
    expect(rec.skill).toBe("speaking");
    expect(rec.route).toBe("/app/simulator");
  });

  it("recommends flashcard drill when vocab is weakest", () => {
    const skills = { ...defaultSkills(), vocab: 5, speaking: 50 };
    const rec = recommendForSkills(skills, "work");
    expect(rec.skill).toBe("vocab");
    expect(rec.drillKind).toBe("flashcard");
    expect(rec.route).toBe("/app/drill");
  });

  it("recommends cloze for weak grammar", () => {
    const skills = { ...defaultSkills(), grammar: 8 };
    const rec = recommendForSkills(skills, "daily");
    expect(rec.skill).toBe("grammar");
    expect(rec.drillKind).toBe("cloze");
  });

  it("still routes speaking to simulator in social mode", () => {
    const skills = { ...defaultSkills(), speaking: 12 };
    const rec = recommendForSkills(skills, "social");
    expect(rec.route).toBe("/app/simulator");
  });
});
