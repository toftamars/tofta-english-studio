import type { Scenario } from "../types";

// ============================================================
// ROL-YAPMA SİMÜLATÖRÜ — Hülya
//  Gerçek mağaza/yönetici durumları. Her adımda müşteri ya da
//  yönetici konuşur; Hülya en uygun İngilizce cevabı seçer (ve
//  sesli söyleyebilir). "best" cevap doğru, diğerleri geri bildirimli.
// ============================================================

export const HULYA_SCENARIOS: Scenario[] = [
  {
    slug: "welcome-client",
    title: "Welcoming a Client",
    titleTr: "Bir Müşteriyi Karşılama",
    emoji: "🤝",
    kind: "client",
    descriptionTr: "Mağazaya yeni bir müşteri giriyor. Onu sıcak ve zarif karşıla.",
    difficulty: 1,
    steps: [
      { speaker: "narrator", en: "A client walks into the boutique.", tr: "Bir müşteri butiğe giriyor." },
      {
        speaker: "client",
        en: "Hi… I'm just looking, thank you.",
        tr: "Merhaba… sadece bakıyorum, teşekkürler.",
        replies: [
          { en: "Of course! Take your time. I'm Hülya if you need anything.", tr: "Tabii ki! Acele etmeyin. Bir şeye ihtiyacınız olursa ben Hülya.", best: true, feedbackTr: "Mükemmel — alan tanıdın ama kendini de tanıttın." },
          { en: "You must buy something today.", tr: "Bugün bir şey almalısınız.", feedbackTr: "Çok baskıcı; luxury serviste asla zorlamayız." },
          { en: "Okay. (says nothing more)", tr: "Tamam. (başka bir şey demez)", feedbackTr: "Biraz daha sıcak olabilirsin; kendini tanıt." },
        ],
      },
      {
        speaker: "client",
        en: "Actually, can I have a glass of water?",
        tr: "Aslında, bir bardak su alabilir miyim?",
        replies: [
          { en: "Of course! Still or sparkling? Please, have a seat.", tr: "Tabii ki! Sade mi maden mi? Lütfen, buyurun oturun.", best: true, feedbackTr: "Harika misafirperverlik." },
          { en: "The water is over there.", tr: "Su şurada.", feedbackTr: "Servisi sen sun; müşteriyi yönlendirme." },
        ],
      },
      { speaker: "client", en: "Thank you, that's very kind.", tr: "Teşekkürler, çok naziksiniz.", replies: [
        { en: "It's my pleasure. Let me know if a piece catches your eye.", tr: "Rica ederim. Bir parça gözünüze çarparsa söyleyin.", best: true, feedbackTr: "Nazik ve davetkâr bir kapanış." },
      ] },
    ],
  },

  {
    slug: "discovery-needs",
    title: "Discovering Needs",
    titleTr: "İhtiyacı Keşfetmek",
    emoji: "🔎",
    kind: "client",
    descriptionTr: "Müşteri bir çanta istiyor ama ne istediğinden emin değil.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "I'm looking for a bag, but I'm not sure which one.", tr: "Bir çanta arıyorum ama hangisi emin değilim.", replies: [
        { en: "Lovely! Is it for you, or is it a gift?", tr: "Harika! Kendiniz için mi, hediye mi?", best: true, feedbackTr: "Doğru başlangıç — açık uçlu soru." },
        { en: "Buy the Neverfull.", tr: "Neverfull'u alın.", feedbackTr: "Önce ihtiyacı anla, sonra öner." },
      ] },
      { speaker: "client", en: "It's for me. Something for everyday.", tr: "Kendim için. Günlük kullanım için bir şey.", replies: [
        { en: "Do you prefer something classic or modern?", tr: "Klasik mi modern mi tercih edersiniz?", best: true, feedbackTr: "İhtiyacı daraltan güzel bir soru." },
        { en: "Everything is good.", tr: "Hepsi iyi.", feedbackTr: "Yardımcı değil; soru sormaya devam et." },
      ] },
      { speaker: "client", en: "Classic, and not too big.", tr: "Klasik ve çok büyük olmasın.", replies: [
        { en: "Then let me show you the Speedy. It's a timeless everyday bag.", tr: "O zaman size Speedy'yi göstereyim. Zamansız bir günlük çanta.", best: true, feedbackTr: "İhtiyaca uygun, hikâyeli öneri." },
        { en: "Take the biggest tote.", tr: "En büyük tote'u alın.", feedbackTr: "Müşteri 'çok büyük olmasın' dedi; dinle." },
      ] },
    ],
  },

  {
    slug: "product-questions",
    title: "Product Questions",
    titleTr: "Ürün Soruları",
    emoji: "👜",
    kind: "client",
    descriptionTr: "Müşteri malzeme ve bakım hakkında sorular soruyor.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "Is this leather?", tr: "Bu deri mi?", replies: [
        { en: "This part is coated canvas, and the handles are real leather.", tr: "Bu kısım kaplamalı kanvas, saplar gerçek deri.", best: true, feedbackTr: "Doğru ve net bilgi." },
        { en: "Yes, all leather.", tr: "Evet, tamamen deri.", feedbackTr: "Yanlış bilgi; Monogram kaplamalı kanvastır." },
      ] },
      { speaker: "client", en: "Is it waterproof?", tr: "Su geçirmez mi?", replies: [
        { en: "The canvas is water-resistant, but please keep the leather parts dry.", tr: "Kanvas suya dayanıklı, ama deri kısımları kuru tutun.", best: true, feedbackTr: "Dürüst ve yardımcı." },
        { en: "Yes, you can swim with it.", tr: "Evet, onunla yüzebilirsiniz.", feedbackTr: "Abartma; doğru bilgi ver." },
      ] },
      { speaker: "client", en: "Can I personalize it?", tr: "Kişiselleştirebilir miyim?", replies: [
        { en: "Yes. We can add your initials with our free hot stamping service.", tr: "Evet. Ücretsiz baş harf baskısıyla baş harflerinizi ekleyebiliriz.", best: true, feedbackTr: "Mükemmel — hizmeti tanıttın." },
      ] },
    ],
  },

  {
    slug: "handle-objection",
    title: "Handling 'It's Expensive'",
    titleTr: "'Pahalı' İtirazını Karşılama",
    emoji: "💬",
    kind: "client",
    descriptionTr: "Müşteri ürünü beğeniyor ama fiyatı yüksek buluyor.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "I love it, but it's very expensive.", tr: "Çok beğendim ama çok pahalı.", replies: [
        { en: "I understand. This piece is an investment — it lasts many years.", tr: "Anlıyorum. Bu parça bir yatırım — uzun yıllar dayanır.", best: true, feedbackTr: "Empati + değer vurgusu." },
        { en: "No, it's cheap.", tr: "Hayır, ucuz.", feedbackTr: "Müşterinin hissini reddetme." },
      ] },
      { speaker: "client", en: "Hmm. I need to think about it.", tr: "Hmm. Düşünmem lazım.", replies: [
        { en: "Of course, take your time to decide. Would you like to compare it with another model?", tr: "Tabii ki, karar vermek için acele etmeyin. Başka bir modelle karşılaştırmak ister misiniz?", best: true, feedbackTr: "Baskı yok, seçenek var." },
        { en: "If you leave, the price goes up.", tr: "Giderseniz fiyat artar.", feedbackTr: "Korkutma taktiği luxury'de yapılmaz." },
      ] },
      { speaker: "client", en: "Maybe I'll take it. Can you tell me more about it?", tr: "Belki alırım. Biraz daha anlatır mısınız?", replies: [
        { en: "Of course. It is made by hand, and this design is a true classic.", tr: "Tabii. El yapımı ve bu tasarım gerçek bir klasik.", best: true, feedbackTr: "Hikâye ile değeri pekiştirdin." },
      ] },
    ],
  },

  {
    slug: "close-and-pay",
    title: "Closing & Payment",
    titleTr: "Satışı Kapatma ve Ödeme",
    emoji: "🛍️",
    kind: "client",
    descriptionTr: "Müşteri almaya karar verdi. Zarifçe kapat ve paketle.",
    difficulty: 1,
    steps: [
      { speaker: "client", en: "Okay, I'll take it!", tr: "Tamam, alıyorum!", replies: [
        { en: "Excellent choice! How would you like to pay — card or cash?", tr: "Mükemmel bir seçim! Nasıl ödemek istersiniz — kart mı nakit mi?", best: true, feedbackTr: "Onaylama + net ödeme sorusu." },
        { en: "Finally.", tr: "Nihayet.", feedbackTr: "Asla! Her zaman kibar ve pozitif." },
      ] },
      { speaker: "client", en: "By card, please.", tr: "Kart ile, lütfen.", replies: [
        { en: "Of course. May I see your card, please?", tr: "Tabii. Kartınızı görebilir miyim, lütfen?", best: true, feedbackTr: "Kibar ve net." },
      ] },
      { speaker: "client", en: "It's a gift for my sister.", tr: "Kız kardeşime hediye.", replies: [
        { en: "How lovely! I will gift-wrap it carefully for you.", tr: "Ne güzel! Sizin için özenle hediye paketi yapacağım.", best: true, feedbackTr: "Kişisel dokunuş + hizmet." },
        { en: "Okay, here it is.", tr: "Tamam, işte burada.", feedbackTr: "Hediye paketi teklif et; fırsatı kaçırma." },
      ] },
    ],
  },

  {
    slug: "complaint-client",
    title: "An Upset Client",
    titleTr: "Üzgün Bir Müşteri",
    emoji: "🕊️",
    kind: "client",
    descriptionTr: "Bir müşteri, kısa süre önce aldığı çantanın fermuarı bozulduğu için kızgın.",
    difficulty: 3,
    steps: [
      { speaker: "client", en: "I bought this bag last week and the zip is already broken!", tr: "Bu çantayı geçen hafta aldım ve fermuar şimdiden bozuldu!", replies: [
        { en: "I am very sorry to hear that. Thank you for telling me — let me help you.", tr: "Bunu duyduğuma çok üzüldüm. Söylediğiniz için teşekkürler — yardımcı olayım.", best: true, feedbackTr: "Önce empati, sonra çözüm." },
        { en: "Did you use it wrong?", tr: "Yanlış mı kullandınız?", feedbackTr: "Suçlama; müşteriyi savunmaya itme." },
      ] },
      { speaker: "client", en: "I'm really disappointed. This is Louis Vuitton!", tr: "Gerçekten hayal kırıklığına uğradım. Burası Louis Vuitton!", replies: [
        { en: "I completely understand how you feel. We can repair it, or offer an exchange.", tr: "Nasıl hissettiğinizi tamamen anlıyorum. Tamir edebiliriz ya da değişim sunabiliriz.", best: true, feedbackTr: "Anlayış + somut seçenekler." },
        { en: "It's not a big problem.", tr: "Büyük bir sorun değil.", feedbackTr: "Müşterinin duygusunu küçümseme." },
      ] },
      { speaker: "client", en: "I would like a repair, but quickly please.", tr: "Tamir istiyorum ama lütfen hızlı olsun.", replies: [
        { en: "Of course. Let me ask my manager to help us speed it up. Thank you for your patience.", tr: "Tabii. Hızlandırmak için yöneticimden rica edeyim. Sabrınız için teşekkürler.", best: true, feedbackTr: "Gerektiğinde yöneticiye eskale et." },
      ] },
    ],
  },

  {
    slug: "brand-story",
    title: "Telling the Maison's Story",
    titleTr: "Maison'un Hikâyesini Anlatmak",
    emoji: "🏛️",
    kind: "client",
    descriptionTr: "Müşteri markanın hikâyesini merak ediyor. Storytelling zamanı!",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "I love this brand. How old is it?", tr: "Bu markaya bayılıyorum. Ne kadar eski?", replies: [
        { en: "Louis Vuitton started in Paris in 1854 — more than 170 years of history.", tr: "Louis Vuitton 1854'te Paris'te başladı — 170 yıldan fazla tarih.", best: true, feedbackTr: "Doğru tarih + etkileyici çerçeve." },
        { en: "I don't know exactly.", tr: "Tam bilmiyorum.", feedbackTr: "Hikâyeyi öğren; güven verir." },
      ] },
      { speaker: "client", en: "Wow. And the famous pattern?", tr: "Vay. Peki ünlü desen?", replies: [
        { en: "The founder's son, Georges, created the Monogram in 1896 to honor his father.", tr: "Kurucunun oğlu Georges, Monogram'ı 1896'da babasının onuruna yarattı.", best: true, feedbackTr: "Güzel, duygusal bir hikâye." },
      ] },
      { speaker: "client", en: "That's beautiful. Are the bags still handmade?", tr: "Çok güzel. Çantalar hâlâ el yapımı mı?", replies: [
        { en: "Yes! We still make trunks by hand near Paris, with the same savoir-faire.", tr: "Evet! Sandıkları hâlâ Paris yakınında, aynı ustalıkla elle yapıyoruz.", best: true, feedbackTr: "Mirası bugüne bağladın — mükemmel." },
      ] },
    ],
  },

  {
    slug: "manager-briefing",
    title: "Morning Briefing with Your Manager",
    titleTr: "Yöneticiyle Sabah Brifingi",
    emoji: "🧑‍💼",
    kind: "manager",
    descriptionTr: "Mağaza açılmadan önce takım brifingi. Yöneticinle İngilizce konuş.",
    difficulty: 2,
    steps: [
      { speaker: "manager", en: "Good morning, team. Hülya, how did you do yesterday?", tr: "Günaydın ekip. Hülya, dün nasıl geçti?", replies: [
        { en: "Good morning! I made four sales and reached my target.", tr: "Günaydın! Dört satış yaptım ve hedefime ulaştım.", best: true, feedbackTr: "Net, Past Simple ile rapor." },
        { en: "I am make sales.", tr: "(hatalı) satış yapıyorum.", feedbackTr: "Dilbilgisi: 'I made…' (geçmiş)." },
      ] },
      { speaker: "manager", en: "Great. Today, please focus on the new collection.", tr: "Harika. Bugün lütfen yeni koleksiyona odaklan.", replies: [
        { en: "Understood. Which pieces should I highlight?", tr: "Anlaşıldı. Hangi parçaları öne çıkarayım?", best: true, feedbackTr: "İnisiyatif + iyi soru." },
        { en: "No.", tr: "Hayır.", feedbackTr: "İş birliği göster." },
      ] },
      { speaker: "manager", en: "Highlight the Capucines. Any stock issues?", tr: "Capucines'i öne çıkar. Stok sorunu var mı?", replies: [
        { en: "Yes — do we have the Capucines in black? Can we request a transfer if not?", tr: "Evet — Capucines siyah var mı? Yoksa transfer isteyebilir miyiz?", best: true, feedbackTr: "Proaktif stok yönetimi." },
      ] },
      { speaker: "manager", en: "I'll check and let you know. Have a great day!", tr: "Kontrol edip haber veririm. İyi günler!", replies: [
        { en: "Thank you! I'm not sure about one thing — could you repeat the target, please?", tr: "Teşekkürler! Bir konuda emin değilim — hedefi tekrar eder misiniz, lütfen?", best: true, feedbackTr: "Anlamadığında kibarca sormak güçtür, zayıflık değil." },
      ] },
    ],
  },
];

export function getScenario(slug: string): Scenario | undefined {
  return HULYA_SCENARIOS.find((s) => s.slug === slug);
}
