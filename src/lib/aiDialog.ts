const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY as string | undefined;
const DAILY_MSG_LIMIT = 20;
const USAGE_KEY = "tofta-ai-msgs";
const USAGE_DAY = "tofta-ai-day";

export function isAiDialogAvailable(): boolean {
  return Boolean(OPENAI_KEY);
}

export function getAiQuota(): { used: number; limit: number; remaining: number } {
  try {
    const day = localStorage.getItem(USAGE_DAY);
    const used = day === new Date().toDateString() ? Number(localStorage.getItem(USAGE_KEY) || 0) : 0;
    return { used, limit: DAILY_MSG_LIMIT, remaining: Math.max(0, DAILY_MSG_LIMIT - used) };
  } catch {
    return { used: 0, limit: DAILY_MSG_LIMIT, remaining: DAILY_MSG_LIMIT };
  }
}

function trackUsage() {
  try {
    const today = new Date().toDateString();
    if (localStorage.getItem(USAGE_DAY) !== today) {
      localStorage.setItem(USAGE_DAY, today);
      localStorage.setItem(USAGE_KEY, "0");
    }
    const used = Number(localStorage.getItem(USAGE_KEY) || 0) + 1;
    localStorage.setItem(USAGE_KEY, String(used));
  } catch {
    /* yoksay */
  }
}

const SYSTEM_PROMPT = `You are a Louis Vuitton client at Istinye Park boutique. 
Speak in short, natural English (1-2 sentences). 
The user is a Client Advisor practicing English. 
Stay in character. After your reply, optionally add a Turkish hint in parentheses if the situation is complex.`;

export async function sendAiDialogMessage(
  history: { role: "user" | "assistant"; content: string }[],
  userMessage: string,
): Promise<string> {
  if (!OPENAI_KEY) throw new Error("AI modu yapılandırılmamış.");
  const quota = getAiQuota();
  if (quota.remaining <= 0) throw new Error("Günlük AI limiti doldu (20 mesaj). Yarın tekrar dene.");

  const messages = [
    { role: "system" as const, content: SYSTEM_PROMPT },
    ...history.slice(-8),
    { role: "user" as const, content: userMessage },
  ];

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 150,
      temperature: 0.7,
    }),
  });

  if (!res.ok) throw new Error("AI yanıt veremedi. API anahtarını kontrol edin.");
  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  const reply = data.choices?.[0]?.message?.content?.trim();
  if (!reply) throw new Error("Boş yanıt.");
  trackUsage();
  return reply;
}
