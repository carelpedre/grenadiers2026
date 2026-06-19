// ╔══════════════════════════════════════════════════════════════════╗
// ║  Top buteurs récents — totaux de la fenêtre récente (DB only).      ║
// ║                                                                    ║
// ║  Lit haiti_contributions_public via getRecentScorers(). Ce sont    ║
// ║  des totaux RÉCENTS (~51 matchs depuis 2021), PAS les sélections   ║
// ║  de carrière affichées sur les fiches joueurs. Le cadre est rendu  ║
// ║  explicite dans le sous-titre et la note.                          ║
// ║                                                                    ║
// ║  Les joueurs de l'effectif actuel sont reliés à leur fiche (modale)║
// ║  et affichent leur nom + photo canoniques ; les autres gardent le  ║
// ║  nom du fournisseur et un avatar à initiales, sans lien.           ║
// ╚══════════════════════════════════════════════════════════════════╝

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getRecentScorers, backendReady } from "../lib/fixturesApi";
import { squad } from "../data/squad";
import { useT } from "../lib/i18n";

// Position code (GB/DF/MT/AT) → shared role key for t("onze.roleShort.*").
const CODE_ROLE = { GB: "GK", DF: "DEF", MT: "MID", AT: "FWD" };

// Index apiId -> joueur de l'effectif, enrichi du poste (pour ouvrir la modale).
const SQUAD_BY_API_ID = (() => {
  const groups = [
    ["goalkeepers", "GB", "Gardien"],
    ["defenders", "DF", "Défenseur"],
    ["midfielders", "MT", "Milieu"],
    ["forwards", "AT", "Attaquant"],
  ];
  const map = {};
  for (const [key, position, positionFull] of groups) {
    for (const p of squad[key] || []) {
      if (p.apiId != null) map[p.apiId] = { ...p, position, positionFull };
    }
  }
  return map;
})();

function initials(name) {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
function Avatar({ photo, name }) {
  const [broken, setBroken] = useState(false);
  if (photo && !broken) {
    return (
      <img
        src={photo}
        alt=""
        loading="lazy"
        onError={() => setBroken(true)}
        className="w-12 h-12 rounded-full object-cover bg-line shrink-0"
      />
    );
  }
  return (
    <span className="w-12 h-12 rounded-full bg-haiti-blue/10 text-haiti-blue flex items-center justify-center font-display text-sm shrink-0">
      {initials(name)}
    </span>
  );
}

export default function TopScorers({ onSelectPlayer }) {
  const { t, lang } = useT();
  // French pluralizes 0 and 1 as singular; English only 1.
  const plural = (n, sing, plur) =>
    `${n} ${(lang === "en" ? n === 1 : n <= 1) ? sing : plur}`;
  const [rows, setRows] = useState(null);

  useEffect(() => {
    if (!backendReady) return;
    let alive = true;
    (async () => {
      const data = await getRecentScorers();
      if (alive) setRows(Array.isArray(data) ? data : []);
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (!backendReady) return null;
  if (!rows || rows.length === 0) return null;

  const fromYear = rows[0]?.window_from ? String(rows[0].window_from).slice(0, 4) : null;
  const matchesCounted = rows[0]?.matches_counted ?? null;

  return (
    <section className="scroll-mt-20">
      <div className="border-b border-line pb-3 mb-6">
        <h2 className="font-display text-2xl md:text-3xl">{t("topScorers.title")}</h2>
        <p className="text-muted text-sm mt-1">
          {fromYear ? t("topScorers.sinceYear").replace("{year}", fromYear) : t("topScorers.recentWindow")}
          {matchesCounted ? ` · ${t("topScorers.matchesCount").replace("{n}", matchesCounted)}` : ""}
        </p>
        <p className="text-muted/80 text-xs mt-1">
          {t("topScorers.note")}
        </p>
      </div>

      <motion.ol
        className="bg-white border border-line rounded-lg divide-y divide-line overflow-hidden"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.4 }}
      >
        {rows.map((r, i) => {
          const sq = SQUAD_BY_API_ID[r.player_id] || null;
          const name = sq ? sq.name : r.player_name || t("squad.playerGeneric");
          const photo = sq ? sq.photo : r.photo || null;
          const secondary = [
            plural(r.goals ?? 0, t("topScorers.goalSingular"), t("topScorers.goalPlural")),
            plural(r.assists ?? 0, t("topScorers.assistSingular"), t("topScorers.assistPlural")),
            plural(r.appearances ?? 0, t("topScorers.capSingular"), t("topScorers.capPlural")),
          ].join(" · ");

          const inner = (
            <>
              <span className="w-6 text-center font-display text-lg text-muted tabular-nums shrink-0">
                {i + 1}
              </span>
              <Avatar photo={photo} name={name} />
              <div className="min-w-0 flex-1">
                <p className="font-display text-base md:text-lg text-ink truncate">
                  {name}
                  {sq?.position && (
                    <span className="text-muted text-xs font-sans ml-2 align-middle">{CODE_ROLE[sq.position] ? t(`onze.roleShort.${CODE_ROLE[sq.position]}`) : sq.position}</span>
                  )}
                </p>
                <p className="text-xs text-muted truncate">{secondary}</p>
              </div>
              <span className="font-display text-2xl md:text-3xl text-haiti-blue tabular-nums shrink-0">
                {r.goals ?? 0}
                <span className="text-muted text-xs font-sans ml-1">{t("squad.goalsUnit")}</span>
              </span>
            </>
          );

          return (
            <li key={r.player_id ?? i}>
              {sq && onSelectPlayer ? (
                <button
                  type="button"
                  onClick={() => onSelectPlayer(sq)}
                  className="w-full flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3.5 text-left hover:bg-bg transition-colors"
                >
                  {inner}
                </button>
              ) : (
                <div className="flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3.5">
                  {inner}
                </div>
              )}
            </li>
          );
        })}
      </motion.ol>
    </section>
  );
}
