import type { CefrBand, LearningMode, LearningModeMeta } from "../types";

export const LEARNING_MODES: LearningModeMeta[] = [
  {
    id: "work",
    label: "Work",
    labelTr: "İş",
    emoji: "👜",
    descriptionTr: "Louis Vuitton mağaza dili — müşteri, ürün, yönetici, İstinye Park",
    accent: "#9c5a3c",
  },
  {
    id: "daily",
    label: "Daily",
    labelTr: "Günlük",
    emoji: "☀️",
    descriptionTr: "Ev, alışveriş, sağlık, seyahat — günlük hayat İngilizcesi",
    accent: "#7a6a48",
  },
  {
    id: "social",
    label: "Social",
    labelTr: "Sosyal",
    emoji: "💬",
    descriptionTr: "Sohbet, davet, iltifat, duygular — sıcak ve doğal iletişim",
    accent: "#6b5b7a",
  },
];

export function getModeMeta(mode: LearningMode): LearningModeMeta {
  return LEARNING_MODES.find((m) => m.id === mode) ?? LEARNING_MODES[0];
}

/** CEFR band sıralaması — seviye kontrolü için */
export const CEFR_ORDER: CefrBand[] = ["A1", "A2", "B1", "B2"];

export function cefrAtLeast(current: CefrBand, required: CefrBand): boolean {
  return CEFR_ORDER.indexOf(current) >= CEFR_ORDER.indexOf(required);
}

export function cefrLabel(band: CefrBand): string {
  const labels: Record<CefrBand, string> = {
    A1: "Başlangıç",
    A2: "Temel",
    B1: "Orta",
    B2: "İleri",
  };
  return `${band} · ${labels[band]}`;
}
