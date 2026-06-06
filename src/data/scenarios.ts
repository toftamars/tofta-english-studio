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

  {
    slug: "vip-returning",
    title: "A Returning VIP Client",
    titleTr: "Geri Dönen VIP Müşteri",
    emoji: "💎",
    kind: "client",
    descriptionTr: "Daha önce alışveriş yapmış değerli bir müşteri tekrar geliyor. Onu tanıdığını hissettir.",
    difficulty: 2,
    steps: [
      { speaker: "narrator", en: "A client you served last month returns to the boutique.", tr: "Geçen ay ilgilendiğin bir müşteri butiğe geri dönüyor." },
      { speaker: "client", en: "Hello again! Do you remember me?", tr: "Tekrar merhaba! Beni hatırladınız mı?", replies: [
        { en: "Of course, Mrs. Yılmaz! Welcome back. How is your Capucines bag?", tr: "Tabii ki, Yılmaz Hanım! Tekrar hoş geldiniz. Capucines çantanız nasıl?", best: true, feedbackTr: "İsmi ve önceki alışverişi hatırlamak en güçlü clienteling becerisidir." },
        { en: "Sorry, I see many people.", tr: "Üzgünüm, çok insan görüyorum.", feedbackTr: "Asla; müşteriyi özel hissettir, soğuk olma." },
      ] },
      { speaker: "client", en: "It's perfect! I'm looking for something to match it.", tr: "Mükemmel! Ona uyacak bir şey arıyorum.", replies: [
        { en: "Wonderful. We just received a matching wallet — may I show you?", tr: "Harika. Tam uyumlu bir cüzdan geldi — göstereyim mi?", best: true, feedbackTr: "İhtiyaca bağlı, kişiselleştirilmiş öneri." },
        { en: "We don't have anything.", tr: "Hiçbir şeyimiz yok.", feedbackTr: "Önce ürün bilgini kullan, çözüm sun." },
      ] },
      { speaker: "client", en: "Yes, please. You always take good care of me.", tr: "Evet, lütfen. Bana hep çok iyi bakıyorsunuz.", replies: [
        { en: "It's my pleasure. May I take your number to inform you about new arrivals?", tr: "Rica ederim. Yeni gelenlerden haberdar etmek için numaranızı alabilir miyim?", best: true, feedbackTr: "İlişkiyi sürdürmek için iletişim bilgisi iste — clienteling." },
      ] },
    ],
  },

  {
    slug: "gift-for-him",
    title: "Buying a Gift for Him",
    titleTr: "Erkeğe Hediye Almak",
    emoji: "🎁",
    kind: "client",
    descriptionTr: "Bir müşteri eşine doğum günü hediyesi arıyor ama ne alacağını bilmiyor.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "I need a gift for my husband. It's his birthday.", tr: "Eşime bir hediye lazım. Doğum günü.", replies: [
        { en: "Happy birthday to him! Does he prefer bags, accessories, or something to wear?", tr: "Doğum günü kutlu olsun! Çanta mı, aksesuar mı, yoksa giyilecek bir şey mi tercih eder?", best: true, feedbackTr: "Sıcak + ihtiyacı daraltan açık uçlu soru." },
        { en: "Just buy a belt.", tr: "Sadece bir kemer alın.", feedbackTr: "Önce kişiyi tanı, sonra öner." },
      ] },
      { speaker: "client", en: "He travels a lot for work.", tr: "İş için çok seyahat ediyor.", replies: [
        { en: "Then a leather wash bag or a card holder is both useful and elegant.", tr: "O zaman deri bir makyaj/banyo çantası ya da kartlık hem kullanışlı hem şık olur.", best: true, feedbackTr: "Yaşam tarzına uygun, mantıklı öneri." },
        { en: "Maybe a big suitcase, very expensive.", tr: "Belki çok pahalı büyük bir valiz.", feedbackTr: "Fiyatı öne çıkarma; ihtiyaca odaklan." },
      ] },
      { speaker: "client", en: "The card holder is lovely. Can you wrap it?", tr: "Kartlık çok güzel. Paketleyebilir misiniz?", replies: [
        { en: "Of course. Would you like to add a handwritten birthday note?", tr: "Tabii. El yazısıyla bir doğum günü notu eklemek ister misiniz?", best: true, feedbackTr: "Kişisel dokunuş deneyimi yükseltir." },
      ] },
    ],
  },

  {
    slug: "waitlist-iconic",
    title: "The Item Is Out of Stock",
    titleTr: "Ürün Stokta Yok",
    emoji: "⏳",
    kind: "client",
    descriptionTr: "Müşteri çok istenen bir modeli istiyor ama stokta yok. Onu kaybetme.",
    difficulty: 3,
    steps: [
      { speaker: "client", en: "I really want the black Pochette. Do you have it?", tr: "Siyah Pochette'i gerçekten istiyorum. Var mı?", replies: [
        { en: "It's a beautiful choice. Let me check our stock for you right now.", tr: "Çok güzel bir seçim. Hemen sizin için stoğumuzu kontrol edeyim.", best: true, feedbackTr: "Önce umut ver, sonra kontrol et." },
        { en: "No, we never have it.", tr: "Hayır, hiç olmuyor.", feedbackTr: "Olumsuz ve kapatıcı; çözüm sun." },
      ] },
      { speaker: "client", en: "Oh no… is it really not available?", tr: "Ah hayır… gerçekten yok mu?", replies: [
        { en: "Not in store today, but I can add you to the waiting list or find it in another boutique.", tr: "Bugün mağazada yok, ama sizi bekleme listesine ekleyebilir ya da başka bir butikte bulabilirim.", best: true, feedbackTr: "Somut iki çözüm — müşteriyi tutarsın." },
        { en: "You can try online.", tr: "İnternetten deneyebilirsiniz.", feedbackTr: "Müşteriyi başka yere gönderme; hizmeti sen ver." },
      ] },
      { speaker: "client", en: "Please add me to the list. How long will it take?", tr: "Lütfen beni listeye ekleyin. Ne kadar sürer?", replies: [
        { en: "Usually one to two weeks. I'll call you the moment it arrives.", tr: "Genelde bir-iki hafta. Gelir gelmez sizi arayacağım.", best: true, feedbackTr: "Net beklenti + takip sözü." },
      ] },
    ],
  },

  {
    slug: "cross-sell-slg",
    title: "Suggesting a Second Piece",
    titleTr: "İkinci Bir Parça Önermek",
    emoji: "✨",
    kind: "client",
    descriptionTr: "Müşteri bir çanta aldı. Zarifçe tamamlayıcı bir ürün öner (baskıcı olmadan).",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "I'll take this bag. I'm so happy with it!", tr: "Bu çantayı alıyorum. Çok mutluyum!", replies: [
        { en: "It suits you beautifully. Many clients pair it with a matching card holder — would you like to see one?", tr: "Size çok yakıştı. Birçok müşteri uyumlu bir kartlıkla tamamlıyor — bakmak ister misiniz?", best: true, feedbackTr: "Yumuşak, doğal çapraz satış." },
        { en: "Do you also want a wallet, a belt, a scarf, and shoes?", tr: "Cüzdan, kemer, eşarp ve ayakkabı da ister misiniz?", feedbackTr: "Çok fazla; baskıcı hissettirir." },
      ] },
      { speaker: "client", en: "Hmm, maybe. But I don't want to spend too much.", tr: "Hmm, belki. Ama çok harcamak istemiyorum.", replies: [
        { en: "Of course. The card holder is a small piece you'll use every day — but only if you love it.", tr: "Tabii. Kartlık her gün kullanacağınız küçük bir parça — ama yalnızca beğenirseniz.", best: true, feedbackTr: "Değer + baskısız, müşteri merkezli." },
        { en: "It's cheap, just take it.", tr: "Ucuz, hadi alın.", feedbackTr: "'Ucuz' kelimesi luxury'de kullanılmaz." },
      ] },
      { speaker: "client", en: "You're right, I'll take it too.", tr: "Haklısınız, onu da alıyorum.", replies: [
        { en: "Lovely! I'll prepare both for you and gift-wrap them nicely.", tr: "Harika! İkisini de hazırlayıp güzelce paketleyeyim.", best: true, feedbackTr: "Pozitif kapanış + hizmet." },
      ] },
    ],
  },

  {
    slug: "tourist-taxfree",
    title: "A Tourist Asks About Tax-Free",
    titleTr: "Turist Tax-Free Soruyor",
    emoji: "🌍",
    kind: "client",
    descriptionTr: "Yabancı bir turist vergi iadesi (tax-free) hakkında bilgi istiyor.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "I'm a tourist. Can I get a tax refund?", tr: "Turistim. Vergi iadesi alabilir miyim?", replies: [
        { en: "Yes, you can. May I see your passport to prepare the tax-free form?", tr: "Evet, alabilirsiniz. Tax-free formunu hazırlamak için pasaportunuzu görebilir miyim?", best: true, feedbackTr: "Net evet + bir sonraki adım." },
        { en: "I don't know, ask someone else.", tr: "Bilmiyorum, başkasına sorun.", feedbackTr: "Temel bir prosedürü bilmelisin." },
      ] },
      { speaker: "client", en: "Here it is. How do I get the money back?", tr: "Buyurun. Parayı nasıl geri alırım?", replies: [
        { en: "At the airport, show this form and your purchase before you check in your bags.", tr: "Havalimanında, bagajınızı vermeden önce bu formu ve ürünü gösterin.", best: true, feedbackTr: "Adım adım, anlaşılır bilgi." },
        { en: "It comes automatically.", tr: "Otomatik gelir.", feedbackTr: "Yanlış bilgi verme; süreci doğru anlat." },
      ] },
      { speaker: "client", en: "Thank you, that's very clear.", tr: "Teşekkürler, çok net.", replies: [
        { en: "You're welcome. Please keep the form safe and enjoy your stay in İstanbul!", tr: "Rica ederim. Formu güvenli tutun ve İstanbul'da keyifli vakit geçirin!", best: true, feedbackTr: "Sıcak, misafirperver kapanış." },
      ] },
    ],
  },

  {
    slug: "authenticity-care",
    title: "Authenticity & Care",
    titleTr: "Orijinallik ve Bakım",
    emoji: "🧴",
    kind: "client",
    descriptionTr: "Müşteri ürünün orijinalliğinden ve nasıl bakım yapacağından emin olmak istiyor.",
    difficulty: 3,
    steps: [
      { speaker: "client", en: "How do I know this is 100% authentic?", tr: "Bunun %100 orijinal olduğunu nasıl bilebilirim?", replies: [
        { en: "Every piece comes with an invoice and is sold only in our boutiques and official website.", tr: "Her parça faturayla gelir ve yalnızca butiklerimizde ve resmî sitemizde satılır.", best: true, feedbackTr: "Güven veren, doğru bilgi." },
        { en: "Trust me, it's real.", tr: "Bana güvenin, gerçek.", feedbackTr: "Somut kanıt sun, sadece 'güvenin' deme." },
      ] },
      { speaker: "client", en: "Good. And how should I clean the leather?", tr: "Güzel. Peki deriyi nasıl temizlemeliyim?", replies: [
        { en: "Use a soft, dry cloth. Avoid water and direct sun, and store it in the dust bag.", tr: "Yumuşak, kuru bir bez kullanın. Su ve doğrudan güneşten kaçının, toz torbasında saklayın.", best: true, feedbackTr: "Net ve profesyonel bakım tavsiyesi." },
        { en: "Just wash it with soap and water.", tr: "Sabun ve suyla yıkayın.", feedbackTr: "Yanlış! Deri suyla yıkanmaz." },
      ] },
      { speaker: "client", en: "What if it gets damaged one day?", tr: "Ya bir gün hasar görürse?", replies: [
        { en: "Bring it to us — we offer a repair service to keep your piece beautiful for years.", tr: "Bize getirin — parçanızı yıllarca güzel tutmak için tamir hizmeti sunuyoruz.", best: true, feedbackTr: "Satış sonrası güven; uzun ömür vurgusu." },
      ] },
    ],
  },

  {
    slug: "styling-advice",
    title: "Styling Advice",
    titleTr: "Kombin Tavsiyesi",
    emoji: "🧣",
    kind: "client",
    descriptionTr: "Müşteri seçtiği parçayı nasıl kombinleyeceğini soruyor. Güvenle tavsiye ver.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "I love this scarf, but how can I wear it?", tr: "Bu eşarbı çok sevdim ama nasıl takarım?", replies: [
        { en: "It's very versatile — around the neck, on a bag, or even in your hair.", tr: "Çok yönlü — boyna, çantaya, hatta saça bile takabilirsiniz.", best: true, feedbackTr: "Birden çok kullanım fikri verdin." },
        { en: "However you want.", tr: "Nasıl isterseniz.", feedbackTr: "Müşteri tavsiye istiyor; somut fikir ver." },
      ] },
      { speaker: "client", en: "I usually wear simple, neutral colors.", tr: "Genelde sade, nötr renkler giyiyorum.", replies: [
        { en: "Then this scarf is perfect — it adds a soft touch of color without being too much.", tr: "O zaman bu eşarp mükemmel — fazla olmadan yumuşak bir renk dokunuşu katar.", best: true, feedbackTr: "Tarzına uygun, kişisel öneri." },
        { en: "You should change your style.", tr: "Tarzınızı değiştirmelisiniz.", feedbackTr: "Müşterinin tarzını eleştirme." },
      ] },
      { speaker: "client", en: "You have a great eye. I'll take it.", tr: "Çok iyi bir gözünüz var. Alıyorum.", replies: [
        { en: "Thank you! May I show you how to tie it before you go?", tr: "Teşekkürler! Gitmeden bağlamayı göstereyim mi?", best: true, feedbackTr: "Ekstra hizmet = unutulmaz deneyim." },
      ] },
    ],
  },

  {
    slug: "appointment-phone",
    title: "Booking an Appointment (Phone)",
    titleTr: "Telefonla Randevu Almak",
    emoji: "📞",
    kind: "client",
    descriptionTr: "Telefon çalıyor. Bir müşteri özel bir alışveriş randevusu almak istiyor.",
    difficulty: 2,
    steps: [
      { speaker: "narrator", en: "The boutique phone rings. You answer.", tr: "Butik telefonu çalıyor. Açıyorsun." },
      { speaker: "client", en: "Hello, I'd like to book a private appointment.", tr: "Merhaba, özel bir randevu almak istiyorum.", replies: [
        { en: "Good afternoon, thank you for calling Louis Vuitton. I'd be happy to help. May I have your name?", tr: "İyi günler, Louis Vuitton'u aradığınız için teşekkürler. Memnuniyetle yardımcı olurum. Adınızı alabilir miyim?", best: true, feedbackTr: "Profesyonel telefon açılışı + isim." },
        { en: "Yeah, when?", tr: "Tamam, ne zaman?", feedbackTr: "Çok gündelik; telefonda zarif ol." },
      ] },
      { speaker: "client", en: "It's Mr. Demir. Is Saturday at 3 possible?", tr: "Ben Bay Demir. Cumartesi saat 3 mümkün mü?", replies: [
        { en: "Let me check… yes, Saturday at 3 p.m. is available. May I ask what you're looking for?", tr: "Kontrol edeyim… evet, Cumartesi 15:00 müsait. Ne aradığınızı sorabilir miyim?", best: true, feedbackTr: "Onayla + hazırlık için ihtiyacı öğren." },
        { en: "We are full, sorry.", tr: "Doluyuz, üzgünüm.", feedbackTr: "Önce kontrol et; kolayca reddetme." },
      ] },
      { speaker: "client", en: "An anniversary gift for my wife.", tr: "Eşime yıldönümü hediyesi.", replies: [
        { en: "How thoughtful. I'll prepare a lovely selection for you. See you Saturday, Mr. Demir!", tr: "Ne kadar düşünceli. Sizin için güzel bir seçki hazırlayacağım. Cumartesi görüşürüz, Bay Demir!", best: true, feedbackTr: "Kişisel + hazırlıklı; randevuyu sahiplendin." },
      ] },
    ],
  },

  {
    slug: "manager-feedback",
    title: "Performance Feedback",
    titleTr: "Performans Geri Bildirimi",
    emoji: "📈",
    kind: "manager",
    descriptionTr: "Yöneticin sana yapıcı geri bildirim veriyor. Profesyonelce karşıla.",
    difficulty: 3,
    steps: [
      { speaker: "manager", en: "Hülya, your sales are strong, but you forget to offer the client card.", tr: "Hülya, satışların güçlü ama müşteri kartı önermeyi unutuyorsun.", replies: [
        { en: "Thank you for the feedback. You're right — I'll make it part of every sale.", tr: "Geri bildirim için teşekkürler. Haklısınız — bunu her satışın parçası yapacağım.", best: true, feedbackTr: "Açık fikirli + aksiyon planı." },
        { en: "That's not my job.", tr: "Bu benim işim değil.", feedbackTr: "Savunmaya geçme; geri bildirimi kabul et." },
      ] },
      { speaker: "manager", en: "Great attitude. Is there anything you need from me?", tr: "Harika tavır. Benden ihtiyacın olan bir şey var mı?", replies: [
        { en: "Could we do a short role-play together? I'd like to practice the wording.", tr: "Birlikte kısa bir rol-yapma yapabilir miyiz? İfadeleri pratik etmek isterim.", best: true, feedbackTr: "İnisiyatif + gelişim isteği." },
        { en: "No, I'm fine.", tr: "Hayır, iyiyim.", feedbackTr: "Destek isteme fırsatını kullan." },
      ] },
      { speaker: "manager", en: "Of course. Let's do it after lunch.", tr: "Tabii. Öğleden sonra yapalım.", replies: [
        { en: "Perfect, thank you. I really appreciate your support.", tr: "Mükemmel, teşekkürler. Desteğinizi gerçekten takdir ediyorum.", best: true, feedbackTr: "Minnettarlık güçlü bir profesyonel kapanıştır." },
      ] },
    ],
  },

  {
    slug: "manager-cover-shift",
    title: "Covering a Shift",
    titleTr: "Vardiya Devralmak",
    emoji: "🕘",
    kind: "manager",
    descriptionTr: "Yöneticin bir arkadaşın hastalandığı için yardımına ihtiyaç duyuyor.",
    difficulty: 1,
    steps: [
      { speaker: "manager", en: "Hülya, Ayşe is sick today. Could you stay two more hours?", tr: "Hülya, Ayşe bugün hasta. İki saat daha kalabilir misin?", replies: [
        { en: "Sure, I can help. Let me just inform my family that I'll be late.", tr: "Tabii, yardım edebilirim. Geç kalacağımı aileme haber vereyim.", best: true, feedbackTr: "İş birlikçi + net iletişim." },
        { en: "No way.", tr: "Asla.", feedbackTr: "Kaba; kibarca ifade et veya koşul belirt." },
      ] },
      { speaker: "manager", en: "Thank you so much. The afternoon can get busy.", tr: "Çok teşekkürler. Öğleden sonra yoğun olabilir.", replies: [
        { en: "No problem. Should I focus on the floor or the fitting area?", tr: "Sorun değil. Satış alanına mı yoksa deneme alanına mı odaklanayım?", best: true, feedbackTr: "Proaktif; nasıl yardımcı olacağını sor." },
        { en: "Okay.", tr: "Tamam.", feedbackTr: "Biraz daha inisiyatif göster." },
      ] },
      { speaker: "manager", en: "Cover the floor, please. You're a great team player.", tr: "Satış alanını üstlen lütfen. Harika bir takım oyuncususun.", replies: [
        { en: "Thank you! I'm happy to help the team.", tr: "Teşekkürler! Takıma yardım etmekten mutluyum.", best: true, feedbackTr: "Pozitif takım ruhu." },
      ] },
    ],
  },

  {
    slug: "present-bag",
    title: "Presenting the Bag & the Story",
    titleTr: "Çantayı ve Hikâyesini Sunmak",
    emoji: "✨",
    kind: "client",
    descriptionTr: "Müşteriye seçtiğin çantayı zarif bir şekilde, hikâyesiyle birlikte sun.",
    difficulty: 2,
    steps: [
      { speaker: "narrator", en: "You bring the bag to the presentation table.", tr: "Çantayı sunum masasına getiriyorsun." },
      { speaker: "client", en: "It looks beautiful. Tell me about it.", tr: "Çok güzel görünüyor. Bana anlatın.", replies: [
        { en: "This is the Speedy, one of our most iconic designs since 1930.", tr: "Bu Speedy, 1930'dan beri en ikonik tasarımlarımızdan biri.", best: true, feedbackTr: "Harika — ürünü hikâyesiyle tanıttın." },
        { en: "It's just a bag.", tr: "Sadece bir çanta.", feedbackTr: "Değeri ve hikâyeyi anlat; bu bir Maison parçası." },
        { en: "I'm not sure, let me check.", tr: "Emin değilim, bakayım.", feedbackTr: "Ürünü iyi bilmelisin; özgüvenle sun." },
      ] },
      { speaker: "client", en: "Why is it special?", tr: "Neden özel?", replies: [
        { en: "It's handcrafted with our Monogram canvas, light yet very durable.", tr: "Monogram kanvasımızla el işçiliğiyle üretilir; hem hafif hem çok dayanıklı.", best: true, feedbackTr: "Malzeme + faydayı birlikte anlattın." },
        { en: "Because it is expensive.", tr: "Çünkü pahalı.", feedbackTr: "Fiyat değil, değer ve zanaat anlatılır." },
      ] },
      { speaker: "client", en: "May I hold it?", tr: "Tutabilir miyim?", replies: [
        { en: "Of course. Please feel the leather handles — notice how soft they are.", tr: "Tabii ki. Lütfen deri saplara dokunun — ne kadar yumuşak olduğunu hissedin.", best: true, feedbackTr: "Müşteriyi deneyime kattın — mükemmel." },
        { en: "Be careful, it's fragile.", tr: "Dikkat edin, kırılgan.", feedbackTr: "Müşteriyi davet et, endişelendirme." },
      ] },
    ],
  },

  {
    slug: "farewell-followup",
    title: "Farewell & Follow-up",
    titleTr: "Uğurlama ve Takip",
    emoji: "🌿",
    kind: "client",
    descriptionTr: "Müşteriyi sıcak bir şekilde uğurla ve ilişkiyi sürdürecek bir takip öner.",
    difficulty: 2,
    steps: [
      { speaker: "client", en: "Thank you, I really enjoyed today.", tr: "Teşekkürler, bugünden gerçekten keyif aldım.", replies: [
        { en: "It was a pleasure to help you. I hope you'll love your new piece.", tr: "Size yardımcı olmak bir zevkti. Yeni parçanızı seveceğinizi umuyorum.", best: true, feedbackTr: "Sıcak ve kişisel bir kapanış." },
        { en: "Okay, bye.", tr: "Tamam, görüşürüz.", feedbackTr: "Çok kısa; daha sıcak uğurla." },
      ] },
      { speaker: "client", en: "Will I hear from you again?", tr: "Sizden tekrar haber alır mıyım?", replies: [
        { en: "May I take your details so I can let you know about new arrivals?", tr: "Yeni gelenleri haber verebilmem için bilgilerinizi alabilir miyim?", best: true, feedbackTr: "Clienteling — ilişkiyi sürdürmenin doğru yolu." },
        { en: "No, we don't do that.", tr: "Hayır, biz bunu yapmayız.", feedbackTr: "Takip, luxury hizmetin kalbidir; fırsatı kaçırma." },
      ] },
      { speaker: "client", en: "That would be lovely. Thank you again.", tr: "Çok hoş olur. Tekrar teşekkürler.", replies: [
        { en: "Thank you for visiting. Have a wonderful day — see you soon!", tr: "Ziyaretiniz için teşekkürler. Harika bir gün geçirin — yakında görüşmek üzere!", best: true, feedbackTr: "Zarif ve davetkâr bir veda." },
      ] },
    ],
  },
];

export function getScenario(slug: string): Scenario | undefined {
  return HULYA_SCENARIOS.find((s) => s.slug === slug);
}
