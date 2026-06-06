import type { RadarNote, RadarNoteCategory } from "../types";
import { supabase } from "./supabase";

// ============================================================
// Insider notlar deposu (Hülya/Alper elle ekler — en güvenilir,
// yasal kaynak). Supabase varsa bulut (aile içi paylaşımlı),
// yoksa localStorage. Repo soyutlaması korunur.
// ============================================================

const LOCAL_KEY = "tofta-radar-notes-v1";

export function getLocalRadarNotesSync(): RadarNote[] {
  if (typeof localStorage === "undefined") return [];
  return loadLocal();
}

export interface NewNoteInput {
  title: string;
  body: string;
  category: RadarNoteCategory;
}

function loadLocal(): RadarNote[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? (JSON.parse(raw) as RadarNote[]) : [];
  } catch {
    return [];
  }
}

function saveLocal(notes: RadarNote[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(notes));
}

export async function listNotes(): Promise<RadarNote[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from("radar_notes")
      .select("id, author_name, title, body, category, created_at")
      .order("created_at", { ascending: false });
    if (!error && data) {
      return data.map((r) => ({
        id: r.id as string,
        authorName: (r.author_name as string) ?? undefined,
        title: r.title as string,
        body: r.body as string,
        category: (r.category as RadarNoteCategory) ?? "Diğer",
        createdAt: r.created_at as string,
      }));
    }
  }
  return loadLocal();
}

export async function addNote(
  input: NewNoteInput,
  user?: { id: string; displayName: string },
): Promise<RadarNote> {
  const note: RadarNote = {
    id: crypto.randomUUID(),
    authorName: user?.displayName,
    title: input.title.trim(),
    body: input.body.trim(),
    category: input.category,
    createdAt: new Date().toISOString(),
  };

  if (supabase && user?.id) {
    const { data, error } = await supabase
      .from("radar_notes")
      .insert({
        user_id: user.id,
        author_name: user.displayName,
        title: note.title,
        body: note.body,
        category: note.category,
      })
      .select("id, created_at")
      .single();
    if (!error && data) {
      note.id = data.id as string;
      note.createdAt = data.created_at as string;
      return note;
    }
  }

  const next = [note, ...loadLocal()];
  saveLocal(next);
  return note;
}

export async function deleteNote(id: string): Promise<void> {
  if (supabase) {
    const { error } = await supabase.from("radar_notes").delete().eq("id", id);
    if (!error) return;
  }
  saveLocal(loadLocal().filter((n) => n.id !== id));
}
