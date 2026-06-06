import { useEffect, useState } from "react";
import ImagePlaceholder from "./ImagePlaceholder";
import SocialIcons from "./SocialIcons";
import PlayerShareCard from "./PlayerShareCard";

// Modale joueur — s'ouvre au clic sur une fiche.
// Se ferme via : clic sur l'arrière-plan, bouton X, touche Échap.
// Verrouille le défilement du corps pendant l'ouverture.

export default function PlayerModal({ player, stat, onClose }) {
  const [showShareCard, setShowShareCard] = useState(false);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!player) return null;

  const isStar = player.star;
  const isCaptain = player.captain;
  const isStaff = player.isStaff;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start md:items-center justify-center p-0 md:p-6"
      onClick={onClose}
    >
      {/* Arrière-plan */}
      <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm"></div>

      {/* Modale */}
      <div
        className="relative bg-white w-full md:max-w-3xl md:rounded-lg overflow-hidden max-h-screen md:max-h-[90vh] flex flex-col shadow-2xl animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-ink/60 hover:bg-ink/80 text-bg flex items-center justify-center transition-colors backdrop-blur-sm"
          aria-label="Fermer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image principale */}
        <div className="relative shrink-0">
          <ImagePlaceholder
            src={player.photo}
            label={player.name}
            aspect="4/3"
            objectPosition="center 25%"
            rounded={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent"></div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {isCaptain && (
              <span className="text-xs font-bold px-2.5 py-1 bg-haiti-blue text-bg rounded uppercase tracking-wider">
                Capitaine
              </span>
            )}
            {isStar && (
              <span className="text-xs font-bold px-2.5 py-1 bg-haiti-red text-bg rounded uppercase tracking-wider">
                Cadre
              </span>
            )}
            <span className="text-xs font-bold px-2.5 py-1 bg-bg/20 text-bg rounded uppercase tracking-wider backdrop-blur-sm">
              {isStaff ? player.role : `${player.position} · ${player.positionFull}`}
            </span>
          </div>

          {/* Nom */}
          <div className="absolute bottom-4 left-5 right-5 text-bg">
            {player.number && (
              <p className="font-display text-xs text-bg/70 uppercase tracking-widest mb-1">
                #{player.number}
              </p>
            )}
            <h2 className="font-display text-3xl md:text-4xl leading-none">{player.name}</h2>
          </div>
        </div>

        {/* Zone défilante */}
        <div className="overflow-y-auto flex-1">
          {/* Tableau de stats — joueurs uniquement */}
          {!isStaff && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line">
              <Stat label="Âge" value={player.age ?? "—"} />
              <Stat label="Sélections" value={player.caps ?? "—"} />
              <Stat label="Buts (sél.)" value={player.goals ?? "—"} accent={player.goals > 0} />
              <Stat label="Club" value={player.club} subValue={player.league} />
            </div>
          )}

          {/* Stats de club de la saison (joueurs uniquement) */}
          {!isStaff && stat && (stat.appearances > 0 || stat.goals > 0) && (
            <div className="px-5 md:px-7 pt-5">
              <div className="flex items-center gap-2 mb-3">
                {stat.club_logo && (
                  <img src={stat.club_logo} alt="" className="w-5 h-5 object-contain shrink-0" />
                )}
                <p className="text-xs uppercase tracking-wider text-muted font-semibold">
                  En club cette saison
                  {stat.club_name ? ` · ${stat.club_name}` : ""}
                </p>
              </div>
              <div className="grid grid-cols-4 gap-px bg-line rounded-lg overflow-hidden border border-line">
                <Stat label="Matchs" value={stat.appearances ?? 0} />
                <Stat label="Buts" value={stat.goals ?? 0} accent={stat.goals > 0} />
                <Stat label="Passes D." value={stat.assists ?? 0} />
                <Stat
                  label="Note moy."
                  value={stat.rating != null ? Number(stat.rating).toFixed(2) : "—"}
                />
              </div>
              <p className="text-[10px] text-muted mt-2">
                {stat.league_name ? `${stat.league_name} · ` : ""}toutes compétitions cette saison
              </p>
            </div>
          )}

          {/* Bio */}
          <div className="p-5 md:p-7">
            {/* Données rapides — joueurs uniquement */}
            {!isStaff && (
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-3 mb-6 text-sm">
              {player.born && player.born !== "—" && (
                <Fact label="Né le" value={player.born} />
              )}
              {player.birthplace && (
                <Fact label="Lieu de naissance" value={player.birthplace} />
              )}
              {player.height && (
                <Fact label="Taille" value={`${(player.height / 100).toFixed(2)} m`} />
              )}
              <Fact label="Club" value={`${player.club} (${player.clubCountry})`} />
              {player.league && <Fact label="Championnat" value={player.league} />}
              {player.debut && <Fact label="Première sélection" value={player.debut} />}
              {player.positionTags && player.positionTags.length > 0 && (
                <div className="md:col-span-2 flex flex-wrap items-baseline gap-2">
                  <span className="text-xs uppercase tracking-wider text-muted font-semibold">
                    Postes
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {player.positionTags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-bg border border-line rounded text-ink"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            )}

            {/* Biographie — chaîne unique ou tableau de paragraphes */}
            <div className={isStaff ? "" : "border-t border-line pt-5"}>
              {Array.isArray(player.bio) ? (
                <div className="space-y-3">
                  {player.bio.map((para, i) => (
                    <p key={i} className="text-ink leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-ink leading-relaxed">{player.bio}</p>
              )}
            </div>

            {/* Réseaux sociaux — joueurs uniquement */}
            {!isStaff && (
              <div className="mt-6 pt-5 border-t border-line">
                <p className="text-xs uppercase tracking-wider text-muted font-semibold mb-3">
                  Suivre
                </p>
                <SocialIcons slug={player.slug} />
              </div>
            )}

            {/* Carte de partage — joueurs uniquement */}
            {!isStaff && (
              <div className="mt-5">
                <button
                  onClick={() => setShowShareCard(true)}
                  className="w-full px-4 py-3 bg-haiti-red hover:bg-haiti-red-dark text-bg font-semibold rounded-full text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Partager cette fiche
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
      {showShareCard && <PlayerShareCard player={player} onClose={() => setShowShareCard(false)} />}
    </div>
  );
}

function Stat({ label, value, subValue, accent }) {
  return (
    <div className="bg-white p-4 text-center">
      <p
        className={`font-display text-2xl md:text-3xl tabular-nums leading-tight ${
          accent ? "text-haiti-red" : "text-ink"
        }`}
      >
        {value}
      </p>
      {subValue && <p className="text-xs text-muted mt-1 truncate">{subValue}</p>}
      <p className="text-xs uppercase tracking-wider text-muted font-semibold mt-1">{label}</p>
    </div>
  );
}

function Fact({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-muted font-semibold">{label}</p>
      <p className="text-ink mt-0.5">{value}</p>
    </div>
  );
}
