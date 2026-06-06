// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  DOCUMENTARY DATA                                                      ║
// ║                                                                        ║
// ║  Add YouTube/Vimeo trailers, posters, and behind-the-scenes here.      ║
// ║                                                                        ║
// ║  When you have real YouTube video IDs, just paste them into the        ║
// ║  `youtubeId` field. Same for posterImage paths.                        ║
// ║                                                                        ║
// ║  Set `comingSoon: false` and the trailer becomes live. Otherwise it    ║
// ║  shows a "coming soon" placeholder.                                    ║
// ╚═══════════════════════════════════════════════════════════════════════╝

export const documentaryFeature = {
  title: "Les Grenadiers",
  subtitle: "A Chokarella documentary",
  description:
    "Fifty-two years after Manno Sanon's goal against Italy, Haiti returns to the World Cup. This is the story of a team scattered across four continents, a coach who has never set foot in the country he leads, and a nation that refused to stop believing. Coming in 2026.",
  status: "in-production", // "in-production" | "trailer-released" | "released"
  releaseLine: "Coming June 2026",
  posterImage: "/images/documentary/grenadiers-poster.jpg",
  posterLabel: "Les Grenadiers — official poster",
};

// ─── Trailers ───────────────────────────────────────────────────────────
// Replace `youtubeId: null` and `comingSoon: true` once you have the real videos.
export const trailers = [
  {
    slug: "official-trailer",
    title: "Official trailer",
    subtitle: "The first look at Les Grenadiers — a documentary",
    duration: "2:14",
    youtubeId: null, // e.g. "dQw4w9WgXcQ" — replace when ready
    posterImage: "/images/documentary/trailer-1-thumb.jpg",
    posterLabel: "Trailer 1 thumbnail",
    comingSoon: true,
    releaseDate: "Coming May 2026",
  },
  {
    slug: "the-thirteen-tribute",
    title: "The Thirteen",
    subtitle: "Honoring the surviving 1974 squad",
    duration: "0:60",
    youtubeId: null,
    posterImage: "/images/documentary/thirteen-thumb.jpg",
    posterLabel: "The Thirteen tribute",
    comingSoon: true,
    releaseDate: "Coming June 2026",
  },
  {
    slug: "behind-the-camp",
    title: "Inside training camp",
    subtitle: "Behind the scenes from Port St. Lucie",
    duration: "1:30",
    youtubeId: null,
    posterImage: "/images/documentary/camp-thumb.jpg",
    posterLabel: "Behind the camp",
    comingSoon: true,
    releaseDate: "Coming June 2026",
  },
];

// ─── Press / magazine features ─────────────────────────────────────────
// FOX, Sports Illustrated, and other magazine-style posters Carel has art for
export const pressFeatures = [
  {
    slug: "fox-sports",
    publication: "FOX Sports",
    headline: "Haiti's return — 52 years in the making",
    image: "/images/documentary/fox-poster.jpg",
    imageLabel: "FOX Sports cover art",
    caption: "Cover art produced for FOX Sports' Group C coverage. Featured: Les Grenadiers.",
    comingSoon: true,
  },
  {
    slug: "sports-illustrated",
    publication: "Sports Illustrated",
    headline: "The road back",
    image: "/images/documentary/si-poster.jpg",
    imageLabel: "Sports Illustrated cover art",
    caption: "Cover art produced for Sports Illustrated. The story of a team that refused to give up.",
    comingSoon: true,
  },
];
