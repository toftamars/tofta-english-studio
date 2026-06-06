import type { Scenario } from "../types";

export const DAILY_SCENARIOS: Scenario[] = [
  {
    slug: "daily-coffee-friend",
    title: "Coffee with a Friend",
    titleTr: "Arkadaşla Kahve",
    emoji: "☕",
    kind: "client",
    mode: "daily",
    descriptionTr: "Arkadaşınla kahve içerken sohbet.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "Hey! Long time no see. How have you been?", tr: "Selam! Görüşmeyeli çok oldu. Nasılsın?", replies: [
        { en: "I've been good, thanks! Busy with work but all good. And you?", tr: "İyiyim, teşekkürler! İş yoğun ama iyiyim. Sen?", best: true, feedbackTr: "Doğal cevap + geri soru." },
        { en: "Fine.", tr: "İyi.", feedbackTr: "Biraz daha sıcak ol." },
      ] },
      { speaker: "client", en: "Same here. Shall we grab coffee?", tr: "Ben de. Kahve içelim mi?", replies: [
        { en: "I'd love to! There's a nice place around the corner.", tr: "Çok isterim! Köşede güzel bir yer var.", best: true, feedbackTr: "Olumlu + öneri." },
      ] },
    ],
  },
  {
    slug: "daily-doctor",
    title: "At the Doctor",
    titleTr: "Doktorda",
    emoji: "🩺",
    kind: "client",
    mode: "daily",
    descriptionTr: "Randevuda şikayetini anlatma.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "What seems to be the problem today?", tr: "Bugün sorununuz nedir?", replies: [
        { en: "I've had a sore throat for three days.", tr: "Üç gündür boğaz ağrım var.", best: true, feedbackTr: "Net şikayet + süre." },
        { en: "I am sick.", tr: "Hastayım.", feedbackTr: "Daha spesifik ol." },
      ] },
      { speaker: "client", en: "Any fever?", tr: "Ateş var mı?", replies: [
        { en: "Yes, a mild fever since yesterday.", tr: "Evet, dünden beri hafif ateş.", best: true, feedbackTr: "Detaylı cevap." },
      ] },
    ],
  },
];

export const SOCIAL_SCENARIOS: Scenario[] = [
  {
    slug: "social-party-invite",
    title: "Party Invitation",
    titleTr: "Parti Daveti",
    emoji: "🎉",
    kind: "client",
    mode: "social",
    descriptionTr: "Bir daveti kabul etme veya nazikçe reddetme.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "We're having a barbecue on Sunday. Would you like to come?", tr: "Pazar günü mangal yapıyoruz. Gelmek ister misin?", replies: [
        { en: "That sounds lovely! What time should I come?", tr: "Harika geliyor! Saat kaçta gelmeliyim?", best: true, feedbackTr: "Coşkulu kabul + pratik soru." },
        { en: "Maybe.", tr: "Belki.", feedbackTr: "Belirsiz; net ol." },
      ] },
      { speaker: "client", en: "Around six. Can you bring a dessert?", tr: "Saat altı civarı. Tatlı getirebilir misin?", replies: [
        { en: "Of course! I'll bring something. See you then!", tr: "Tabii! Bir şeyler getiririm. Görüşürüz!", best: true, feedbackTr: "Net taahhüt + kapanış." },
      ] },
    ],
  },
  {
    slug: "social-comfort-friend",
    title: "Comforting a Friend",
    titleTr: "Arkadaşı Teselli",
    emoji: "💛",
    kind: "client",
    mode: "social",
    descriptionTr: "Kötü haber alan arkadaşına destek.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "I didn't get the promotion. I feel really down.", tr: "Terfi alamadım. Kendimi çok kötü hissediyorum.", replies: [
        { en: "I'm so sorry to hear that. That must be really disappointing.", tr: "Bunu duyduğuma çok üzüldüm. Bu gerçekten hayal kırıklığı olmalı.", best: true, feedbackTr: "Empati + onaylama." },
        { en: "You'll get over it.", tr: "Atlatırsın.", feedbackTr: "Soğuk; destekleyici ol." },
      ] },
      { speaker: "client", en: "Thanks. I just needed to talk.", tr: "Teşekkürler. Sadece konuşmaya ihtiyacım vardı.", replies: [
        { en: "Anytime. I'm here for you.", tr: "Her zaman. Senin için buradayım.", best: true, feedbackTr: "Sıcak destek." },
      ] },
    ],
  },
];
