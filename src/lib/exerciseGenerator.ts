import type { DrillExercise, DrillKind, LearningMode, ProfileId } from "../types";
import { poolForMode, SENTENCE_TEMPLATES } from "./exercisePool";
import type { PoolEntry } from "../types";

/** Deterministik PRNG — aynı seed = aynı tur */
export function mulberry32(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)];
}

function shuffle<T>(arr: T[], rand: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function distractors(pool: PoolEntry[], correct: PoolEntry, count: number, rand: () => number): string[] {
  const others = pool.filter((p) => p.tr !== correct.tr && p.tr.length > 0);
  const picks = shuffle(others, rand).slice(0, count).map((p) => p.tr);
  return shuffle([correct.tr, ...picks], rand);
}

function enDistractors(pool: PoolEntry[], correct: PoolEntry, count: number, rand: () => number): string[] {
  const others = pool.filter((p) => p.en !== correct.en);
  const picks = shuffle(others, rand).slice(0, count).map((p) => p.en);
  return shuffle([correct.en, ...picks], rand);
}

function makeFlashcard(entry: PoolEntry, i: number, round: number): DrillExercise {
  return {
    id: `fc-${round}-${i}`,
    kind: "flashcard",
    prompt: entry.en,
    promptTr: entry.def,
    answer: entry.tr || entry.en,
    speak: entry.en,
    hint: entry.example,
  };
}

function makeChoice(entry: PoolEntry, pool: PoolEntry[], i: number, round: number, rand: () => number): DrillExercise | null {
  if (!entry.tr) return null;
  const reverse = rand() > 0.5;
  if (reverse) {
    const opts = enDistractors(pool, entry, 3, rand);
    return {
      id: `ch-r-${round}-${i}`,
      kind: "choice",
      prompt: entry.tr,
      promptTr: "Doğru İngilizce cevabı seç",
      answer: entry.en,
      options: opts,
      speak: entry.en,
    };
  }
  const opts = distractors(pool, entry, 3, rand);
  return {
    id: `ch-${round}-${i}`,
    kind: "choice",
    prompt: entry.en,
    promptTr: "Doğru Türkçe anlamı seç",
    answer: entry.tr,
    options: opts,
    speak: entry.en,
  };
}

function makeClozeFromTemplate(
  t: (typeof SENTENCE_TEMPLATES)[0],
  i: number,
  round: number,
  pool: PoolEntry[],
  rand: () => number,
): DrillExercise {
  const sentence = t.template.replace("___", "_____");
  const wrong = shuffle(
    pool.filter((p) => p.en.toLowerCase() !== t.blank.toLowerCase() && p.en.split(" ").length <= 2),
    rand,
  )
    .slice(0, 3)
    .map((p) => p.en);
  const options = shuffle([t.blank, ...wrong], rand);
  return {
    id: `cl-t-${round}-${i}`,
    kind: "cloze",
    prompt: "Boşluğu doldur",
    sentence,
    answer: t.blank,
    options,
    promptTr: t.tr,
    speak: t.template.replace("___", t.blank),
  };
}

function makeClozeFromExample(entry: PoolEntry, i: number, round: number, rand: () => number): DrillExercise | null {
  const ex = entry.example ?? (entry.en.includes(" ") ? entry.en : null);
  if (!ex || !entry.tr) return null;
  const words = entry.en.split(/\s+/);
  if (words.length > 3) return null;
  const blank = words.length === 1 ? entry.en : words[Math.floor(rand() * words.length)];
  if (blank.length < 3) return null;
  const sentence = ex.replace(new RegExp(`\\b${blank}\\b`, "i"), "_____");
  if (!sentence.includes("_____")) return null;
  return {
    id: `cl-e-${round}-${i}`,
    kind: "cloze",
    prompt: "Boşluğu doldur",
    sentence,
    answer: blank,
    promptTr: entry.tr,
    speak: ex,
  };
}

function makeOrder(entry: PoolEntry, i: number, round: number, rand: () => number): DrillExercise | null {
  const sentence = entry.example ?? (entry.en.split(" ").length >= 4 ? entry.en : null);
  if (!sentence) return null;
  const words = sentence.replace(/[.,!?]/g, "").split(/\s+/);
  if (words.length < 4 || words.length > 10) return null;
  return {
    id: `ord-${round}-${i}`,
    kind: "order",
    prompt: "Kelime sırasını doğru kur",
    promptTr: entry.tr,
    answer: words.join(" "),
    words: shuffle(words, rand),
    speak: sentence,
  };
}

/** Tek tur için N egzersiz üret — seed değiştikçe sonsuz yeni tur */
export function generateDrillRound(
  profileId: ProfileId,
  mode: LearningMode,
  kind: DrillKind,
  count: number,
  seed: number,
  extra: PoolEntry[] = [],
): DrillExercise[] {
  const base = poolForMode(profileId, mode);
  const pool =
    extra.length > 0
      ? [...base, ...extra.filter((e) => !e.mode || e.mode === mode)]
      : base;
  if (pool.length < 4) return [];

  const rand = mulberry32(seed);
  const round = seed;
  const exercises: DrillExercise[] = [];
  const used = new Set<string>();

  const kinds: DrillKind[] =
    kind === "mixed" ? ["flashcard", "cloze", "choice", "order"] : [kind];

  let attempts = 0;
  while (exercises.length < count && attempts < count * 8) {
    attempts++;
    const k = pick(kinds, rand);
    let ex: DrillExercise | null = null;

    if (k === "flashcard") {
      const entry = pick(pool, rand);
      if (!used.has(entry.en)) {
        used.add(entry.en);
        ex = makeFlashcard(entry, exercises.length, round);
      }
    } else if (k === "choice") {
      const entry = pick(pool.filter((p) => p.tr), rand);
      if (!used.has(`ch-${entry.en}`)) {
        used.add(`ch-${entry.en}`);
        ex = makeChoice(entry, pool, exercises.length, round, rand);
      }
    } else if (k === "cloze") {
      if (rand() > 0.4 && SENTENCE_TEMPLATES.length) {
        const t = pick(SENTENCE_TEMPLATES, rand);
        const id = `cl-${t.blank}-${t.template.slice(0, 12)}`;
        if (!used.has(id)) {
          used.add(id);
          ex = makeClozeFromTemplate(t, exercises.length, round, pool, rand);
        }
      } else {
        const entry = pick(pool.filter((p) => p.example || p.en.includes(" ")), rand);
        ex = makeClozeFromExample(entry, exercises.length, round, rand);
      }
    } else if (k === "order") {
      const entry = pick(pool, rand);
      ex = makeOrder(entry, exercises.length, round, rand);
    } else if (k === "match") {
      // match handled separately as one exercise with 4 pairs
      break;
    }

    if (ex) exercises.push(ex);
  }

  return exercises.slice(0, count);
}

/** 4 çift eşleştirme egzersizi */
export function generateMatchRound(
  profileId: ProfileId,
  mode: LearningMode,
  seed: number,
  extra: PoolEntry[] = [],
): DrillExercise | null {
  const base = poolForMode(profileId, mode).filter((p) => p.tr);
  const pool =
    extra.length > 0
      ? [...base, ...extra.filter((e) => e.tr && (!e.mode || e.mode === mode))]
      : base;
  if (pool.length < 4) return null;
  const rand = mulberry32(seed);
  const pairs = shuffle(pool, rand).slice(0, 4);
  const enList = shuffle(
    pairs.map((p) => p.en),
    rand,
  );
  const trList = shuffle(
    pairs.map((p) => p.tr),
    rand,
  );
  return {
    id: `match-${seed}`,
    kind: "match",
    prompt: "İngilizce ve Türkçe eşleştir",
    answer: pairs.map((p) => `${p.en}=${p.tr}`).join("|"),
    options: [...enList, ...trList],
    hint: enList.join(","),
  };
}

export function sessionSeed(base?: number): number {
  if (base != null) return base + 1;
  return Date.now() ^ (Math.random() * 0xffffffff);
}
