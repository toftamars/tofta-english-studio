// ============================================================
// Maison Radar — günlük haber toplayıcı (YASAL)
//  Google News RSS (halka açık) üzerinden Louis Vuitton / LVMH /
//  lüks moda haberlerini çeker, temizler, public/radar.json yazar.
//  Hiçbir site KAZINMAZ; yalnızca herkese açık RSS kullanılır.
//
//  Çalıştırma: node scripts/fetch-radar.mjs
// ============================================================
import { writeFileSync, readFileSync } from "node:fs";
import { XMLParser } from "fast-xml-parser";

const QUERIES = [
  { q: "Louis Vuitton", tag: "Marka" },
  { q: "Louis Vuitton collection OR handbag", tag: "Koleksiyon" },
  { q: "LVMH", tag: "Sektör" },
  { q: "luxury fashion house", tag: "Moda" },
];

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });

function clean(t) {
  return String(t ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchFeed(q) {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(
    q,
  )}&hl=en-US&gl=US&ceid=US:en`;
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; ToftaRadar/1.0)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for "${q}"`);
  const xml = await res.text();
  const doc = parser.parse(xml);
  const items = doc?.rss?.channel?.item ?? [];
  return Array.isArray(items) ? items : [items];
}

const seen = new Set();
const news = [];

for (const { q, tag } of QUERIES) {
  let items = [];
  try {
    items = await fetchFeed(q);
  } catch (err) {
    console.warn(`Uyarı: "${q}" alınamadı —`, err.message);
    continue;
  }
  for (const it of items) {
    const rawTitle = clean(it.title);
    if (!rawTitle) continue;
    const source = clean(it?.source?.["#text"] ?? it?.source) || "Google News";
    // Google News başlığı "Headline - Source" biçimindedir; kaynağı ayıkla
    const title = rawTitle.replace(new RegExp(`\\s*[-–]\\s*${source}$`), "").trim();
    const key = title.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    news.push({
      title,
      source,
      url: typeof it.link === "string" ? it.link : it?.link?.["#text"] ?? "",
      publishedAt: it.pubDate ? new Date(it.pubDate).toISOString() : new Date().toISOString(),
      tag,
    });
  }
}

news.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
const top = news.slice(0, 14);

if (top.length === 0) {
  console.error("Hiç haber alınamadı; mevcut radar.json korunuyor.");
  process.exit(0);
}

const out = { updatedAt: new Date().toISOString(), news: top };

// Değişiklik yoksa yazma (gereksiz commit olmasın)
let prev = "";
try {
  const parsed = JSON.parse(readFileSync("public/radar.json", "utf8"));
  prev = JSON.stringify(parsed.news);
} catch {
  /* ilk çalıştırma */
}
if (prev === JSON.stringify(out.news)) {
  console.log("Değişiklik yok; radar.json güncellenmedi.");
  process.exit(0);
}

writeFileSync("public/radar.json", JSON.stringify(out, null, 2) + "\n");
console.log(`radar.json güncellendi: ${top.length} haber.`);
