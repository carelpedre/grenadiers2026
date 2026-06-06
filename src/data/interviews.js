// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  INTERVIEW DATA                                                        ║
// ║                                                                        ║
// ║  Each interview has:                                                   ║
// ║    - subject: { name, role, photo }                                    ║
// ║    - youtubeId: YouTube video ID, or null if transcript-only           ║
// ║    - transcript: long-form text, or null if video-only                 ║
// ║    - keyQuote: a pull quote to feature on cards                        ║
// ║                                                                        ║
// ║  As Carel conducts interviews, add them here and they appear on        ║
// ║  /interviews automatically.                                            ║
// ╚═══════════════════════════════════════════════════════════════════════╝

export const interviews = [
  // Example structure — replace these scaffolds with real interviews as they're done
  {
    slug: "fhf-president-coming-soon",
    subject: {
      name: "TBD",
      role: "FHF leadership",
      photo: "/images/interviews/fhf-tbd.jpg",
    },
    title: "An interview with FHF leadership",
    eyebrow: "Conversation",
    date: "Coming June 2026",
    duration: "—",
    language: "Haitian Creole",
    youtubeId: null,
    transcript: null,
    keyQuote: "Coming soon — a candid conversation with the people running Haitian football.",
    comingSoon: true,
    publishedAt: null,
  },
  {
    slug: "frantzdy-pierrot-coming-soon",
    subject: {
      name: "Frantzdy Pierrot",
      role: "Forward · Çaykur Rizespor",
      photo: "/images/photos/frantzdy-pierrot.jpg",
    },
    title: "Frantzdy Pierrot, in his own words",
    eyebrow: "The forwards",
    date: "Coming June 2026",
    duration: "—",
    language: "French",
    youtubeId: null,
    transcript: null,
    keyQuote: "Coming soon — Frantzdy Pierrot on the road to the World Cup.",
    comingSoon: true,
    publishedAt: null,
  },
  {
    slug: "the-coach-coming-soon",
    subject: {
      name: "Sébastien Migné",
      role: "Head Coach",
      photo: "/images/photos/sebastien-migne.jpg",
    },
    title: "Coach Migné on coaching a country he's never visited",
    eyebrow: "The coach",
    date: "Coming June 2026",
    duration: "—",
    language: "French",
    youtubeId: null,
    transcript: null,
    keyQuote: "Coming soon — Sébastien Migné on the strange honor of coaching Haiti from a distance.",
    comingSoon: true,
    publishedAt: null,
  },
];

// Helper: filter for published interviews (drop coming-soons)
export function publishedInterviews() {
  return interviews.filter((i) => !i.comingSoon);
}

// Helper: find by slug
export function getInterview(slug) {
  return interviews.find((i) => i.slug === slug);
}
