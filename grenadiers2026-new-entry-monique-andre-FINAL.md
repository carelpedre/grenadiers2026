# NEW JOURNAL ENTRY — Monique André's locker-room speech to the Grenadiers after the 2026 World Cup

Source for ONE new diary.js entry (trilingual). FR + EN + HT. NEWS type, BODY-ONLY (no transcript).
Content is FINAL and approved by Carel. This is Carel's OWN reporting: he recorded the speech
(video + cover photo are his footage, not online). Use the prose VERBATIM, translate nothing,
invent nothing.

DIRECT-QUOTE INTEGRITY: the « » quotes are the subject's actual spoken words as Carel transcribed
them. Do NOT "correct" them. In particular the FR "je suis fier de vous" stays EXACTLY as written
(do not change to "fière") — it is a verbatim quote.

Build body / bodyEn / bodyHt as THREE INDEPENDENT arrays, each faithful to its own language
section with its own paragraph + heading breaks. Each language has exactly 6 headings ("## ").
No inline [VIDEO] markers. The speech reel plays from the top-of-page `video` field only.

PARITY: independent-array model. Assert each array is internally well-formed and each has
exactly 6 headings. Report the three array lengths + heading counts (expect 6 / 6 / 6).

GLOSSARY: Morocco in Kreyòl = "Mawòk" (NOT "Maròk"). No em dashes anywhere. « » guillemets in fr.

==================================================================
METADATA
==================================================================
slug:            monique-andre-message-grenadiers-apres-mondial-2026
type:            news
date:            2026-06-24
dateLabel (fr):  24 juin 2026
cover:           /images/journal/monique-andre-message-grenadiers-apres-mondial-2026.jpg
video:           https://grenadiers2026.com/media/videos/2026-06-24-monique-andre-discours-vestiaire.mp4
                 # Self-hosted mp4 (Carel's own footage), same pattern as the Migné FHF interview entry.
                 # The .mp4 extension makes isLocalVideo() fire -> native <video> player with cover as poster.
                 # Carel uploads this file to /media/videos/ on DreamHost via SFTP. Filename must match exactly.
                 # Do NOT set videoExternal and do NOT add inline [VIDEO] markers.
videoExternal:   false   # (omit/false; the native <video> branch handles it via the .mp4 extension)

# Insert in date order. It shares 2026-06-24 with the recap and the isidor-placide entry.
# Newest same-date items go on top per existing convention; Carel can tell CC exact order.

eyebrow (fr):    Actualité · Coupe du Monde FIFA 2026
eyebrow (en):    News · FIFA World Cup 2026
eyebrow (ht):    Nouvèl · Koup di Mond FIFA 2026

source (fr): Source : reportage Chokarella, vestiaire des Grenadiers, Atlanta.
source (en): Source: Chokarella reporting, Grenadiers locker room, Atlanta.
source (ht): Sous : repòtaj Chokarella, vestyè Grenadye yo, Atlanta.

==================================================================
TITLE
==================================================================
fr: « Vous avez fait rêver un pays » : le message poignant de Monique André aux Grenadiers après le Mondial 2026
en: "You Made a Nation Dream": Monique André's Emotional Final Message to Haiti's Players After the 2026 FIFA World Cup
ht: « Nou fè yon pèp reve » : dènye mesaj chaje emosyon Monique André bay Grenadye yo apre Koup di Mond 2026 la

==================================================================
DEK (standfirst — own field, NOT in the body array)
==================================================================
fr: Quelques minutes après le dernier match d'Haïti à la Coupe du Monde de la FIFA 2026, la présidente du Comité de Normalisation de la Fédération Haïtienne de Football a pris la parole dans le vestiaire pour un message qui résumait toute la portée de cette campagne.
en: Moments after Haiti's final match at the 2026 FIFA World Cup, the President of the Haitian Football Federation's Normalization Committee addressed the squad in the locker room with a speech that captured the meaning of their journey.
ht: Kèk minit apre dènye match Ayiti te jwe nan Koup di Mond FIFA 2026 la, Prezidan Komite Nòmalizasyon Federasyon Ayisyèn Foutbòl la pran lapawòl nan vestyè a pou yon mesaj ki rezime tout sans kanpay sa a.

==================================================================
BODY — FRENCH  (body[])
Headings (6):
  ## « Nous sommes en train d'écrire une histoire »
  ## Le regard déjà tourné vers l'avenir
  ## « Vous avez fait rêver un pays »
  ## Un hommage particulier à Johny Placide
  ## « Grenadiers ! À l'assaut ! »
  (note: intro paragraphs come BEFORE the first heading; the 6th heading is the closing cry —
   wait, count: the five above plus... see below. The FR has FIVE section headings in Carel's
   text. KEEP IT AT FIVE for FR. Recount enforced in build notes.)
==================================================================

# NOTE TO BUILDER: Carel's FR text has 5 section headings (listed below). EN also has 5.
# HT also has 5. So this entry is 5 / 5 / 5, NOT 6. Use FIVE. The headings are:
#   FR: « Nous sommes en train d'écrire une histoire » / Le regard déjà tourné vers l'avenir /
#       « Vous avez fait rêver un pays » / Un hommage particulier à Johny Placide /
#       « Grenadiers ! À l'assaut ! »
#   EN: "We Are Writing History" / Looking Ahead / "You Made a Nation Dream" /
#       A Tribute to Captain Johny Placide / "Grenadiers! Charge!"
#   HT: "Nou ap ekri listwa" / Je deja fikse sou sa k ap vini / "Nou fè yon pèp reve" /
#       Yon omaj espesyal pou Johny Placide / "Grenadye! Alaso!"
# Assert 5 / 5 / 5.

Quelques minutes après le dernier match d'Haïti à la Coupe du Monde de la FIFA 2026, l'émotion était palpable dans le vestiaire des Grenadiers. Alors que les joueurs terminaient une aventure historique, la présidente du Comité de Normalisation de la Fédération Haïtienne de Football, Monique André, a pris la parole pour adresser un message qui résumait parfaitement la portée de cette campagne.

Loin de s'attarder sur l'élimination, son discours s'est voulu un hommage au parcours de l'équipe et un appel à poursuivre le travail entrepris.

## « Nous sommes en train d'écrire une histoire »

Dès les premières secondes de son intervention, Monique André a rappelé aux joueurs que leur aventure ne se résumait pas à un simple tournoi.

« Messieurs, nous sommes en train d'écrire une histoire. Il y a un chapitre qui a pris fin ce soir. »

Pour la dirigeante, la Coupe du Monde n'est pas une fin, mais le début d'un nouveau cycle pour le football haïtien.

Elle a également évoqué la promesse faite la veille du match contre le Maroc. Après leur avoir demandé « un plus », elle a salué la réponse de l'équipe.

« Hier soir, je vous ai demandé un plus, vous m'en avez donné deux. Et je suis fier de vous. »

## Le regard déjà tourné vers l'avenir

Malgré la fin du Mondial, Monique André a rapidement projeté le groupe vers les prochains défis qui attendent les Grenadiers.

Elle a cité les compétitions à venir, notamment les rencontres de septembre, la Gold Cup, la Ligue des Nations et les futures campagnes de qualification, rappelant que cette génération a encore beaucoup à offrir.

Son message était clair : l'histoire de cette équipe est loin d'être terminée.

## « Vous avez fait rêver un pays »

L'un des moments les plus marquants de son discours est venu lorsqu'elle a évoqué l'impact de cette sélection sur le peuple haïtien.

« Vous avez fait rêver un pays. Vous avez fait naître encore, en ce peuple, un brin d'espoir. Vous avez montré qu'Haïti existe et Haïti peut exister. »

Au-delà des résultats sportifs, elle a insisté sur la capacité du football à rassembler les Haïtiens et à offrir une image positive du pays au reste du monde.

Selon elle, cette équipe a rappelé que le football peut devenir un puissant vecteur d'unité, de fierté et d'espérance.

## Un hommage particulier à Johny Placide

La présidente a également réservé quelques mots au capitaine Johny Placide, qui disputait le dernier match de sa carrière internationale.

Émue, elle a rappelé l'avoir vu grandir sous les couleurs de la sélection et s'est dite convaincue que son histoire avec le football haïtien ne faisait que commencer.

Elle l'a encouragé à poursuivre son parcours en devenant entraîneur, convaincue qu'il continuera à transmettre son expérience aux générations futures.

« C'est un nouveau chapitre qui s'ouvre pour toi aussi. Tout n'est pas fini. »

Un passage qui a suscité une vive émotion dans le vestiaire.

## « Grenadiers ! À l'assaut ! »

Avant de quitter les joueurs, Monique André a conclu son intervention comme le veut la tradition.

À trois reprises, elle a lancé :

« Grenadiers ! »

À chaque fois, le groupe a répondu d'une seule voix :

« À l'assaut ! »

Un dernier cri de ralliement qui symbolise parfaitement l'état d'esprit de cette génération : une équipe qui quitte la Coupe du Monde la tête haute, avec la conviction que le plus beau reste encore à écrire pour le football haïtien.

==================================================================
BODY — ENGLISH  (bodyEn[])
Headings (5):
  ## "We Are Writing History"
  ## Looking Ahead
  ## "You Made a Nation Dream"
  ## A Tribute to Captain Johny Placide
  ## "Grenadiers! Charge!"
==================================================================

Moments after Haiti's final match at the 2026 FIFA World Cup, emotions filled the Grenadiers' locker room. As the players reflected on a historic campaign, Monique André, President of the Haitian Football Federation's Normalization Committee, addressed the squad with a heartfelt speech that captured the significance of their journey.

Rather than focusing on elimination, André celebrated what the team had accomplished and reminded the players that their story is only beginning.

## "We Are Writing History"

From the opening words of her speech, André emphasized that the World Cup was not the end of Haiti's journey.

"Gentlemen, we are writing history. One chapter came to an end tonight."

For her, Haiti's return to the World Cup after 52 years was the beginning of a new era for Haitian football.

She also recalled the challenge she had given the team before facing Morocco.

"Last night, I asked you for one more thing, and you gave me two. I am proud of you."

Her words reflected her admiration for the team's determination and commitment throughout the tournament.

## Looking Ahead

Although Haiti's World Cup campaign had concluded, André quickly shifted the players' attention toward the future.

She reminded them that September's international matches were just around the corner, followed by the Gold Cup, the CONCACAF Nations League, and future World Cup qualification campaigns.

Her message was simple: this generation still has important chapters left to write.

## "You Made a Nation Dream"

The most powerful moment of the speech came when André spoke about the impact the team had on the Haitian people.

"You made a nation dream. You brought back a spark of hope. You showed that Haiti exists, and that Haiti can exist."

She stressed that the team's greatest achievement extended beyond football. Their performances united Haitians around the world and gave the country a renewed sense of pride and optimism during a difficult period in its history.

## A Tribute to Captain Johny Placide

André also paid an emotional tribute to captain Johny Placide, who had just played the final international match of his career.

She spoke about watching him grow into one of Haiti's greatest football leaders and encouraged him to remain involved in the game after retirement.

Believing he has much more to offer, she expressed her hope that he would become a successful coach and continue serving Haitian football.

"A new chapter is opening for you. It's not over."

Her words were met with visible emotion inside the locker room.

## "Grenadiers! Charge!"

Before ending her speech, André delivered one final rallying cry.

Three times she shouted:

"Grenadiers!"

Each time, the players responded together:

"Charge!"

It was a fitting conclusion to a remarkable World Cup journey, one that ended with heads held high and the belief that the future of Haitian football is brighter than ever.

==================================================================
BODY — KREYÒL  (bodyHt[])
Headings (5):
  ## « Nou ap ekri listwa »
  ## Je deja fikse sou sa k ap vini
  ## « Nou fè yon pèp reve »
  ## Yon omaj espesyal pou Johny Placide
  ## « Grenadye ! Alaso ! »
==================================================================

Kèk minit apre dènye match Ayiti te jwe nan Koup di Mond FIFA 2026 la, emosyon te anvayi vestyè Grenadye yo. Pandan jwè yo t ap reflechi sou bèl avanti istorik yo te fè a, Monique André, Prezidan Komite Nòmalizasyon Federasyon Ayisyèn Foutbòl la, pran lapawòl pou voye yon mesaj ki make tout ekip la.

Olye li rete sou eliminasyon an, li chwazi mete aksan sou sa ekip la reyalize epi raple jwè yo istwa yo fèk kòmanse ekri.

## « Nou ap ekri listwa »

Depi premye fraz li yo, Monique André fè jwè yo konprann Koup di Mond la pa t fen chemen an.

« Mesye, nou ap ekri listwa. Gen yon chapit ki fini aswè a. »

Pou li, retou Ayiti nan Koup di Mond la apre 52 ane se kòmansman yon nouvo epòk pou foutbòl ayisyen.

Li sonje tou sa li te mande ekip la avan match kont Mawòk la.

« Yè swa mwen te mande nou yon bagay anplis, nou ban mwen de. »

Se te fason li pou salye detèminasyon ak angajman jwè yo pandan tout konpetisyon an.

## Je deja fikse sou sa k ap vini

Malgre avanti Mondyal la te rive nan bout li, Monique André fè jwè yo konprann gen anpil lòt defi k ap tann yo.

Li site match mwa septanm yo, Gold Cup la, Lig Nasyon CONCACAF la, ansanm ak pwochen kanpay kalifikasyon yo.

Mesaj li te klè : jenerasyon sa a poko fini ekri listwa li.

## « Nou fè yon pèp reve »

Youn nan pi gwo moman diskou a rive lè li pale de sa ekip la reprezante pou tout Ayisyen.

« Nou fè yon pèp reve. Nou fè espwa rekòmanse viv nan kè pèp sa a. Nou montre Ayiti egziste e Ayiti kapab egziste. »

Pou li, pi gwo viktwa ekip la pa sèlman sou teren an. Se fyète yo pote bay yon pèp antye ak fason yo reyini Ayisyen toupatou sou latè dèyè menm drapo a.

## Yon omaj espesyal pou Johny Placide

Monique André pran tan tou pou rann omaj ak kapitèn Johny Placide, ki te fè dènye match li ak seleksyon nasyonal la.

Li sonje li te wè l grandi nan ekip la epi li fè konnen misyon li nan foutbòl ayisyen poko fini.

Li ankouraje l pouswiv fòmasyon li kòm antrenè epi kontinye sèvi peyi a ak eksperyans li.

« Se yon nouvo chapit k ap louvri pou ou. Tout bagay poko fini. »

Pawòl sa yo te touche anpil moun ki te nan vestyè a.

## « Grenadye ! Alaso ! »

Anvan li fini, Monique André fè dènye apèl tradisyonèl la.

Twa fwa li rele :

« Grenadye ! »

E chak fwa, tout ekip la reponn ansanm :

« Alaso ! »

Yon dènye kri rasanbleman ki rezime lespri ekip sa a : yon gwoup jwè ki kite Koup di Mond la ak tèt yo byen wo, pandan yo kwè pi bèl paj foutbòl ayisyen an poko ekri.
