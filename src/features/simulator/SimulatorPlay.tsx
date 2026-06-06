import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mic, PartyPopper } from "lucide-react";
import { getScenario } from "../../data";
import { useAuth } from "../../context/AuthContext";
import { useProgress } from "../../context/ProgressContext";
import { useMode } from "../../context/ModeContext";
import type { DialogueStep, ReplyOption } from "../../types";
import { SpeakButton } from "../../components/ui/SpeakButton";
import { MicButton } from "../../components/ui/MicButton";
import { analyzePronunciation, createRecognizer, isRecognitionSupported, speak, cancelSpeech } from "../../lib/speech";
import { cn } from "../../lib/cn";

interface HeardResult {
  text: string;
  matchedIdx: number;
  score: number;
  weakWords: string[];
}

export function SimulatorPlay() {
  const { slug } = useParams();
  const { user } = useAuth();
  const { mode } = useMode();
  const scenario = slug && user ? getScenario(slug, user.profileId, mode) : undefined;
  const { completeScenario, progress } = useProgress();

  const [stepIdx, setStepIdx] = useState(0);
  const [choices, setChoices] = useState<Record<number, number>>({});
  const [finished, setFinished] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState<HeardResult | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const recRef = useRef<ReturnType<typeof createRecognizer> | null>(null);
  const advanceTimerRef = useRef<number | null>(null);
  const genRef = useRef(0); // adım/mod değişince eski geri çağrıları geçersiz kılar
  const recSupported = isRecognitionSupported();

  const clearAdvanceTimer = useCallback(() => {
    if (advanceTimerRef.current !== null) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  }, []);

  const stopListening = useCallback(() => {
    const rec = recRef.current;
    recRef.current = null;
    if (rec) {
      rec.onresult = null;
      rec.onerror = null;
      rec.onend = null;
      try {
        rec.stop();
      } catch {
        /* yoksay */
      }
    }
    setListening(false);
  }, []);

  useEffect(() => {
    genRef.current++;
    setStepIdx(0);
    setChoices({});
    setFinished(false);
    setHeard(null);
    window.scrollTo(0, 0);
    return () => {
      genRef.current++;
      cancelSpeech();
      stopListening();
      clearAdvanceTimer();
    };
  }, [slug, stopListening, clearAdvanceTimer]);

  // Mevcut adım için: seslendir; sesli modda bitince dinlemeye geç
  useEffect(() => {
    const step = scenario?.steps[stepIdx];
    if (!step || finished) return;
    const gen = ++genRef.current; // bu çalıştırmaya özel kimlik
    setHeard(null);
    stopListening();
    clearAdvanceTimer();

    if (step.speaker === "narrator") {
      if (voiceMode) {
        advanceTimerRef.current = window.setTimeout(() => {
          if (gen !== genRef.current) return;
          setStepIdx((s) => Math.min(s + 1, scenario.steps.length - 1));
        }, 1100);
      }
      return () => clearAdvanceTimer();
    }

    speak(step.en, {
      onEnd: () => {
        if (gen !== genRef.current) return;
        if (voiceMode && step.replies?.length && choices[stepIdx] === undefined) {
          beginListening(step, gen);
        }
      },
    });

    return () => {
      cancelSpeech();
      stopListening();
      clearAdvanceTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIdx, scenario, voiceMode, finished]);

  function beginListening(step: DialogueStep, gen: number) {
    if (!recSupported || gen !== genRef.current) return;
    const rec = createRecognizer();
    if (!rec) return;

    // Handler'ları start'tan ÖNCE bağla (bazı tarayıcılarda yarış olmasın)
    rec.onresult = (e) => {
      if (gen !== genRef.current) return;
      const text = e.results[0][0].transcript;
      const replies = step.replies ?? [];
      let bestIdx = 0;
      let bestScore = -1;
      let weakWords: string[] = [];
      replies.forEach((r, i) => {
        const analysis = analyzePronunciation(r.en, text);
        if (analysis.overall > bestScore) {
          bestScore = analysis.overall;
          bestIdx = i;
          weakWords = analysis.weakWords;
        }
      });
      setHeard({ text, matchedIdx: bestIdx, score: bestScore, weakWords });
      setChoices((c) => ({ ...c, [stepIdx]: bestIdx }));
      stopListening();
      clearAdvanceTimer();
      advanceTimerRef.current = window.setTimeout(() => {
        if (gen !== genRef.current) return;
        advanceToNext();
      }, 1600);
    };
    rec.onerror = () => {
      if (gen === genRef.current) stopListening();
    };
    rec.onend = () => {
      if (gen === genRef.current && recRef.current === rec) setListening(false);
    };

    recRef.current = rec;
    setListening(true);
    try {
      rec.start();
    } catch {
      stopListening();
    }
  }

  function retryListen() {
    const step = scenario?.steps[stepIdx];
    if (step && step.speaker !== "narrator") beginListening(step, genRef.current);
  }

  function toggleVoiceMode() {
    const next = !voiceMode;
    genRef.current++;
    stopListening();
    cancelSpeech();
    clearAdvanceTimer();
    // Açıldığında: stepIdx/voiceMode bağımlı effect mevcut adımı seslendirip dinletecek.
    setVoiceMode(next);
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [stepIdx, choices, finished, heard]);

  if (!scenario) {
    return (
      <div className="card-luxe p-8 text-center">
        <p className="text-muted">Senaryo bulunamadı.</p>
        <Link to="/app/simulator" className="btn-ghost mt-4">Simülatöre dön</Link>
      </div>
    );
  }

  const current = scenario.steps[stepIdx];
  const isLast = stepIdx >= scenario.steps.length - 1;

  function pickReply(idx: number) {
    // Elle seçim: açık mikrofon/zamanlayıcı ile yarışı önle
    genRef.current++;
    stopListening();
    clearAdvanceTimer();
    setChoices((c) => ({ ...c, [stepIdx]: idx }));
  }

  function advanceToNext() {
    setStepIdx((s) => {
      if (s >= scenario!.steps.length - 1) {
        setFinished(true);
        completeScenario(scenario!.slug, mode, heard?.score ?? 65);
        return s;
      }
      return s + 1;
    });
  }

  function advance() {
    clearAdvanceTimer();
    stopListening();
    if (isLast) {
      setFinished(true);
      completeScenario(scenario!.slug, mode);
    } else {
      setStepIdx((s) => s + 1);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <header>
        <Link to="/app/simulator" className="mb-3 inline-flex items-center gap-1 text-sm text-muted hover:text-cognac">
          <ArrowLeft size={15} /> Simülatör
        </Link>
        <h1 className="font-display text-3xl text-espresso md:text-4xl">
          {scenario.emoji} {scenario.titleTr}
        </h1>
        <p className="text-sm text-muted">{scenario.descriptionTr}</p>

        {recSupported ? (
          <button
            onClick={toggleVoiceMode}
            className={cn(
              "mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition",
              voiceMode ? "bg-cognac text-white shadow-soft" : "border border-cognac text-cognac hover:bg-cognac/10",
            )}
          >
            <Mic size={16} />
            {voiceMode ? "Sesli sohbet: Açık" : "Sesli sohbet modu"}
          </button>
        ) : (
          <p className="mt-2 text-xs text-muted">Sesli sohbet için Chrome/Edge kullan.</p>
        )}
        {voiceMode && (
          <p className="mt-1 text-xs text-muted">
            Karşı taraf konuşunca mikrofon otomatik açılır; sen cevabını söyle, uygulama en uygun yanıtı seçer.
          </p>
        )}
      </header>

      <div className="flex flex-col gap-4">
        {scenario.steps.slice(0, stepIdx + 1).map((step, i) => (
          <div key={i} className="flex flex-col gap-3">
            {step.speaker === "narrator" ? (
              <p className="mx-auto rounded-full bg-cream px-4 py-1.5 text-center text-sm italic text-muted">
                {step.tr}
              </p>
            ) : (
              <Bubble who={step.speaker} en={step.en} tr={step.tr} />
            )}

            {/* Bu adım için seçilen cevabı göster */}
            {choices[i] !== undefined && step.replies && (
              <ChosenReply reply={step.replies[choices[i]]} />
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Sesli mod durum çubuğu */}
      {voiceMode && !finished && (listening || heard) && (
        <div
          aria-live="polite"
          className={cn("rounded-2xl px-4 py-3 text-sm", listening ? "bg-plum/10 text-plum" : "bg-cream text-ink")}
        >
          {listening ? (
            <span className="inline-flex items-center gap-2">
              <Mic size={15} className="animate-pulse" /> Dinliyorum… cevabını İngilizce söyle.
            </span>
          ) : heard ? (
            <span>
              Duydum: "<span className="italic">{heard.text}</span>" · telaffuz %{heard.score}
              {heard.weakWords.length > 0 && (
                <span className="mt-1 block text-plum">
                  Zayıf kelimeler: {heard.weakWords.join(", ")} — ELSA ile ısınmayı dene.
                </span>
              )}
            </span>
          ) : null}
        </div>
      )}

      {/* Sesli modda dinleme bittiyse ve seçim yapılmadıysa: tekrar dinle */}
      {voiceMode && !finished && !listening && current?.replies?.length && choices[stepIdx] === undefined && (
        <button onClick={retryListen} className="btn-ghost self-start !px-4 !py-2 text-sm">
          <Mic size={15} /> Tekrar dinle
        </button>
      )}

      {/* Etkileşim alanı */}
      {!finished && (
        <div className="card-luxe p-5">
          {current?.replies?.length && choices[stepIdx] === undefined ? (
            <>
              <p className="mb-3 text-sm font-medium text-cognac">
                {voiceMode ? "Cevabını söyle (ya da dokunarak seç)" : "Sen ne dersin? (en uygun cevabı seç)"}
              </p>
              <div className="flex flex-col gap-2">
                {current.replies.map((r, idx) => (
                  <button
                    key={idx}
                    onClick={() => pickReply(idx)}
                    className="rounded-2xl border border-line bg-paper px-4 py-3 text-left transition hover:border-cognac"
                  >
                    <span className="block font-medium text-espresso">{r.en}</span>
                    <span className="block text-sm text-muted">{r.tr}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-3">
              {current && current.speaker !== "narrator" ? (
                <MicButton target={getSpokenTarget(current.replies, choices[stepIdx])} />
              ) : (
                <span className="text-sm text-muted">Hazırsan devam et.</span>
              )}
              <button onClick={advance} className="btn-primary">
                {isLast ? "Bitir 🎉" : "Devam →"}
              </button>
            </div>
          )}
        </div>
      )}

      {finished && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-luxe bg-gradient-to-br from-espresso to-mocha p-8 text-center text-ivory"
        >
          <PartyPopper className="mx-auto mb-3 text-gold" size={36} />
          <h2 className="font-display text-3xl">Tebrikler!</h2>
          <p className="mt-2 text-ivory/80">
            "{scenario.titleTr}" senaryosunu tamamladın. {progress?.scenariosDone.includes(scenario.slug) ? "+30 XP kazandın." : ""}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => {
                setStepIdx(0);
                setChoices({});
                setFinished(false);
              }}
              className="btn-gold"
            >
              Tekrar oyna
            </button>
            <Link to="/app/simulator" className="btn-ghost bg-ivory/10 text-ivory">
              Diğer senaryolar
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function getSpokenTarget(replies: ReplyOption[] | undefined, choiceIdx: number | undefined): string {
  if (replies && choiceIdx !== undefined) return replies[choiceIdx].en;
  return "";
}

function Bubble({ who, en, tr }: { who: "client" | "manager"; en: string; tr: string }) {
  const isManager = who === "manager";
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-3">
      <div
        className={cn(
          "grid h-10 w-10 shrink-0 place-items-center rounded-full text-lg",
          isManager ? "bg-olive text-white" : "bg-cognac text-white",
        )}
      >
        {isManager ? "🧑‍💼" : "🙋"}
      </div>
      <div className="max-w-[80%] rounded-2xl rounded-tl-sm border border-line bg-paper p-4">
        <p className="font-medium text-espresso">{en}</p>
        <p className="mt-1 text-sm text-muted">{tr}</p>
        <SpeakButton text={en} className="mt-2" />
      </div>
    </motion.div>
  );
}

function ChosenReply({ reply }: { reply: ReplyOption }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-end gap-3">
      <div
        className={cn(
          "max-w-[80%] rounded-2xl rounded-tr-sm p-4 text-white",
          reply.best ? "bg-sage" : "bg-plum",
        )}
      >
        <p className="font-medium">{reply.en}</p>
        <p className="mt-1 text-sm text-white/80">{reply.tr}</p>
        {reply.feedbackTr && (
          <p className="mt-2 rounded-lg bg-white/15 px-2 py-1 text-xs">
            {reply.best ? "✓ " : "💡 "}
            {reply.feedbackTr}
          </p>
        )}
      </div>
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-espresso text-white">H</div>
    </motion.div>
  );
}
