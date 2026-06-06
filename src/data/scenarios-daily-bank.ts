import type { Scenario } from "../types";

/** Daily mod — zengin senaryo bankası (16) */
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
  {
    slug: "daily-pharmacy",
    title: "At the Pharmacy",
    titleTr: "Eczanede",
    emoji: "💊",
    kind: "client",
    mode: "daily",
    descriptionTr: "Reçetesiz ilaç ve doz sorma.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "I need something for a headache.", tr: "Baş ağrısı için bir şey lazım.", replies: [
        { en: "Do you prefer tablets or powder? Any allergies?", tr: "Tablet mi toz mu tercih edersiniz? Alerjiniz var mı?", best: true, feedbackTr: "Seçenek + güvenlik sorusu." },
      ] },
      { speaker: "client", en: "Tablets, no allergies.", tr: "Tablet, alerji yok.", replies: [
        { en: "Take one every six hours with food. Feel better soon!", tr: "Yemekle günde 6 saatte bir bir tane. Geçmiş olsun!", best: true, feedbackTr: "Talimat + nezaket." },
      ] },
    ],
  },
  {
    slug: "daily-supermarket",
    title: "At the Supermarket",
    titleTr: "Süpermarkette",
    emoji: "🛒",
    kind: "client",
    mode: "daily",
    descriptionTr: "Kasa ve poşet diyalogu.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "Paper or plastic bag?", tr: "Kağıt mı plastik mi poşet?", replies: [
        { en: "Paper, please. And could I have the receipt?", tr: "Kağıt lütfen. Fiş alabilir miyim?", best: true, feedbackTr: "Net tercih + fiş." },
      ] },
      { speaker: "client", en: "That's 245 lira.", tr: "245 lira.", replies: [
        { en: "Here you go. Thank you!", tr: "Buyurun. Teşekkürler!", best: true, feedbackTr: "Kısa ve nazik." },
      ] },
    ],
  },
  {
    slug: "daily-taxi",
    title: "Taking a Taxi",
    titleTr: "Taksi ile Gitmek",
    emoji: "🚕",
    kind: "client",
    mode: "daily",
    descriptionTr: "Adres verme ve rota.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "Where to?", tr: "Nereye?", replies: [
        { en: "İstinye Park, please. Main entrance.", tr: "İstinye Park lütfen. Ana giriş.", best: true, feedbackTr: "Net adres." },
      ] },
      { speaker: "client", en: "Traffic is bad — is the highway OK?", tr: "Trafik kötü — otoyol olur mu?", replies: [
        { en: "Yes, that's fine. How long do you think it will take?", tr: "Evet, olur. Ne kadar sürer sizce?", best: true, feedbackTr: "Onay + süre sorusu." },
      ] },
    ],
  },
  {
    slug: "daily-restaurant",
    title: "Ordering at a Restaurant",
    titleTr: "Restoranda Sipariş",
    emoji: "🍽️",
    kind: "client",
    mode: "daily",
    descriptionTr: "Masa, menü ve sipariş.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "Table for two, please.", tr: "İki kişilik masa lütfen.", replies: [
        { en: "Of course. Would you prefer inside or on the terrace?", tr: "Tabii. İçeri mi teras mı tercih edersiniz?", best: true, feedbackTr: "Seçenek sun." },
      ] },
      { speaker: "client", en: "Are you ready to order?", tr: "Sipariş vermeye hazır mısınız?", replies: [
        { en: "Yes. I'll have the grilled chicken and a still water, please.", tr: "Evet. Izgara tavuk ve sade su lütfen.", best: true, feedbackTr: "Net sipariş." },
      ] },
    ],
  },
  {
    slug: "daily-hotel-checkin",
    title: "Hotel Check-In",
    titleTr: "Otel Check-In",
    emoji: "🏨",
    kind: "client",
    mode: "daily",
    descriptionTr: "Rezervasyon teyidi ve oda.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "I have a reservation under Tofta.", tr: "Tofta adına rezervasyonum var.", replies: [
        { en: "Welcome, Mr. Tofta. May I see your passport, please?", tr: "Hoş geldiniz Mr. Tofta. Pasaportunuzu görebilir miyim?", best: true, feedbackTr: "Karşılama + prosedür." },
      ] },
      { speaker: "client", en: "Breakfast included?", tr: "Kahvaltı dahil mi?", replies: [
        { en: "Yes, from seven to ten in the restaurant on the ground floor.", tr: "Evet, zemin kattaki restoranda yedi ile on arası.", best: true, feedbackTr: "Net bilgi." },
      ] },
    ],
  },
  {
    slug: "daily-bank-atm",
    title: "Bank & ATM Issue",
    titleTr: "Banka / ATM Sorunu",
    emoji: "🏦",
    kind: "client",
    mode: "daily",
    descriptionTr: "Kart yutuldu — banka şubesinde.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "The ATM kept my card. What should I do?", tr: "ATM kartımı yuttu. Ne yapmalıyım?", replies: [
        { en: "I'm sorry to hear that. Do you have ID with you? We can block the card and issue a new one.", tr: "Üzgünüm. Kimliğiniz var mı? Kartı iptal edip yenisini çıkarabiliriz.", best: true, feedbackTr: "Empati + çözüm adımları." },
      ] },
    ],
  },
  {
    slug: "daily-gym",
    title: "At the Gym",
    titleTr: "Spor Salonunda",
    emoji: "💪",
    kind: "client",
    mode: "daily",
    descriptionTr: "İlk gün — üyelik ve ekipman.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "Is this machine free?", tr: "Bu makine boş mu?", replies: [
        { en: "Yes, go ahead! I'm finished.", tr: "Evet, buyurun! Ben bitirdim.", best: true, feedbackTr: "Kibar ve net." },
      ] },
      { speaker: "client", en: "How do I adjust the seat?", tr: "Oturak nasıl ayarlanır?", replies: [
        { en: "Pull this lever — like this. Need a spot?", tr: "Bu kolu çekin — böyle. Yardım ister misiniz?", best: true, feedbackTr: "Yardımsever." },
      ] },
    ],
  },
  {
    slug: "daily-neighbor",
    title: "Meeting the Neighbor",
    titleTr: "Komşuyla Tanışma",
    emoji: "🏠",
    kind: "client",
    mode: "daily",
    descriptionTr: "Yeni komşuyla ilk sohbet.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "Hi, I just moved in next door.", tr: "Merhaba, yan daireye yeni taşındım.", replies: [
        { en: "Welcome to the building! I'm Hülya — let me know if you need anything.", tr: "Binaya hoş geldiniz! Ben Hülya — bir şeye ihtiyacınız olursa söyleyin.", best: true, feedbackTr: "Sıcak karşılama." },
      ] },
    ],
  },
  {
    slug: "daily-public-transport",
    title: "On the Metro",
    titleTr: "Metrorda",
    emoji: "🚇",
    kind: "client",
    mode: "daily",
    descriptionTr: "Yol sorma ve bilet.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "Does this train go to Levent?", tr: "Bu tren Levent'e gidiyor mu?", replies: [
        { en: "Yes, but you need to change at Gayrettepe.", tr: "Evet, ama Gayrettepe'de aktarma yapmalısınız.", best: true, feedbackTr: "Yardımcı bilgi." },
      ] },
      { speaker: "client", en: "Thank you! Which side for transfer?", tr: "Teşekkürler! Aktarma hangi taraf?", replies: [
        { en: "Follow the signs to M2 — it's a five-minute walk.", tr: "M2 tabelalarını takip edin — beş dakika yürüyüş.", best: true, feedbackTr: "Net yönlendirme." },
      ] },
    ],
  },
  {
    slug: "daily-hairdresser",
    title: "At the Hair Salon",
    titleTr: "Kuaförde",
    emoji: "💇",
    kind: "client",
    mode: "daily",
    descriptionTr: "Saç kesimi randevusu.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "What would you like today?", tr: "Bugün ne istersiniz?", replies: [
        { en: "Just a trim, please — about two centimetres off.", tr: "Sadece uçları aldırın lütfen — yaklaşık iki santim.", best: true, feedbackTr: "Spesifik istek." },
      ] },
    ],
  },
  {
    slug: "daily-school-call",
    title: "School Phone Call",
    titleTr: "Okul Telefonu",
    emoji: "📞",
    kind: "client",
    mode: "daily",
    descriptionTr: "Çocuğun okulundan arama — izin.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "Your son isn't feeling well. Can someone pick him up?", tr: "Oğlunuz iyi değil. Biri alabilir mi?", replies: [
        { en: "Thank you for calling. I'll leave work and be there in forty minutes.", tr: "Aradığınız için teşekkürler. İşten çıkıp kırk dakikada orada olacağım.", best: true, feedbackTr: "Teşekkür + net plan." },
      ] },
    ],
  },
  {
    slug: "daily-lost-item",
    title: "Lost Wallet",
    titleTr: "Kayıp Cüzdan",
    emoji: "🔍",
    kind: "client",
    mode: "daily",
    descriptionTr: "Kayıp eşya bildirimi — AVM güvenlik.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "Lost and found — how can I help?", tr: "Kayıp eşya — nasıl yardımcı olabilirim?", replies: [
        { en: "I think I left my wallet in the food court about an hour ago.", tr: "Cüzdanımı yaklaşık bir saat önce yemek alanında unuttum sanırım.", best: true, feedbackTr: "Ne + nerede + ne zaman." },
      ] },
      { speaker: "client", en: "What colour and brand?", tr: "Renk ve marka?", replies: [
        { en: "Black leather, Louis Vuitton compact wallet.", tr: "Siyah deri, Louis Vuitton küçük cüzdan.", best: true, feedbackTr: "Detaylı tanım." },
      ] },
    ],
  },
  {
    slug: "daily-plumber",
    title: "Plumber at Home",
    titleTr: "Evde Tesisatçı",
    emoji: "🔧",
    kind: "client",
    mode: "daily",
    descriptionTr: "Musluk tamiri — evde yabancıyla iletişim.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "The kitchen tap is leaking badly.", tr: "Mutfak musluğu çok damlıyor.", replies: [
        { en: "I see. It started yesterday evening — water under the sink too.", tr: "Anlıyorum. Dün akşam başladı — lavabo altında da su var.", best: true, feedbackTr: "Ek bilgi ver." },
      ] },
      { speaker: "client", en: "I'll need to replace the washer. About 200 lira.", tr: "Conta değiştirmem lazım. Yaklaşık 200 lira.", replies: [
        { en: "OK, please go ahead. How long will it take?", tr: "Tamam, lütfen yapın. Ne kadar sürer?", best: true, feedbackTr: "Onay + süre." },
      ] },
    ],
  },
  {
    slug: "daily-vet",
    title: "At the Vet",
    titleTr: "Veterinerde",
    emoji: "🐕",
    kind: "client",
    mode: "daily",
    descriptionTr: "Evcil hayvan kontrolü.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "He hasn't eaten since yesterday.", tr: "Dünden beri yemek yemiyor.", replies: [
        { en: "He's usually very active. No vomiting, but he seems tired.", tr: "Genelde çok hareketli. Kusma yok ama yorgun görünüyor.", best: true, feedbackTr: "Normal vs şimdi karşılaştır." },
      ] },
    ],
  },
];
