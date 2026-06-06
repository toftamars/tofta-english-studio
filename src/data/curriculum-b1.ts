import type { Unit } from "../types";

/** Work mod — B1 yönetici modülü (seviye B1 olunca açılır) */
export const B1_MANAGER_UNITS: Unit[] = [
  {
    id: 11,
    slug: "manager-kpi",
    title: "KPI & Performance Talk",
    titleTr: "KPI ve Performans Konuşması",
    emoji: "📊",
    goalTr: "Dönüşüm oranı, hedef ve geri bildirim ifadeleri.",
    mode: "work",
    minCefr: "B1",
    phrases: [
      { en: "Our conversion rate is up by three percent this month.", tr: "Dönüşüm oranımız bu ay yüzde üç arttı." },
      { en: "I'd like to discuss my targets for next quarter.", tr: "Gelecek çeyrek hedeflerimi konuşmak istiyorum." },
      { en: "What areas should I focus on to improve?", tr: "Gelişmek için hangi alanlara odaklanmalıyım?" },
      { en: "Thank you for the constructive feedback.", tr: "Yapıcı geri bildirim için teşekkürler." },
    ],
    vocab: [
      {
        id: "kpi",
        title: "Performans",
        items: [
          { en: "conversion rate", tr: "dönüşüm oranı", example: "Our conversion rate improved." },
          { en: "target", tr: "hedef", example: "I met my monthly target." },
          { en: "benchmark", tr: "kıyaslama", example: "We benchmark against last year." },
        ],
      },
    ],
    grammar: {
      title: "Present Perfect for results",
      titleTr: "Sonuçlar için Present Perfect",
      explanation: "Bu ay / bu çeyrek sonuçları: Sales have increased.",
      examples: [
        { en: "We have exceeded our target.", tr: "Hedefimizi aştık." },
        { en: "Client satisfaction has improved.", tr: "Müşteri memnuniyeti arttı." },
      ],
    },
    listening: [
      "Your numbers are strong, but we need more clienteling.",
      "Let's set a clear action plan for next month.",
      "I appreciate your transparency on the challenges.",
    ],
    listeningQuiz: [
      {
        q: "What does the manager want more of?",
        options: ["Clienteling", "Discounts", "Overtime"],
        answer: 0,
        explainTr: "Daha fazla clienteling isteniyor.",
      },
    ],
    speaking: ["Our conversion rate has improved this month.", "What should I focus on next?"],
    writing: {
      taskTr: "Yöneticine kısa performans özeti yaz (3-4 cümle, e-posta tarzı).",
      sample: "Dear Sarah, This month our conversion rate increased by 3%. I focused on clienteling and follow-ups. I'd welcome your feedback on next steps.",
      checklist: ["Sayı/hedef belirttin mi?", "Present Perfect kullandın mı?", "Geri bildirim istedin mi?"],
    },
    quiz: [
      {
        q: "Correct: 'Sales ___ by 5% this quarter.'",
        options: ["increased", "have increased", "are increasing"],
        answer: 1,
        explainTr: "Bu çeyrek sonucu → Present Perfect.",
      },
    ],
    scenarioSlug: "manager-feedback",
  },
  {
    id: 12,
    slug: "manager-email",
    title: "Professional Email",
    titleTr: "Profesyonel E-posta",
    emoji: "✉️",
    goalTr: "Vardiya devri, stok, randevu e-posta kalıpları.",
    mode: "work",
    minCefr: "B1",
    phrases: [
      { en: "Please find attached the stock report.", tr: "Stok raporunu ekte bulabilirsiniz." },
      { en: "I am writing to confirm tomorrow's appointment.", tr: "Yarınki randevuyu teyit etmek için yazıyorum." },
      { en: "Could we reschedule to Thursday at 10 a.m.?", tr: "Perşembe saat 10'a erteleyebilir miyiz?" },
      { en: "Thank you for your prompt reply.", tr: "Hızlı dönüşünüz için teşekkürler." },
    ],
    vocab: [
      {
        id: "email",
        title: "E-posta",
        items: [
          { en: "attached", tr: "ekte", example: "Please see the file attached." },
          { en: "follow up", tr: "takip etmek", example: "I'll follow up tomorrow." },
          { en: "regarding", tr: "… hakkında", example: "Regarding your request…" },
        ],
      },
    ],
    grammar: {
      title: "Formal openings & closings",
      titleTr: "Resmi açılış ve kapanış",
      explanation: "I am writing to… / I look forward to hearing from you.",
      examples: [
        { en: "I am writing to inform you that…", tr: "… bilgilendirmek için yazıyorum." },
        { en: "Please do not hesitate to contact me.", tr: "Benimle iletişime geçmekten çekinmeyin." },
      ],
    },
    listening: [
      "Could you send me the client list by end of day?",
      "I'll cc you on the email to head office.",
      "Let's touch base after the morning briefing.",
    ],
    listeningQuiz: [
      {
        q: "What does 'cc' mean in email?",
        options: ["Send a copy to someone", "Delete the email", "Reply to all customers"],
        answer: 0,
        explainTr: "Cc = carbon copy, kopya göndermek.",
      },
    ],
    speaking: ["I am writing to confirm our meeting.", "Please find the report attached."],
    writing: {
      taskTr: "Vardiya devri e-postası yaz (konu + 4 cümle).",
      sample: "Subject: Shift handover — Saturday\n\nHi team, Today we had 12 appointments. Two VIP clients visited. Stock of Capucines is low — please reorder. Best, Hülya",
      checklist: ["Konu satırı var mı?", "Please find / I am writing kullandın mı?", "Net bilgi aktardın mı?"],
    },
    quiz: [
      {
        q: "Most professional opening:",
        options: ["Hey!", "I am writing to confirm…", "Yo, quick question."],
        answer: 1,
        explainTr: "Resmi e-posta açılışı.",
      },
    ],
  },
  {
    id: 13,
    slug: "manager-vip-istinye",
    title: "VIP & İstinye Park",
    titleTr: "VIP ve İstinye Park",
    emoji: "⭐",
    goalTr: "İstinye Park müşteri profili, VIP clienteling, turist ailesi.",
    mode: "work",
    minCefr: "B1",
    phrases: [
      { en: "Welcome back — it's wonderful to see you again.", tr: "Tekrar hoş geldiniz — sizi tekrar görmek harika." },
      { en: "We have reserved a private appointment for you.", tr: "Sizin için özel bir randevu ayırdık." },
      { en: "İstinye Park can get busy on weekends — shall I suggest a quieter time?", tr: "İstinye Park hafta sonları yoğun olabilir — daha sakin bir saat önereyim mi?" },
      { en: "I'll personally follow up on your order.", tr: "Siparişinizi şahsen takip edeceğim." },
    ],
    vocab: [
      {
        id: "vip",
        title: "VIP & Boutique",
        items: [
          { en: "clienteling", tr: "müşteri ilişkileri yönetimi", example: "Strong clienteling builds loyalty." },
          { en: "appointment", tr: "randevu", example: "She has a private appointment." },
          { en: "flagship", tr: "amiral mağaza", example: "İstinye is a key location." },
        ],
      },
    ],
    grammar: {
      title: "Personal touch: I'll personally…",
      titleTr: "Kişisel dokunuş",
      explanation: "VIP'de kişisel sorumluluk vurgusu: I'll personally ensure…",
      examples: [
        { en: "I'll personally call you when it arrives.", tr: "Geldiğinde şahsen arayacağım." },
        { en: "We'd be delighted to welcome you.", tr: "Sizi ağırlamaktan memnuniyet duyarız." },
      ],
    },
    listening: [
      "This client spends regularly — please offer the new collection preview.",
      "The family is visiting from the Gulf — they prefer Arabic-speaking staff if possible.",
      "Saturday afternoon is our peak time at İstinye.",
    ],
    listeningQuiz: [
      {
        q: "When is the boutique busiest?",
        options: ["Saturday afternoon", "Monday morning", "Wednesday night"],
        answer: 0,
        explainTr: "Cumartesi öğleden sonra en yoğun.",
      },
    ],
    speaking: ["Welcome back! It's lovely to see you again.", "Shall I reserve a private appointment?"],
    writing: {
      taskTr: "VIP müşteriye takip mesajı yaz (3 cümle, sıcak ama profesyonel).",
      sample: "Dear Ms. Al-Rashid, It was a pleasure meeting you at İstinye Park. I'll personally follow up when your Capucines arrives. Warm regards, Hülya",
      checklist: ["Welcome back / pleasure kullandın mı?", "I'll personally var mı?", "İmza ve sıcak kapanış var mı?"],
    },
    quiz: [
      {
        q: "Best VIP greeting:",
        options: ["What do you want?", "Welcome back — wonderful to see you again.", "We're closing soon."],
        answer: 1,
        explainTr: "Kişisel, sıcak, tanıdık müşteri karşılaması.",
      },
    ],
    scenarioSlug: "istinye-vip-regular",
  },
];
