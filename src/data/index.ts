import type { LearningMode, ProfileId, Scenario, Unit } from "../types";
import { HULYA_UNITS } from "./curriculum";
import { WORK_EXTRA_UNITS } from "./curriculum-work-extra";
import { DAILY_UNITS } from "./curriculum-daily";
import { DAILY_EXTRA_UNITS } from "./curriculum-daily-extra";
import { SOCIAL_UNITS } from "./curriculum-social";
import { SOCIAL_EXTRA_UNITS } from "./curriculum-social-extra";
import { B1_MANAGER_UNITS } from "./curriculum-b1";
import { ALPER_UNITS } from "./curriculum-alper";
import { HULYA_SCENARIOS } from "./scenarios";
import { ISTINYE_SCENARIOS } from "./scenarios-istinye";
import { WORK_EXTRA_SCENARIOS } from "./scenarios-work-bank";
import { DAILY_SCENARIOS } from "./scenarios-daily-bank";
import { SOCIAL_SCENARIOS } from "./scenarios-social-bank";
import { ALPER_SCENARIOS } from "./scenarios-alper";
import { cefrAtLeast } from "./modes";
import type { CefrBand } from "../types";

export { PROFILES, PROFILE_LIST } from "./profiles";
export { LEARNING_MODES, getModeMeta, cefrLabel, cefrAtLeast } from "./modes";

const WORK_UNITS: Unit[] = [...HULYA_UNITS, ...WORK_EXTRA_UNITS, ...B1_MANAGER_UNITS];
const WORK_SCENARIOS: Scenario[] = [...HULYA_SCENARIOS, ...ISTINYE_SCENARIOS, ...WORK_EXTRA_SCENARIOS];

export const UNITS_BY_PROFILE_MODE: Record<ProfileId, Record<LearningMode, Unit[]>> = {
  hulya: {
    work: WORK_UNITS,
    daily: [...DAILY_UNITS, ...DAILY_EXTRA_UNITS],
    social: [...SOCIAL_UNITS, ...SOCIAL_EXTRA_UNITS],
  },
  alper: {
    work: ALPER_UNITS,
    daily: [...DAILY_UNITS, ...DAILY_EXTRA_UNITS],
    social: [...SOCIAL_UNITS, ...SOCIAL_EXTRA_UNITS],
  },
};

export const SCENARIOS_BY_PROFILE_MODE: Record<ProfileId, Record<LearningMode, Scenario[]>> = {
  hulya: {
    work: WORK_SCENARIOS,
    daily: DAILY_SCENARIOS,
    social: SOCIAL_SCENARIOS,
  },
  alper: {
    work: ALPER_SCENARIOS,
    daily: DAILY_SCENARIOS,
    social: SOCIAL_SCENARIOS,
  },
};

export function getUnits(profileId: ProfileId, mode: LearningMode = "work", cefrBand?: CefrBand): Unit[] {
  const all = UNITS_BY_PROFILE_MODE[profileId]?.[mode] ?? [];
  if (!cefrBand) return all;
  return all.filter((u) => !u.minCefr || cefrAtLeast(cefrBand, u.minCefr));
}

export function getScenarios(profileId: ProfileId, mode: LearningMode = "work", cefrBand?: CefrBand): Scenario[] {
  const all = SCENARIOS_BY_PROFILE_MODE[profileId]?.[mode] ?? [];
  if (!cefrBand) return all;
  return all.filter((s) => !s.minCefr || cefrAtLeast(cefrBand, s.minCefr));
}

export function getUnitBySlug(profileId: ProfileId, slug: string, mode: LearningMode = "work"): Unit | undefined {
  return getUnits(profileId, mode).find((u) => u.slug === slug);
}

export function getScenario(slug: string, profileId: ProfileId = "hulya", mode: LearningMode = "work"): Scenario | undefined {
  return getScenarios(profileId, mode).find((s) => s.slug === slug)
    ?? SCENARIOS_BY_PROFILE_MODE[profileId]?.work.find((s) => s.slug === slug);
}
