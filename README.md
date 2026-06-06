# Tofta English Studio 🇬🇧✨

Louis Vuitton'a özel, **neşeli ve etkili** bir İngilizce öğrenme platformu.
Hülya'nın hem **müşterilerle** hem **yöneticilerle** her an İngilizce konuşmaya hazır
olması için tasarlandı. (Alper'in programı **2. fazda** eklenecek.)

> Klasik sıkıcı İngilizce kurslarından farklı: gerçek mağaza senaryoları,
> rol-yapma simülatörü, sesli çalışma, oyunlaştırma (XP, seri, rozetler) ve
> Louis Vuitton mirası — hepsi tek bir zarif arayüzde.

---

## ✨ Özellikler

- **10 üniteli müfredat (A2):** Karşılamadan satışı kapatmaya, ürün bilgisinden
  marka tarihçesine kadar Louis Vuitton satış seremonisinin her adımı.
- **Rol-Yapma Simülatörü:** Gerçek müşteri ve yönetici diyalogları. En uygun
  cevabı seç, anında geri bildirim al, mikrofonla sesli söyle.
- **Sesli çalışma:** Her cümleyi dinle (🔊) ve mikrofonla telaffuzunu test et (🎤).
  *(Sağlayıcı modüler — ileride premium gerçekçi ses takılabilir.)*
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
5. Veritabanı tablosu (`progress`) ve RLS politikaları proje hazır olduğunda
   otomatik kurulur.

Bu değerler tanımlı değilse uygulama otomatik olarak **yerel modda** çalışır.

---

## 🚀 Yayın (GitHub Pages)

`main` dalına her push'ta GitHub Actions otomatik derler ve Pages'e yayınlar.
Canlı adres: `https://toftamars.github.io/tofta-english-studio/`

---

## 🗺️ Yol haritası

- [x] 1. Faz — Hülya: LV müfredatı, simülatör, sesli çalışma, oyunlaştırma
- [ ] Supabase bulut girişi + cihazlar arası senkron
- [ ] Premium gerçekçi ses (ElevenLabs vb.)
- [ ] 2. Faz — Alper: müzik & perakende yöneticiliği müfredatı
