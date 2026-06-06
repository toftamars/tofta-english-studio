import type { ParsedProduct, Product, ProductCategory } from "../types";
import { supabase } from "./supabase";

// ============================================================
// Ürün Kataloğu deposu + "yapıştır-ayrıştır" parser.
//  Veriyi kullanıcı (tüketici olarak) sağlar; uygulama otomatik
//  istek atmaz. Supabase varsa bulut (aile içi paylaşımlı),
//  yoksa localStorage.
// ============================================================

const LOCAL_KEY = "tofta-products-v1";

export interface NewProductInput {
  name: string;
  line?: string;
  category: ProductCategory;
  material?: string;
  priceText?: string;
  reference?: string;
  origin?: string;
  summary?: string;
  imageUrl?: string;
  url?: string;
}

function loadLocal(): Product[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? (JSON.parse(raw) as Product[]) : [];
  } catch {
    return [];
  }
}
function saveLocal(items: Product[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
}

export async function listProducts(): Promise<Product[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from("products")
      .select("id, author_name, name, line, category, material, price_text, reference, origin, summary, image_url, url, created_at")
      .order("created_at", { ascending: false });
    if (!error && data) {
      return data.map((r) => ({
        id: r.id as string,
        authorName: (r.author_name as string) ?? undefined,
        name: r.name as string,
        line: (r.line as string) ?? undefined,
        category: (r.category as ProductCategory) ?? "Diğer",
        material: (r.material as string) ?? undefined,
        priceText: (r.price_text as string) ?? undefined,
        reference: (r.reference as string) ?? undefined,
        origin: (r.origin as string) ?? undefined,
        summary: (r.summary as string) ?? undefined,
        imageUrl: (r.image_url as string) ?? undefined,
        url: (r.url as string) ?? undefined,
        createdAt: r.created_at as string,
      }));
    }
  }
  return loadLocal();
}

export async function addProduct(
  input: NewProductInput,
  user?: { id: string; displayName: string },
): Promise<Product> {
  const product: Product = {
    id: crypto.randomUUID(),
    authorName: user?.displayName,
    name: input.name.trim(),
    line: input.line?.trim() || undefined,
    category: input.category,
    material: input.material?.trim() || undefined,
    priceText: input.priceText?.trim() || undefined,
    reference: input.reference?.trim() || undefined,
    origin: input.origin?.trim() || undefined,
    summary: input.summary?.trim() || undefined,
    imageUrl: input.imageUrl?.trim() || undefined,
    url: input.url?.trim() || undefined,
    createdAt: new Date().toISOString(),
  };

  if (supabase && user?.id) {
    const { data, error } = await supabase
      .from("products")
      .insert({
        user_id: user.id,
        author_name: user.displayName,
        name: product.name,
        line: product.line,
        category: product.category,
        material: product.material,
        price_text: product.priceText,
        reference: product.reference,
        origin: product.origin,
        summary: product.summary,
        image_url: product.imageUrl,
        url: product.url,
      })
      .select("id, created_at")
      .single();
    if (!error && data) {
      product.id = data.id as string;
      product.createdAt = data.created_at as string;
      return product;
    }
  }

  const next = [product, ...loadLocal()];
  saveLocal(next);
  return product;
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/** Ürün fotoğrafını Supabase Storage'a yükler (yoksa yerel data URL'e düşer). */
export async function uploadProductPhoto(file: File, userId?: string): Promise<string> {
  if (supabase && userId) {
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
    const path = `${userId}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage
      .from("product-photos")
      .upload(path, file, { upsert: false, contentType: file.type || "image/jpeg" });
    if (!error) {
      const { data } = supabase.storage.from("product-photos").getPublicUrl(path);
      return data.publicUrl;
    }
  }
  return fileToDataUrl(file);
}

export async function deleteProduct(id: string): Promise<void> {
  if (supabase) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) return;
  }
  saveLocal(loadLocal().filter((p) => p.id !== id));
}

// ------------------------------------------------------------
// Yapıştır-ayrıştır: kullanıcının kopyaladığı içeriği (JSON-LD,
// sayfa metni veya URL) yapılandırılmış alanlara çevirir.
// HİÇBİR ağ isteği yapmaz; sadece verilen metni işler.
// ------------------------------------------------------------

function titleCaseFromSlug(slug: string): string {
  return slug
    .split(/[-_]/)
    .filter((w) => w && !/^\d+$/.test(w) && !/^(nvprod|h\d+|v\d+)/i.test(w) && !/\d{4,}/.test(w))
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
    .trim();
}

export function parseProductPaste(text: string): ParsedProduct {
  const out: ParsedProduct = {};
  const raw = text.trim();
  if (!raw) return out;

  // 1) URL'yi yakala
  const urlMatch = raw.match(/https?:\/\/[^\s"']+/i);
  if (urlMatch) out.url = urlMatch[0];

  // 2) Referans no (ör. M29068) — URL'den ya da metinden
  const refMatch = raw.match(/\b([MN]\d{4,6})\b/);
  if (refMatch) out.reference = refMatch[1];

  // 3) JSON-LD / JSON dene
  const jsonLd = tryParseJsonLd(raw);
  if (jsonLd) {
    if (jsonLd.name) out.name = String(jsonLd.name);
    if (jsonLd.description) out.summary = stripHtml(String(jsonLd.description)).slice(0, 400);
    if (jsonLd.material) out.material = String(jsonLd.material);
    if (jsonLd.sku && !out.reference) out.reference = String(jsonLd.sku);
    const img = Array.isArray(jsonLd.image) ? jsonLd.image[0] : jsonLd.image;
    if (img) out.imageUrl = String(img);
    const offers = Array.isArray(jsonLd.offers) ? jsonLd.offers[0] : jsonLd.offers;
    if (offers?.price) {
      const cur = offers.priceCurrency || "";
      out.priceText = `${offers.price}${cur ? " " + cur : ""}`.trim();
    }
  }

  // 4) Fiyatı serbest metinden bul (JSON-LD yoksa)
  if (!out.priceText) {
    const price = raw.match(/(?:[€$£₺]|EUR|USD|GBP|TRY|TL)\s?\d[\d.,]*|\d[\d.,]*\s?(?:[€$£₺]|EUR|USD|GBP|TRY|TL)\b/i);
    if (price) out.priceText = price[0].trim();
  }

  // 5) İsim yoksa: URL slug'ından ya da ilk anlamlı satırdan
  if (!out.name) {
    if (out.url) {
      const slug = out.url.match(/\/products\/([^/]+)/i)?.[1];
      if (slug) {
        const guess = titleCaseFromSlug(slug);
        if (guess.length > 2) out.name = guess;
      }
    }
    if (!out.name) {
      const firstLine = raw
        .split(/\r?\n/)
        .map((l) => l.trim())
        .find((l) => l.length > 2 && !/^https?:/i.test(l) && !/[{}[\]]/.test(l));
      if (firstLine) out.name = firstLine.slice(0, 120);
    }
  }

  return out;
}

/** Toplu: yapıştırılan içerikteki TÜM ürün düğümlerini ayrıştırır. */
export function parseAllProducts(text: string): ParsedProduct[] {
  const raw = text.trim();
  if (!raw) return [];
  const nodes = collectProductNodes(raw);
  const results: ParsedProduct[] = [];
  const seen = new Set<string>();

  for (const node of nodes) {
    const p: ParsedProduct = {};
    if (node.name) p.name = String(node.name);
    if (node.description) p.summary = stripHtml(String(node.description)).slice(0, 400);
    if (node.material) p.material = String(node.material);
    if (node.sku) p.reference = String(node.sku);
    const img = Array.isArray(node.image) ? node.image[0] : node.image;
    if (img) p.imageUrl = String(img);
    const offers = Array.isArray(node.offers) ? node.offers[0] : node.offers;
    if (offers?.price) p.priceText = `${offers.price}${offers.priceCurrency ? " " + offers.priceCurrency : ""}`.trim();
    if (node.url) p.url = String(node.url);
    const key = (p.name || "") + (p.reference || "");
    if (p.name && !seen.has(key)) {
      seen.add(key);
      results.push(p);
    }
  }

  // Hiç JSON-LD yoksa en azından tek bir ürünü dene
  if (results.length === 0) {
    const single = parseProductPaste(raw);
    if (single.name) results.push(single);
  }
  return results;
}

function collectProductNodes(raw: string): any[] {
  const blocks: string[] = [];
  const scriptRe = /<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  while ((m = scriptRe.exec(raw))) blocks.push(m[1]);
  if (raw.startsWith("{") || raw.startsWith("[")) blocks.push(raw);

  const out: any[] = [];
  const walk = (node: any) => {
    if (!node || typeof node !== "object") return;
    const type = node["@type"];
    if (type === "Product" || (Array.isArray(type) && type.includes("Product"))) out.push(node);
    if (Array.isArray(node)) node.forEach(walk);
    for (const key of ["@graph", "itemListElement", "mainEntity", "item"]) {
      if (node[key]) walk(node[key]);
    }
  };
  for (const b of blocks) {
    try {
      walk(JSON.parse(b.trim()));
    } catch {
      /* sıradakine geç */
    }
  }
  return out;
}

function stripHtml(s: string): string {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function tryParseJsonLd(raw: string): any | null {
  // <script type="application/ld+json"> blokları ya da düz JSON
  const blocks: string[] = [];
  const scriptRe = /<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  while ((m = scriptRe.exec(raw))) blocks.push(m[1]);
  if (raw.startsWith("{") || raw.startsWith("[")) blocks.push(raw);

  for (const b of blocks) {
    try {
      const parsed = JSON.parse(b.trim());
      const found = findProductNode(parsed);
      if (found) return found;
    } catch {
      /* sıradakine geç */
    }
  }
  return null;
}

function findProductNode(node: any): any | null {
  if (!node || typeof node !== "object") return null;
  const type = node["@type"];
  if (type === "Product" || (Array.isArray(type) && type.includes("Product"))) return node;
  if (Array.isArray(node)) {
    for (const n of node) {
      const f = findProductNode(n);
      if (f) return f;
    }
  }
  for (const key of ["@graph", "itemListElement", "mainEntity"]) {
    if (node[key]) {
      const f = findProductNode(node[key]);
      if (f) return f;
    }
  }
  return null;
}
