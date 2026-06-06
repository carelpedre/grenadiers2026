// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  EMAIL SIGNUP — Le Brief Grenadier                                     ║
// ║                                                                        ║
// ║  Newsletter des Grenadiers à la Coupe du Monde 2026.                   ║
// ║  Inscription via POST /api/subscribe.php (Brevo backend).              ║
// ╚═══════════════════════════════════════════════════════════════════════╝

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useT } from "../lib/i18n";

export default function EmailSignup({ variant = "inline" }) {
  const { lang } = useT();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const strings = {
    eyebrow: "Le Brief Grenadier",
    heroTitle: "Un e-mail avant chaque match. Un après. Rien de plus.",
    heroSubtitle:
      "La newsletter des Grenadiers, en français.",
    footerTitle: "Un e-mail par match. C'est tout.",
    footerSubtitle:
      "Recevez un court résumé avant et après chaque rencontre d'Haïti.",
    placeholder: "votre@email.com",
    submit: "S'abonner →",
    success: "✓ Inscription confirmée. Bienvenue au Brief Grenadier.",
    invalidEmail: "Veuillez saisir une adresse e-mail valide.",
    generic: "Une erreur est survenue. Veuillez réessayer.",
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMsg(strings.invalidEmail);
      return;
    }
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, lang: "fr", source: variant }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || strings.generic);
      }
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || strings.generic);
    }
  }

  // ─── Variant: hero (large, prominent) ──────────────────────────────────
  if (variant === "hero") {
    return (
      <div className="bg-gradient-to-br from-haiti-blue to-ink text-bg rounded-2xl p-8 md:p-12">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-3">
            {strings.eyebrow}
          </p>
          <h2 className="font-display text-3xl md:text-4xl mb-4">
            {strings.heroTitle}
          </h2>
          <p className="text-bg/80 leading-relaxed mb-8">
            {strings.heroSubtitle}
          </p>
          <FormBody
            email={email} setEmail={setEmail}
            status={status} errorMsg={errorMsg} strings={strings}
            handleSubmit={handleSubmit}
            dark
          />
        </div>
      </div>
    );
  }

  // ─── Variant: footer (compact strip) ──────────────────────────────────
  return (
    <div className={variant === "footer" ? "" : "py-8"}>
      <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-2">
        {strings.eyebrow}
      </p>
      <h3 className="font-display text-xl mb-2 text-bg">
        {strings.footerTitle}
      </h3>
      <p className="text-bg/70 text-sm leading-relaxed mb-4">
        {strings.footerSubtitle}
      </p>
      <FormBody
        email={email} setEmail={setEmail}
        status={status} errorMsg={errorMsg} strings={strings}
        handleSubmit={handleSubmit}
        dark
      />
    </div>
  );
}

function FormBody({ email, setEmail, status, errorMsg, strings, handleSubmit, dark }) {
  const inputClass = dark
    ? "flex-1 min-w-0 px-4 py-3 bg-bg/10 border border-bg/20 text-bg placeholder:text-bg/40 rounded-full focus:outline-none focus:border-haiti-red focus:bg-bg/15 transition-colors"
    : "flex-1 min-w-0 px-4 py-3 bg-white border border-line text-ink placeholder:text-muted rounded-full focus:outline-none focus:border-haiti-red transition-colors";

  return (
    <>
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-5 py-4 rounded-full text-center font-semibold bg-haiti-red text-bg"
          >
            {strings.success}
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={strings.placeholder}
              required
              disabled={status === "loading"}
              className={inputClass}
              aria-label="Adresse e-mail"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 bg-haiti-red hover:bg-haiti-red-dark disabled:opacity-50 disabled:cursor-not-allowed text-bg font-semibold rounded-full transition-colors whitespace-nowrap"
            >
              {status === "loading" ? "..." : strings.submit}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
      {status === "error" && (
        <p className="text-haiti-red text-sm mt-3 text-center">{errorMsg}</p>
      )}
    </>
  );
}
