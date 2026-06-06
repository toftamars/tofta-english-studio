# English Studio 🇬🇧✨

Kapalı aile kullanımı için tasarlanmış, **neşeli ve etkili** bir İngilizce öğrenme platformu.
Lüks perakende ve günlük/sosyal İngilizce pratiğine odaklanır — müşteri ve yönetici diyalogları,
rol-yapma simülatörü ve oyunlaştırma tek arayüzde.

> **Konumlandırma:** Genel dil uygulaması değil — **mağaza / client advisor antrenörü**.
> Genel grammar için Duolingo, telaffuz için ELSA ile birlikte kullanılmak üzere tasarlandı
> (uygulama içi **Öğrenme stack** rehberi).

---

## ✨ Özellikler

- **31 ünite müfredat (A2–B1):** Work (18), Daily (6), Social (6) — satış seremonisinden günlük hayata.
- **Alıştırma merkezi:** 400+ kelime/cümle havuzu, 6 egzersiz türü, katalog ürünlerinden dinamik kartlar.
- **Rol-Yapma Simülatörü:** 100+ senaryo + opsiyonel AI bonus diyalog (gpt-4o-mini, günlük limit).
- **Sesli çalışma:** Tarayıcı TTS + opsiyonel ElevenLabs premium ses; kelime bazlı telaffuz skoru.
- **PWA:** Ana ekrana ekle, offline drill/ders cache.
- **Test & CI:** 30+ Vitest, Playwright E2E (login, drill, simülatör).
- **Her beceri:** İfadeler · Kelime kartları · Dilbilgisi · Dinleme · Konuşma · Yazma · Quiz.
- **Oyunlaştırma:** XP, seviye, günlük seri ve rozetlerle motivasyon.
- **Gelişim takibi:** İlerleme grafikleri, tamamlanan üniteler, kazanılan rozetler.
- **Login sistemi:** Yerel (PIN) veya bulut (Supabase) modu.

---

## 🚪 Nasıl giriş yapılır?

1. Siteyi aç → profilini seç.
2. **Yerel mod** (varsayılan): PIN gir (yerel kurulumda tanımlı).
3. **Bulut mod** (Supabase kurulduğunda): e-posta + şifre. Kayıt için davet kodu gerekir
   (uygulama yapılandırmasında tanımlı).

---

## 🧱 Teknik Mimari

| Katman | Teknoloji |
|---|---|
| UI | React 19 + TypeScript + Vite |
| Stil | Tailwind CSS (editoryal-lüks tema) |
| Animasyon | Framer Motion |
| Yönlendirme | React Router (HashRouter — Pages uyumlu) |
| Auth & Veri | Supabase (opsiyonel) · yoksa localStorage |
| Grafik | Recharts |
| Yayın | GitHub Pages + GitHub Actions |

**Klasör yapısı** özellik-bazlı ve modülerdir:

```
src/
  lib/        → speech, supabase, storage, yardımcılar
  types/      → ortak tip tanımları
  data/       → müfredat, senaryolar, profiller, rozetler
  context/    → AuthContext, ProgressContext
  components/ → Layout + UI bileşenleri
  features/   → auth · dashboard · lessons · simulator · progress
research/     → domain araştırma notları (içerik kaynağı)
prototype/    → ilk (v1) statik prototip — arşiv
```

Veri katmanı `lib/storage.ts` ile soyutlanmıştır: ilerleme yerelde `localStorage`,
bulut modunda Supabase'e yazar.

---

## 💻 Yerel geliştirme

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production derleme
npm run preview    # derlemeyi önizle
npm run test       # unit testler
npm run test:e2e   # Playwright E2E
```

---

## ☁️ Supabase (bulut giriş + senkron) — opsiyonel

1. Supabase projesi oluştur.
2. `Project Settings → API` → **Project URL** ve **anon public key**.
3. Yerelde: `.env.example` → `.env` kopyala, değerleri gir.
4. Yayında: GitHub repo → **Settings → Secrets and variables → Actions** →
   `VITE_SUPABASE_URL` ve `VITE_SUPABASE_ANON_KEY`.
5. Tablolar (`progress`, `radar_notes`, `products`) ve `product-photos` deposu.
   RLS açık; `progress` yalnızca sahibine görünür.

Tanımlı değilse uygulama **yerel modda** çalışır.

### Premium ses ve AI (opsiyonel)

| Secret | Açıklama |
|--------|----------|
| `VITE_ELEVENLABS_API_KEY` | Premium TTS — Ayarlar → Ses motoru |
| `VITE_ELEVENLABS_VOICE_ID` | ElevenLabs ses ID (opsiyonel) |
| `VITE_OPENAI_API_KEY` | AI Bonus Diyalog — `/app/simulator/ai-bonus` |

Anahtarları [ElevenLabs](https://elevenlabs.io/) ve [OpenAI](https://platform.openai.com/) panellerinden alın.
GitHub Pages build'inde secret tanımlıysa production'da da aktif olur.

---

## 🔒 Güvenlik notu (bulut mod)

Davet kodu istemci tarafındadır; tek başına yeterli koruma değildir. Kapalı kullanım için Supabase panelinde:

1. **Açık kaydı kapat:** `Authentication → Sign In / Providers → Email` → *Allow new users to sign up* kapalı.
2. **Sızdırılmış parola korumasını aç:** *Leaked password protection* (HaveIBeenPwned).

RLS ile ilerleme zaten kullanıcıya kilitlidir; bu adımlar ek güvenlik sağlar.

---

## 🚀 Yayın (GitHub Pages)

`main` dalına push'ta GitHub Actions derler ve Pages'e yayınlar.
Canlı URL, repo **Settings → Pages** altında görünür.

---

## 🗺️ Yol haritası

- [x] 1. Faz — Work müfredatı, simülatör, sesli çalışma, oyunlaştırma
- [x] Alıştırma merkezi (drill) + 400+ havuz
- [x] PWA (offline cache, A2HS) + mobil nav
- [x] CI + Vitest 30+ + Playwright E2E
- [x] ElevenLabs TTS + telaffuz kelime skoru
- [x] Adaptif zayıf beceri yönlendirme + öğrenme stack UI
- [x] 31 ünite + AI bonus diyalog
- [x] 2. Faz — İkinci profil müfredatı (temel)
- [ ] Supabase bulut girişi + cihazlar arası senkron (kurulum rehberi hazır)
