import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useMode } from "../../context/ModeContext";
import { useProgress } from "../../context/ProgressContext";
import { PROFILES } from "../../data";
import { cefrLabel } from "../../data/modes";
import { getUnits, getScenarios } from "../../data";
import type { LearningMode } from "../../types";
import { cn } from "../../lib/cn";

export function ModePickerPage() {
  const { user } = useAuth();
  const { setMode, modes, modeSelected, modeMeta } = useMode();
  const { progress } = useProgress();
  const navigate = useNavigate();
  if (!user) return null;
  const profile = PROFILES[user.profileId];
  const cefr = progress?.adaptive?.cefrBand ?? "A2";

  function pick(mode: LearningMode) {
    setMode(mode);
    navigate("/app");
  }

  return (
    <div className="relative min-h-screen px-4 py-10 md:px-8">
      <div className="grain" />
      <div className="relative z-10 mx-auto flex max-w-2xl flex-col gap-8">
        {modeSelected && (
          <button
            type="button"
            onClick={() => navigate("/app")}
            className="inline-flex items-center gap-1 self-start text-sm font-medium text-muted transition hover:text-cognac"
          >
            <ArrowLeft size={16} /> Panele dön ({modeMeta.label})
          </button>
        )}

        <header className="text-center">
          <p className="eyebrow">Mod seç</p>
          <h1 className="font-display text-4xl text-espresso md:text-5xl">
            Merhaba {profile.name}, <span className="font-serif italic text-cognac">nasıl çalışalım?</span>
          </h1>
          <p className="mt-2 text-sm text-muted">
            Gerçek seviyen: <b className="text-cognac">{cefrLabel(cefr)}</b> — sistem sen yükseldikçe içeriği açar.
          </p>
          <p className="mt-1 text-xs text-muted">
            Tofta LV pratik antrenörüdür; genel grammar için Duolingo, telaffuz için ELSA önerilir.{" "}
            <button
              type="button"
              onClick={() => {
                if (!modeSelected) setMode("work");
                navigate("/app/stack");
              }}
              className="font-semibold text-cognac underline"
            >
              Öğrenme stack&apos;in →
            </button>
          </p>
        </header>

        <div className="flex flex-col gap-4">
          {modes.map((m, i) => {
            const unitCount = getUnits(user.profileId, m.id, cefr).length;
            const scenarioCount = getScenarios(user.profileId, m.id, cefr).length;
            return (
              <motion.button
                key={m.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => pick(m.id)}
                className={cn(
                  "card-luxe group flex items-center gap-4 p-5 text-left transition hover:-translate-y-0.5",
                  modeSelected && modeMeta.id === m.id && "ring-2 ring-cognac/40",
                )}
              >
                <span
                  className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-2xl"
                  style={{ background: `${m.accent}22` }}
                >
                  {m.emoji}
                </span>
                <span className="flex-1">
                  <span className="flex items-center gap-2">
                    <span className="font-serif text-xl text-espresso">{m.label}</span>
                    <span className="text-sm text-muted">· {m.labelTr}</span>
                  </span>
                  <span className="mt-1 block text-sm text-muted">{m.descriptionTr}</span>
                  <span className="mt-2 inline-flex gap-2 text-xs text-cognac">
                    {unitCount} ders · {scenarioCount} senaryo
                  </span>
                </span>
                <ArrowRight className={cn("shrink-0 text-muted transition group-hover:text-cognac")} />
              </motion.button>
            );
          })}
        </div>

        <p className="text-center text-xs text-muted">
          {modeSelected
            ? "Başka bir mod seç veya panele geri dön."
            : "Modu istediğin zaman üst başlıktaki etikete veya menüden değiştirebilirsin."}
        </p>
      </div>
    </div>
  );
}
