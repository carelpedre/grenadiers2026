import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 — Page introuvable · Grenadiers 2026";
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5 py-16 bg-bg">
      <div className="max-w-xl text-center">
        <p className="font-display text-7xl md:text-8xl text-haiti-blue mb-4">404</p>
        <h1 className="font-display text-3xl md:text-4xl mb-4 text-ink">
          Page introuvable.
        </h1>
        <p className="text-muted leading-relaxed mb-8">
          La page demandée n'existe pas — le lien est peut-être rompu, la page a peut-être été déplacée, ou elle n'a jamais existé. Voici quelques pistes pour continuer.
        </p>

        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
          <Link
            to="/"
            className="px-4 py-3 bg-haiti-red hover:bg-haiti-red-dark text-bg font-semibold rounded-full transition-colors"
          >
            Accueil
          </Link>
          <Link
            to="/squad"
            className="px-4 py-3 bg-white border border-line hover:border-haiti-red text-ink font-semibold rounded-full transition-colors"
          >
            La sélection
          </Link>
          <Link
            to="/matches"
            className="px-4 py-3 bg-white border border-line hover:border-haiti-red text-ink font-semibold rounded-full transition-colors"
          >
            Calendrier
          </Link>
          <Link
            to="/federation"
            className="px-4 py-3 bg-white border border-line hover:border-haiti-red text-ink font-semibold rounded-full transition-colors"
          >
            La Fédération
          </Link>
        </div>

        <p className="text-xs text-muted mt-10 italic">
          Lien cassé sur le site ? Écrire à{" "}
          <a href="mailto:contact@grenadiers2026.com" className="text-haiti-blue underline hover:no-underline">
            contact@grenadiers2026.com
          </a>{" "}
          pour signaler le problème.
        </p>
      </div>
    </div>
  );
}
