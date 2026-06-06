import type { PoolEntry, RadarItem, RadarNote } from "../types";
import { RADAR_SEED, WORDS } from "../data/radar";
import type { RadarData } from "../types";
import { getLocalRadarNotesSync } from "./radarNotes";

export const RADAR_CACHE_KEY = "tofta-radar-cache-v1";

/** Radar.json başarılı yüklemeden sonra drill havuzu için önbellek */
export function cacheRadarForPool(data: RadarData) {
  try {
    localStorage.setItem(RADAR_CACHE_KEY, JSON.stringify(data));
  } catch {
    /* yoksay */
  }
}

export function getCachedRadarSync(): RadarData {
  try {
    const raw = localStorage.getItem(RADAR_CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as RadarData;
      if (parsed?.news?.length) return parsed;
    }
  } catch {
    /* yoksay */
  }
  return RADAR_SEED;
}

/** Haber başlık/özetinden drill girdileri */
export function poolEntriesFromRadarNews(news: RadarItem[]): PoolEntry[] {
  return news.flatMap((item) => {
    const summary = item.summary ?? "";
    const entries: PoolEntry[] = [
      {
        en: item.title,
        tr: summary.slice(0, 100),
        def: item.tag,
        tags: ["radar", "news", "work"],
      },
    ];
    const terms = summary.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2}\b/g) ?? [];
    for (const term of terms.slice(0, 4)) {
      if (term.length > 3) {
        entries.push({
          en: term,
          tr: item.tag ?? "radar",
          example: item.title,
          tags: ["radar", "news-term"],
        });
      }
    }
    return entries;
  });
}

/** Kullanıcı notlarından drill girdileri */
export function poolEntriesFromRadarNotes(notes: RadarNote[]): PoolEntry[] {
  return notes.flatMap((n) => [
    { en: n.title, tr: n.body.slice(0, 80), def: n.category, tags: ["radar", "note", "work"] },
    ...n.body
      .split(/[.!?]/)
      .slice(0, 2)
      .filter((s) => s.trim().length > 8)
      .map((s) => ({
        en: s.trim().slice(0, 80),
        tr: n.title,
        tags: ["radar", "note-phrase"],
      })),
  ]);
}

/** Günün kelimesi havuzu (zaten WORDS — tekrar export drill için) */
export function poolEntriesFromRadarWords(): PoolEntry[] {
  return WORDS.map((w) => ({ en: w.en, tr: w.tr, def: w.note, tags: ["radar", "word"] }));
}

/** Senkron: radar haber + notlar + kelime havuzu → drill */
export function getRadarPoolEntriesSync(): PoolEntry[] {
  const cached = getCachedRadarSync();
  return [
    ...poolEntriesFromRadarWords(),
    ...poolEntriesFromRadarNews(cached.news),
    ...poolEntriesFromRadarNotes(getLocalRadarNotesSync()),
  ];
}
