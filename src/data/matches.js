import { stadiums } from "./stadiums";

// ╔══════════════════════════════════════════════════════════════════╗
// ║  MATCHES — calendrier officiel d'Haïti, phase de groupes (Gr. C) ║
// ║  Source de vérité unique : utilisée par la page Matchs ET par    ║
// ║  le jeu Pwonostik. Modifier ici se répercute partout.            ║
// ╚══════════════════════════════════════════════════════════════════╝

export const matches = [
  {
    matchNumber: 5,
    home: { country: "haiti", name: "Haïti" },
    away: { country: "scotland", name: "Écosse" },
    date: "Sam. 13 juin 2026",
    time: "21h00",
    timeET: "21h00 ET",
    timeHaiti: "20h00 AST",
    kickoff: "2026-06-13T21:00:00-04:00",
    stadium: stadiums.gillette,
    broadcast: ["FS1", "Telemundo", "Tele Haiti", "Canal+ Haiti"],
    diaspora: "Boston · l'équivalent le plus proche d'un match à domicile",
    diasporaEn: "Boston · the closest thing to a home match",
  },
  {
    matchNumber: 27,
    home: { country: "brazil", name: "Brésil" },
    away: { country: "haiti", name: "Haïti" },
    date: "Ven. 19 juin 2026",
    time: "21h00",
    timeET: "21h00 ET",
    timeHaiti: "20h00 AST",
    kickoff: "2026-06-19T21:00:00-04:00",
    stadium: stadiums.lincoln,
    broadcast: ["FOX", "Telemundo", "Tele Haiti", "Canal+ Haiti"],
    diaspora: "Philadelphie · à 24 km du Subaru Park, où Danley Jean-Jacques évolue avec le Philadelphia Union",
    diasporaEn: "Philadelphia · 15 miles from Subaru Park, where Danley Jean-Jacques plays for the Philadelphia Union",
  },
  {
    matchNumber: 50,
    home: { country: "morocco", name: "Maroc" },
    away: { country: "haiti", name: "Haïti" },
    date: "Mer. 24 juin 2026",
    time: "18h00",
    timeET: "18h00 ET",
    timeHaiti: "17h00 AST",
    kickoff: "2026-06-24T18:00:00-04:00",
    stadium: stadiums.mercedesBenz,
    broadcast: ["FOX", "Telemundo", "Tele Haiti", "Canal+ Haiti"],
    diaspora: "Atlanta · une communauté haïtienne en pleine croissance dans le Sud-Est américain",
    diasporaEn: "Atlanta · a growing Haitian community in the American Southeast",
  },
];
