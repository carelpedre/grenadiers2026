// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  PRONUNCIATION DATA                                                    ║
// ║                                                                        ║
// ║  IPA = International Phonetic Alphabet — what linguists use            ║
// ║  Phonetic = lazy spelling for English speakers                         ║
// ║                                                                        ║
// ║  Audio files live in /public/audio/pronunciations/<slug>.mp3           ║
// ║                                                                        ║
// ║  Record audio at ~16kHz mono, AAC or MP3 ≤100KB per clip. Less than    ║
// ║  3 seconds each — just the name spoken clearly twice.                  ║
// ╚═══════════════════════════════════════════════════════════════════════╝

import { getAllPlayers, squadStats } from "./squad";

// Manually curated pronunciation guide for each player + coach
// The slug must match the player slug for audio file matching
const guide = {
  // Goalkeepers
  "johny-placide":      { phonetic: "JOH-nee plah-SEED",        ipa: "ʒɔ.ni pla.sid",            note: "French pronunciation. The 'J' is soft, like 'zhz'." },
  "alexandre-pierre":   { phonetic: "ah-lex-AHN-dre p'YAIR",    ipa: "a.lɛk.sɑ̃dʁ pjɛʁ",           note: "Standard French." },
  "josue-duverger":     { phonetic: "ZHOH-zoo-ay du-vehr-ZHAY", ipa: "ʒɔ.zu.e dy.vɛʁ.ʒe",        note: "" },

  // Defenders
  "ricardo-ade":        { phonetic: "ree-KAR-doh ah-DAY",       ipa: "ʁi.kaʁ.do a.de",           note: "" },
  "carlens-arcus":      { phonetic: "kar-LENS AR-kus",          ipa: "kaʁ.lɛ̃s aʁ.kys",           note: "" },
  "martin-experience":  { phonetic: "mar-TAN ex-pay-ree-ANCE",  ipa: "maʁ.tɛ̃ ɛk.spe.ʁjɑ̃s",       note: "His surname really is 'Experience' — pronounced in French." },
  "jean-kevin-duverne": { phonetic: "zhah(n) KEH-vin du-VEHRN", ipa: "ʒɑ̃ ke.vin dy.vɛʁn",        note: "" },
  "duke-lacroix":       { phonetic: "DOOK lah-KWAH",            ipa: "duk la.kʁwa",              note: "'Lacroix' = 'the cross' in French." },
  "wilguens-paugain":   { phonetic: "WIL-gens poh-GAN",         ipa: "vil.gɛns po.gɛ̃",           note: "" },
  "hannes-delcroix":    { phonetic: "HAH-ness del-KWAH",        ipa: "ha.nɛs dɛl.kʁwa",          note: "Belgian-born — 'Hannes' is the Flemish form of John." },
  "keeto-thermoncy":    { phonetic: "KEE-toh ter-MON-see",      ipa: "ki.to tɛʁ.mɔn.si",         note: "" },

  // Midfielders
  "leverton-pierre":    { phonetic: "leh-VER-ton p'YAIR",       ipa: "lə.vɛʁ.tɔn pjɛʁ",          note: "" },
  "danley-jean-jacques":{ phonetic: "DAN-lee zhah(n)-ZHAHK",    ipa: "dɑn.li ʒɑ̃.ʒak",            note: "Hyphenated surname — both halves matter." },
  "carl-sainte":        { phonetic: "KARL SANT",                ipa: "kaʁl sɛ̃t",                note: "" },
  "jean-ricner-bellegarde": { phonetic: "zhah(n)-rik-NAIR bel-GARD", ipa: "ʒɑ̃.ʁik.nɛʁ bɛl.gaʁd", note: "Three-part first name (Jean-Ricner), one syllable surname." },
  "woodensky-pierre":   { phonetic: "WOO-dens-kee p'YAIR",      ipa: "wu.dɛn.ski pjɛʁ",          note: "The only domestic player — give his name proper Haitian respect." },
  "dominique-simon":    { phonetic: "doh-mee-NEEK see-MOH(n)",  ipa: "dɔ.mi.nik si.mɔ̃",          note: "" },

  // Forwards
  "duckens-nazon":      { phonetic: "DOO-kens nah-ZOH(n)",      ipa: "dy.kɛns na.zɔ̃",            note: "All-time top scorer. Get this one right." },
  "frantzdy-pierrot":   { phonetic: "FRAHNTZ-dee p'YEH-roh",    ipa: "fʁɑ̃ts.di pjɛ.ʁo",          note: "'Pierrot' is two syllables — like 'pee-AIR-oh'." },
  "derrick-etienne":    { phonetic: "DEH-rik eh-T'YEN",         ipa: "dɛ.ʁik e.tjɛn",            note: "American-born, but his surname is French." },
  "louicius-deedson":   { phonetic: "LOO-iss-yus DEED-son",     ipa: "lwi.sjys did.sɔn",         note: "" },
  "ruben-providence":   { phonetic: "roo-BEN proh-vee-DAHNCE",  ipa: "ʁy.bɛn pʁɔ.vi.dɑ̃s",        note: "" },
  "josue-casimir":      { phonetic: "ZHOH-zoo-ay kah-zee-MEER", ipa: "ʒɔ.zu.e ka.zi.miʁ",        note: "" },
  "yassin-fortune":     { phonetic: "yah-SEEN for-TOON",        ipa: "ja.sin fɔʁ.tyn",           note: "" },
  "wilson-isidor":      { phonetic: "WIL-son ee-zee-DOR",       ipa: "wil.sɔn i.zi.dɔʁ",         note: "Newly committed (March 2026). Pronounce it French." },
  "lenny-joseph":       { phonetic: "LEH-nee zhoh-ZEF",         ipa: "lɛ.ni ʒo.zɛf",             note: "" },

  // Coach
  "sebastien-migne":    { phonetic: "say-bahs-T'YEN MEEN-yay",  ipa: "se.bas.tjɛ̃ mi.ɲe",         note: "French. The 'gn' is the same sound as in 'lasagna'." },
};

// Build the final list including all players + coach
export function getPronunciations() {
  const players = getAllPlayers();
  const list = players.map((p) => {
    const entry = guide[p.slug] || { phonetic: "—", ipa: "—", note: "" };
    return {
      slug: p.slug,
      name: p.name,
      number: p.number,
      role: p.positionFull,
      photo: p.photo,
      phonetic: entry.phonetic,
      ipa: entry.ipa,
      note: entry.note,
      audio: `/audio/pronunciations/${p.slug}.mp3`,
    };
  });

  // Coach
  list.push({
    slug: "sebastien-migne",
    name: squadStats.coach,
    number: null,
    role: "Head Coach",
    photo: squadStats.coachPhoto,
    phonetic: guide["sebastien-migne"].phonetic,
    ipa: guide["sebastien-migne"].ipa,
    note: guide["sebastien-migne"].note,
    audio: "/audio/pronunciations/sebastien-migne.mp3",
  });

  return list;
}
