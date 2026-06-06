import { useState } from "react";

// ╔══════════════════════════════════════════════════════════════════╗
// ║  ShareButton — partage de la page courante sur les réseaux         ║
// ║                                                                    ║
// ║  Utilise l'API native navigator.share (feuille de partage iOS/    ║
// ║  Android) quand elle existe ; sinon affiche un petit menu          ║
// ║  (X, Facebook, WhatsApp, LinkedIn, copier le lien).                ║
// ║                                                                    ║
// ║  props :                                                           ║
// ║    title  — titre partagé                                          ║
// ║    text   — texte d'accompagnement (défaut : title)                ║
// ║    url    — lien (défaut : page courante)                          ║
// ║    dark   — variante claire pour fond sombre                       ║
// ╚══════════════════════════════════════════════════════════════════╝

const ENC = encodeURIComponent;

export default function ShareButton({ title, text, url, dark = false, floating = false, className = "" }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const resolveUrl = () =>
    url || (typeof window !== "undefined" ? window.location.href : "");
  const shareText = text || title || "";

  async function handleClick() {
    const link = resolveUrl();
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: shareText, url: link });
        return;
      } catch {
        // annulé ou non supporté → on bascule sur le menu
      }
    }
    setOpen((o) => !o);
  }

  function shareTo(network) {
    const link = resolveUrl();
    const targets = {
      x: `https://twitter.com/intent/tweet?url=${ENC(link)}&text=${ENC(shareText)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${ENC(link)}`,
      whatsapp: `https://wa.me/?text=${ENC(`${shareText} ${link}`)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${ENC(link)}`,
    };
    window.open(targets[network], "_blank", "noopener,noreferrer");
    setOpen(false);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(resolveUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard indisponible — no-op */
    }
  }

  const btnClass = dark
    ? "border-bg/30 text-bg hover:border-haiti-red"
    : "border-line text-ink hover:border-haiti-red bg-white";

  return (
    <div className={`relative inline-block ${className}`}>
      {floating ? (
        <button
          type="button"
          onClick={handleClick}
          aria-label="Partager"
          aria-haspopup="menu"
          aria-expanded={open}
          className="h-12 w-12 rounded-full bg-haiti-red text-bg shadow-lg flex items-center justify-center hover:bg-haiti-red-dark transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
          </svg>
        </button>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          aria-label="Partager"
          aria-haspopup="menu"
          aria-expanded={open}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-colors ${btnClass}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
          </svg>
          Partager
        </button>
      )}

      {open && (
        <>
          {/* couche de fermeture au clic extérieur */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden="true" />
          <div
            role="menu"
            className={`absolute right-0 z-50 w-48 rounded-lg border border-line bg-white shadow-lg overflow-hidden text-left ${
              floating ? "bottom-full mb-2" : "mt-2"
            }`}
          >
            <MenuItem onClick={() => shareTo("x")}>X (Twitter)</MenuItem>
            <MenuItem onClick={() => shareTo("facebook")}>Facebook</MenuItem>
            <MenuItem onClick={() => shareTo("whatsapp")}>WhatsApp</MenuItem>
            <MenuItem onClick={() => shareTo("linkedin")}>LinkedIn</MenuItem>
            <MenuItem onClick={copyLink}>
              {copied ? "Lien copié ✓" : "Copier le lien"}
            </MenuItem>
          </div>
        </>
      )}
    </div>
  );
}

function MenuItem({ onClick, children }) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className="w-full text-left px-4 py-2.5 text-sm text-ink hover:bg-bg transition-colors"
    >
      {children}
    </button>
  );
}
