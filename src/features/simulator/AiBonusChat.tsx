import { useState } from "react";
import { Link } from "react-router-dom";
import { Bot, Send } from "lucide-react";
import { getAiQuota, isAiDialogAvailable, sendAiDialogMessage } from "../../lib/aiDialog";
import { SpeakButton } from "../../components/ui/SpeakButton";
import { cn } from "../../lib/cn";

interface Msg {
  role: "user" | "assistant";
  text: string;
}

/** Work modu — sınırlı AI serbest konuşma (bonus) */
export function AiBonusChat() {
  const available = isAiDialogAvailable();
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: "Hello! I'm looking for a gift for my wife. Something special from Louis Vuitton." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const quota = getAiQuota();

  if (!available) {
    return (
      <div className="card-luxe p-5 text-sm text-muted">
        <p className="mb-1 flex items-center gap-2 font-serif text-lg text-espresso">
          <Bot size={18} /> AI Bonus Diyalog
        </p>
        <p>
          Yapılandırılmamış. <code className="text-xs">VITE_OPENAI_API_KEY</code> tanımlayın.
          Statik simülatör senaryoları her zaman kullanılabilir.
        </p>
        <Link to="/app/simulator" className="mt-3 inline-block text-cognac underline">
          Simülatöre dön
        </Link>
      </div>
    );
  }

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setError(null);
    const next = [...messages, { role: "user" as const, text: userMsg }];
    setMessages(next);
    setLoading(true);
    try {
      const history = next.slice(0, -1).map((m) => ({ role: m.role, content: m.text }));
      const reply = await sendAiDialogMessage(history, userMsg);
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Hata");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card-luxe flex flex-col gap-4 p-5">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 font-serif text-lg text-espresso">
          <Bot size={18} /> AI Bonus Diyalog
        </p>
        <span className="text-xs text-muted">{quota.remaining}/{quota.limit} bugün</span>
      </div>
      <p className="text-sm text-muted">LV müşterisi rolünde serbest konuşma — günde {quota.limit} mesaj limiti.</p>

      <div className="flex max-h-[320px] flex-col gap-3 overflow-y-auto rounded-2xl bg-cream/50 p-4" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={cn("rounded-2xl px-4 py-2 text-sm", m.role === "user" ? "ml-8 bg-cognac/15 text-espresso" : "mr-8 bg-paper border border-line")}>
            <p>{m.text}</p>
            {m.role === "assistant" && <SpeakButton text={m.text.split("(")[0].trim()} className="mt-1" />}
          </div>
        ))}
        {loading && <p className="text-sm text-muted animate-pulse">Müşteri düşünüyor…</p>}
      </div>

      {error && <p className="text-sm text-plum">{error}</p>}

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="İngilizce cevabını yaz…"
          className="min-h-[48px] flex-1 rounded-2xl border border-line bg-paper px-4 text-sm"
          disabled={loading || quota.remaining <= 0}
        />
        <button type="button" onClick={send} disabled={loading || quota.remaining <= 0} className="btn-primary min-h-[48px] min-w-[48px] px-4">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
