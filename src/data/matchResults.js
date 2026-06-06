// ╔══════════════════════════════════════════════════════════════════╗
// ║  RÉSULTATS — saisis par Carel après chaque match.                ║
// ║                                                                    ║
// ║  Format Haïti-centré : { haiti: buts d'Haïti, opp: buts adverse } ║
// ║  Laisser à null tant que le match n'est pas joué.                 ║
// ║                                                                    ║
// ║  Exemple après Haïti 2–1 Écosse :  5: { haiti: 2, opp: 1 }        ║
// ║                                                                    ║
// ║  Dès qu'un résultat est saisi, Pwonostik calcule automatiquement ║
// ║  les points des pronostics (3 pts score exact · 1 pt bon résultat).║
// ╚══════════════════════════════════════════════════════════════════╝

export const matchResults = {
  5: null,  // Haïti – Écosse (13 juin)
  27: null, // Brésil – Haïti (19 juin)
  50: null, // Maroc – Haïti (24 juin)
};
