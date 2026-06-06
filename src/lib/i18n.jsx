import { createContext, useContext } from "react";
import { t as translate } from "./translations";

const LangContext = createContext("en");

export function LangProvider({ lang, children }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

// Hook for components to read current language + get a `t()` function
export function useT() {
  const lang = useContext(LangContext);
  const t = (key) => translate(key, lang);
  return { t, lang };
}
