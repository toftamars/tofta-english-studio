import { describe, expect, it, beforeEach, vi } from "vitest";
import { getAiQuota, isAiDialogAvailable } from "./aiDialog";

describe("aiDialog", () => {
  const store: Record<string, string> = {};

  beforeEach(() => {
    Object.keys(store).forEach((k) => delete store[k]);
    vi.stubGlobal("localStorage", {
      getItem(key: string) {
        return store[key] ?? null;
      },
      setItem(key: string, val: string) {
        store[key] = val;
      },
    });
  });

  it("reports unavailable without API key", () => {
    expect(isAiDialogAvailable()).toBe(false);
  });

  it("returns full quota when unused", () => {
    const q = getAiQuota();
    expect(q.limit).toBe(20);
    expect(q.remaining).toBe(20);
  });

  it("tracks usage for current day", () => {
    store["tofta-ai-day"] = new Date().toDateString();
    store["tofta-ai-msgs"] = "5";
    const q = getAiQuota();
    expect(q.used).toBe(5);
    expect(q.remaining).toBe(15);
  });
});
