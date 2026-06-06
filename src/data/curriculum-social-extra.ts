import type { Unit } from "../types";

export const SOCIAL_EXTRA_UNITS: Unit[] = [
  {
    id: 4,
    slug: "social-networking",
    title: "Networking & Small Talk",
    titleTr: "Networking ve Sohbet",
    emoji: "🤝",
    mode: "social",
    goalTr: "Tanışma partilerinde kendini tanıt.",
    phrases: [
      { en: "Nice to meet you — I'm Hülya.", tr: "Tanıştığıma memnun oldum — ben Hülya." },
      { en: "What do you do for a living?", tr: "Ne iş yapıyorsunuz?" },
      { en: "That sounds really interesting!", tr: "Gerçekten ilginç geliyor!" },
    ],
    vocab: [{ id: "net", title: "Sosyal", items: [
      { en: "networking", tr: "networking", example: "Networking events are useful." },
      { en: "colleague", tr: "meslektaş", example: "She's a colleague from work." },
      { en: "keep in touch", tr: "iletişimde kal", example: "Let's keep in touch!" },
    ]}],
    grammar: { title: "Small talk questions", titleTr: "Sohbet soruları", explanation: "What do you do? / How do you know…?", examples: [
      { en: "How do you know the host?", tr: "Ev sahibini nereden tanıyorsun?" },
    ]},
    listening: ["Have you been to one of these before?", "The food is amazing, isn't it?"],
    speaking: ["Nice to meet you! What brings you here?", "I work at Louis Vuitton in Istinye Park."],
    writing: { taskTr: "LinkedIn tarzı kısa tanıtım (3 cümle).", sample: "I'm a Client Advisor at Louis Vuitton. I love helping clients find the perfect piece. Nice to connect!" },
    quiz: [{ q: "Nice to meet you is for:", options: ["First meeting", "Goodbye", "Anger"], answer: 0, explainTr: "İlk tanışma." }],
  },
  {
    id: 5,
    slug: "social-emotions",
    title: "Emotions & Support",
    titleTr: "Duygular ve Destek",
    emoji: "💛",
    mode: "social",
    goalTr: "Teselli, özür, kutlama.",
    phrases: [
      { en: "I'm so sorry to hear that.", tr: "Bunu duyduğuma çok üzüldüm." },
      { en: "Congratulations — you deserve it!", tr: "Tebrikler — hak ediyorsun!" },
      { en: "I'm here if you need to talk.", tr: "Konuşmak istersen buradayım." },
    ],
    vocab: [{ id: "emo", title: "Duygu", items: [
      { en: "condolences", tr: "başsağlığı", example: "Please accept my condolences." },
      { en: "proud", tr: "gururlu", example: "I'm so proud of you." },
      { en: "disappointed", tr: "hayal kırıklığı", example: "That must be disappointing." },
    ]}],
    grammar: { title: "Empathy phrases", titleTr: "Empati", explanation: "That must be… / I'm sorry to hear…", examples: [
      { en: "That must be really hard.", tr: "Bu gerçekten zor olmalı." },
    ]},
    listening: ["Thank you for being there for me.", "I really appreciate your support."],
    speaking: ["I'm so happy for you!", "I'm here for you — anytime."],
    writing: { taskTr: "Arkadaşına destek mesajı (3 cümle).", sample: "I'm so sorry you're going through this. That must be really tough. I'm here whenever you want to talk." },
    quiz: [{ q: "Empathy phrase:", options: ["That must be hard", "Get over it", "Not my problem"], answer: 0, explainTr: "Empati ifadesi." }],
  },
  {
    id: 6,
    slug: "social-boundaries",
    title: "Boundaries & Politeness",
    titleTr: "Sınırlar ve Nezaket",
    emoji: "🙏",
    mode: "social",
    minCefr: "A2",
    goalTr: "Nazikçe reddetme ve sınır koyma.",
    phrases: [
      { en: "Thank you, but I can't this weekend.", tr: "Teşekkürler, ama bu hafta sonu olmaz." },
      { en: "I'd love to, but I already have plans.", tr: "Çok isterim ama planım var." },
      { en: "Maybe another time?", tr: "Belki başka zaman?" },
    ],
    vocab: [{ id: "bound", title: "Sınır", items: [
      { en: "decline", tr: "reddetmek", example: "I had to decline politely." },
      { en: "boundary", tr: "sınır", example: "It's important to set boundaries." },
      { en: "maybe later", tr: "belki sonra", example: "Maybe we can meet later." },
    ]}],
    grammar: { title: "Polite refusal", titleTr: "Kibar red", explanation: "Thank you + but + alternative", examples: [
      { en: "Thanks for asking, but I'm not free.", tr: "Sorduğun için teşekkürler ama müsait değilim." },
    ]},
    listening: ["No pressure at all.", "I completely understand."],
    speaking: ["I'd love to, but I can't this time.", "Thank you — maybe next week?"],
    writing: { taskTr: "Daveti kibarca reddeden kısa mesaj.", sample: "Thank you so much for inviting me! I can't make it this weekend, but I'd love to join next time." },
    quiz: [{ q: "Polite decline:", options: ["Thanks, but I can't", "No.", "Go away"], answer: 0, explainTr: "Teşekkür + red." }],
  },
];
