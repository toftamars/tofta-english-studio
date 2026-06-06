import type { Unit } from "../types";

// ============================================================
// HÜLYA — Louis Vuitton Client Advisor · İngilizce Müfredatı (A2)
// İçerik, çoklu-ajan LV araştırmasından (research/ klasörü) damıtılmıştır.
// 10 ünite: satış seremonisi · ürün bilgisi · yönetici iletişimi · LV mirası
// ============================================================

export const HULYA_UNITS: Unit[] = [
  // ---------------------------------------------------------- 1
  {
    id: 1,
    slug: "welcome",
    title: "The Welcome",
    titleTr: "Karşılama",
    emoji: "🤝",
    goalTr: "Müşteriyi sıcak, kişisel ve zarif bir şekilde karşıla.",
    phrasesTitle: "Karşılama cümleleri (Selling Ceremony · Step 1)",
    phrases: [
      { en: "Hello, welcome to Louis Vuitton!", tr: "Merhaba, Louis Vuitton'a hoş geldiniz!" },
      { en: "Good afternoon. How are you today?", tr: "İyi günler. Bugün nasılsınız?" },
      { en: "Please, come in and look around.", tr: "Lütfen, içeri buyurun ve etrafa bakının." },
      { en: "My name is Hülya. I am here to help you.", tr: "Benim adım Hülya. Size yardımcı olmak için buradayım." },
      { en: "Can I offer you some water, coffee, or tea?", tr: "Size su, kahve ya da çay ikram edebilir miyim?" },
      { en: "Take your time, please.", tr: "Lütfen, acele etmeyin." },
    ],
    vocab: [
      {
        id: "welcome",
        title: "Karşılama kelimeleri",
        items: [
          { en: "welcome", tr: "hoş geldiniz", example: "Welcome to our boutique." },
          { en: "client", tr: "müşteri (özel)", example: "Every client is special." },
          { en: "to offer", tr: "ikram etmek / sunmak", example: "Can I offer you a coffee?" },
          { en: "to help", tr: "yardım etmek", example: "I am here to help you." },
          { en: "Take your time", tr: "Acele etmeyin", example: "Take your time, please." },
          { en: "boutique", tr: "butik / mağaza", example: "Welcome to our boutique." },
        ],
      },
    ],
    grammar: {
      title: "Polite offers: Can I / May I / Would you like…?",
      titleTr: "Kibar teklifler",
      explanation:
        "Bir şey ikram ederken 'Can I offer you…?' veya daha resmî 'May I offer you…?' deriz. " +
        "'Would you like…?' (… ister misiniz?) çok naziktir ve luxury serviste sık kullanılır.",
      examples: [
        { en: "Can I offer you some water?", tr: "Size su ikram edebilir miyim?" },
        { en: "May I help you today?", tr: "Bugün size yardımcı olabilir miyim?" },
        { en: "Would you like to sit down?", tr: "Oturmak ister misiniz?" },
      ],
    },
    listening: [
      "Hello, welcome to Louis Vuitton!",
      "Good afternoon. How are you today?",
      "My name is Hülya. I am here to help you.",
      "Can I offer you some water, coffee, or tea?",
    ],
    speaking: [
      "Hello, welcome to Louis Vuitton!",
      "May I offer you some water or coffee?",
      "Take your time, please.",
    ],
    writing: {
      taskTr: "Bir müşteriyi karşıladığın 3 cümlelik kısa bir karşılama yaz.",
      sample: "Good afternoon, welcome to Louis Vuitton! My name is Hülya. Can I offer you some water or coffee?",
    },
    quiz: [
      { q: "Most polite offer:", options: ["Give me your bag.", "Would you like some water?", "Water?"], answer: 1, explainTr: "'Would you like…?' en kibar tekliftir." },
      { q: "'Acele etmeyin' = ?", options: ["Hurry up", "Take your time", "Come back"], answer: 1, explainTr: "Take your time = acele etmeyin." },
      { q: "Welcome a client:", options: ["Welcome to Louis Vuitton!", "Goodbye!", "I am busy."], answer: 0, explainTr: "Karşılarken 'Welcome…' deriz." },
    ],
    scenarioSlug: "welcome-client",
  },

  // ---------------------------------------------------------- 2
  {
    id: 2,
    slug: "discovery",
    title: "Discovery — Understanding the Client",
    titleTr: "Keşif — Müşteriyi Anlamak",
    emoji: "🔎",
    goalTr: "Açık uçlu sorularla müşterinin ne istediğini ve nedenini anla.",
    phrasesTitle: "Keşif soruları (Step 2)",
    phrases: [
      { en: "What are you looking for today?", tr: "Bugün ne arıyorsunuz?" },
      { en: "Is it for you, or is it a gift?", tr: "Kendiniz için mi, yoksa hediye mi?" },
      { en: "What do you like — a bag, a wallet, or shoes?", tr: "Ne seversiniz — çanta, cüzdan ya da ayakkabı?" },
      { en: "What colors do you usually wear?", tr: "Genellikle hangi renkleri giyersiniz?" },
      { en: "Do you prefer something classic or modern?", tr: "Klasik mi yoksa modern bir şey mi tercih edersiniz?" },
      { en: "For what occasion will you use it?", tr: "Bunu hangi durum için kullanacaksınız?" },
    ],
    vocab: [
      {
        id: "discovery",
        title: "Keşif kelimeleri",
        items: [
          { en: "to look for", tr: "aramak", example: "What are you looking for?" },
          { en: "a gift", tr: "hediye", example: "Is it a gift?" },
          { en: "occasion", tr: "özel durum/gün", example: "For what occasion?" },
          { en: "to prefer", tr: "tercih etmek", example: "Do you prefer black or brown?" },
          { en: "classic / modern", tr: "klasik / modern", example: "Classic or modern?" },
          { en: "everyday", tr: "günlük", example: "An everyday bag." },
        ],
      },
    ],
    grammar: {
      title: "Open questions: What / Which / For what…?",
      titleTr: "Açık uçlu sorular",
      explanation:
        "Açık uçlu sorular uzun cevap ister ('yes/no' değil). 'What…?', 'Which…?', 'For what occasion…?' " +
        "Müşteriyi dinlemek için bu sorular çok önemlidir. Genel rutin için Geniş Zaman: 'Do you prefer…?'",
      examples: [
        { en: "What are you looking for?", tr: "Ne arıyorsunuz?" },
        { en: "Which color do you prefer?", tr: "Hangi rengi tercih edersiniz?" },
        { en: "Do you like classic styles?", tr: "Klasik tarzları sever misiniz?" },
      ],
    },
    listening: [
      "What are you looking for today?",
      "Is it for you, or is it a gift?",
      "Do you prefer something classic or modern?",
      "For what occasion will you use it?",
    ],
    speaking: [
      "What are you looking for today?",
      "Is it for you, or is it a gift?",
      "Which color do you prefer?",
    ],
    writing: {
      taskTr: "Müşteriyi tanımak için soracağın 3 açık uçlu soru yaz.",
      sample: "What are you looking for today? Is it for you or a gift? Do you prefer something classic or modern?",
    },
    quiz: [
      { q: "Open (not yes/no) question:", options: ["Do you like it?", "What are you looking for?", "Is it nice?"], answer: 1, explainTr: "'What…?' uzun cevap ister, açık uçludur." },
      { q: "'hediye' = ?", options: ["a gift", "a price", "a guest"], answer: 0, explainTr: "Gift = hediye." },
      { q: "Which color ___ you prefer?", options: ["do", "does", "are"], answer: 0, explainTr: "'you' ile 'do' kullanılır." },
    ],
    scenarioSlug: "discovery-needs",
  },

  // ---------------------------------------------------------- 3
  {
    id: 3,
    slug: "presentation",
    title: "Presenting the Product & the Story",
    titleTr: "Ürünü ve Hikâyeyi Sunmak",
    emoji: "✨",
    goalTr: "Ürünü hikâyesiyle sun; fiyatı değil değeri anlat.",
    phrasesTitle: "Ürün sunumu (Step 3)",
    phrases: [
      { en: "Let me show you this beautiful bag.", tr: "Size bu güzel çantayı göstereyim." },
      { en: "This is one of our most famous designs.", tr: "Bu, en ünlü tasarımlarımızdan biri." },
      { en: "It is made by hand from high-quality leather.", tr: "El yapımıdır ve yüksek kaliteli deriden üretilmiştir." },
      { en: "This Monogram is a symbol of the Maison's history.", tr: "Bu Monogram, Maison'un tarihinin bir simgesidir." },
      { en: "Please, feel free to touch it and try it.", tr: "Lütfen, dokunabilir ve deneyebilirsiniz." },
      { en: "It looks lovely on you.", tr: "Size çok yakıştı." },
    ],
    vocab: [
      {
        id: "present",
        title: "Sunum kelimeleri",
        items: [
          { en: "to show", tr: "göstermek", example: "Let me show you." },
          { en: "design", tr: "tasarım", example: "A famous design." },
          { en: "made by hand", tr: "el yapımı", example: "It is made by hand." },
          { en: "high-quality", tr: "yüksek kaliteli", example: "High-quality leather." },
          { en: "to try", tr: "denemek", example: "Please try it." },
          { en: "It looks lovely on you", tr: "Size çok yakıştı", example: "It looks lovely on you." },
        ],
      },
    ],
    grammar: {
      title: "Adjectives before the noun",
      titleTr: "Sıfatlar isimden önce",
      explanation:
        "İngilizcede sıfat isimden ÖNCE gelir: 'a beautiful bag', 'high-quality leather'. " +
        "Birden çok sıfatta sıra: görüş + boyut + renk + malzeme → 'a beautiful small black leather bag'.",
      examples: [
        { en: "a beautiful classic bag", tr: "güzel, klasik bir çanta" },
        { en: "high-quality Italian leather", tr: "yüksek kaliteli İtalyan derisi" },
        { en: "a small black wallet", tr: "küçük, siyah bir cüzdan" },
      ],
    },
    listening: [
      "Let me show you this beautiful bag.",
      "This is one of our most famous designs.",
      "It is made by hand from high-quality leather.",
      "Please, feel free to touch it.",
    ],
    speaking: [
      "Let me show you this beautiful bag.",
      "It is made by hand from high-quality leather.",
      "It looks lovely on you.",
    ],
    writing: {
      taskTr: "Bir çantayı müşteriye sunan 3 cümle yaz (güzellik, malzeme, his).",
      sample: "Let me show you this beautiful bag. It is made by hand from high-quality leather. It looks lovely on you.",
    },
    quiz: [
      { q: "Correct order:", options: ["a leather black small bag", "a small black leather bag", "a bag small black leather"], answer: 1, explainTr: "boyut + renk + malzeme + isim." },
      { q: "'el yapımı' = ?", options: ["made by hand", "made of plastic", "machine made"], answer: 0, explainTr: "made by hand = el yapımı." },
      { q: "Adjectives come ___ the noun.", options: ["after", "before", "instead of"], answer: 1, explainTr: "Sıfat isimden önce gelir." },
    ],
    scenarioSlug: "present-bag",
  },

  // ---------------------------------------------------------- 4
  {
    id: 4,
    slug: "products",
    title: "Materials & Product Knowledge",
    titleTr: "Malzemeler ve Ürün Bilgisi",
    emoji: "👜",
    goalTr: "Malzemeleri ve ikonik ürünleri İngilizce anlat.",
    phrasesTitle: "Ürün tarif cümleleri",
    phrases: [
      { en: "This bag is made of Monogram coated canvas. It is water-resistant.", tr: "Bu çanta Monogram kaplamalı kanvastan yapılmıştır. Suya dayanıklıdır." },
      { en: "This one is real leather. It is soft and very light.", tr: "Bu gerçek deri. Yumuşak ve çok hafif." },
      { en: "The handles are natural leather. The color gets darker over time.", tr: "Saplar doğal deridendir. Renk zamanla koyulaşır." },
      { en: "Inside, there are three compartments and one pocket.", tr: "İçinde üç bölme ve bir cep var." },
      { en: "The strap is adjustable. You can make it longer or shorter.", tr: "Askı ayarlanabilir. Daha uzun veya kısa yapabilirsiniz." },
      { en: "This is one of our most popular bags. It is a classic.", tr: "Bu en popüler çantalarımızdan biri. Bir klasik." },
    ],
    vocab: [
      {
        id: "materials",
        title: "Malzemeler & desenler",
        items: [
          { en: "canvas", tr: "kanvas", def: "a strong woven cloth", example: "Monogram canvas." },
          { en: "coated canvas", tr: "kaplamalı kanvas (deri değil)", def: "canvas with a thin water-resistant layer", example: "It is coated canvas." },
          { en: "leather", tr: "deri", example: "Real leather." },
          { en: "Monogram", tr: "LV deseni", example: "The Monogram pattern." },
          { en: "Damier", tr: "dama/kareli desen", example: "Damier Ebene." },
          { en: "patina", tr: "zamanla oluşan renk", example: "It gets a honey patina." },
          { en: "water-resistant", tr: "suya dayanıklı", example: "The canvas is water-resistant." },
        ],
      },
      {
        id: "parts",
        title: "Çanta parçaları",
        items: [
          { en: "handle", tr: "sap / kulp", example: "The handle is leather." },
          { en: "strap", tr: "askı / kayış", example: "An adjustable strap." },
          { en: "lining", tr: "iç astar", example: "The lining is soft." },
          { en: "compartment", tr: "bölme", example: "Three compartments." },
          { en: "zip", tr: "fermuar", example: "A zip closure." },
          { en: "dust bag", tr: "toz torbası", example: "It comes with a dust bag." },
        ],
      },
      {
        id: "icons",
        title: "İkonik çantalar",
        items: [
          { en: "Speedy", tr: "klasik günlük çanta", def: "the classic everyday handbag", example: "The Speedy 30." },
          { en: "Neverfull", tr: "geniş tote çanta", def: "a roomy open tote", example: "The Neverfull is very spacious." },
          { en: "Keepall", tr: "seyahat çantası", def: "the travel duffle bag", example: "The Keepall 55." },
          { en: "Capucines", tr: "üst düzey deri çanta", def: "a high-end top-handle bag", example: "The Capucines is premium leather." },
          { en: "OnTheGo", tr: "büyük tote", def: "a large structured tote", example: "The OnTheGo tote." },
        ],
      },
    ],
    grammar: {
      title: "There is / There are",
      titleTr: "Bir şeyin varlığını söylemek",
      explanation:
        "Tekil için 'There is' (There's), çoğul için 'There are' kullanırız. " +
        "Çanta içini anlatmak için harikadır: 'There is one pocket and there are three compartments.'",
      examples: [
        { en: "There is a small pocket inside.", tr: "İçeride küçük bir cep var." },
        { en: "There are two handles.", tr: "İki sap var." },
        { en: "Is there a long strap?", tr: "Uzun bir askı var mı?" },
      ],
    },
    listening: [
      "This bag is made of Monogram coated canvas.",
      "The handles are natural leather. The color gets darker over time.",
      "Inside, there are three compartments and one pocket.",
      "The strap is adjustable.",
    ],
    speaking: [
      "This bag is made of coated canvas. It is water-resistant.",
      "There are three compartments inside.",
      "The strap is adjustable.",
    ],
    writing: {
      taskTr: "Bir çantayı malzeme, iç bölme ve askı yönünden 3 cümleyle anlat.",
      sample: "This bag is made of Monogram coated canvas. Inside, there are two compartments and one pocket. The strap is adjustable.",
    },
    quiz: [
      { q: "Monogram canvas is…", options: ["real leather", "coated canvas (not leather)", "metal"], answer: 1, explainTr: "Monogram, kaplamalı kanvastır; deri değildir." },
      { q: "___ three compartments inside.", options: ["There is", "There are", "It is"], answer: 1, explainTr: "Çoğul için 'There are'." },
      { q: "'suya dayanıklı' = ?", options: ["water-resistant", "waterfall", "watery"], answer: 0, explainTr: "water-resistant = suya dayanıklı." },
    ],
    scenarioSlug: "product-questions",
  },

  // ---------------------------------------------------------- 5
  {
    id: 5,
    slug: "objections",
    title: "Objections & Value",
    titleTr: "İtirazlar ve Değer",
    emoji: "💬",
    goalTr: "İtirazları nazikçe karşıla; fiyatı değil, değeri vurgula.",
    phrasesTitle: "İtirazları karşılama (Step 4)",
    phrases: [
      { en: "I understand. Let me explain a little more.", tr: "Anlıyorum. Biraz daha açıklayayım." },
      { en: "This piece is an investment — it lasts many years.", tr: "Bu parça bir yatırımdır — uzun yıllar dayanır." },
      { en: "Of course, take your time to decide.", tr: "Tabii ki, karar vermek için acele etmeyin." },
      { en: "Would you like to compare it with another model?", tr: "Başka bir modelle karşılaştırmak ister misiniz?" },
      { en: "No problem. Let me show you another option.", tr: "Sorun değil. Size başka bir seçenek göstereyim." },
      { en: "That is a very good question.", tr: "Bu çok güzel bir soru." },
    ],
    vocab: [
      {
        id: "value",
        title: "Değer kelimeleri",
        items: [
          { en: "to understand", tr: "anlamak", example: "I understand." },
          { en: "investment", tr: "yatırım", example: "It is an investment." },
          { en: "to last", tr: "dayanmak/sürmek", example: "It lasts many years." },
          { en: "to compare", tr: "karşılaştırmak", example: "Let's compare them." },
          { en: "option", tr: "seçenek", example: "Another option." },
          { en: "to decide", tr: "karar vermek", example: "Take your time to decide." },
        ],
      },
    ],
    grammar: {
      title: "Will / can for promises & options",
      titleTr: "Söz ve seçenek için will / can",
      explanation:
        "'It will last many years.' (gelecek/söz). 'I can show you another option.' (yapabilme/teklif). " +
        "Bu kalıplar müşteriye güven ve seçenek sunar.",
      examples: [
        { en: "It will last for many years.", tr: "Uzun yıllar dayanacak." },
        { en: "I can show you another color.", tr: "Size başka bir renk gösterebilirim." },
        { en: "We can order it for you.", tr: "Sizin için sipariş edebiliriz." },
      ],
    },
    listening: [
      "I understand. Let me explain a little more.",
      "This piece is an investment — it lasts many years.",
      "Would you like to compare it with another model?",
      "No problem. Let me show you another option.",
    ],
    speaking: [
      "I understand. Let me explain a little more.",
      "This piece is an investment. It lasts many years.",
      "Let me show you another option.",
    ],
    writing: {
      taskTr: "Fiyatı yüksek bulan bir müşteriye değeri anlatan 3 nazik cümle yaz.",
      sample: "I understand. This piece is an investment — it lasts many years. Would you like to compare it with another model?",
    },
    quiz: [
      { q: "Polite reply to an objection:", options: ["You are wrong.", "I understand. Let me explain.", "It is too expensive for you."], answer: 1, explainTr: "Önce anlayış göster, sonra açıkla." },
      { q: "'yatırım' = ?", options: ["investment", "invitation", "instrument"], answer: 0, explainTr: "investment = yatırım." },
      { q: "It ___ last many years.", options: ["will", "is", "does"], answer: 0, explainTr: "Gelecek/söz için 'will'." },
    ],
    scenarioSlug: "handle-objection",
  },

  // ---------------------------------------------------------- 6
  {
    id: 6,
    slug: "closing",
    title: "Closing, Payment & Packaging",
    titleTr: "Satışı Kapatma, Ödeme ve Paketleme",
    emoji: "🛍️",
    goalTr: "Satışı zarifçe tamamla, ödemeyi al ve özenle paketle.",
    phrasesTitle: "Kapanış · Ödeme · Paketleme (Steps 6–8)",
    phrases: [
      { en: "Would you like to take this one?", tr: "Bunu almak ister misiniz?" },
      { en: "Excellent choice!", tr: "Mükemmel bir seçim!" },
      { en: "How would you like to pay — card or cash?", tr: "Nasıl ödemek istersiniz — kart mı, nakit mi?" },
      { en: "May I see your card, please?", tr: "Kartınızı görebilir miyim, lütfen?" },
      { en: "I will pack it carefully for you.", tr: "Sizin için özenle paketleyeceğim." },
      { en: "Would you like it gift-wrapped?", tr: "Hediye paketi yapmamı ister misiniz?" },
    ],
    vocab: [
      {
        id: "pay",
        title: "Ödeme & paketleme",
        items: [
          { en: "to pay", tr: "ödemek", example: "How would you like to pay?" },
          { en: "card / cash", tr: "kart / nakit", example: "Card or cash?" },
          { en: "receipt", tr: "fiş / makbuz", example: "Here is your receipt." },
          { en: "to pack", tr: "paketlemek", example: "I will pack it for you." },
          { en: "gift-wrapped", tr: "hediye paketli", example: "Would you like it gift-wrapped?" },
          { en: "box", tr: "kutu", example: "Here is your box." },
        ],
      },
    ],
    grammar: {
      title: "Future with 'will' for service",
      titleTr: "Hizmet için 'will' (gelecek)",
      explanation:
        "Müşteri için bir şey yapacağınızı söylerken 'I will…' kullanırız: 'I will pack it for you.' " +
        "Bu, anında verilen bir hizmet sözü gibidir ve çok kibardır.",
      examples: [
        { en: "I will pack it for you.", tr: "Sizin için paketleyeceğim." },
        { en: "I will prepare your receipt.", tr: "Fişinizi hazırlayacağım." },
        { en: "I will add a dust bag.", tr: "Bir toz torbası ekleyeceğim." },
      ],
    },
    listening: [
      "Excellent choice!",
      "How would you like to pay — card or cash?",
      "I will pack it carefully for you.",
      "Would you like it gift-wrapped?",
    ],
    speaking: [
      "Excellent choice!",
      "How would you like to pay, card or cash?",
      "I will pack it carefully for you.",
    ],
    writing: {
      taskTr: "Satışı kapatıp ödeme ve paketleme için 3 cümle yaz.",
      sample: "Excellent choice! How would you like to pay — card or cash? I will pack it carefully for you.",
    },
    quiz: [
      { q: "Ask about payment:", options: ["How would you like to pay?", "Give me money.", "Pay now."], answer: 0, explainTr: "Kibar soru kalıbı." },
      { q: "'fiş' = ?", options: ["recipe", "receipt", "receiver"], answer: 1, explainTr: "receipt = fiş/makbuz." },
      { q: "I ___ pack it for you.", options: ["will", "am", "do"], answer: 0, explainTr: "Hizmet sözü: 'I will…'." },
    ],
    scenarioSlug: "close-and-pay",
  },

  // ---------------------------------------------------------- 7
  {
    id: 7,
    slug: "farewell",
    title: "Farewell & Follow-up",
    titleTr: "Uğurlama ve Takip",
    emoji: "🌿",
    goalTr: "Müşteriyi sıcakça uğurla ve ilişkiyi sürdür (clienteling).",
    phrasesTitle: "Uğurlama & takip (Steps 9–10)",
    phrases: [
      { en: "Thank you so much for visiting us.", tr: "Bizi ziyaret ettiğiniz için çok teşekkür ederim." },
      { en: "It was a pleasure to help you.", tr: "Size yardımcı olmak bir zevkti." },
      { en: "Enjoy your new bag!", tr: "Yeni çantanızın keyfini çıkarın!" },
      { en: "May I have your name and phone number?", tr: "Adınızı ve telefon numaranızı alabilir miyim?" },
      { en: "I will call you when new items arrive.", tr: "Yeni ürünler geldiğinde sizi arayacağım." },
      { en: "Please contact me if you need anything.", tr: "Bir şeye ihtiyacınız olursa lütfen bana ulaşın." },
    ],
    vocab: [
      {
        id: "farewell",
        title: "Uğurlama & ilişki",
        items: [
          { en: "pleasure", tr: "zevk / memnuniyet", example: "It was a pleasure." },
          { en: "to enjoy", tr: "keyfini çıkarmak", example: "Enjoy your new bag!" },
          { en: "to visit", tr: "ziyaret etmek", example: "Thank you for visiting." },
          { en: "to contact", tr: "iletişime geçmek", example: "Please contact me." },
          { en: "appointment", tr: "randevu", example: "Would you like an appointment?" },
          { en: "follow-up", tr: "takip", example: "I will follow up next week." },
        ],
      },
    ],
    grammar: {
      title: "Polite requests: May I have…?",
      titleTr: "Kibar ricalar",
      explanation:
        "Müşteri bilgisini isterken 'May I have your name, please?' çok naziktir. " +
        "'Could you give me…?' de kullanılabilir. Cümle sonuna 'please' eklemek kibarlığı artırır.",
      examples: [
        { en: "May I have your phone number, please?", tr: "Telefon numaranızı alabilir miyim, lütfen?" },
        { en: "Could you write your email here?", tr: "E-postanızı buraya yazabilir misiniz?" },
        { en: "May I add you to our client list?", tr: "Sizi müşteri listemize ekleyebilir miyim?" },
      ],
    },
    listening: [
      "Thank you so much for visiting us.",
      "It was a pleasure to help you.",
      "May I have your name and phone number?",
      "I will call you when new items arrive.",
    ],
    speaking: [
      "Thank you so much for visiting us.",
      "Enjoy your new bag!",
      "May I have your name and phone number?",
    ],
    writing: {
      taskTr: "Müşteriyi uğurlayıp iletişim bilgisini istediğin 3 cümle yaz.",
      sample: "Thank you so much for visiting us. It was a pleasure to help you. May I have your name and phone number for future events?",
    },
    quiz: [
      { q: "Polite way to ask for info:", options: ["Give me your number.", "May I have your number, please?", "Number now."], answer: 1, explainTr: "'May I have…, please?' en kibarı." },
      { q: "'zevkti' (memnuniyet) = ?", options: ["It was a pleasure", "It was a problem", "It was a price"], answer: 0, explainTr: "It was a pleasure = bir zevkti." },
      { q: "Say goodbye warmly:", options: ["Go away.", "Enjoy your new bag!", "We are closed."], answer: 1, explainTr: "Sıcak uğurlama." },
    ],
    scenarioSlug: "farewell-followup",
  },

  // ---------------------------------------------------------- 8
  {
    id: 8,
    slug: "complaints",
    title: "Difficult Situations & Complaints",
    titleTr: "Zor Durumlar ve Şikâyetler",
    emoji: "🕊️",
    goalTr: "Sakin kal, empati göster ve sorunu zarifçe çöz.",
    phrasesTitle: "Şikâyet yönetimi",
    phrases: [
      { en: "I am very sorry to hear that.", tr: "Bunu duyduğuma çok üzüldüm." },
      { en: "I understand how you feel.", tr: "Nasıl hissettiğinizi anlıyorum." },
      { en: "Thank you for telling me. Let me help you.", tr: "Söylediğiniz için teşekkürler. Size yardımcı olayım." },
      { en: "We can repair it for you.", tr: "Onu sizin için tamir edebiliriz." },
      { en: "Would you like an exchange or a repair?", tr: "Değişim mi yoksa tamir mi istersiniz?" },
      { en: "Let me ask my manager to help you.", tr: "Size yardımcı olması için yöneticimden rica edeyim." },
    ],
    vocab: [
      {
        id: "complaint",
        title: "Şikâyet kelimeleri",
        items: [
          { en: "I am sorry", tr: "Özür dilerim", example: "I am sorry to hear that." },
          { en: "to repair", tr: "tamir etmek", example: "We can repair it." },
          { en: "exchange", tr: "değişim", example: "An exchange or a repair?" },
          { en: "refund", tr: "para iadesi", example: "We can offer a refund." },
          { en: "inconvenience", tr: "rahatsızlık", example: "Sorry for the inconvenience." },
          { en: "patience", tr: "sabır", example: "Thank you for your patience." },
        ],
      },
    ],
    grammar: {
      title: "Past Simple — what happened",
      titleTr: "Geçmiş Zaman — ne oldu",
      explanation:
        "Şikâyette ne olduğunu anlatmak için Past Simple gerekir. Düzenli fiile -ed: arrive → arrived. " +
        "Düzensiz: buy → bought, break → broke. 'The bag broke.' / 'It arrived late.'",
      examples: [
        { en: "The product arrived late.", tr: "Ürün geç geldi." },
        { en: "The zip broke.", tr: "Fermuar bozuldu." },
        { en: "I bought it last week.", tr: "Onu geçen hafta aldım." },
      ],
    },
    listening: [
      "I am very sorry to hear that.",
      "I understand how you feel.",
      "We can repair it for you.",
      "Thank you for your patience.",
    ],
    speaking: [
      "I am very sorry to hear that.",
      "I understand how you feel.",
      "We can repair it for you.",
    ],
    writing: {
      taskTr: "Bozuk bir ürün getiren müşteriye empati gösterip çözüm sunan 3 cümle yaz.",
      sample: "I am very sorry to hear that. I understand how you feel. We can repair it for you, or would you like an exchange?",
    },
    quiz: [
      { q: "Best first reply to a complaint:", options: ["That is not our problem.", "I am very sorry to hear that.", "You broke it."], answer: 1, explainTr: "Önce empati: 'I am very sorry…'." },
      { q: "Past of 'break':", options: ["breaked", "broke", "breaks"], answer: 1, explainTr: "Düzensiz: break → broke." },
      { q: "'para iadesi' = ?", options: ["refund", "receipt", "repair"], answer: 0, explainTr: "refund = para iadesi." },
    ],
    scenarioSlug: "complaint-client",
  },

  // ---------------------------------------------------------- 9
  {
    id: 9,
    slug: "manager",
    title: "Talking to Your Manager",
    titleTr: "Yöneticinle Konuşmak",
    emoji: "🧑‍💼",
    goalTr: "Yöneticinle brifing, hedefler, stok ve yardım konularında konuş.",
    phrasesTitle: "Yöneticiyle iletişim",
    phrases: [
      { en: "Good morning! What are our targets for today?", tr: "Günaydın! Bugünkü hedeflerimiz neler?" },
      { en: "I made three sales this morning.", tr: "Bu sabah üç satış yaptım." },
      { en: "Can you help me with this client, please?", tr: "Bu müşteriyle bana yardım edebilir misiniz, lütfen?" },
      { en: "Do we have this bag in stock?", tr: "Bu çantadan stokta var mı?" },
      { en: "Can we request a transfer from another store?", tr: "Başka bir mağazadan transfer isteyebilir miyiz?" },
      { en: "I'm not sure I understand. Could you repeat that, please?", tr: "Tam anlamadım. Tekrar eder misiniz, lütfen?" },
    ],
    vocab: [
      {
        id: "manager",
        title: "Yönetim & mağaza kelimeleri",
        items: [
          { en: "target", tr: "hedef", def: "a goal you must reach", example: "Today's target." },
          { en: "KPI", tr: "performans göstergesi", def: "a number that measures performance", example: "My KPIs are good." },
          { en: "conversion rate", tr: "dönüşüm oranı", example: "A good conversion rate." },
          { en: "stock / inventory", tr: "stok / envanter", example: "In stock." },
          { en: "transfer", tr: "(mağazalar arası) transfer", example: "Request a transfer." },
          { en: "briefing", tr: "bilgilendirme toplantısı", example: "The morning briefing." },
          { en: "to escalate", tr: "üst yöneticiye iletmek", example: "Let me escalate this." },
        ],
      },
    ],
    grammar: {
      title: "Present Continuous & reporting now",
      titleTr: "Şimdiki zaman & şu an raporlama",
      explanation:
        "Şu an olanı 'am/is/are + fiil-ing' ile söyleriz: 'I am helping a client.' " +
        "Bugün yapılanı Past Simple ile raporlarız: 'I made three sales.'",
      examples: [
        { en: "I am helping a VIP client now.", tr: "Şu anda bir VIP müşteriye yardım ediyorum." },
        { en: "I made three sales this morning.", tr: "Bu sabah üç satış yaptım." },
        { en: "I reached my target.", tr: "Hedefime ulaştım." },
      ],
    },
    listening: [
      "Good morning! What are our targets for today?",
      "I made three sales this morning.",
      "Do we have this bag in stock?",
      "Could you repeat that, please?",
    ],
    speaking: [
      "Good morning! What are our targets for today?",
      "Can you help me with this client, please?",
      "Do we have this bag in stock?",
    ],
    writing: {
      taskTr: "Sabah brifinginde yöneticine söyleyeceğin/soracağın 3 cümle yaz.",
      sample: "Good morning! What are our targets for today? I reached my target yesterday. Do we have the Neverfull in stock?",
    },
    quiz: [
      { q: "Report today's result:", options: ["I make sale.", "I made three sales this morning.", "I making sales."], answer: 1, explainTr: "Bugün biten iş: Past Simple 'made'." },
      { q: "Ask politely to repeat:", options: ["Repeat!", "Could you repeat that, please?", "What?"], answer: 1, explainTr: "Kibar rica kalıbı." },
      { q: "'stok' = ?", options: ["stack", "stock", "sock"], answer: 1, explainTr: "stock = stok." },
    ],
    scenarioSlug: "manager-briefing",
  },

  // ---------------------------------------------------------- 10
  {
    id: 10,
    slug: "heritage",
    title: "The Maison — History & Heritage",
    titleTr: "Maison — Tarih ve Miras",
    emoji: "🏛️",
    goalTr: "Markanın hikâyesini basit İngilizceyle anlat (storytelling).",
    phrasesTitle: "Marka hikâyesi (A2)",
    phrases: [
      { en: "Louis Vuitton started in Paris in 1854.", tr: "Louis Vuitton 1854'te Paris'te başladı." },
      { en: "The founder made travel trunks by hand.", tr: "Kurucu, seyahat sandıklarını elle yapıyordu." },
      { en: "In 1858 he made the first flat-top trunk.", tr: "1858'de ilk düz üstlü sandığı yaptı." },
      { en: "His son Georges made the Monogram canvas in 1896.", tr: "Oğlu Georges, Monogram kanvası 1896'da yaptı." },
      { en: "We still make trunks by hand near Paris today.", tr: "Bugün hâlâ Paris yakınında sandıkları elle yapıyoruz." },
      { en: "When you buy Louis Vuitton, you buy more than 170 years of history.", tr: "Louis Vuitton aldığınızda, 170 yıldan fazla tarih almış olursunuz." },
    ],
    vocab: [
      {
        id: "heritage",
        title: "Miras kelimeleri",
        items: [
          { en: "Maison", tr: "ev / köklü marka", def: "a luxury house with long history", example: "Our Maison since 1854." },
          { en: "heritage", tr: "miras", example: "A rich heritage." },
          { en: "founder", tr: "kurucu", example: "The founder, Louis Vuitton." },
          { en: "trunk", tr: "seyahat sandığı", example: "A travel trunk." },
          { en: "savoir-faire", tr: "ustalık bilgisi", def: "expert skill passed down", example: "Our savoir-faire." },
          { en: "craftsmanship", tr: "el işçiliği", example: "Fine craftsmanship." },
          { en: "Art of Travel", tr: "Seyahat Sanatı", example: "We offer the Art of Travel." },
        ],
      },
    ],
    grammar: {
      title: "Past Simple for history",
      titleTr: "Tarih için Geçmiş Zaman",
      explanation:
        "Tarihte olanları Past Simple ile anlatırız: 'started', 'made', 'opened'. " +
        "Bugün hâlâ devam edeni Present Simple ile: 'We still make trunks by hand.'",
      examples: [
        { en: "Louis Vuitton started in 1854.", tr: "Louis Vuitton 1854'te başladı." },
        { en: "He made the first flat trunk.", tr: "İlk düz sandığı yaptı." },
        { en: "We still make them by hand.", tr: "Hâlâ elle yapıyoruz." },
      ],
    },
    listening: [
      "Louis Vuitton started in Paris in 1854.",
      "The founder made travel trunks by hand.",
      "His son Georges made the Monogram canvas in 1896.",
      "When you buy Louis Vuitton, you buy history.",
    ],
    speaking: [
      "Louis Vuitton started in Paris in 1854.",
      "We still make trunks by hand near Paris today.",
      "When you buy Louis Vuitton, you buy more than 170 years of history.",
    ],
    writing: {
      taskTr: "Markanın hikâyesini müşteriye anlatan 3 basit cümle yaz.",
      sample: "Louis Vuitton started in Paris in 1854. The founder made travel trunks by hand. Today, we still make them with the same savoir-faire.",
    },
    quiz: [
      { q: "Louis Vuitton started in…", options: ["1954", "1854", "1754"], answer: 1, explainTr: "1854, Paris." },
      { q: "Past of 'make':", options: ["maked", "made", "making"], answer: 1, explainTr: "Düzensiz: make → made." },
      { q: "'usta işçiliği bilgisi' (FR) = ?", options: ["savoir-faire", "bonjour", "atelier"], answer: 0, explainTr: "savoir-faire = ustalık bilgisi." },
    ],
    scenarioSlug: "brand-story",
  },
];
