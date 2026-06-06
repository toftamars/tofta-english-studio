import type { DrillKind, LearningMode, SkillScores } from "../types";

export interface SkillRecommendation {
  skill: keyof SkillScores;
  labelTr: string;
  drillKind: DrillKind;
  route: string;
  reasonTr: string;
}

const SKILL_LABELS: Record<keyof SkillScores, string> = {
  speaking: "Konuşma",
  listening: "Dinleme",
  vocab: "Kelime",
  grammar: "Dilbilgisi",
  writing: "Yazma",
};

/** En düşük beceriye göre öneri */
export function recommendForSkills(skills: SkillScores, mode: LearningMode): SkillRecommendation {
  const entries = (Object.keys(skills) as (keyof SkillScores)[]).map((k) => [k, skills[k]] as const);
  entries.sort((a, b) => a[1] - b[1]);
  const weakest = entries[0][0];

  const map: Record<keyof SkillScores, SkillRecommendation> = {
    speaking: {
      skill: "speaking",
      labelTr: SKILL_LABELS.speaking,
      drillKind: "mixed",
      route: "/app/simulator",
      reasonTr: "Konuşma skorun düşük — simülatörle rol yap.",
    },
    listening: {
      skill: "listening",
      labelTr: SKILL_LABELS.listening,
      drillKind: "choice",
      route: "/app/lessons",
      reasonTr: "Dinleme skorun düşük — ders dinleme bölümüne odaklan.",
    },
    vocab: {
      skill: "vocab",
      labelTr: SKILL_LABELS.vocab,
      drillKind: "flashcard",
      route: "/app/drill",
      reasonTr: "Kelime skorun düşük — ezberleme turu önerilir.",
    },
    grammar: {
      skill: "grammar",
      labelTr: SKILL_LABELS.grammar,
      drillKind: "cloze",
      route: "/app/drill",
      reasonTr: "Dilbilgisi skorun düşük — cümle tamamlama yap.",
    },
    writing: {
      skill: "writing",
      labelTr: SKILL_LABELS.writing,
      drillKind: "order",
      route: "/app/lessons",
      reasonTr: "Yazma skorun düşük — ders yazma görevlerini tamamla.",
    },
  };

  const rec = map[weakest];
  if (mode !== "work" && weakest === "speaking") {
    return { ...rec, route: "/app/simulator", reasonTr: "Konuşma pratiği için simülatör en iyi seçenek." };
  }
  return rec;
}

export { SKILL_LABELS };
