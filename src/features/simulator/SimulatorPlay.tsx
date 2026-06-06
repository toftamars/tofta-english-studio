import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, PartyPopper } from "lucide-react";
import { getScenario } from "../../data";
import { useProgress } from "../../context/ProgressContext";
import type { ReplyOption } from "../../types";
import { SpeakButton } from "../../components/ui/SpeakButton";
import { MicButton } from "../../components/ui/MicButton";
import { speak, cancelSpeech } from "../../lib/speech";
import { cn } from "../../lib/cn";

export function SimulatorPlay() {
  const { slug } = useParams();
  const scenario = slug ? getScenario(slug) : undefined;
  const { completeScenario, progress } = useProgress();

  const [stepIdx, setStepIdx] = useState(0);
  const [choices, setChoices] = useState<Record<number, number>>({});
  const [finished, setFinished] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStepIdx(0);
    setChoices({});
    setFinished(false);
    window.scrollTo(0, 0);
    return () => cancelSpeech();
  }, [slug]);

  // En son konuşma satırını otomatik seslendir
  useEffect(() => {
    const step = scenario?.steps[stepIdx];
    if (step && step.speaker !== "narrator") speak(step.en);
  }, [stepIdx, scenario]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [stepIdx, choices, finished]);

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
    setChoices((c) => ({ ...c, [stepIdx]: idx }));
  }

  function advance() {
    if (isLast) {
      setFinished(true);
      completeScenario(scenario!.slug);
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

      {/* Etkileşim alanı */}
      {!finished && (
        <div className="card-luxe p-5">
          {current?.replies?.length && choices[stepIdx] === undefined ? (
            <>
              <p className="mb-3 text-sm font-medium text-cognac">Sen ne dersin? (en uygun cevabı seç)</p>
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
