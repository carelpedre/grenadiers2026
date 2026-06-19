import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SponsorPanel } from "../components/Sponsor";
import ImagePlaceholder from "../components/ImagePlaceholder";
import PlayerModal from "../components/PlayerModal";
import TopScorers from "../components/TopScorers";
import { squad, squadStats, staff, getAllPlayers } from "../data/squad";
import { trainingCamp } from "../data/friendlies";
import { fetchPlayerStats } from "../lib/fixturesApi";
import { useT } from "../lib/i18n";
import { CountUpNumber, fadeUp, stagger } from "../lib/motion";

export default function Squad() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [statsById, setStatsById] = useState(null);
  const { t, lang } = useT();
  const pick = (frVal, enVal) => (lang === "en" ? enVal : frVal);

  // Stats de club (logo + saison) chargées depuis Supabase, indexées par apiId.
  // No-op gracieux si le backend est absent : les fiches gardent les données
  // manuelles de squad.js.
  useEffect(() => {
    let alive = true;
    fetchPlayerStats().then((map) => {
      if (alive && map) setStatsById(map);
    });
    return () => {
      alive = false;
    };
  }, []);

  const statFor = (player) =>
    player && player.apiId ? statsById?.[player.apiId] ?? null : null;

  // Helper that wraps each position with the selectedPlayer setter
  const openPlayer = (player, positionFull, position) =>
    setSelectedPlayer({ ...player, positionFull, position });

  // Staff open in the same modal, flagged so it renders a staff-appropriate view.
  const openStaff = (member) => setSelectedPlayer({ ...member, isStaff: true });

  // Active groups exclude any player marked `status: "forfait"`; the forfaits
  // render in their own quieter section at the bottom (with their position).
  const FORFAIT_GROUPS = [
    { key: "goalkeepers", positionFull: "Gardien", position: "GB" },
    { key: "defenders", positionFull: "Défenseur", position: "DF" },
    { key: "midfielders", positionFull: "Milieu", position: "MT" },
    { key: "forwards", positionFull: "Attaquant", position: "AT" },
  ];
  const activeGK = squad.goalkeepers.filter((p) => !p.status);
  const activeDF = squad.defenders.filter((p) => !p.status);
  const activeMT = squad.midfielders.filter((p) => !p.status);
  const activeAT = squad.forwards.filter((p) => !p.status);
  const forfaits = FORFAIT_GROUPS.flatMap((g) =>
    squad[g.key]
      .filter((p) => p.status === "forfait")
      .map((p) => ({ ...p, positionFull: g.positionFull, position: g.position })),
  );

  // ─── Classements — calculés depuis squad.js (source unique) ──────────
  // squad est un objet par poste ; on classe la liste à plat.
  const allPlayers = getAllPlayers().filter((p) => p.status !== "forfait");
  const rankBy = (key) =>
    [...allPlayers]
      .sort((a, b) =>
        (b[key] - a[key]) ||
        (b.caps - a.caps) ||
        (b.goals - a.goals) ||
        a.name.localeCompare(b.name, "fr"))
      .slice(0, 5);

  const topScorers = rankBy("goals");
  const mostCapped = rankBy("caps");

  return (
    <div>
      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink text-bg min-h-[60vh] md:min-h-[70vh] flex items-start">
        {/* Background team photo with dark overlay */}
        <div className="absolute inset-0">
          <ImagePlaceholder
            src="/images/photos/squad-group-2026.jpg"
            label={t("squad.heroEyebrow")}
            rounded={false}
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/35 to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/80 to-transparent"></div>
        </div>

        {/* Bicolor edge */}
        <motion.div className="absolute left-0 top-0 bottom-0 w-1.5 bg-haiti-blue" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} style={{ originY: 0 }} />
        <motion.div className="absolute left-1.5 top-0 bottom-0 w-1.5 bg-haiti-red" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} style={{ originY: 0 }} />

        <div className="relative max-w-content mx-auto px-5 pt-8 md:pt-10 pb-20 md:pb-28 w-full">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-haiti-red text-xs uppercase tracking-[0.25em] font-bold mb-5"
          >
            {t("squad.heroEyebrow")}
          </motion.p>
          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-7"
            initial="hidden"
            animate="show"
            variants={stagger(0.08, 0.3)}
          >
            <motion.span variants={fadeUp} className="block">{t("squad.heroTitle1")}</motion.span>
            <motion.span variants={fadeUp} className="block text-haiti-red">{t("squad.heroTitle2")}</motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-bg/85 text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            {t("squad.heroSubtext")}
          </motion.p>
        </div>
      </section>

      {/* ─── STICKY POSITION NAV ──────────────────────────────────────── */}
      <nav className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-line">
        <div className="max-w-content mx-auto px-5 py-2.5 flex items-center gap-1 overflow-x-auto">
          <a href="#GK" className="shrink-0 px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold text-ink hover:bg-bg transition-colors uppercase tracking-wider">{t("squad.navGoalkeepers")} <span className="text-muted">({activeGK.length})</span></a>
          <a href="#DF" className="shrink-0 px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold text-ink hover:bg-bg transition-colors uppercase tracking-wider">{t("squad.section.defenders")} <span className="text-muted">({activeDF.length})</span></a>
          <a href="#MT" className="shrink-0 px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold text-ink hover:bg-bg transition-colors uppercase tracking-wider">{t("squad.navMidfielders")} <span className="text-muted">({activeMT.length})</span></a>
          <a href="#AT" className="shrink-0 px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold text-ink hover:bg-bg transition-colors uppercase tracking-wider">{t("squad.section.forwards")} <span className="text-muted">({activeAT.length})</span></a>
          {forfaits.length > 0 && (
            <a href="#forfaits" className="shrink-0 px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold text-ink hover:bg-bg transition-colors uppercase tracking-wider">{t("squad.forfaits")} <span className="text-muted">({forfaits.length})</span></a>
          )}
          <span className="text-line shrink-0">·</span>
          <a href="#staff-technique" className="shrink-0 px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold text-ink hover:bg-bg transition-colors uppercase tracking-wider">{t("squad.staff")} <span className="text-muted">({staff.length})</span></a>
        </div>
      </nav>

      <div className="max-w-content mx-auto px-5 py-12 md:py-16 space-y-16">
        {/* Coach + Captain card */}
        <section id="staff" className="grid md:grid-cols-2 gap-4 scroll-mt-20">
          <LeaderCard
            role={t("squad.role.headCoach")}
            name={squadStats.coach}
            detail={pick(squadStats.coachDetail, squadStats.coachDetailEn)}
            note={pick(squadStats.coachNote, squadStats.coachNoteEn)}
            photo={squadStats.coachPhoto}
            photoLabel={`${squadStats.coach} · ${t("squad.role.headCoach")}`}
          />
          <LeaderCard
            role={t("squad.role.captain")}
            name={squadStats.captain}
            detail={pick(squadStats.captainDetail, squadStats.captainDetailEn)}
            note={pick(squadStats.captainNote, squadStats.captainNoteEn)}
            accent
            photo={squadStats.captainPhoto}
            photoLabel={`${squadStats.captain} · ${t("squad.role.captain")}`}
          />
        </section>

        {/* Position groups */}
        <PositionGroup anchorId="GK" title={t("squad.section.goalkeepers")} position="GB" positionFull="Gardien" count={activeGK.length} players={activeGK} onPlayerClick={openPlayer} statFor={statFor} />
        <PositionGroup anchorId="DF" title={t("squad.section.defenders")} position="DF" positionFull="Défenseur" count={activeDF.length} players={activeDF} onPlayerClick={openPlayer} statFor={statFor} />
        <PositionGroup anchorId="MT" title={t("squad.section.midfielders")} position="MT" positionFull="Milieu" count={activeMT.length} players={activeMT} onPlayerClick={openPlayer} statFor={statFor} />
        <PositionGroup anchorId="AT" title={t("squad.section.forwards")} position="AT" positionFull="Attaquant" count={activeAT.length} players={activeAT} onPlayerClick={openPlayer} statFor={statFor} />

        {forfaits.length > 0 && (
          <ForfaitsSection players={forfaits} onPlayerClick={openPlayer} statFor={statFor} />
        )}

        {/* Technical staff */}
        <StaffGroup anchorId="staff-technique" title={t("squad.staff")} staff={staff} onStaffClick={openStaff} />

        {/* Top buteurs récents — totaux fenêtre récente (DB), distincts des
            sélections de carrière des fiches. Clic = ouvre la fiche joueur. */}
        <TopScorers onSelectPlayer={setSelectedPlayer} />

        {/* The kit */}
        <section className="space-y-6">
          <div className="border-b border-line pb-3">
            <h2 className="font-display text-2xl md:text-3xl">{t("squad.kitTitle")}</h2>
            <p className="text-muted text-sm mt-1">
              {t("squad.kitSubtext")}
            </p>
          </div>

          <div className="bg-white border border-line rounded-lg overflow-hidden">
            <ImagePlaceholder
              src="/images/photos/kit-2026.jpg"
              aspect="21/9"
              label={t("squad.kitImageLabel")}
              rounded={false}
            />
            <div className="p-6 md:p-8 space-y-5">
              <p className="text-ink leading-relaxed">
                {t("squad.kitIntro")}
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <KitDetail
                  label={t("squad.kit1Label")}
                  title="Vertières, 1803"
                  body={t("squad.kit1Body")}
                />
                <KitDetail
                  label={t("squad.kit2Label")}
                  title={t("squad.kit2Title")}
                  body={t("squad.kit2Body")}
                />
                <KitDetail
                  label={t("squad.kit3Label")}
                  title={t("squad.kit3Title")}
                  body={t("squad.kit3Body")}
                />
              </div>

              <p className="text-ink leading-relaxed">
                <strong className="text-ink">{t("squad.kitUpdatePrefix")}</strong>{" "}
                <Link
                  to="/journal/maillot-grenadiers-fifa-modifications"
                  className="text-haiti-blue underline underline-offset-2 hover:text-haiti-red transition-colors"
                >
                  {t("squad.kitUpdateLink")}
                </Link>
                {t("squad.kitUpdateSuffix")}
              </p>

              <div className="pt-4 border-t border-line flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-sm text-muted leading-relaxed">
                  {t("squad.kitMadeByPrefix")} <strong className="text-ink">Saeta</strong>{t("squad.kitMadeBySuffix")}
                </p>
                <a
                  href="https://saeta.us/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 shrink-0 px-6 py-3 bg-haiti-red text-bg font-semibold rounded-full hover:bg-haiti-red-dark transition-colors"
                >
                  {t("squad.kitBuy")} →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Training camp */}
        <section className="space-y-6">
          <div className="border-b border-line pb-3">
            <h2 className="font-display text-2xl md:text-3xl">{t("squad.campTitle")}</h2>
            <p className="text-muted text-sm mt-1">
              {t("squad.campSubtext")}
            </p>
          </div>

          {/* Phase 1 */}
          <div className="bg-white border border-line rounded-lg overflow-hidden">
            <ImagePlaceholder
              src="/images/photos/training-port-st-lucie.jpg"
              aspect="21/9"
              label="Port St. Lucie · voco Sandpiper Resort"
              rounded={false}
            />
            <div className="p-6 md:p-8">
              <div className="flex items-baseline justify-between gap-4 flex-wrap mb-3">
                <p className="text-haiti-red text-xs uppercase tracking-wider font-bold">
                  {trainingCamp.phase1.name}
                </p>
                <p className="text-xs text-muted uppercase tracking-wider font-semibold">
                  {trainingCamp.phase1.dates}
                </p>
              </div>
              <h3 className="font-display text-2xl mb-1">{trainingCamp.phase1.base}</h3>
              <p className="text-sm text-muted mb-4">{trainingCamp.phase1.city}</p>
              <p className="text-ink leading-relaxed">{trainingCamp.phase1.purpose}</p>
            </div>
          </div>

          {/* Phase 2 — base camp */}
          <div className="bg-haiti-blue text-bg rounded-lg overflow-hidden">
            <ImagePlaceholder
              src="/images/photos/training-stockton.jpg"
              aspect="21/9"
              label="Stockton University · G. Larry James Stadium"
              rounded={false}
            />
            <div className="p-6 md:p-8">
              <div className="flex items-baseline justify-between gap-4 flex-wrap mb-3">
                <p className="text-haiti-red text-xs uppercase tracking-wider font-bold">
                  {trainingCamp.phase2.name}
                </p>
                <p className="text-xs text-bg/60 uppercase tracking-wider font-semibold">
                  {trainingCamp.phase2.dates}
                </p>
              </div>
              <h3 className="font-display text-2xl mb-1">{trainingCamp.phase2.base}</h3>
              <p className="text-sm text-bg/60 mb-4">
                {trainingCamp.phase2.facility} · {trainingCamp.phase2.city}
              </p>
              <p className="text-bg/90 leading-relaxed mb-6">{trainingCamp.phase2.purpose}</p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-wider text-bg/60 font-semibold mb-1">
                    {t("squad.lodging")}
                  </p>
                  <p className="text-bg">{trainingCamp.phase2.accommodation}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-bg/60 font-semibold mb-1">
                    {t("squad.selectedBy")}
                  </p>
                  <p className="text-bg">{trainingCamp.phase2.selectedBy}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Local ties */}
          {trainingCamp.phase2.localTies && trainingCamp.phase2.localTies.length > 0 && (
            <div>
              <h3 className="font-display text-lg mb-3">{t("squad.localTies")}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {trainingCamp.phase2.localTies.map((t) => (
                  <div key={t.player} className="bg-white border border-line rounded-lg p-5">
                    <p className="font-display text-lg mb-2">{t.player}</p>
                    <p className="text-sm text-ink leading-relaxed">{t.connection}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs text-muted leading-relaxed">{trainingCamp.notes}</p>
        </section>

        <SponsorPanel placement="squad-page" />

        {/* ─── CLOSING SUMMARY — facts + qualif. record ──────────────── */}
        <section className="bg-white border border-line rounded-lg overflow-hidden">
          <div className="p-6 md:p-10 grid gap-8 lg:gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
            {/* About this selection */}
            <div>
              <p className="text-haiti-red text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold mb-6">
                {t("squad.aboutSelection")}
              </p>
              <p className="text-ink text-base md:text-lg leading-relaxed max-w-prose text-left">
                {lang === "en" ? (
                  <>
                    Final 26-man list announced by head coach Sébastien Migné on <strong>{squadStats.announcedDateEn}</strong>. Average age <strong>26</strong>. Oldest <strong>Johny Placide</strong> (38), youngest <strong>Keeto Thermoncy</strong> (20). The players turn out for clubs in France, England, Germany, Switzerland, Belgium, the Netherlands, Portugal, Slovakia, Hungary, Turkey, Iran, Ecuador, Canada, the United States, and Haiti, <strong>15 countries</strong> in all. Just one player, Woodensky Pierre of Violette Athletic Club, plays in Port-au-Prince. The other twenty-five play abroad.
                  </>
                ) : (
                  <>
                    Liste définitive des <strong>26 joueurs</strong> annoncée par le sélectionneur Sébastien Migné le <strong>{squadStats.announcedDate}</strong>. Âge moyen <strong>26 ans</strong>. Doyen <strong>Johny Placide</strong> (38), cadet <strong>Keeto Thermoncy</strong> (20). Les joueurs évoluent dans des clubs en France, en Angleterre, en Allemagne, en Suisse, en Belgique, aux Pays-Bas, au Portugal, en Slovaquie, en Hongrie, en Turquie, en Iran, en Équateur, au Canada, aux États-Unis et en Haïti, <strong>15 pays</strong> au total. Un seul joueur, Woodensky Pierre du Violette Athletic Club, évolue à Port-au-Prince. Les vingt-cinq autres jouent à l'étranger.
                  </>
                )}
              </p>
            </div>

            {/* Qualification record */}
            <div className="pt-8 border-t border-line lg:pt-0 lg:border-t-0 lg:border-l lg:border-line lg:pl-10">
              <p className="text-haiti-red text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold mb-5">
                {t("squad.qualifRecordTitle")}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-10 gap-y-5 text-sm md:text-base text-muted">
                <span><strong className="text-haiti-blue font-display text-xl md:text-2xl tabular-nums">6 – 2 – 2</strong>{" "}<span className="ml-1 uppercase tracking-wider text-xs">{t("squad.winsDrawsLosses")}</span></span>
                <span><strong className="text-haiti-blue font-display text-xl md:text-2xl tabular-nums">20 : 13</strong>{" "}<span className="ml-1 uppercase tracking-wider text-xs">{t("squad.goalsForAgainst")}</span></span>
                <span><strong className="text-haiti-blue font-display text-xl md:text-2xl tabular-nums">6 buts</strong>{" "}<span className="ml-1 uppercase tracking-wider text-xs">Nazon, {t("squad.bestScorer")}</span></span>
                <span><strong className="text-haiti-blue font-display text-xl md:text-2xl tabular-nums">3 passes</strong>{" "}<span className="ml-1 uppercase tracking-wider text-xs">Jean-Jacques, {t("squad.bestPasser")}</span></span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── RANKINGS — data-driven top-5s from squad.js ───────────── */}
        <section className="bg-white border border-line rounded-lg p-6 md:p-10">
          <p className="text-haiti-red text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold mb-6">
            {t("squad.rankingsTitle")}
          </p>
          <div className="grid gap-8 md:gap-12 md:grid-cols-2">
            <RankingList title={t("squad.topScorers")} players={topScorers} statKey="goals" unit={t("squad.goalsUnit")} onSelect={openPlayer} />
            <RankingList title={t("squad.mostCapped")} players={mostCapped} statKey="caps" unit={t("squad.capsUnit")} onSelect={openPlayer} />
          </div>
        </section>

        {/* CTA — match schedule */}
        <section className="bg-gradient-to-br from-haiti-blue via-haiti-blue to-ink text-bg rounded-2xl px-6 md:px-12 py-12 md:py-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-full w-2 flex flex-col">
            <div className="flex-1 bg-haiti-blue-light"></div>
            <div className="flex-1 bg-haiti-red"></div>
          </div>
          <div className="relative max-w-3xl">
            <p className="text-haiti-red text-xs uppercase tracking-[0.25em] font-bold mb-4">
              {t("squad.ctaEyebrow")}
            </p>
            <h2 className="font-display text-3xl md:text-5xl leading-tight mb-5">
              {t("squad.ctaTitle1")}<br />
              <span className="text-haiti-red">{t("squad.ctaTitle2")}</span>
            </h2>
            <p className="text-bg/80 text-lg leading-relaxed mb-7 max-w-2xl">
              {t("squad.ctaBody")}
            </p>
            <Link to="/matches" className="inline-flex items-center gap-2 px-7 py-3.5 bg-haiti-red text-bg font-semibold rounded-full hover:bg-haiti-red-dark transition-colors">
              {t("squad.ctaButton")} →
            </Link>
          </div>
        </section>

        {/* Source disclaimer · caps and stats come from third-party data */}
        <p className="text-center text-xs text-muted">
          {t("squad.statsDisclaimer")}
        </p>
      </div>

      {/* Player modal */}
      {selectedPlayer && (
        <PlayerModal
          player={selectedPlayer}
          stat={statFor(selectedPlayer)}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </div>
  );
}

function RankingList({ title, players, statKey, unit, onSelect }) {
  return (
    <div>
      <p className="font-display text-lg md:text-xl text-ink mb-4">{title}</p>
      <ol className="space-y-2">
        {players.map((p, i) => (
          <li key={p.slug}>
            <button
              type="button"
              onClick={() => onSelect(p, p.positionFull, p.position)}
              className="w-full flex items-baseline gap-3 text-left group"
            >
              <span className="text-muted tabular-nums text-sm w-5 shrink-0">{i + 1}</span>
              <span className="text-ink font-medium flex-1 group-hover:text-haiti-red transition-colors">{p.name}</span>
              <span className="text-haiti-blue font-display tabular-nums whitespace-nowrap">
                {p[statKey]} <span className="text-muted text-xs uppercase tracking-wider">{unit}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Stat({ label, value }) {
  const isNumeric = typeof value === "number";
  return (
    <div>
      <div className="font-display text-3xl md:text-4xl text-haiti-blue tabular-nums">
        {isNumeric ? <CountUpNumber target={value} duration={1500} /> : value}
      </div>
      <div className="text-xs uppercase tracking-wider text-muted mt-1 font-semibold">{label}</div>
    </div>
  );
}

// Magazine-style stat block. `smaller` for strings; default for numbers.
function BigStat({ number, label, smaller }) {
  const isNumeric = typeof number === "number";
  return (
    <div>
      <div className={`font-display text-haiti-blue leading-[1.05] ${smaller ? "text-2xl md:text-3xl lg:text-4xl" : "text-4xl md:text-5xl lg:text-6xl tabular-nums"}`}>
        {isNumeric ? <CountUpNumber target={number} duration={1500} /> : number}
      </div>
      <div className="text-[11px] md:text-xs uppercase tracking-[0.15em] text-muted mt-3 font-semibold leading-snug">
        {label}
      </div>
    </div>
  );
}

function KitDetail({ label, title, body }) {
  return (
    <div className="bg-bg rounded-lg p-5 border border-line">
      <p className="text-xs uppercase tracking-wider text-haiti-red font-bold mb-2">{label}</p>
      <h3 className="font-display text-lg mb-2">{title}</h3>
      <p className="text-sm text-ink leading-relaxed">{body}</p>
    </div>
  );
}

function LeaderCard({ role, name, detail, note, accent, photoLabel, photo }) {
  return (
    <div
      className={`rounded-lg border overflow-hidden ${
        accent ? "bg-haiti-blue text-bg border-haiti-blue" : "bg-white border-line"
      }`}
    >
      <ImagePlaceholder src={photo} label={photoLabel || name} aspect="4/3" objectPosition="center top" rounded={false} />
      <div className="p-6 md:p-8">
        <p
          className={`text-xs uppercase tracking-wider font-bold mb-3 ${
            accent ? "text-haiti-red" : "text-haiti-red"
          }`}
        >
          {role}
        </p>
        <h2 className="font-display text-3xl mb-1">{name}</h2>
        <p className={`text-sm mb-4 ${accent ? "text-bg/70" : "text-muted"}`}>{detail}</p>
        <p className={`text-sm leading-relaxed ${accent ? "text-bg/90" : "text-ink"}`}>{note}</p>
      </div>
    </div>
  );
}

function PositionGroup({ anchorId, title, position, positionFull, count, players, onPlayerClick, statFor }) {
  const { t } = useT();
  return (
    <section id={anchorId} className="scroll-mt-20">
      <div className="flex items-baseline justify-between border-b border-line pb-3 mb-6">
        <h2 className="font-display text-2xl md:text-3xl">{title}</h2>
        <span className="text-sm text-muted uppercase tracking-wider font-semibold">
          {count} {t("squad.players")}
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {players.map((p) => (
          <PlayerCard
            key={p.name}
            player={p}
            stat={statFor ? statFor(p) : null}
            onClick={() => onPlayerClick(p, positionFull, position)}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Forfaits ─────────────────────────────────────────────────────────
// Players who are part of the journey but had to withdraw on injury. Same
// PlayerCard + modal as active players, only quieter (PlayerCard desaturates
// the photo and surfaces the status badge/note via the `status` fields).
function ForfaitsSection({ players, onPlayerClick, statFor }) {
  const { t } = useT();
  if (!players.length) return null;
  return (
    <section id="forfaits" className="scroll-mt-20">
      <div className="flex items-baseline justify-between border-b border-line pb-3 mb-2">
        <h2 className="font-display text-2xl md:text-3xl text-muted">{t("squad.forfaits")}</h2>
        <span className="text-sm text-muted uppercase tracking-wider font-semibold">
          {players.length} {players.length === 1 ? t("squad.player") : t("squad.players")}
        </span>
      </div>
      <p className="text-muted text-sm mb-6">
        {t("squad.forfaitsNote")}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {players.map((p) => (
          <PlayerCard
            key={p.name}
            player={p}
            stat={statFor ? statFor(p) : null}
            onClick={() => onPlayerClick(p, p.positionFull, p.position)}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Staff technique ─────────────────────────────────────────────────
// Mirrors PositionGroup/PlayerCard but adapted for staff: the role replaces
// the position/number, no jersey number, and a monogram stands in when no
// headshot exists yet (optional `photo` field).

// Reuses the exact PlayerCard so staff cards are visually identical to players.
// Staff members are passed as player-shaped objects flagged `isStaff`; PlayerCard
// (and PlayerModal) show the role where the number/club go and surface the bio
// through the same modal interaction. Missing photos fall back to the shared
// ImagePlaceholder crest — exactly like a player with no photo yet.
function StaffGroup({ anchorId, title, staff, onStaffClick }) {
  const { t } = useT();
  return (
    <section id={anchorId} className="scroll-mt-20">
      <div className="flex items-baseline justify-between border-b border-line pb-3 mb-6">
        <h2 className="font-display text-2xl md:text-3xl">{title}</h2>
        <span className="text-sm text-muted uppercase tracking-wider font-semibold">
          {staff.length} {t("squad.members")}
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {staff.map((m) => (
          <PlayerCard
            key={m.name}
            player={{ ...m, isStaff: true }}
            onClick={() => onStaffClick(m)}
          />
        ))}
      </div>
    </section>
  );
}

// Derived stat tag — objective achievements during qualification.
// Subjective "Key Player" tags avoided; only stats and roles.
function derivedStatTag(slug, t) {
  switch (slug) {
    case "duckens-nazon":
      return {
        label: t("squad.goalsInQualif").replace("{n}", 6),
        short: t("squad.goalsShort").replace("{n}", 6),
      };
    case "danley-jean-jacques":
      return {
        label: t("squad.assistsInQualif").replace("{n}", 3),
        short: t("squad.assistsShort").replace("{n}", 3),
      };
    default:
      return null;
  }
}

function PlayerCard({ player, stat, onClick }) {
  const { t, lang } = useT();
  const isCaptain = player.captain;
  const statTag = derivedStatTag(player.slug, t);
  // Local crest override (player.clubLogo) wins over the stats-API logo.
  const clubLogo = !player.isStaff ? (player.clubLogo || stat?.club_logo) : null;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className={`w-full text-left rounded-lg border bg-white relative overflow-hidden hover:shadow-lg transition-shadow group ${
        isCaptain ? "border-haiti-red shadow-sm" : "border-line"
      }`}
    >
      {/* Photo area with jersey-number watermark */}
      <div className="relative overflow-hidden aspect-[4/5]">
        <motion.div
          className={`absolute inset-0 ${player.status ? "grayscale-[.65] opacity-90" : ""}`}
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <ImagePlaceholder
            src={player.photo}
            label={player.name}
            aspect="4/5"
            rounded={false}
            className="w-full h-full"
          />
        </motion.div>

        {/* Gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent pointer-events-none" />

        {/* Jersey number — bottom-right anchor */}
        {player.number !== null && player.number !== undefined && (
          <div className="absolute bottom-2 right-2 font-display text-5xl md:text-6xl text-bg/90 leading-none tabular-nums select-none pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            {player.number}
          </div>
        )}

        {/* Top-right tags stack */}
        <div className="absolute top-2 right-2 flex flex-col items-end gap-1 max-w-[70%]">
          {isCaptain && (
            <span className="text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 bg-haiti-red text-bg rounded uppercase tracking-wider">
              {t("squad.role.captain")}
            </span>
          )}
          {statTag && (
            <span className="text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 bg-haiti-blue text-bg rounded uppercase tracking-wider whitespace-nowrap">
              <span className="hidden md:inline">{statTag.label}</span>
              <span className="md:hidden">{statTag.short}</span>
            </span>
          )}
          {player.status && player.statusLabel && (
            <span className="text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 bg-haiti-red text-bg rounded uppercase tracking-wider whitespace-nowrap">
              {player.statusLabel}
            </span>
          )}
        </div>

        {/* Position tags top-left */}
        {player.positionTags && player.positionTags.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {player.positionTags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-bg/95 text-ink rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Name + secondary line overlay at bottom-left.
            Players show club · country; staff show their role in the same slot. */}
        <div className={`absolute bottom-3 left-3 text-bg ${player.isStaff ? "right-3" : "right-16"}`}>
          <h3 className="font-display text-base md:text-lg leading-tight mb-0.5 drop-shadow-md">
            {player.name}
          </h3>
          <p className="text-bg/85 text-[11px] md:text-xs leading-tight flex items-center gap-1.5">
            {clubLogo && (
              <img
                src={clubLogo}
                alt=""
                loading="lazy"
                className="w-4 h-4 object-contain shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
              />
            )}
            <span className="truncate">
              {player.isStaff ? (lang === "en" && player.roleEn ? player.roleEn : player.role) : `${player.club} · ${player.clubCountry}`}
            </span>
          </p>
        </div>
      </div>

      {/* Footer — player stats, or a plain "Profil →" affordance for staff */}
      {player.isStaff ? (
        <div className="px-3 py-2.5 border-t border-line flex items-center justify-end gap-2 text-xs text-muted">
          <span className="text-haiti-blue font-semibold group-hover:translate-x-0.5 transition-transform">
            {t("squad.profile")} →
          </span>
        </div>
      ) : player.status ? (
        <div className="px-3 py-2.5 border-t border-line text-[11px] md:text-xs text-haiti-red font-medium leading-snug">
          {player.statusNote}
        </div>
      ) : (
        <div className="px-3 py-2.5 border-t border-line flex items-center justify-between gap-2 text-xs text-muted">
          <span>
            <strong className="text-ink tabular-nums">{player.age ?? "—"}</strong> {t("squad.ageUnit")}
          </span>
          <span>
            <strong className="text-ink tabular-nums">{player.caps ?? 0}</strong> {t("squad.capsUnit")}
          </span>
          {player.goals > 0 ? (
            <span>
              <strong className="text-haiti-red tabular-nums">{player.goals}</strong> {t("squad.goalsUnit")}
            </span>
          ) : (
            <span className="opacity-50">
              <strong className="tabular-nums">0</strong> {t("squad.goalsUnit")}
            </span>
          )}
          <span className="text-haiti-blue font-semibold hidden md:inline group-hover:translate-x-0.5 transition-transform">
            {t("squad.profile")} →
          </span>
        </div>
      )}
    </motion.button>
  );
}
