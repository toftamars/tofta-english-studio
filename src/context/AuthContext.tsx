import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AuthUser, ProfileId } from "../types";
import { PROFILES } from "../data";
import { isCloudEnabled, supabase } from "../lib/supabase";

// ============================================================
// Kimlik Doğrulama (Auth) — çift modlu, modüler
//  - Bulut modu (Supabase env hazırsa): gerçek e-posta/şifre girişi
//    + davet kodu ile kayıt.
//  - Yerel mod (env yoksa): profil + PIN ile giriş, cihazda saklanır.
//    Böylece Supabase hazır olana kadar uygulama sorunsuz çalışır.
// ============================================================

const LOCAL_SESSION_KEY = "tofta-english-session";

// Yerel mod PIN'leri (geçici; bulut moduna geçince devre dışı kalır)
const LOCAL_PINS: Record<ProfileId, string> = {
  hulya: "1854", // Louis Vuitton'un kuruluş yılı — kolay hatırlanır
  alper: "0000",
};

// Bulut modunda kayıt için davet kodu (sadece aile kaydolabilsin)
export const INVITE_CODE = "TOFTA2026";

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  cloud: boolean;
  signInLocal(profileId: ProfileId, pin: string): { ok: boolean; error?: string };
  signInCloud(email: string, password: string): Promise<{ ok: boolean; error?: string }>;
  signUpCloud(
    email: string,
    password: string,
    profileId: ProfileId,
    inviteCode: string,
  ): Promise<{ ok: boolean; error?: string }>;
  signOut(): Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function init() {
      if (isCloudEnabled && supabase) {
        const { data } = await supabase.auth.getSession();
        if (active && data.session?.user) {
          setUser(mapSupabaseUser(data.session.user));
        }
        supabase.auth.onAuthStateChange((_e, session) => {
          setUser(session?.user ? mapSupabaseUser(session.user) : null);
        });
      } else {
        try {
          const raw = localStorage.getItem(LOCAL_SESSION_KEY);
          if (raw && active) setUser(JSON.parse(raw));
        } catch {
          /* yoksay */
        }
      }
      if (active) setLoading(false);
    }

    init();
    return () => {
      active = false;
    };
  }, []);

  function signInLocal(profileId: ProfileId, pin: string) {
    if (!PROFILES[profileId].available) {
      return { ok: false, error: "Bu profil henüz açık değil (2. fazda)." };
    }
    if (LOCAL_PINS[profileId] !== pin) {
      return { ok: false, error: "PIN hatalı." };
    }
    const u: AuthUser = {
      id: `local-${profileId}`,
      profileId,
      displayName: PROFILES[profileId].name,
    };
    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(u));
    setUser(u);
    return { ok: true };
  }

  async function signInCloud(email: string, password: string) {
    if (!supabase) return { ok: false, error: "Bulut modu kapalı." };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  }

  async function signUpCloud(
    email: string,
    password: string,
    profileId: ProfileId,
    inviteCode: string,
  ) {
    if (!supabase) return { ok: false, error: "Bulut modu kapalı." };
    if (inviteCode !== INVITE_CODE) return { ok: false, error: "Davet kodu hatalı." };
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { profile_id: profileId, display_name: PROFILES[profileId].name } },
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  }

  async function signOut() {
    if (isCloudEnabled && supabase) await supabase.auth.signOut();
    localStorage.removeItem(LOCAL_SESSION_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, cloud: isCloudEnabled, signInLocal, signInCloud, signUpCloud, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function mapSupabaseUser(u: { id: string; email?: string; user_metadata?: Record<string, unknown> }): AuthUser {
  const profileId = (u.user_metadata?.profile_id as ProfileId) || "hulya";
  return {
    id: u.id,
    email: u.email,
    profileId,
    displayName: (u.user_metadata?.display_name as string) || PROFILES[profileId].name,
  };
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
