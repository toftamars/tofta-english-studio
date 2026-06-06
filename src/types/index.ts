// ============================================================
// Tofta English Studio — Ortak Tip Tanımları
// ============================================================

export type ProfileId = "hulya" | "alper";

export interface Profile {
  id: ProfileId;
  name: string;
  fullName: string;
  role: string;
  context: string;
  accent: string;
  available: boolean; // Alper 2. fazda açılacak
}

/** İngilizce-Türkçe ifade çifti */
export interface Phrase {
  en: string;
  tr: string;
}

/** Kelime kartı */
export interface VocabItem {
  en: string;
  tr: string;
  def?: string; // basit İngilizce tanım
  example?: string;
}

export interface VocabGroup {
  id: string;
  title: string;
  items: VocabItem[];
}

/** Dilbilgisi bölümü */
export interface GrammarPoint {
  title: string;
  titleTr: string;
  explanation: string;
  examples: Phrase[];
}

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  explainTr: string;
}

export type LessonSectionKind =
  | "phrases"
  | "vocab"
  | "grammar"
  | "listening"
  | "speaking"
  | "writing"
  | "quiz";

/** Bir ders ünitesi */
export interface Unit {
  id: number;
  slug: string;
  title: string;
  titleTr: string;
  emoji: string;
  goalTr: string;
  /** Satış seremonisi / yönetici iletişimi ifadeleri */
  phrases?: Phrase[];
  phrasesTitle?: string;
  vocab?: VocabGroup[];
  grammar?: GrammarPoint;
  listening?: string[];
  speaking?: string[];
  writing?: { taskTr: string; sample: string };
  quiz?: QuizQuestion[];
  /** Bu üniteyle ilişkili rol-yapma senaryosu (slug) */
  scenarioSlug?: string;
}

/** Rol-yapma simülatörü için diyalog adımı */
export interface DialogueStep {
  speaker: "client" | "manager" | "narrator";
  en: string;
  tr: string;
  /** Hülya'nın olası cevap seçenekleri (varsa kullanıcı seçer / söyler) */
  replies?: ReplyOption[];
}

export interface ReplyOption {
  en: string;
  tr: string;
  /** En iyi/uygun cevap mı? */
  best?: boolean;
  feedbackTr?: string;
}

export interface Scenario {
  slug: string;
  title: string;
  titleTr: string;
  emoji: string;
  kind: "client" | "manager";
  descriptionTr: string;
  difficulty: 1 | 2 | 3;
  steps: DialogueStep[];
}

// ---------------- İlerleme / Kullanıcı ----------------

export interface SectionProgress {
  [unitSlug: string]: {
    sections: Partial<Record<LessonSectionKind, boolean>>;
    completed: boolean;
    quizBest?: number;
  };
}

export interface UserProgress {
  profileId: ProfileId;
  xp: number;
  streak: number;
  lastActiveDay: string | null;
  units: SectionProgress;
  scenariosDone: string[];
  badges: string[];
}

export interface AuthUser {
  id: string;
  email?: string;
  profileId: ProfileId;
  displayName: string;
}
