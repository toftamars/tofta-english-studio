/** Telaffuz analizi — kelime bazlı Levenshtein + zayıf kelime listesi */

export interface WordScore {
  word: string;
  heard: string | null;
  score: number;
}

export interface PronunciationAnalysis {
  overall: number;
  weakWords: string[];
  words: WordScore[];
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;
  const dp = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

function wordSimilarity(target: string, heard: string): number {
  const a = normalize(target);
  const b = normalize(heard);
  if (!a) return 0;
  if (!b) return 0;
  if (a === b) return 100;
  const dist = levenshtein(a, b);
  const maxLen = Math.max(a.length, b.length);
  return Math.round((1 - dist / maxLen) * 100);
}

/** Hedef cümleyi kelime kelime analiz et */
export function analyzePronunciation(target: string, heard: string): PronunciationAnalysis {
  const targetWords = normalize(target).split(" ").filter(Boolean);
  const heardWords = normalize(heard).split(" ").filter(Boolean);
  const used = new Set<number>();

  const words: WordScore[] = targetWords.map((tw) => {
    let bestIdx = -1;
    let bestScore = 0;
    heardWords.forEach((hw, i) => {
      if (used.has(i)) return;
      const s = wordSimilarity(tw, hw);
      if (s > bestScore) {
        bestScore = s;
        bestIdx = i;
      }
    });
    if (bestIdx >= 0 && bestScore >= 55) used.add(bestIdx);
    const heardMatch = bestIdx >= 0 ? heardWords[bestIdx] : null;
    return { word: tw, heard: heardMatch, score: bestScore };
  });

  const weakWords = words.filter((w) => w.score < 70).map((w) => w.word);
  const overall =
    words.length > 0 ? Math.round(words.reduce((a, w) => a + w.score, 0) / words.length) : 0;

  return { overall, weakWords, words };
}

/** Geriye uyumlu tek skor */
export function pronunciationScore(target: string, heard: string): number {
  return analyzePronunciation(target, heard).overall;
}
