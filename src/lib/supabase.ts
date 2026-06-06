// ============================================================
// Supabase istemcisi (opsiyonel)
//  - Ortam değişkenleri (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY)
//    tanımlıysa gerçek bulut modu aktif olur.
//  - Tanımlı değilse uygulama YEREL modda çalışır (login + ilerleme
//    cihazda saklanır). Böylece Supabase hazır olana kadar uygulama
//    sorunsuz çalışır ve hazır olunca tek satır env ile buluta geçer.
// ============================================================
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isCloudEnabled = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isCloudEnabled
  ? createClient(url as string, anonKey as string)
  : null;
