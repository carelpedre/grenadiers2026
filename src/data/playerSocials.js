// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  PLAYER SOCIAL MEDIA HANDLES                                           ║
// ║                                                                        ║
// ║  Updated from Carel's research, May 2026.                              ║
// ║  All confirmed Instagram handles for the 26 players + coach.           ║
// ║                                                                        ║
// ║  To add more (X, TikTok, FB, YouTube, Website): edit the right field.  ║
// ║  Set to null or "" to hide that platform.                              ║
// ║                                                                        ║
// ║  For Instagram, TikTok, X, Facebook: paste handle WITHOUT the @        ║
// ║  For YouTube: paste @handle name OR full /channel/UCxxx path           ║
// ║  For website: paste full URL including https://                        ║
// ╚═══════════════════════════════════════════════════════════════════════╝

export const playerSocials = {
  // ─── GOALKEEPERS ──────────────────────────────────────────────────────
  "johny-placide": {
    instagram: "johny_placide",
    x: null, tiktok: null, facebook: null, youtube: null, website: null,
  },
  "alexandre-pierre": {
    instagram: "pierrot.jr",
    x: null, tiktok: null, facebook: null, youtube: null, website: null,
  },
  "josue-duverger": {
    instagram: "josue_duverger01",
    x: null, tiktok: null, facebook: null, youtube: null, website: null,
  },

  // ─── DEFENDERS ────────────────────────────────────────────────────────
  "ricardo-ade": {
    instagram: "adericardo4",
    x: "AdeRicardo4",
    tiktok: null,
    facebook: "adericardo",
    youtube: null,
    website: null,
  },
  "carlens-arcus": {
    instagram: "carlens_arcus",
    x: null, tiktok: null, facebook: null, youtube: null, website: null,
  },
  "martin-experience": {
    instagram: "martin_experience",
    x: null, tiktok: null, facebook: null, youtube: null, website: null,
  },
  "jean-kevin-duverne": {
    instagram: "jk_duverne",
    x: "jkduverne",
    tiktok: null, facebook: null, youtube: null, website: null,
  },
  "duke-lacroix": {
    instagram: "duke.lacroix",
    x: null, tiktok: null, facebook: null, youtube: null, website: null,
  },
  "wilguens-paugain": {
    instagram: "_wilpaug_",
    x: null, tiktok: null, facebook: null, youtube: null, website: null,
  },
  "hannes-delcroix": {
    instagram: "hannes_delcroix",
    x: null, tiktok: null, facebook: null, youtube: null, website: null,
  },
  "keeto-thermoncy": {
    instagram: "keeto.thermoncy",
    x: null, tiktok: null, facebook: null, youtube: null, website: null,
  },

  // ─── MIDFIELDERS ──────────────────────────────────────────────────────
  "leverton-pierre": {
    instagram: "leverton_p19",
    x: null, tiktok: null, facebook: null, youtube: null, website: null,
  },
  "danley-jean-jacques": {
    instagram: "danley_jean_jacques27",
    x: "DanleyJJ",
    tiktok: null, facebook: null, youtube: null, website: null,
  },
  "carl-sainte": {
    instagram: "carlfredsainte",
    x: null, tiktok: null,
    facebook: "Saintecarlfred",
    youtube: null, website: null,
  },
  "jean-ricner-bellegarde": {
    instagram: "bellegardejr",
    x: null, tiktok: null, facebook: null, youtube: null, website: null,
  },
  "woodensky-pierre": {
    instagram: "woodensky06",
    x: null, tiktok: null, facebook: null, youtube: null, website: null,
  },
  "dominique-simon": {
    instagram: "d.simon29",
    x: null, tiktok: null, facebook: null, youtube: null, website: null,
  },

  // ─── FORWARDS ─────────────────────────────────────────────────────────
  "duckens-nazon": {
    instagram: "nazon.official",
    x: null, tiktok: null, facebook: null, youtube: null,
    website: "https://duckensnazon.com",
  },
  "frantzdy-pierrot": {
    instagram: "frantzdy_9",
    x: null,       // bio explicitly says "NO TWITTER ❌"
    tiktok: null, facebook: null, youtube: null,
    website: "https://www.frantzdypierrot.com",
  },
  "derrick-etienne": {
    instagram: "detienne10",
    x: "DerrickEtienne_",
    tiktok: null, facebook: null, youtube: null, website: null,
  },
  "louicius-deedson": {
    instagram: "louiciusdon",
    x: null, tiktok: null, facebook: null, youtube: null, website: null,
  },
  "ruben-providence": {
    instagram: "r.providence7",
    x: null, tiktok: null, facebook: null, youtube: null, website: null,
  },
  "josue-casimir": {
    instagram: "j.casimir_",
    x: null, tiktok: null, facebook: null, youtube: null, website: null,
  },
  "yassin-fortune": {
    instagram: "yassin_fortune_afc",
    x: null, tiktok: null, facebook: null, youtube: null, website: null,
  },
  "wilson-isidor": {
    instagram: "wilsonisidor21",
    x: "IsidorWilson",
    tiktok: null,       // bio explicitly says "No TikTok ❌"
    facebook: null, youtube: null, website: null,
  },
  "lenny-joseph": {
    instagram: "lenny.joseph19",
    x: null, tiktok: null, facebook: null, youtube: null, website: null,
  },

  // ─── COACH ────────────────────────────────────────────────────────────
  "sebastien-migne": {
    instagram: "sebastien_migne",
    x: null, tiktok: null,
    facebook: "sebmigne",
    youtube: null, website: null,
  },
};

// URL builders
export const socialUrls = {
  instagram: (h) => `https://instagram.com/${h}`,
  x: (h) => `https://x.com/${h}`,
  tiktok: (h) => `https://tiktok.com/@${h}`,
  facebook: (h) => h.match(/^\d+$/) ? `https://facebook.com/profile.php?id=${h}` : `https://facebook.com/${h}`,
  youtube: (h) => h.startsWith("/") ? `https://youtube.com${h}` : `https://youtube.com/@${h}`,
  website: (h) => h,
};

// Display labels
export const socialLabels = {
  instagram: "Instagram",
  x: "X (Twitter)",
  tiktok: "TikTok",
  facebook: "Facebook",
  youtube: "YouTube",
  website: "Website",
};
