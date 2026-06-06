import type { Scenario } from "../types";

export const ALPER_SCENARIOS: Scenario[] = [
  {
    slug: "alper-customer-guitar",
    title: "First Guitar Buyer",
    titleTr: "İlk Gitar Alıcısı",
    emoji: "🎸",
    kind: "client",
    mode: "work",
    descriptionTr: "Başlangıç müşterisine gitar öner.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "I'm buying my first guitar. What do you recommend?", tr: "İlk gitarımı alıyorum. Ne önerirsiniz?", replies: [
        { en: "For beginners, I'd suggest this acoustic — it's easy to play and includes a case.", tr: "Başlangıç için bu akustiği öneririm — çalması kolay ve kılıf dahil.", best: true, feedbackTr: "Net öneri + neden." },
        { en: "Buy the most expensive one.", tr: "En pahalısını al.", feedbackTr: "Agresif; ihtiyaca göre öner." },
      ]},
    ],
  },
  {
    slug: "alper-supplier-delay",
    title: "Supplier Delay",
    titleTr: "Tedarik Gecikmesi",
    emoji: "📦",
    kind: "manager",
    mode: "work",
    descriptionTr: "Tedarikçi gecikmesi — müşteriye bilgi ver.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "The piano you ordered — when will it arrive?", tr: "Sipariş ettiğiniz piyano — ne zaman gelir?", replies: [
        { en: "I'm sorry for the delay. It should arrive by Friday — I'll call you as soon as it's in.", tr: "Gecikme için özür dilerim. Cuma'ya kadar gelmeli — gelir gelmez ararım.", best: true, feedbackTr: "Özür + net tarih + takip." },
      ]},
    ],
  },
  {
    slug: "alper-staff-feedback",
    title: "Staff Feedback",
    titleTr: "Personel Geri Bildirimi",
    emoji: "👔",
    kind: "manager",
    mode: "work",
    minCefr: "B1",
    descriptionTr: "Satış temsilcisine performans geri bildirimi.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "You wanted to talk about my performance?", tr: "Performansım hakkında konuşmak istediniz?", replies: [
        { en: "Yes — your customer service has been excellent. Sales are up 20% this month. Well done!", tr: "Evet — müşteri hizmetin mükemmel. Bu ay satışlar %20 arttı. Aferin!", best: true, feedbackTr: "Spesifik olumlu geri bildirim." },
      ]},
    ],
  },
];
