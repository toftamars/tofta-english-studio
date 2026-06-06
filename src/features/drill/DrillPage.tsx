import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Check,
  ChevronRight,
  Layers,
  ListOrdered,
  RefreshCw,
  Shuffle,
  Sparkles,
  Type,
  X,
  Zap,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useProgress } from "../../context/ProgressContext";
import { useMode } from "../../context/ModeContext";
import { poolStats, poolEntriesFromProducts } from "../../lib/exercisePool";
import { getLocalProductsSync } from "../../lib/products";
import { generateDrillRound, generateMatchRound, sessionSeed } from "../../lib/exerciseGenerator";
import type { DrillExercise, DrillKind } from "../../types";
import { SpeakButton } from "../../components/ui/SpeakButton";
import { cn } from "../../lib/cn";

const MODES: { kind: DrillKind; label: string; desc: string; icon: typeof Type; color: string }[] = [
  { kind: "flashcard", label: "Kelime Ezberle", desc: "Kart çevir, kendini test et", icon: Layers, color: "bg-cognac/15 text-cognac" },
  { kind: "cloze", label: "Cümle Tamamla", desc: "Boşluğu doğru kelimeyle doldur", icon: Type, color: "bg-espresso/10 text-espresso" },
  { kind: "choice", label: "Çoktan Seçmeli", desc: "EN ↔ TR eşleştirme", icon: ListOrdered, color: "bg-gold/20 text-cognac" },
  { kind: "order", label: "Cümle Kur", desc: "Kelime sırasını doğru diz", icon: Shuffle, color: "bg-cream text-ink" },
  { kind: "match", label: "Eşleştirme", desc: "4 çifti birleştir", icon: Zap, color: "bg-ivory text-espresso" },
  { kind: "mixed", label: "Karışık Maraton", desc: "Tüm türler — sınırsız tur", icon: Sparkles, color: "bg-espresso text-ivory" },
];

const ROUND_SIZE = 10;

export function DrillPage() {
  const { user } = useAuth();
  const { recordDrillAnswer, reviewsDue } = useProgress();
  const { mode, modeMeta } = useMode();
  const [searchParams] = useSearchParams();
  const stats = useMemo(() => poolStats(user?.profileId ?? "hulya"), [user?.profileId]);
  const catalogExtra = useMemo(() => poolEntriesFromProducts(getLocalProductsSync()), []);

  const [activeKind, setActiveKind] = useState<DrillKind | null>(null);
  const [seed, setSeed] = useState(() => sessionSeed());
  const [round, setRound] = useState<DrillExercise[]>([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [orderPick, setOrderPick] = useState<string[]>([]);
  const [flipped, setFlipped] = useState(false);
  const [matchEn, setMatchEn] = useState<string | null>(null);
  const [matchPairs, setMatchPairs] = useState<Record<string, string>>({});
  const [roundDone, setRoundDone] = useState(false);

  const startSession = useCallback(
    (kind: DrillKind) => {
      const newSeed = sessionSeed();
      setSeed(newSeed);
      setActiveKind(kind);
      setIdx(0);
      setScore({ correct: 0, total: 0 });
      setFeedback(null);
      setSelected(null);
      setOrderPick([]);
      setFlipped(false);
      setMatchEn(null);
      setMatchPairs({});
      setRoundDone(false);

      if (kind === "match") {
        const m = generateMatchRound(user!.profileId, mode, newSeed, catalogExtra);
        setRound(m ? [m] : []);
      } else {
        setRound(generateDrillRound(user!.profileId, mode, kind, ROUND_SIZE, newSeed, catalogExtra));
      }
    },
    [user, mode, catalogExtra],
  );

  useEffect(() => {
    const kind = searchParams.get("kind") as DrillKind | null;
    if (kind && user && MODES.some((m) => m.kind === kind) && !activeKind) {
      startSession(kind);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, user]);

  const nextRound = useCallback(() => {
    const newSeed = sessionSeed(seed);
    setSeed(newSeed);
    setIdx(0);
    setFeedback(null);
    setSelected(null);
    setOrderPick([]);
    setFlipped(false);
    setMatchEn(null);
    setMatchPairs({});
    setRoundDone(false);
    if (activeKind === "match") {
      const m = generateMatchRound(user!.profileId, mode, newSeed, catalogExtra);
      setRound(m ? [m] : []);
    } else if (activeKind) {
      setRound(generateDrillRound(user!.profileId, mode, activeKind, ROUND_SIZE, newSeed, catalogExtra));
    }
  }, [activeKind, user, mode, seed, catalogExtra]);

  const ex = round[idx];

  function submit(correct: boolean, wrongText?: string) {
    if (!ex) return;
    setFeedback(correct ? "correct" : "wrong");
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    recordDrillAnswer(correct, ex, wrongText);
    setTimeout(() => {
      setFeedback(null);
      setSelected(null);
      setOrderPick([]);
      setFlipped(false);
      if (idx + 1 >= round.length) {
        setRoundDone(true);
      } else {
        setIdx((i) => i + 1);
      }
    }, correct ? 700 : 1200);
  }

  function pickOption(opt: string) {
    if (feedback || !ex) return;
    setSelected(opt);
    submit(opt.toLowerCase().trim() === ex.answer.toLowerCase().trim(), opt);
  }

  function pickOrderWord(w: string) {
    if (feedback || !ex?.words) return;
    const next = [...orderPick, w];
    setOrderPick(next);
    if (next.length === ex.words.length) {
      submit(next.join(" ").toLowerCase() === ex.answer.toLowerCase());
    }
  }

  function resetOrder() {
    setOrderPick([]);
  }

  // Match UI helpers
  const matchEx = ex?.kind === "match" ? ex : null;
  const matchEnList = matchEx?.hint?.split(",") ?? [];
  const matchTrList = matchEx
    ? (matchEx.options ?? []).filter((o) => !matchEnList.includes(o))
    : [];

  function pickMatchEn(en: string) {
    setMatchEn(en);
  }

  function pickMatchTr(tr: string) {
    if (!matchEn || !matchEx) return;
    const newPairs = { ...matchPairs, [matchEn]: tr };
    setMatchPairs(newPairs);
    setMatchEn(null);
    if (Object.keys(newPairs).length >= matchEnList.length) {
      const allCorrect = matchEx.answer.split("|").every((pair) => {
        const [en, expectedTr] = pair.split("=");
        return newPairs[en] === expectedTr;
      });
      submit(allCorrect);
    }
  }

  if (!user) return null;

  // Hub
  if (!activeKind) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <p className="eyebrow">Sınırsız alıştırma</p>
          <h1 className="font-display text-3xl text-espresso md:text-4xl">Kelime & Cümle Merkezi</h1>
          <p className="mt-1 text-sm text-muted">
            {modeMeta.emoji} {modeMeta.labelTr} · <b>{stats.total}+</b> kelime/cümle havuzundan her turda yeni egzersiz
          </p>
        </div>

        {reviewsDue > 0 && (
          <Link
            to="/app/review"
            className="flex items-center justify-between rounded-2xl border border-cognac/30 bg-cognac/10 px-4 py-3 text-sm"
          >
            <span className="flex items-center gap-2 font-medium text-cognac">
              <Brain size={18} /> {reviewsDue} tekrar kartı bekliyor
            </span>
            <ChevronRight size={18} className="text-cognac" />
          </Link>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          {MODES.map(({ kind, label, desc, icon: Icon, color }) => (
            <button
              key={kind}
              type="button"
              onClick={() => startSession(kind)}
              className="card-luxe flex items-start gap-4 p-5 text-left transition hover:shadow-soft active:scale-[0.98]"
            >
              <div className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-2xl", color)}>
                <Icon size={22} />
              </div>
              <div>
                <p className="font-serif text-lg text-espresso">{label}</p>
                <p className="text-sm text-muted">{desc}</p>
                <p className="mt-1 text-xs text-cognac">∞ sınırsız tur</p>
              </div>
            </button>
          ))}
        </div>

        <div className="rounded-2xl bg-cream/80 p-4 text-sm text-muted">
          <p>
            Havuz: <b>{stats.total}</b> girdi · Work {stats.work} · Daily {stats.daily} · Social {stats.social} ·{" "}
            {stats.templates} cümle şablonu
          </p>
          <p className="mt-1">Her tur bitince <b>Yeni tur</b> — asla aynı sıra tekrarlanmaz.</p>
        </div>
      </div>
    );
  }

  // Round complete
  if (roundDone || round.length === 0) {
    const pct = score.total ? Math.round((score.correct / score.total) * 100) : 0;
    return (
      <div className="card-luxe flex flex-col items-center gap-5 p-8 text-center">
        <p className="eyebrow">Tur tamamlandı</p>
        <p className="font-display text-5xl text-cognac">{pct}%</p>
        <p className="text-muted">
          {score.correct}/{score.total} doğru · +{score.correct * 2} XP
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button type="button" onClick={nextRound} className="btn-primary min-h-[48px]">
            <RefreshCw size={18} /> Yeni tur (∞)
          </button>
          <button type="button" onClick={() => setActiveKind(null)} className="btn-secondary min-h-[48px]">
            Mod seç
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => setActiveKind(null)} className="text-sm text-muted hover:text-cognac">
          ← Geri
        </button>
        <span className="text-xs text-muted">
          {idx + 1}/{round.length} · {score.correct}✓
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-cream">
        <div
          className="h-full bg-cognac transition-all duration-300"
          style={{ width: `${((idx + (feedback ? 1 : 0)) / round.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={ex?.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="card-luxe flex min-h-[280px] flex-col gap-4 p-6"
        >
          {/* Flashcard */}
          {ex?.kind === "flashcard" && (
            <>
              <p className="text-xs uppercase tracking-wider text-muted">Kelime ezberle</p>
              <div
                role="button"
                tabIndex={0}
                onClick={() => setFlipped((f) => !f)}
                onKeyDown={(e) => e.key === "Enter" && setFlipped((f) => !f)}
                className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl bg-cream/60 p-6 text-center"
              >
                <p className="font-serif text-2xl text-espresso">{flipped ? ex.answer : ex.prompt}</p>
                {!flipped && ex.hint && <p className="text-sm italic text-muted">{ex.hint}</p>}
                {ex.speak && <SpeakButton text={ex.speak} />}
                <p className="text-xs text-muted">{flipped ? "Türkçe" : "İngilizce — dokun ve çevir"}</p>
              </div>
              {flipped && !feedback && (
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => submit(false, ex.prompt)}
                    className="flex flex-1 min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-line text-muted"
                  >
                    <X size={18} /> Bilmiyorum
                  </button>
                  <button
                    type="button"
                    onClick={() => submit(true)}
                    className="flex flex-1 min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-espresso text-ivory"
                  >
                    <Check size={18} /> Biliyorum
                  </button>
                </div>
              )}
            </>
          )}

          {/* Cloze / Choice */}
          {(ex?.kind === "cloze" || ex?.kind === "choice") && ex.options && (
            <>
              <p className="text-xs uppercase tracking-wider text-muted">
                {ex.kind === "cloze" ? "Cümle tamamla" : "Çoktan seçmeli"}
              </p>
              {ex.sentence && (
                <p className="font-serif text-xl leading-relaxed text-espresso">{ex.sentence}</p>
              )}
              {!ex.sentence && (
                <p className="font-serif text-2xl text-espresso">{ex.prompt}</p>
              )}
              {ex.promptTr && <p className="text-sm text-muted">{ex.promptTr}</p>}
              {ex.speak && <SpeakButton text={ex.speak} className="self-start" />}
              <div className="mt-2 flex flex-col gap-2">
                {ex.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    disabled={!!feedback}
                    onClick={() => pickOption(opt)}
                    className={cn(
                      "min-h-[48px] rounded-2xl border px-4 py-3 text-left text-sm transition",
                      selected === opt && feedback === "correct" && "border-green-600 bg-green-50",
                      selected === opt && feedback === "wrong" && "border-red-400 bg-red-50",
                      !feedback && "border-line hover:border-cognac hover:bg-cream/50",
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Order */}
          {ex?.kind === "order" && ex.words && (
            <>
              <p className="text-xs uppercase tracking-wider text-muted">Cümle kur</p>
              <p className="text-sm text-muted">{ex.promptTr}</p>
              <div className="min-h-[52px] rounded-2xl border border-dashed border-cognac/40 bg-cream/40 p-3">
                <p className="font-medium text-espresso">{orderPick.join(" ") || "…"}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {ex.words.map((w, wi) => {
                  const used = orderPick.filter((p) => p === w).length;
                  const avail = ex.words!.filter((x) => x === w).length;
                  const disabled = used >= avail || !!feedback;
                  return (
                    <button
                      key={`${w}-${wi}`}
                      type="button"
                      disabled={disabled}
                      onClick={() => pickOrderWord(w)}
                      className={cn(
                        "rounded-xl border px-3 py-2 text-sm",
                        disabled ? "opacity-30" : "border-line hover:bg-cream",
                      )}
                    >
                      {w}
                    </button>
                  );
                })}
              </div>
              {orderPick.length > 0 && !feedback && (
                <button type="button" onClick={resetOrder} className="text-xs text-muted underline">
                  Sıfırla
                </button>
              )}
            </>
          )}

          {/* Match */}
          {ex?.kind === "match" && (
            <>
              <p className="text-xs uppercase tracking-wider text-muted">Eşleştir</p>
              <p className="text-sm text-muted">Önce İngilizce, sonra Türkçe karşılığını seç</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-semibold text-muted">English</p>
                  {matchEnList.map((en) => (
                    <button
                      key={en}
                      type="button"
                      disabled={!!matchPairs[en] || !!feedback}
                      onClick={() => pickMatchEn(en)}
                      className={cn(
                        "min-h-[44px] rounded-xl border px-3 py-2 text-left text-sm",
                        matchEn === en && "border-cognac bg-cognac/10",
                        matchPairs[en] && "opacity-50 line-through",
                      )}
                    >
                      {en}
                    </button>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-semibold text-muted">Türkçe</p>
                  {matchTrList.map((tr) => (
                    <button
                      key={tr}
                      type="button"
                      disabled={!matchEn || !!feedback || Object.values(matchPairs).includes(tr)}
                      onClick={() => pickMatchTr(tr)}
                      className="min-h-[44px] rounded-xl border border-line px-3 py-2 text-left text-sm hover:bg-cream disabled:opacity-40"
                    >
                      {tr}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {feedback && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              aria-live="polite"
              className={cn("text-center text-sm font-medium", feedback === "correct" ? "text-green-700" : "text-red-600")}
            >
              {feedback === "correct" ? "Doğru! ✓" : `Doğrusu: ${ex?.answer}`}
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
