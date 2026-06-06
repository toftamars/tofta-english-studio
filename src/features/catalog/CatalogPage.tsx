import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera, ExternalLink, Plus, ShoppingBag, Sparkles, Trash2 } from "lucide-react";
import type { ParsedProduct, Product, ProductCategory } from "../../types";
import {
  addProduct,
  deleteProduct,
  listProducts,
  parseAllProducts,
  parseProductPaste,
  uploadProductPhoto,
  type NewProductInput,
} from "../../lib/products";
import { ocrImage } from "../../lib/ocr";
import { useAuth } from "../../context/AuthContext";
import { SpeakButton } from "../../components/ui/SpeakButton";
import { cn } from "../../lib/cn";

const CATEGORIES: ProductCategory[] = ["Çanta", "Küçük Deri", "Aksesuar", "Ayakkabı", "Hazır Giyim", "Parfüm", "Diğer"];

export function CatalogPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showBulk, setShowBulk] = useState(false);

  useEffect(() => {
    listProducts()
      .then(setProducts)
      .catch((err) => {
        console.error("Ürünler yüklenemedi:", err);
        setLoadError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const author = user ? { id: user.id, displayName: user.displayName } : undefined;

  async function handleAdd(input: NewProductInput) {
    const p = await addProduct(input, author);
    setProducts((prev) => [p, ...prev]);
    setShowForm(false);
  }

  async function handleBulkAdd(items: ParsedProduct[]) {
    const added: Product[] = [];
    for (const it of items) {
      if (!it.name) continue;
      const p = await addProduct(
        {
          name: it.name,
          category: "Diğer",
          material: it.material,
          priceText: it.priceText,
          reference: it.reference,
          summary: it.summary,
          imageUrl: it.imageUrl,
          url: it.url,
        },
        author,
      );
      added.push(p);
    }
    setProducts((prev) => [...added, ...prev]);
    setShowBulk(false);
  }
  async function handleDelete(id: string) {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="flex flex-col gap-7">
      <header>
        <p className="eyebrow flex items-center gap-2">
          <ShoppingBag size={14} /> Ürün Kataloğu · Hep güncel
        </p>
        <h1 className="font-display text-4xl text-espresso md:text-5xl">Katalog</h1>
        <p className="text-muted">
          Gördüğün gerçek ürünleri ekle; isim, malzeme ve fiyatı hem İngilizce öğren hem satışta kullan.
        </p>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm text-muted">{products.length} ürün</span>
        <div className="flex gap-2">
          <button onClick={() => { setShowBulk((s) => !s); setShowForm(false); }} className="btn-ghost !px-4 !py-2 text-sm">
            Toplu ekle
          </button>
          <button onClick={() => { setShowForm((s) => !s); setShowBulk(false); }} className="btn-primary !px-4 !py-2 text-sm">
            <Plus size={16} /> Ürün ekle
          </button>
        </div>
      </div>

      {showForm && <ProductForm userId={user?.id} onSubmit={handleAdd} onCancel={() => setShowForm(false)} />}
      {showBulk && <BulkForm onSubmit={handleBulkAdd} onCancel={() => setShowBulk(false)} />}

      {loadError && (
        <div className="rounded-2xl bg-cognac/10 px-4 py-3 text-sm text-cognac">
          Ürünler yüklenemedi (bağlantı sorunu olabilir). İnternetini kontrol edip sayfayı yenile.
        </div>
      )}

      {loading ? (
        <p className="animate-pulse text-sm text-muted">Ürünler yükleniyor…</p>
      ) : products.length === 0 ? (
        <div className="card-luxe p-6 text-center text-sm text-muted">
          Henüz ürün yok. Bir ürün sayfasının bilgisini yapıştırarak başla ✨
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {products.map((p, i) => (
            <ProductCard key={p.id} p={p} index={i} onDelete={() => handleDelete(p.id)} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProductCard({ p, index, onDelete }: { p: Product; index: number; onDelete: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.03 * index }}
      className="card-luxe flex flex-col overflow-hidden"
    >
      {p.imageUrl && (
        <div className="aspect-[4/3] w-full overflow-hidden bg-cream">
          <img src={p.imageUrl} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <span className="rounded-full bg-cognac/12 px-2.5 py-0.5 text-[11px] font-semibold text-cognac">
            {p.category}
          </span>
          <button onClick={onDelete} className="text-muted transition hover:text-cognac" aria-label="Sil">
            <Trash2 size={15} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <p className="font-serif text-xl leading-tight text-espresso">{p.name}</p>
          <SpeakButton text={p.name} label="" className="!px-2 !py-1" />
        </div>
        {p.line && <p className="-mt-1 text-xs uppercase tracking-wide text-muted">{p.line}</p>}

        <dl className="mt-1 grid grid-cols-1 gap-1 text-sm">
          {p.material && <Row k="Malzeme" v={p.material} />}
          {p.priceText && <Row k="Fiyat" v={p.priceText} />}
          {p.origin && <Row k="Menşe" v={p.origin} />}
          {p.reference && <Row k="Ref" v={p.reference} />}
        </dl>

        {p.summary && <p className="mt-1 text-sm text-ink/80">{p.summary}</p>}

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-xs text-muted">{p.authorName ?? ""}</span>
          {p.url && (
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-cognac hover:underline"
            >
              Kaynak <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex gap-2">
      <dt className="w-16 shrink-0 text-muted">{k}</dt>
      <dd className="font-medium text-espresso">{v}</dd>
    </div>
  );
}

function BulkForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (items: ParsedProduct[]) => void;
  onCancel: () => void;
}) {
  const [paste, setPaste] = useState("");
  const [items, setItems] = useState<ParsedProduct[]>([]);
  const [scanned, setScanned] = useState(false);
  const inputCls = "w-full rounded-2xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-cognac";

  function handleScan() {
    const r = parseAllProducts(paste);
    setItems(r);
    setScanned(true);
  }

  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="card-luxe flex flex-col gap-3 p-4">
      <p className="flex items-center gap-2 text-xs font-semibold text-cognac">
        <Sparkles size={14} /> Toplu ekle: bir ürün listesi sayfasının metnini (JSON-LD dahil) yapıştır
      </p>
      <textarea
        value={paste}
        onChange={(e) => setPaste(e.target.value)}
        placeholder="Ürün listesi / kategori sayfasından kopyaladığın içeriği yapıştır…"
        rows={5}
        className={inputCls}
      />
      <div className="flex items-center gap-2">
        <button type="button" onClick={handleScan} disabled={!paste.trim()} className="btn-ghost !px-4 !py-2 text-sm">
          Tara
        </button>
        {scanned && <span className="text-xs text-muted">{items.length} ürün bulundu</span>}
      </div>

      {items.length > 0 && (
        <ul className="flex flex-col gap-1.5 rounded-2xl bg-cream/60 p-3 text-sm">
          {items.slice(0, 30).map((it, i) => (
            <li key={i} className="flex items-center justify-between gap-2">
              <span className="truncate text-espresso">{it.name}</span>
              {it.priceText && <span className="shrink-0 text-xs text-muted">{it.priceText}</span>}
            </li>
          ))}
        </ul>
      )}

      <div className="flex gap-2">
        <button type="button" onClick={() => onSubmit(items)} disabled={items.length === 0} className="btn-primary disabled:opacity-40">
          Hepsini ekle ({items.length})
        </button>
        <button type="button" onClick={onCancel} className="btn-ghost">
          Vazgeç
        </button>
      </div>
    </motion.div>
  );
}

function ProductForm({
  userId,
  onSubmit,
  onCancel,
}: {
  userId?: string;
  onSubmit: (input: NewProductInput) => void;
  onCancel: () => void;
}) {
  const [paste, setPaste] = useState("");
  const [name, setName] = useState("");
  const [line, setLine] = useState("");
  const [category, setCategory] = useState<ProductCategory>("Çanta");
  const [material, setMaterial] = useState("");
  const [priceText, setPriceText] = useState("");
  const [reference, setReference] = useState("");
  const [origin, setOrigin] = useState("");
  const [summary, setSummary] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [url, setUrl] = useState("");
  const [parsedMsg, setParsedMsg] = useState("");
  const [photoBusy, setPhotoBusy] = useState<"idle" | "upload" | "ocr">("idle");
  const [ocrPct, setOcrPct] = useState(0);
  const [photoMsg, setPhotoMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const valid = name.trim().length > 1;

  function fill(r: ParsedProduct, onlyEmpty = false): string[] {
    const filled: string[] = [];
    if (r.name && (!onlyEmpty || !name)) {
      setName(r.name);
      filled.push("isim");
    }
    if (r.material && (!onlyEmpty || !material)) {
      setMaterial(r.material);
      filled.push("malzeme");
    }
    if (r.priceText && (!onlyEmpty || !priceText)) {
      setPriceText(r.priceText);
      filled.push("fiyat");
    }
    if (r.reference && (!onlyEmpty || !reference)) {
      setReference(r.reference);
      filled.push("ref");
    }
    if (r.summary && (!onlyEmpty || !summary)) {
      setSummary(r.summary);
      filled.push("özet");
    }
    if (r.imageUrl && (!onlyEmpty || !imageUrl)) {
      setImageUrl(r.imageUrl);
      filled.push("görsel");
    }
    if (r.url && (!onlyEmpty || !url)) {
      setUrl(r.url);
      filled.push("link");
    }
    return filled;
  }

  function handleParse() {
    const filled = fill(parseProductPaste(paste));
    setParsedMsg(
      filled.length ? `Ayrıştırıldı: ${filled.join(", ")}. Kontrol edip kaydet.` : "Otomatik alan bulunamadı; elle doldurabilirsin.",
    );
  }

  async function handlePhoto(file: File) {
    setPhotoMsg("");
    setOcrPct(0);
    try {
      setPhotoBusy("upload");
      const photoUrl = await uploadProductPhoto(file, userId);
      setImageUrl(photoUrl);

      setPhotoBusy("ocr");
      const text = await ocrImage(file, setOcrPct);
      if (text) {
        const filled = fill(parseProductPaste(text), true);
        setPhotoMsg(
          filled.length
            ? `Fotoğraf eklendi. Okunan: ${filled.join(", ")}. Kontrol et.`
            : "Fotoğraf eklendi. Üründe okunabilir yazı/kod bulunamadı — alanları elle doldur.",
        );
      } else {
        setPhotoMsg("Fotoğraf eklendi. Yazı okunamadı — alanları elle doldur.");
      }
    } catch {
      setPhotoMsg("Fotoğraf işlenemedi, tekrar dene.");
    } finally {
      setPhotoBusy("idle");
    }
  }

  const inputCls = "w-full rounded-2xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-cognac";

  return (
    <motion.form
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      onSubmit={(e) => {
        e.preventDefault();
        if (valid)
          onSubmit({ name, line, category, material, priceText, reference, origin, summary, imageUrl, url });
      }}
      className="card-luxe flex flex-col gap-3 p-4"
    >
      {/* Fotoğraf çek / yükle (+ OCR) */}
      <div className="rounded-2xl bg-cream/60 p-3">
        <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-cognac">
          <Camera size={14} /> Fotoğraf çek / yükle — etiketteki yazı ve kod otomatik okunur
        </p>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handlePhoto(f);
            e.target.value = "";
          }}
        />
        <div className="flex items-center gap-3">
          {imageUrl && (
            <img src={imageUrl} alt="önizleme" className="h-16 w-16 rounded-xl object-cover" />
          )}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={photoBusy !== "idle"}
            className="btn-ghost !px-4 !py-2 text-sm disabled:opacity-50"
          >
            <Camera size={15} />
            {photoBusy === "upload" ? "Yükleniyor…" : photoBusy === "ocr" ? `Okunuyor… %${ocrPct}` : imageUrl ? "Değiştir" : "Fotoğraf"}
          </button>
          {photoMsg && <span className="text-xs text-muted">{photoMsg}</span>}
        </div>
      </div>

      {/* Yapıştır-ayrıştır */}
      <div className="rounded-2xl bg-cream/60 p-3">
        <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-cognac">
          <Sparkles size={14} /> Hızlı ekle: ürün sayfasının metnini / linkini yapıştır
        </p>
        <textarea
          value={paste}
          onChange={(e) => setPaste(e.target.value)}
          placeholder="Ürün sayfasından kopyaladığın metni veya linki buraya yapıştır…"
          rows={3}
          className={inputCls}
        />
        <div className="mt-2 flex items-center gap-2">
          <button type="button" onClick={handleParse} className="btn-ghost !px-4 !py-2 text-sm" disabled={!paste.trim()}>
            Ayrıştır
          </button>
          {parsedMsg && <span className="text-xs text-muted">{parsedMsg}</span>}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold transition",
              category === c ? "bg-espresso text-ivory" : "bg-cream text-ink hover:bg-cognac/10",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="İsim * (ör. Low Key Hobo PM)" className={inputCls} />
      <div className="grid gap-3 sm:grid-cols-2">
        <input value={line} onChange={(e) => setLine(e.target.value)} placeholder="Hat (ör. Speedy)" className={inputCls} />
        <input value={material} onChange={(e) => setMaterial(e.target.value)} placeholder="Malzeme (ör. Monogram canvas)" className={inputCls} />
        <input value={priceText} onChange={(e) => setPriceText(e.target.value)} placeholder="Fiyat (ör. ≈ 2.500 €)" className={inputCls} />
        <input value={reference} onChange={(e) => setReference(e.target.value)} placeholder="Ref (ör. M29068)" className={inputCls} />
        <input value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Menşe (ör. France)" className={inputCls} />
        <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Görsel linki (opsiyonel)" className={inputCls} />
      </div>
      <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Ürün sayfası linki (opsiyonel)" className={inputCls} />
      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="Kendi kısa özetin (telifsiz): öne çıkan özellikler, satış notu…"
        rows={3}
        className={inputCls}
      />

      <div className="flex gap-2">
        <button type="submit" disabled={!valid} className="btn-primary disabled:opacity-40">
          Kaydet
        </button>
        <button type="button" onClick={onCancel} className="btn-ghost">
          Vazgeç
        </button>
      </div>
    </motion.form>
  );
}
