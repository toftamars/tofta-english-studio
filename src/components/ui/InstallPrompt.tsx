import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

const DISMISS_KEY = "tofta-a2hs-dismissed-v1";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isIos() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

/** Ana ekrana ekle (A2HS) — Android beforeinstallprompt veya iOS talimatı */
export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [showIosHint, setShowIosHint] = useState(false);

  useEffect(() => {
    if (isStandalone() || dismissed) return;

    function onBip(e: Event) {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    }
    window.addEventListener("beforeinstallprompt", onBip);
    if (isIos() && !isStandalone()) setShowIosHint(true);
    return () => window.removeEventListener("beforeinstallprompt", onBip);
  }, [dismissed]);

  function dismiss() {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* yoksay */
    }
  }

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    dismiss();
  }

  if (dismissed || isStandalone()) return null;
  if (!deferred && !showIosHint) return null;

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-cognac/30 bg-cognac/10 p-4">
      <Download size={20} className="mt-0.5 shrink-0 text-cognac" />
      <div className="flex-1 text-sm">
        <p className="font-semibold text-espresso">Uygulamayı ana ekrana ekle</p>
        {deferred ? (
          <p className="text-muted">Mağaza günü hızlı erişim — offline drill ve dersler.</p>
        ) : (
          <p className="text-muted">
            Safari&apos;de <b>Paylaş</b> → <b>Ana Ekrana Ekle</b> ile uygulama gibi kullan.
          </p>
        )}
        {deferred && (
          <button type="button" onClick={install} className="btn-primary mt-3 min-h-[44px] text-sm">
            Yükle
          </button>
        )}
      </div>
      <button type="button" onClick={dismiss} aria-label="Kapat" className="rounded-full p-2 text-muted hover:text-cognac">
        <X size={18} />
      </button>
    </div>
  );
}
