import type { RadarData } from "../types";
import { RADAR_SEED } from "../data/radar";
import { cacheRadarForPool } from "./radarPool";

// ============================================================
// Maison Radar — haber yükleyici
//  public/radar.json (cron tarafından güncellenir) okunur.
//  Dosya yoksa / hata olursa seed içerik kullanılır; uygulama
//  her zaman dolu görünür. Tamamen yasal, halka açık RSS verisi.
// ============================================================

let cache: RadarData | null = null;

export async function loadRadar(): Promise<RadarData> {
  if (cache) return cache;
  try {
    const base = import.meta.env.BASE_URL || "/";
    const res = await fetch(`${base}radar.json`, { cache: "no-cache" });
    if (!res.ok) throw new Error(`radar.json ${res.status}`);
    const data = (await res.json()) as RadarData;
    if (!data?.news?.length) throw new Error("boş radar");
    cache = data;
    cacheRadarForPool(data);
    return data;
  } catch {
    cacheRadarForPool(RADAR_SEED);
    return RADAR_SEED;
  }
}

/** "x gün önce" / "bugün" gibi göreli zaman (TR). */
export function timeAgoTr(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diff = Date.now() - then;
  const day = Math.floor(diff / 86400000);
  if (day <= 0) return "bugün";
  if (day === 1) return "dün";
  if (day < 7) return `${day} gün önce`;
  if (day < 30) return `${Math.floor(day / 7)} hafta önce`;
  return new Date(iso).toLocaleDateString("tr-TR", { day: "numeric", month: "long" });
}
