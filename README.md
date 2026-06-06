# Tofta English Studio 🇬🇧✨

Louis Vuitton'a özel, **neşeli ve etkili** bir İngilizce öğrenme platformu.
Hülya'nın hem **müşterilerle** hem **yöneticilerle** her an İngilizce konuşmaya hazır
olması için tasarlandı. Alper'in müzik & perakende programı **2. fazda** aktif.

> **Konumlandırma:** Tofta genel dil uygulaması değil — **Louis Vuitton Client Advisor antrenörü**.
> Genel grammar için Duolingo, telaffuz için ELSA ile birlikte kullanılmak üzere tasarlandı
> (uygulama içi **Öğrenme stack** rehberi).

> Klasik sıkıcı İngilizce kurslarından farklı: gerçek mağaza senaryoları,
> rol-yapma simülatörü, sesli çalışma, oyunlaştırma (XP, seri, rozetler) ve
> Louis Vuitton mirası — hepsi tek bir zarif arayüzde.

---

## ✨ Özellikler

- **31 ünite müfredat (A2–B1):** Work (18), Daily (6), Social (6) — LV satış seremonisinden günlük hayata.
- **Alıştırma merkezi:** 400+ kelime/cümle havuzu, 6 egzersiz türü, katalog ürünlerinden dinamik kartlar.
- **Rol-Yapma Simülatörü:** 70+ senaryo + opsiyonel AI bonus diyalog (gpt-4o-mini, günlük limit).
- **Sesli çalışma:** Tarayıcı TTS + opsiyonel ElevenLabs premium ses; kelime bazlı telaffuz skoru.
- **PWA:** Ana ekrana ekle, offline drill/ders cache.
- **Test & CI:** 30+ Vitest, Playwright E2E (login, drill, simülatör).
- **Her beceri:** İfadeler · Kelime kartları · Dilbilgisi · Dinleme · Konuşma ·
  Yazma · Quiz.
- **Oyunlaştırma:** XP, seviye, günlük seri ve rozetlerle motivasyon.
- **Gelişim takibi:** İlerleme grafikleri, tamamlanan üniteler, kazanılan rozetler.
- **Login sistemi:** Yerel (PIN) veya bulut (Supabase) modu.

---

## 🚪 Nasıl giriş yapılır?

1. Siteyi aç → profilini seç (**Hülya**).
2. **Yerel mod** (varsayılan): PIN gir → `1854` (Louis Vuitton'un kuruluş yılı 😉).
3. **Bulut mod** (Supabase kurulduğunda): e-posta + şifre. Kayıt için davet kodu
   gerekir (`TOFTA2026`).

---

## 🧱 Teknik Mimari (sağlam & modüler)

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
  lib/        → speech (ses), supabase, storage (ilerleme deposu), yardımcılar
  types/      → ortak tip tanımları
  data/       → müfredat, senaryolar, profiller, rozetler (LV araştırmasından)
  context/    → AuthContext, ProgressContext
  components/ → Layout + yeniden kullanılabilir UI (SpeakButton, MicButton, ProgressRing)
  features/   → auth · dashboard · lessons · simulator · progress
research/     → çoklu-ajan Louis Vuitton araştırma dosyaları (içeriğin kaynağı)
prototype/    → ilk (v1) statik prototip — arşiv
```

Veri katmanı bir **repository** ile soyutlanmıştır (`lib/storage.ts`): ilerleme
yereldeyken `localStorage`, bulut modunda Supabase'e yazar. Uygulamanın geri kalanı
verinin nereden geldiğini bilmez.

---

## 💻 Yerel geliştirme

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production derleme
npm run preview    # derlemeyi önizle
```

---

## ☁️ Supabase (bulut giriş + senkron) kurulumu — opsiyonel

1. Yeni bir **ücretsiz Supabase organizasyonu** ve içinde proje oluştur.
2. `Project Settings → API`'den **Project URL** ve **anon public key**'i al.
3. Yerelde: `.env.example` dosyasını `.env` olarak kopyala ve değerleri gir.
4. Yayında: GitHub repo → `Settings → Secrets and variables → Actions` →
   `VITE_SUPABASE_URL` ve `VITE_SUPABASE_ANON_KEY` secret'larını ekle.
5. Tablolar (`progress`, `radar_notes`, `products`) ve `product-photos` deposu
   kuruludur. RLS açıktır ve **sahibine kilitlidir**: `progress` yalnızca sahibine
   görünür; `radar_notes`/`products` ortak okunur ama yalnızca ekleyen kişi
   düzenleyebilir/silebilir.

Bu değerler tanımlı değilse uygulama otomatik olarak **yerel modda** çalışır.

### Premium ses ve AI (opsiyonel)

| Secret | Açıklama |
|--------|----------|
| `VITE_ELEVENLABS_API_KEY` | Premium TTS — Ayarlar → Ses motoru |
| `VITE_ELEVENLABS_VOICE_ID` | ElevenLabs ses ID (varsayılan: Rachel) |
| `VITE_OPENAI_API_KEY` | AI Bonus Diyalog — `/app/simulator/ai-bonus` |

GitHub Pages build'inde bu secret'lar tanımlıysa production'da da aktif olur.

---

## 🔒 Güvenlik notu (bulut mod)

Davet kodu (`TOFTA2026`) istemci tarafındadır; tek başına yeterli koruma değildir.
İki kişilik kapalı bir kullanım için Supabase panelinde:

1. **Açık kaydı kapat:** `Authentication → Sign In / Providers → Email` altında
   *"Allow new users to sign up"* seçeneğini kapat. (Hesaplar bir kez kurulduğu için
   yeni kayda gerek yok; bu, yabancı erişimini tamamen engeller.)
2. **Sızdırılmış parola korumasını aç:** `Authentication → Policies / Password` →
   *Leaked password protection* (HaveIBeenPwned kontrolü).

RLS sahibine kilitli olduğu için bu ayarlar açık olmasa bile kimse diğerinin
ilerlemesini göremez; bu adımlar son güvenlik kilidini ekler.

---

## 🚀 Yayın (GitHub Pages)

`main` dalına her push'ta GitHub Actions otomatik derler ve Pages'e yayınlar.
Canlı adres: `https://toftamars.github.io/tofta-english-studio/`

---

## 🗺️ Yol haritası

- [x] 1. Faz — Hülya: LV müfredatı, simülatör, sesli çalışma, oyunlaştırma
- [x] Alıştırma merkezi (drill) + 400+ havuz
- [x] PWA (offline cache, A2HS) + mobil nav
- [x] CI + Vitest 30+ + Playwright E2E
- [x] ElevenLabs TTS + telaffuz kelime skoru
- [x] Adaptif zayıf beceri yönlendirme + öğrenme stack UI
- [x] 31 ünite hedefi + AI bonus diyalog
- [x] 2. Faz — Alper: müzik & perakende müfredatı (temel)
- [ ] Supabase bulut girişi + cihazlar arası senkron (kurulum rehberi hazır)
