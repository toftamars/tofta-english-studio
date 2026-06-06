import type { RadarData, WordOfDay } from "../types";

// ============================================================
// MAISON RADAR — Seed / Yedek içerik
//  - news: cron (public/radar.json) gelmeden önce gösterilecek
//    yedek "maison bilgi" kartları. Tamamı yasal, halka açık,
//    kalıcı bilgilerdir (kazıma değil).
//  - words: "Günün Kelimesi" havuzu (tarihe göre döner).
// ============================================================

export const RADAR_SEED: RadarData = {
  updatedAt: "2026-01-01T00:00:00.000Z",
  news: [
    {
      title: "The Maison was founded in Paris in 1854",
      source: "Maison Heritage",
      url: "https://eu.louisvuitton.com/eng-e1/la-maison/art-savoir-faire",
      publishedAt: "2026-01-01T00:00:00.000Z",
      summary:
        "Louis Vuitton opened his first store in 1854, inventing flat-top, stackable trunks for modern travel.",
      tag: "Marka",
    },
    {
      title: "The Monogram canvas was created in 1896",
      source: "Maison Heritage",
      url: "https://eu.louisvuitton.com/eng-e1/la-maison/art-savoir-faire",
      publishedAt: "2026-01-01T00:00:00.000Z",
      summary:
        "Georges Vuitton designed the iconic Monogram to honor his father and protect against imitations.",
      tag: "Marka",
    },
    {
      title: "Savoir-faire: trunks are still handcrafted near Paris",
      source: "Maison Heritage",
      url: "https://eu.louisvuitton.com/eng-e1/la-maison/art-savoir-faire",
      publishedAt: "2026-01-01T00:00:00.000Z",
      summary:
        "At Asnières, artisans still build trunks by hand using the same techniques and tools as in the 19th century.",
      tag: "Koleksiyon",
    },
  ],
};

// ------------------------------------------------------------
// Günün Kelimesi havuzu — luxury retail & LV bağlamı
// ------------------------------------------------------------

export const WORDS: WordOfDay[] = [
  { en: "savoir-faire", tr: "ustalık, zanaat bilgisi", note: "Maison'un el işçiliğini anlatırken kullanılır." },
  { en: "heritage", tr: "miras", note: "Markanın 1854'ten gelen tarihini ifade eder." },
  { en: "craftsmanship", tr: "el işçiliği", note: "Ürünün nasıl özenle yapıldığını vurgular." },
  { en: "timeless", tr: "zamansız", note: "Klasik, modası geçmeyen parçalar için." },
  { en: "exquisite", tr: "enfes, kusursuz", note: "Bir parçayı övgüyle tanıtırken." },
  { en: "iconic", tr: "ikonik", note: "Speedy, Neverfull gibi simge ürünler için." },
  { en: "bespoke", tr: "kişiye özel", note: "Özel sipariş / kişiselleştirme hizmeti." },
  { en: "hot stamping", tr: "baş harf baskısı", note: "Ücretsiz kişiselleştirme hizmetimiz." },
  { en: "coated canvas", tr: "kaplamalı kanvas", note: "Monogram'ın dayanıklı malzemesi." },
  { en: "leather goods", tr: "deri ürünler", note: "Cüzdan, kartlık gibi küçük deri ürünler (SLG)." },
  { en: "client advisor", tr: "müşteri danışmanı", note: "Hülya'nın resmi unvanı." },
  { en: "clienteling", tr: "müşteri ilişkisi yönetimi", note: "Müşteriyi hatırlama, takip etme sanatı." },
  { en: "ready-to-wear", tr: "hazır giyim", note: "Konfeksiyon koleksiyonu (RTW)." },
  { en: "appointment", tr: "randevu", note: "Özel alışveriş randevusu ayarlamak." },
  { en: "complimentary", tr: "ikram, ücretsiz", note: "'Complimentary gift-wrapping' = ücretsiz hediye paketi." },
  { en: "to assist", tr: "yardımcı olmak", note: "'May I assist you?' — zarif bir teklif." },
  { en: "to recommend", tr: "tavsiye etmek", note: "İhtiyaca göre ürün önermek." },
  { en: "investment piece", tr: "yatırım parçası", note: "Fiyat itirazını değere çevirmek için." },
  { en: "waiting list", tr: "bekleme listesi", note: "Stokta olmayan ürün için müşteriyi tutmak." },
  { en: "to gift-wrap", tr: "hediye paketi yapmak", note: "Deneyimi tamamlayan dokunuş." },
  { en: "fragrance", tr: "parfüm, koku", note: "LV parfüm koleksiyonu." },
  { en: "trunk", tr: "sandık", note: "Maison'un 1854'teki ilk ikonik ürünü." },
  { en: "atelier", tr: "atölye", note: "Ürünlerin üretildiği zanaat atölyesi." },
  { en: "boutique", tr: "butik", note: "LV mağazasının adı." },
];

/** Tarihe göre deterministik 'günün kelimesi' seçer (her gün aynı). */
export function getWordOfDay(date = new Date()): WordOfDay {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / 86400000);
  return WORDS[dayOfYear % WORDS.length];
}
