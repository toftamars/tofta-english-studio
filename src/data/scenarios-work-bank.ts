import type { Scenario } from "../types";

/** Work mod — genişletilmiş LV senaryo bankası */
export const WORK_EXTRA_SCENARIOS: Scenario[] = [
  {
    slug: "work-gift-wrap",
    title: "Gift Wrapping Request",
    titleTr: "Hediye Paketi İsteği",
    emoji: "🎁",
    kind: "client",
    mode: "work",
    descriptionTr: "Müşteri aldığı ürünü hediye olarak paketlemek istiyor.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "Could you gift-wrap this, please? It's for my wife's birthday.", tr: "Bunu hediye paketi yapar mısınız? Eşimin doğum günü için.", replies: [
        { en: "Of course! We offer complimentary gift wrapping. Would you like a card as well?", tr: "Tabii! Ücretsiz hediye paketimiz var. Kart da ister misiniz?", best: true, feedbackTr: "Hizmeti sun + ekstra dokunuş." },
        { en: "We don't do that.", tr: "Biz yapmıyoruz.", feedbackTr: "Yanlış; LV hediye paketi sunar." },
      ] },
      { speaker: "client", en: "Yes, please. Keep the price tag off.", tr: "Evet lütfen. Fiyat etiketini çıkarın.", replies: [
        { en: "Absolutely. I'll remove the tag and prepare a beautiful presentation.", tr: "Kesinlikle. Etiketi çıkarıp güzel bir sunum hazırlayacağım.", best: true, feedbackTr: "Talebi onayla + güven ver." },
      ] },
    ],
  },
  {
    slug: "work-exchange-size",
    title: "Exchange for Another Size",
    titleTr: "Beden Değişimi",
    emoji: "↔️",
    kind: "client",
    mode: "work",
    descriptionTr: "Müşteri aldığı ayakkabının bedenini değiştirmek istiyor.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "I bought these last week but they're too small. Can I exchange them?", tr: "Geçen hafta aldım ama küçük geldi. Değiştirebilir miyim?", replies: [
        { en: "Of course. Do you have the receipt and the original packaging?", tr: "Tabii. Fişiniz ve orijinal kutusu var mı?", best: true, feedbackTr: "Olumlu + prosedür sorusu." },
        { en: "No exchanges.", tr: "Değişim yok.", feedbackTr: "Politikayı bil; genelde değişim mümkün." },
      ] },
      { speaker: "client", en: "Yes, here they are.", tr: "Evet, işte.", replies: [
        { en: "Perfect. Let me check stock for your size — one moment, please.", tr: "Harika. Bedeninizi stokta kontrol edeyim — bir saniye lütfen.", best: true, feedbackTr: "Profesyonel ve çözüm odaklı." },
      ] },
    ],
  },
  {
    slug: "work-repair-request",
    title: "Repair & After-Sales",
    titleTr: "Tamir ve Satış Sonrası",
    emoji: "🔧",
    kind: "client",
    mode: "work",
    descriptionTr: "Müşterinin çanta sapı yıpranmış — tamir süreci.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "The handle on my bag is worn. Can Louis Vuitton repair it?", tr: "Çantamın sapı yıprandı. LV tamir eder mi?", replies: [
        { en: "Yes, we offer repair services. May I see the bag and your proof of purchase?", tr: "Evet, tamir hizmetimiz var. Çantayı ve alış belgenizi görebilir miyim?", best: true, feedbackTr: "Evet + prosedür." },
        { en: "Buy a new one.", tr: "Yeni alın.", feedbackTr: "Önce tamir seçeneğini sun." },
      ] },
      { speaker: "client", en: "How long does it take?", tr: "Ne kadar sürer?", replies: [
        { en: "Usually four to six weeks. I'll give you a tracking number when we send it.", tr: "Genelde 4-6 hafta. Gönderince takip numarası veririm.", best: true, feedbackTr: "Gerçekçi süre + takip." },
      ] },
    ],
  },
  {
    slug: "work-hot-stamping",
    title: "Hot Stamping Personalisation",
    titleTr: "Kişiselleştirme — Hot Stamping",
    emoji: "✒️",
    kind: "client",
    mode: "work",
    descriptionTr: "Müşteri cüzdanına baş harf baskısı istiyor.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "Can you add my initials to this wallet?", tr: "Bu cüzdana baş harflerimi ekleyebilir misiniz?", replies: [
        { en: "Yes! Our hot stamping is complimentary. Which initials and colour would you like?", tr: "Evet! Hot stamping ücretsiz. Hangi harfler ve renk?", best: true, feedbackTr: "Hizmeti tanıt + seçenek sun." },
      ] },
      { speaker: "client", en: "H.A. in gold, please.", tr: "H.A. altın renkte lütfen.", replies: [
        { en: "Beautiful choice. It takes about fifteen minutes — may I offer you a coffee while you wait?", tr: "Harika seçim. Yaklaşık 15 dakika — beklerken kahve ister misiniz?", best: true, feedbackTr: "Onay + misafirperverlik." },
      ] },
    ],
  },
  {
    slug: "work-fragrance",
    title: "Fragrance Discovery",
    titleTr: "Parfüm Keşfi",
    emoji: "🌸",
    kind: "client",
    mode: "work",
    descriptionTr: "Müşteri LV parfüm ailesini keşfetmek istiyor.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "I'd like to try your fragrances.", tr: "Parfümlerinizi denemek istiyorum.", replies: [
        { en: "With pleasure. Do you prefer something fresh or more sensual?", tr: "Memnuniyetle. Ferah mı yoksa daha duyusal mı tercih edersiniz?", best: true, feedbackTr: "Keşif sorusu — ihtiyacı daralt." },
      ] },
      { speaker: "client", en: "Something for evening, not too strong.", tr: "Akşam için, çok ağır olmasın.", replies: [
        { en: "I'd suggest Attrape-Rêves — it's elegant with soft floral notes.", tr: "Attrape-Rêves öneririm — zarif, yumuşak çiçek notaları.", best: true, feedbackTr: "Öneri + kısa hikâye." },
      ] },
    ],
  },
  {
    slug: "work-shoes-fitting",
    title: "Shoe Fitting",
    titleTr: "Ayakkabı Denemesi",
    emoji: "👠",
    kind: "client",
    mode: "work",
    descriptionTr: "Müşteri LV sneaker deniyor — beden ve konfor.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "Do these run true to size?", tr: "Numara tam mı?", replies: [
        { en: "They fit true to size. Would you like to try half a size up for comfort?", tr: "Numara tam oturur. Konfor için yarım numara büyük denemek ister misiniz?", best: true, feedbackTr: "Bilgi + proaktif öneri." },
      ] },
      { speaker: "client", en: "I'll take the 38.", tr: "38 alacağım.", replies: [
        { en: "Excellent. I'll bring a fresh pair from the back for you.", tr: "Harika. Arka depodan yeni bir çift getireyim.", best: true, feedbackTr: "Satış öncesi taze ürün — standart." },
      ] },
    ],
  },
  {
    slug: "work-rtw-blazer",
    title: "Ready-to-Wear Styling",
    titleTr: "Hazır Giyim — Blazer Stili",
    emoji: "🧥",
    kind: "client",
    mode: "work",
    descriptionTr: "Müşteri blazer ve çanta kombinasyonu arıyor.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "I need something for a business dinner.", tr: "İş yemeği için bir şey lazım.", replies: [
        { en: "I'd love to help. Are you thinking of a full look or one statement piece?", tr: "Yardım edeyim. Tam bir look mu yoksa tek parça mı?", best: true, feedbackTr: "Styling başlangıcı." },
      ] },
      { speaker: "client", en: "A blazer that works with this bag.", tr: "Bu çantayla giden bir blazer.", replies: [
        { en: "This navy blazer pairs beautifully with your Monogram — timeless and sharp.", tr: "Bu lacivert blazer Monogram'ınızla harika gider — zamansız ve şık.", best: true, feedbackTr: "Kombin önerisi + değer." },
      ] },
    ],
  },
  {
    slug: "work-online-vs-store",
    title: "Online vs Boutique",
    titleTr: "Online mı Mağaza mı?",
    emoji: "📱",
    kind: "client",
    mode: "work",
    descriptionTr: "Müşteri online gördüğü ürünü mağazada denemek istiyor.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "I saw the Pochette Métis online. Do you have it here?", tr: "Pochette Métis'i online gördüm. Burada var mı?", replies: [
        { en: "Let me check for you. The boutique experience lets you see the leather and try it on.", tr: "Kontrol edeyim. Butikte deriyi görüp deneyebilirsiniz.", best: true, feedbackTr: "Yardım + butik değeri." },
      ] },
      { speaker: "client", en: "Is it the same price as online?", tr: "Online ile aynı fiyat mı?", replies: [
        { en: "Yes, the price is the same. Here you also get personal styling and immediate care advice.", tr: "Evet, fiyat aynı. Burada kişisel stil ve anında bakım tavsiyesi de alırsınız.", best: true, feedbackTr: "Dürüst + ek değer." },
      ] },
    ],
  },
  {
    slug: "work-celebrity-discreet",
    title: "Discreet VIP Service",
    titleTr: "Gizli VIP Hizmet",
    emoji: "🕶️",
    kind: "client",
    mode: "work",
    minCefr: "B1",
    descriptionTr: "Tanınmış müşteri gizlilik istiyor.",
    difficulty: 3,
    steps: [
      { speaker: "client", en: "I'd prefer a private area, if possible.", tr: "Mümkünse özel bir alan tercih ederim.", replies: [
        { en: "Of course. Please follow me to our salon — it's completely private.", tr: "Tabii. Lütfen salonumuza buyurun — tamamen özel.", best: true, feedbackTr: "Hemen karşıla, gizliliği onayla." },
      ] },
      { speaker: "client", en: "Please don't take photos or mention I'm here.", tr: "Lütfen fotoğraf çekmeyin veya burada olduğumu söylemeyin.", replies: [
        { en: "Absolutely. Your privacy is our priority.", tr: "Kesinlikle. Gizliliğiniz önceliğimiz.", best: true, feedbackTr: "Net taahhüt." },
      ] },
    ],
  },
  {
    slug: "work-comparison-shopper",
    title: "Comparing with Another Brand",
    titleTr: "Başka Markayla Karşılaştırma",
    emoji: "⚖️",
    kind: "client",
    mode: "work",
    descriptionTr: "Müşteri Chanel ile karşılaştırıyor — baskısız savunma.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "Chanel has a similar bag for less. Why Louis Vuitton?", tr: "Chanel'de benzer çanta daha ucuz. Neden LV?", replies: [
        { en: "Both are beautiful. LV offers heritage craftsmanship and our canvas lasts for decades.", tr: "İkisi de güzel. LV miras zanaatı ve on yıllar dayanan canvas sunar.", best: true, feedbackTr: "Rakibi kötüleme; kendi değerini anlat." },
      ] },
      { speaker: "client", en: "Hmm. I'll think about it.", tr: "Hmm. Düşüneceğim.", replies: [
        { en: "Of course. May I save your favourites so we can follow up when you're ready?", tr: "Tabii. Favorilerinizi kaydedeyim, hazır olunca takip edelim.", best: true, feedbackTr: "Baskı yok + clienteling." },
      ] },
    ],
  },
  {
    slug: "work-limited-edition",
    title: "Limited Edition Inquiry",
    titleTr: "Limited Edition Sorgusu",
    emoji: "💎",
    kind: "client",
    mode: "work",
    descriptionTr: "Müşteri sınırlı üretim parça soruyor.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "Do you still have the limited edition Speedy?", tr: "Limited edition Speedy hâlâ var mı?", replies: [
        { en: "That edition sold out quickly. I can note your interest for future releases.", tr: "O edition hızla tükendi. Gelecek çıkışlar için ilginizi kaydedebilirim.", best: true, feedbackTr: "Dürüst + waitlist/clienteling." },
      ] },
      { speaker: "client", en: "Please do. My email is on file.", tr: "Lütfen. E-postam kayıtlı.", replies: [
        { en: "Perfect. I'll make sure you're contacted first.", tr: "Harika. İlk sizinle iletişime geçilmesini sağlayacağım.", best: true, feedbackTr: "VIP hissi." },
      ] },
    ],
  },
  {
    slug: "work-new-ca-training",
    title: "Training a New Colleague",
    titleTr: "Yeni Meslektaşa Eğitim",
    emoji: "🎓",
    kind: "manager",
    mode: "work",
    descriptionTr: "Yönetici senden yeni CA'ya selling ceremony öğretmeni istiyor.",
    difficulty: 2,
    steps: [
      { speaker: "manager", en: "Hülya, can you mentor Aylin this week on the selling ceremony?", tr: "Hülya, bu hafta Aylin'e selling ceremony mentorluk yapabilir misin?", replies: [
        { en: "Of course. I'll walk her through welcome, discovery, and presentation step by step.", tr: "Tabii. Karşılama, keşif ve sunumu adım adım göstereceğim.", best: true, feedbackTr: "İş birliği + plan." },
      ] },
      { speaker: "manager", en: "Focus especially on discovery questions.", tr: "Özellikle keşif sorularına odaklan.", replies: [
        { en: "Understood. I'll role-play a few client scenarios with her.", tr: "Anlaşıldı. Onunla birkaç müşteri senaryosu role-play yapacağım.", best: true, feedbackTr: "Proaktif eğitim yöntemi." },
      ] },
    ],
  },
  {
    slug: "work-stock-transfer",
    title: "Stock Transfer Request",
    titleTr: "Stok Transfer Talebi",
    emoji: "📦",
    kind: "manager",
    mode: "work",
    descriptionTr: "Müşteri için başka mağazadan ürün getirtilmesi.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "Can you get this bag from Nişantaşı store?", tr: "Bu çantayı Nişantaşı mağazasından getirebilir misiniz?", replies: [
        { en: "I'll check with our team. May I take your details and call you within the hour?", tr: "Ekibimizle kontrol edeceğim. Bilgilerinizi alıp bir saat içinde arayabilir miyim?", best: true, feedbackTr: "Çözüm vaadi + zaman." },
      ] },
      { speaker: "manager", en: "Nişantaşı can send it tomorrow. Confirm with the client.", tr: "Nişantaşı yarın gönderebilir. Müşteriyi teyit et.", replies: [
        { en: "I'll call her right away and arrange pickup or delivery.", tr: "Hemen arayıp teslim alma veya kargo ayarlayacağım.", best: true, feedbackTr: "Hızlı aksiyon." },
      ] },
    ],
  },
  {
    slug: "work-unhappy-review",
    title: "Unhappy Client — Online Review",
    titleTr: "Memnuniyetsiz Müşteri — Yorum",
    emoji: "⭐",
    kind: "client",
    mode: "work",
    descriptionTr: "Müşteri mağaza deneyiminden memnun değil, sakin çözüm.",
    difficulty: 3,
    steps: [
      { speaker: "client", en: "I waited twenty minutes and nobody helped me last time.", tr: "Geçen sefer yirmi dakika bekledim, kimse yardım etmedi.", replies: [
        { en: "I'm truly sorry that happened. That's not the experience we want. How can I make today perfect?", tr: "Bunun yaşanmasından gerçekten üzgünüm. Bugünü mükemmel yapmam için ne yapabilirim?", best: true, feedbackTr: "Özür + bugüne odaklan." },
      ] },
      { speaker: "client", en: "Just help me quickly this time.", tr: "Bu sefer sadece hızlı yardım edin.", replies: [
        { en: "Absolutely. I'm here only for you — what are you looking for today?", tr: "Kesinlikle. Bugün sadece sizin için buradayım — ne arıyorsunuz?", best: true, feedbackTr: "Tam odak + keşif." },
      ] },
    ],
  },
  {
    slug: "work-couple-gift",
    title: "Couple Shopping Together",
    titleTr: "Birlikte Alışveriş Yapan Çift",
    emoji: "💑",
    kind: "client",
    mode: "work",
    descriptionTr: "Eşi için hediye seçen müşteri — iki kişiyi yönetme.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "I want to surprise my husband but he doesn't know.", tr: "Kocama sürpriz yapmak istiyorum ama bilmiyor.", replies: [
        { en: "How lovely! I'll be discreet. What styles does he usually wear?", tr: "Ne güzel! Gizli kalacağım. Genelde hangi tarz giyer?", best: true, feedbackTr: "Gizliliği onayla + keşif." },
      ] },
      { speaker: "narrator", en: "The husband walks over curious.", tr: "Koca merakla yaklaşıyor.", replies: [
        { en: "Sir, we're looking at our small leather goods — perhaps a wallet for yourself?", tr: "Beyefendi, küçük deri ürünlere bakıyoruz — belki kendinize bir cüzdan?", best: true, feedbackTr: "Zarif yönlendirme — sürprizi bozma." },
      ] },
    ],
  },
  {
    slug: "work-rain-umbrella",
    title: "Rainy Day — Umbrella Sale",
    titleTr: "Yağmurlu Gün — Şemsiye",
    emoji: "☔",
    kind: "client",
    mode: "work",
    descriptionTr: "Yağmurda mağazaya sığınan müşteri — fırsat ve nezaket.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "It's pouring outside! I didn't expect rain.", tr: "Dışarıda sağanak! Yağmur beklemiyordum.", replies: [
        { en: "Please stay as long as you like. We also have beautiful umbrellas if you need one.", tr: "İstediğiniz kadar kalın. İhtiyacınız olursa güzel şemsiyelerimiz de var.", best: true, feedbackTr: "Misafirperver + yumuşak öneri." },
      ] },
      { speaker: "client", en: "Show me the umbrella, please.", tr: "Şemsiyeyi gösterir misiniz?", replies: [
        { en: "This one folds small and matches our canvas perfectly.", tr: "Bu katlanır, canvas'ımızla mükemmel uyumlu.", best: true, feedbackTr: "Ürün + uyum hikâyesi." },
      ] },
    ],
  },
  {
    slug: "work-influencer-visit",
    title: "Content Creator Visit",
    titleTr: "İçerik Üreticisi Ziyareti",
    emoji: "📸",
    kind: "client",
    mode: "work",
    minCefr: "B1",
    descriptionTr: "Sosyal medya içerikçisi mağazada — politika ve nezaket.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "Can I film a unboxing here for my followers?", tr: "Takipçilerim için burada unboxing çekebilir miyim?", replies: [
        { en: "Thank you for asking. Filming isn't allowed in the boutique, but I'd love to help you choose pieces to feature.", tr: "Sorduğunuz için teşekkürler. Butikte çekim yasak, ama öne çıkaracağınız parçaları seçmenize yardım ederim.", best: true, feedbackTr: "Kibar red + alternatif." },
      ] },
      { speaker: "client", en: "OK, I'll take photos at home then.", tr: "Tamam, evde fotoğraf çekerim.", replies: [
        { en: "Perfect. I'll pack it beautifully for you.", tr: "Harika. Sizin için güzel paketlerim.", best: true, feedbackTr: "Olumlu kapanış." },
      ] },
    ],
  },
  {
    slug: "work-manager-daily-target",
    title: "Daily Target Check-In",
    titleTr: "Günlük Hedef Kontrolü",
    emoji: "📈",
    kind: "manager",
    mode: "work",
    minCefr: "B1",
    descriptionTr: "Gün sonu yönetici hedefi soruyor.",
    difficulty: 2,
    steps: [
      { speaker: "manager", en: "How did we do today on appointments and conversion?", tr: "Bugün randevu ve dönüşüm nasıl gitti?", replies: [
        { en: "We had eight appointments and converted five. One client booked a follow-up for Friday.", tr: "Sekiz randevu vardı, beşini kapattık. Bir müşteri Cuma takip randevusu aldı.", best: true, feedbackTr: "Sayılar + detay." },
      ] },
      { speaker: "manager", en: "Good. Anything we should improve tomorrow?", tr: "Güzel. Yarın neyi geliştirmeliyiz?", replies: [
        { en: "I'd like more time on cross-selling SLG after bag sales.", tr: "Çanta satışından sonra SLG cross-sell için daha fazla zaman istiyorum.", best: true, feedbackTr: "Yapıcı öneri." },
      ] },
    ],
  },
];
