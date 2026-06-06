import { Link } from "react-router-dom";
import { ExternalLink, Sparkles } from "lucide-react";

const STACK = [
  {
    name: "Tofta English Studio",
    role: "LV mağaza pratiği",
    daily: "15 dk — alıştırma + 1 ders + 1 senaryo",
    internal: true,
    href: "/app/drill",
  },
  {
    name: "Duolingo",
    role: "Genel grammar & alışkanlık",
    daily: "10 dk — günlük streak",
    href: "https://www.duolingo.com/",
  },
  {
    name: "ELSA Speak",
    role: "Telaffuz & fonetik",
    daily: "5 dk — haftada 3× ısınma",
    href: "https://elsaspeak.com/",
  },
  {
    name: "Preply / italki",
    role: "Canlı konuşma (opsiyonel)",
    daily: "Haftada 1 saat — Tofta'da öğrendiklerini test et",
    href: "https://preply.com/",
  },
];

export function LearningStackPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="eyebrow">Madde 9 — Öğrenme stack&apos;in</p>
        <h1 className="font-display text-3xl text-espresso">Tam Öğrenme Planın</h1>
        <p className="mt-1 text-sm text-muted">
          Tofta genel dil uygulaması değil — <b>Louis Vuitton Client Advisor antrenörün</b>.
          En iyi sonuç için bu araçları birlikte kullan.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {STACK.map((item) =>
          item.internal ? (
            <Link
              key={item.name}
              to={item.href}
              className="card-luxe flex flex-col gap-1 p-5 transition hover:shadow-soft"
            >
              <span className="flex items-center gap-2 font-serif text-xl text-espresso">
                <Sparkles size={18} className="text-cognac" /> {item.name}
              </span>
              <span className="text-sm font-medium text-cognac">{item.role}</span>
              <span className="text-sm text-muted">{item.daily}</span>
            </Link>
          ) : (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card-luxe flex flex-col gap-1 p-5 transition hover:shadow-soft"
            >
              <span className="flex items-center gap-2 font-serif text-xl text-espresso">
                {item.name} <ExternalLink size={16} className="text-muted" />
              </span>
              <span className="text-sm font-medium text-cognac">{item.role}</span>
              <span className="text-sm text-muted">{item.daily}</span>
            </a>
          ),
        )}
      </div>

      <div className="rounded-2xl bg-cream/80 p-4 text-sm text-muted">
        <p className="font-medium text-espresso">Neden stack?</p>
        <p className="mt-1">
          Duolingo milyonlarca kullanıcıya grammar öğretir; ELSA telaffuz uzmanıdır; Tofta ise
          İstinye Park&apos;ta gerçek müşteri cümlelerini prova ettirir. Hiçbiri tek başına yeterli değil —
          birlikte <b>8–9/10</b> iş hedefi mümkün.
        </p>
      </div>
    </div>
  );
}

export function LearningStackCard() {
  return (
    <Link to="/app/stack" className="card-luxe block p-5 transition hover:shadow-soft">
      <p className="eyebrow mb-1">Öğrenme stack&apos;in</p>
      <p className="font-serif text-lg text-espresso">Tofta + Duolingo + ELSA</p>
      <p className="text-sm text-muted">LV pratik burada; grammar ve telaffuz için tam plan →</p>
    </Link>
  );
}
