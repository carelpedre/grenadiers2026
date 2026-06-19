import { createContext, useContext, useState, useCallback } from "react";
import { t as translate } from "./translations";

// ╔══════════════════════════════════════════════════════════════════╗
// ║  i18n · langue active du site (state + persistance)                ║
// ║                                                                    ║
// ║  La langue vit dans le contexte React (LangProvider). Tout         ║
// ║  consommateur de useT() se re-rend au changement. Le choix est     ║
// ║  persisté dans localStorage (clé + TTL repris du LanguagePicker).  ║
// ║  Tous les accès navigateur sont gardés : sûr pour le prérendu Node.║
// ╚══════════════════════════════════════════════════════════════════╝

const STORAGE_KEY = "grenadiers-2026-lang";
const STORAGE_TTL_DAYS = 30;
const DEFAULT_LANG = "fr";
export const LANGUAGES = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "ht", label: "HT" },
];
const VALID_LANGS = LANGUAGES.map((l) => l.code);

// Choix stocké, ou null si absent / expiré / invalide. Sûr hors navigateur.
export function getStoredLang() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const { value, ts } = JSON.parse(raw);
    const ttlMs = STORAGE_TTL_DAYS * 24 * 60 * 60 * 1000;
    if (Date.now() - ts > ttlMs) return null;
    return VALID_LANGS.includes(value) ? value : null;
  } catch {
    return null;
  }
}

// Persiste le choix (valeur + horodatage pour le TTL). Sûr hors navigateur.
export function setStoredLang(code) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ value: code, ts: Date.now() }));
  } catch {
    /* localStorage bloqué : on ignore, le choix ne sera pas mémorisé */
  }
}

// Langue initiale, sûre pour le prérendu : "fr" hors navigateur. Côté client :
// choix stocké valide, sinon "en" si la langue du navigateur commence par "en",
// sinon "fr".
function resolveInitialLang() {
  if (typeof window === "undefined") return DEFAULT_LANG;
  const stored = getStoredLang();
  if (stored) return stored;
  try {
    const nav = (window.navigator && window.navigator.language ? window.navigator.language : "").toLowerCase();
    if (nav.startsWith("en")) return "en";
  } catch {
    /* ignore */
  }
  return DEFAULT_LANG;
}

const LangContext = createContext({ lang: DEFAULT_LANG, setLang: () => {} });

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(resolveInitialLang);
  const setLang = useCallback((code) => {
    if (!VALID_LANGS.includes(code)) return;
    setLangState(code);
    setStoredLang(code);
  }, []);
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

// Hook : langue courante, fonction t(), et setter setLang().
export function useT() {
  const { lang, setLang } = useContext(LangContext);
  const t = (key) => translate(key, lang);
  return { t, lang, setLang };
}
