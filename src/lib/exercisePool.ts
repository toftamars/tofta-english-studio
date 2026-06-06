import type { LearningMode, PoolEntry, ProfileId } from "../types";
import { UNITS_BY_PROFILE_MODE, SCENARIOS_BY_PROFILE_MODE } from "../data/index";
import { WORDS } from "../data/radar";
import { getRadarPoolEntriesSync } from "./radarPool";
import { WORD_BANK, SENTENCE_TEMPLATES } from "../data/word-bank";

let cachedPool: PoolEntry[] | null = null;

export function clearExercisePoolCache() {
  cachedPool = null;
}

/** Tüm kaynaklardan birleşik kelime/cümle havuzu */
export function buildExercisePool(profileId: ProfileId = "hulya", extra: PoolEntry[] = []): PoolEntry[] {
  if (cachedPool && extra.length === 0) return [...cachedPool, ...extra];

  const entries: PoolEntry[] = [];
  const seen = new Set<string>();

  function add(e: PoolEntry) {
    const key = e.en.toLowerCase().trim();
    if (!key || seen.has(key)) return;
    seen.add(key);
    entries.push(e);
  }

  for (const mode of ["work", "daily", "social"] as LearningMode[]) {
    const units = UNITS_BY_PROFILE_MODE[profileId]?.[mode] ?? [];
    for (const u of units) {
      for (const p of u.phrases ?? []) {
        add({ en: p.en, tr: p.tr, mode, tags: ["phrase", mode] });
      }
      for (const g of u.vocab ?? []) {
        for (const v of g.items) {
          add({ en: v.en, tr: v.tr, example: v.example, def: v.def, mode, tags: ["vocab", mode] });
        }
      }
      for (const s of u.speaking ?? []) {
        add({ en: s, tr: "", mode, tags: ["speaking", mode] });
      }
      for (const l of u.listening ?? []) {
        add({ en: l, tr: "", mode, tags: ["listening", mode] });
      }
    }
  }

  for (const mode of ["work", "daily", "social"] as LearningMode[]) {
    const scenarios = SCENARIOS_BY_PROFILE_MODE[profileId]?.[mode] ?? [];
    for (const sc of scenarios) {
      for (const step of sc.steps) {
        add({ en: step.en, tr: step.tr, mode, tags: ["scenario", mode] });
        for (const r of step.replies ?? []) {
          if (r.best) add({ en: r.en, tr: r.tr, mode, tags: ["reply", mode] });
        }
      }
    }
  }

  for (const w of WORDS) {
    add({ en: w.en, tr: w.tr, def: w.note, tags: ["radar"] });
  }

  for (const r of getRadarPoolEntriesSync()) {
    add(r);
  }

  for (const w of WORD_BANK) {
    add(w);
  }

  for (const t of SENTENCE_TEMPLATES) {
    add({
      en: t.template.replace("___", t.blank),
      tr: t.tr,
      example: t.template,
      tags: t.tags ?? ["template"],
    });
  }

  for (const e of extra) add(e);

  if (extra.length === 0) cachedPool = entries;
  return entries;
}

/** Katalog ürünlerinden drill girdileri */
export function poolEntriesFromProducts(products: { name: string; material?: string; line?: string; summary?: string }[]): PoolEntry[] {
  return products.flatMap((p) => {
    const entries: PoolEntry[] = [
      { en: p.name, tr: p.line || p.name, def: p.summary, tags: ["catalog", "work"] },
    ];
    if (p.material) entries.push({ en: p.material, tr: "malzeme", example: `This ${p.name} is made of ${p.material}.`, tags: ["catalog"] });
    return entries;
  });
}

export function poolForMode(profileId: ProfileId, mode: LearningMode): PoolEntry[] {
  const all = buildExercisePool(profileId);
  const modeEntries = all.filter((e) => !e.mode || e.mode === mode);
  const shared = all.filter((e) => e.tags?.includes("grammar") || e.tags?.includes("radar"));
  const merged = [...modeEntries];
  for (const s of shared) {
    if (!merged.some((m) => m.en.toLowerCase() === s.en.toLowerCase())) merged.push(s);
  }
  return merged.length >= 20 ? merged : all;
}

export function poolStats(profileId: ProfileId = "hulya") {
  const pool = buildExercisePool(profileId);
  return {
    total: pool.length,
    work: pool.filter((e) => e.mode === "work" || e.tags?.includes("work")).length,
    daily: pool.filter((e) => e.mode === "daily" || e.tags?.includes("daily")).length,
    social: pool.filter((e) => e.mode === "social" || e.tags?.includes("social")).length,
    templates: SENTENCE_TEMPLATES.length,
  };
}

export { SENTENCE_TEMPLATES };
