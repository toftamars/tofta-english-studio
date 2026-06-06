export interface BadgeDef {
  id: string;
  emoji: string;
  title: string;
  descTr: string;
}

export const BADGES: BadgeDef[] = [
  { id: "first-unit", emoji: "🌱", title: "First Steps", descTr: "İlk üniteni tamamladın." },
  { id: "halfway", emoji: "⭐", title: "Halfway There", descTr: "5 üniteyi bitirdin." },
  { id: "all-units", emoji: "👑", title: "Maison Master", descTr: "Tüm üniteleri tamamladın." },
  { id: "streak-3", emoji: "🔥", title: "On Fire", descTr: "3 günlük seri." },
  { id: "streak-7", emoji: "💎", title: "Diamond Streak", descTr: "7 günlük seri." },
  { id: "first-scenario", emoji: "🎭", title: "Role Player", descTr: "İlk simülasyonu oynadın." },
  { id: "role-player", emoji: "🎬", title: "Showtime", descTr: "5 simülasyon tamamladın." },
  { id: "xp-300", emoji: "🚀", title: "Rising Star", descTr: "300 XP'ye ulaştın." },
];

export function badgeById(id: string): BadgeDef | undefined {
  return BADGES.find((b) => b.id === id);
}
