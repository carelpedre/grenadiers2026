import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { useT } from "../lib/i18n";

export default function About() {
  const { lang } = useT();
  if (lang === "en") return <AboutEN />;
  if (lang === "ht") return <AboutHT />;
  return <AboutFR />;
}

function AboutFR() {
  return (
    <div>
      <PageHeader
        eyebrow="À propos"
        title="Site indépendant et non-officiel sur les Grenadiers à la Coupe du Monde de la FIFA 2026, conçu et développé par Carel Pedre."
        subtitle="grenadiers2026.com accompagne la sélection nationale haïtienne tout au long de sa préparation et de sa participation au Mondial."
      />

      <article className="bg-white">
        <div className="max-w-prose mx-auto px-5 py-12 space-y-6 text-ink text-lg leading-relaxed">
          <p>
            Pendant cinquante-deux ans, les supporters haïtiens ont attendu. De 1974 en Allemagne de l'Ouest (Sanon, Francillon, Vorbe) au 18 novembre 2025, jour où Les Grenadiers ont battu le Nicaragua 2-0 à Curaçao pour s'adjuger leur place à la Coupe du Monde de la FIFA 2026, le pays a vécu une longue absence. Toute une génération est née et a grandi sans voir Haïti sur la plus grande scène sportive du monde.
          </p>

          <p>
            L'attente s'achève en juin. Et ce site existe pour accompagner le moment.
          </p>

          <h2 className="font-display text-2xl md:text-3xl mt-12 mb-2">La raison d'être du site</h2>

          <p>
            Grenadiers 2026 est un projet indépendant, conçu et développé par Carel Pedre. La plateforme rassemble l'actualité de la sélection nationale haïtienne durant la campagne du Mondial 2026 : programme des matchs, présentation du groupe, contenus éditoriaux et couverture quotidienne pendant le tournoi.
          </p>

          <p>
            Le site s'adresse en premier lieu aux supporters haïtiens, en Haïti comme dans la diaspora. La page consacrée au groupe présente chacun des vingt-six joueurs retenus par Sébastien Migné. Les pages des matchs détaillent les rencontres face à l'Écosse, au Brésil et au Maroc. La rubrique 1974 raconte la première et unique participation des Grenadiers à une Coupe du Monde, et la rubrique consacrée à la Fédération met en lumière l'institution qui porte le football haïtien depuis 1904.
          </p>

          <h2 className="font-display text-2xl md:text-3xl mt-12 mb-2">Une langue, une nation</h2>

          <p>
            Le site est publié en français, l'une des langues officielles de la République d'Haïti. Une déclinaison en créole haïtien est à l'étude pour les contenus éditoriaux principaux.
          </p>

          <h2 className="font-display text-2xl md:text-3xl mt-12 mb-2">Ce que propose le site</h2>

          <ul className="space-y-3 list-disc list-inside">
            <li><Link to="/squad" className="text-haiti-blue hover:text-haiti-red underline">Le groupe des 26</Link> : chaque joueur, son club, son parcours</li>
            <li><Link to="/matches" className="text-haiti-blue hover:text-haiti-red underline">Le calendrier</Link> : Écosse, Brésil, Maroc. Groupe C. Trois rendez-vous en juin.</li>
            <li><Link to="/journal" className="text-haiti-blue hover:text-haiti-red underline">Le Journal</Link> : les coulisses de la sélection, jour après jour</li>
            <li><Link to="/history-1974" className="text-haiti-blue hover:text-haiti-red underline">1974</Link> : le but de Sanon, les hommes qui l'ont rendu possible, et les survivants honorés en mai 2026</li>
            <li><Link to="/the-tribute" className="text-haiti-blue hover:text-haiti-red underline">Hommage créatif</Link> : la reconnaissance de la sélection envers les artistes haïtiens qui se mobilisent autour des Grenadiers</li>
            <li><Link to="/federation" className="text-haiti-blue hover:text-haiti-red underline">La Fédération</Link> : la FHF, son histoire et sa direction actuelle</li>
          </ul>

          <h2 className="font-display text-2xl md:text-3xl mt-12 mb-2">Remerciements</h2>

          <p>
            Grenadiers 2026 est un projet indépendant, conçu et développé par Carel Pedre. Il bénéficie de la contribution de quelques passionnés du football haïtien :
          </p>

          <ul className="space-y-3 list-disc list-inside">
            <li>
              <a href="https://www.facebook.com/CalebFootHaiti" target="_blank" rel="noopener noreferrer" className="text-haiti-blue hover:text-haiti-red underline">Caleb Jephté Pierre</a>{" "}de{" "}
              <a href="https://haititempo.com/author/caleb/" target="_blank" rel="noopener noreferrer" className="text-haiti-blue hover:text-haiti-red underline">haititempo.com</a>
            </li>
            <li>
              <a href="https://www.footkoleht.com/" target="_blank" rel="noopener noreferrer" className="text-haiti-blue hover:text-haiti-red underline">Lutherson Leon</a>{" "}de footkoleht.com
            </li>
            <li>Rubens Etienne</li>
          </ul>

          <h2 className="font-display text-2xl md:text-3xl mt-12 mb-2">Crédits photos</h2>

          <p>
            Certaines images utilisées sur le site proviennent de Ticket Magazine et de la page Facebook de la Fédération Haïtienne de Football.
          </p>

          <h2 className="font-display text-2xl md:text-3xl mt-12 mb-2">Corrections et contact</h2>

          <p>
            Pour signaler une erreur factuelle, proposer un événement ou un contenu, ou prendre contact avec la rédaction, écrire à <a href="mailto:contact@grenadiers2026.com" className="text-haiti-blue hover:text-haiti-red underline">contact@grenadiers2026.com</a>.
          </p>

          <h2 className="font-display text-2xl md:text-3xl mt-12 mb-2">En conclusion</h2>

          <p>
            Le football haïtien méritait un espace numérique à la hauteur de son histoire et de l'instant. Une plateforme indépendante et dédiée, où l'histoire des Grenadiers est racontée avec passion et exigence.
          </p>

          <p>
            13 juin. Foxborough. L'attente s'achève.
          </p>

          <p className="font-display text-haiti-red text-xl mt-8">
            Ann ale, Grenadye.
          </p>
        </div>
      </article>
    </div>
  );
}

function AboutEN() {
  return (
    <div>
      <PageHeader
        eyebrow="About"
        title="An independent, unofficial site about the Grenadiers at the 2026 FIFA World Cup, designed and built by Carel Pedre."
        subtitle="grenadiers2026.com follows the Haitian national team throughout its preparation and its World Cup run."
      />

      <article className="bg-white">
        <div className="max-w-prose mx-auto px-5 py-12 space-y-6 text-ink text-lg leading-relaxed">
          <p>
            For fifty-two years, Haitian fans waited. From 1974 in West Germany (Sanon, Francillon, Vorbe) to November 18, 2025, the day the Grenadiers beat Nicaragua 2-0 in Curaçao to claim their place at the 2026 FIFA World Cup, the country lived through a long absence. An entire generation was born and grew up without seeing Haiti on the biggest sporting stage in the world.
          </p>

          <p>
            The wait ends in June. And this site exists to be part of the moment.
          </p>

          <h2 className="font-display text-2xl md:text-3xl mt-12 mb-2">Why this site exists</h2>

          <p>
            Grenadiers 2026 is an independent project, designed and built by Carel Pedre. The platform gathers the news of the Haitian national team during the 2026 World Cup campaign: the match schedule, the squad, editorial content, and daily coverage during the tournament.
          </p>

          <p>
            The site is aimed first at Haitian fans, in Haiti and across the diaspora. The squad page presents each of the twenty-six players selected by Sébastien Migné. The match pages detail the games against Scotland, Brazil, and Morocco. The 1974 section tells the story of the Grenadiers' first and only World Cup appearance, and the section devoted to the Federation highlights the institution that has carried Haitian football since 1904.
          </p>

          <h2 className="font-display text-2xl md:text-3xl mt-12 mb-2">One language, one nation</h2>

          <p>
            The site is published in French, one of the official languages of the Republic of Haiti. A Haitian Creole version of the main editorial content is under consideration.
          </p>

          <h2 className="font-display text-2xl md:text-3xl mt-12 mb-2">What the site offers</h2>

          <ul className="space-y-3 list-disc list-inside">
            <li><Link to="/squad" className="text-haiti-blue hover:text-haiti-red underline">The squad of 26</Link> : each player, their club, their journey</li>
            <li><Link to="/matches" className="text-haiti-blue hover:text-haiti-red underline">The schedule</Link> : Scotland, Brazil, Morocco. Group C. Three dates in June.</li>
            <li><Link to="/journal" className="text-haiti-blue hover:text-haiti-red underline">The Journal</Link> : behind the scenes of the team, day after day</li>
            <li><Link to="/history-1974" className="text-haiti-blue hover:text-haiti-red underline">1974</Link> : Sanon's goal, the men who made it possible, and the survivors honored in May 2026</li>
            <li><Link to="/the-tribute" className="text-haiti-blue hover:text-haiti-red underline">Creative tribute</Link> : the team's thanks to the Haitian artists rallying around the Grenadiers</li>
            <li><Link to="/federation" className="text-haiti-blue hover:text-haiti-red underline">The Federation</Link> : the FHF, its history and its current leadership</li>
          </ul>

          <h2 className="font-display text-2xl md:text-3xl mt-12 mb-2">Thanks</h2>

          <p>
            Grenadiers 2026 is an independent project, designed and built by Carel Pedre. It benefits from the contribution of a few devotees of Haitian football:
          </p>

          <ul className="space-y-3 list-disc list-inside">
            <li>
              <a href="https://www.facebook.com/CalebFootHaiti" target="_blank" rel="noopener noreferrer" className="text-haiti-blue hover:text-haiti-red underline">Caleb Jephté Pierre</a>{" "}of{" "}
              <a href="https://haititempo.com/author/caleb/" target="_blank" rel="noopener noreferrer" className="text-haiti-blue hover:text-haiti-red underline">haititempo.com</a>
            </li>
            <li>
              <a href="https://www.footkoleht.com/" target="_blank" rel="noopener noreferrer" className="text-haiti-blue hover:text-haiti-red underline">Lutherson Leon</a>{" "}of footkoleht.com
            </li>
            <li>Rubens Etienne</li>
          </ul>

          <h2 className="font-display text-2xl md:text-3xl mt-12 mb-2">Photo credits</h2>

          <p>
            Some images used on the site come from Ticket Magazine and the Facebook page of the Haitian Football Federation.
          </p>

          <h2 className="font-display text-2xl md:text-3xl mt-12 mb-2">Corrections and contact</h2>

          <p>
            To report a factual error, suggest an event or a piece of content, or get in touch with the editorial team, email <a href="mailto:contact@grenadiers2026.com" className="text-haiti-blue hover:text-haiti-red underline">contact@grenadiers2026.com</a>.
          </p>

          <h2 className="font-display text-2xl md:text-3xl mt-12 mb-2">In closing</h2>

          <p>
            Haitian football deserved a digital space worthy of its history and of this moment. An independent, dedicated platform, where the story of the Grenadiers is told with passion and care.
          </p>

          <p>
            June 13. Foxborough. The wait ends.
          </p>

          <p className="font-display text-haiti-red text-xl mt-8">
            Ann ale, Grenadye.
          </p>
        </div>
      </article>
    </div>
  );
}

function AboutHT() {
  return (
    <div>
      <PageHeader
        eyebrow="Konsènan"
        title="Sit endepandan, ki pa ofisyèl, sou Grenadye yo nan Koup di Mond FIFA 2026 la, Carel Pedre konsevwa epi devlope li."
        subtitle="grenadiers2026.com ap akonpaye seleksyon nasyonal ayisyen an pandan tout preparasyon li ak patisipasyon li nan Mondyal la."
      />

      <article className="bg-white">
        <div className="max-w-prose mx-auto px-5 py-12 space-y-6 text-ink text-lg leading-relaxed">
          <p>
            Pandan senkant-de ane, sipòtè ayisyen yo t ap tann. Depi 1974 nan Almay Lwès (Sanon, Francillon, Vorbe) rive 18 novanm 2025, jou Grenadye yo te bat Nikaragwa 2-0 nan Kiraso pou pran plas yo nan Koup di Mond FIFA 2026 la, peyi a te viv yon long absans. Gen yon jenerasyon antye ki fèt epi grandi san yo pa janm wè Ayiti sou pi gwo sèn espòtif nan mond lan.
          </p>

          <p>
            Tann nan fini an jen. E sit sa a la pou akonpaye moman an.
          </p>

          <h2 className="font-display text-2xl md:text-3xl mt-12 mb-2">Rezon ki fè sit la egziste</h2>

          <p>
            Grenadye 2026 se yon pwojè endepandan Carel Pedre konsevwa epi devlope. Platfòm nan rasanble nouvèl seleksyon nasyonal ayisyen an pandan kanpay Mondyal 2026 la: pwogram match yo, prezantasyon ekip la, kontni editoryal ak kouvèti chak jou pandan tounwa a.
          </p>

          <p>
            Sit la pale an premye ak sipòtè ayisyen yo, ann Ayiti kou nan dyaspora a. Paj seleksyon an prezante chak nan 26 jwè Sébastien Migné chwazi yo. Paj match yo bay detay sou rankont kont Eskòs, Brezil ak Mawòk. Ribrik 1974 la rakonte premye ak sèl patisipasyon Grenadye yo nan yon Koup di Mond, epi ribrik Federasyon an mete limyè sou enstitisyon k ap pote foutbòl ayisyen depi 1904.
          </p>

          <h2 className="font-display text-2xl md:text-3xl mt-12 mb-2">Yon lang, yon nasyon</h2>

          <p>
            Sit la pibliye an franse, youn nan lang ofisyèl Repiblik Ayiti. Gen yon vèsyon an kreyòl ayisyen k ap etidye pou prensipal kontni editoryal yo.
          </p>

          <h2 className="font-display text-2xl md:text-3xl mt-12 mb-2">Sa sit la ofri</h2>

          <ul className="space-y-3 list-disc list-inside">
            <li><Link to="/squad" className="text-haiti-blue hover:text-haiti-red underline">Gwoup 26 la</Link>: chak jwè, klèb li, pakou li</li>
            <li><Link to="/matches" className="text-haiti-blue hover:text-haiti-red underline">Kalandriye a</Link>: Eskòs, Brezil, Mawòk. Gwoup C. Twa randevou an jen.</li>
            <li><Link to="/journal" className="text-haiti-blue hover:text-haiti-red underline">Jounal la</Link>: dèyè sèn seleksyon an, jou apre jou</li>
            <li><Link to="/history-1974" className="text-haiti-blue hover:text-haiti-red underline">1974</Link>: gòl Sanon an, mesye ki te rann li posib yo, ak sivivan yo te onore an me 2026</li>
            <li><Link to="/the-tribute" className="text-haiti-blue hover:text-haiti-red underline">Omaj kreyatif</Link>: rekonesans seleksyon an pou atis ayisyen k ap mobilize bò kote Grenadye yo</li>
            <li><Link to="/federation" className="text-haiti-blue hover:text-haiti-red underline">Federasyon an</Link>: FHF la, istwa li ak direksyon aktyèl li</li>
          </ul>

          <h2 className="font-display text-2xl md:text-3xl mt-12 mb-2">Remèsiman</h2>

          <p>
            Grenadye 2026 se yon pwojè endepandan Carel Pedre konsevwa epi devlope. Li benefisye kontribisyon kèk moun ki pasyone pou foutbòl ayisyen:
          </p>

          <ul className="space-y-3 list-disc list-inside">
            <li>
              <a href="https://www.facebook.com/CalebFootHaiti" target="_blank" rel="noopener noreferrer" className="text-haiti-blue hover:text-haiti-red underline">Caleb Jephté Pierre</a>{" "}de{" "}
              <a href="https://haititempo.com/author/caleb/" target="_blank" rel="noopener noreferrer" className="text-haiti-blue hover:text-haiti-red underline">haititempo.com</a>
            </li>
            <li>
              <a href="https://www.footkoleht.com/" target="_blank" rel="noopener noreferrer" className="text-haiti-blue hover:text-haiti-red underline">Lutherson Leon</a>{" "}de footkoleht.com
            </li>
            <li>Rubens Etienne</li>
          </ul>

          <h2 className="font-display text-2xl md:text-3xl mt-12 mb-2">Kredi foto</h2>

          <p>
            Gen kèk imaj yo itilize sou sit la ki soti nan Ticket Magazine ak paj Facebook Federasyon Ayisyèn Foutbòl la.
          </p>

          <h2 className="font-display text-2xl md:text-3xl mt-12 mb-2">Koreksyon ak kontak</h2>

          <p>
            Pou siyale yon erè nan enfòmasyon, pwopoze yon evènman oswa yon kontni, oubyen kontakte redaksyon an, ekri nan <a href="mailto:contact@grenadiers2026.com" className="text-haiti-blue hover:text-haiti-red underline">contact@grenadiers2026.com</a>.
          </p>

          <h2 className="font-display text-2xl md:text-3xl mt-12 mb-2">Pou fini</h2>

          <p>
            Foutbòl ayisyen te merite yon espas dijital ki nan nivo istwa li ak moman sa a. Yon platfòm endepandan, dedye, kote istwa Grenadye yo rakonte ak pasyon epi ak rigè.
          </p>

          <p>
            13 jen. Foxborough. Tann nan fini.
          </p>

          <p className="font-display text-haiti-red text-xl mt-8">
            Ann ale, Grenadye.
          </p>
        </div>
      </article>
    </div>
  );
}
