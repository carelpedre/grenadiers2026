import PageHeader from "../components/PageHeader";
import ImagePlaceholder from "../components/ImagePlaceholder";
import { federation } from "../data/federation";
import { useT } from "../lib/i18n";

// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  FEDERATION PAGE                                                       ║
// ║  /federation                                                           ║
// ║                                                                        ║
// ║  Now features:                                                         ║
// ║  • FHF logo in a hero card above the page                             ║
// ║  • Monique André featured with photo + bio + milestones         ║
// ║  • Rest of Normalization Committee listed below her                   ║
// ╚═══════════════════════════════════════════════════════════════════════╝

export default function Federation() {
  const yearsOld = 2026 - federation.founded;
  const { t } = useT();
  const featured = federation.currentLeadership.featured;

  return (
    <div>
      <PageHeader
        eyebrow={t("federation.eyebrow")}
        title={t("federation.title")}
        subtitle={t("federation.subtitle")}
      />

      {/* Logo + identity strip */}
      <section className="bg-white border-b border-line">
        <div className="max-w-content mx-auto px-5 py-10">
          <div className="grid md:grid-cols-[180px_1fr] gap-6 md:gap-8 items-center">
            <div className="w-32 h-32 md:w-44 md:h-44 mx-auto md:mx-0 flex items-center justify-center bg-bg border border-line rounded-2xl p-4">
              <img
                src={federation.logo}
                alt={t("federation.logoAlt")}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  // Final fallback: show bicolor flag panel
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement.innerHTML =
                    '<div class="w-full h-full flex flex-col rounded-lg overflow-hidden"><div class="flex-1 bg-haiti-blue"></div><div class="flex-1 bg-haiti-red"></div></div>';
                }}
              />
            </div>
            <div>
              <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-2">
                {t("federation.governingBody")}
              </p>
              <h2 className="font-display text-2xl md:text-3xl mb-1 leading-tight">
                {federation.name.fr}
              </h2>
              <p className="text-muted text-sm mb-3">
                {federation.name.en} · {federation.name.ht}
              </p>
              <p className="text-ink/80 leading-relaxed text-sm md:text-base">
                {t("federation.identityLine")
                  .replace("{founded}", federation.founded)
                  .replace("{hq}", federation.headquarters)
                  .replace("{fifa}", federation.fifaAffiliation)
                  .replace("{concacaf}", federation.concacafAffiliation)}{" "}
                {federation.publicUtilityNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-bg border-b border-line">
        <div className="max-w-content mx-auto px-5 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <Stat label={t("federation.statFounded")} value={federation.founded} />
          <Stat label={t("federation.statYears")} value={yearsOld} />
          <Stat label={t("federation.statFifaMember")} value={federation.fifaAffiliation} />
          <Stat label="CONCACAF" value={federation.concacafAffiliation} />
        </div>
      </section>

      <div className="max-w-content mx-auto px-5 py-16 space-y-16">
        {/* À la une — Latest institutional news */}
        <section className="bg-haiti-blue text-bg rounded-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 h-full w-2 flex flex-col">
            <div className="flex-1 bg-haiti-blue-light"></div>
            <div className="flex-1 bg-haiti-red"></div>
          </div>
          <div className="p-6 md:p-10 lg:p-12 relative">
            <p className="text-haiti-red text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold mb-4">
              {t("federation.newsEyebrow")}
            </p>
            <h2 className="font-display text-2xl md:text-4xl lg:text-5xl leading-[1.1] mb-5 max-w-3xl">
              {t("federation.newsTitle")}
            </h2>
            <p className="text-bg/85 text-base md:text-lg leading-relaxed max-w-3xl mb-4">
              {t("federation.newsBody1")}
            </p>
            <p className="text-bg/70 text-sm md:text-base leading-relaxed max-w-3xl">
              {t("federation.newsBody2")}
            </p>
          </div>
        </section>

        {/* The pioneer */}
        <section className="bg-white border border-line rounded-lg overflow-hidden">
          <div className="grid md:grid-cols-[280px_1fr]">
            <ImagePlaceholder
              src="/images/photos/henriquez.jpg"
              aspect="1/1"
              label="Constantin Henriquez · 1904"
              rounded={false}
            />
            <div className="p-6 md:p-8">
              <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-3">
                {t("federation.pioneer")}
              </p>
              <h3 className="font-display text-2xl md:text-3xl mb-3">{federation.founder}</h3>
              <p className="text-ink leading-relaxed">{federation.founderNote}</p>
            </div>
          </div>
        </section>

        {/* Current leadership — Monique André FEATURED */}
        <section>
          <h2 className="font-display text-2xl md:text-3xl border-b border-line pb-3 mb-6">
            {t("federation.currentLeadership")}
          </h2>

          {/* Context card */}
          <div className="bg-white border border-line rounded-lg p-6 md:p-8 mb-6">
            <p className="text-xs uppercase tracking-wider text-haiti-red font-bold mb-2">
              {federation.currentLeadership.structure}
            </p>
            <p className="text-ink leading-relaxed">
              {federation.currentLeadership.structureNote}
            </p>
          </div>

          {/* FEATURED: Monique André */}
          <div className="bg-gradient-to-br from-haiti-blue to-haiti-blue-dark text-bg rounded-2xl overflow-hidden mb-6">
            <div className="grid md:grid-cols-[340px_1fr] gap-0">
              {/* Photo — square on mobile for centered face crop, portrait on desktop */}
              <div className="relative">
                {/* Mobile: 1/1 square, focus on her face */}
                <div className="md:hidden">
                  <ImagePlaceholder
                    src={featured.photo}
                    label={featured.photoLabel}
                    aspect="1/1"
                    objectPosition="center 25%"
                    rounded={false}
                  />
                </div>
                {/* Desktop: original 4/5 portrait */}
                <div className="hidden md:block">
                  <ImagePlaceholder
                    src={featured.photo}
                    label={featured.photoLabel}
                    aspect="4/5"
                    objectPosition="center 25%"
                    rounded={false}
                  />
                </div>
              </div>

              {/* Bio + milestones */}
              <div className="p-6 md:p-10">
                <p className="text-gold text-xs uppercase tracking-wider font-bold mb-3">
                  {t("federation.inOffice").replace("{since}", featured.since)}
                </p>
                <h3 className="font-display text-3xl md:text-4xl mb-2 leading-tight">
                  {featured.name}
                </h3>
                <p className="text-bg/70 text-sm md:text-base mb-5 font-semibold">
                  {featured.role}
                </p>

                <p className="text-bg/85 leading-relaxed mb-6">
                  {featured.bio}
                </p>

                <div className="mb-5">
                  <p className="text-xs uppercase tracking-wider font-bold text-bg/50 mb-3">
                    {t("federation.keyMoments")}
                  </p>
                  <ul className="space-y-2">
                    {featured.milestones.map((m, i) => (
                      <li key={i} className="text-sm text-bg/80 leading-relaxed flex items-start gap-2">
                        <span className="text-haiti-red mt-1.5 shrink-0">●</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-xs text-bg/60 leading-relaxed italic">
                  {featured.previousRoles}
                </p>
              </div>
            </div>
          </div>

          {/* Rest of the Normalization Committee */}
          <p className="text-xs uppercase tracking-wider text-muted font-bold mb-3">
            {t("federation.restOfCommittee")}
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {federation.currentLeadership.members.map((m) => (
              <LeaderCard key={m.role} role={m.role} name={m.name} />
            ))}
          </div>
        </section>

        {/* Home stadium */}
        <section className="bg-ink text-bg rounded-lg overflow-hidden">
          <ImagePlaceholder
            src="/images/photos/sylvio-cator.jpg"
            aspect="21/9"
            label="Stade Sylvio Cator · Port-au-Prince"
            rounded={false}
          />
          <div className="p-6 md:p-10">
            <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-3">
              {t("federation.homeStadiumEyebrow")}
            </p>
            <h3 className="font-display text-2xl md:text-3xl mb-2">
              {federation.homeStadium.name}
            </h3>
            <p className="text-bg/60 text-sm mb-4">{federation.homeStadium.city}</p>
            <p className="text-bg/80 leading-relaxed max-w-prose">
              {federation.homeStadium.note}
            </p>
          </div>
        </section>

        {/* Competitions */}
        <section>
          <h2 className="font-display text-2xl md:text-3xl border-b border-line pb-3 mb-6">
            {t("federation.competitionsTitle")}
          </h2>
          <ul className="grid md:grid-cols-2 gap-3">
            {federation.competitionsOrganized.map((c, i) => (
              <li
                key={i}
                className="bg-white border border-line rounded-lg p-4 text-ink flex items-start gap-3"
              >
                <span className="w-2 h-2 bg-haiti-red rounded-full mt-2 shrink-0"></span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Timeline */}
        <section>
          <h2 className="font-display text-2xl md:text-3xl border-b border-line pb-3 mb-2">
            {t("federation.timelineTitle")}
          </h2>
          <p className="text-muted text-sm mb-6">
            {t("federation.timelineSubtext")}
          </p>
          <ol className="space-y-3">
            {federation.notableMilestones.map((m, i) => (
              <li
                key={i}
                className="grid grid-cols-[64px_1fr] md:grid-cols-[80px_1fr] gap-3 md:gap-4 bg-white border border-line rounded-lg p-4"
              >
                <span className="font-display text-xl md:text-2xl text-haiti-blue tabular-nums self-start md:self-center">
                  {m.year}
                </span>
                <div className="self-center">
                  {m.team && (
                    <span className={`inline-block text-[10px] md:text-xs uppercase tracking-wider font-bold px-2 py-0.5 mr-2 rounded align-middle ${teamTagClass(m.team)}`}>
                      {m.team}
                    </span>
                  )}
                  <span className="text-ink leading-relaxed text-sm md:text-base">{m.event}</span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* External link */}
        <section className="text-center">
          <a
            href={federation.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-haiti-blue text-bg font-semibold rounded-full hover:bg-haiti-blue-dark transition-colors"
          >
            {t("federation.visitSite")}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
        </section>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="text-center md:text-left">
      <div className="font-display text-3xl md:text-4xl text-haiti-blue tabular-nums">{value}</div>
      <div className="text-xs uppercase tracking-wider text-muted mt-1 font-semibold">{label}</div>
    </div>
  );
}

function LeaderCard({ role, name }) {
  return (
    <div className="bg-white border border-line rounded-lg p-5">
      <p className="text-xs uppercase tracking-wider text-muted font-semibold mb-1">{role}</p>
      <p className="font-display text-lg text-ink">{name}</p>
    </div>
  );
}

// Color tags by team category — visual scanning across the timeline.
function teamTagClass(team) {
  switch (team) {
    case "Institution":
      return "text-muted bg-bg border border-line";
    case "Hommes A":
      return "text-haiti-blue bg-haiti-blue/10";
    case "Femmes A":
      return "text-haiti-red bg-haiti-red/10";
    case "Hommes U-20":
    case "Hommes U-17":
      return "text-haiti-blue-dark bg-haiti-blue/5 border border-haiti-blue/20";
    case "Femmes U-20":
    case "Femmes U-17":
      return "text-haiti-red-dark bg-haiti-red/5 border border-haiti-red/20";
    default:
      return "text-muted bg-bg";
  }
}
