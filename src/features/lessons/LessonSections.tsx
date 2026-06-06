import { useState } from "react";
import { Check, Play, Rabbit } from "lucide-react";
import type { Phrase, QuizQuestion, Unit, VocabItem } from "../../types";
import { SpeakButton } from "../../components/ui/SpeakButton";
import { MicButton } from "../../components/ui/MicButton";
import { useProgress } from "../../context/ProgressContext";
import { useMode } from "../../context/ModeContext";
import { speak, speakSequence } from "../../lib/speech";
import { cn } from "../../lib/cn";

// ---------------- İfadeler (satış cümleleri) ----------------
export function PhrasesSection({ unit }: { unit: Unit }) {
  return (
    <div className="card-luxe p-6">
      <h3 className="mb-1 font-serif text-2xl text-espresso">{unit.phrasesTitle ?? "İfadeler"}</h3>
      <p className="mb-4 text-sm text-muted">Her cümleyi dinle ve yüksek sesle tekrar et.</p>
      <div className="flex flex-col gap-2">
        {unit.phrases?.map((p) => (
          <PhraseRow key={p.en} phrase={p} />
        ))}
      </div>
    </div>
  );
}

function PhraseRow({ phrase }: { phrase: Phrase }) {
  return (
    <div className="rounded-2xl bg-ivory p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="font-medium text-espresso">{phrase.en}</p>
        <SpeakButton text={phrase.en} className="shrink-0" />
      </div>
      <p className="mt-1 text-sm text-muted">{phrase.tr}</p>
      <div className="mt-2">
        <MicButton target={phrase.en} />
      </div>
    </div>
  );
}

// ---------------- Kelime kartları ----------------
export function VocabSection({ unit }: { unit: Unit }) {
  return (
    <div className="flex flex-col gap-4">
      {unit.vocab?.map((group) => (
        <div key={group.id} className="card-luxe p-6">
          <h3 className="mb-1 font-serif text-2xl text-espresso">{group.title}</h3>
          <p className="mb-4 text-sm text-muted">Karta dokun, Türkçesini gör.</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((item) => (
              <Flashcard key={item.en} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Flashcard({ item }: { item: VocabItem }) {
  const [flipped, setFlipped] = useState(false);
  const flip = () => setFlipped((f) => !f);
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={flip}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          flip();
        }
      }}
      className="group h-36 cursor-pointer rounded-2xl outline-none [perspective:1000px] focus-visible:ring-2 focus-visible:ring-cognac"
      aria-label={`${item.en} — çevirmek için dokun`}
    >
      <div
        className={cn(
          "relative h-full w-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d]",
          flipped && "[transform:rotateY(180deg)]",
        )}
      >
        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-line bg-paper p-4 [backface-visibility:hidden]">
          <span className="font-serif text-xl text-espresso">{item.en}</span>
          {item.def && <span className="text-[11px] text-muted">{item.def}</span>}
          <SpeakButton text={item.en} className="self-start" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center gap-1 rounded-2xl bg-espresso p-4 text-ivory [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="font-serif text-xl">{item.tr}</span>
          {item.example && <span className="text-sm italic text-ivory/70">"{item.example}"</span>}
        </div>
      </div>
    </div>
  );
}

// ---------------- Dilbilgisi ----------------
export function GrammarSection({ unit }: { unit: Unit }) {
  const g = unit.grammar;
  if (!g) return null;
  return (
    <div className="card-luxe p-6">
      <h3 className="font-serif text-2xl text-espresso">{g.title}</h3>
      <p className="mb-4 text-sm text-muted">{g.titleTr}</p>
      <div className="mb-4 rounded-2xl bg-ivory p-4 text-[15px] leading-relaxed">{g.explanation}</div>
      <div className="flex flex-col">
        {g.examples.map((ex) => (
          <div key={ex.en} className="flex flex-col gap-0.5 border-b border-dashed border-line py-3 last:border-0">
            <span className="flex items-center gap-2 font-medium text-espresso">
              {ex.en}
              <SpeakButton text={ex.en} label="" className="px-2 py-1" />
            </span>
            <span className="text-sm text-muted">{ex.tr}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------- Dinleme ----------------
export function ListeningSection({ unit }: { unit: Unit }) {
  const { recordListeningScore } = useProgress();
  const { mode } = useMode();
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const lq = unit.listeningQuiz ?? [];
  const lqDone = lq.length > 0 && Object.keys(quizAnswers).length === lq.length;

  function pickLq(qi: number, oi: number) {
    if (quizAnswers[qi] !== undefined) return;
    const next = { ...quizAnswers, [qi]: oi };
    setQuizAnswers(next);
    if (Object.keys(next).length === lq.length) {
      const correct = lq.filter((q, i) => next[i] === q.answer).length;
      recordListeningScore(Math.round((correct / lq.length) * 100), mode);
    }
  }

  return (
    <div className="card-luxe flex flex-col gap-6 p-6">
      <div>
        <h3 className="mb-1 font-serif text-2xl text-espresso">Dinleme</h3>
        <p className="mb-4 text-sm text-muted">Dinle, sonra sesli tekrar et.</p>
        <div className="flex flex-col gap-2">
          {unit.listening?.map((line) => (
            <div key={line} className="flex items-center gap-3 rounded-2xl bg-ivory p-3">
              <button
                onClick={() => speak(line)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cognac text-white transition hover:scale-105"
              >
                <Play size={16} />
              </button>
              <span className="text-espresso">{line}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={() => speakSequence(unit.listening ?? [], { rate: 0.92 })} className="btn-ghost">
            <Play size={16} /> Hepsini dinle
          </button>
          <button onClick={() => speakSequence(unit.listening ?? [], { rate: 0.62 })} className="btn-ghost">
            <Rabbit size={16} /> Yavaş dinle
          </button>
        </div>
      </div>

      {lq.length > 0 && (
        <div className="border-t border-line pt-5">
          <h4 className="mb-2 font-serif text-lg text-espresso">Anlama soruları</h4>
          <p className="mb-3 text-sm text-muted">Dinledikten sonra cevapla — seviye takibine girer.</p>
          {lq.map((q, qi) => (
            <div key={qi} className="mb-4">
              <p className="mb-2 font-medium text-espresso">{qi + 1}. {q.q}</p>
              <div className="flex flex-col gap-2">
                {q.options.map((opt, oi) => (
                  <button
                    key={oi}
                    disabled={quizAnswers[qi] !== undefined}
                    onClick={() => pickLq(qi, oi)}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-left transition",
                      quizAnswers[qi] === undefined && "border-line hover:border-cognac",
                      quizAnswers[qi] === oi && oi === q.answer && "border-sage bg-sage/10",
                      quizAnswers[qi] === oi && oi !== q.answer && "border-plum bg-plum/10",
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {quizAnswers[qi] !== undefined && <p className="mt-1 text-xs text-muted">{q.explainTr}</p>}
            </div>
          ))}
          {lqDone && <p className="text-sm text-sage">Dinleme quizi tamamlandı ✓</p>}
        </div>
      )}
    </div>
  );
}

// ---------------- Konuşma ----------------
export function SpeakingSection({ unit }: { unit: Unit }) {
  return (
    <div className="card-luxe p-6">
      <h3 className="mb-1 font-serif text-2xl text-espresso">Konuşma Pratiği</h3>
      <p className="mb-4 text-sm text-muted">Önce dinle (🔊), sonra mikrofona söyle (🎤). Chrome önerilir.</p>
      <div className="flex flex-col gap-3">
        {unit.speaking?.map((line) => (
          <div key={line} className="rounded-2xl bg-ivory p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-espresso">{line}</span>
              <SpeakButton text={line} className="shrink-0" />
            </div>
            <div className="mt-2">
              <MicButton target={line} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------- Yazma ----------------
export function WritingSection({ unit }: { unit: Unit }) {
  const [text, setText] = useState("");
  const [showSample, setShowSample] = useState(false);
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const { recordWritingDone } = useProgress();
  const { mode } = useMode();
  if (!unit.writing) return null;
  const checklist = unit.writing.checklist ?? [];
  const allChecked = checklist.length === 0 || checklist.every((_, i) => checked[i]);

  function toggleCheck(i: number) {
    setChecked((c) => ({ ...c, [i]: !c[i] }));
  }

  function finishWriting() {
    if (text.trim().length < 10) return;
    recordWritingDone(mode);
  }

  return (
    <div className="card-luxe p-6">
      <h3 className="mb-3 font-serif text-2xl text-espresso">Yazma Alıştırması</h3>
      <div className="mb-3 rounded-2xl bg-ivory p-4 text-[15px]">✍️ {unit.writing.taskTr}</div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Cevabını buraya İngilizce yaz..."
        className="min-h-32 w-full resize-y rounded-2xl border border-line bg-paper p-4 outline-none focus:border-cognac"
      />
      {checklist.length > 0 && (
        <div className="mt-4 rounded-2xl bg-cream/60 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-cognac">Kontrol listesi</p>
          <ul className="flex flex-col gap-2">
            {checklist.map((item, i) => (
              <li key={item}>
                <label className="flex cursor-pointer items-start gap-2 text-sm">
                  <input type="checkbox" checked={!!checked[i]} onChange={() => toggleCheck(i)} className="mt-1" />
                  <span>{item}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        <button onClick={() => setShowSample((s) => !s)} className="btn-primary">
          {showSample ? "Örneği gizle" : "Örnek cevabı göster"}
        </button>
        <button onClick={() => text.trim() && speak(text)} className="btn-ghost">
          🔊 Yazdığımı oku
        </button>
        <button onClick={finishWriting} disabled={!allChecked || text.trim().length < 10} className="btn-gold disabled:opacity-50">
          <Check size={16} /> Yazmayı tamamladım
        </button>
      </div>
      {showSample && (
        <div className="mt-4 rounded-2xl bg-espresso p-4 text-ivory">
          <p className="mb-1 font-serif text-gold">Örnek cevap</p>
          <p className="flex items-center gap-2">
            {unit.writing.sample}
            <SpeakButton text={unit.writing.sample} label="" className="bg-ivory/15 text-ivory" />
          </p>
        </div>
      )}
    </div>
  );
}

// ---------------- Quiz ----------------
export function QuizSection({
  unit,
  onScore,
}: {
  unit: Unit;
  onScore: (score: number, wrong: QuizQuestion[]) => void;
}) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const total = unit.quiz?.length ?? 0;
  const answered = Object.keys(answers).length;
  const correct = (unit.quiz ?? []).filter((q, i) => answers[i] === q.answer).length;

  function choose(qi: number, oi: number) {
    if (answers[qi] !== undefined) return;
    const next = { ...answers, [qi]: oi };
    setAnswers(next);
    if (Object.keys(next).length === total) {
      const wrong = (unit.quiz ?? []).filter((q, i) => next[i] !== q.answer);
      const score = (unit.quiz ?? []).filter((q, i) => next[i] === q.answer).length;
      onScore(Math.round((score / total) * 100), wrong);
    }
  }

  return (
    <div className="card-luxe p-6">
      <h3 className="mb-1 font-serif text-2xl text-espresso">Mini Quiz</h3>
      <p className="mb-4 text-sm text-muted">
        {answered === total ? `Sonuç: ${correct}/${total} doğru 🎯` : "Doğru cevabı seç."}
      </p>
      <div className="flex flex-col gap-6">
        {unit.quiz?.map((q, qi) => (
          <div key={qi}>
            <p className="mb-2 font-medium text-espresso">
              {qi + 1}. {q.q}
            </p>
            <div className="flex flex-col gap-2">
              {q.options.map((opt, oi) => {
                const picked = answers[qi];
                const isAnswered = picked !== undefined;
                const isCorrect = oi === q.answer;
                const isPickedWrong = picked === oi && oi !== q.answer;
                return (
                  <button
                    key={oi}
                    disabled={isAnswered}
                    onClick={() => choose(qi, oi)}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-left transition",
                      !isAnswered && "border-line bg-paper hover:border-cognac",
                      isAnswered && isCorrect && "border-sage bg-sage/10 font-semibold text-sage",
                      isAnswered && isPickedWrong && "border-plum bg-plum/10 text-plum",
                      isAnswered && !isCorrect && !isPickedWrong && "border-line bg-paper opacity-60",
                    )}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {answers[qi] !== undefined && <p className="mt-2 text-sm italic text-muted">{q.explainTr}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

// Bir bölümün "tamamla" rozeti
export function SectionDoneBar({ done, onDone }: { done: boolean; onDone: () => void }) {
  return done ? (
    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-sage">
      <Check size={16} /> Bu bölüm tamamlandı
    </div>
  ) : (
    <button onClick={onDone} className="btn-gold mt-4">
      <Check size={16} /> Bu bölümü tamamladım (+10 XP)
    </button>
  );
}
