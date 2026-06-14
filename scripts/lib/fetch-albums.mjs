// Build-time fetch of the public gallery albums (for prerendered /foto/<slug>
// pages and the sitemap). Reads the anon key from .env. NEVER throws: returns
// [] on any failure so a flaky network can never fail the build.
import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ENV_FILE = resolve(__dirname, "..", "..", ".env");
const LIST_URL = "https://dpstwvmjccolxglrvwbj.supabase.co/functions/v1/gallery-list";

function anonKey() {
  if (process.env.VITE_SUPABASE_ANON_KEY) return process.env.VITE_SUPABASE_ANON_KEY;
  if (!existsSync(ENV_FILE)) return null;
  const line = readFileSync(ENV_FILE, "utf8")
    .split(/\r?\n/)
    .find((l) => l.startsWith("VITE_SUPABASE_ANON_KEY="));
  return line ? line.slice("VITE_SUPABASE_ANON_KEY=".length).trim().replace(/^["']|["']$/g, "") : null;
}

export async function fetchAlbumsForBuild() {
  const key = anonKey();
  if (!key) {
    console.warn("  ! gallery: no VITE_SUPABASE_ANON_KEY found; skipping album pages.");
    return [];
  }
  try {
    const res = await fetch(LIST_URL, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data?.ok ? data.albums ?? [] : [];
  } catch (e) {
    console.warn(`  ! gallery fetch failed (${e.message}); skipping album pages.`);
    return [];
  }
}

// First sentence of a description, for the meta description. Strips the leading
// "Position · Club" line on player bios (we want the prose, not the tag).
export function firstSentence(description) {
  if (!description) return "";
  const text = description.replace(/\r\n?/g, "\n").trim();
  const nl = text.indexOf("\n");
  const body = nl >= 0 ? text.slice(nl + 1).trim() : text;
  const m = body.match(/^[^.!?]*[.!?]/);
  return (m ? m[0] : body).replace(/\s+/g, " ").trim();
}
