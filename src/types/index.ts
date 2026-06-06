// ============================================================
// Tofta English Studio — Ortak Tip Tanımları
// ============================================================

export type ProfileId = "hulya" | "alper";

/** Öğrenme modu — giriş sonrası seçilir, içerik ve ilerleme buna göre ayrılır */
export type LearningMode = "work" | "daily" | "social";

/** CEFR seviye bandı — XP'den bağımsız gerçek dil seviyesi */
export type CefrBand = "A1" | "A2" | "B1" | "B2";

export interface SkillScores {
  speaking: number;
  listening: number;
  vocab: number;
  grammar: number;
  writing: number;
}

/** Aralıklı tekrar kartı (yanlış quiz/kelime) */
export interface ReviewItem {
  id: string;
  mode: LearningMode;
  kind: "vocab" | "quiz" | "phrase";
  front: string;
  back: string;
  speak?: string;
  dueAt: string;
  intervalDays: number;
  ease: number;
}

/** Canlı seviye takibi — oyun XP'sinden ayrı */
export interface AdaptiveState {
  cefrBand: CefrBand;
  skills: SkillScores;
  reviews: ReviewItem[];
  history: { date: string; kind: string; score: number; mode: LearningMode }[];
  updatedAt: string;
}

export interface LearningModeMeta {
  id: LearningMode;
  label: string;
  labelTr: string;
  emoji: string;
  descriptionTr: string;
  accent: string;
}

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
  writing?: { taskTr: string; sample: string; checklist?: string[] };
  /** Dinleme anlama soruları (TTS sonrası) */
  listeningQuiz?: QuizQuestion[];
  quiz?: QuizQuestion[];
  /** Hangi moda ait (varsayılan work) */
  mode?: LearningMode;
  /** Önerilen minimum CEFR — seviye yükseldikçe açılır */
  minCefr?: CefrBand;
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
  mode?: LearningMode;
  minCefr?: CefrBand;
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
  /** @deprecated unitsByMode kullan — geriye uyumluluk için tutulur */
  units: SectionProgress;
  /** Mod bazlı ilerleme */
  unitsByMode?: Partial<Record<LearningMode, SectionProgress>>;
  scenariosDone: string[];
  badges: string[];
  activeMode?: LearningMode;
  adaptive?: AdaptiveState;
}

export interface AuthUser {
  id: string;
  email?: string;
  profileId: ProfileId;
  displayName: string;
}

// ---------------- Maison Radar (güncel içerik) ----------------

/** Otomatik (RSS) çekilen haber/gelişme öğesi */
export interface RadarItem {
  title: string;
  source: string;
  url: string;
  publishedAt: string; // ISO
  summary?: string;
  tag?: string; // Koleksiyon / Marka / Moda / Sektör
}

/** public/radar.json yapısı (cron tarafından üretilir) */
export interface RadarData {
  updatedAt: string; // ISO
  news: RadarItem[];
}

/** Hülya/Alper'in elle eklediği "insider" not — en güvenilir, yasal kaynak */
export interface RadarNote {
  id: string;
  authorId?: string;
  authorName?: string;
  title: string;
  body: string;
  category: RadarNoteCategory;
  createdAt: string; // ISO
}

export type RadarNoteCategory =
  | "Koleksiyon"
  | "Materyal"
  | "Mağaza"
  | "Vizyon"
  | "Müşteri"
  | "Diğer";

/** Günün LV temalı kelimesi */
export interface WordOfDay {
  en: string;
  tr: string;
  note: string; // LV bağlamında neden önemli
}

// ---------------- Ürün Kataloğu ----------------

/**
 * Ürün kartı — kullanıcı (tüketici olarak) gördüğü bilgiyi elle ya da
 * "yapıştır-ayrıştır" ile ekler. Görsel yalnızca LİNK olarak tutulur
 * (telif açısından temiz). Uygulama otomatik istek atmaz.
 */
export interface Product {
  id: string;
  name: string;
  line?: string; // hat: Speedy / Capucines / Neverfull …
  category?: ProductCategory;
  material?: string;
  priceText?: string; // serbest metin: "≈ 2.500 €"
  reference?: string; // ör. M29068
  origin?: string; // menşe: France / Italy / Spain …
  summary?: string; // kullanıcının kendi kısa özeti (telif yok)
  imageUrl?: string; // sadece link
  url?: string; // ürün sayfası linki
  authorName?: string;
  createdAt: string;
}

export type ProductCategory =
  | "Çanta"
  | "Küçük Deri"
  | "Aksesuar"
  | "Ayakkabı"
  | "Hazır Giyim"
  | "Parfüm"
  | "Diğer";

/** Yapıştır-ayrıştır sonucu (kısmi alanlar). */
export type ParsedProduct = Partial<
  Pick<Product, "name" | "material" | "priceText" | "reference" | "summary" | "imageUrl" | "url">
>;

// ---------------- Otomatik Çalışma Kartları ----------------

export type DrillKind = "flashcard" | "cloze" | "choice" | "match" | "order" | "mixed";

/** Procedural alıştırma egzersizi */
export interface DrillExercise {
  id: string;
  kind: DrillKind;
  prompt: string;
  promptTr?: string;
  answer: string;
  options?: string[];
  hint?: string;
  speak?: string;
  /** cloze: cümlede boşluklu metin */
  sentence?: string;
  /** order: karışık kelimeler */
  words?: string[];
}

/** Kelime/cümle havuzu girdisi */
export interface PoolEntry {
  en: string;
  tr: string;
  example?: string;
  def?: string;
  mode?: LearningMode;
  tags?: string[];
}

export type StudyCardKind = "flashcard" | "quiz" | "dialogue";

/** Ürün/insider nottan otomatik üretilen çalışma kartı (şablon tabanlı, deterministik). */
export interface StudyCard {
  id: string;
  kind: StudyCardKind;
  source: "product" | "note";
  topic: string; // kaynağın adı (ürün adı / not başlığı)
  front: string; // ön yüz: EN ifade / soru / istem
  back: string; // arka yüz: TR / açıklama / cevap
  speak?: string; // sesli okunacak EN metin
  options?: string[]; // quiz şıkları
  answerIndex?: number; // quiz doğru şık
  dialogue?: { speaker: string; text: string }[]; // diyalog satırları
}
