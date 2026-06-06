import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Sparkles } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { PROFILE_LIST } from "../../data";
import type { ProfileId } from "../../types";
import { cn } from "../../lib/cn";

export function LoginPage() {
  const { cloud, signInLocal, signInCloud, signUpCloud } = useAuth();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<ProfileId | null>(null);
  const [pin, setPin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invite, setInvite] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit() {
    setError("");
    if (!selected) {
      setError("Lütfen önce bir profil seçin.");
      return;
    }
    setBusy(true);
    try {
      if (cloud) {
        const res =
          mode === "signin"
            ? await signInCloud(email, password)
            : await signUpCloud(email, password, selected, invite);
        if (!res.ok) setError(res.error || "Bir hata oluştu.");
        else if (mode === "signup") setError("Kayıt başarılı! E-postanı doğrulayıp giriş yapabilirsin.");
        else navigate("/app");
      } else {
        const res = signInLocal(selected, pin);
        if (!res.ok) setError(res.error || "Giriş başarısız.");
        else navigate("/app");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative grid min-h-screen place-items-center px-4 py-12">
      <div className="grain" />
      <div className="z-10 w-full max-w-3xl">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center"
        >
          <p className="eyebrow mb-3">Tofta Ailesine Özel</p>
          <h1 className="font-display text-6xl leading-none text-espresso md:text-7xl">
            English<span className="block font-serif italic text-cognac">Studio</span>
          </h1>
          <p className="mt-4 flex items-center justify-center gap-2 text-muted">
            <Sparkles size={16} className="text-gold" />
            Louis Vuitton'a özel · neşeli · etkili İngilizce
          </p>
        </motion.header>

        <div className="grid gap-4 sm:grid-cols-2">
          {PROFILE_LIST.map((p, i) => (
            <motion.button
              key={p.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
              disabled={!p.available}
              onClick={() => p.available && setSelected(p.id)}
              className={cn(
                "card-luxe relative overflow-hidden p-6 text-left transition",
                p.available ? "hover:-translate-y-1" : "opacity-60",
                selected === p.id && "ring-2 ring-cognac",
              )}
            >
              <div
                className="mb-3 grid h-14 w-14 place-items-center rounded-full font-serif text-3xl text-white"
                style={{ background: p.accent }}
              >
                {p.name[0]}
              </div>
              <p className="font-serif text-2xl text-espresso">{p.name}</p>
              <p className="text-sm text-muted">{p.role}</p>
              {!p.available && (
                <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-cream px-2.5 py-1 text-xs text-muted">
                  <Lock size={12} /> 2. faz
                </span>
              )}
            </motion.button>
          ))}
        </div>

        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-luxe mx-auto mt-6 max-w-md p-6"
          >
            {cloud ? (
              <div className="flex flex-col gap-3">
                <div className="flex gap-2 text-sm">
                  <button
                    onClick={() => setMode("signin")}
                    className={cn("flex-1 rounded-xl py-2", mode === "signin" ? "bg-espresso text-ivory" : "bg-cream")}
                  >
                    Giriş
                  </button>
                  <button
                    onClick={() => setMode("signup")}
                    className={cn("flex-1 rounded-xl py-2", mode === "signup" ? "bg-espresso text-ivory" : "bg-cream")}
                  >
                    Kayıt
                  </button>
                </div>
                <input
                  className="rounded-xl border border-line bg-paper px-4 py-3"
                  placeholder="E-posta"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="rounded-xl border border-line bg-paper px-4 py-3"
                  placeholder="Şifre"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {mode === "signup" && (
                  <input
                    className="rounded-xl border border-line bg-paper px-4 py-3"
                    placeholder="Davet kodu"
                    value={invite}
                    onChange={(e) => setInvite(e.target.value)}
                  />
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <label className="text-sm text-muted">PIN ile giriş yap</label>
                <input
                  className="rounded-xl border border-line bg-paper px-4 py-3 text-center text-2xl tracking-[0.5em]"
                  placeholder="••••"
                  inputMode="numeric"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
                <p className="text-center text-xs text-muted">İpucu: Louis Vuitton'un kuruluş yılı 😉</p>
              </div>
            )}

            {error && <p className="mt-3 text-center text-sm text-plum">{error}</p>}

            <button onClick={handleSubmit} disabled={busy} className="btn-primary mt-4 w-full">
              {busy ? "..." : "Çalışmaya başla"}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
