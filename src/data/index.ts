import type { ProfileId, Scenario, Unit } from "../types";
import { HULYA_UNITS } from "./curriculum";
import { HULYA_SCENARIOS } from "./scenarios";

export { PROFILES, PROFILE_LIST } from "./profiles";
export { getScenario } from "./scenarios";

/** Profil bazlı içerik. Alper içeriği 2. fazda eklenecek. */
export const UNITS_BY_PROFILE: Record<ProfileId, Unit[]> = {
  hulya: HULYA_UNITS,
  alper: [],
};

export const SCENARIOS_BY_PROFILE: Record<ProfileId, Scenario[]> = {
  hulya: HULYA_SCENARIOS,
  alper: [],
};

export function getUnits(profileId: ProfileId): Unit[] {
  return UNITS_BY_PROFILE[profileId] ?? [];
}

export function getScenarios(profileId: ProfileId): Scenario[] {
  return SCENARIOS_BY_PROFILE[profileId] ?? [];
}

export function getUnitBySlug(profileId: ProfileId, slug: string): Unit | undefined {
  return getUnits(profileId).find((u) => u.slug === slug);
}
