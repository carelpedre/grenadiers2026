// ╔══════════════════════════════════════════════════════════════════╗
// ║  AUTH CONTEXT · état de session Google (surface photos)           ║
// ║                                                                    ║
// ║  Première surface authentifiée du site. La navigation reste 100%   ║
// ║  ouverte : ce contexte n'impose AUCUN accès, il expose seulement   ║
// ║  l'état de session et les actions de connexion/déconnexion.       ║
// ║                                                                    ║
// ║  { session, user, loading, signInWithGoogle, signOut }            ║
// ╚══════════════════════════════════════════════════════════════════╝

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext({
  session: null,
  user: null,
  loading: true,
  signInWithGoogle: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pas de client (prérendu, ou env manquante) : on ne bloque rien.
    if (!supabase) {
      setLoading(false);
      return;
    }
    let active = true;

    // Hydrate la session existante (persistée dans le navigateur).
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setLoading(false);
      cleanAuthParams();
    });

    // Réagit aux changements : connexion, déconnexion, rafraîchissement.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setLoading(false);
      if (next) cleanAuthParams();
    });

    return () => {
      active = false;
      sub?.subscription?.unsubscribe();
    };
  }, []);

  // Retour sur l'origine + le chemin courants (déjà autorisés dans Supabase).
  // detectSessionInUrl + cleanAuthParams gèrent le retour pour les deux OAuth.
  const oauth = (provider) => {
    if (!supabase) return;
    supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin + window.location.pathname },
    });
  };
  const signInWithGoogle = () => oauth("google");
  const signInWithApple = () => oauth("apple");

  // Code e-mail (OTP), vérifié sur place, sans redirection. Renvoie le
  // résultat supabase ({ data, error }) pour que l'UI gère ses messages.
  const sendEmailCode = (email) => {
    if (!supabase) return Promise.resolve({ error: new Error("unavailable") });
    return supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
  };
  const verifyEmailCode = (email, token) => {
    if (!supabase) return Promise.resolve({ error: new Error("unavailable") });
    // Sur succès, onAuthStateChange établit la session en place (pas de redirect).
    return supabase.auth.verifyOtp({ email, token, type: "email" });
  };

  const signOut = () => {
    if (supabase) supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        loading,
        signInWithGoogle,
        signInWithApple,
        sendEmailCode,
        verifyEmailCode,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// Retire les paramètres PKCE (?code, ?state) de l'URL après l'échange, pour
// garder la barre d'adresse propre. Navigateur uniquement, idempotent.
function cleanAuthParams() {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (url.searchParams.has("code") || url.searchParams.has("state")) {
    url.searchParams.delete("code");
    url.searchParams.delete("state");
    window.history.replaceState({}, document.title, url.pathname + url.search + url.hash);
  }
}
