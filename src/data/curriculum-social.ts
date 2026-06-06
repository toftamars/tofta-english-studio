import type { Unit } from "../types";

/** Social mod — sosyal iletişim */
export const SOCIAL_UNITS: Unit[] = [
  {
    id: 1,
    slug: "social-smalltalk",
    title: "Small Talk",
    titleTr: "Sohbet Başlatma",
    emoji: "🗣️",
    goalTr: "Hava, hafta sonu, iş hakkında hafif sohbet.",
    mode: "social",
    phrases: [
      { en: "Lovely weather today, isn't it?", tr: "Bugün hava harika, değil mi?" },
      { en: "How was your weekend?", tr: "Hafta sonun nasıldı?" },
      { en: "Busy week ahead?", tr: "Önünde yoğun bir hafta mı var?" },
      { en: "It was nice chatting with you.", tr: "Seninle sohbet etmek güzeldi." },
    ],
    vocab: [
      {
        id: "chat",
        title: "Sohbet",
        items: [
          { en: "catch up", tr: "hal hatır sormak", example: "Let's catch up over coffee." },
          { en: "how have you been", tr: "nasılsın (uzun süredir)", example: "How have you been lately?" },
          { en: "by the way", tr: "bu arada", example: "By the way, I loved your post." },
        ],
      },
    ],
    grammar: {
      title: "Question tags",
      titleTr: "Soru eki (isn't it?)",
      explanation: "Olumlu cümle + olumsuz ek: It's nice, isn't it?",
      examples: [
        { en: "You're from Istanbul, aren't you?", tr: "İstanbul'lusun, değil mi?" },
        { en: "It wasn't too cold, was it?", tr: "Çok soğuk değildi, değil mi?" },
      ],
    },
    listening: [
      "So, what have you been up to lately?",
      "I had a quiet weekend — just relaxed at home.",
      "We should grab lunch sometime.",
    ],
    listeningQuiz: [
      {
        q: "What did the speaker do at the weekend?",
        options: ["Relaxed at home", "Went skiing", "Worked overtime"],
        answer: 0,
        explainTr: "Evde dinlendiğini söylüyor.",
      },
    ],
    speaking: ["How was your weekend?", "Lovely day, isn't it?"],
    writing: {
      taskTr: "Bir meslektaşınla kısa small talk yaz (4 cümle).",
      sample: "Hi! How was your weekend? — It was great, thanks. I visited my parents. — That sounds lovely!",
      checklist: ["Soru sordun mu?", "Kısa cevap + detay var mı?", "Doğal ve sıcak mı?"],
    },
    quiz: [
      {
        q: "Correct question tag: 'It's cold today, ___?'",
        options: ["is it", "isn't it", "doesn't it"],
        answer: 1,
        explainTr: "Olumlu cümle → olumsuz ek: isn't it.",
      },
    ],
  },
  {
    id: 2,
    slug: "social-invitations",
    title: "Invitations & Plans",
    titleTr: "Davet ve Planlar",
    emoji: "🥂",
    goalTr: "Davet etme, kabul/red, plan yapma.",
    mode: "social",
    phrases: [
      { en: "Would you like to join us for dinner?", tr: "Akşam yemeğine katılmak ister misin?" },
      { en: "I'd love to, but I can't make it.", tr: "Çok isterdim ama gelemiyorum." },
      { en: "How about next Friday instead?", tr: "Gelecek Cuma nasıl olur?" },
      { en: "Let's keep in touch!", tr: "İletişimde kalalım!" },
    ],
    vocab: [
      {
        id: "plans",
        title: "Planlar",
        items: [
          { en: "RSVP", tr: "katılım bildirimi", example: "Please RSVP by Thursday." },
          { en: "rain check", tr: "başka zamana ertelemek", example: "Can I take a rain check?" },
          { en: "get together", tr: "buluşmak", example: "We should get together soon." },
        ],
      },
    ],
    grammar: {
      title: "Would you like to…?",
      titleTr: "Kibar davet",
      explanation: "Would you like to + fiil en nazik davet kalıbıdır.",
      examples: [
        { en: "Would you like to come over?", tr: "Bize gelmek ister misin?" },
        { en: "Shall we meet at seven?", tr: "Saat yedide buluşalım mı?" },
      ],
    },
    listening: [
      "Are you free this Saturday?",
      "I'm sorry, I'm already booked.",
      "No worries — maybe another time.",
    ],
    listeningQuiz: [
      {
        q: "Why can't the person come?",
        options: ["Already busy", "Too far away", "Doesn't like dinner"],
        answer: 0,
        explainTr: "Already booked = meşgul.",
      },
    ],
    speaking: ["Would you like to grab coffee sometime?", "I'm afraid I can't make it Friday."],
    writing: {
      taskTr: "Bir arkadaşına davet mesajı yaz (WhatsApp tarzı, 3-4 cümle).",
      sample: "Hey! Would you like to join us for brunch on Sunday? We're meeting at 11. Let me know!",
      checklist: ["Would you like to kullandın mı?", "Zaman/yer belirttin mi?", "Let me know gibi kapanış var mı?"],
    },
    quiz: [
      {
        q: "Polite decline:",
        options: ["No.", "I'd love to, but I can't make it.", "I'm busy. Bye."],
        answer: 1,
        explainTr: "Önce olumlu, sonra nazik red.",
      },
    ],
  },
  {
    id: 3,
    slug: "social-feelings",
    title: "Feelings & Support",
    titleTr: "Duygular ve Destek",
    emoji: "💛",
    goalTr: "Empati, teselli, kutlama ifadeleri.",
    mode: "social",
    minCefr: "A2",
    phrases: [
      { en: "I'm so sorry to hear that.", tr: "Bunu duyduğuma çok üzüldüm." },
      { en: "That must be difficult for you.", tr: "Bu senin için zor olmalı." },
      { en: "Congratulations! You deserve it.", tr: "Tebrikler! Bunu hak ediyorsun." },
      { en: "I'm here if you need to talk.", tr: "Konuşmak istersen buradayım." },
    ],
    vocab: [
      {
        id: "feelings",
        title: "Duygular",
        items: [
          { en: "overwhelmed", tr: "bunalmış", example: "I feel a bit overwhelmed." },
          { en: "proud of you", tr: "seninle gurur duyuyorum", example: "I'm so proud of you." },
          { en: "fingers crossed", tr: "inşallah / dua ediyorum", example: "Fingers crossed for your exam!" },
        ],
      },
    ],
    grammar: {
      title: "That must be… (empathy)",
      titleTr: "Empati: That must be…",
      explanation: "Karşıdakinin durumunu anladığını göstermek için: That must be hard.",
      examples: [
        { en: "You must be exhausted.", tr: "Yorgun olmalısın." },
        { en: "That sounds amazing!", tr: "Kulağa harika geliyor!" },
      ],
    },
    listening: [
      "I failed the exam and I feel terrible.",
      "Don't be too hard on yourself.",
      "You'll do better next time, I know it.",
    ],
    listeningQuiz: [
      {
        q: "What tone does the listener use?",
        options: ["Supportive", "Angry", "Sarcastic"],
        answer: 0,
        explainTr: "Teselli edici ve destekleyici.",
      },
    ],
    speaking: ["I'm so sorry to hear that.", "Congratulations! That's wonderful news."],
    writing: {
      taskTr: "Kötü bir haber alan bir arkadaşına destek mesajı yaz.",
      sample: "I'm so sorry to hear about your news. That must be really hard. I'm here if you want to talk.",
      checklist: ["I'm sorry to hear kullandın mı?", "Empati cümlesi var mı?", "Destek teklif ettin mi?"],
    },
    quiz: [
      {
        q: "Best empathetic response:",
        options: ["That's your fault.", "That must be really difficult.", "Get over it."],
        answer: 1,
        explainTr: "That must be… empati kalıbı.",
      },
    ],
  },
];
