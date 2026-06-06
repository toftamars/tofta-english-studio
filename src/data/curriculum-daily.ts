import type { Unit } from "../types";

/** Daily mod — günlük hayat İngilizcesi */
export const DAILY_UNITS: Unit[] = [
  {
    id: 1,
    slug: "daily-morning",
    title: "Morning Routine",
    titleTr: "Sabah Rutini",
    emoji: "🌅",
    goalTr: "Sabah selamlaşma, kahvaltı ve güne başlama ifadeleri.",
    mode: "daily",
    phrases: [
      { en: "Good morning! Did you sleep well?", tr: "Günaydın! İyi uyudun mu?" },
      { en: "I'm running a bit late today.", tr: "Bugün biraz geç kalıyorum." },
      { en: "I'll have a coffee and then head out.", tr: "Bir kahve içip çıkacağım." },
      { en: "Have a great day!", tr: "Harika bir gün geçir!" },
    ],
    vocab: [
      {
        id: "morning",
        title: "Sabah",
        items: [
          { en: "alarm", tr: "alarm", example: "My alarm goes off at seven." },
          { en: "breakfast", tr: "kahvaltı", example: "I never skip breakfast." },
          { en: "commute", tr: "işe gidiş", example: "The commute takes forty minutes." },
        ],
      },
    ],
    grammar: {
      title: "Present Simple for routines",
      titleTr: "Rutinler için Geniş Zaman",
      explanation: "Günlük alışkanlıklar için Present Simple kullanırız: I wake up at 6.",
      examples: [
        { en: "I always check my phone first.", tr: "Her zaman önce telefonuma bakarım." },
        { en: "She usually walks to work.", tr: "Genelde işe yürür." },
      ],
    },
    listening: [
      "Good morning! It's a beautiful day.",
      "I'm a little tired, but I'm ready to go.",
      "Don't forget your umbrella — it might rain.",
    ],
    listeningQuiz: [
      {
        q: "What might the speaker need?",
        options: ["An umbrella", "A passport", "A gift box"],
        answer: 0,
        explainTr: "Konuşmacı yağmur ihtimalinden bahsediyor.",
      },
    ],
    speaking: ["Good morning! How are you today?", "I usually wake up at seven."],
    writing: {
      taskTr: "Sabah rutinini 3 cümleyle yaz (Present Simple kullan).",
      sample: "I wake up at 6:30. I have coffee and toast. Then I leave for work at 8.",
      checklist: ["Present Simple kullandın mı?", "En az 3 cümle var mı?", "Zaman ifadesi var mı? (at, usually, always)"],
    },
    quiz: [
      {
        q: "Which is correct for a daily habit?",
        options: ["I am going to work every day.", "I go to work every day.", "I went to work every day."],
        answer: 1,
        explainTr: "Alışkanlıklar için Geniş Zaman: I go.",
      },
    ],
  },
  {
    id: 2,
    slug: "daily-shopping",
    title: "Shopping & Errands",
    titleTr: "Alışveriş ve İşler",
    emoji: "🛒",
    goalTr: "Market, eczane ve günlük alışveriş diyalogları.",
    mode: "daily",
    phrases: [
      { en: "Excuse me, where can I find the milk?", tr: "Affedersiniz, sütü nerede bulabilirim?" },
      { en: "Do you have this in a larger size?", tr: "Bunun daha büyük bedeni var mı?" },
      { en: "Can I pay by card?", tr: "Kartla ödeyebilir miyim?" },
      { en: "Could I have a receipt, please?", tr: "Fiş alabilir miyim, lütfen?" },
    ],
    vocab: [
      {
        id: "shop",
        title: "Alışveriş",
        items: [
          { en: "aisle", tr: "koridor (reyon)", example: "The bread is in aisle three." },
          { en: "checkout", tr: "kasa", example: "There's a long queue at the checkout." },
          { en: "discount", tr: "indirim", example: "This item is on discount." },
        ],
      },
    ],
    grammar: {
      title: "Polite requests: Can I / Could I",
      titleTr: "Kibar istekler",
      explanation: "Could I daha kibar; Can I günlük konuşmada yaygın.",
      examples: [
        { en: "Could I try this on?", tr: "Bunu deneyebilir miyim?" },
        { en: "Can you help me, please?", tr: "Yardım edebilir misiniz?" },
      ],
    },
    listening: [
      "That'll be twelve pounds fifty, please.",
      "Sorry, we're out of stock on that item.",
      "Would you like a bag?",
    ],
    listeningQuiz: [
      {
        q: "What does 'out of stock' mean?",
        options: ["Not available", "On sale", "Very expensive"],
        answer: 0,
        explainTr: "Stokta yok demek.",
      },
    ],
    speaking: ["Excuse me, how much is this?", "Could I pay by card, please?"],
    writing: {
      taskTr: "Markette bir şey sormak için kısa bir diyalog yaz (4 satır).",
      sample: "A: Excuse me, where is the cheese?\nB: Aisle five, on the left.\nA: Thank you!\nB: You're welcome.",
      checklist: ["Excuse me veya Could I kullandın mı?", "Teşekkür var mı?", "En az 4 satır mı?"],
    },
    quiz: [
      {
        q: "Most polite request:",
        options: ["Give me water.", "Could I have some water, please?", "I want water."],
        answer: 1,
        explainTr: "Could I + please en kibar seçenek.",
      },
    ],
  },
  {
    id: 3,
    slug: "daily-travel",
    title: "Travel & Airport",
    titleTr: "Seyahat ve Havalimanı",
    emoji: "✈️",
    goalTr: "Check-in, güvenlik, uçuş kapısı ifadeleri.",
    mode: "daily",
    minCefr: "A2",
    phrases: [
      { en: "I'd like to check in, please.", tr: "Check-in yapmak istiyorum, lütfen." },
      { en: "Is this the gate for flight TK123?", tr: "Bu TK123 uçuşunun kapısı mı?" },
      { en: "My flight has been delayed.", tr: "Uçuşum rötar yaptı." },
      { en: "Where is the baggage claim?", tr: "Bagaj alım yeri nerede?" },
    ],
    vocab: [
      {
        id: "travel",
        title: "Seyahat",
        items: [
          { en: "boarding pass", tr: "biniş kartı", example: "Show your boarding pass at the gate." },
          { en: "layover", tr: "aktarma", example: "We have a two-hour layover in Dubai." },
          { en: "customs", tr: "gümrük", example: "We went through customs quickly." },
        ],
      },
    ],
    grammar: {
      title: "Present Perfect: delays & changes",
      titleTr: "Present Perfect: gecikme ve değişiklikler",
      explanation: "Yakın geçmişte olan ama şimdi etkisi devam eden: My flight has been delayed.",
      examples: [
        { en: "They have changed the gate.", tr: "Kapıyı değiştirdiler." },
        { en: "I have lost my passport!", tr: "Pasaportumu kaybettim!" },
      ],
    },
    listening: [
      "Please proceed to gate B12 for boarding.",
      "Flight TK456 is now boarding.",
      "All passengers must have their passports ready.",
    ],
    listeningQuiz: [
      {
        q: "What should passengers do?",
        options: ["Have passports ready", "Go to baggage claim", "Check out of the hotel"],
        answer: 0,
        explainTr: "Pasaport hazır olmalı deniyor.",
      },
    ],
    speaking: ["Where is gate B12?", "Has my flight been delayed?"],
    writing: {
      taskTr: "Havalimanında yaşanan kısa bir sorunu 3 cümleyle anlat.",
      sample: "My flight was delayed by one hour. I waited at the gate. Finally, we boarded at 3 p.m.",
      checklist: ["Past Simple veya Present Perfect kullandın mı?", "Sorun + çözüm var mı?", "Zaman ifadesi var mı?"],
    },
    quiz: [
      {
        q: "Correct for a recent delay:",
        options: ["My flight delayed.", "My flight has been delayed.", "My flight is delay."],
        answer: 1,
        explainTr: "Present Perfect passive: has been delayed.",
      },
    ],
  },
];
