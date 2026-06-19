import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ImagePlaceholder from "./ImagePlaceholder";
import SocialIcons from "./SocialIcons";
import PlayerShareCard from "./PlayerShareCard";
import { useT } from "../lib/i18n";

// Map the stored position (code "GB/DF/MT/AT" or French full label) to the
// shared role key (GK/DEF/MID/FWD) used by t("onze.role.*"/"onze.roleShort.*").
const POS_ROLE = {
  GB: "GK", DF: "DEF", MT: "MID", AT: "FWD",
  Gardien: "GK", "Défenseur": "DEF", Milieu: "MID", Attaquant: "FWD",
};

// Birth dates are stored as French strings ("29 janvier 1988"). Parse to a real
// Date and locale-format so English shows English month names. If the string is
// not in the expected "DD month YYYY" French shape, it is returned unchanged.
const FR_MONTHS = {
  janvier: 0, février: 1, mars: 2, avril: 3, mai: 4, juin: 5,
  juillet: 6, août: 7, septembre: 8, octobre: 9, novembre: 10, décembre: 11,
};
function formatFrenchDate(str, lang) {
  if (!str) return str;
  const m = String(str).trim().match(/^(\d{1,2})\s+([A-Za-zÀ-ÿ]+)\s+(\d{4})$/);
  if (!m) return str;
  const month = FR_MONTHS[m[2].toLowerCase()];
  if (month == null) return str;
  const d = new Date(Date.UTC(parseInt(m[3], 10), month, parseInt(m[1], 10)));
  return d.toLocaleDateString(lang === "en" ? "en-US" : "fr-FR", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  });
}

// Modale joueur — s'ouvre au clic sur une fiche.
// Se ferme via : clic sur l'arrière-plan, bouton X, touche Échap.
// Verrouille le défilement du corps pendant l'ouverture.

export default function PlayerModal({ player, stat, onClose }) {
  const { t, lang } = useT();
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

  // The open player view reflects the player in the tab title; restored on close
  // (RouteHead resets it on the next navigation).
  useEffect(() => {
    if (!player?.name) return;
    const prev = document.title;
    document.title = `${player.name} · Grenadiers 2026`;
    return () => {
      document.title = prev;
    };
  }, [player?.name]);

  if (!player) return null;

  const isStar = player.star;
  const isCaptain = player.captain;
  const isStaff = player.isStaff;
  const roleKey = POS_ROLE[player.position] || POS_ROLE[player.positionFull] || null;
  const staffRole = lang === "en" && player.roleEn ? player.roleEn : player.role;
  const positionLabel = isStaff
    ? staffRole
    : roleKey
    ? `${t(`onze.roleShort.${roleKey}`)} · ${t(`onze.role.${roleKey}`)}`
    : `${player.position} · ${player.positionFull}`;

  // Calque identité (badges + numéro + nom), réutilisé sur le portrait mobile
  // (en haut) et le portrait desktop (colonne de gauche).
  const identityOverlay = (
    <>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
        {isCaptain && (
          <span className="text-xs font-bold px-2.5 py-1 bg-haiti-blue text-bg rounded uppercase tracking-wider">
            {t("squad.role.captain")}
          </span>
        )}
        {isStar && (
          <span className="text-xs font-bold px-2.5 py-1 bg-haiti-red text-bg rounded uppercase tracking-wider">
            {t("squad.starTag")}
          </span>
        )}
        <span className="text-xs font-bold px-2.5 py-1 bg-bg/20 text-bg rounded uppercase tracking-wider backdrop-blur-sm">
          {positionLabel}
        </span>
      </div>
      <div className="absolute bottom-4 left-5 right-5 text-bg">
        {player.number && (
          <p className="font-display text-xs text-bg/70 uppercase tracking-widest mb-1">
            #{player.number}
          </p>
        )}
        <h2 className="font-display text-2xl md:text-3xl leading-none">{player.name}</h2>
      </div>
    </>
  );

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start md:items-center justify-center p-0 md:p-6"
      onClick={onClose}
    >
      {/* Arrière-plan */}
      <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm"></div>

      {/* Modale — empilée sur mobile, deux colonnes (portrait + données) sur desktop */}
      <div
        className="relative bg-white w-full md:max-w-4xl md:rounded-lg overflow-hidden max-h-screen md:max-h-[90vh] flex flex-col md:flex-row shadow-2xl animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-ink/60 hover:bg-ink/80 text-bg flex items-center justify-center transition-colors backdrop-blur-sm"
          aria-label={t("onze.close")}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Portrait — mobile (en haut, 4/3) */}
        <div className="relative shrink-0 md:hidden">
          <ImagePlaceholder
            src={player.photo}
            label={player.name}
            aspect="4/3"
            objectPosition="center top"
            rounded={false}
          />
          {identityOverlay}
        </div>

        {/* Portrait — desktop (colonne de gauche). Ratio portrait 4/5 pour montrer
            tout le visage sans recadrage agressif ; le panneau navy remplit le
            reste de la hauteur si la colonne données est plus longue. */}
        <div className="relative hidden md:flex md:flex-col md:w-[44%] md:shrink-0 bg-haiti-blue">
          <div className="relative">
            <ImagePlaceholder
              src={player.photo}
              label={player.name}
              aspect="4/5"
              objectPosition="center 8%"
              rounded={false}
            />
            {identityOverlay}
          </div>
        </div>

        {/* Colonne données — défile. pt sur desktop pour dégager le bouton fermer. */}
        <div className="overflow-y-auto flex-1 min-h-0 md:pt-12">
          {/* Rail de stats principal */}
          {!isStaff && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line">
              <Stat label={t("squad.label.age")} value={player.age ?? "–"} />
              <Stat
                label={t("squad.label.caps")}
                value={player.caps ?? "–"}
                info={{
                  label: t("squad.modalCapsInfoLabel"),
                  text: t("squad.modalCapsInfoText"),
                }}
              />
              <Stat label={t("squad.label.goalsCaps")} value={player.goals ?? "–"} accent={player.goals > 0} />
              <Stat label={t("squad.label.club")} value={player.club} subValue={player.league} small />
            </div>
          )}

          {!isStaff && player.status && player.statusNote && (
            <div className="px-5 md:px-6 pt-5">
              <div className="rounded-lg bg-haiti-red/10 border border-haiti-red/30 px-4 py-3">
                {player.statusLabel && (
                  <p className="text-haiti-red font-bold uppercase tracking-wider text-xs mb-1">
                    {lang === "en" && player.statusLabelEn ? player.statusLabelEn : player.statusLabel}
                  </p>
                )}
                <p className="text-ink text-sm leading-relaxed">{lang === "en" && player.statusNoteEn ? player.statusNoteEn : player.statusNote}</p>
              </div>
            </div>
          )}

          <div className="p-5 md:p-6 space-y-5">
            {/* Faits physiques compacts — dans le premier écran */}
            {!isStaff && (
              <div className="grid grid-cols-2 gap-x-5 gap-y-3 text-sm">
                {player.born && <Fact label={t("squad.label.bornOn")} value={formatFrenchDate(player.born, lang)} />}
                {player.birthplace && <Fact label={t("squad.label.birthplace")} value={player.birthplace} />}
                {player.height && (
                  <Fact label={t("squad.label.height")} value={`${(player.height / 100).toFixed(2)} m`} />
                )}
                {player.debut && <Fact label={t("squad.label.debut")} value={formatFrenchDate(player.debut, lang)} />}
                {player.positionTags && player.positionTags.length > 0 && (
                  <div className="col-span-2 flex flex-wrap items-baseline gap-2">
                    <span className="text-xs uppercase tracking-wider text-muted font-semibold">
                      {t("squad.label.positions")}
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

            {/* Snapshot saison en club — remonté dans le premier écran */}
            {!isStaff && stat && (stat.appearances > 0 || stat.goals > 0) && (
              <div className="border-t border-line pt-5">
                <div className="flex items-center gap-2 mb-3">
                  {(player.clubLogo || stat.club_logo) && (
                    <img src={player.clubLogo || stat.club_logo} alt="" className="w-5 h-5 object-contain shrink-0" />
                  )}
                  <p className="text-xs uppercase tracking-wider text-muted font-semibold">
                    {t("squad.modalClubSeason")}
                    {stat.club_name ? ` · ${stat.club_name}` : ""}
                  </p>
                </div>
                <div className="grid grid-cols-4 gap-px bg-line rounded-lg overflow-hidden border border-line">
                  <Stat label={t("squad.label.apps")} value={stat.appearances ?? 0} />
                  <Stat label={t("squad.label.goals")} value={stat.goals ?? 0} accent={stat.goals > 0} />
                  <Stat label={t("squad.label.assists")} value={stat.assists ?? 0} />
                  <Stat
                    label={t("squad.label.rating")}
                    value={stat.rating != null ? Number(stat.rating).toFixed(2) : "–"}
                  />
                </div>
                <p className="text-[10px] text-muted mt-2">
                  {stat.league_name ? `${stat.league_name} · ` : ""}{t("squad.modalAllComps")}
                </p>
              </div>
            )}

            {/* Biographie — chaîne unique ou tableau de paragraphes */}
            <div className="border-t border-line pt-5">
              <p className="text-xs uppercase tracking-wider text-muted font-semibold mb-3">
                {t("squad.modalBio")}
              </p>
              {(() => {
                const bio = lang === "en" && player.bioEn ? player.bioEn : player.bio;
                return Array.isArray(bio) ? (
                  <div className="space-y-3">
                    {bio.map((para, i) => (
                      <p key={i} className="text-ink leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-ink leading-relaxed">{bio}</p>
                );
              })()}
            </div>

            {/* Réseaux sociaux — joueurs uniquement */}
            {!isStaff && (
              <div className="border-t border-line pt-5">
                <p className="text-xs uppercase tracking-wider text-muted font-semibold mb-3">
                  {t("squad.modalFollow")}
                </p>
                <SocialIcons slug={player.slug} />
              </div>
            )}

            {/* Carte de partage — joueurs uniquement */}
            {!isStaff && (
              <button
                onClick={() => setShowShareCard(true)}
                className="w-full px-4 py-3 bg-haiti-red hover:bg-haiti-red-dark text-bg font-semibold rounded-full text-sm transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                {t("squad.modalShareProfile")}
              </button>
            )}
          </div>
        </div>
      </div>
      {showShareCard && <PlayerShareCard player={player} onClose={() => setShowShareCard(false)} />}
    </div>
  );
}

function Stat({ label, value, subValue, accent, small, info }) {
  return (
    <div className="bg-white p-4 text-center">
      <p
        className={`font-display leading-tight ${
          small
            ? "text-base md:text-lg leading-snug line-clamp-2 break-words"
            : "text-2xl md:text-3xl tabular-nums"
        } ${accent ? "text-haiti-red" : "text-ink"}`}
      >
        {value}
      </p>
      {subValue && <p className="text-xs text-muted mt-1 truncate">{subValue}</p>}
      <p className="text-xs uppercase tracking-wider text-muted font-semibold mt-1">
        {label}
        {info && <InfoTip label={info.label} text={info.text} />}
      </p>
    </div>
  );
}

// Small accessible info affordance: a focusable "i" button that toggles a note.
// The note is rendered in a body portal as a position:fixed popover, measured and
// clamped to the viewport, so it never overflows the screen on mobile and is never
// clipped by the modal's overflow:hidden. Tap the icon to toggle, tap outside or
// press Escape to dismiss; scrolling or resizing also closes it.
function InfoTip({ label, text }) {
  const btnRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [box, setBox] = useState(null);

  const place = () => {
    const el = btnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const width = Math.min(280, vw - 32); // never wider than viewport minus padding
    let left = r.left + r.width / 2 - width / 2; // centered on the icon…
    left = Math.max(16, Math.min(left, vw - width - 16)); // …then clamped to the edges
    setBox({ top: r.bottom + 8, left, width });
  };

  const toggle = (e) => {
    e.stopPropagation();
    if (open) {
      setOpen(false);
      return;
    }
    place();
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    // Capture-phase Escape so it dismisses the tooltip only, not the whole modal.
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setOpen(false);
      }
    };
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    document.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
      document.removeEventListener("keydown", onKey, true);
    };
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        aria-label={label}
        aria-expanded={open}
        onClick={toggle}
        className="ml-1 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border border-haiti-red/70 text-[8px] font-bold leading-none text-haiti-red align-[1px] hover:border-haiti-red hover:text-haiti-red-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-haiti-red"
      >
        i
      </button>
      {open &&
        box &&
        createPortal(
          <div className="fixed inset-0 z-[120]" onClick={() => setOpen(false)}>
            <div
              role="tooltip"
              onClick={(e) => e.stopPropagation()}
              style={{ top: box.top, left: box.left, width: box.width, maxWidth: "calc(100vw - 32px)" }}
              className="fixed rounded-lg bg-ink px-3 py-2.5 text-left text-[11px] font-normal normal-case leading-snug tracking-normal text-bg shadow-xl"
            >
              {text}
            </div>
          </div>,
          document.body,
        )}
    </>
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
