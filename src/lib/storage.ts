// ============================================================
// İlerleme Deposu (Repository) — değiştirilebilir veri katmanı
//  - LocalProgressRepo: localStorage (ücretsiz, internetsiz)
//  - CloudProgressRepo: Supabase (cihazlar arası senkron) — env hazır
//    olduğunda otomatik devreye girer.
//  Bu soyutlama sayesinde uygulamanın geri kalanı verinin nereden
//  geldiğini bilmez; modüler yapı korunur.
// ============================================================
import type { ProfileId, UserProgress } from "../types";
import { defaultAdaptive, migrateProgress } from "./adaptive";
import { supabase } from "./supabase";

const KEY_PREFIX = "tofta-english-v2:";

export function defaultProgress(profileId: ProfileId): UserProgress {
  return migrateProgress({
    profileId,
    xp: 0,
    streak: 0,
    lastActiveDay: null,
    units: {},
    unitsByMode: { work: {}, daily: {}, social: {} },
    scenariosDone: [],
    badges: [],
    activeMode: "work",
    adaptive: defaultAdaptive(),
  });
}

export interface ProgressRepo {
  load(profileId: ProfileId, userId?: string): Promise<UserProgress>;
  save(progress: UserProgress, userId?: string): Promise<void>;
}

class LocalProgressRepo implements ProgressRepo {
  async load(profileId: ProfileId): Promise<UserProgress> {
    try {
      const raw = localStorage.getItem(KEY_PREFIX + profileId);
      if (raw) return migrateProgress({ ...defaultProgress(profileId), ...JSON.parse(raw) });
    } catch {
      /* yoksay */
    }
    return defaultProgress(profileId);
  }

  async save(progress: UserProgress): Promise<void> {
    localStorage.setItem(KEY_PREFIX + progress.profileId, JSON.stringify(progress));
  }
}

class CloudProgressRepo implements ProgressRepo {
  private local = new LocalProgressRepo();

  async load(profileId: ProfileId, userId?: string): Promise<UserProgress> {
    if (!supabase || !userId) return this.local.load(profileId);
    const { data, error } = await supabase
      .from("progress")
      .select("data")
      .eq("user_id", userId)
      .maybeSingle();
    if (error || !data) return this.local.load(profileId);
    return migrateProgress({ ...defaultProgress(profileId), ...(data.data as UserProgress) });
  }

  async save(progress: UserProgress, userId?: string): Promise<void> {
    // Her zaman yerel kopya tut (offline güvence)
    await this.local.save(progress);
    if (!supabase || !userId) return;
    await supabase.from("progress").upsert(
      { user_id: userId, profile_id: progress.profileId, data: progress, updated_at: new Date().toISOString() },
      { onConflict: "user_id" },
    );
  }
}

export const progressRepo: ProgressRepo = supabase ? new CloudProgressRepo() : new LocalProgressRepo();

// ---------------- XP / Seviye yardımcıları ----------------

export const XP_PER_SECTION = 10;
export const XP_PER_UNIT_BONUS = 25;
export const XP_PER_SCENARIO = 30;
export const XP_PER_DRILL_CORRECT = 2;
export const XP_PER_DRILL_ROUND = 10;

export interface LevelInfo {
  level: number;
  title: string;
  current: number; // bu seviyedeki ilerleme
  needed: number; // sonraki seviyeye gereken
  pct: number;
}

const LEVEL_TITLES = [
  "Newcomer",
  "Trainee",
  "Junior Advisor",
  "Client Advisor",
  "Senior Advisor",
  "Expert Advisor",
  "Maison Star",
];

export function levelFromXp(xp: number): LevelInfo {
  // Her seviye 100 XP (basit ve motive edici)
  const per = 100;
  const level = Math.floor(xp / per) + 1;
  const current = xp % per;
  const idx = Math.min(level - 1, LEVEL_TITLES.length - 1);
  return {
    level,
    title: LEVEL_TITLES[idx],
    current,
    needed: per,
    pct: Math.round((current / per) * 100),
  };
}
