// Reusable sponsor placement components.
// Each renders nothing if no active sponsor matches the requested placement.

import { sponsors, getActiveSponsors } from "../data/sponsors";

// Full-width banner block. Use on Home (after hero) and inner pages.
export function SponsorBanner({ placement }) {
  const active = getActiveSponsors("banners", placement);
  if (active.length === 0) return null;
  const s = active[0];

  return (
    <section className="bg-white border-y border-line">
      <div className="max-w-content mx-auto px-5 py-4">
        <p className="text-xs uppercase tracking-wider text-muted font-semibold mb-2">
          Sponsored
        </p>
        <a
          href={s.websiteUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 rounded-lg border border-line hover:border-haiti-blue transition-colors group"
        >
          <div className="flex items-center gap-4">
            {s.imageUrl ? (
              <img
                src={s.imageUrl}
                alt={s.name}
                className="w-16 h-16 object-contain shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded bg-line flex items-center justify-center text-xs text-muted shrink-0">
                {s.name?.slice(0, 2) || "?"}
              </div>
            )}
            <div>
              <h3 className="font-display text-lg group-hover:text-haiti-blue transition-colors">
                {s.headline}
              </h3>
              <p className="text-sm text-muted">{s.subhead}</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-haiti-red text-bg font-semibold rounded-full text-sm whitespace-nowrap">
            {s.ctaLabel || "Learn more"} →
          </span>
        </a>
      </div>
    </section>
  );
}

// Native sponsored card — drop into Stories index or other content lists.
export function SponsorCard({ placement }) {
  const active = getActiveSponsors("cards", placement);
  if (active.length === 0) return null;
  const s = active[0];

  return (
    <a
      href={s.websiteUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="block bg-white border border-line rounded-lg p-6 hover:border-haiti-blue transition-colors group"
    >
      <p className="text-haiti-blue text-xs uppercase tracking-wider font-bold mb-3 flex items-center gap-2">
        <span className="bg-haiti-blue text-bg px-2 py-0.5 rounded">{s.eyebrow || "Sponsored"}</span>
      </p>
      <h3 className="font-display text-xl mb-3 group-hover:text-haiti-blue transition-colors">
        {s.title}
      </h3>
      <p className="text-muted text-sm leading-relaxed">{s.dek}</p>
      <p className="text-xs text-muted mt-4">By {s.name}</p>
    </a>
  );
}

// Dedicated sponsor panel for individual pages.
export function SponsorPanel({ placement }) {
  const active = getActiveSponsors("panels", placement);
  if (active.length === 0) return null;
  const s = active[0];

  return (
    <section className="bg-bg border-y border-line">
      <div className="max-w-content mx-auto px-5 py-10">
        <p className="text-xs uppercase tracking-wider text-muted font-semibold mb-4">
          Sponsored
        </p>
        <a
          href={s.websiteUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="block p-8 rounded-lg bg-white border border-line hover:border-haiti-blue transition-colors group"
        >
          <h3 className="font-display text-2xl mb-3 group-hover:text-haiti-blue transition-colors">
            {s.headline}
          </h3>
          <p className="text-muted leading-relaxed mb-4">{s.body}</p>
          <p className="text-xs text-muted">By {s.name}</p>
        </a>
      </div>
    </section>
  );
}

// Title sponsor line — shows under the logo in the header if active.
export function TitleSponsorLine() {
  const t = sponsors.title;
  if (!t || !t.active) return null;
  return (
    <a
      href={t.websiteUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="block text-xs uppercase tracking-wider text-muted hover:text-haiti-red transition-colors"
    >
      {t.tagline}
    </a>
  );
}
