// ============================================================
// Cihazda çeviri (EN → TR) — istendiğinde, tarayıcıdan.
//  MyMemory ücretsiz API (CORS uyumlu, anahtarsız). Sonuçlar
//  localStorage'da önbelleğe alınır (tekrar çağrı / kota dostu).
//  Hata olursa null döner; arayüz nazikçe bunu gösterir.
// ============================================================

const CACHE_KEY = "tofta-tr-cache-v1";

function loadCache(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
  } catch {
    return {};
  }
}
function saveCache(c: Record<string, string>) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(c));
  } catch {
    /* kota dolabilir, yoksay */
  }
}

const mem: Record<string, string> = loadCache();

export async function translateToTr(text: string): Promise<string | null> {
  const key = text.trim();
  if (!key) return null;
  if (mem[key]) return mem[key];

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(key)}&langpair=en|tr`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const tr = data?.responseData?.translatedText as string | undefined;
    if (!tr || /MYMEMORY WARNING|INVALID/i.test(tr)) throw new Error("çeviri yok");
    mem[key] = tr;
    saveCache(mem);
    return tr;
  } catch {
    return null;
  }
}
