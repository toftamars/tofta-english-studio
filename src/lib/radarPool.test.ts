import { describe, expect, it } from "vitest";
import { poolEntriesFromRadarNews, poolEntriesFromRadarNotes, poolEntriesFromRadarWords } from "./radarPool";

describe("radarPool", () => {
  it("extracts entries from radar news", () => {
    const entries = poolEntriesFromRadarNews([
      {
        title: "New Capucines Collection",
        source: "Maison",
        url: "https://example.com",
        publishedAt: "2026-01-01",
        summary: "The Capucines bag features exquisite craftsmanship.",
        tag: "Koleksiyon",
      },
    ]);
    expect(entries.length).toBeGreaterThan(0);
    expect(entries.some((e) => e.en.includes("Capucines"))).toBe(true);
  });

  it("maps radar notes to pool entries", () => {
    const entries = poolEntriesFromRadarNotes([
      {
        id: "1",
        title: "Monogram Eclipse",
        body: "Popular with younger clients. Mention the dark finish.",
        category: "Koleksiyon",
        createdAt: "2026-01-01",
      },
    ]);
    expect(entries.some((e) => e.en === "Monogram Eclipse")).toBe(true);
  });

  it("includes word of day pool", () => {
    expect(poolEntriesFromRadarWords().length).toBeGreaterThan(20);
  });
});
