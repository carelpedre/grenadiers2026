# Kreyòl (ht) audit — /the-tribute · /federation · /history-1974

Repo: `~/grenadiers-2026` (prod French site, `REMOTE_PATH=/home/carelp/grenadiers2026.com`).
Read-only audit. **No code changed; fr/en untouched** (`git status` clean).

Fill in the blank `ht:` lines below. Each string is tagged:

- **[CHROME key.path]** — a `t()` dictionary key in `src/lib/translations.js`. `ht === fr` means it is still a French placeholder.
- **[DATA file:field]** — a free-text field in a data file. Noted whether an `*Ht` / `*Kr` sibling exists or is **MISSING**.
- **[COPY path]** — a page-local copy object inside the page component (NOT a `t()` key, NOT a data file). Special to `/the-tribute` (see warning below).

How the languages resolve:
- `t(key, lang)` returns `entry[lang] || entry.en`. A missing `ht` falls back to **English**, not French. So a French chrome leak only happens when **`ht === fr`**.
- Data fields use a local `pick(fr, en)` / `pickLang(lang, fr, en)` that returns **`fr` for anything that is not `en`** — so in `ht` every such field renders **French** unless an `*Ht` sibling is read (none of these read one).

---

## ⚠️ Headline finding — `/the-tribute` has no `ht` path at all

`src/pages/Coverage.jsx` does not use `t()` for its chrome. It uses a page-local object `COPY = { fr: {...}, en: {...} }` and reads `const c = COPY[lang]`. **There is no `COPY.ht`.** So when `lang === "ht"`:
- `COPY["ht"]` is `undefined` → the hero/marker/colophon components dereference `c.heroEyebrow` etc. on `undefined` (a runtime crash unless an error boundary catches it; there is none in the tree).
- Every data field goes through `pickLang(lang, fr, en)` which returns `fr` for `ht` → French.

Net: in Kreyòl, `/the-tribute` is **entirely French** (or broken). It needs either an `ht` branch added to `COPY` **and** `*Ht` data siblings, or a rewrite onto `t()`. The strings are listed below so the Kreyòl copy can be written now.

> **STATUS (updated):** `Coverage.jsx` now reads `const c = COPY[lang] || COPY.fr` (crash fix shipped to the working tree) so `ht` no longer throws — it degrades to French until the `ht` copy below is ingested. The `ht:` lines below are now FILLED and ready to ingest into `COPY.ht` + `*Ht` data siblings.

---

## Counts per page

| Page | CHROME (leaks) | DATA fields (leak, `*Ht` missing) | Notes |
|---|---|---|---|
| `/the-tribute` | **42** `COPY.*` strings (no `ht` branch) | **58** `*En`-backed fields | 1 field already has Kreyòl (`statement_kr`) |
| `/federation` | **1** `t()` leak (`federation.team.institution`), of 30 keys used (29 OK) | **14** fields/arrays (`pick`→fr) | `name.fr` shown by design, not a leak |
| `/history-1974` | n/a — no `t()`, no data file | n/a — all inline | Whole page = `HistoryFR`; see §3 + body report |

`routeMeta.js` (SEO `<title>`/`description`) for all three routes is **French-only, single-language** (no en/ht branch) — shown in the browser tab / social shares regardless of `lang`. Out of scope for the on-page worksheet but flagged here.

---

# 1 · WORKSHEET (short strings — fill `ht:`)

## /the-tribute  →  Coverage.jsx (COPY) + coverage.js (DATA)

### CHROME — page-local `COPY` (no `ht` branch; renders French in ht)

[COPY heroEyebrow]
fr: Hommage créatif · Exposition numérique
ht: Omaj kreyatif · Ekspozisyon dijital

[COPY heroTitle1]
fr: Comment Haïti
ht: Kijan Ayiti

[COPY heroTitle2]
fr: répond.
ht: reponn.

[COPY heroBody]
fr: Cinquante-deux ans après Munich, le pays ne reste pas spectateur. Pendant que les Grenadiers préparent le Mondial 2026, une vague de créateurs haïtiens (musiciens, réalisateurs, illustratrices) répond. Chansons, documentaires, œuvres. La sélection a allumé quelque chose. Voici ce qu'elle a déclenché.
ht: Senkanndezan apre Minik, peyi a pa rete ap gade. Pandan Grenadye yo ap prepare Mondyal 2026 la, yon vag kreyatè ayisyen (mizisyen, sineas, ilistratris) ap reponn. Chante, dokimantè, zèv. Seleksyon an limen yon bagay. Men sa li deklanche.

[COPY heroCuration]
fr: Curation : Chokarella Media · Mai 2026
ht: Kurasyon : Chokarella Media · Me 2026

[COPY navAria]  (aria-label)
fr: Chapitres de l'exposition
ht: Chapit ekspozisyon an

[COPY chapters.musique.label]
fr: Clips musicaux
ht: Klip mizik

[COPY chapters.playlists.label]
fr: Playlists
ht: Playlists

[COPY chapters.films.label]
fr: Films
ht: Fim

[COPY chapters.art.label]
fr: Art
ht: Atizay

[COPY chapters.objets.label]
fr: Objets & emblèmes
ht: Objè ak anblèm

[COPY chapters.poesie.label]
fr: Poésie
ht: Pwezi

[COPY chapters.telecharger.label]
fr: À télécharger
ht: Pou telechaje

[COPY chapters.musique.wall]
fr: Quand une sélection retourne en Coupe du Monde après cinquante-deux ans d'absence, ce n'est pas seulement le terrain qui répond. Ce sont les studios. De Port-au-Prince à Brooklyn, de Montréal à Paris, de Bogotá même, les artistes haïtiens (Mizik Rasin, rap kreyòl, konpa, afrobeats, Raboday, toutes générations confondues) sortent les morceaux qui accompagnent la campagne. Voici {n} vidéos, dans l'ordre où Chokarella Media vous invite à les découvrir.
ht: Lè yon seleksyon retounen nan Koup di Mond apre senkanndezan absans, se pa teren an sèlman ki reponn. Se estidyo yo tou. Soti Pòtoprens rive Brooklyn, soti Monreyal rive Pari, menm soti Bogota, atis ayisyen yo (Mizik Rasin, rap kreyòl, konpa, afrobeats, Raboday, tout jenerasyon ansanm) ap sòti moso ki akonpaye kanpay la. Men {n} videyo, nan lòd Chokarella Media envite w dekouvri yo.

[COPY chapters.playlists.wall]
fr: Au-delà des morceaux pris un par un, Chokarella Media a réuni la campagne dans une seule playlist : la bande-son complète de la route vers le Mondial, à écouter d'un seul tenant, sur Spotify comme sur Apple Music.
ht: Pi lwen pase moso yo pran youn pa youn, Chokarella Media rasanble kanpay la nan yon sèl playlist : tout mizik wout la pou rive nan Mondyal la, pou koute yon sèl kou, sou Spotify kou sou Apple Music.

[COPY chapters.films.wall]
fr: Pendant que les chansons sortent, un autre travail commence : celui de la pellicule. Loin des manchettes habituelles sur Haïti, des réalisateurs s'attachent à raconter le pays par le sport, avec nuance, avec patience, avec une caméra qui prend le temps de regarder.
ht: Pandan chante yo ap sòti, yon lòt travay ap kòmanse : sa fim yo. Lwen gwo tit abityèl yo sou Ayiti, sineas yo angaje pou rakonte peyi a atravè espò, ak nuans, ak pasyans, ak yon kamera ki pran tan pou l gade.

[COPY chapters.art.wall]
fr: Et puis l'image fixe prend la parole. Sur les couvertures de FOX Soccer et de Sports Illustrated, Haïti apparaît cet été, non pas illustrée par un studio de Los Angeles ou de New York, mais par une main haïtienne. Lyne Lucien, illustratrice formée à Bowdoin College, basée à Brooklyn, a été désignée par FOX Soccer ambassadrice artistique officielle d'Haïti pour le Mondial 2026.
ht: Epi imaj fiks la pran lapawòl. Sou kouvèti FOX Soccer ak Sports Illustrated, Ayiti parèt ete sa a, se pa yon estidyo Los Angeles oswa New York ki desine l, men yon men ayisyen. Lyne Lucien, ilistratris ki fòme nan Bowdoin College, ki baze nan Brooklyn, FOX Soccer chwazi l kòm anbasadè atistik ofisyèl Ayiti pou Mondyal 2026 la.

[COPY chapters.objets.wall]
fr: Au-delà des chansons, des films et des illustrations, la qualification se matérialise aussi en objets et en emblèmes : ceux que l'on brandit dans les tribunes comme ceux que l'État fait entrer dans l'Histoire. D'un personnage costumé né dans la ferveur des supporters à un timbre commémoratif officiel, voici les hommages tangibles à la route des Grenadiers vers le Mondial 2026.
ht: Pi lwen pase chante, fim ak ilistrasyon, kalifikasyon an materyalize nan objè ak anblèm tou : sa moun leve nan tribin yo kou sa Leta fè antre nan Listwa. Soti nan yon pèsonaj an kostim ki fèt nan fèvè sipòtè yo rive nan yon tenm komemoratif ofisyèl, men omaj konkrè sou wout Grenadye yo nan Mondyal 2026 la.

[COPY chapters.poesie.wall]
fr: Au-delà des images et des sons, la qualification inspire aussi les mots. Un supporter signe ici un hommage en vers, sur la liberté, l'unité et cinquante-deux ans d'attente enfin récompensés.
ht: Pi lwen pase imaj ak son, kalifikasyon an enspire mo yo tou. Yon sipòtè siyen isit la yon omaj an vè, sou libète, inite ak senkanndezan tann ki anfen rekonpanse.

[COPY chapters.telecharger.wall]
fr: Des visuels aux couleurs des Grenadiers, à emporter et à partager.
ht: Vizyèl nan koulè Grenadye yo, pou pote ak pou pataje.

[COPY poemPlate]
fr: Hommage littéraire · Poème
ht: Omaj literè · Powèm

[COPY poemTextPrefix]
fr: Texte :
ht: Tèks :

[COPY playlistEyebrow]
fr: La playlist des Grenadiers
ht: Playlist Grenadye yo

[COPY playlistCredit]
fr: Curation :
ht: Kurasyon :

[COPY playlistAvail]
fr:  · Disponible sur Spotify et Apple Music.
ht:  · Disponib sou Spotify ak Apple Music.

[COPY docSeries]
fr: Série documentaire
ht: Seri dokimantè

[COPY docProducer]
fr: Noémie Ferron, productrice
ht: Noémie Ferron, pwodiktris

[COPY docFeaturing]
fr: Avec la participation de
ht: Ak patisipasyon

[COPY docAndOthers]
fr: et d'autres
ht: ak lòt moun

[COPY docSupport]
fr: Avec le soutien de
ht: Ak sipò

[COPY videoUnsupported]
fr: Votre navigateur ne prend pas en charge la lecture vidéo.
ht: Navigatè ou a pa sipòte lekti videyo.

[COPY lyneEyebrow]
fr: L'artiste · Désignée par FOX Soccer · Ambassadrice officielle d'Haïti · Mondial FIFA 2026
ht: Atis la · Chwazi pa FOX Soccer · Anbasadè ofisyèl Ayiti · Mondyal FIFA 2026

[COPY artworkFor]
fr: Pour
ht: Pou

[COPY artworkCredit1]
fr: Œuvre signée
ht: Zèv ki siyen

[COPY artworkCredit2]
fr: · Diffusée avec crédit.
ht: · Difize ak kredi.

[COPY tributeLangAria]  (aria-label)
fr: Langue du texte
ht: Lang tèks la

[COPY toggleSecond]
fr: Français
ht: Français

[COPY colophonTitle]
fr: Une nation qui supporte.
ht: Yon nasyon k ap sipòte.

[COPY colophonBody]
fr: Cette exposition rassemble une partie de la réponse créative qu'a suscitée la qualification d'Haïti pour la Coupe du Monde 2026 : chansons, documentaires, illustrations.
ht: Ekspozisyon sa a rasanble yon pati nan repons kreyatif kalifikasyon Ayiti pou Koup di Mond 2026 la pwovoke : chante, dokimantè, ilistrasyon.

[COPY colophonCreditPrefix]
fr: Curation : Chokarella Media · Pour signaler une œuvre à ajouter, écrire à
ht: Kurasyon : Chokarella Media · Pou siyale yon zèv pou ajoute, ekri

[COPY chokEyebrow]
fr: Par Chokarella Media
ht: Pa Chokarella Media

[COPY chokSoon]
fr: Bientôt en ligne.
ht: Talè konsa sou entènèt.

> Dead string: `CHAPTERS[].label` (Coverage.jsx lines 415–423) holds a second French copy of the chapter labels, but the nav renders `c.chapters[id].label`, so those array labels are never shown. No translation needed.

### DATA — coverage.js (short fields; `pickLang`→French in ht; `*En` exists, `*Ht`/`*Kr` MISSING)

[DATA coverage.js:playlist.title]  (sibling: titleEn ✓ / Ht MISSING)
fr: Grenadiers 2026 · La playlist
ht: Grenadiers 2026 · Playlist la

[DATA coverage.js:lyneLucien.works[0].role]  (roleEn ✓ / Ht MISSING)
fr: Ambassadrice artistique officielle d'Haïti · Coupe du Monde FIFA 2026
ht: Anbasadè atistik ofisyèl Ayiti · Koup di Mond FIFA 2026

[DATA coverage.js:lyneLucien.works[0].imageLabel]  (imageLabelEn ✓ / Ht MISSING)
fr: Haïti · par Lyne Lucien pour FOX Soccer
ht: Ayiti · pa Lyne Lucien pou FOX Soccer

[DATA coverage.js:lyneLucien.works[1].role]  (roleEn ✓ / Ht MISSING)
fr: Illustration · Couverture Haïti, Coupe du Monde 2026
ht: Ilistrasyon · Kouvèti Ayiti, Koup di Mond 2026

[DATA coverage.js:lyneLucien.works[1].imageLabel]  (imageLabelEn ✓ / Ht MISSING)
fr: Haïti · par Lyne Lucien pour Sports Illustrated
ht: Ayiti · pa Lyne Lucien pou Sports Illustrated

[DATA coverage.js:creativeTributes[the-winner-khami-ken].medium]  (mediumEn ✓ / Ht MISSING)
fr: Illustration
ht: Ilistrasyon

[DATA coverage.js:creativeTributes[the-winner-khami-ken].imageLabel]  (imageLabelEn ✓ / Ht MISSING)
fr: The WINNER · illustration de Khami_ken
ht: The WINNER · ilistrasyon Khami_ken

[DATA coverage.js:creativeTributes[the-winner-khami-ken].quote]  (quoteEn ✓ / Ht MISSING)
fr: Chaque cri de victoire est l'aboutissement d'années de sacrifice.
ht: Chak rèl viktwa se rezilta ane sakrifis.

[DATA coverage.js:creativeTributes[the-winner-khami-ken].credit]  (creditEn ✓ / Ht MISSING)
fr: Illustration :
ht: Ilistrasyon :

[DATA coverage.js:creativeTributes[lento-ayizan-tanbou-2026].medium]  (mediumEn ✓ / Ht MISSING)
fr: Peinture · Mars 2026
ht: Penti · Mas 2026

[DATA coverage.js:creativeTributes[lento-ayizan-tanbou-2026].imageLabel]  (imageLabelEn ✓ / Ht MISSING)
fr: Lento Ayizan · Ayiti nan Mondyal 2026, le tambour de la victoire
ht: Lento Ayizan · Ayiti nan Mondyal 2026, tanbou viktwa a

[DATA coverage.js:creativeTributes[lento-ayizan-tanbou-2026].caption]  (captionEn ✓ / Ht MISSING)
fr: Une toile où le tambour, aux couleurs du drapeau, devient le cœur du peuple qui accompagne les Grenadiers vers le Mondial 2026.
ht: Yon tablo kote tanbou a, nan koulè drapo a, vin tounen kè pèp la k ap akonpaye Grenadye yo nan Mondyal 2026 la.

[DATA coverage.js:creativeTributes[haitian-hero].medium]  (mediumEn ✓ / Ht MISSING)
fr: Personnage costumé · Mascotte de supporters
ht: Pèsonaj an kostim · Maskòt sipòtè yo

[DATA coverage.js:creativeTributes[haitian-hero].imageLabel]  (imageLabelEn ✓ / Ht MISSING)
fr: Haitian Hero · mascotte des supporters haïtiens
ht: Haitian Hero · maskòt sipòtè ayisyen yo

[DATA coverage.js:creativeTributes[timbre-grenadiers-2026].title]  (titleEn ✓ / Ht MISSING)
fr: Le timbre des Grenadiers
ht: Tenm Grenadye yo

[DATA coverage.js:creativeTributes[timbre-grenadiers-2026].medium]  (mediumEn ✓ / Ht MISSING)
fr: Timbre commémoratif officiel · 1000 gourdes
ht: Tenm komemoratif ofisyèl · 1000 goud

[DATA coverage.js:creativeTributes[timbre-grenadiers-2026].imageLabel]  (imageLabelEn ✓ / Ht MISSING)
fr: Timbre commémoratif des Grenadiers · 1000 gourdes
ht: Tenm komemoratif Grenadye yo · 1000 goud

[DATA coverage.js:supporterPoem.title]  (titleEn ✓ / Ht MISSING)
fr: L'arbre de la liberté
ht: Pyebwa libète a

[DATA coverage.js:supporterPoem.imageLabel]  (imageLabelEn ✓ / Ht MISSING)
fr: L'arbre de la liberté · hommage poétique aux Grenadiers
ht: Pyebwa libète a · omaj powetik pou Grenadye yo

[DATA coverage.js:supporterPoem.author]  (authorEn ✓ / Ht MISSING)
fr: un supporter haïtien
ht: yon sipòtè ayisyen

[DATA coverage.js:shortFilms[0].credit]  (creditEn ✓ / Ht MISSING)
fr: Un film de Leo Volcy · Invisible North · Voix de Jimmy Jean-Louis
ht: Yon fim Leo Volcy · Invisible North · Vwa Jimmy Jean-Louis

[DATA coverage.js:shortFilms[0].medium]  (mediumEn ✓ / Ht MISSING)
fr: Court métrage · 11 juin 2026
ht: Kout metraj · 11 jen 2026

[DATA coverage.js:ferronDocumentary.credit]  (creditEn ✓ / Ht MISSING)
fr: Réalisée par Félix Trépanier · 2026
ht: Reyalize pa Félix Trépanier · 2026

[DATA coverage.js:ferronDocumentary.availability]  (availabilityEn ✓ / Ht MISSING)
fr: Disponible au Canada
ht: Disponib nan Kanada

[DATA coverage.js:ferronDocumentary.watch.label]  (watch.labelEn ✓ / Ht MISSING)
fr: Regarder sur TFO
ht: Gade sou TFO

[DATA coverage.js:ferronDocumentary.quote]  (quoteEn ✓ / Ht MISSING)
fr: Peu importe ce qui se passe, on se relève toujours.
ht: Kèlkeswa sa k pase, nou toujou kanpe ankò.

[DATA coverage.js:ferronDocumentary.source.label]  (source.labelEn ✓ / Ht MISSING)
fr: Lire le reportage complet d'Olaïsha Francis · Bonjour Ontario
ht: Li repòtaj konplè Olaïsha Francis · Bonjour Ontario

[DATA coverage.js:downloads[0].label]  (labelEn ✓ / Ht MISSING)
fr: Affiche des Grenadiers
ht: Afich Grenadye yo

[DATA coverage.js:downloads[0].kind]  (kindEn ✓ / Ht MISSING)
fr: Affiche
ht: Afich

[DATA coverage.js:downloads[1].label]  (labelEn ✓ / Ht MISSING)
fr: Fond d'écran (téléphone)
ht: Fon ekran (telefòn)

[DATA coverage.js:downloads[1].kind]  (kindEn ✓ / Ht MISSING)
fr: Fond d'écran
ht: Fon ekran

> **Long DATA prose on /the-tribute — listed, not inlined here** (each has an `*En` sibling, `*Ht`/`*Kr` MISSING). Roughly **1 838 French words** total. Decide translation approach like the history body:
> - `musicVideos[0..14].note` — 15 song blurbs, ~694 words
> - `creativeTributes[*].description` / `.caption` / `.statement_fr` — ~666 words. **Exception:** `creativeTributes[lento-ayizan-tanbou-2026]` already ships Kreyòl as `statement_kr` (the Lento Ayizan painting) — the only Kreyòl in this file.
> - `lyneLucien.bio` + `.quote` + `works[*].caption` — ~203 words
> - `ferronDocumentary.synopsisShort` + `.synopsisLong` + `.description` — ~179 words
> - `shortFilms[0].note` — ~71 words
> - `playlist.description` — ~25 words
> - `supporterPoem.lines` — intentionally **English** (data-file comment says "NE PAS traduire"); leave as-is.
> - `musicVideos[*].title` / `.artist`, `lyneLucien.artist`, tribute `creditHandle`, names — proper nouns, identical across languages, not leaks.

---

## /federation  →  Federation.jsx (t() chrome) + federation.js (DATA)

### CHROME — `t()` keys (only the French leak; the other 29 keys are already Kreyòl)

[CHROME federation.team.institution]  ⚠️ ht === fr (French placeholder)
fr: Institution
ht: Enstitisyon

> The other `federation.*` keys used by this page (eyebrow, title, subtitle, logoAlt, governingBody, identityLine, statFounded, statYears, statFifaMember, newsEyebrow, newsTitle, newsBody1, newsBody2, pioneer, currentLeadership, inOffice, keyMoments, restOfCommittee, homeStadiumEyebrow, competitionsTitle, timelineTitle, timelineSubtext, visitSite, team.menA/womenA/menU17/menU20/womenU20/womenU17) are already translated to Kreyòl — no action.

### DATA — federation.js (`pick(fr,en)`→French in ht; `*En` exists, `*Ht` MISSING)

[DATA federation.js:publicUtilityNote]  (publicUtilityNoteEn ✓ / Ht MISSING)
fr: Reconnue d'utilité publique en Haïti par décret présidentiel le 4 avril 1952.
ht: Rekonèt itilite piblik ann Ayiti pa dekrè prezidansyèl 4 avril 1952.

[DATA federation.js:founderNote]  (founderNoteEn ✓ / Ht MISSING) — long (~95 words)
fr: Médecin, olympien, pionnier qui a introduit le football en Haïti. Après avoir remporté l'or olympique avec la France en rugby aux Jeux de Paris en 1900 — devenant le premier médaillé d'or olympique noir reconnu —, Henriquez rentre en Haïti et introduit le football d'association en 1904. Il inscrit ce qui est considéré comme le premier but officiellement répertorié en Haïti dans un match organisé, et cofonde l'Union Sportive Haïtienne avec son frère Alphonse. La Fédération Haïtienne de Football émerge de cet écosystème la même année. Il devient ensuite sénateur de la République.
ht: Doktè, olenpik, pyonye ki entwodui foutbòl ann Ayiti. Apre li te ranpòte lò olenpik ak Lafrans nan rugby nan Je Pari 1900 yo, li vin premye meday lò olenpik nwa yo rekonèt, Henriquez retounen ann Ayiti epi entwodui foutbòl asosyasyon an 1904. Li make sa yo konsidere kòm premye gòl ofisyèlman anrejistre ann Ayiti nan yon match òganize, epi li kofonde Union Sportive Haïtienne ak frè l Alphonse. Federasyon Ayisyen Foutbòl la soti nan ekosistèm sa a menm ane a. Apre sa li vin senatè Repiblik la.

[DATA federation.js:homeStadium.note]  (noteEn ✓ / Ht MISSING)
fr: Enceinte historique de la sélection nationale, inscrite au patrimoine sportif haïtien.
ht: Estad istorik seleksyon nasyonal la, ki enskri nan patrimwàn espòtif ayisyen an.

[DATA federation.js:currentLeadership.structure]  (structureEn ✓ / Ht MISSING)
fr: Comité de Normalisation
ht: Komite Normalizasyon

[DATA federation.js:currentLeadership.structureNote]  (structureNoteEn ✓ / Ht MISSING)
fr: Depuis décembre 2020, la FHF est administrée par un Comité de Normalisation nommé par la FIFA, suite à la suspension à vie prononcée contre l'ancien président Yves Jean-Bart par la Commission d'éthique de la FIFA en novembre 2020.
ht: Depi desanm 2020, se yon Komite Normalizasyon FIFA nonmen ki administre FHF la, apre sispansyon avi Komisyon Etik FIFA a te pwononse kont ansyen prezidan Yves Jean-Bart nan novanm 2020.

[DATA federation.js:currentLeadership.featured.role]  (roleEn ✓ / Ht MISSING)
fr: Présidente · Comité de Normalisation
ht: Prezidant · Komite Normalizasyon

[DATA federation.js:currentLeadership.featured.since]  (sinceEn ✓ / Ht MISSING)
fr: 30 novembre 2024
ht: 30 novanm 2024

[DATA federation.js:currentLeadership.featured.photoLabel]  (photoLabelEn ✓ / Ht MISSING)
fr: Monique André · Présidente du Comité de Normalisation de la FHF
ht: Monique André · Prezidant Komite Normalizasyon FHF la

[DATA federation.js:currentLeadership.featured.bio]  (bioEn ✓ / Ht MISSING) — long (~85 words)
fr: Nommée par la FIFA à la tête du Comité de Normalisation de la FHF le 30 novembre 2024, en remplacement de l'administrateur cubain Luis Hernández. Son mandat a depuis été reconduit par la FIFA. Sous sa direction, la fédération a mené à bien la qualification d'Haïti pour la Coupe du Monde 2026, la campagne éliminatoire de la sélection masculine senior disputée sans stade à domicile, la qualification du programme de jeunes pour la Coupe du Monde FIFA U-17 au Qatar, ainsi que la nomination historique de Pia Sundhage à la tête de la sélection féminine en février 2026.
ht: FIFA nonmen l alatèt Komite Normalizasyon FHF la 30 novanm 2024, an ranplasman administratè kiben Luis Hernández. Depi lè a FIFA renouvle manda li. Anba direksyon li, federasyon an mennen rive kalifikasyon Ayiti pou Koup di Mond 2026 la, kanpay eliminatwa seleksyon gason senior an ki te jwe san estad lakay li, kalifikasyon pwogram jèn yo pou Koup di Mond FIFA U-17 nan Katar, ansanm ak nominasyon istorik Pia Sundhage alatèt seleksyon fi an nan fevriye 2026.

[DATA federation.js:currentLeadership.featured.previousRoles]  (previousRolesEn ✓ / Ht MISSING)
fr: Précédemment membre du Comité de Normalisation aux côtés d'Yvon Sévère. A représenté Haïti au 2e Symposium FIFA sur le football féminin à Sydney, dans le sillage de la Coupe du Monde féminine 2023.
ht: Anvan sa li te manm Komite Normalizasyon an ansanm ak Yvon Sévère. Li te reprezante Ayiti nan 2yèm Senpozyòm FIFA sou foutbòl fi nan Sydney, nan kontèks Koup di Mond fi 2023 la.

[DATA federation.js:currentLeadership.featured.milestones[]]  (milestonesEn ✓ / Ht MISSING) — array of 6
fr[0]: 30 novembre 2024 — Nomination à la présidence du Comité de Normalisation
ht[0]: 30 novanm 2024 : Nominasyon alatèt Komite Normalizasyon an
fr[1]: 14 janvier 2025 — Rencontre à haut niveau avec la FIFA à Zurich
ht[1]: 14 janvye 2025 : Rankont wo nivo ak FIFA nan Zürich
fr[2]: Février 2025 — Entretien au Le Nouvelliste sur les perspectives du programme
ht[2]: Fevriye 2025 : Entèvyou nan Le Nouvelliste sou pèspektiv pwogram nan
fr[3]: 18 novembre 2025 — À la tête de la FHF lors de la qualification masculine pour le Mondial à Curaçao
ht[3]: 18 novanm 2025 : Alatèt FHF la pandan kalifikasyon gason an pou Mondyal la nan Curaçao
fr[4]: 26 novembre 2025 — Don de 13 millions de gourdes reçu de Natcom S.A. pour le programme masculin
ht[4]: 26 novanm 2025 : Don 13 milyon goud Natcom S.A. bay pou pwogram gason an
fr[5]: 13 février 2026 — Annonce de la nomination de Pia Sundhage comme sélectionneure des Grenadières
ht[5]: 13 fevriye 2026 : Anons nominasyon Pia Sundhage kòm seleksyonè Grenadyè yo

[DATA federation.js:currentLeadership.members[].role]  (roleEn ✓ / Ht MISSING) — array of 9 (names are proper nouns)
fr[0]: Secrétaire général
ht[0]: Sekretè jeneral
fr[1]: Directeur technique national
ht[1]: Direktè teknik nasyonal
fr[2]: Sélectionneur des Grenadiers
ht[2]: Seleksyonè Grenadye yo
fr[3]: Sélectionneure des Grenadières
ht[3]: Seleksyonè Grenadyè yo
fr[4]: Responsable communication
ht[4]: Responsab kominikasyon
fr[5]: Coordonnateur futsal
ht[5]: Kòdonatè futsal
fr[6]: Président de la Commission des arbitres
ht[6]: Prezidan Komisyon Abit yo
fr[7]: Directeur du Département des arbitres
ht[7]: Direktè Depatman Abit yo
fr[8]: Coordonnateur des arbitres
ht[8]: Kòdonatè abit yo

[DATA federation.js:competitionsOrganized[]]  (competitionsOrganizedEn ✓ / Ht MISSING) — array of 5
fr[0]: Ligue Haïtienne — championnat de première division masculine professionnelle
ht[0]: Ligue Haïtienne : chanpyona premye divizyon gason pwofesyonèl
fr[1]: Coupe d'Haïti — compétition nationale à élimination directe
ht[1]: Coupe d'Haïti : konpetisyon nasyonal eliminasyon dirèk
fr[2]: Championnat féminin de Ligue Haïtienne
ht[2]: Chanpyona fi Ligue Haïtienne
fr[3]: Compétitions des sélections jeunes (U-15, U-17, U-20, U-23)
ht[3]: Konpetisyon seleksyon jèn yo (U-15, U-17, U-20, U-23)
fr[4]: Championnat national de futsal
ht[4]: Chanpyona nasyonal futsal

[DATA federation.js:notableMilestones[].event]  (eventEn ✓ / Ht MISSING) — array of 24 timeline rows
fr[1904]: Fondation de la fédération sous le nom de Commission de Football de l'Union des Sociétés Sportives Haïtiennes
ht: Fondasyon federasyon an sou non Commission de Football de l'Union des Sociétés Sportives Haïtiennes
fr[1934]: Affiliation à la FIFA
ht: Afilyasyon ak FIFA
fr[1952]: Reconnaissance d'utilité publique par décret présidentiel
ht: Rekonesans itilite piblik pa dekrè prezidansyèl
fr[1961]: Membre fondateur de la CONCACAF
ht: Manm fondatè CONCACAF
fr[1973]: Champion CONCACAF à Port-au-Prince — premier titre continental masculin, qualification pour la Coupe du Monde
ht: Chanpyon CONCACAF nan Pòtoprens : premye tit kontinantal gason, kalifikasyon pou Koup di Mond
fr[1974]: Première participation à la Coupe du Monde de la FIFA en Allemagne de l'Ouest — but de Manno Sanon face à l'Italie
ht: Premye patisipasyon nan Koup di Mond FIFA nan Almay Lwès : gòl Manno Sanon kont Itali
fr[1991]: Premier match international des Grenadières : Haïti–Jamaïque (1-0) à Port-au-Prince
ht: Premye match entènasyonal Grenadyè yo : Ayiti-Jamayik (1-0) nan Pòtoprens
fr[2007a]: Première participation à la Coupe du Monde U-17 de la FIFA, en Corée du Sud
ht: Premye patisipasyon nan Koup di Mond U-17 FIFA, nan Kore di Sid
fr[2007b]: Champion de la Coupe des Caraïbes
ht: Chanpyon Coupe des Caraïbes
fr[2014]: Champion du Tournoi CFU U-17 à Port-au-Prince
ht: Chanpyon Tounwa CFU U-17 nan Pòtoprens
fr[2016]: Champion du Tournoi CFU U-20, face à Antigua-et-Barbuda en finale
ht: Chanpyon Tounwa CFU U-20, kont Antigua-et-Barbuda nan final
fr[2018]: Première participation à la Coupe du Monde U-20 féminine de la FIFA, en France. Troisième place au CONCACAF U-20 féminin
ht: Premye patisipasyon nan Koup di Mond U-20 fi FIFA, nan Lafrans. Twazyèm plas nan CONCACAF U-20 fi
fr[2019]: Troisième place au CONCACAF U-17, qualification pour la Coupe du Monde U-17 de la FIFA au Brésil
ht: Twazyèm plas nan CONCACAF U-17, kalifikasyon pou Koup di Mond U-17 FIFA nan Brezil
fr[2020a]: Mise en place du Comité de Normalisation par la FIFA
ht: Mete an plas Komite Normalizasyon an pa FIFA
fr[2020b]: Troisième place au CONCACAF U-20 féminin
ht: Twazyèm plas nan CONCACAF U-20 fi
fr[2023]: Première participation à la Coupe du Monde féminine de la FIFA, en Australie et en Nouvelle-Zélande
ht: Premye patisipasyon nan Koup di Mond fi FIFA, nan Ostrali ak Nouvèl Zeland
fr[2024a]: Nomination de Monique André à la présidence du Comité de Normalisation
ht: Nominasyon Monique André alatèt Komite Normalizasyon an
fr[2024b]: Demi-finales du Championnat CONCACAF U-17 féminin — meilleur parcours à ce jour
ht: Demi-final Chanpyona CONCACAF U-17 fi : pi bon pakou jiska prezan
fr[2025a]: Qualification d'Haïti pour la Coupe du Monde de la FIFA 2026 — premier retour masculin en 52 ans
ht: Kalifikasyon Ayiti pou Koup di Mond FIFA 2026 : premye retou gason an 52 an
fr[2025b]: Qualification pour la Coupe du Monde U-17 de la FIFA au Qatar (Groupe E remporté)
ht: Kalifikasyon pou Koup di Mond U-17 FIFA nan Katar (genyen Gwoup E)
fr[2026a]: Pia Sundhage — Sélectionneuse de l'Année FIFA 2012 — nommée à la tête des Grenadières
ht: Pia Sundhage, Seleksyonè Ane a FIFA 2012, nonmen alatèt Grenadyè yo
fr[2026b]: Deuxième qualification consécutive pour la Coupe du Monde U-17 de la FIFA — une première dans l'histoire haïtienne
ht: Dezyèm kalifikasyon konsekitif pou Koup di Mond U-17 FIFA : yon premye nan istwa ayisyen
fr[2026c]: Qualification pour le Championnat CONCACAF U-20
ht: Kalifikasyon pou Chanpyona CONCACAF U-20
fr[2026d]: Adoption à l'unanimité des nouveaux statuts de la FHF — vingt délégués des clubs masculins, féminins et des ligues réunis en congrès extraordinaire sous la supervision du Comité de Normalisation et de la FIFA
ht: Adopsyon alinanimite nouvo estati FHF yo : ven delege klib gason, fi ak lig yo reyini nan yon kongrè ekstraòdinè anba sipèvizyon Komite Normalizasyon an ak FIFA
fr[2026e]: Deuxième Coupe du Monde de la FIFA — Groupe C face à l'Écosse, au Brésil et au Maroc
ht: Dezyèm Koup di Mond FIFA : Gwoup C kont Eskòs, Brezil ak Mawòk

> Not leaks (shown identically in every language, no translation needed): `federation.name.fr` (official French name, shown by design beside `name.en` / `name.ht`), `founder`, `featured.name`, committee/member `name`s, `homeStadium.name`/`city`, the hardcoded image labels `"Constantin Henriquez · 1904"` and `"Stade Sylvio Cator · Port-au-Prince"`, numeric stats.

---

## /history-1974  →  History.jsx (everything inline; NO data file, NO t(), NO ht)

`History()` returns `lang === "en" ? <HistoryEN/> : <HistoryFR/>`. **There is no `ht` branch**, so in Kreyòl the page renders `HistoryFR` — 100% French. None of these are `t()` keys or data fields; they are JSX string literals inside `src/pages/History.jsx` (function `HistoryFR`). Short strings below; the long article body is in §2.

[INLINE History.jsx:HistoryFR PageHeader.eyebrow]
fr: 1974 · Allemagne de l'Ouest
ht: 1974 · Almay Lwès

[INLINE History.jsx:HistoryFR PageHeader.title]
fr: Les hommes qui ont ouvert la route.
ht: Mesye ki te louvri wout la.

[INLINE History.jsx:HistoryFR PageHeader.subtitle]
fr: L'histoire des vingt-deux Haïtiens qui ont fait entrer le pays dans la Coupe du Monde, et préparé le chemin jusqu'en 2026.
ht: Istwa venndezòm ayisyen ki te fè peyi a antre nan Koup di Mond, epi ki te prepare wout la jouk 2026.

[INLINE History.jsx:HistoryFR byline.author]
fr: Par Chokarella.
ht: Pa Chokarella.

[INLINE History.jsx:HistoryFR byline.reading]
fr: Lecture : 12 min
ht: Lekti : 12 min

[INLINE History.jsx:HistoryFR hero.figcaption.title]
fr: La sélection haïtienne, Coupe du Monde 1974
ht: Seleksyon ayisyen an, Koup di Mond 1974

[INLINE History.jsx:HistoryFR hero.figcaption.standing]  (caption; names are proper nouns)
fr: Debout (de gauche à droite) : Arsène Auguste (défenseur, n°3), Wilner Nazaire (défenseur, n°14, capitaine), Ernst Jean-Joseph (défenseur, n°12), Pierre Bayonne (défenseur, n°6), Jean-Claude Désir (milieu, n°8), Henri Françillon (gardien, n°1, maillot jaune).
ht: Kanpe (de goch a dwat) : Arsène Auguste (defansè, n°3), Wilner Nazaire (defansè, n°14, kapitèn), Ernst Jean-Joseph (defansè, n°12), Pierre Bayonne (defansè, n°6), Jean-Claude Désir (milye, n°8), Henri Françillon (gadyen, n°1, mayo jòn).

[INLINE History.jsx:HistoryFR hero.figcaption.crouching]  (caption; names are proper nouns)
fr: Accroupis (de gauche à droite) : Eddy Antoine (milieu, n°9), Guy François (milieu, n°10), Philippe Vorbe (milieu, n°7), Emmanuel Sanon (attaquant, n°20, buteur historique d'Haïti en Coupe du Monde), Roger Saint-Vil (attaquant, n°15).
ht: Akwoupi (de goch a dwat) : Eddy Antoine (milye, n°9), Guy François (milye, n°10), Philippe Vorbe (milye, n°7), Emmanuel Sanon (atakan, n°20, katchè istorik Ayiti nan Koup di Mond), Roger Saint-Vil (atakan, n°15).

[INLINE History.jsx:HistoryFR lede]
fr: Le 15 juin 1974, Haïti entre dans l'histoire.
ht: 15 jen 1974, Ayiti antre nan listwa.

### Section headings (14, in order)
[INLINE Section.heading 1]
fr: Avant Munich
ht: Anvan Minik
[INLINE Section.heading 2]
fr: Le tournoi qui a changé l'histoire
ht: Tounwa ki te chanje listwa a
[INLINE Section.heading 3]
fr: Antoine Tassy
ht: Antoine Tassy
[INLINE Section.heading 4]
fr: Vingt-deux hommes
ht: Venndezòm
[INLINE Section.heading 5]
fr: 15 juin 1974 · face à l'Italie
ht: 15 jen 1974 · kont Itali
[INLINE Section.heading 6]
fr: Le but
ht: Gòl la
[INLINE Section.heading 7]
fr: Soixante-dix minutes d'éternité
ht: Swasanndis minit etènite
[INLINE Section.heading 8]
fr: 19 juin · face à la Pologne
ht: 19 jen · kont Polòy
[INLINE Section.heading 9]
fr: 23 juin · le dernier match
ht: 23 jen · dènye match la
[INLINE Section.heading 10]
fr: Après Munich
ht: Apre Minik
[INLINE Section.heading 11]
fr: Manno Sanon
ht: Manno Sanon
[INLINE Section.heading 12]
fr: Les sept
ht: Sèt yo
[INLINE Section.heading 13]
fr: Le fil qui relie 1974 à 2026
ht: Fil ki lye 1974 ak 2026 la
[INLINE Section.heading 14]
fr: Ce que 1974 nous a laissé
ht: Sa 1974 kite pou nou

### Image captions (ImageInline `caption=`)
[INLINE caption qualif-1973]
fr: Du 29 novembre au 18 décembre 1973, la pelouse de Port-au-Prince a porté la qualification. Quatre victoires d'Haïti en cinq matchs. Le billet pour l'Allemagne de l'Ouest.
ht: Soti 29 novanm rive 18 desanm 1973, gazon Pòtoprens lan pote kalifikasyon an. Kat viktwa pou Ayiti nan senk match. Tikè pou Almay Lwès la.
[INLINE caption antoine-tassy]
fr: Antoine Tassy a conduit la sélection à son titre CONCACAF de 1973 et à sa première participation en Coupe du Monde.
ht: Antoine Tassy mennen seleksyon an nan tit CONCACAF 1973 li a ak nan premye patisipasyon li nan Koup di Mond.
[INLINE caption squad-1974-group]
fr: Le groupe à Munich, lors de la Coupe du Monde. Vingt-deux hommes, trois clubs principaux à Port-au-Prince (Racing, Aigle Noir, Violette), plus Victory SC pour le gardien Françillon.
ht: Gwoup la nan Minik, pandan Koup di Mond la. Venndezòm, twa gwo klib nan Pòtoprens (Racing, Aigle Noir, Violette), plis Victory SC pou gadyen Françillon.
[INLINE caption francillon-italie]
fr: « Le Chat des Caraïbes » tient l'Italie en première période. À la mi-temps, le tableau d'affichage indique 0-0.
ht: « Chat Karayib la » kenbe Itali nan premye peryòd la. Nan mitan match la, tablo a make 0-0.
[INLINE caption sanon-zoff]
fr: L'homme qui a marqué. Le gardien qu'il a battu. L'instant où Haïti est devenue la réponse à une question que l'Italie pensait sans réponse.
ht: Nonm ki te make a. Gadyen li te bat la. Moman Ayiti te vin tounen repons yon kesyon Itali te kwè pa t gen repons.
[INLINE caption pologne-1974]
fr: Face à la Pologne de Lato, Szarmach et Deyna, qui terminera troisième du Mondial. Sept buts encaissés, mais aucun match abandonné.
ht: Kont Polòy Lato, Szarmach ak Deyna, ki t ap fini twazyèm nan Mondyal la. Sèt gòl pran, men okenn match yo pa t lage.
[INLINE caption argentine-1974]
fr: Le dernier match du tournoi. À la 63ᵉ minute, Vorbe lance Sanon en profondeur. L'attaquant haïtien réduit l'écart. Aucun autre Haïtien n'a marqué en Coupe du Monde depuis.
ht: Dènye match tounwa a. Nan 63yèm minit la, Vorbe lanse Sanon nan pwofondè. Atakan ayisyen an redui eka a. Okenn lòt Ayisyen pa make nan Koup di Mond depi lè sa a.

### YouTube embeds (title + caption)
[INLINE youtube[Nx9gqAuyGRI].title]
fr: Le but · Emmanuel Sanon met fin à la série record de Dino Zoff, 1974
ht: Gòl la · Emmanuel Sanon mete fen nan seri rekò Dino Zoff la, 1974
[INLINE youtube[Nx9gqAuyGRI].caption]
fr: Depuis la chaîne officielle YouTube de la FIFA. « Voyez Emmanuel Sanon distancer la défense italienne pour inscrire un but légendaire face au maestro italien Dino Zoff, lors de la Coupe du Monde 1974. »
ht: Soti nan chèn YouTube ofisyèl FIFA a. « Gade Emmanuel Sanon kite defans italyen an dèyè pou l make yon gòl lejandè kont mayestro italyen Dino Zoff, pandan Koup di Mond 1974 la. »
[INLINE youtube[lgKdZHZ8xeA].title]
fr: Haïti à la Coupe du Monde 1974
ht: Ayiti nan Koup di Mond 1974
[INLINE youtube[lgKdZHZ8xeA].caption]
fr: Depuis la chaîne officielle YouTube de la FIFA, publié le 14 juin 2016, 42ᵉ anniversaire. « En ce jour de 1974, Haïti a disputé sa première et unique apparition en Coupe du Monde, une performance immense, toujours célébrée par le football haïtien. »
ht: Soti nan chèn YouTube ofisyèl FIFA a, pibliye 14 jen 2016, 42yèm anivèsè a. « Jou sa a an 1974, Ayiti te jwe premye ak sèl aparisyon li nan Koup di Mond, yon gwo pèfòmans foutbòl ayisyen an toujou ap selebre. »

### "Les Quatorze" tribute block
[INLINE tribute.eyebrow]
fr: Toujours parmi nous
ht: Toujou pami nou
[INLINE tribute.heading]
fr: Les Quatorze.
ht: Katòz yo.
[INLINE tribute.intro1]
fr: Manno Sanon nous a quittés en 2008. Plusieurs de ses coéquipiers de cet été munichois également. Mais quatorze membres de la sélection haïtienne de 1974 sont toujours parmi nous en 2026.
ht: Manno Sanon kite nou an 2008. Plizyè nan koekipye li yo nan ete Minik sa a tou. Men katòz manm seleksyon ayisyen 1974 la toujou pami nou an 2026.
[INLINE tribute.intro2]
fr: Leurs noms, lus à voix haute lors d'un hommage qui leur a été rendu à Miami, en mai 2026 :
ht: Non yo, yo li yo awotvwa pandan yon omaj yo te rann yo nan Miami, an me 2026 :
[INLINE tribute.player.notes[]]  (14 names are proper nouns; only the notes need ht)
fr (Wilner Nazaire): Capitaine à Munich.
ht: Kapitèn nan Minik.
fr (Philippe Vorbe): La passe sur le but.
ht: Pas la sou gòl la.
fr (Pierre Bayonne): Violette AC.
ht: Violette AC.
fr (Henri Françillon): Le Chat des Caraïbes.
ht: Chat Karayib la.
fr (Jean-Claude Désir): Tom Pouce.
ht: Tom Pouce.
[INLINE tribute.closing]
fr: Le Violette Athletic Club de Philippe Vorbe demeure le fil rouge : là où Vorbe et Pierre Bayonne ont joué, là où Woodensky Pierre joue aujourd'hui.
ht: Violette Athletic Club Philippe Vorbe a rete fil wouj la : kote Vorbe ak Pierre Bayonne te jwe, kote Woodensky Pierre ap jwe jodi a.

### Footer + CTAs
[INLINE footer.sourcedPrecision]
fr: Précision sourcée. La série d'imbattabilité de Dino Zoff est le plus souvent citée à 1 142 minutes, mettant fin au but de Sanon le 15 juin 1974. Certaines sources arrondissent à 1 143 ou citent 1 174 ; nous retenons 1 142, chiffre le plus communément donné par les archives contemporaines et de langue italienne.
ht: Presizyon ak sous. Yo site seri envensiblite Dino Zoff la pi souvan a 1 142 minit, gòl Sanon an mete fen li 15 jen 1974. Gen sous ki awondi l a 1 143 oswa site 1 174 ; nou kenbe 1 142, chif achiv kontanporen ak achiv an italyen bay pi souvan an.
[INLINE footer.sources]
fr: Sources : FIFA, Wikipedia (Emmanuel Sanon, Philippe Vorbe, Pierre Bayonne, Henri Françillon, Wilner Nazaire, Antoine Tassy, Championnat CONCACAF 1973, Haïti à la Coupe du Monde 1974), CONCACAF, France Football, Hugh McIlvanney dans The Observer (février 1974), Shoot! (février 1974, entretien Wilner Nazaire), commentaire BBC de David Coleman (15 juin 1974), archives Bundesarchiv, Getty Images, Potomitan, World Wide Soccer Stories.
ht: Sous : FIFA, Wikipedia (Emmanuel Sanon, Philippe Vorbe, Pierre Bayonne, Henri Françillon, Wilner Nazaire, Antoine Tassy, Chanpyona CONCACAF 1973, Ayiti nan Koup di Mond 1974), CONCACAF, France Football, Hugh McIlvanney nan The Observer (fevriye 1974), Shoot! (fevriye 1974, entèvyou Wilner Nazaire), kòmantè BBC David Coleman (15 jen 1974), achiv Bundesarchiv, Getty Images, Potomitan, World Wide Soccer Stories.
[INLINE cta.squad]
fr: Découvrir le groupe 2026
ht: Dekouvri gwoup 2026 la
[INLINE cta.tribute]
fr: Hommage créatif
ht: Omaj kreyatif

---

# 2 · /history-1974 ARTICLE BODY — size report (not inlined)

- **Where it lives:** `src/pages/History.jsx`, function **`HistoryFR()`** — the article body is hardcoded JSX `<p>` prose inside `<Section>` blocks (lines ~63–244). There is **no data file** and **no `t()` key**; it is page-local markup.
- **`*Ht` sibling:** **NONE.** The only other version is `HistoryEN()` (English). `History()` routes `ht` → `HistoryFR`, so Kreyòl shows the French body verbatim. Adding Kreyòl means either a third `HistoryHT()` component or refactoring the body to a language-keyed data source.
- **Section headings, in order** (same 14 listed in the worksheet above):
  1. Avant Munich
  2. Le tournoi qui a changé l'histoire
  3. Antoine Tassy
  4. Vingt-deux hommes
  5. 15 juin 1974 · face à l'Italie
  6. Le but
  7. Soixante-dix minutes d'éternité
  8. 19 juin · face à la Pologne
  9. 23 juin · le dernier match
  10. Après Munich
  11. Manno Sanon
  12. Les sept
  13. Le fil qui relie 1974 à 2026
  14. Ce que 1974 nous a laissé
  - (plus the lede line and the "Les Quatorze." tribute block, counted as chrome in §1)
- **French body word count:** **≈ 1 997 words** (the narrative `<p>` prose only). Including the section headings + image captions + YouTube/tribute/footer copy already listed in §1, the page's full translatable French text is **≈ 2 403 words**.

---

# 3 · Summary

- **fr / en untouched** — this was a read-only audit; `git status` is clean, no files modified.
- **/the-tribute** is the biggest gap: chrome is a page-local `COPY` object with **no `ht` branch** (42 strings; the page may even throw in `ht`), and **58** data fields render French via `pickLang` with no `*Ht` sibling (only `statement_kr` exists). ~1 838 words of long data prose on top of the short strings above.
- **/federation** is nearly done in chrome: of 30 `t()` keys, **1** is a French placeholder (`federation.team.institution`, `ht === fr`). The data layer is the gap — **14** fields/arrays via `pick(fr,en)`, every one missing an `*Ht` sibling.
- **/history-1974** has **no `ht` path at all**: `History()` falls to `HistoryFR`, so the whole page is French. Body ≈ 1 997 words (≈ 2 403 with headings/captions), no data file, no `*Ht`.

---

# 4 · STILL OPEN (long prose — not in the worksheet above, fill in a follow-up)

These were flagged "listed, not inlined" and still need Kreyòl before ingest:
- **/the-tribute** long DATA prose (~1 838 words): `musicVideos[0..14].note` (15 blurbs), `creativeTributes[*].description`/`.caption`/`.statement_fr` (Lento already has `statement_kr`), `lyneLucien.bio`/`.quote`/`works[*].caption`, `ferronDocumentary.synopsisShort`/`.synopsisLong`/`.description`, `shortFilms[0].note`, `playlist.description`. (`supporterPoem.lines` stays English by design.)
- **/history-1974** article body (~1 997 words) in `HistoryFR()` — needs a full `HistoryHT()` (or a language-keyed body) translation.
- **routeMeta.js** SEO title/description for all three routes — French-only; add en/ht if desired.
