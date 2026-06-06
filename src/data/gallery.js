// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  PHOTO GALLERY DATA                                                    ║
// ║                                                                        ║
// ║  Photos live at /public/images/gallery/{filename}                      ║
// ║                                                                        ║
// ║  All photos courtesy of Fédération Haïtienne de Football (FHF),        ║
// ║  used with permission with credit.                                     ║
// ║                                                                        ║
// ║  Source: https://fhf.ht/galerie                                   ║
// ║                                                                        ║
// ║  TO ADD A NEW PHOTO:                                                   ║
// ║  1. Download the image from fhf.ht                                ║
// ║  2. Save it as a webp or jpg in /public/images/gallery/                ║
// ║  3. Use a snake_case filename (e.g. sen_mas_air.jpg)                   ║
// ║  4. Add a new entry to the photos array below with:                    ║
// ║     - filename                                                          ║
// ║     - caption (short, descriptive)                                     ║
// ║     - category (matches one of the keys in categories below)           ║
// ║     - alt (accessibility description, longer than caption)             ║
// ║     - date (when the photo was taken, ISO string or year)              ║
// ╚═══════════════════════════════════════════════════════════════════════╝

export const credit = {
  short: "Photo: Fédération Haïtienne de Football",
  long: "Photo courtesy of the Fédération Haïtienne de Football (FHF). Used with permission.",
  source: "https://fhf.ht",
};

// Display labels per category. The `id` is what each photo references.
export const categories = [
  { id: "all", label: "All" },
  { id: "players", label: "Players" },
  { id: "training", label: "Training" },
  { id: "coach", label: "Coach & staff" },
  { id: "behind-the-scenes", label: "Behind the scenes" },
];

// Photos. Filenames map to /public/images/gallery/{filename}
// Source URLs are kept as comments for traceability.
export const photos = [
  // ─── PLAYER PORTRAITS ─────────────────────────────────────────
  // From https://fhf.ht/wp-content/uploads/2025/12/{Player}-recto.png
  {
    filename: "johny-placide-portrait.png",
    caption: "Johny Placide · Captain · Goalkeeper",
    alt: "Johny Placide, Haiti's captain and goalkeeper, in official portrait wearing the 2026 Haiti national team kit.",
    category: "players",
    date: "2025-12",
  },
  {
    filename: "jean-ricner-bellegarde-portrait.png",
    caption: "Jean-Ricner Bellegarde · Midfielder · Wolves",
    alt: "Jean-Ricner Bellegarde in his Haiti national team portrait.",
    category: "players",
    date: "2025-12",
  },
  {
    filename: "wilson-isidor-portrait.png",
    caption: "Wilson Isidor · Forward · Sunderland",
    alt: "Wilson Isidor in his Haiti national team portrait.",
    category: "players",
    date: "2025-12",
  },
  {
    filename: "duckens-nazon-portrait.png",
    caption: "Duckens Nazon · Forward · Top scorer in qualifying",
    alt: "Duckens Nazon in his Haiti national team portrait. Nazon was the top scorer in Haiti's 2026 World Cup qualifying campaign with 6 goals.",
    category: "players",
    date: "2025-12",
  },
  {
    filename: "frantzdy-pierrot-portrait.png",
    caption: "Frantzdy Pierrot · Forward",
    alt: "Frantzdy Pierrot in his Haiti national team portrait.",
    category: "players",
    date: "2025-12",
  },
  {
    filename: "danley-jean-jacques-portrait.png",
    caption: "Danley Jean Jacques · Midfielder · Top assister in qualifying",
    alt: "Danley Jean Jacques in his Haiti national team portrait. Jean Jacques was the top assister in Haiti's qualifying campaign with 3 assists.",
    category: "players",
    date: "2025-12",
  },
  {
    filename: "derrick-etienne-jr-portrait.png",
    caption: "Derrick Etienne Jr · Forward",
    alt: "Derrick Etienne Jr in his Haiti national team portrait.",
    category: "players",
    date: "2025-12",
  },
  {
    filename: "ricardo-ade-portrait.png",
    caption: "Ricardo Adé · Defender",
    alt: "Ricardo Adé in his Haiti national team portrait.",
    category: "players",
    date: "2025-12",
  },
  {
    filename: "keeto-thermoncy-portrait.png",
    caption: "Keeto Thermoncy · Defender",
    alt: "Keeto Thermoncy in his Haiti national team portrait.",
    category: "players",
    date: "2025-12",
  },
  {
    filename: "louicius-deedson-portrait.png",
    caption: "Don Deedson Louicius · Forward",
    alt: "Don Deedson Louicius in his Haiti national team portrait. Louicius scored the opener in Haiti's 2-0 win over Nicaragua that clinched World Cup qualification.",
    category: "players",
    date: "2025-12",
  },
  {
    filename: "ruben-providence-portrait.png",
    caption: "Ruben Providence · Forward",
    alt: "Ruben Providence in his Haiti national team portrait. Providence scored the qualification-clinching second goal vs Nicaragua.",
    category: "players",
    date: "2025-12",
  },
  {
    filename: "alexandre-pierre-portrait.png",
    caption: "Alexandre Pierre · Midfielder",
    alt: "Alexandre Pierre in his Haiti national team portrait.",
    category: "players",
    date: "2025-12",
  },
  {
    filename: "duke-lacroix-portrait.png",
    caption: "Duke Lacroix · Forward",
    alt: "Duke Lacroix in his Haiti national team portrait.",
    category: "players",
    date: "2025-12",
  },
  {
    filename: "martin-experience-portrait.png",
    caption: "Martin Experience · Midfielder",
    alt: "Martin Experience in his Haiti national team portrait.",
    category: "players",
    date: "2025-12",
  },
  {
    filename: "josue-casimir-portrait.png",
    caption: "Josué Casimir · Defender · Auxerre",
    alt: "Josué Casimir in his Haiti national team portrait.",
    category: "players",
    date: "2025-12",
  },
  {
    filename: "jean-kevin-duverne-portrait.png",
    caption: "Jean-Kévin Duverne · Defender · Gent",
    alt: "Jean-Kévin Duverne in his Haiti national team portrait.",
    category: "players",
    date: "2025-12",
  },

  // ─── COACH ───────────────────────────────────────────────────
  {
    filename: "sebastien-migne-portrait.png",
    caption: "Sébastien Migné · Head Coach",
    alt: "Sébastien Migné, head coach of Haiti's national team, in official portrait.",
    category: "coach",
    date: "2025-12",
  },

  // ─── TRAINING ─────────────────────────────────────────────────
  // From https://fhf.ht/wp-content/uploads/2025/12/sen_mas_*.jpg
  {
    filename: "training-air-1.jpg",
    caption: "Aerial training session",
    alt: "Haiti national team players in a training session, captured from above.",
    category: "training",
    date: "2025-12",
  },
  {
    filename: "training-air-2.jpg",
    caption: "Training drill from the air",
    alt: "Players spread across the pitch during a Haiti national team training session.",
    category: "training",
    date: "2025-12",
  },
  {
    filename: "training-air-3.jpg",
    caption: "Pre-qualifier session",
    alt: "Wide-angle aerial photo of Haiti's training session before a qualifier.",
    category: "training",
    date: "2025-12",
  },
  {
    filename: "training-air-4.jpg",
    caption: "Tactical work",
    alt: "Players running drills on the training pitch.",
    category: "training",
    date: "2025-12",
  },
  {
    filename: "training-air-5.jpg",
    caption: "Team session",
    alt: "Full squad training drill.",
    category: "training",
    date: "2025-12",
  },
  {
    filename: "training-air-6.jpg",
    caption: "Training intensity",
    alt: "Close-action photo of Haiti's training session.",
    category: "training",
    date: "2025-12",
  },
  {
    filename: "training-action-1.jpg",
    caption: "On the pitch",
    alt: "Player in action during a training session.",
    category: "training",
    date: "2025-12",
  },
  {
    filename: "training-action-2.jpg",
    caption: "Preparation",
    alt: "Haiti players during a pre-match warm-up.",
    category: "training",
    date: "2025-12",
  },

  // ─── BEHIND THE SCENES ────────────────────────────────────────
  {
    filename: "behind-hotel-1.jpg",
    caption: "Pre-match camp",
    alt: "Behind the scenes at Haiti's team hotel before a qualifier.",
    category: "behind-the-scenes",
    date: "2025-12",
  },
];

// Helper: filter photos by category
export function getPhotosByCategory(categoryId) {
  if (categoryId === "all" || !categoryId) return photos;
  return photos.filter((p) => p.category === categoryId);
}

// Helper: count by category for the filter UI
export function getCategoryCounts() {
  const counts = { all: photos.length };
  for (const cat of categories) {
    if (cat.id !== "all") {
      counts[cat.id] = photos.filter((p) => p.category === cat.id).length;
    }
  }
  return counts;
}
