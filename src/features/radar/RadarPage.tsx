import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ExternalLink, Languages, Plus, Radar, Trash2 } from "lucide-react";
import type { RadarItem, RadarNote, RadarNoteCategory } from "../../types";
import { getWordOfDay } from "../../data/radar";
import { loadRadar, timeAgoTr } from "../../lib/radar";
import { addNote, deleteNote, listNotes, type NewNoteInput } from "../../lib/radarNotes";
import { clearExercisePoolCache } from "../../lib/exercisePool";
import { translateToTr } from "../../lib/translate";
import { useAuth } from "../../context/AuthContext";
import { SpeakButton } from "../../components/ui/SpeakButton";
import { cn } from "../../lib/cn";

const CATEGORIES: RadarNoteCategory[] = ["Koleksiyon", "Materyal", "Mağaza", "Vizyon", "Müşteri", "Diğer"];

const CAT_STYLE: Record<RadarNoteCategory, string> = {
  Koleksiyon: "bg-cognac/15 text-cognac",
  Materyal: "bg-olive/15 text-olive",
  Mağaza: "bg-plum/15 text-plum",
  Vizyon: "bg-gold/20 text-espresso",
  Müşteri: "bg-sage/20 text-espresso",
  Diğer: "bg-cream text-muted",
};

export function RadarPage() {
  const { user } = useAuth();
  const word = getWordOfDay();
  const [news, setNews] = useState<RadarItem[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string>("");
  const [notes, setNotes] = useState<RadarNote[]>([]);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadRadar()
      .then((d) => {
        setNews(d.news);
        setUpdatedAt(d.updatedAt);
      })
      .catch((err) => console.error("Radar haberleri yüklenemedi:", err));
    listNotes()
      .then(setNotes)
      .catch((err) => console.error("Notlar yüklenemedi:", err))
      .finally(() => setLoadingNotes(false));
  }, []);

  async function handleAdd(input: NewNoteInput) {
    const note = await addNote(input, user ? { id: user.id, displayName: user.displayName } : undefined);
    setNotes((prev) => [note, ...prev]);
    clearExercisePoolCache();
    setShowForm(false);
  }

  async function handleDelete(id: string) {
    await deleteNote(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
    clearExercisePoolCache();
  }

  return (
    <div className="flex flex-col gap-7">
      <header>
        <p className="eyebrow flex items-center gap-2">
          <Radar size={14} /> Maison Radar · Güncel kalmak
        </p>
        <h1 className="font-display text-4xl text-espresso md:text-5xl">Maison Radar</h1>
        <p className="text-muted">Markanın nabzı: günün kelimesi, son gelişmeler ve atölyeden notların — kelimeler otomatik alıştırma havuzuna eklenir.</p>
        <Link to="/app/drill" className="mt-2 inline-block text-sm font-semibold text-cognac hover:underline">
          Radar kelimeleriyle alıştır →
        </Link>
      </header>

      {/* Günün kelimesi */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-luxe flex flex-col gap-3 bg-gradient-to-br from-espresso to-mocha p-6 text-ivory"
      >
        <span className="eyebrow !text-gold">Günün Kelimesi</span>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-display text-3xl md:text-4xl">{word.en}</span>
          <span className="font-serif text-xl italic text-ivory/80">{word.tr}</span>
        </div>
        <p className="text-sm text-ivory/75">{word.note}</p>
        <SpeakButton text={word.en} className="mt-1 w-fit !bg-ivory/15 !text-ivory hover:!bg-gold hover:!text-espresso" />
      </motion.div>

      {/* Haberler */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-espresso">Son Gelişmeler</h2>
          {updatedAt && (
            <span className="text-xs text-muted">Güncellendi: {timeAgoTr(updatedAt)}</span>
          )}
        </div>
        <div className="grid gap-3">
          {news.map((n, i) => (
            <NewsItem key={`${n.url}-${i}`} item={n} index={i} />
          ))}
        </div>
        <p className="text-xs text-muted">
          Haberler halka açık RSS kaynaklarından her gün otomatik güncellenir. Çeviri istediğinde cihazında yapılır.
        </p>
      </section>

      {/* Atölye Notları (insider) */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-espresso">Atölye Notların</h2>
          <button onClick={() => setShowForm((s) => !s)} className="btn-primary !px-4 !py-2 text-sm">
            <Plus size={16} /> Not ekle
          </button>
        </div>
        <p className="-mt-1 text-sm text-muted">
          Mağazadan/eğitimden öğrendiğin güncel bilgileri buraya ekle — en güvenilir kaynak sensin.
        </p>

        {showForm && <NoteForm onSubmit={handleAdd} onCancel={() => setShowForm(false)} />}

        {loadingNotes ? (
          <p className="animate-pulse text-sm text-muted">Notlar yükleniyor…</p>
        ) : notes.length === 0 ? (
          <div className="card-luxe p-6 text-center text-sm text-muted">
            Henüz not yok. İlk notunu ekleyerek başla ✨
          </div>
        ) : (
          <div className="grid gap-3">
            {notes.map((note, i) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.03 * i }}
                className="card-luxe flex flex-col gap-2 p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-semibold", CAT_STYLE[note.category])}>
                    {note.category}
                  </span>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-muted transition hover:bg-cognac/10 hover:text-cognac"
                    aria-label="Notu sil"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="font-serif text-lg text-espresso">{note.title}</p>
                <p className="whitespace-pre-wrap text-sm text-ink/85">{note.body}</p>
                <p className="text-xs text-muted">
                  {note.authorName ? `${note.authorName} · ` : ""}
                  {timeAgoTr(note.createdAt)}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function NewsItem({ item, index }: { item: RadarItem; index: number }) {
  const [open, setOpen] = useState(false);
  const [tr, setTr] = useState<string | null>(null);
  const [trState, setTrState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleTranslate() {
    if (trState === "loading") return;
    if (tr) {
      setTrState("done");
      return;
    }
    setTrState("loading");
    const result = await translateToTr(item.title);
    if (result) {
      setTr(result);
      setTrState("done");
    } else {
      setTrState("error");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.03 * index }}
      className="card-luxe overflow-hidden"
    >
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-start gap-3 p-4 text-left">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-cream text-lg">📰</span>
        <span className="min-w-0 flex-1">
          <span className="mb-0.5 flex flex-wrap items-center gap-2">
            {item.tag && (
              <span className="rounded-full bg-cognac/12 px-2 py-0.5 text-[11px] font-semibold text-cognac">{item.tag}</span>
            )}
            <span className="text-xs text-muted">
              {item.source} · {timeAgoTr(item.publishedAt)}
            </span>
          </span>
          <span className="block font-medium leading-snug text-espresso">{item.title}</span>
        </span>
        <ChevronDown
          size={18}
          className={cn("mt-1 shrink-0 text-muted transition-transform", open && "rotate-180")}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line"
          >
            <div className="flex flex-col gap-3 p-4">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-muted">Orijinal (EN)</p>
                <p className="text-sm text-ink/85">{item.title}</p>
              </div>

              {trState === "done" && tr && (
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted">Türkçe</p>
                  <p className="text-sm text-espresso">{tr}</p>
                </div>
              )}
              {trState === "error" && (
                <p className="text-xs text-cognac">Çeviri şu an yapılamadı, birazdan tekrar dene.</p>
              )}

              <div className="flex flex-wrap items-center gap-2">
                <button onClick={handleTranslate} className="btn-ghost !px-3 !py-1.5 text-sm">
                  <Languages size={15} />
                  {trState === "loading" ? "Çevriliyor…" : tr ? "Türkçeyi göster" : "Türkçe'ye çevir"}
                </button>
                <SpeakButton text={item.title} label="Dinle" className="!px-3 !py-1.5" />
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-cognac hover:underline"
                  >
                    Kaynakta aç <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function NoteForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (input: NewNoteInput) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState<RadarNoteCategory>("Koleksiyon");
  const valid = title.trim().length > 1 && body.trim().length > 1;

  return (
    <motion.form
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      onSubmit={(e) => {
        e.preventDefault();
        if (valid) onSubmit({ title, body, category });
      }}
      className="card-luxe flex flex-col gap-3 p-4"
    >
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
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Başlık (ör. Yeni Speedy renkleri)"
        className="w-full rounded-2xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-cognac"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Detay: malzeme, fiyat aralığı, mağaza bilgisi, müşteri ipucu…"
        rows={4}
        className="w-full rounded-2xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-cognac"
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
