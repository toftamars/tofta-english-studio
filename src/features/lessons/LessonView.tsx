import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Theater } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useProgress } from "../../context/ProgressContext";
import { getUnits } from "../../data";
import type { LessonSectionKind, Unit } from "../../types";
import {
  GrammarSection,
  ListeningSection,
  PhrasesSection,
  QuizSection,
  SectionDoneBar,
  SpeakingSection,
  VocabSection,
  WritingSection,
} from "./LessonSections";
import { cancelSpeech } from "../../lib/speech";
import { cn } from "../../lib/cn";

const SECTION_LABELS: Record<LessonSectionKind, string> = {
  phrases: "İfadeler",
  vocab: "Kelime",
  grammar: "Dilbilgisi",
  listening: "Dinleme",
  speaking: "Konuşma",
  writing: "Yazma",
  quiz: "Quiz",
};

function availableSections(unit: Unit): LessonSectionKind[] {
  const list: LessonSectionKind[] = [];
  if (unit.phrases?.length) list.push("phrases");
  if (unit.vocab?.length) list.push("vocab");
  if (unit.grammar) list.push("grammar");
  if (unit.listening?.length) list.push("listening");
  if (unit.speaking?.length) list.push("speaking");
  if (unit.writing) list.push("writing");
  if (unit.quiz?.length) list.push("quiz");
  return list;
}

export function LessonView() {
  const { slug } = useParams();
  const { user } = useAuth();
  const { completeSection, recordQuiz, isSectionDone } = useProgress();
  const units = user ? getUnits(user.profileId) : [];
  const index = units.findIndex((u) => u.slug === slug);
  const unit = units[index];

  const sections = useMemo(() => (unit ? availableSections(unit) : []), [unit]);
  const [active, setActive] = useState<LessonSectionKind>(sections[0] ?? "vocab");

  useEffect(() => {
    setActive(sections[0] ?? "vocab");
    window.scrollTo(0, 0);
    return () => cancelSpeech();
  }, [slug, sections]);

  if (!unit) {
    return (
      <div className="card-luxe p-8 text-center">
        <p className="text-muted">Ünite bulunamadı.</p>
        <Link to="/app/lessons" className="btn-ghost mt-4">Derslere dön</Link>
      </div>
    );
  }

  const total = sections.length;
  const prev = units[index - 1];
  const next = units[index + 1];

  return (
    <div className="flex flex-col gap-6">
      <header>
        <Link to="/app/lessons" className="mb-3 inline-flex items-center gap-1 text-sm text-muted hover:text-cognac">
          <ArrowLeft size={15} /> Tüm dersler
        </Link>
        <p className="eyebrow">Ünite {unit.id} / {units.length}</p>
        <h1 className="font-display text-4xl text-espresso md:text-5xl">
          {unit.emoji} {unit.title}
        </h1>
        <p className="font-serif text-lg italic text-muted">{unit.titleTr}</p>
        <div className="mt-3 rounded-2xl border-l-4 border-cognac bg-paper p-3 text-sm">🎯 {unit.goalTr}</div>
      </header>

      <div className="flex flex-wrap gap-2">
        {sections.map((s) => (
          <button
            key={s}
            onClick={() => setActive(s)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition",
              active === s ? "border-cognac bg-cognac text-white" : "border-line bg-paper hover:border-cognac",
              isSectionDone(unit.slug, s) && active !== s && "border-sage/40",
            )}
          >
            {isSectionDone(unit.slug, s) && "✓ "}
            {SECTION_LABELS[s]}
          </button>
        ))}
      </div>

      <div>
        {active === "phrases" && <PhrasesSection unit={unit} />}
        {active === "vocab" && <VocabSection unit={unit} />}
        {active === "grammar" && <GrammarSection unit={unit} />}
        {active === "listening" && <ListeningSection unit={unit} />}
        {active === "speaking" && <SpeakingSection unit={unit} />}
        {active === "writing" && <WritingSection unit={unit} />}
        {active === "quiz" && (
          <QuizSection unit={unit} onScore={(score) => recordQuiz(unit.slug, score, total)} />
        )}

        {active !== "quiz" && (
          <SectionDoneBar
            done={isSectionDone(unit.slug, active)}
            onDone={() => completeSection(unit.slug, active, total)}
          />
        )}
      </div>

      {unit.scenarioSlug && (
        <Link
          to={`/app/simulator/${unit.scenarioSlug}`}
          className="card-luxe flex items-center gap-3 bg-gradient-to-br from-espresso to-mocha p-5 text-ivory transition hover:-translate-y-0.5"
        >
          <Theater className="text-gold" />
          <span className="flex-1">
            <span className="block font-serif text-lg">Bu üniteyi simülasyonda dene</span>
            <span className="block text-sm text-ivory/70">Gerçek bir diyalogla pratik yap</span>
          </span>
          <ArrowRight />
        </Link>
      )}

      <div className="flex items-center justify-between gap-3">
        {prev ? (
          <Link to={`/app/lessons/${prev.slug}`} className="btn-ghost">
            <ArrowLeft size={16} /> Önceki
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/app/lessons/${next.slug}`} className="btn-primary">
            Sonraki <ArrowRight size={16} />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
