import { describe, expect, it } from "vitest";
import { analyzePronunciation, pronunciationScore } from "./pronunciation";

describe("pronunciation", () => {
  it("scores perfect match at 100", () => {
    const r = analyzePronunciation("Welcome to Louis Vuitton", "Welcome to Louis Vuitton");
    expect(r.overall).toBe(100);
    expect(r.weakWords).toHaveLength(0);
  });

  it("flags weak words on partial mismatch", () => {
    const r = analyzePronunciation("How may I help you", "How may eye halp yoo");
    expect(r.overall).toBeLessThan(100);
    expect(r.weakWords.length).toBeGreaterThan(0);
  });

  it("handles empty heard text", () => {
    const r = analyzePronunciation("Hello there", "");
    expect(r.overall).toBe(0);
    expect(r.weakWords).toContain("hello");
    expect(r.weakWords).toContain("there");
  });

  it("normalizes punctuation and case", () => {
    expect(pronunciationScore("Hello!", "hello")).toBe(100);
  });

  it("returns word-level scores", () => {
    const r = analyzePronunciation("Good morning", "Good morning");
    expect(r.words).toHaveLength(2);
    expect(r.words.every((w) => w.score === 100)).toBe(true);
  });

  it("matches heard words out of order loosely", () => {
    const r = analyzePronunciation("thank you very much", "very much thank you");
    expect(r.overall).toBeGreaterThan(50);
  });
});
