import type { Scenario } from "../types";

/** İstinye Park — Work mod senaryoları */
export const ISTINYE_SCENARIOS: Scenario[] = [
  {
    slug: "istinye-tourist-family",
    title: "Tourist Family at İstinye",
    titleTr: "İstinye'de Turist Aile",
    emoji: "🌍",
    kind: "client",
    mode: "work",
    descriptionTr: "Cumartesi öğleden sonra yoğun saatte Arap turist aile — tax-free ve hediye.",
    difficulty: 2,
    steps: [
      { speaker: "narrator", en: "Saturday 3 p.m. at Louis Vuitton İstinye Park. A family enters with shopping bags.", tr: "Cumartesi 15:00, LV İstinye Park. Alışveriş çantalı bir aile giriyor." },
      { speaker: "client", en: "Hello, we are looking for a gift for our daughter. Something special.", tr: "Merhaba, kızımız için özel bir hediye arıyoruz.", replies: [
        { en: "Welcome! I'd be delighted to help. Is it for a special occasion?", tr: "Hoş geldiniz! Yardım etmekten memnuniyet duyarım. Özel bir gün mü?", best: true, feedbackTr: "Sıcak karşılama + açık uçlu soru." },
        { en: "Everything is expensive here.", tr: "Burada her şey pahalı.", feedbackTr: "Olumsuz başlangıç; luxury'de asla." },
      ] },
      { speaker: "client", en: "Her birthday. Can we get tax-free?", tr: "Doğum günü. Tax-free alabilir miyiz?", replies: [
        { en: "Of course. If you have a passport, we can arrange tax-free at checkout.", tr: "Tabii. Pasaportunuz varsa kasada tax-free ayarlayabiliriz.", best: true, feedbackTr: "Net, yardımcı bilgi." },
        { en: "I don't know about tax.", tr: "Tax bilmiyorum.", feedbackTr: "Mağaza prosedürünü bilmelisin." },
      ] },
      { speaker: "client", en: "Perfect. We'll take the Neverfull MM.", tr: "Mükemmel. Neverfull MM alacağız.", replies: [
        { en: "Excellent choice. I'll prepare everything and your tax-free documents.", tr: "Harika seçim. Her şeyi ve tax-free evraklarınızı hazırlayacağım.", best: true, feedbackTr: "Onay + hizmet vaadi." },
      ] },
    ],
  },
  {
    slug: "istinye-vip-regular",
    title: "Returning VIP Client",
    titleTr: "Dönen VIP Müşteri",
    emoji: "⭐",
    kind: "client",
    mode: "work",
    minCefr: "B1",
    descriptionTr: "Düzenli alışveriş yapan VIP müşteri — kişisel tanıma ve yeni koleksiyon.",
    difficulty: 3,
    steps: [
      { speaker: "client", en: "Hülya! Good to see you again.", tr: "Hülya! Seni tekrar görmek güzel.", replies: [
        { en: "Welcome back, Mrs. Demir! It's always a pleasure. How have you been?", tr: "Tekrar hoş geldiniz Mrs. Demir! Her zaman bir zevk. Nasılsınız?", best: true, feedbackTr: "İsimle hitap + samimi ama profesyonel." },
        { en: "Hello. What do you need?", tr: "Merhaba. Ne istiyorsunuz?", feedbackTr: "VIP'ye soğuk; kişisel tanıma şart." },
      ] },
      { speaker: "client", en: "I heard about the new Capucines collection.", tr: "Yeni Capucines koleksiyonunu duydum.", replies: [
        { en: "Yes! We received pieces just yesterday. May I show you the burgundy?", tr: "Evet! Dün parçalar geldi. Bordo rengi gösterebilir miyim?", best: true, feedbackTr: "Güncel bilgi + proaktif öneri." },
        { en: "We don't have that.", tr: "O yok.", feedbackTr: "Önce kontrol et; olumsuz başlama." },
      ] },
      { speaker: "client", en: "I'd like a private appointment next week.", tr: "Gelecek hafta özel randevu istiyorum.", replies: [
        { en: "I'll personally arrange it. Would Tuesday at 11 suit you?", tr: "Şahsen ayarlayacağım. Salı 11 uygun olur mu?", best: true, feedbackTr: "Clienteling + net teklif." },
      ] },
    ],
  },
  {
    slug: "istinye-mall-busy",
    title: "Busy Saturday Rush",
    titleTr: "Yoğun Cumartesi",
    emoji: "🏃",
    kind: "client",
    mode: "work",
    descriptionTr: "Aynı anda iki müşteri — öncelik ve zarif yönetim.",
    difficulty: 2,
    steps: [
      { speaker: "narrator", en: "Two clients need help at the same time.", tr: "İki müşteri aynı anda yardım istiyor." },
      { speaker: "client", en: "I've been waiting — is anyone going to help me?", tr: "Bekliyorum — biri yardım edecek mi?", replies: [
        { en: "I sincerely apologise for the wait. I'm Hülya and I'm here for you now.", tr: "Beklettiğimiz için özür dilerim. Ben Hülya, şimdi sizinle ilgileniyorum.", best: true, feedbackTr: "Empati + hemen sahiplenme." },
        { en: "Wait your turn.", tr: "Sıranı bekle.", feedbackTr: "Asla; luxury'de her müşteri değerlidir." },
      ] },
      { speaker: "client", en: "I just need the price of this wallet.", tr: "Sadece bu cüzdanın fiyatını istiyorum.", replies: [
        { en: "Of course. It's €590. Would you like to see it in other colours?", tr: "Tabii. 590 €. Başka renklerde görmek ister misiniz?", best: true, feedbackTr: "Hızlı cevap + upsell fırsatı." },
      ] },
    ],
  },
];
