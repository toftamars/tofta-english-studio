// ============================================================
// Cihazda OCR — fotoğraftaki yazı/kodu okur (ücretsiz, anahtarsız).
//  tesseract.js tembel (lazy) yüklenir; ana paketi şişirmez.
//  Etiket, fiyat kartı, ekran görüntüsü veya M-referans için idealdir.
// ============================================================

const OCR_TIMEOUT_MS = 45_000; // ağ/indirme donarsa sonsuza kadar beklemeyi önler

export async function ocrImage(
  image: File | Blob | string,
  onProgress?: (pct: number) => void,
): Promise<string> {
  const run = (async () => {
    const { recognize } = await import("tesseract.js");
    const result = await recognize(image as never, "eng", {
      logger: (m: { status: string; progress: number }) => {
        if (m.status === "recognizing text" && onProgress) onProgress(Math.round(m.progress * 100));
      },
    });
    return result.data.text?.trim() ?? "";
  })();

  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("OCR zaman aşımı")), OCR_TIMEOUT_MS),
  );

  return Promise.race([run, timeout]);
}
