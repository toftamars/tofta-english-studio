import type { Scenario } from "../types";

/** +27 senaryo — Work 15, Daily 6, Social 6 → Hülya toplam 100 */
export const WORK_EXPANSION_SCENARIOS: Scenario[] = [
  {
    slug: "work-luggage-travel",
    title: "Travel Luggage Consultation",
    titleTr: "Seyahat Valizi Danışmanlığı",
    emoji: "🧳",
    kind: "client",
    mode: "work",
    descriptionTr: "Uzun uçuş için valiz arayan müşteri.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "I need a cabin bag for a two-week trip to Japan.", tr: "Japonya'ya iki haftalık seyahat için kabin bagajı lazım.", replies: [
        { en: "Wonderful choice of destination. May I ask if you prefer soft-side or hard-shell?", tr: "Harika destinasyon. Yumuşak mı sert kabin mi tercih edersiniz?", best: true, feedbackTr: "İlgi + ihtiyaç analizi." },
      ] },
      { speaker: "client", en: "Hard-shell, something durable.", tr: "Sert kabin, dayanıklı olsun.", replies: [
        { en: "Our Horizon line is lightweight and fits most airline sizes. Shall I show you?", tr: "Horizon serimiz hafif ve çoğu havayolu ölçüsüne uygun. Göstereyim mi?", best: true, feedbackTr: "Ürün + fayda." },
      ] },
    ],
  },
  {
    slug: "work-perfume-gift-set",
    title: "Fragrance Gift Set",
    titleTr: "Parfüm Hediye Seti",
    emoji: "🌸",
    kind: "client",
    mode: "work",
    descriptionTr: "Anneler günü için parfüm seti arayan müşteri.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "I'd like a perfume gift set for my mother.", tr: "Annem için parfüm hediye seti istiyorum.", replies: [
        { en: "How lovely. Does she prefer fresh, floral, or something more intense?", tr: "Ne güzel. Ferah, çiçeksi mi yoksa daha yoğun mu sever?", best: true, feedbackTr: "Kişiselleştirme sorusu." },
      ] },
      { speaker: "client", en: "Something fresh and elegant.", tr: "Ferah ve zarif olsun.", replies: [
        { en: "I'd recommend Attrape-Rêves with a complimentary mini — perfect for gifting.", tr: "Attrape-Rêves ve hediye mini öneririm — hediye için ideal.", best: true, feedbackTr: "Öneri + ikram vurgusu." },
      ] },
    ],
  },
  {
    slug: "work-shoe-care-advice",
    title: "Shoe Care Advice",
    titleTr: "Ayakkabı Bakım Önerisi",
    emoji: "👞",
    kind: "client",
    mode: "work",
    descriptionTr: "Yeni aldığı ayakkabının bakımını soruyor.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "How should I care for these leather sneakers?", tr: "Bu deri sneaker'lara nasıl bakmalıyım?", replies: [
        { en: "Great question. I suggest a soft brush and our leather protector — avoid harsh cleaners.", tr: "Güzel soru. Yumuşak fırça ve deri koruyucu öneririm — sert temizleyiciden kaçının.", best: true, feedbackTr: "Uzman tavsiye." },
      ] },
    ],
  },
  {
    slug: "work-vip-private-suite",
    title: "VIP Private Suite",
    titleTr: "VIP Özel Oda",
    emoji: "✨",
    kind: "client",
    mode: "work",
    descriptionTr: "VIP müşteri özel oda talep ediyor.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "I'd prefer to shop privately today, if possible.", tr: "Mümkünse bugün özel alışveriş yapmak isterim.", replies: [
        { en: "Absolutely. I'll prepare our private salon for you — may I offer some refreshment?", tr: "Elbette. Özel salonumuzu hazırlayacağım — bir ikram ister misiniz?", best: true, feedbackTr: "Onay + lüks dokunuş." },
      ] },
    ],
  },
  {
    slug: "work-duty-free-inquiry",
    title: "Duty-Free Inquiry",
    titleTr: "Duty-Free Sorgusu",
    emoji: "✈️",
    kind: "client",
    mode: "work",
    descriptionTr: "Turist duty-free fiyat soruyor.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "Is this cheaper at the airport duty-free?", tr: "Havalimanı duty-free'de daha ucuz mu?", replies: [
        { en: "Prices can vary. Here you receive full after-sales service and immediate personalisation.", tr: "Fiyatlar değişebilir. Burada tam satış sonrası hizmet ve anında kişiselleştirme alırsınız.", best: true, feedbackTr: "Değer odaklı cevap." },
      ] },
    ],
  },
  {
    slug: "work-hot-stamping-initials",
    title: "Hot Stamping Initials",
    titleTr: "Baş Harf Baskısı",
    emoji: "🔤",
    kind: "client",
    mode: "work",
    descriptionTr: "SLG üzerine hot stamping isteği.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "Can you stamp my initials on this wallet?", tr: "Bu cüzdana baş harflerimi basabilir misiniz?", replies: [
        { en: "Yes, hot stamping is complimentary. Gold or silver foil?", tr: "Evet, hot stamping ücretsiz. Altın mı gümüş folyo mu?", best: true, feedbackTr: "Evet + seçenek." },
      ] },
    ],
  },
  {
    slug: "work-leather-patina",
    title: "Leather Patina Question",
    titleTr: "Deri Patina Sorusu",
    emoji: "🟤",
    kind: "client",
    mode: "work",
    descriptionTr: "Vachetta derinin renk değişimi hakkında endişe.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "Will this vachetta leather darken over time?", tr: "Bu vachetta deri zamanla koyulaşır mı?", replies: [
        { en: "Yes, it develops a beautiful patina — that's part of its charm and uniqueness.", tr: "Evet, güzel bir patina kazanır — cazibesinin ve eşsizliğinin parçası.", best: true, feedbackTr: "Dürüst + pozitif çerçeve." },
      ] },
    ],
  },
  {
    slug: "work-return-with-receipt",
    title: "Return with Receipt",
    titleTr: "Fişli İade",
    emoji: "🧾",
    kind: "client",
    mode: "work",
    descriptionTr: "30 gün içinde iade talebi.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "I'd like to return this — I changed my mind.", tr: "Bunu iade etmek istiyorum — fikrim değişti.", replies: [
        { en: "Of course. May I see the item and your receipt, please?", tr: "Tabii. Ürünü ve fişinizi görebilir miyim?", best: true, feedbackTr: "Profesyonel prosedür." },
      ] },
    ],
  },
  {
    slug: "work-pickup-third-party",
    title: "Third-Party Pickup",
    titleTr: "Başkası Adına Teslim",
    emoji: "📦",
    kind: "client",
    mode: "work",
    descriptionTr: "Eşi adına paket alacak müşteri.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "My husband ordered something — can I collect it?", tr: "Eşim bir şey sipariş etti — ben alabilir miyim?", replies: [
        { en: "Certainly, with ID matching the order name. Do you have the confirmation number?", tr: "Elbette, sipariş adıyla kimlik eşleşmeli. Onay numaranız var mı?", best: true, feedbackTr: "Güvenlik + yardım." },
      ] },
    ],
  },
  {
    slug: "work-closing-time",
    title: "Near Closing Time",
    titleTr: "Kapanış Saati",
    emoji: "🕘",
    kind: "client",
    mode: "work",
    descriptionTr: "Mağaza kapanırken giren müşteri.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "Are you still open? I only need five minutes.", tr: "Hâlâ açık mısınız? Sadece beş dakikam lazım.", replies: [
        { en: "Yes, please come in — I'll be happy to assist you.", tr: "Evet, buyurun — size yardımcı olmaktan memnuniyet duyarım.", best: true, feedbackTr: "Misafirperverlik." },
      ] },
    ],
  },
  {
    slug: "work-lost-item-boutique",
    title: "Lost Item in Boutique",
    titleTr: "Butikte Kayıp Eşya",
    emoji: "🔍",
    kind: "client",
    mode: "work",
    descriptionTr: "Müşteri telefonunu kaybettiğini düşünüyor.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "I think I left my phone in the fitting room.", tr: "Telefonumu deneme odasında unuttum sanırım.", replies: [
        { en: "Let me check with my colleague right away. Where were you trying items?", tr: "Hemen meslektaşıma sorayım. Nerede denediniz?", best: true, feedbackTr: "Hızlı aksiyon + detay." },
      ] },
    ],
  },
  {
    slug: "work-tax-free-form",
    title: "Tax-Free Form",
    titleTr: "Tax-Free Formu",
    emoji: "🛃",
    kind: "client",
    mode: "work",
    descriptionTr: "Turist vergi iadesi formu istiyor.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "Can you help me with the tax-free form?", tr: "Tax-free formunda yardım eder misiniz?", replies: [
        { en: "Of course. I'll prepare the documents — please have your passport ready.", tr: "Tabii. Belgeleri hazırlayacağım — pasaportunuzu hazır bulundurun.", best: true, feedbackTr: "Prosedür netliği." },
      ] },
    ],
  },
  {
    slug: "work-compare-two-handbags",
    title: "Compare Two Handbags",
    titleTr: "İki Çanta Karşılaştırma",
    emoji: "👜",
    kind: "client",
    mode: "work",
    descriptionTr: "Capucines vs Twist kararsızlığı.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "I'm torn between the Capucines and the Twist.", tr: "Capucines ile Twist arasında kaldım.", replies: [
        { en: "Both are iconic. Capucines is more structured; Twist is playful with the lock. What's your daily use?", tr: "İkisi de ikonik. Capucines daha yapılı; Twist kilidiyle oyuncu. Günlük kullanımınız ne?", best: true, feedbackTr: "Karşılaştırma + ihtiyaç." },
      ] },
    ],
  },
  {
    slug: "work-wedding-gift-list",
    title: "Wedding Gift Consultation",
    titleTr: "Düğün Hediyesi Danışmanlığı",
    emoji: "💍",
    kind: "client",
    mode: "work",
    descriptionTr: "Arkadaşının düğünü için hediye arıyor.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "I need an elegant wedding gift — budget around five thousand.", tr: "Zarif bir düğün hediyesi lazım — bütçe yaklaşık beş bin.", replies: [
        { en: "Congratulations to them. A leather keepall or a fine SLG set would be timeless.", tr: "Onları tebrik ederim. Deri keepall veya güzel bir SLG seti zamansız olur.", best: true, feedbackTr: "Öneri + duygu." },
      ] },
    ],
  },
  {
    slug: "work-shift-handover",
    title: "Shift Handover",
    titleTr: "Vardiya Devir",
    emoji: "🔄",
    kind: "manager",
    mode: "work",
    descriptionTr: "Vardiya sonu müşteri notlarını devretme.",
    difficulty: 2,
    steps: [
      { speaker: "manager", en: "Any clients I should follow up tomorrow?", tr: "Yarın takip etmem gereken müşteri var mı?", replies: [
        { en: "Yes — Mrs. Demir loved the Capucines BB; she'll return Friday with her husband.", tr: "Evet — Demir Hanım Capucines BB'yi çok beğendi; Cuma eşiyle gelecek.", best: true, feedbackTr: "Spesifik devir." },
      ] },
    ],
  },
];

export const DAILY_EXPANSION_SCENARIOS: Scenario[] = [
  {
    slug: "daily-grocery-checkout",
    title: "At the Grocery Checkout",
    titleTr: "Market Kasasında",
    emoji: "🛒",
    kind: "client",
    mode: "daily",
    descriptionTr: "Self-checkout'ta sorun yaşıyorsun.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "The machine won't scan this barcode.", tr: "Makine barkodu okumuyor.", replies: [
        { en: "Excuse me, could you help? The scanner isn't working.", tr: "Affedersiniz, yardım eder misiniz? Okuyucu çalışmıyor.", best: true, feedbackTr: "Nezaket + net sorun." },
      ] },
    ],
  },
  {
    slug: "daily-gym-membership",
    title: "Gym Class Booking",
    titleTr: "Spor Salonu Dersi",
    emoji: "🏋️",
    kind: "client",
    mode: "daily",
    descriptionTr: "Yoga dersine kayıt olmak istiyorsun.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "Is there space in tonight's yoga class?", tr: "Bu akşamki yoga dersinde yer var mı?", replies: [
        { en: "Hi, I'd like to book the seven p.m. yoga class, please.", tr: "Merhaba, saat yedi yoga dersine kayıt olmak istiyorum.", best: true, feedbackTr: "Net talep." },
      ] },
    ],
  },
  {
    slug: "daily-phone-provider",
    title: "Phone Provider Call",
    titleTr: "Operatör Araması",
    emoji: "📱",
    kind: "client",
    mode: "daily",
    descriptionTr: "Faturanla ilgili operatörü arıyorsun.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "How can I help you today?", tr: "Bugün size nasıl yardımcı olabilirim?", replies: [
        { en: "I'm calling about a charge on my bill that I don't recognise.", tr: "Faturamdaki tanımadığım bir ücret hakkında arıyorum.", best: true, feedbackTr: "Net konu." },
      ] },
    ],
  },
  {
    slug: "daily-lost-keys",
    title: "Lost Keys",
    titleTr: "Anahtar Kaybı",
    emoji: "🔑",
    kind: "client",
    mode: "daily",
    descriptionTr: "Apartman görevlisine anahtar kaybettiğini söylüyorsun.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "I've lost my apartment keys. What should I do?", tr: "Daire anahtarlarımı kaybettim. Ne yapmalıyım?", replies: [
        { en: "I'm sorry — I lost my keys. Is there a spare set with building management?", tr: "Üzgünüm — anahtarlarımı kaybettim. Yönetimde yedek var mı?", best: true, feedbackTr: "Durum + çözüm sorusu." },
      ] },
    ],
  },
  {
    slug: "daily-rain-plans",
    title: "Rain Changes Plans",
    titleTr: "Yağmur Plan Değiştirdi",
    emoji: "🌧️",
    kind: "client",
    mode: "daily",
    descriptionTr: "Arkadaşına planı değiştirmeyi söylüyorsun.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "It's raining hard. Still up for the picnic?", tr: "Şiddetli yağmur var. Piknik hâlâ var mı?", replies: [
        { en: "It's pouring — shall we reschedule for next weekend instead?", tr: "Sağanak yağıyor — gelecek hafta sonuna ertelesek?", best: true, feedbackTr: "Alternatif öner." },
      ] },
    ],
  },
  {
    slug: "daily-package-delivery",
    title: "Missed Package Delivery",
    titleTr: "Kaçırılan Kargo",
    emoji: "📬",
    kind: "client",
    mode: "daily",
    descriptionTr: "Kargo firmasını arıyorsun.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "Customer service, how may I help?", tr: "Müşteri hizmetleri, nasıl yardımcı olabilirim?", replies: [
        { en: "I missed a delivery today. Can I arrange a redelivery for tomorrow?", tr: "Bugün teslimatı kaçırdım. Yarın yeniden teslim ayarlayabilir miyim?", best: true, feedbackTr: "Net istek." },
      ] },
    ],
  },
];

export const SOCIAL_EXPANSION_SCENARIOS: Scenario[] = [
  {
    slug: "social-birthday-message",
    title: "Birthday Message",
    titleTr: "Doğum Günü Mesajı",
    emoji: "🎂",
    kind: "client",
    mode: "social",
    descriptionTr: "Arkadaşına doğum günü dileği.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "Thanks for remembering my birthday!", tr: "Doğum günümü hatırladığın için teşekkürler!", replies: [
        { en: "Happy birthday! Hope you have a wonderful day — you deserve it.", tr: "Doğum günün kutlu olsun! Harika bir gün geçirmeni dilerim — hak ediyorsun.", best: true, feedbackTr: "Sıcak dilek." },
      ] },
    ],
  },
  {
    slug: "social-apologize-late",
    title: "Apologizing for Being Late",
    titleTr: "Geç Kaldım Özür",
    emoji: "⏰",
    kind: "client",
    mode: "social",
    descriptionTr: "Randevuya geç kaldın.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "You're twenty minutes late!", tr: "Yirmi dakika geç kaldın!", replies: [
        { en: "I'm so sorry — traffic was terrible. Thank you for waiting.", tr: "Çok özür dilerim — trafik berbattı. Beklediğin için teşekkürler.", best: true, feedbackTr: "Özür + sebep + teşekkür." },
      ] },
    ],
  },
  {
    slug: "social-networking-intro",
    title: "Networking Introduction",
    titleTr: "Networking Tanışma",
    emoji: "🤝",
    kind: "client",
    mode: "social",
    descriptionTr: "Etkinlikte yeni biriyle tanışma.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "Hi, I don't think we've met. I'm James.", tr: "Merhaba, tanışmamışız sanırım. Ben James.", replies: [
        { en: "Nice to meet you, James. I'm Hülya — I work in luxury retail.", tr: "Tanıştığıma memnun oldum James. Ben Hülya — lüks perakendede çalışıyorum.", best: true, feedbackTr: "Karşılıklı tanıtım." },
      ] },
    ],
  },
  {
    slug: "social-decline-drink",
    title: "Declining a Drink Politely",
    titleTr: "İçki Reddi",
    emoji: "🥤",
    kind: "client",
    mode: "social",
    descriptionTr: "Partide içki teklifini nazikçe reddetme.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "Can I get you a glass of wine?", tr: "Bir kadeh şarap ister misin?", replies: [
        { en: "Thank you, but I'm not drinking tonight — a sparkling water would be perfect.", tr: "Teşekkürler, ama bu akşam içmiyorum — soda mükemmel olur.", best: true, feedbackTr: "Nezaket + alternatif." },
      ] },
    ],
  },
  {
    slug: "social-new-job-congrats",
    title: "Congratulations on New Job",
    titleTr: "Yeni İş Tebriği",
    emoji: "🎊",
    kind: "client",
    mode: "social",
    descriptionTr: "Arkadaşının yeni işini kutlama.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "I got the job at the new boutique!", tr: "Yeni butikteki işi aldım!", replies: [
        { en: "That's amazing news — congratulations! I'm so proud of you.", tr: "Harika haber — tebrikler! Seninle gurur duyuyorum.", best: true, feedbackTr: "Coşkulu tebrik." },
      ] },
    ],
  },
  {
    slug: "social-neighbor-smalltalk",
    title: "Neighbor Small Talk",
    titleTr: "Komşu Sohbeti",
    emoji: "🏠",
    kind: "client",
    mode: "social",
    descriptionTr: "Asansörde komşunla kısa sohbet.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "Lovely weather today, isn't it?", tr: "Bugün hava güzel, değil mi?", replies: [
        { en: "It really is! Perfect for a walk. Have a good day!", tr: "Gerçekten öyle! Yürüyüş için mükemmel. İyi günler!", best: true, feedbackTr: "Doğal sohbet." },
      ] },
    ],
  },
];
