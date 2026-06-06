import type { Unit } from "../types";

/** Alper — Zuhal Müzik mağaza müdürü müfredatı */
export const ALPER_UNITS: Unit[] = [
  {
    id: 1,
    slug: "alper-opening",
    title: "Store Opening & Team Brief",
    titleTr: "Mağaza Açılışı ve Ekip Brifingi",
    emoji: "🎵",
    mode: "work",
    goalTr: "Sabah açılış ve ekip toplantısı İngilizcesi.",
    phrases: [
      { en: "Good morning, team. Let's review today's targets.", tr: "Günaydın ekip. Bugünkü hedefleri gözden geçirelim." },
      { en: "We have a delivery arriving at noon.", tr: "Öğlen teslimat geliyor." },
      { en: "Please make sure the display is ready.", tr: "Vitrinin hazır olduğundan emin olun." },
    ],
    vocab: [{ id: "mgr", title: "Yönetim", items: [
      { en: "target", tr: "hedef", example: "Today's sales target is 50,000 lira." },
      { en: "briefing", tr: "brifing", example: "We have a short briefing at nine." },
      { en: "display", tr: "vitrin", example: "The display looks great." },
    ]}],
    grammar: { title: "Giving instructions", titleTr: "Talimat verme", explanation: "Please make sure… / Let's…", examples: [
      { en: "Please make sure the stockroom is tidy.", tr: "Depo düzenli olsun lütfen." },
    ]},
    listening: ["The shipment will arrive at twelve.", "We need extra staff this weekend."],
    speaking: ["Let's open on time today.", "Any issues I should know about?"],
    writing: { taskTr: "Ekibe kısa sabah mesajı (3 cümle).", sample: "Good morning team. Today's focus is guitar sales. Delivery at noon — please prepare the stockroom." },
    quiz: [{ q: "Briefing is:", options: ["Short team meeting", "Closing store", "Lunch break"], answer: 0, explainTr: "Kısa ekip toplantısı." }],
  },
  {
    id: 2,
    slug: "alper-instruments",
    title: "Selling Instruments",
    titleTr: "Enstrüman Satışı",
    emoji: "🎸",
    mode: "work",
    goalTr: "Müşteriye enstrüman danışmanlığı.",
    phrases: [
      { en: "Are you looking for acoustic or electric?", tr: "Akustik mi elektrik mi arıyorsunuz?" },
      { en: "This model is perfect for beginners.", tr: "Bu model başlangıç için mükemmel." },
      { en: "Would you like to try it in our sound room?", tr: "Ses odamızda denemek ister misiniz?" },
    ],
    vocab: [{ id: "inst", title: "Enstrüman", items: [
      { en: "acoustic", tr: "akustik", example: "An acoustic guitar is quieter." },
      { en: "amplifier", tr: "amplifikatör", example: "You'll need an amplifier too." },
      { en: "warranty", tr: "garanti", example: "It comes with a two-year warranty." },
    ]}],
    grammar: { title: "Recommendations", titleTr: "Öneri", explanation: "Perfect for… / ideal for…", examples: [
      { en: "This is ideal for jazz.", tr: "Bu caz için ideal." },
    ]},
    listening: ["This guitar has a maple neck.", "We can order it in other colours."],
    speaking: ["What style of music do you play?", "I'd recommend starting with this model."],
    writing: { taskTr: "Başlangıç müşterisine öneri (3 cümle).", sample: "For beginners, I recommend this acoustic guitar. It's easy to play and comes with a case. Would you like to try it?" },
    quiz: [{ q: "Acoustic guitar:", options: ["No amp needed", "Always electric", "Only for experts"], answer: 0, explainTr: "Amplifikatör gerekmez." }],
  },
  {
    id: 3,
    slug: "alper-staff",
    title: "Managing Staff",
    titleTr: "Personel Yönetimi",
    emoji: "👔",
    mode: "work",
    goalTr: "Vardiya, performans, geri bildirim.",
    phrases: [
      { en: "Can you cover the evening shift?", tr: "Akşam vardiyasını alabilir misin?" },
      { en: "Your sales figures have improved — well done.", tr: "Satış rakamların iyileşti — aferin." },
      { en: "Let's schedule a one-to-one next week.", tr: "Gelecek hafta birebir planlayalım." },
    ],
    vocab: [{ id: "staff", title: "Personel", items: [
      { en: "shift", tr: "vardiya", example: "The evening shift starts at four." },
      { en: "feedback", tr: "geri bildirim", example: "I'd like to give you some feedback." },
      { en: "performance", tr: "performans", example: "Your performance has been excellent." },
    ]}],
    grammar: { title: "Performance review", titleTr: "Performans", explanation: "Well done / Could improve on…", examples: [
      { en: "You've done really well this month.", tr: "Bu ay gerçekten iyi iş çıkardın." },
    ]},
    listening: ["I need someone for Saturday.", "We exceeded our target last week."],
    speaking: ["Can you work overtime this Friday?", "Great job on the piano sales."],
    writing: { taskTr: "Personele olumlu geri bildirim (3 cümle).", sample: "Your customer service has been excellent this month. Your sales are up 15%. Keep up the great work!" },
    quiz: [{ q: "Shift means:", options: ["Work period", "Holiday", "Product"], answer: 0, explainTr: "Vardiya." }],
    minCefr: "B1",
  },
];
