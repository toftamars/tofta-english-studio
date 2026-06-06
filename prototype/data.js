/*
 * Tofta English Studio — Müfredat İçeriği
 * Seviye: A2 (Temel)
 * İki profil: Alper (müzik/perakende yöneticiliği) & Hülya (luxury retail)
 *
 * Her ünite günde 15-20 dakikalık çalışma için tasarlandı.
 * Bölümler: Kelime (Vocabulary) · Dilbilgisi (Grammar) · Dinleme (Listening)
 *           Konuşma (Speaking) · Yazma (Writing) · Quiz
 */

const PROFILES = {
  alper: {
    name: "Alper",
    full: "Alper Tofta",
    role: "Mağaza Müdürü — Zuhal Müzik, Akasya AVM",
    context: "müzik mağazası ve perakende yöneticiliği",
    accent: "#9c5a3c",
  },
  hulya: {
    name: "Hülya",
    full: "Hülya Tofta",
    role: "Luxury Retail — Louis Vuitton, İstinye Park",
    context: "luxury moda ve müşteri ilişkileri",
    accent: "#7a6a48",
  },
};

const CURRICULUM = [
  /* ============================== ÜNİTE 1 ============================== */
  {
    id: 1,
    title: "Greetings & Introductions",
    titleTr: "Selamlaşma ve Kendini Tanıtma",
    goal: "İş yerinde kendini tanıtmayı ve nazikçe selamlaşmayı öğren.",
    grammar: {
      title: "The verb 'to be' — am / is / are",
      titleTr: "'to be' fiili — am / is / are",
      explanation:
        "İngilizcede kendimizi ve başkalarını tanıtırken 'to be' fiilini kullanırız. " +
        "I → am, He/She/It → is, You/We/They → are. Kısaltmalar günlük konuşmada çok yaygındır.",
      examples: [
        { en: "I am Alper. / I'm Alper.", tr: "Ben Alper'im." },
        { en: "She is my colleague. / She's my colleague.", tr: "O benim iş arkadaşım." },
        { en: "We are a team.", tr: "Biz bir ekibiz." },
        { en: "They are customers.", tr: "Onlar müşteri." },
      ],
    },
    vocab: {
      common: [
        { en: "Hello / Hi", tr: "Merhaba", ex: "Hello, how are you?" },
        { en: "Good morning", tr: "Günaydın", ex: "Good morning, welcome!" },
        { en: "Nice to meet you", tr: "Tanıştığıma memnun oldum", ex: "Nice to meet you, I'm Hülya." },
        { en: "My name is...", tr: "Benim adım...", ex: "My name is Alper." },
        { en: "How are you?", tr: "Nasılsınız?", ex: "How are you today?" },
        { en: "See you later", tr: "Sonra görüşürüz", ex: "Thank you, see you later!" },
      ],
      alper: [
        { en: "store manager", tr: "mağaza müdürü", ex: "I am the store manager." },
        { en: "music shop", tr: "müzik mağazası", ex: "Welcome to our music shop." },
        { en: "colleague", tr: "iş arkadaşı", ex: "This is my colleague, Mert." },
        { en: "How can I help you?", tr: "Size nasıl yardımcı olabilirim?", ex: "Hello, how can I help you?" },
      ],
      hulya: [
        { en: "sales associate", tr: "satış danışmanı", ex: "I am a sales associate." },
        { en: "boutique", tr: "butik / mağaza", ex: "Welcome to our boutique." },
        { en: "client", tr: "müşteri (özel)", ex: "Good afternoon, dear client." },
        { en: "How may I assist you?", tr: "Size nasıl yardımcı olabilirim? (resmi)", ex: "Welcome, how may I assist you today?" },
      ],
    },
    listening: [
      "Hello! Welcome to our store.",
      "Good morning. My name is Hülya. How may I assist you?",
      "Nice to meet you. I'm the store manager.",
      "Have a wonderful day. See you later!",
    ],
    speaking: {
      promptTr: "Aşağıdaki cümleleri sesli tekrar et. Mikrofon ile kendini test edebilirsin.",
      phrases: [
        "Hello, my name is Alper.",
        "Nice to meet you.",
        "How can I help you today?",
      ],
    },
    writing: {
      taskTr: "Bir müşteriyi karşılayan kısa bir selamlama mesajı yaz (2-3 cümle).",
      sample:
        "Hello and welcome! My name is Alper. How can I help you today?",
    },
    quiz: [
      {
        q: "Choose the correct sentence:",
        options: ["I is Alper.", "I am Alper.", "I are Alper."],
        answer: 1,
        explainTr: "'I' ile 'am' kullanılır.",
      },
      {
        q: "'Tanıştığıma memnun oldum' = ?",
        options: ["See you later", "Nice to meet you", "Good night"],
        answer: 1,
        explainTr: "'Nice to meet you' tanışınca söylenir.",
      },
      {
        q: "She ___ my colleague.",
        options: ["am", "are", "is"],
        answer: 2,
        explainTr: "'She' ile 'is' kullanılır.",
      },
    ],
  },

  /* ============================== ÜNİTE 2 ============================== */
  {
    id: 2,
    title: "My Job & Daily Routine",
    titleTr: "İşim ve Günlük Rutinim",
    goal: "İşini ve günlük rutinini basitçe anlatmayı öğren.",
    grammar: {
      title: "Present Simple — daily habits",
      titleTr: "Geniş Zaman — günlük alışkanlıklar",
      explanation:
        "Her gün yaptığımız işleri Present Simple ile anlatırız. He/She/It ile fiile -s ekleriz: " +
        "I work → She works. Olumsuz: don't / doesn't. Soru: Do / Does.",
      examples: [
        { en: "I work in a store.", tr: "Bir mağazada çalışırım." },
        { en: "She opens the boutique at 10 a.m.", tr: "Butiği sabah 10'da açar." },
        { en: "I don't work on Sundays.", tr: "Pazar günleri çalışmam." },
        { en: "Does he start at nine?", tr: "Dokuzda mı başlar?" },
      ],
    },
    vocab: {
      common: [
        { en: "to work", tr: "çalışmak", ex: "I work every day." },
        { en: "to start", tr: "başlamak", ex: "I start at 10 o'clock." },
        { en: "to finish", tr: "bitirmek", ex: "I finish at 7 p.m." },
        { en: "every day", tr: "her gün", ex: "I check emails every day." },
        { en: "schedule", tr: "program / çizelge", ex: "This is my schedule." },
        { en: "break", tr: "mola", ex: "I have a lunch break at noon." },
      ],
      alper: [
        { en: "to manage the team", tr: "ekibi yönetmek", ex: "I manage the team every day." },
        { en: "stock / inventory", tr: "stok / envanter", ex: "I check the stock in the morning." },
        { en: "sales report", tr: "satış raporu", ex: "I prepare the sales report." },
        { en: "shift", tr: "vardiya", ex: "The morning shift starts at 10." },
      ],
      hulya: [
        { en: "to welcome clients", tr: "müşterileri karşılamak", ex: "I welcome clients all day." },
        { en: "showroom", tr: "teşhir alanı", ex: "I prepare the showroom." },
        { en: "appointment", tr: "randevu", ex: "I have an appointment at 2 p.m." },
        { en: "display", tr: "vitrin/teşhir", ex: "I arrange the display every morning." },
      ],
    },
    listening: [
      "I work in a store in Istanbul.",
      "I start at ten in the morning.",
      "She manages the team and checks the stock.",
      "We finish at seven in the evening.",
    ],
    speaking: {
      promptTr: "Kendi günlük rutinini İngilizce anlat. Önce örnekleri tekrar et.",
      phrases: [
        "I work in a music store.",
        "I start at ten and finish at seven.",
        "I manage my team every day.",
      ],
    },
    writing: {
      taskTr: "Günlük rutinini 3 cümleyle yaz: ne zaman başlarsın, ne yaparsın, ne zaman bitirirsin.",
      sample:
        "I start work at 10 a.m. I help customers and manage my team. I finish at 7 p.m.",
    },
    quiz: [
      {
        q: "She ___ the boutique at 10.",
        options: ["open", "opens", "opening"],
        answer: 1,
        explainTr: "She ile fiile -s eklenir: opens.",
      },
      {
        q: "Negative: I ___ work on Sundays.",
        options: ["don't", "doesn't", "not"],
        answer: 0,
        explainTr: "'I' ile 'don't' kullanılır.",
      },
      {
        q: "'mola' = ?",
        options: ["shift", "break", "schedule"],
        answer: 1,
        explainTr: "Break = mola.",
      },
    ],
  },

  /* ============================== ÜNİTE 3 ============================== */
  {
    id: 3,
    title: "Welcoming & Helping Customers",
    titleTr: "Müşteriyi Karşılama ve Yardım Etme",
    goal: "Müşteriyi karşıla, ihtiyacını sor ve yardım teklif et.",
    grammar: {
      title: "Can / Could for polite offers",
      titleTr: "Kibar teklifler için Can / Could",
      explanation:
        "Yardım teklif ederken 'Can I...?' ve daha kibar olan 'Could I...?' kullanırız. " +
        "Müşteriye 'Would you like...?' (ister misiniz?) demek çok naziktir.",
      examples: [
        { en: "Can I help you?", tr: "Yardımcı olabilir miyim?" },
        { en: "Could you wait a moment, please?", tr: "Bir dakika bekler misiniz lütfen?" },
        { en: "Would you like to try it?", tr: "Denemek ister misiniz?" },
      ],
    },
    vocab: {
      common: [
        { en: "to help", tr: "yardım etmek", ex: "Can I help you?" },
        { en: "to look for", tr: "aramak", ex: "What are you looking for?" },
        { en: "to show", tr: "göstermek", ex: "Let me show you." },
        { en: "Of course", tr: "Tabii ki", ex: "Of course, this way please." },
        { en: "Just a moment", tr: "Bir dakika", ex: "Just a moment, please." },
        { en: "to need", tr: "ihtiyaç duymak", ex: "Do you need any help?" },
      ],
      alper: [
        { en: "guitar / piano / drums", tr: "gitar / piyano / davul", ex: "Are you looking for a guitar?" },
        { en: "instrument", tr: "enstrüman", ex: "Which instrument do you play?" },
        { en: "to try (an instrument)", tr: "(enstrüman) denemek", ex: "Would you like to try this guitar?" },
        { en: "beginner", tr: "yeni başlayan", ex: "Is it for a beginner?" },
      ],
      hulya: [
        { en: "handbag", tr: "el çantası", ex: "Are you looking for a handbag?" },
        { en: "collection", tr: "koleksiyon", ex: "This is from our new collection." },
        { en: "to try on", tr: "üzerinde denemek", ex: "Would you like to try it on?" },
        { en: "size", tr: "beden", ex: "What size would you like?" },
      ],
    },
    listening: [
      "Hello, can I help you?",
      "What are you looking for today?",
      "Of course, let me show you our new collection.",
      "Would you like to try it?",
    ],
    speaking: {
      promptTr: "Bir müşteriyle karşılaşıyormuş gibi bu cümleleri söyle.",
      phrases: [
        "Hello, can I help you?",
        "What are you looking for today?",
        "Would you like to try it?",
      ],
    },
    writing: {
      taskTr: "Bir müşteriye yardım teklif eden 3 cümlelik kısa bir diyalog yaz.",
      sample:
        "Hello, can I help you? What are you looking for today? Of course, let me show you.",
    },
    quiz: [
      {
        q: "Most polite: ___ you like to try it?",
        options: ["Do", "Would", "Are"],
        answer: 1,
        explainTr: "'Would you like...?' en kibar tekliftir.",
      },
      {
        q: "'aramak (bir şey)' = ?",
        options: ["to look for", "to look at", "to look"],
        answer: 0,
        explainTr: "look for = aramak.",
      },
      {
        q: "'Tabii ki' = ?",
        options: ["Just a moment", "Of course", "See you"],
        answer: 1,
        explainTr: "Of course = tabii ki.",
      },
    ],
  },

  /* ============================== ÜNİTE 4 ============================== */
  {
    id: 4,
    title: "Numbers, Prices & Payment",
    titleTr: "Sayılar, Fiyatlar ve Ödeme",
    goal: "Fiyat söyle, ödeme al ve para üstü ver.",
    grammar: {
      title: "How much / How many",
      titleTr: "How much / How many",
      explanation:
        "Fiyat ve sayılamayan şeyler için 'How much?' (Ne kadar?), sayılabilen şeyler için " +
        "'How many?' (Kaç tane?) kullanırız.",
      examples: [
        { en: "How much is it?", tr: "Bu ne kadar?" },
        { en: "How much does it cost?", tr: "Ne kadar tutuyor?" },
        { en: "How many do you need?", tr: "Kaç tane lazım?" },
        { en: "It costs 500 lira.", tr: "500 lira tutuyor." },
      ],
    },
    vocab: {
      common: [
        { en: "price", tr: "fiyat", ex: "What is the price?" },
        { en: "to cost", tr: "tutmak / mal olmak", ex: "It costs 200 lira." },
        { en: "cash", tr: "nakit", ex: "Cash or card?" },
        { en: "credit card", tr: "kredi kartı", ex: "You can pay by credit card." },
        { en: "receipt", tr: "fiş / makbuz", ex: "Here is your receipt." },
        { en: "change", tr: "para üstü", ex: "Here is your change." },
      ],
      alper: [
        { en: "discount", tr: "indirim", ex: "We have a discount this week." },
        { en: "installment", tr: "taksit", ex: "You can pay in installments." },
        { en: "warranty", tr: "garanti", ex: "It has a two-year warranty." },
        { en: "total", tr: "toplam", ex: "The total is 3000 lira." },
      ],
      hulya: [
        { en: "tax-free", tr: "vergisiz / tax-free", ex: "Would you like a tax-free form?" },
        { en: "gift wrapping", tr: "hediye paketi", ex: "Would you like gift wrapping?" },
        { en: "invoice", tr: "fatura", ex: "I will prepare your invoice." },
        { en: "exclusive", tr: "özel / sınırlı", ex: "This is an exclusive piece." },
      ],
    },
    listening: [
      "How much is this guitar?",
      "It costs two thousand five hundred lira.",
      "Would you like to pay by cash or credit card?",
      "Here is your receipt and your change.",
    ],
    speaking: {
      promptTr: "Bir satış anını canlandır: fiyat söyle, ödeme sor.",
      phrases: [
        "It costs five hundred lira.",
        "Would you like to pay by cash or card?",
        "Here is your receipt, thank you.",
      ],
    },
    writing: {
      taskTr: "Bir müşteriye fiyatı söyleyip ödeme şeklini soran kısa bir not yaz.",
      sample:
        "The total is 1500 lira. Would you like to pay by cash or credit card? Here is your receipt.",
    },
    quiz: [
      {
        q: "___ is this bag?",
        options: ["How many", "How much", "How long"],
        answer: 1,
        explainTr: "Fiyat için 'How much'.",
      },
      {
        q: "'para üstü' = ?",
        options: ["change", "receipt", "cash"],
        answer: 0,
        explainTr: "Change = para üstü.",
      },
      {
        q: "'It ___ 300 lira.'",
        options: ["cost", "costs", "costing"],
        answer: 1,
        explainTr: "It ile costs.",
      },
    ],
  },

  /* ============================== ÜNİTE 5 ============================== */
  {
    id: 5,
    title: "Describing Products",
    titleTr: "Ürünleri Tanımlama",
    goal: "Ürünleri renk, malzeme ve özellikleriyle anlat.",
    grammar: {
      title: "Adjectives & word order",
      titleTr: "Sıfatlar ve sıralama",
      explanation:
        "İngilizcede sıfat isimden ÖNCE gelir: 'a black bag' (siyah bir çanta). " +
        "Sıralama genelde: görüş + boyut + renk + malzeme. Örn: 'a beautiful small leather bag'.",
      examples: [
        { en: "a black leather bag", tr: "siyah deri bir çanta" },
        { en: "a beautiful classic guitar", tr: "güzel klasik bir gitar" },
        { en: "It is light and easy to use.", tr: "Hafif ve kullanımı kolay." },
      ],
    },
    vocab: {
      common: [
        { en: "color", tr: "renk", ex: "What color would you like?" },
        { en: "material", tr: "malzeme", ex: "What material is it?" },
        { en: "quality", tr: "kalite", ex: "It is high quality." },
        { en: "light / heavy", tr: "hafif / ağır", ex: "It is very light." },
        { en: "new / classic", tr: "yeni / klasik", ex: "This is a classic model." },
        { en: "popular", tr: "popüler", ex: "This model is very popular." },
      ],
      alper: [
        { en: "acoustic / electric", tr: "akustik / elektro", ex: "Is it acoustic or electric?" },
        { en: "sound / tone", tr: "ses / tını", ex: "It has a warm sound." },
        { en: "wood", tr: "ahşap", ex: "The body is made of wood." },
        { en: "strings", tr: "teller", ex: "It has six strings." },
      ],
      hulya: [
        { en: "leather", tr: "deri", ex: "It is genuine leather." },
        { en: "canvas", tr: "kanvas", ex: "This is the classic canvas." },
        { en: "timeless", tr: "zamansız", ex: "It is a timeless design." },
        { en: "elegant", tr: "şık / zarif", ex: "It is very elegant." },
      ],
    },
    listening: [
      "This is a beautiful black leather bag.",
      "It is light and very elegant.",
      "The guitar has a warm sound and a wooden body.",
      "This model is very popular and high quality.",
    ],
    speaking: {
      promptTr: "Mağazandaki bir ürünü 2-3 sıfatla anlat.",
      phrases: [
        "This is a classic black leather bag.",
        "It is light and elegant.",
        "It has a beautiful warm sound.",
      ],
    },
    writing: {
      taskTr: "Bir ürünü tanıtan 3 cümle yaz (renk, malzeme, özellik).",
      sample:
        "This is a beautiful brown leather bag. It is light and elegant. It is a timeless design.",
    },
    quiz: [
      {
        q: "Correct order:",
        options: ["a leather black bag", "a black leather bag", "a bag black leather"],
        answer: 1,
        explainTr: "Renk + malzeme + isim: black leather bag.",
      },
      {
        q: "'malzeme' = ?",
        options: ["color", "material", "quality"],
        answer: 1,
        explainTr: "Material = malzeme.",
      },
      {
        q: "Adjectives come ___ the noun.",
        options: ["after", "before", "instead of"],
        answer: 1,
        explainTr: "Sıfat isimden önce gelir.",
      },
    ],
  },

  /* ============================== ÜNİTE 6 ============================== */
  {
    id: 6,
    title: "Time & Appointments",
    titleTr: "Saat ve Randevular",
    goal: "Saati söyle, randevu ver ve çalışma saatlerini anlat.",
    grammar: {
      title: "Prepositions of time: at / on / in",
      titleTr: "Zaman edatları: at / on / in",
      explanation:
        "Saatte 'at' (at 3 o'clock), günlerde 'on' (on Monday), ay/yıl/parça günde 'in' " +
        "(in May, in the morning) kullanırız.",
      examples: [
        { en: "We open at 10 a.m.", tr: "Sabah 10'da açarız." },
        { en: "I have an appointment on Friday.", tr: "Cuma günü randevum var." },
        { en: "We are busy in the afternoon.", tr: "Öğleden sonra yoğunuz." },
      ],
    },
    vocab: {
      common: [
        { en: "What time...?", tr: "Saat kaçta...?", ex: "What time do you open?" },
        { en: "o'clock", tr: "tam saat", ex: "It is three o'clock." },
        { en: "half past", tr: "buçuk", ex: "It is half past two." },
        { en: "open / closed", tr: "açık / kapalı", ex: "We are open until 10." },
        { en: "today / tomorrow", tr: "bugün / yarın", ex: "See you tomorrow." },
        { en: "weekend", tr: "hafta sonu", ex: "We work at the weekend." },
      ],
      alper: [
        { en: "opening hours", tr: "çalışma saatleri", ex: "Our opening hours are 10 to 22." },
        { en: "delivery time", tr: "teslim süresi", ex: "Delivery time is two days." },
        { en: "to book a lesson", tr: "ders ayarlamak", ex: "You can book a guitar lesson." },
        { en: "available", tr: "müsait", ex: "I am available at 3 p.m." },
      ],
      hulya: [
        { en: "private appointment", tr: "özel randevu", ex: "We offer private appointments." },
        { en: "to schedule", tr: "planlamak", ex: "Let me schedule it for you." },
        { en: "fitting", tr: "deneme/prova", ex: "Your fitting is at 4 p.m." },
        { en: "convenient", tr: "uygun", ex: "Is Friday convenient for you?" },
      ],
    },
    listening: [
      "What time do you open?",
      "We open at ten and close at ten in the evening.",
      "I have an appointment on Friday at half past two.",
      "Is Saturday convenient for you?",
    ],
    speaking: {
      promptTr: "Çalışma saatlerini ve bir randevuyu anlat.",
      phrases: [
        "We open at ten a.m.",
        "I have an appointment on Friday.",
        "Is three o'clock convenient for you?",
      ],
    },
    writing: {
      taskTr: "Çalışma saatlerini söyleyip bir randevu öneren kısa bir mesaj yaz.",
      sample:
        "We are open from 10 a.m. to 10 p.m. Would Friday at 3 o'clock be convenient for you?",
    },
    quiz: [
      {
        q: "We open ___ 10 a.m.",
        options: ["on", "in", "at"],
        answer: 2,
        explainTr: "Saatte 'at' kullanılır.",
      },
      {
        q: "I work ___ Monday.",
        options: ["on", "at", "in"],
        answer: 0,
        explainTr: "Günlerde 'on' kullanılır.",
      },
      {
        q: "'müsait' = ?",
        options: ["convenient", "available", "closed"],
        answer: 1,
        explainTr: "Available = müsait.",
      },
    ],
  },

  /* ============================== ÜNİTE 7 ============================== */
  {
    id: 7,
    title: "Directions in the Store & Mall",
    titleTr: "Mağaza ve AVM'de Yön Tarifi",
    goal: "Müşteriye mağaza içinde ve AVM'de yol tarif et.",
    grammar: {
      title: "Imperatives & there is / there are",
      titleTr: "Emir kipi ve there is / there are",
      explanation:
        "Yön tarif ederken emir kipi kullanırız: 'Go straight', 'Turn left'. " +
        "Bir şeyin varlığını söylerken 'There is' (tekil) / 'There are' (çoğul) kullanırız.",
      examples: [
        { en: "Go straight and turn right.", tr: "Düz git ve sağa dön." },
        { en: "There is a lift on the left.", tr: "Solda bir asansör var." },
        { en: "There are two exits.", tr: "İki çıkış var." },
      ],
    },
    vocab: {
      common: [
        { en: "left / right", tr: "sol / sağ", ex: "Turn left." },
        { en: "straight", tr: "düz", ex: "Go straight." },
        { en: "near / next to", tr: "yakın / yanında", ex: "It is next to the entrance." },
        { en: "floor", tr: "kat", ex: "We are on the second floor." },
        { en: "entrance / exit", tr: "giriş / çıkış", ex: "The exit is over there." },
        { en: "escalator / lift", tr: "yürüyen merdiven / asansör", ex: "Take the escalator." },
      ],
      alper: [
        { en: "section", tr: "reyon / bölüm", ex: "The guitar section is over there." },
        { en: "cash desk", tr: "kasa", ex: "The cash desk is on the right." },
        { en: "fitting room", tr: "deneme odası", ex: "It is near the cash desk." },
        { en: "ground floor", tr: "zemin kat", ex: "We are on the ground floor." },
      ],
      hulya: [
        { en: "boutique entrance", tr: "butik girişi", ex: "The entrance is on your left." },
        { en: "VIP lounge", tr: "VIP salon", ex: "The VIP lounge is upstairs." },
        { en: "upstairs / downstairs", tr: "üst kat / alt kat", ex: "It is upstairs." },
        { en: "main hall", tr: "ana hol", ex: "Go through the main hall." },
      ],
    },
    listening: [
      "Excuse me, where is the lift?",
      "Go straight and turn right. It is near the entrance.",
      "We are on the second floor.",
      "There is an escalator next to the main hall.",
    ],
    speaking: {
      promptTr: "Bir müşteriye basit bir yol tarifi ver.",
      phrases: [
        "Go straight and turn left.",
        "It is next to the entrance.",
        "Take the escalator to the second floor.",
      ],
    },
    writing: {
      taskTr: "Bir müşteriye kasaya nasıl gideceğini anlatan 2-3 cümle yaz.",
      sample:
        "Go straight, then turn right. The cash desk is next to the exit.",
    },
    quiz: [
      {
        q: "___ a lift on the left.",
        options: ["There is", "There are", "It is"],
        answer: 0,
        explainTr: "Tekil için 'There is'.",
      },
      {
        q: "'sağa dön' = ?",
        options: ["turn left", "go straight", "turn right"],
        answer: 2,
        explainTr: "Turn right = sağa dön.",
      },
      {
        q: "'kat' = ?",
        options: ["floor", "exit", "entrance"],
        answer: 0,
        explainTr: "Floor = kat.",
      },
    ],
  },

  /* ============================== ÜNİTE 8 ============================== */
  {
    id: 8,
    title: "Handling Complaints & Apologizing",
    titleTr: "Şikayetleri Çözme ve Özür Dileme",
    goal: "Bir sorunu nazikçe çöz, özür dile ve çözüm öner.",
    grammar: {
      title: "Past Simple — what happened",
      titleTr: "Geçmiş Zaman — ne oldu",
      explanation:
        "Geçmişte olan olayları Past Simple ile anlatırız. Düzenli fiillere -ed ekleriz " +
        "(work → worked). Bazı fiiller düzensizdir (buy → bought, is → was/were).",
      examples: [
        { en: "I am sorry for the problem.", tr: "Sorun için üzgünüm." },
        { en: "The product arrived late.", tr: "Ürün geç geldi." },
        { en: "I bought it yesterday.", tr: "Onu dün aldım." },
        { en: "We will fix it.", tr: "Düzelteceğiz." },
      ],
    },
    vocab: {
      common: [
        { en: "I'm sorry", tr: "Özür dilerim", ex: "I'm sorry for the delay." },
        { en: "problem", tr: "sorun", ex: "What is the problem?" },
        { en: "to fix / solve", tr: "düzeltmek / çözmek", ex: "We will fix it." },
        { en: "to return", tr: "iade etmek", ex: "Can I return this?" },
        { en: "to exchange", tr: "değiştirmek", ex: "You can exchange it." },
        { en: "refund", tr: "para iadesi", ex: "We can offer a refund." },
      ],
      alper: [
        { en: "broken / faulty", tr: "bozuk / kusurlu", ex: "The cable is faulty." },
        { en: "repair", tr: "tamir", ex: "We can repair it for free." },
        { en: "to replace", tr: "yenisiyle değiştirmek", ex: "We will replace it." },
        { en: "under warranty", tr: "garanti kapsamında", ex: "It is under warranty." },
      ],
      hulya: [
        { en: "defect", tr: "kusur", ex: "There is a small defect." },
        { en: "to apologize", tr: "özür dilemek", ex: "I sincerely apologize." },
        { en: "sincerely", tr: "içtenlikle", ex: "I sincerely apologize for this." },
        { en: "to assure", tr: "temin etmek", ex: "I assure you we will help." },
      ],
    },
    listening: [
      "I'm very sorry for the problem.",
      "The product arrived late, but we will fix it.",
      "You can exchange it or get a refund.",
      "I assure you, we will solve this today.",
    ],
    speaking: {
      promptTr: "Bir müşteriye özür dile ve çözüm öner.",
      phrases: [
        "I'm sorry for the problem.",
        "We can exchange it or offer a refund.",
        "I assure you we will fix it today.",
      ],
    },
    writing: {
      taskTr: "Geç gelen bir ürün için özür dileyen ve çözüm sunan kısa bir mesaj yaz.",
      sample:
        "I am very sorry for the delay. We can exchange the product or offer a refund. I assure you we will solve this today.",
    },
    quiz: [
      {
        q: "Past of 'arrive':",
        options: ["arrives", "arrived", "arriving"],
        answer: 1,
        explainTr: "Düzenli fiil: arrive → arrived.",
      },
      {
        q: "'para iadesi' = ?",
        options: ["refund", "receipt", "discount"],
        answer: 0,
        explainTr: "Refund = para iadesi.",
      },
      {
        q: "Past of 'buy':",
        options: ["buyed", "bought", "buys"],
        answer: 1,
        explainTr: "Düzensiz fiil: buy → bought.",
      },
    ],
  },

  /* ============================== ÜNİTE 9 ============================== */
  {
    id: 9,
    title: "On the Phone",
    titleTr: "Telefonda Konuşma",
    goal: "Telefonu yanıtla, mesaj al ve nazikçe konuş.",
    grammar: {
      title: "Present Continuous — right now",
      titleTr: "Şimdiki Zaman — şu anda",
      explanation:
        "Şu anda olan işler için 'am/is/are + fiil-ing' kullanırız. " +
        "Örn: 'She is helping a customer now.' Telefonda çok kullanışlıdır.",
      examples: [
        { en: "She is helping a customer right now.", tr: "Şu anda bir müşteriye yardım ediyor." },
        { en: "I am calling about my order.", tr: "Siparişim hakkında arıyorum." },
        { en: "Can you hold, please?", tr: "Hatta bekler misiniz lütfen?" },
      ],
    },
    vocab: {
      common: [
        { en: "to call", tr: "aramak", ex: "Thank you for calling." },
        { en: "Hold on, please", tr: "Hatta bekleyin lütfen", ex: "Hold on, please." },
        { en: "to take a message", tr: "mesaj almak", ex: "Can I take a message?" },
        { en: "to call back", tr: "geri aramak", ex: "I will call you back." },
        { en: "Speaking", tr: "Benim (telefonda)", ex: "Hello, Alper speaking." },
        { en: "wrong number", tr: "yanlış numara", ex: "Sorry, wrong number." },
      ],
      alper: [
        { en: "order", tr: "sipariş", ex: "I am calling about my order." },
        { en: "in stock", tr: "stokta var", ex: "Yes, it is in stock." },
        { en: "to reserve", tr: "ayırtmak", ex: "I can reserve it for you." },
        { en: "to check", tr: "kontrol etmek", ex: "Let me check for you." },
      ],
      hulya: [
        { en: "to connect", tr: "bağlamak", ex: "I will connect you to the manager." },
        { en: "to confirm", tr: "onaylamak", ex: "I would like to confirm your appointment." },
        { en: "to reach", tr: "ulaşmak", ex: "How can I reach the manager?" },
        { en: "kindly", tr: "nazikçe / rica ile", ex: "Could you kindly hold?" },
      ],
    },
    listening: [
      "Hello, Louis Vuitton, Hülya speaking. How may I help you?",
      "I am calling about my order.",
      "Could you hold on, please? Let me check.",
      "I will call you back this afternoon.",
    ],
    speaking: {
      promptTr: "Telefonu yanıtlıyormuş gibi konuş.",
      phrases: [
        "Hello, Alper speaking. How can I help you?",
        "Could you hold on, please?",
        "I will call you back this afternoon.",
      ],
    },
    writing: {
      taskTr: "Telefonda alınmış kısa bir mesaj notu yaz (kim aradı, ne istedi).",
      sample:
        "Mr. Smith called about his order. He would like to call back at 3 p.m. The product is in stock.",
    },
    quiz: [
      {
        q: "She ___ a customer right now.",
        options: ["help", "is helping", "helps"],
        answer: 1,
        explainTr: "Şu an: is helping.",
      },
      {
        q: "'Hatta bekleyin' = ?",
        options: ["Call back", "Hold on", "Speaking"],
        answer: 1,
        explainTr: "Hold on = hatta bekleyin.",
      },
      {
        q: "'I am ___ about my order.' (şu an arıyorum)",
        options: ["call", "calling", "called"],
        answer: 1,
        explainTr: "am + calling.",
      },
    ],
  },

  /* ============================== ÜNİTE 10 ============================== */
  {
    id: 10,
    title: "Small Talk & Building Rapport",
    titleTr: "Sohbet ve Sıcak İlişki Kurma",
    goal: "Müşteriyle samimi, doğal bir sohbet başlat ve sürdür.",
    grammar: {
      title: "Question forms & 'would'",
      titleTr: "Soru kalıpları ve 'would'",
      explanation:
        "Sohbet açmak için açık uçlu sorular sorarız: 'How was your day?', 'What do you think of...?'. " +
        "Kibar öneriler için 'would': 'Would you like a coffee?'",
      examples: [
        { en: "How is your day going?", tr: "Gününüz nasıl geçiyor?" },
        { en: "Would you like a coffee or some water?", tr: "Kahve mi su mu istersiniz?" },
        { en: "What do you think of this one?", tr: "Bunun hakkında ne düşünüyorsunuz?" },
      ],
    },
    vocab: {
      common: [
        { en: "How is your day?", tr: "Gününüz nasıl?", ex: "How is your day going?" },
        { en: "weather", tr: "hava durumu", ex: "Lovely weather today!" },
        { en: "to enjoy", tr: "keyif almak", ex: "Enjoy your day!" },
        { en: "of course", tr: "tabii ki", ex: "Of course, take your time." },
        { en: "Take your time", tr: "Acele etmeyin", ex: "Please take your time." },
        { en: "Have a nice day", tr: "İyi günler", ex: "Have a nice day!" },
      ],
      alper: [
        { en: "Do you play music?", tr: "Müzikle ilgileniyor musunuz?", ex: "Do you play any instrument?" },
        { en: "favourite", tr: "favori", ex: "What is your favourite band?" },
        { en: "gift", tr: "hediye", ex: "Is it a gift for someone?" },
        { en: "Enjoy playing!", tr: "Çalmanın keyfini çıkarın!", ex: "Enjoy playing your new guitar!" },
      ],
      hulya: [
        { en: "occasion", tr: "özel gün", ex: "Is it for a special occasion?" },
        { en: "to compliment", tr: "iltifat etmek", ex: "That color suits you well." },
        { en: "It suits you", tr: "Size yakışıyor", ex: "This bag suits you perfectly." },
        { en: "delighted", tr: "çok memnun", ex: "I am delighted to help you." },
      ],
    },
    listening: [
      "Good afternoon! How is your day going?",
      "Lovely weather today, isn't it?",
      "Would you like a coffee while you look around?",
      "Take your time, and enjoy your day!",
    ],
    speaking: {
      promptTr: "Bir müşteriyle sıcak bir sohbet başlat.",
      phrases: [
        "How is your day going?",
        "Would you like a coffee while you look around?",
        "Take your time, have a nice day!",
      ],
    },
    writing: {
      taskTr: "Müşteriyi rahatlatan, sıcak 3 cümlelik bir karşılama yaz.",
      sample:
        "Good afternoon! How is your day going? Would you like a coffee while you look around? Please take your time.",
    },
    quiz: [
      {
        q: "Polite offer: ___ you like a coffee?",
        options: ["Do", "Would", "Are"],
        answer: 1,
        explainTr: "Would you like...? en kibar öneridir.",
      },
      {
        q: "'Acele etmeyin' = ?",
        options: ["Take your time", "Hold on", "Of course"],
        answer: 0,
        explainTr: "Take your time = acele etmeyin.",
      },
      {
        q: "'Size yakışıyor' = ?",
        options: ["It suits you", "It costs you", "It helps you"],
        answer: 0,
        explainTr: "It suits you = size yakışıyor.",
      },
    ],
  },
];
