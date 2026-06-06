// Sponsor slot system
// Three slot types:
// - banner: full-width strip placement (Home, top of inner pages)
// - card: native card mixed into content lists (Stories, Watch Parties)
// - dedicated: dedicated panel on a specific page (Matches, Squad)
//
// Set active: false to hide a sponsor entry without removing it.
// Replace placeholder values with real sponsor data as deals close.

export const sponsors = {
  // ========== TITLE / PRESENTING SPONSOR ==========
  // Shows as a small "Presented by" line under the site logo and as a banner block on Home.
  title: {
    active: false,
    name: "Your Brand Here",
    tagline: "Presenting partner of Grenadiers 2026",
    logoUrl: null, // e.g. "/sponsors/title-logo.svg"
    websiteUrl: "https://example.com",
    color: "#00209F", // optional brand accent
  },

  // ========== BANNER SLOTS ==========
  // Full-width 1200x180 strip blocks. Rotated by slot location.
  banners: [
    {
      id: "banner-home-hero",
      active: false,
      placement: "home-after-hero",
      name: "Brand A",
      headline: "Headline goes here",
      subhead: "Subhead or call to action.",
      imageUrl: null, // 1200x180 recommended
      websiteUrl: "https://example.com",
      ctaLabel: "Learn more",
    },
    {
      id: "banner-matches",
      active: false,
      placement: "matches-page",
      name: "Brand B",
      headline: "Where to watch Les Grenadiers",
      subhead: "Official broadcast partner.",
      imageUrl: null,
      websiteUrl: "https://example.com",
      ctaLabel: "Tune in",
    },
  ],

  // ========== NATIVE CARD SLOTS ==========
  // Mixed into Stories index and Watch Parties listings.
  cards: [
    {
      id: "card-stories-1",
      active: false,
      placement: "stories-index",
      name: "Brand C",
      eyebrow: "Sponsored",
      title: "Title of the sponsored card.",
      dek: "A short description that reads like editorial but is clearly labeled as Sponsored.",
      imageUrl: null,
      websiteUrl: "https://example.com",
    },
  ],

  // ========== DEDICATED PANELS ==========
  // Larger placements on specific pages.
  panels: [
    {
      id: "panel-squad",
      active: false,
      placement: "squad-page",
      name: "Brand D",
      headline: "Brand D supports Les Grenadiers",
      body: "Optional longer copy block. 2-3 sentences max.",
      imageUrl: null,
      websiteUrl: "https://example.com",
    },
  ],

  // ========== WATCH PARTY SPONSOR ==========
  // Single sponsor pinned at top of Watch Parties page.
  watchParties: {
    active: false,
    name: "Brand E",
    headline: "Official Watch Party partner",
    body: "Hosted in cities across the diaspora.",
    logoUrl: null,
    websiteUrl: "https://example.com",
  },
};

// Helper to get active sponsors by placement
export function getActiveSponsors(type, placement) {
  const collection = sponsors[type];
  if (!collection) return [];
  if (Array.isArray(collection)) {
    return collection.filter((s) => s.active && (!placement || s.placement === placement));
  }
  return collection.active && (!placement || collection.placement === placement) ? [collection] : [];
}
