import type { Product, RadarNote, StudyCard } from "../types";

// ============================================================
// Ürünler ve insider notlardan otomatik çalışma kartı üretir.
//  Tamamen şablon tabanlı ve deterministik (API yok). Kartlar:
//  flashcard (terim), quiz (çoktan seçmeli), dialogue (mini rol).
// ============================================================

const FALLBACK_MATERIALS = [
  "Monogram canvas",
  "Damier Ebene canvas",
  "Epi leather",
  "Taurillon leather",
  "Empreinte leather",
];

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed || 1;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function cardsFromProduct(p: Product, allMaterials: string[], idx: number): StudyCard[] {
  const cards: StudyCard[] = [];

  // 1) Flashcard — isim + kullanıcı özeti / malzeme
  cards.push({
    id: `p-${p.id}-flash`,
    kind: "flashcard",
    source: "product",
    topic: p.name,
    front: p.name,
    back: p.summary || [p.material, p.priceText, p.origin].filter(Boolean).join(" · ") || p.category || "—",
    speak: p.name,
  });

  // 2) Quiz — malzeme sorusu (malzeme varsa)
  if (p.material) {
    const distractors = [...allMaterials.filter((m) => m !== p.material), ...FALLBACK_MATERIALS]
      .filter((m, i, arr) => m && m !== p.material && arr.indexOf(m) === i)
      .slice(0, 3);
    const options = seededShuffle([p.material, ...distractors], idx + 7);
    cards.push({
      id: `p-${p.id}-quiz`,
      kind: "quiz",
      source: "product",
      topic: p.name,
      front: `What is the ${p.name} made of?`,
      back: p.material,
      speak: `What is the ${p.name} made of?`,
      options,
      answerIndex: options.indexOf(p.material),
    });
  }

  // 3) Dialogue — müşteriye ürünü tanıtma
  const desc = [
    p.material ? `It is made of ${p.material}.` : "",
    p.origin ? `It is crafted in ${p.origin}.` : "",
    p.priceText ? `The price is ${p.priceText}.` : "",
  ]
    .filter(Boolean)
    .join(" ");
  cards.push({
    id: `p-${p.id}-dlg`,
    kind: "dialogue",
    source: "product",
    topic: p.name,
    front: `Müşteriye "${p.name}" ürününü tanıt`,
    back: "Aşağıdaki diyaloğu sesli tekrar et.",
    dialogue: [
      { speaker: "Client", text: `Could you tell me about the ${p.name}?` },
      { speaker: "You", text: `Of course. This is the ${p.name}. ${desc} Would you like to see it?` },
    ],
  });

  return cards;
}

function cardFromNote(n: RadarNote): StudyCard {
  return {
    id: `n-${n.id}-flash`,
    kind: "flashcard",
    source: "note",
    topic: n.title,
    front: n.title,
    back: n.body,
    speak: n.title,
  };
}

export function generateStudyCards(products: Product[], notes: RadarNote[]): StudyCard[] {
  const allMaterials = products.map((p) => p.material).filter((m): m is string => Boolean(m));
  const productCards = products.flatMap((p, i) => cardsFromProduct(p, allMaterials, i));
  const noteCards = notes.map(cardFromNote);
  // Karışık ama deterministik bir sıra
  return [...productCards, ...noteCards];
}
