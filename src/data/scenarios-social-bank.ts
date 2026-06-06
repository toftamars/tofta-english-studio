import type { Scenario } from "../types";

/** Social mod — zengin senaryo bankası (16) */
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
  {
    slug: "social-compliment",
    title: "Giving a Compliment",
    titleTr: "İltifat Etme",
    emoji: "✨",
    kind: "client",
    mode: "social",
    descriptionTr: "Arkadaşına samimi iltifat.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "Do I look OK for the dinner?", tr: "Yemeğe gideceğim, iyi görünüyor muyum?", replies: [
        { en: "You look amazing — that colour really suits you!", tr: "Harika görünüyorsun — o renk sana çok yakışmış!", best: true, feedbackTr: "Spesifik ve sıcak iltifat." },
        { en: "Yes.", tr: "Evet.", feedbackTr: "Daha canlı ol." },
      ] },
      { speaker: "client", en: "Thanks! You're always so kind.", tr: "Teşekkürler! Sen her zaman çok naziksin.", replies: [
        { en: "I mean it! Have a wonderful evening.", tr: "Ciddiyim! Harika bir akşam geçir.", best: true, feedbackTr: "Samimi kapanış." },
      ] },
    ],
  },
  {
    slug: "social-decline-politely",
    title: "Politely Declining",
    titleTr: "Nazikçe Reddetme",
    emoji: "🙏",
    kind: "client",
    mode: "social",
    descriptionTr: "Daveti kibarca reddetme.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "Want to join us for a weekend trip to Bodrum?", tr: "Hafta sonu Bodrum'a gelmek ister misin?", replies: [
        { en: "Thank you so much for thinking of me! I can't this weekend, but I'd love to next time.", tr: "Beni düşündüğün için çok teşekkürler! Bu hafta sonu olmaz ama bir dahaki sefere çok isterim.", best: true, feedbackTr: "Teşekkür + net red + kapı açık." },
        { en: "No.", tr: "Hayır.", feedbackTr: "Kaba; nazik ol." },
      ] },
    ],
  },
  {
    slug: "social-apologize",
    title: "Apologizing",
    titleTr: "Özür Dileme",
    emoji: "😔",
    kind: "client",
    mode: "social",
    descriptionTr: "Geç kaldın — arkadaşına özür.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "We've been waiting twenty minutes.", tr: "Yirmi dakikadır bekliyoruz.", replies: [
        { en: "I'm really sorry — traffic was terrible. I should have left earlier.", tr: "Gerçekten özür dilerim — trafik berbattı. Daha erken çıkmalıydım.", best: true, feedbackTr: "Özür + sebep + sorumluluk." },
      ] },
      { speaker: "client", en: "OK, let's not worry. Shall we order?", tr: "Tamam, dert etmeyelim. Sipariş verelim mi?", replies: [
        { en: "Yes, please — and this round is on me.", tr: "Evet lütfen — bu tur benden.", best: true, feedbackTr: "Telafi jesti." },
      ] },
    ],
  },
  {
    slug: "social-networking",
    title: "Casual Networking",
    titleTr: "Tanışma Partisi",
    emoji: "🤝",
    kind: "client",
    mode: "social",
    descriptionTr: "Yeni insanlarla tanışma.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "Hi, I don't think we've met. I'm Selin.", tr: "Merhaba, tanışmamışız sanırım. Ben Selin.", replies: [
        { en: "Nice to meet you, Selin! I'm Hülya — I work at Louis Vuitton.", tr: "Tanıştığıma memnun oldum Selin! Ben Hülya — Louis Vuitton'da çalışıyorum.", best: true, feedbackTr: "Selamlama + kendini tanıt." },
      ] },
      { speaker: "client", en: "What do you do outside work?", tr: "İş dışında ne yaparsın?", replies: [
        { en: "I love hiking and trying new coffee places. How about you?", tr: "Yürüyüş ve yeni kahve mekânları keşfetmeyi seviyorum. Sen?", best: true, feedbackTr: "Kişisel + geri soru." },
      ] },
    ],
  },
  {
    slug: "social-wedding-toast",
    title: "Wedding Toast",
    titleTr: "Düğün Konuşması",
    emoji: "🥂",
    kind: "client",
    mode: "social",
    descriptionTr: "Kısa düğün konuşması.",
    difficulty: 3,
    minCefr: "B1",
    steps: [
      { speaker: "client", en: "Would you say a few words for the bride and groom?", tr: "Gelin ve damat için birkaç söz söyler misin?", replies: [
        { en: "Of course. To Ayşe and Can — may your life together be full of love and laughter. Cheers!", tr: "Tabii. Ayşe ve Can'a — birlikte geçireceğiniz hayat sevgi ve kahkahayla dolsun. Şerefe!", best: true, feedbackTr: "Kısa, sıcak, kutlama." },
      ] },
    ],
  },
  {
    slug: "social-condolences",
    title: "Expressing Condolences",
    titleTr: "Başsağlığı",
    emoji: "🕯️",
    kind: "client",
    mode: "social",
    descriptionTr: "Kayıp yaşayan arkadaşa destek.",
    difficulty: 3,
    steps: [
      { speaker: "client", en: "My grandmother passed away yesterday.", tr: "Büyükannem dün vefat etti.", replies: [
        { en: "I'm so sorry for your loss. She meant a lot to you — I'm thinking of you.", tr: "Başınız sağ olsun. Sizin için çok değerliydi — sizi düşünüyorum.", best: true, feedbackTr: "Derin empati." },
      ] },
      { speaker: "client", en: "Thank you. The funeral is on Friday.", tr: "Teşekkürler. Cenaze cuma.", replies: [
        { en: "If you'd like company, I can come with you. No pressure at all.", tr: "İsterseniz yanınızda olabilirim. Hiç baskı yok.", best: true, feedbackTr: "Destek teklifi — baskısız." },
      ] },
    ],
  },
  {
    slug: "social-disagreement",
    title: "Friendly Disagreement",
    titleTr: "Nazik Fikir Ayrılığı",
    emoji: "💬",
    kind: "client",
    mode: "social",
    descriptionTr: "Arkadaşınla fikir ayrılığı — saygılı.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "I think we should leave early — traffic will be awful.", tr: "Erken çıkmalıyız — trafik berbat olacak.", replies: [
        { en: "I see your point, but I'd rather stay a bit longer. Could we meet in the middle and leave in thirty minutes?", tr: "Haklı olabilirsin ama biraz daha kalmak isterim. Orta yolu bulup otuz dakikaya çıkalım mı?", best: true, feedbackTr: "Onaylama + alternatif." },
      ] },
    ],
  },
  {
    slug: "social-birthday-surprise",
    title: "Birthday Surprise",
    titleTr: "Doğum Günü Sürprizi",
    emoji: "🎂",
    kind: "client",
    mode: "social",
    descriptionTr: "Sürpriz parti planı koordinasyonu.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "Can you bring her to the restaurant at seven — without telling her why?", tr: "Onu saat yedide restorana getirebilir misin — nedenini söylemeden?", replies: [
        { en: "Sure! I'll say we're trying a new place. She won't suspect a thing.", tr: "Tabii! Yeni bir yer deneyeceğiz derim. Hiç şüphelenmez.", best: true, feedbackTr: "Plan onayı + detay." },
      ] },
    ],
  },
  {
    slug: "social-ask-favor",
    title: "Asking for a Favor",
    titleTr: "İyilik İsteme",
    emoji: "🙋",
    kind: "client",
    mode: "social",
    descriptionTr: "Arkadaşından küçük bir iyilik.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "What is it?", tr: "Ne oldu?", replies: [
        { en: "Would you mind picking up my parcel tomorrow? I'll be at work all day.", tr: "Yarın kargomu alabilir misin? Bütün gün işte olacağım.", best: true, feedbackTr: "Would you mind — kibar istek." },
      ] },
      { speaker: "client", en: "Sure, no problem.", tr: "Tabii, sorun değil.", replies: [
        { en: "You're a lifesaver — thank you so much!", tr: "Hayat kurtardın — çok teşekkürler!", best: true, feedbackTr: "Minnet + sıcaklık." },
      ] },
    ],
  },
  {
    slug: "social-reunion",
    title: "School Reunion",
    titleTr: "Okul Buluşması",
    emoji: "🎓",
    kind: "client",
    mode: "social",
    descriptionTr: "Eski sınıf arkadaşıyla karşılaşma.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "Hülya? Is that really you? It's been fifteen years!", tr: "Hülya? Gerçekten sen misin? On beş yıl olmuş!", replies: [
        { en: "Oh my gosh, Emre! Yes — you haven't changed at all! How have you been?", tr: "Aman tanrım, Emre! Evet — hiç değişmemişsin! Nasılsın?", best: true, feedbackTr: "Coşku + geri soru." },
      ] },
    ],
  },
  {
    slug: "social-parents-visit",
    title: "Parents Visiting",
    titleTr: "Aile Ziyareti",
    emoji: "👨‍👩‍👧",
    kind: "client",
    mode: "social",
    descriptionTr: "Eşinin ailesi geliyor — hazırlık.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "My parents arrive tomorrow. I'm a bit nervous.", tr: "Ailem yarın geliyor. Biraz gerginim.", replies: [
        { en: "That's natural. What can I do to help — shopping or cleaning?", tr: "Doğal. Nasıl yardım edebilirim — alışveriş mi temizlik mi?", best: true, feedbackTr: "Destek teklifi." },
      ] },
    ],
  },
  {
    slug: "social-gym-smalltalk",
    title: "Gym Small Talk",
    titleTr: "Spor Salonu Sohbeti",
    emoji: "🏋️",
    kind: "client",
    mode: "social",
    descriptionTr: "Tanışık biriyle kısa sohbet.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "You come here often, right?", tr: "Buraya sık geliyorsun, değil mi?", replies: [
        { en: "Three times a week usually. The morning classes are great.", tr: "Genelde haftada üç. Sabah dersleri harika.", best: true, feedbackTr: "Doğal sohbet." },
      ] },
    ],
  },
  {
    slug: "social-thank-you-gift",
    title: "Thank You for a Gift",
    titleTr: "Hediye için Teşekkür",
    emoji: "💝",
    kind: "client",
    mode: "social",
    descriptionTr: "Aldığın hediye için teşekkür mesajı.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "Did you like the scarf I sent?", tr: "Gönderdiğim atkıyı beğendin mi?", replies: [
        { en: "I love it — the colour is perfect and I've worn it twice already. Thank you so much!", tr: "Bayıldım — rengi mükemmel ve iki kez taktım bile. Çok teşekkürler!", best: true, feedbackTr: "Spesifik minnet." },
      ] },
    ],
  },
  {
    slug: "social-set-boundary",
    title: "Setting a Boundary",
    titleTr: "Sınır Koyma",
    emoji: "🛑",
    kind: "client",
    mode: "social",
    descriptionTr: "İş dışında mesaj — nazik sınır.",
    difficulty: 3,
    minCefr: "B1",
    steps: [
      { speaker: "client", en: "Can you cover my shift tomorrow? You owe me one.", tr: "Yarın vardiyamı alır mısın? Borcun var bana.", replies: [
        { en: "I wish I could, but I already promised my family the day off. Let's swap another week?", tr: "Keşke yapabilsem ama aileme günü ayırdım. Başka hafta takas edelim mi?", best: true, feedbackTr: "Red + alternatif — sınır koruma." },
      ] },
    ],
  },
];
