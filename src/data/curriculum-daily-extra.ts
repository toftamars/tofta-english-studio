import type { Unit } from "../types";

export const DAILY_EXTRA_UNITS: Unit[] = [
  {
    id: 4,
    slug: "daily-health",
    title: "Doctor & Pharmacy",
    titleTr: "Doktor ve Eczane",
    emoji: "🩺",
    mode: "daily",
    goalTr: "Sağlık randevusu ve eczanede iletişim.",
    phrases: [
      { en: "I've had this pain for three days.", tr: "Üç gündür bu ağrım var." },
      { en: "Do you have something for a sore throat?", tr: "Boğaz ağrısı için bir şey var mı?" },
      { en: "Take one tablet after meals.", tr: "Yemekten sonra bir tablet alın." },
    ],
    vocab: [{ id: "health", title: "Sağlık", items: [
      { en: "appointment", tr: "randevu", example: "I need to make an appointment." },
      { en: "prescription", tr: "reçete", example: "Do you have a prescription?" },
      { en: "symptom", tr: "belirti", example: "What are your symptoms?" },
    ]}],
    grammar: { title: "Describing symptoms", titleTr: "Belirti anlatma", explanation: "I've had… for + süre", examples: [
      { en: "I've had a fever since yesterday.", tr: "Dünden beri ateşim var." },
    ]},
    listening: ["What seems to be the problem?", "Any allergies to medication?"],
    speaking: ["I've had a headache for two days.", "Is this available without a prescription?"],
    writing: { taskTr: "Doktora şikayetini 3 cümleyle yaz.", sample: "I've had a sore throat for three days. I also have a mild fever. I haven't taken any medicine yet." },
    quiz: [{ q: "I've had pain FOR three days = ?", options: ["3 gündür", "3 gün sonra", "3 günde bir"], answer: 0, explainTr: "For + süre." }],
  },
  {
    id: 5,
    slug: "daily-home",
    title: "Home & Repairs",
    titleTr: "Ev ve Tamir",
    emoji: "🏠",
    mode: "daily",
    goalTr: "Evde tesisatçı, komşu, tamir diyalogları.",
    phrases: [
      { en: "The tap is leaking badly.", tr: "Musluk çok damlıyor." },
      { en: "Could you come tomorrow morning?", tr: "Yarın sabah gelebilir misiniz?" },
      { en: "How much will it cost approximately?", tr: "Yaklaşık ne kadar tutar?" },
    ],
    vocab: [{ id: "home", title: "Ev", items: [
      { en: "plumber", tr: "tesisatçı", example: "I'll call a plumber." },
      { en: "leak", tr: "sızıntı", example: "There's a leak under the sink." },
      { en: "neighbor", tr: "komşu", example: "My neighbor is very friendly." },
    ]}],
    grammar: { title: "Polite requests at home", titleTr: "Evde kibar istek", explanation: "Could you…?", examples: [
      { en: "Could you fix it today?", tr: "Bugün tamir edebilir misiniz?" },
    ]},
    listening: ["I'll need to replace the washer.", "That'll be about 200 lira."],
    speaking: ["The kitchen tap is leaking.", "When can you come?"],
    writing: { taskTr: "Tesisatçıya sorunu anlatan kısa not (3 cümle).", sample: "The kitchen tap has been leaking since yesterday. Water collects under the sink. Could you come tomorrow?" },
    quiz: [{ q: "Plumber fixes:", options: ["Pipes and taps", "Computers", "Cars"], answer: 0, explainTr: "Tesisatçı." }],
  },
  {
    id: 6,
    slug: "daily-transport",
    title: "Transport & Directions",
    titleTr: "Ulaşım ve Yol Tarifi",
    emoji: "🚇",
    mode: "daily",
    minCefr: "A2",
    goalTr: "Metro, taksi, yol sorma.",
    phrases: [
      { en: "Does this train go to Levent?", tr: "Bu tren Levent'e gidiyor mu?" },
      { en: "How long will it take by taxi?", tr: "Taksiyle ne kadar sürer?" },
      { en: "Please drop me at the main entrance.", tr: "Ana girişte indirin lütfen." },
    ],
    vocab: [{ id: "transport", title: "Ulaşım", items: [
      { en: "transfer", tr: "aktarma", example: "You need to transfer at Gayrettepe." },
      { en: "fare", tr: "ücret", example: "The fare is about 150 lira." },
      { en: "platform", tr: "peron", example: "Platform 3 is on the left." },
    ]}],
    grammar: { title: "Asking directions", titleTr: "Yol sorma", explanation: "Does this… go to…?", examples: [
      { en: "Where do I change for M2?", tr: "M2 için nerede aktarma yapmalıyım?" },
    ]},
    listening: ["Next stop: Levent.", "All passengers must validate their tickets."],
    speaking: ["Is this the right platform for Taksim?", "How much to Istinye Park, please?"],
    writing: { taskTr: "Taksiciye adres veren 3 cümle yaz.", sample: "Istinye Park, please. Main entrance. How long will it take?" },
    quiz: [{ q: "Transfer means:", options: ["Change lines", "Buy ticket", "Exit"], answer: 0, explainTr: "Aktarma." }],
  },
];
