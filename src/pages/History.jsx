import PageHeader from "../components/PageHeader";
import ImagePlaceholder from "../components/ImagePlaceholder";
import YouTubeEmbed from "../components/YouTubeEmbed";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useT } from "../lib/i18n";
import { fadeUp, stagger, CountUpNumber } from "../lib/motion";

// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  HISTOIRE 1974 — /history-1974                                         ║
// ║                                                                        ║
// ║  HOMMAGE INSTITUTIONNEL À LA SÉLECTION DE 1974.                        ║
// ║  - Les hommes, le football, la performance.                            ║
// ║  - Champion de la CONCACAF 1973. Qualification pour le Mondial.        ║
// ║  - Le but de Sanon qui met fin à l'invincibilité de 1142 min de Zoff.  ║
// ║  - Sanon parmi les "100 Héros de la Coupe du Monde" (France Football). ║
// ║  - La lignée Violette AC de 1974 à 2026.                               ║
// ║                                                                        ║
// ║  Chaque fait sourcé (Wikipedia, FIFA, Grokipedia, France Football).    ║
// ╚═══════════════════════════════════════════════════════════════════════╝

export default function History() {
  const { lang } = useT();
  return lang === "en" ? <HistoryEN /> : lang === "ht" ? <HistoryHT /> : <HistoryFR />;
}

function HistoryFR() {
  return (
    <div>
      <PageHeader
        eyebrow="1974 · Allemagne de l'Ouest"
        title="Les hommes qui ont ouvert la route."
        subtitle="L'histoire des vingt-deux Haïtiens qui ont fait entrer le pays dans la Coupe du Monde, et préparé le chemin jusqu'en 2026."
      />

      {/* Byline strip — under the page header */}
      <section className="bg-ink/95 text-bg/80 border-b border-bg/10">
        <div className="max-w-4xl mx-auto px-5 py-3 text-xs uppercase tracking-[0.2em] font-semibold flex items-center gap-3">
          <span className="text-haiti-red">Par Chokarella.</span>
          <span className="text-bg/30">·</span>
          <span className="text-bg/60">Lecture : 12 min</span>
        </div>
      </section>

      {/* Hero image — the squad */}
      <section className="bg-bg border-b border-line">
        <div className="max-w-content mx-auto px-5 py-8">
          <figure>
            <ImagePlaceholder src="/images/photos/squad-1974.jpg" aspect="16/9" objectPosition="center top" label="Sélection nationale d'Haïti · Photo de groupe avant la Coupe du Monde 1974" />
            <figcaption className="text-sm text-muted leading-relaxed mt-3 space-y-1.5">
              <span className="block font-display text-ink">La sélection haïtienne, Coupe du Monde 1974</span>
              <span className="block">
                <strong className="font-display text-ink">Debout</strong> (de gauche à droite) : Arsène Auguste (défenseur, n°3), Wilner Nazaire (défenseur, n°14, capitaine), Ernst Jean-Joseph (défenseur, n°12), Pierre Bayonne (défenseur, n°6), Jean-Claude Désir (milieu, n°8), Henri Françillon (gardien, n°1, maillot jaune).
              </span>
              <span className="block">
                <strong className="font-display text-ink">Accroupis</strong> (de gauche à droite) : Eddy Antoine (milieu, n°9), Guy François (milieu, n°10), Philippe Vorbe (milieu, n°7), Emmanuel Sanon (attaquant, n°20, buteur historique d'Haïti en Coupe du Monde), Roger Saint-Vil (attaquant, n°15).
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      <article className="bg-white">
        <div className="max-w-4xl mx-auto px-5 py-12 md:py-14">
          {/* Lede — Carel's opening */}
          <p className="font-display text-3xl md:text-4xl text-ink leading-[1.1] mb-10">
            Le 15 juin 1974, Haïti entre dans l'histoire.
          </p>

          {/* Opening framing — no heading, sits between lede and first section */}
          <div className="prose prose-lg max-w-none text-ink leading-relaxed space-y-5 mb-10">
            <p>Ce jour-là, à Munich, plus de 53 000 spectateurs prennent place dans les tribunes de l'Olympiastadion pour assister à une rencontre de Coupe du Monde entre l'Italie et une équipe dont peu d'entre eux connaissent réellement l'histoire. Pour la plupart des observateurs européens, le scénario semble déjà écrit.</p>
            <p>L'Italie est finaliste de la Coupe du Monde 1970. Son gardien, Dino Zoff, n'a plus encaissé le moindre but sous le maillot national depuis près de deux ans. Les Azzurri sont attendus parmi les favoris du tournoi. Haïti, elle, dispute la première Coupe du Monde de son histoire.</p>
            <p>Personne n'imagine encore que quelques heures plus tard, le nom d'un jeune attaquant haïtien fera le tour de la planète. Personne n'imagine qu'une petite nation caribéenne s'apprête à écrire l'un des chapitres les plus mémorables de son histoire sportive. Et pourtant, c'est exactement ce qui va se produire.</p>
            <p>Cette histoire n'est pas seulement celle d'un but. Elle est celle de <strong className="text-ink">vingt-deux hommes qui ont ouvert une route</strong>, une route qui mènera, cinquante-deux ans plus tard, jusqu'à la Coupe du Monde 2026.</p>
          </div>

          {/* ─── AVANT MUNICH ──────────────────────────────────────── */}
          <Section heading="Avant Munich">
            <p>Bien avant l'Allemagne, bien avant les caméras du monde entier, bien avant que le football haïtien ne fasse son entrée dans les archives officielles de la FIFA, il y avait le Stade Sylvio Cator.</p>
            <p>Dans les années 1960 et au début des années 1970, le football est déjà profondément ancré dans la culture populaire haïtienne. Les grandes affiches entre le Racing Club Haïtien, le Violette Athletic Club, l'Aigle Noir et le Victory Sportif Club attirent des foules considérables. Les meilleurs joueurs du pays sont connus de tous. Ils deviennent des figures populaires, des héros.</p>
            <p>La sélection nationale progresse également. En 1971, lors du Championnat de la CONCACAF disputé à Trinité-et-Tobago, Haïti termine à la deuxième place derrière le Mexique à la différence de buts. Le pays comprend alors qu'il peut rivaliser avec les meilleures nations de la région.</p>
            <p>La qualification à la Coupe du Monde n'est plus une utopie. Elle devient un objectif.</p>
          </Section>

          {/* ─── LE TOURNOI QUI A CHANGÉ L'HISTOIRE ────────────────── */}
          <Section heading="Le tournoi qui a changé l'histoire">
            <p>Du 29 novembre au 18 décembre 1973, Port-au-Prince accueille le Championnat de la CONCACAF. À l'époque, la compétition a une importance particulière : le champion est directement qualifié pour la Coupe du Monde. Pas de barrage. Pas de seconde chance. Une seule équipe ira en Allemagne de l'Ouest.</p>
            <p>Six nations prennent le départ : Haïti, Mexique, Honduras, Guatemala, Trinité-et-Tobago, Antilles néerlandaises. Pendant vingt jours, le pays retient son souffle. Match après match, les Grenadiers avancent. Les victoires s'accumulent, le public remplit les tribunes, l'espoir grandit.</p>
            <p>Au terme du tournoi, Haïti affiche <strong className="text-ink">quatre victoires et une seule défaite. Huit buts marqués. Trois encaissés.</strong> Championne de la CONCACAF, pour la première fois de son histoire, et encore aujourd'hui, pour la seule fois.</p>
            <p>Au cœur de cette campagne se trouve un jeune attaquant de vingt-deux ans : Emmanuel Sanon. Cinq buts. Meilleur buteur du tournoi. Une étoile est née.</p>
            <ImageInline
              src="/images/photos/qualif-1973-port-au-prince.jpg"
              label="Stade Sylvio Cator · Port-au-Prince · Championnat de la CONCACAF 1973"
              caption="Du 29 novembre au 18 décembre 1973, la pelouse de Port-au-Prince a porté la qualification. Quatre victoires d'Haïti en cinq matchs. Le billet pour l'Allemagne de l'Ouest."
            />
          </Section>

          {/* ─── ANTOINE TASSY ─────────────────────────────────────── */}
          <Section heading="Antoine Tassy">
            <ImageInline
              src="/images/photos/antoine-tassy.jpg"
              aspect="3/4"
              objectPosition="top"
              fit="contain"
              narrow
              label="Antoine Tassy · Sélectionneur · 1974"
              caption="Antoine Tassy a conduit la sélection à son titre CONCACAF de 1973 et à sa première participation en Coupe du Monde."
            />
            <p>Toutes les grandes équipes possèdent un leader. Pour Haïti, cet homme s'appelle Antoine Tassy. Respecté, exigeant et profondément convaincu du potentiel de ses joueurs, il refuse de considérer la Coupe du Monde comme une simple récompense. Pour lui, il s'agit d'une mission.</p>
            <p>Son équipe doit être prête : mentalement, physiquement, tactiquement. À une époque où les ressources sont limitées, Tassy prépare minutieusement ses joueurs. Les témoignages de l'époque racontent qu'il étudie les adversaires avec une rigueur rarement vue dans la région.</p>
            <p>Il veut que ses joueurs arrivent en Allemagne avec une certitude : ils ont leur place parmi les meilleurs. Cette conviction deviendra l'une des plus grandes forces du groupe.</p>
          </Section>

          {/* ─── VINGT-DEUX HOMMES ─────────────────────────────────── */}
          <Section heading="Vingt-deux hommes">
            <ImageInline
              src="/images/photos/squad-1974-group.jpg"
              aspect="3/2"
              objectPosition="center"
              fit="contain"
              label="La sélection nationale d'Haïti · Munich, juin 1974"
              caption="Le groupe à Munich, lors de la Coupe du Monde. Vingt-deux hommes, trois clubs principaux à Port-au-Prince (Racing, Aigle Noir, Violette), plus Victory SC pour le gardien Françillon."
            />
            <p>La sélection haïtienne qui débarque en Allemagne ne ressemble à aucune autre. La majorité de ses joueurs évoluent encore dans le championnat national. Beaucoup ont grandi ensemble. La plupart se connaissent depuis des années.</p>
            <p>Ils représentent principalement trois clubs historiques : <strong className="text-ink">le Racing Club Haïtien, le Violette Athletic Club, l'Aigle Noir.</strong> Henri Françillon est le seul joueur issu du Victory Sportif Club.</p>
            <p>À leur tête se trouve le capitaine Wilner Nazaire. Dans les buts, Henri Françillon. Au milieu du terrain, Philippe Vorbe. En attaque, Emmanuel Sanon. Autour d'eux : Pierre Bayonne, Guy Saint-Vil, Jean-Claude Désir, Serge Racine, Arsène Auguste, Eddy Antoine et bien d'autres.</p>
            <p>Ils n'ont pas les moyens des grandes puissances. Mais ils possèdent quelque chose d'inestimable : ils croient en eux.</p>
          </Section>

          {/* ─── ITALIE — 15 JUIN 1974 ─────────────────────────────── */}
          <Section heading="15 juin 1974 · face à l'Italie">
            <p>L'Olympiastadion est plein. L'Italie est favorite. Dino Zoff est considéré comme presque imbattable : sa série d'invincibilité atteint 1 142 minutes. La presse italienne se demande quel attaquant pourra enfin mettre un terme à cette séquence exceptionnelle.</p>
            <p>Personne ne pense à Emmanuel Sanon.</p>
            <ImageInline
              src="/images/photos/francillon-italie.jpg"
              label="Henri Françillon · Italie–Haïti · Olympiastadion, Munich · 15 juin 1974"
              caption="« Le Chat des Caraïbes » tient l'Italie en première période. À la mi-temps, le tableau d'affichage indique 0-0."
            />
            <p>Le coup d'envoi est donné. Et pendant quarante-cinq minutes, Haïti résiste. Les Italiens attaquent, encore et encore, mais Henri Françillon répond présent : sorties aériennes, parades réflexes, interventions décisives. Minute après minute, le gardien haïtien repousse les assauts italiens.</p>
            <p>Lorsque l'arbitre siffle la mi-temps, le tableau d'affichage indique toujours 0-0. L'Europe découvre alors quelque chose qu'elle n'avait pas prévu.</p>
            <p><strong className="text-ink">Haïti n'est pas venue pour participer. Haïti est venue pour jouer.</strong></p>
          </Section>

          {/* ─── LE BUT ─────────────────────────────────────────────── */}
          <Section heading="Le but">
            <ImageInline
              src="/images/photos/sanon-zoff.jpg"
              label="Emmanuel Sanon · Dino Zoff · Munich, 15 juin 1974"
              caption="L'homme qui a marqué. Le gardien qu'il a battu. L'instant où Haïti est devenue la réponse à une question que l'Italie pensait sans réponse."
            />
            <p>Quelques instants après la reprise, Philippe Vorbe récupère le ballon. Il lève la tête, observe, puis glisse une passe dans l'espace. Emmanuel Sanon démarre, prend de vitesse la défense italienne. Dino Zoff sort de son but. Sanon continue sa course, contourne le gardien, et pousse calmement le ballon au fond des filets.</p>
            <p className="font-display text-xl md:text-2xl text-ink"><strong>Silence. Puis stupeur. Puis histoire.</strong></p>
            <p>La série de Dino Zoff prend fin. Après <CountUpNumber target={1142} duration={2200} className="font-display text-2xl text-haiti-red" /> minutes. <strong className="text-ink">Haïti mène l'Italie à la Coupe du Monde.</strong></p>
            <p>Pendant quelques minutes, le monde entier regarde le tableau d'affichage. Italie 0. Haïti 1. Le football vient de rappeler qu'aucun scénario n'est écrit d'avance.</p>

            <YouTubeEmbed
              videoId="Nx9gqAuyGRI"
              title="Le but · Emmanuel Sanon met fin à la série record de Dino Zoff, 1974"
              caption="Depuis la chaîne officielle YouTube de la FIFA. « Voyez Emmanuel Sanon distancer la défense italienne pour inscrire un but légendaire face au maestro italien Dino Zoff, lors de la Coupe du Monde 1974. »"
              aspect="9/16"
            />
          </Section>

          {/* ─── SOIXANTE-DIX MINUTES D'ÉTERNITÉ ───────────────────── */}
          <Section heading="Soixante-dix minutes d'éternité">
            <p>L'Italie réagit rapidement. Romeo Benetti égalise. Puis Pietro Anastasi donne l'avantage aux Italiens. Sergio Gori inscrit un troisième but. Score final : <strong className="text-ink">Italie 3, Haïti 1.</strong></p>
            <p>Mais le résultat ne raconte pas toute l'histoire. Car pendant quelques minutes, Haïti a défié l'ordre établi. Pendant quelques minutes, les favoris ont douté. Pendant quelques minutes, un pays entier a touché le sommet du football mondial.</p>
            <p>Le public allemand applaudit les Haïtiens à leur sortie du terrain. Le respect est gagné.</p>

            <YouTubeEmbed
              videoId="lgKdZHZ8xeA"
              title="Haïti à la Coupe du Monde 1974"
              caption="Depuis la chaîne officielle YouTube de la FIFA, publié le 14 juin 2016, 42ᵉ anniversaire. « En ce jour de 1974, Haïti a disputé sa première et unique apparition en Coupe du Monde, une performance immense, toujours célébrée par le football haïtien. »"
              aspect="16/9"
            />
          </Section>

          {/* ─── FACE À LA POLOGNE ─────────────────────────────────── */}
          <Section heading="19 juin · face à la Pologne">
            <p>Quatre jours plus tard, Haïti affronte l'une des meilleures équipes du tournoi : la Pologne de Grzegorz Lato, une équipe qui terminera <strong className="text-ink">troisième de la Coupe du Monde.</strong></p>
            <ImageInline
              src="/images/photos/pologne-1974.jpg"
              label="Haïti–Pologne · Olympiastadion, Munich · 19 juin 1974"
              caption="Face à la Pologne de Lato, Szarmach et Deyna, qui terminera troisième du Mondial. Sept buts encaissés, mais aucun match abandonné."
            />
            <p>Les Polonais imposent leur rythme dès le début de la rencontre. Le talent offensif est exceptionnel. Lato marque. Szarmach marque. Deyna marque. Le score enfle. La rencontre se termine sur un lourd revers : 7 à 0.</p>
            <p>Mais même dans la difficulté, les Haïtiens continuent de se battre. Henri Françillon réalise encore plusieurs arrêts remarquables. Personne n'abandonne. Personne ne baisse les bras.</p>
          </Section>

          {/* ─── LE DERNIER MATCH ──────────────────────────────────── */}
          <Section heading="23 juin · le dernier match">
            <p>Le 23 juin 1974, Haïti dispute son dernier match du tournoi. L'adversaire s'appelle Argentine, une autre puissance mondiale, une autre montagne à gravir.</p>
            <ImageInline
              src="/images/photos/argentine-1974.jpg"
              label="Haïti–Argentine · Olympiastadion, Munich · 23 juin 1974"
              caption="Le dernier match du tournoi. À la 63ᵉ minute, Vorbe lance Sanon en profondeur. L'attaquant haïtien réduit l'écart. Aucun autre Haïtien n'a marqué en Coupe du Monde depuis."
            />
            <p>Yazalde ouvre le score, puis ajoute un deuxième but. L'Argentine prend le contrôle de la rencontre. Mais à la 63ᵉ minute, l'histoire revient frapper à la porte.</p>
            <p>Philippe Vorbe aperçoit un appel. Encore une fois. Il lance Emmanuel Sanon. Encore une fois. L'attaquant contrôle. Frappe. <strong className="text-ink">But.</strong></p>
            <p>Le deuxième de sa Coupe du Monde. Le deuxième de l'histoire d'Haïti en Coupe du Monde. Le dernier également.</p>
            <p>Le score final est de 4 à 1. Le parcours s'arrête. Mais quelque chose demeure : un nom dans les archives. <strong className="text-ink">E. Sanon. Deux buts.</strong> Face à l'Italie. Face à l'Argentine. À côté de ceux de Cruyff, Müller, Beckenbauer, Lato et Rivelino.</p>
          </Section>

          {/* ─── APRÈS MUNICH ──────────────────────────────────────── */}
          <Section heading="Après Munich">
            <p>La Coupe du Monde change des vies. Henri Françillon rejoint le TSV 1860 Munich en Allemagne. Manno Sanon signe plus tard au Beerschot en Belgique, où il connaîtra plusieurs saisons réussies et remportera la Coupe de Belgique.</p>
            <p>Le football haïtien exporte désormais ses talents. Les performances de 1974 ont ouvert des portes : elles ont montré que les joueurs haïtiens pouvaient rivaliser au plus haut niveau, et offert une visibilité nouvelle au pays.</p>
          </Section>

          {/* ─── MANNO SANON ───────────────────────────────────────── */}
          <Section heading="Manno Sanon">
            <p>Pour beaucoup, il reste le visage de cette aventure. Orphelin très jeune, formé au Don Bosco, champion national, meilleur buteur de la qualification, auteur des deux premiers buts haïtiens en Coupe du Monde.</p>
            <p>Son parcours dépasse le football. Il devient un symbole : celui d'un jeune Haïtien capable de se mesurer aux plus grands. En 1994, <em>France Football</em> l'inclut parmi les cent plus grandes figures de l'histoire de la Coupe du Monde. Une reconnaissance exceptionnelle. <strong className="text-ink">Un Haïtien parmi les légendes du football mondial.</strong></p>
            <p>Lorsque Manno Sanon s'éteint en 2008, la nation entière lui rend hommage. Ses anciens coéquipiers portent son cercueil sur la pelouse du Stade Sylvio Cator. Comme un dernier salut. Comme une promesse.</p>
          </Section>

          {/* ─── LES SEPT ──────────────────────────────────────────── */}
          <Section heading="Les sept">
            <p>Sept joueurs disputent l'intégralité des trois rencontres d'Haïti lors de cette Coupe du Monde :</p>
            <p className="font-display text-lg text-ink leading-relaxed pl-4 border-l-2 border-haiti-red">
              Henri Françillon. Wilner Nazaire. Philippe Vorbe. Emmanuel Sanon. Jean-Claude Désir. Pierre Bayonne. Eddy Antoine.
            </p>
            <p>Sept hommes. Trois matchs. Trois géants du football mondial. Une page d'histoire.</p>
          </Section>

          {/* ─── LE FIL QUI RELIE 1974 À 2026 ──────────────────────── */}
          <Section heading="Le fil qui relie 1974 à 2026">
            <p>Le temps passe. Les générations changent. Les maillots évoluent. Mais certaines choses demeurent.</p>
            <p>En 1974, Philippe Vorbe et Pierre Bayonne représentent le Violette Athletic Club à la Coupe du Monde. En 2026, <Link to="/squad" className="text-haiti-blue hover:text-haiti-red underline decoration-haiti-blue/30 hover:decoration-haiti-red underline-offset-4 transition-colors font-semibold">Woodensky Pierre</Link> représente à son tour le Violette sur la scène mondiale.</p>
            <p><strong className="text-ink">Le même club. Le même écusson. Le même rêve.</strong></p>
            <p>Un fil invisible traverse les décennies. Il relie les pionniers aux héritiers.</p>
          </Section>

          {/* ─── CE QUE 1974 NOUS A LAISSÉ ─────────────────────────── */}
          <Section heading="Ce que 1974 nous a laissé">
            <p>Les hommes de 1974 n'ont pas remporté la Coupe du Monde. Ils n'ont pas soulevé le trophée. Mais ils ont accompli quelque chose d'aussi important.</p>
            <p>Ils ont donné au football haïtien sa place dans l'histoire. Ils ont offert au pays son unique titre de champion de la CONCACAF. Ils ont inscrit les deux premiers buts haïtiens en Coupe du Monde. Ils ont prouvé qu'Haïti pouvait regarder les plus grandes nations dans les yeux.</p>
            <p><strong className="text-ink">Ils ont construit les fondations.</strong></p>
            <p>Chaque génération qui a suivi a marché sur ce terrain qu'ils avaient préparé. Chaque enfant qui a rêvé de porter le maillot national a grandi dans leur héritage. Chaque Grenadier de 2026 leur doit quelque chose.</p>
            <p>Parce que le retour d'Haïti à la Coupe du Monde ne commence pas en 2026. Il commence à Port-au-Prince en 1973. Il passe par Munich en 1974. Il passe par le but de Sanon, par les arrêts de Françillon, par la vision de Vorbe, par le brassard de Nazaire, par les vingt-deux hommes qui ont osé croire que leur place était parmi les meilleurs.</p>
            <p>Aujourd'hui, lorsque les Grenadiers entrent sur la pelouse de la Coupe du Monde 2026, ils ne marchent pas seuls. Derrière eux avancent aussi les pionniers. Les hommes de 1974.</p>
            <p className="font-display text-xl md:text-2xl text-ink"><strong>Les hommes qui ont ouvert la route.</strong></p>
          </Section>

          {/* The Thirteen — tribute */}
          <section className="mb-12 -mx-5 md:mx-0 my-16">
            <div className="bg-gradient-to-br from-haiti-blue via-haiti-blue to-ink text-bg px-5 md:px-12 py-12 md:py-16 md:rounded-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-haiti-red text-bg text-xs font-bold uppercase tracking-wider rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-bg rounded-full"></span>
                Toujours parmi nous
              </div>
              <h2 className="font-display text-3xl md:text-5xl mb-6">
                Les Quatorze.
              </h2>
              <p className="text-bg/80 leading-relaxed text-lg max-w-3xl mb-4">
                Manno Sanon nous a quittés en 2008. Plusieurs de ses coéquipiers de cet été munichois également. Mais quatorze membres de la sélection haïtienne de 1974 sont toujours parmi nous en 2026.
              </p>
              <p className="text-bg/80 leading-relaxed text-lg max-w-3xl mb-10">
                Leurs noms, lus à voix haute lors d'un hommage qui leur a été rendu à Miami, en mai 2026 :
              </p>

              <motion.ol
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 max-w-4xl"
                variants={stagger(0.08, 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
              >
                {[
                  { name: "Wilner Nazaire", note: "Capitaine à Munich." },
                  { name: "Philippe Vorbe", note: "La passe sur le but." },
                  { name: "Wilfrid Louis" },
                  { name: "Pierre Bayonne", note: "Violette AC." },
                  { name: "Wilner Piquant" },
                  { name: "Henri Françillon", note: "Le Chat des Caraïbes." },
                  { name: "Mario Léandre" },
                  { name: "Jean-Claude Désir", note: "Tom Pouce." },
                  { name: "Fritz André Plantin" },
                  { name: "Ernst Racine" },
                  { name: "Herby Austin" },
                  { name: "Boby Joseph" },
                  { name: "Guy St. Vil" },
                  { name: "Frantz St. Lot" },
                ].map((player, i) => (
                  <motion.li
                    key={player.name}
                    variants={fadeUp}
                    className="flex items-baseline gap-3 border-l-2 border-haiti-red pl-3"
                  >
                    <span className="font-display text-haiti-red text-sm tabular-nums w-6 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <div className="font-display text-lg leading-tight">{player.name}</div>
                      {player.note && (
                        <div className="text-bg/60 text-xs italic mt-0.5">{player.note}</div>
                      )}
                    </div>
                  </motion.li>
                ))}
              </motion.ol>

              <p className="text-bg/70 italic leading-relaxed max-w-3xl mt-12 pt-8 border-t border-bg/10">
                Le Violette Athletic Club de Philippe Vorbe demeure le fil rouge : là où Vorbe et Pierre Bayonne ont joué, là où <Link to="/squad" className="text-haiti-red hover:text-bg underline decoration-haiti-red/30 hover:decoration-bg underline-offset-4 transition-colors">Woodensky Pierre</Link> joue aujourd'hui.
              </p>
            </div>
          </section>

          {/* Footer credit */}
          <div className="mt-16 pt-8 border-t border-line">
            <p className="text-sm text-muted leading-relaxed">
              <strong className="text-ink">Précision sourcée.</strong> La série d'imbattabilité de Dino Zoff est le plus souvent citée à 1 142 minutes, mettant fin au but de Sanon le 15 juin 1974. Certaines sources arrondissent à 1 143 ou citent 1 174 ; nous retenons 1 142, chiffre le plus communément donné par les archives contemporaines et de langue italienne.
            </p>
            <p className="text-sm text-muted leading-relaxed mt-4">
              Sources : FIFA, Wikipedia (Emmanuel Sanon, Philippe Vorbe, Pierre Bayonne, Henri Françillon, Wilner Nazaire, Antoine Tassy, Championnat CONCACAF 1973, Haïti à la Coupe du Monde 1974), CONCACAF, <em>France Football</em>, Hugh McIlvanney dans <em>The Observer</em> (février 1974), <em>Shoot!</em> (février 1974, entretien Wilner Nazaire), commentaire BBC de David Coleman (15 juin 1974), archives Bundesarchiv, Getty Images, Potomitan, World Wide Soccer Stories.
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              to="/squad"
              className="inline-flex items-center gap-2 px-6 py-3 bg-haiti-red text-bg font-semibold rounded-full hover:bg-haiti-red-dark transition-colors"
            >
              Découvrir le groupe 2026 →
            </Link>
            <Link
              to="/the-tribute"
              className="inline-flex items-center gap-2 px-6 py-3 bg-bg text-ink font-semibold rounded-full hover:bg-line transition-colors border border-line"
            >
              Hommage créatif
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

function HistoryHT() {
  return (
    <div>
      <PageHeader
        eyebrow="1974 · Almay Lwès"
        title="Mesye ki te louvri wout la."
        subtitle="Istwa venndezòm ayisyen ki te fè peyi a antre nan Koup di Mond, epi ki te prepare wout la jouk 2026."
      />

      {/* Byline strip — under the page header */}
      <section className="bg-ink/95 text-bg/80 border-b border-bg/10">
        <div className="max-w-4xl mx-auto px-5 py-3 text-xs uppercase tracking-[0.2em] font-semibold flex items-center gap-3">
          <span className="text-haiti-red">Pa Chokarella.</span>
          <span className="text-bg/30">·</span>
          <span className="text-bg/60">Lekti : 12 min</span>
        </div>
      </section>

      {/* Hero image — the squad */}
      <section className="bg-bg border-b border-line">
        <div className="max-w-content mx-auto px-5 py-8">
          <figure>
            <ImagePlaceholder src="/images/photos/squad-1974.jpg" aspect="16/9" objectPosition="center top" label="Seleksyon nasyonal Ayiti · Foto gwoup anvan Koup di Mond 1974" />
            <figcaption className="text-sm text-muted leading-relaxed mt-3 space-y-1.5">
              <span className="block font-display text-ink">Seleksyon ayisyen an, Koup di Mond 1974</span>
              <span className="block">
                <strong className="font-display text-ink">Kanpe</strong> (de goch a dwat) : Arsène Auguste (defansè, n°3), Wilner Nazaire (defansè, n°14, kapitèn), Ernst Jean-Joseph (defansè, n°12), Pierre Bayonne (defansè, n°6), Jean-Claude Désir (milye, n°8), Henri Françillon (gadyen, n°1, mayo jòn).
              </span>
              <span className="block">
                <strong className="font-display text-ink">Akwoupi</strong> (de goch a dwat) : Eddy Antoine (milye, n°9), Guy François (milye, n°10), Philippe Vorbe (milye, n°7), Emmanuel Sanon (atakan, n°20, katchè istorik Ayiti nan Koup di Mond), Roger Saint-Vil (atakan, n°15).
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      <article className="bg-white">
        <div className="max-w-4xl mx-auto px-5 py-12 md:py-14">
          {/* Lede */}
          <p className="font-display text-3xl md:text-4xl text-ink leading-[1.1] mb-10">
            15 jen 1974, Ayiti antre nan listwa.
          </p>

          {/* Opening framing */}
          <div className="prose prose-lg max-w-none text-ink leading-relaxed space-y-5 mb-10">
            <p>Jou sa a, nan Minik, plis pase 53 000 espektatè pran plas nan tribin Olympiastadion an pou asiste ak yon match Koup di Mond ant Itali ak yon ekip ki istwa li pa twò konnen pou anpil nan yo. Pou pifò obsèvatè ewopeyen yo, senaryo a sanble deja ekri.</p>
            <p>Itali se finalis Koup di Mond 1970 la. Gadyen li, Dino Zoff, pa pran okenn gòl anba mayo nasyonal la depi prèske de an. Yo tann Azzurri yo pami favori tounwa a. Ayiti, li menm, ap jwe premye Koup di Mond nan istwa li.</p>
            <p>Pèsonn pa imajine ankò ke kèk èdtan pita, non yon jèn atakan ayisyen ap fè tou latè. Pèsonn pa imajine ke yon ti nasyon karayib prèt pou ekri youn nan chapit ki pi memorab nan istwa espòtif li. Epoutan, se egzakteman sa ki pral pase.</p>
            <p>Istwa sa a se pa sèlman istwa yon gòl. Se istwa <strong className="text-ink">venndezòm ki te louvri yon wout</strong>, yon wout ki pral mennen, senkanndezan pita, jouk nan Koup di Mond 2026 la.</p>
          </div>

          {/* ─── ANVAN MINIK ─────────────────────────────────────────── */}
          <Section heading="Anvan Minik">
            <p>Byen anvan Almay, byen anvan kamera mond lan, byen anvan foutbòl ayisyen an te fè antre li nan achiv ofisyèl FIFA, te gen Stade Sylvio Cator.</p>
            <p>Nan ane 1960 yo ak nan kòmansman ane 1970 yo, foutbòl deja anrasinen byen fon nan kilti popilè ayisyen an. Gwo afich ant Racing Club Haïtien, Violette Athletic Club, Aigle Noir ak Victory Sportif Club rale gwo foul moun. Tout moun konnen pi bon jwè peyi a. Yo vin figi popilè, ewo.</p>
            <p>Seleksyon nasyonal la ap pwogrese tou. An 1971, nan Chanpyona CONCACAF la nan Trinidad-et-Tobago, Ayiti fini nan dezyèm plas dèyè Meksik sou diferans gòl. Lè sa a peyi a konprann li ka rivalize ak pi bon nasyon nan rejyon an.</p>
            <p>Kalifikasyon nan Koup di Mond pa yon itopi ankò. Li vin yon objektif.</p>
          </Section>

          {/* ─── TOUNWA KI TE CHANJE LISTWA A ────────────────────────── */}
          <Section heading="Tounwa ki te chanje listwa a">
            <p>Soti 29 novanm rive 18 desanm 1973, Pòtoprens akeyi Chanpyona CONCACAF la. Nan epòk sa a, konpetisyon an gen yon enpòtans patikilye : chanpyon an kalifye dirèkteman pou Koup di Mond. Pa gen baraj. Pa gen dezyèm chans. Yon sèl ekip ap ale nan Almay Lwès.</p>
            <p>Sis nasyon nan depa a : Ayiti, Meksik, Ondiras, Gwatemala, Trinidad-et-Tobago, Antiy neyèlandè. Pandan ven jou, peyi a kenbe souf li. Match apre match, Grenadye yo avanse. Viktwa yo anpile, piblik la plen tribin yo, espwa a grandi.</p>
            <p>Nan fen tounwa a, Ayiti afiche <strong className="text-ink">kat viktwa ak yon sèl defèt. Uit gòl make. Twa pran.</strong> Chanpyon CONCACAF, pou premye fwa nan istwa li, epi jiska jodi a, pou sèl fwa a.</p>
            <p>Nan kè kanpay sa a gen yon jèn atakan venndezan : Emmanuel Sanon. Senk gòl. Pi gwo katchè tounwa a. Yon zetwal fèt.</p>
            <ImageInline
              src="/images/photos/qualif-1973-port-au-prince.jpg"
              label="Stade Sylvio Cator · Pòtoprens · Chanpyona CONCACAF 1973"
              caption="Soti 29 novanm rive 18 desanm 1973, gazon Pòtoprens lan pote kalifikasyon an. Kat viktwa pou Ayiti nan senk match. Tikè pou Almay Lwès la."
            />
          </Section>

          {/* ─── ANTOINE TASSY ─────────────────────────────────────── */}
          <Section heading="Antoine Tassy">
            <ImageInline
              src="/images/photos/antoine-tassy.jpg"
              aspect="3/4"
              objectPosition="top"
              fit="contain"
              narrow
              label="Antoine Tassy · Seleksyonè · 1974"
              caption="Antoine Tassy mennen seleksyon an nan tit CONCACAF 1973 li a ak nan premye patisipasyon li nan Koup di Mond."
            />
            <p>Tout gwo ekip gen yon lidè. Pou Ayiti, nonm sa a rele Antoine Tassy. Respekte, egzijan epi pwofondman konvenki de potansyèl jwè li yo, li refize konsidere Koup di Mond la kòm yon senp rekonpans. Pou li, se yon misyon.</p>
            <p>Ekip li dwe pare : mantalman, fizikman, taktikman. Nan yon epòk kote resous yo limite, Tassy prepare jwè li yo ak anpil swen. Temwayaj epòk la rakonte li etidye advèsè yo ak yon rigè yo pa t konn wè souvan nan rejyon an.</p>
            <p>Li vle jwè li yo rive nan Almay ak yon sètitid : yo gen plas yo pami pi bon yo. Konviksyon sa a ap vin youn nan pi gwo fòs gwoup la.</p>
          </Section>

          {/* ─── VENNDEZÒM ───────────────────────────────────────────── */}
          <Section heading="Venndezòm">
            <ImageInline
              src="/images/photos/squad-1974-group.jpg"
              aspect="3/2"
              objectPosition="center"
              fit="contain"
              label="Seleksyon nasyonal Ayiti a · Minik, jen 1974"
              caption="Gwoup la nan Minik, pandan Koup di Mond la. Venndezòm, twa gwo klib nan Pòtoprens (Racing, Aigle Noir, Violette), plis Victory SC pou gadyen Françillon."
            />
            <p>Seleksyon ayisyen ki debake nan Almay la pa sanble ak okenn lòt. Pifò jwè li yo ap evolye toujou nan chanpyona nasyonal la. Anpil ladan yo grandi ansanm. Pifò konnen youn lòt depi plizyè ane.</p>
            <p>Yo reprezante sitou twa klib istorik : <strong className="text-ink">Racing Club Haïtien, Violette Athletic Club, Aigle Noir.</strong> Henri Françillon se sèl jwè ki soti nan Victory Sportif Club.</p>
            <p>Alatèt yo gen kapitèn Wilner Nazaire. Nan bi, Henri Françillon. Nan mitan teren, Philippe Vorbe. Nan atak, Emmanuel Sanon. Bò kote yo : Pierre Bayonne, Guy Saint-Vil, Jean-Claude Désir, Serge Racine, Arsène Auguste, Eddy Antoine ak anpil lòt.</p>
            <p>Yo pa gen mwayen gwo pwisans yo. Men yo gen yon bagay ki pa gen pri : yo kwè nan tèt yo.</p>
          </Section>

          {/* ─── ITALI — 15 JEN 1974 ─────────────────────────────────── */}
          <Section heading="15 jen 1974 · kont Itali">
            <p>Olympiastadion an plen. Itali se favori. Yo konsidere Dino Zoff prèske enbatab : seri envensiblite li rive nan 1 142 minit. Laprès italyen an ap mande ki atakan ki ka anfen mete fen nan sekans eksepsyonèl sa a.</p>
            <p>Pèsonn pa panse ak Emmanuel Sanon.</p>
            <ImageInline
              src="/images/photos/francillon-italie.jpg"
              label="Henri Françillon · Itali-Ayiti · Olympiastadion, Minik · 15 jen 1974"
              caption="« Chat Karayib la » kenbe Itali nan premye peryòd la. Nan mitan match la, tablo a make 0-0."
            />
            <p>Yo bay kout anvwa a. Epi pandan karannsenk minit, Ayiti reziste. Italyen yo atake, ankò e ankò, men Henri Françillon reponn prezan : sòti ayeryen, parad reflèks, entèvansyon desizif. Minit apre minit, gadyen ayisyen an pouse asèsman italyen yo.</p>
            <p>Lè abit la soufle mitan match la, tablo a toujou make 0-0. Ewòp dekouvri lè sa a yon bagay li pa t prevwa.</p>
            <p><strong className="text-ink">Ayiti pa vini pou patisipe. Ayiti vini pou jwe.</strong></p>
          </Section>

          {/* ─── GÒL LA ──────────────────────────────────────────────── */}
          <Section heading="Gòl la">
            <ImageInline
              src="/images/photos/sanon-zoff.jpg"
              label="Emmanuel Sanon · Dino Zoff · Minik, 15 jen 1974"
              caption="Nonm ki te make a. Gadyen li te bat la. Moman Ayiti te vin tounen repons yon kesyon Itali te kwè pa t gen repons."
            />
            <p>Kèk moman apre repriz la, Philippe Vorbe refè balon an. Li leve tèt li, obsève, epi li glise yon pas nan espas la. Emmanuel Sanon demare, pran devan defans italyen an. Dino Zoff soti nan bi li. Sanon kontinye kous li, kontoune gadyen an, epi li pouse balon an dousman nan fon filè a.</p>
            <p className="font-display text-xl md:text-2xl text-ink"><strong>Silans. Apre sa sezisman. Apre sa listwa.</strong></p>
            <p>Seri Dino Zoff la pran fen. Apre <CountUpNumber target={1142} duration={2200} className="font-display text-2xl text-haiti-red" /> minit. <strong className="text-ink">Ayiti ap mennen Itali nan Koup di Mond.</strong></p>
            <p>Pandan kèk minit, mond lan antye ap gade tablo a. Itali 0. Ayiti 1. Foutbòl fèk sot raple ke okenn senaryo pa ekri davans.</p>

            <YouTubeEmbed
              videoId="Nx9gqAuyGRI"
              title="Gòl la · Emmanuel Sanon mete fen nan seri rekò Dino Zoff la, 1974"
              caption="Soti nan chèn YouTube ofisyèl FIFA a. « Gade Emmanuel Sanon kite defans italyen an dèyè pou l make yon gòl lejandè kont mayestro italyen Dino Zoff, pandan Koup di Mond 1974 la. »"
              aspect="9/16"
            />
          </Section>

          {/* ─── SWASANNDIS MINIT ETÈNITE ────────────────────────────── */}
          <Section heading="Swasanndis minit etènite">
            <p>Itali reyaji vit. Romeo Benetti egalize. Apre sa Pietro Anastasi bay Italyen yo lavans. Sergio Gori make yon twazyèm gòl. Eskò final : <strong className="text-ink">Itali 3, Ayiti 1.</strong></p>
            <p>Men rezilta a pa rakonte tout istwa a. Paske pandan kèk minit, Ayiti te defye lòd etabli a. Pandan kèk minit, favori yo te doute. Pandan kèk minit, yon peyi antye te touche somè foutbòl mondyal la.</p>
            <p>Piblik almann nan aplodi Ayisyen yo lè yo sot sou teren an. Yo genyen respè a.</p>

            <YouTubeEmbed
              videoId="lgKdZHZ8xeA"
              title="Ayiti nan Koup di Mond 1974"
              caption="Soti nan chèn YouTube ofisyèl FIFA a, pibliye 14 jen 2016, 42yèm anivèsè a. « Jou sa a an 1974, Ayiti te jwe premye ak sèl aparisyon li nan Koup di Mond, yon gwo pèfòmans foutbòl ayisyen an toujou ap selebre. »"
              aspect="16/9"
            />
          </Section>

          {/* ─── KONT POLÒY ──────────────────────────────────────────── */}
          <Section heading="19 jen · kont Polòy">
            <p>Kat jou pita, Ayiti afronte youn nan pi bon ekip tounwa a : Polòy Grzegorz Lato a, yon ekip ki pral fini <strong className="text-ink">twazyèm nan Koup di Mond la.</strong></p>
            <ImageInline
              src="/images/photos/pologne-1974.jpg"
              label="Ayiti-Polòy · Olympiastadion, Minik · 19 jen 1974"
              caption="Kont Polòy Lato, Szarmach ak Deyna, ki t ap fini twazyèm nan Mondyal la. Sèt gòl pran, men okenn match yo pa t lage."
            />
            <p>Polonè yo enpoze ritm yo depi nan kòmansman match la. Talan ofansif la eksepsyonèl. Lato make. Szarmach make. Deyna make. Eskò a anfle. Match la fini sou yon gwo defèt : 7 a 0.</p>
            <p>Men menm nan difikilte, Ayisyen yo kontinye goumen. Henri Françillon reyalize toujou plizyè arè remakab. Pèsonn pa lage. Pèsonn pa bese bra.</p>
          </Section>

          {/* ─── DÈNYE MATCH LA ──────────────────────────────────────── */}
          <Section heading="23 jen · dènye match la">
            <p>Nan dat 23 jen 1974, Ayiti jwe dènye match tounwa a. Advèsè a rele Ajantin, yon lòt pwisans mondyal, yon lòt mòn pou monte.</p>
            <ImageInline
              src="/images/photos/argentine-1974.jpg"
              label="Ayiti-Ajantin · Olympiastadion, Minik · 23 jen 1974"
              caption="Dènye match tounwa a. Nan 63yèm minit la, Vorbe lanse Sanon nan pwofondè. Atakan ayisyen an redui eka a. Okenn lòt Ayisyen pa make nan Koup di Mond depi lè sa a."
            />
            <p>Yazalde ouvri eskò a, apre sa li ajoute yon dezyèm gòl. Ajantin pran kontwòl match la. Men nan 63yèm minit la, listwa retounen frape nan pòt la.</p>
            <p>Philippe Vorbe wè yon apèl. Yon lòt fwa ankò. Li lanse Emmanuel Sanon. Yon lòt fwa ankò. Atakan an kontwole. Frape. <strong className="text-ink">Gòl.</strong></p>
            <p>Dezyèm gòl Koup di Mond li a. Dezyèm nan istwa Ayiti nan Koup di Mond. Dènye a tou.</p>
            <p>Eskò final la se 4 a 1. Pakou a kanpe. Men yon bagay rete : yon non nan achiv yo. <strong className="text-ink">E. Sanon. De gòl.</strong> Kont Itali. Kont Ajantin. Bò kote sa yo Cruyff, Müller, Beckenbauer, Lato ak Rivelino.</p>
          </Section>

          {/* ─── APRE MINIK ──────────────────────────────────────────── */}
          <Section heading="Apre Minik">
            <p>Koup di Mond la chanje lavi. Henri Françillon rantre nan TSV 1860 Munich nan Almay. Manno Sanon siyen pita nan Beerschot an Bèljik, kote li ap konnen plizyè sezon reyisi epi li ap ranpòte Coupe de Belgique la.</p>
            <p>Foutbòl ayisyen an ap ekspòte talan li yo kounye a. Pèfòmans 1974 yo louvri pòt : yo montre jwè ayisyen yo ka rivalize nan pi wo nivo, epi yo ofri peyi a yon nouvo vizibilite.</p>
          </Section>

          {/* ─── MANNO SANON ─────────────────────────────────────────── */}
          <Section heading="Manno Sanon">
            <p>Pou anpil moun, li rete figi avanti sa a. Òfelen byen jèn, fòme nan Don Bosco, chanpyon nasyonal, pi gwo katchè kalifikasyon an, otè de premye gòl ayisyen yo nan Koup di Mond.</p>
            <p>Pakou li depase foutbòl. Li vin yon senbòl : sa yon jèn Ayisyen ki kapab mezire l ak pi gwo yo. An 1994, <em>France Football</em> mete l pami san pi gwo figi nan istwa Koup di Mond la. Yon rekonesans eksepsyonèl. <strong className="text-ink">Yon Ayisyen pami lejand foutbòl mondyal yo.</strong></p>
            <p>Lè Manno Sanon disparèt an 2008, nasyon antye a rann li omaj. Ansyen koekipye li yo pote sèkèy li sou gazon Stade Sylvio Cator a. Tankou yon dènye salitasyon. Tankou yon pwomès.</p>
          </Section>

          {/* ─── SÈT YO ──────────────────────────────────────────────── */}
          <Section heading="Sèt yo">
            <p>Sèt jwè jwe tout twa match Ayiti yo nèt pandan Koup di Mond sa a :</p>
            <p className="font-display text-lg text-ink leading-relaxed pl-4 border-l-2 border-haiti-red">
              Henri Françillon. Wilner Nazaire. Philippe Vorbe. Emmanuel Sanon. Jean-Claude Désir. Pierre Bayonne. Eddy Antoine.
            </p>
            <p>Sèt nonm. Twa match. Twa jeyan foutbòl mondyal la. Yon paj istwa.</p>
          </Section>

          {/* ─── FIL KI LYE 1974 AK 2026 LA ──────────────────────────── */}
          <Section heading="Fil ki lye 1974 ak 2026 la">
            <p>Tan an pase. Jenerasyon yo chanje. Mayo yo evolye. Men gen kèk bagay ki rete.</p>
            <p>An 1974, Philippe Vorbe ak Pierre Bayonne reprezante Violette Athletic Club nan Koup di Mond. An 2026, <Link to="/squad" className="text-haiti-blue hover:text-haiti-red underline decoration-haiti-blue/30 hover:decoration-haiti-red underline-offset-4 transition-colors font-semibold">Woodensky Pierre</Link> reprezante Violette a sou sèn mondyal la atou pa li.</p>
            <p><strong className="text-ink">Menm klib la. Menm ekison an. Menm rèv la.</strong></p>
            <p>Yon fil envizib travèse deseni yo. Li lye pyonye yo ak eritye yo.</p>
          </Section>

          {/* ─── SA 1974 KITE POU NOU ────────────────────────────────── */}
          <Section heading="Sa 1974 kite pou nou">
            <p>Mesye 1974 yo pa ranpòte Koup di Mond la. Yo pa leve trofe a. Men yo akonpli yon bagay ki menm jan enpòtan.</p>
            <p>Yo bay foutbòl ayisyen an plas li nan listwa. Yo ofri peyi a sèl tit chanpyon CONCACAF li. Yo make de premye gòl ayisyen yo nan Koup di Mond. Yo pwouve Ayiti ka gade pi gwo nasyon yo nan je.</p>
            <p><strong className="text-ink">Yo bati fondasyon yo.</strong></p>
            <p>Chak jenerasyon ki vin apre mache sou teren yo te prepare a. Chak timoun ki reve pou pote mayo nasyonal la grandi nan eritaj yo. Chak Grenadye 2026 dwe yo yon bagay.</p>
            <p>Paske retou Ayiti nan Koup di Mond pa kòmanse an 2026. Li kòmanse nan Pòtoprens an 1973. Li pase nan Minik an 1974. Li pase nan gòl Sanon an, nan arè Françillon yo, nan vizyon Vorbe a, nan braslè Nazaire a, nan venndezòm ki te oze kwè plas yo te pami pi bon yo.</p>
            <p>Jodi a, lè Grenadye yo antre sou gazon Koup di Mond 2026 la, yo pa mache pou kont yo. Dèyè yo gen pyonye yo k ap avanse tou. Mesye 1974 yo.</p>
            <p className="font-display text-xl md:text-2xl text-ink"><strong>Mesye ki te louvri wout la.</strong></p>
          </Section>

          {/* The Fourteen — tribute */}
          <section className="mb-12 -mx-5 md:mx-0 my-16">
            <div className="bg-gradient-to-br from-haiti-blue via-haiti-blue to-ink text-bg px-5 md:px-12 py-12 md:py-16 md:rounded-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-haiti-red text-bg text-xs font-bold uppercase tracking-wider rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-bg rounded-full"></span>
                Toujou pami nou
              </div>
              <h2 className="font-display text-3xl md:text-5xl mb-6">
                Katòz yo.
              </h2>
              <p className="text-bg/80 leading-relaxed text-lg max-w-3xl mb-4">
                Manno Sanon kite nou an 2008. Plizyè nan koekipye li yo nan ete Minik sa a tou. Men katòz manm seleksyon ayisyen 1974 la toujou pami nou an 2026.
              </p>
              <p className="text-bg/80 leading-relaxed text-lg max-w-3xl mb-10">
                Non yo, yo li yo awotvwa pandan yon omaj yo te rann yo nan Miami, an me 2026 :
              </p>

              <motion.ol
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 max-w-4xl"
                variants={stagger(0.08, 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
              >
                {[
                  { name: "Wilner Nazaire", note: "Kapitèn nan Minik." },
                  { name: "Philippe Vorbe", note: "Pas la sou gòl la." },
                  { name: "Wilfrid Louis" },
                  { name: "Pierre Bayonne", note: "Violette AC." },
                  { name: "Wilner Piquant" },
                  { name: "Henri Françillon", note: "Chat Karayib la." },
                  { name: "Mario Léandre" },
                  { name: "Jean-Claude Désir", note: "Tom Pouce." },
                  { name: "Fritz André Plantin" },
                  { name: "Ernst Racine" },
                  { name: "Herby Austin" },
                  { name: "Boby Joseph" },
                  { name: "Guy St. Vil" },
                  { name: "Frantz St. Lot" },
                ].map((player, i) => (
                  <motion.li
                    key={player.name}
                    variants={fadeUp}
                    className="flex items-baseline gap-3 border-l-2 border-haiti-red pl-3"
                  >
                    <span className="font-display text-haiti-red text-sm tabular-nums w-6 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <div className="font-display text-lg leading-tight">{player.name}</div>
                      {player.note && (
                        <div className="text-bg/60 text-xs italic mt-0.5">{player.note}</div>
                      )}
                    </div>
                  </motion.li>
                ))}
              </motion.ol>

              <p className="text-bg/70 italic leading-relaxed max-w-3xl mt-12 pt-8 border-t border-bg/10">
                Violette Athletic Club Philippe Vorbe a rete fil wouj la : kote Vorbe ak Pierre Bayonne te jwe, kote <Link to="/squad" className="text-haiti-red hover:text-bg underline decoration-haiti-red/30 hover:decoration-bg underline-offset-4 transition-colors">Woodensky Pierre</Link> ap jwe jodi a.
              </p>
            </div>
          </section>

          {/* Footer credit */}
          <div className="mt-16 pt-8 border-t border-line">
            <p className="text-sm text-muted leading-relaxed">
              <strong className="text-ink">Presizyon ak sous.</strong> Yo site seri envensiblite Dino Zoff la pi souvan a 1 142 minit, gòl Sanon an mete fen li 15 jen 1974. Gen sous ki awondi l a 1 143 oswa site 1 174 ; nou kenbe 1 142, chif achiv kontanporen ak achiv an italyen bay pi souvan an.
            </p>
            <p className="text-sm text-muted leading-relaxed mt-4">
              Sous : FIFA, Wikipedia (Emmanuel Sanon, Philippe Vorbe, Pierre Bayonne, Henri Françillon, Wilner Nazaire, Antoine Tassy, Chanpyona CONCACAF 1973, Ayiti nan Koup di Mond 1974), CONCACAF, <em>France Football</em>, Hugh McIlvanney nan <em>The Observer</em> (fevriye 1974), <em>Shoot!</em> (fevriye 1974, entèvyou Wilner Nazaire), kòmantè BBC David Coleman (15 jen 1974), achiv Bundesarchiv, Getty Images, Potomitan, World Wide Soccer Stories.
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              to="/squad"
              className="inline-flex items-center gap-2 px-6 py-3 bg-haiti-red text-bg font-semibold rounded-full hover:bg-haiti-red-dark transition-colors"
            >
              Dekouvri gwoup 2026 la →
            </Link>
            <Link
              to="/the-tribute"
              className="inline-flex items-center gap-2 px-6 py-3 bg-bg text-ink font-semibold rounded-full hover:bg-line transition-colors border border-line"
            >
              Omaj kreyatif
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

function HistoryEN() {
  return (
    <div>
      <PageHeader
        eyebrow="1974 · West Germany"
        title="The men who opened the road."
        subtitle="The story of the twenty-two Haitians who put the country in the World Cup, and paved the way to 2026."
      />

      {/* Byline strip — under the page header */}
      <section className="bg-ink/95 text-bg/80 border-b border-bg/10">
        <div className="max-w-4xl mx-auto px-5 py-3 text-xs uppercase tracking-[0.2em] font-semibold flex items-center gap-3">
          <span className="text-haiti-red">By Chokarella.</span>
          <span className="text-bg/30">·</span>
          <span className="text-bg/60">Reading time: 12 min</span>
        </div>
      </section>

      {/* Hero image — the squad */}
      <section className="bg-bg border-b border-line">
        <div className="max-w-content mx-auto px-5 py-8">
          <figure>
            <ImagePlaceholder src="/images/photos/squad-1974.jpg" aspect="16/9" objectPosition="center top" label="Haiti national team · team photo before the 1974 World Cup" />
            <figcaption className="text-sm text-muted leading-relaxed mt-3 space-y-1.5">
              <span className="block font-display text-ink">The Haitian national team, 1974 World Cup</span>
              <span className="block">
                <strong className="font-display text-ink">Standing</strong> (left to right): Arsène Auguste (defender, no. 3), Wilner Nazaire (defender, no. 14, captain), Ernst Jean-Joseph (defender, no. 12), Pierre Bayonne (defender, no. 6), Jean-Claude Désir (midfielder, no. 8), Henri Françillon (goalkeeper, no. 1, yellow jersey).
              </span>
              <span className="block">
                <strong className="font-display text-ink">Crouching</strong> (left to right): Eddy Antoine (midfielder, no. 9), Guy François (midfielder, no. 10), Philippe Vorbe (midfielder, no. 7), Emmanuel Sanon (forward, no. 20, Haiti's historic World Cup scorer), Roger Saint-Vil (forward, no. 15).
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      <article className="bg-white">
        <div className="max-w-4xl mx-auto px-5 py-12 md:py-14">
          {/* Lede — Carel's opening */}
          <p className="font-display text-3xl md:text-4xl text-ink leading-[1.1] mb-10">
            On June 15, 1974, Haiti enters history.
          </p>

          {/* Opening framing */}
          <div className="prose prose-lg max-w-none text-ink leading-relaxed space-y-5 mb-10">
            <p>That day, in Munich, more than 53,000 spectators take their seats in the stands of the Olympiastadion for a World Cup match between Italy and a team whose story few of them truly know. For most European observers, the script already seems written.</p>
            <p>Italy were finalists at the 1970 World Cup. Their goalkeeper, Dino Zoff, had not conceded a single goal in the national shirt for nearly two years. The Azzurri are expected among the favorites of the tournament. Haiti, for its part, is playing the first World Cup in its history.</p>
            <p>No one yet imagines that a few hours later, the name of a young Haitian forward will travel around the planet. No one imagines that a small Caribbean nation is about to write one of the most memorable chapters in its sporting history. And yet, that is exactly what is going to happen.</p>
            <p>This story is not only the story of a goal. It is the story of <strong className="text-ink">twenty-two men who opened a road</strong>, a road that will lead, fifty-two years later, all the way to the 2026 World Cup.</p>
          </div>

          {/* ─── BEFORE MUNICH ─────────────────────────────────────── */}
          <Section heading="Before Munich">
            <p>Long before Germany, long before the cameras of the whole world, long before Haitian football made its entry into FIFA's official records, there was the Stade Sylvio Cator.</p>
            <p>In the 1960s and the early 1970s, football is already deeply rooted in Haitian popular culture. The big matches between Racing Club Haïtien, Violette Athletic Club, Aigle Noir, and Victory Sportif Club draw considerable crowds. The country's best players are known to all. They become popular figures, heroes.</p>
            <p>The national team is progressing too. In 1971, at the CONCACAF Championship held in Trinidad and Tobago, Haiti finishes second behind Mexico on goal difference. The country understands then that it can compete with the best nations in the region.</p>
            <p>Qualifying for the World Cup is no longer a fantasy. It becomes a goal.</p>
          </Section>

          {/* ─── THE TOURNAMENT THAT CHANGED HISTORY ───────────────── */}
          <Section heading="The tournament that changed history">
            <p>From November 29 to December 18, 1973, Port-au-Prince hosts the CONCACAF Championship. At the time, the competition carries special weight: the champion qualifies directly for the World Cup. No playoff. No second chance. Only one team will go to West Germany.</p>
            <p>Six nations set out: Haiti, Mexico, Honduras, Guatemala, Trinidad and Tobago, the Netherlands Antilles. For twenty days, the country holds its breath. Match after match, the Grenadiers advance. The wins pile up, the crowds fill the stands, hope grows.</p>
            <p>By the end of the tournament, Haiti shows <strong className="text-ink">four wins and a single defeat. Eight goals scored. Three conceded.</strong> CONCACAF champions, for the first time in its history, and to this day, the only time.</p>
            <p>At the heart of this campaign is a young twenty-two-year-old forward: Emmanuel Sanon. Five goals. Top scorer of the tournament. A star is born.</p>
            <ImageInline
              src="/images/photos/qualif-1973-port-au-prince.jpg"
              label="Stade Sylvio Cator · Port-au-Prince · 1973 CONCACAF Championship"
              caption="From November 29 to December 18, 1973, the pitch in Port-au-Prince carried the qualification. Four Haiti wins in five matches. The ticket to West Germany."
            />
          </Section>

          {/* ─── ANTOINE TASSY ─────────────────────────────────────── */}
          <Section heading="Antoine Tassy">
            <ImageInline
              src="/images/photos/antoine-tassy.jpg"
              aspect="3/4"
              objectPosition="top"
              fit="contain"
              narrow
              label="Antoine Tassy · head coach · 1974"
              caption="Antoine Tassy led the team to its 1973 CONCACAF title and its first World Cup appearance."
            />
            <p>Every great team has a leader. For Haiti, that man is Antoine Tassy. Respected, demanding, and deeply convinced of his players' potential, he refuses to treat the World Cup as a mere reward. For him, it is a mission.</p>
            <p>His team must be ready: mentally, physically, tactically. In an era of limited resources, Tassy prepares his players meticulously. Accounts from the time say he studies opponents with a rigor rarely seen in the region.</p>
            <p>He wants his players to arrive in Germany with one certainty: they belong among the best. That conviction will become one of the group's greatest strengths.</p>
          </Section>

          {/* ─── TWENTY-TWO MEN ────────────────────────────────────── */}
          <Section heading="Twenty-two men">
            <ImageInline
              src="/images/photos/squad-1974-group.jpg"
              aspect="3/2"
              objectPosition="center"
              fit="contain"
              label="Haiti national team · Munich, June 1974"
              caption="The squad in Munich, at the World Cup. Twenty-two men, three main clubs in Port-au-Prince (Racing, Aigle Noir, Violette), plus Victory SC for goalkeeper Françillon."
            />
            <p>The Haitian team that lands in Germany is like no other. Most of its players still play in the domestic league. Many grew up together. Most have known each other for years.</p>
            <p>They mainly represent three historic clubs: <strong className="text-ink">Racing Club Haïtien, Violette Athletic Club, Aigle Noir.</strong> Henri Françillon is the only player from Victory Sportif Club.</p>
            <p>At their head is captain Wilner Nazaire. In goal, Henri Françillon. In midfield, Philippe Vorbe. Up front, Emmanuel Sanon. Around them: Pierre Bayonne, Guy Saint-Vil, Jean-Claude Désir, Serge Racine, Arsène Auguste, Eddy Antoine, and many others.</p>
            <p>They do not have the means of the great powers. But they have something priceless: they believe in themselves.</p>
          </Section>

          {/* ─── ITALY — JUNE 15, 1974 ─────────────────────────────── */}
          <Section heading="June 15, 1974 · against Italy">
            <p>The Olympiastadion is full. Italy are the favorites. Dino Zoff is considered almost unbeatable: his shutout streak has reached 1,142 minutes. The Italian press wonders which striker could finally bring this remarkable run to an end.</p>
            <p>No one thinks of Emmanuel Sanon.</p>
            <ImageInline
              src="/images/photos/francillon-italie.jpg"
              label="Henri Françillon · Italy–Haiti · Olympiastadion, Munich · June 15, 1974"
              caption='"The Cat of the Caribbean" holds Italy through the first half. At halftime, the scoreboard reads 0-0.'
            />
            <p>The match kicks off. And for forty-five minutes, Haiti holds. The Italians attack, again and again, but Henri Françillon answers the call: aerial claims, reflex saves, decisive interventions. Minute after minute, the Haitian keeper turns back the Italian assaults.</p>
            <p>When the referee blows for halftime, the scoreboard still reads 0-0. Europe is discovering something it had not anticipated.</p>
            <p><strong className="text-ink">Haiti did not come to take part. Haiti came to play.</strong></p>
          </Section>

          {/* ─── THE GOAL ───────────────────────────────────────────── */}
          <Section heading="The goal">
            <ImageInline
              src="/images/photos/sanon-zoff.jpg"
              label="Emmanuel Sanon · Dino Zoff · Munich, June 15, 1974"
              caption="The man who scored. The keeper he beat. The moment Haiti became the answer to a question Italy thought had none."
            />
            <p>Moments after the restart, Philippe Vorbe wins the ball. He lifts his head, looks up, then slides a pass into space. Emmanuel Sanon takes off, beats the Italian defense for pace. Dino Zoff comes off his line. Sanon keeps running, rounds the keeper, and calmly pushes the ball into the net.</p>
            <p className="font-display text-xl md:text-2xl text-ink"><strong>Silence. Then shock. Then history.</strong></p>
            <p>Dino Zoff's streak comes to an end. After <CountUpNumber target={1142} duration={2200} className="font-display text-2xl text-haiti-red" /> minutes. <strong className="text-ink">Haiti leads Italy at the World Cup.</strong></p>
            <p>For a few minutes, the whole world watches the scoreboard. Italy 0. Haiti 1. Football has just reminded everyone that no script is written in advance.</p>

            <YouTubeEmbed
              videoId="Nx9gqAuyGRI"
              title="The goal · Emmanuel Sanon ends Dino Zoff's record streak, 1974"
              caption={"From FIFA's official YouTube channel. \"Watch Emmanuel Sanon beat the Italian defense to score a legendary goal against Italian maestro Dino Zoff at the 1974 World Cup.\""}
              aspect="9/16"
            />
          </Section>

          {/* ─── SEVENTY MINUTES OF ETERNITY ───────────────────────── */}
          <Section heading="Seventy minutes of eternity">
            <p>Italy react quickly. Romeo Benetti equalizes. Then Pietro Anastasi gives the Italians the lead. Sergio Gori adds a third goal. Final score: <strong className="text-ink">Italy 3, Haiti 1.</strong></p>
            <p>But the result does not tell the whole story. Because for a few minutes, Haiti defied the established order. For a few minutes, the favorites doubted. For a few minutes, an entire country touched the summit of world football.</p>
            <p>The German crowd applauds the Haitians as they leave the field. Respect is earned.</p>

            <YouTubeEmbed
              videoId="lgKdZHZ8xeA"
              title="Haiti at the 1974 World Cup"
              caption={"From FIFA's official YouTube channel, published on June 14, 2016, the 42nd anniversary. \"On this day in 1974, Haiti played its first and only World Cup appearance, a huge performance, still celebrated by Haitian football.\""}
              aspect="16/9"
            />
          </Section>

          {/* ─── AGAINST POLAND ────────────────────────────────────── */}
          <Section heading="June 19 · against Poland">
            <p>Four days later, Haiti face one of the best teams of the tournament: Grzegorz Lato's Poland, a side that will finish <strong className="text-ink">third at the World Cup.</strong></p>
            <ImageInline
              src="/images/photos/pologne-1974.jpg"
              label="Haiti–Poland · Olympiastadion, Munich · June 19, 1974"
              caption="Against the Poland of Lato, Szarmach, and Deyna, who would finish third at the World Cup. Seven goals conceded, but never a match given up."
            />
            <p>The Poles impose their rhythm from the start of the match. Their attacking talent is exceptional. Lato scores. Szarmach scores. Deyna scores. The score swells. The match ends in a heavy defeat: 7-0.</p>
            <p>But even in adversity, the Haitians keep fighting. Henri Françillon still pulls off several remarkable saves. No one gives up. No one lets their arms drop.</p>
          </Section>

          {/* ─── THE LAST MATCH ────────────────────────────────────── */}
          <Section heading="June 23 · the last match">
            <p>On June 23, 1974, Haiti play their last match of the tournament. The opponent is called Argentina, another world power, another mountain to climb.</p>
            <ImageInline
              src="/images/photos/argentine-1974.jpg"
              label="Haiti–Argentina · Olympiastadion, Munich · June 23, 1974"
              caption="The last match of the tournament. In the 63rd minute, Vorbe sends Sanon through. The Haitian forward pulls one back. No other Haitian has scored at a World Cup since."
            />
            <p>Yazalde opens the scoring, then adds a second goal. Argentina take control of the match. But in the 63rd minute, history comes knocking again.</p>
            <p>Philippe Vorbe spots a run. Once more. He sends Emmanuel Sanon through. Once more. The forward controls. Strikes. <strong className="text-ink">Goal.</strong></p>
            <p>His second of the World Cup. The second in Haiti's World Cup history. And the last.</p>
            <p>The final score is 4-1. The run ends. But something remains: a name in the records. <strong className="text-ink">E. Sanon. Two goals.</strong> Against Italy. Against Argentina. Alongside those of Cruyff, Müller, Beckenbauer, Lato, and Rivelino.</p>
          </Section>

          {/* ─── AFTER MUNICH ──────────────────────────────────────── */}
          <Section heading="After Munich">
            <p>The World Cup changes lives. Henri Françillon joins TSV 1860 Munich in Germany. Manno Sanon later signs with Beerschot in Belgium, where he will enjoy several successful seasons and win the Belgian Cup.</p>
            <p>Haitian football now exports its talent. The performances of 1974 opened doors: they showed that Haitian players could compete at the highest level, and gave the country new visibility.</p>
          </Section>

          {/* ─── MANNO SANON ───────────────────────────────────────── */}
          <Section heading="Manno Sanon">
            <p>For many, he remains the face of this adventure. Orphaned very young, trained at Don Bosco, national champion, top scorer of qualifying, author of Haiti's first two World Cup goals.</p>
            <p>His story goes beyond football. He becomes a symbol: that of a young Haitian able to measure up to the very greatest. In 1994, <em>France Football</em> includes him among the hundred greatest figures in the history of the World Cup. An exceptional recognition. <strong className="text-ink">A Haitian among the legends of world football.</strong></p>
            <p>When Manno Sanon passes away in 2008, the entire nation pays tribute. His former teammates carry his coffin across the pitch of the Stade Sylvio Cator. Like a final salute. Like a promise.</p>
          </Section>

          {/* ─── THE SEVEN ─────────────────────────────────────────── */}
          <Section heading="The seven">
            <p>Seven players play every minute of Haiti's three matches at this World Cup:</p>
            <p className="font-display text-lg text-ink leading-relaxed pl-4 border-l-2 border-haiti-red">
              Henri Françillon. Wilner Nazaire. Philippe Vorbe. Emmanuel Sanon. Jean-Claude Désir. Pierre Bayonne. Eddy Antoine.
            </p>
            <p>Seven men. Three matches. Three giants of world football. A page of history.</p>
          </Section>

          {/* ─── THE THREAD FROM 1974 TO 2026 ──────────────────────── */}
          <Section heading="The thread that links 1974 to 2026">
            <p>Time passes. Generations change. The shirts evolve. But some things remain.</p>
            <p>In 1974, Philippe Vorbe and Pierre Bayonne represented Violette Athletic Club at the World Cup. In 2026, <Link to="/squad" className="text-haiti-blue hover:text-haiti-red underline decoration-haiti-blue/30 hover:decoration-haiti-red underline-offset-4 transition-colors font-semibold">Woodensky Pierre</Link> in turn carries Violette onto the world stage.</p>
            <p><strong className="text-ink">The same club. The same crest. The same dream.</strong></p>
            <p>An invisible thread runs across the decades. It links the pioneers to the heirs.</p>
          </Section>

          {/* ─── WHAT 1974 LEFT US ─────────────────────────────────── */}
          <Section heading="What 1974 left us">
            <p>The men of 1974 did not win the World Cup. They did not lift the trophy. But they accomplished something just as important.</p>
            <p>They gave Haitian football its place in history. They gave the country its only CONCACAF title. They scored Haiti's first two World Cup goals. They proved that Haiti could look the greatest nations in the eye.</p>
            <p><strong className="text-ink">They built the foundations.</strong></p>
            <p>Every generation that followed walked on the ground they had prepared. Every child who dreamed of wearing the national shirt grew up in their legacy. Every Grenadier of 2026 owes them something.</p>
            <p>Because Haiti's return to the World Cup does not begin in 2026. It begins in Port-au-Prince in 1973. It runs through Munich in 1974. It runs through Sanon's goal, through Françillon's saves, through Vorbe's vision, through Nazaire's armband, through the twenty-two men who dared to believe their place was among the best.</p>
            <p>Today, when the Grenadiers step onto the pitch of the 2026 World Cup, they do not walk alone. Behind them advance the pioneers too. The men of 1974.</p>
            <p className="font-display text-xl md:text-2xl text-ink"><strong>The men who opened the road.</strong></p>
          </Section>

          {/* The Fourteen — tribute */}
          <section className="mb-12 -mx-5 md:mx-0 my-16">
            <div className="bg-gradient-to-br from-haiti-blue via-haiti-blue to-ink text-bg px-5 md:px-12 py-12 md:py-16 md:rounded-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-haiti-red text-bg text-xs font-bold uppercase tracking-wider rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-bg rounded-full"></span>
                Still with us
              </div>
              <h2 className="font-display text-3xl md:text-5xl mb-6">
                The Fourteen.
              </h2>
              <p className="text-bg/80 leading-relaxed text-lg max-w-3xl mb-4">
                Manno Sanon left us in 2008. Several of his teammates from that Munich summer as well. But fourteen members of Haiti's 1974 team are still with us in 2026.
              </p>
              <p className="text-bg/80 leading-relaxed text-lg max-w-3xl mb-10">
                Their names, read aloud at a tribute held for them in Miami, in May 2026:
              </p>

              <motion.ol
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 max-w-4xl"
                variants={stagger(0.08, 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
              >
                {[
                  { name: "Wilner Nazaire", note: "Captain in Munich." },
                  { name: "Philippe Vorbe", note: "The pass on the goal." },
                  { name: "Wilfrid Louis" },
                  { name: "Pierre Bayonne", note: "Violette AC." },
                  { name: "Wilner Piquant" },
                  { name: "Henri Françillon", note: "The Cat of the Caribbean." },
                  { name: "Mario Léandre" },
                  { name: "Jean-Claude Désir", note: "Tom Pouce." },
                  { name: "Fritz André Plantin" },
                  { name: "Ernst Racine" },
                  { name: "Herby Austin" },
                  { name: "Boby Joseph" },
                  { name: "Guy St. Vil" },
                  { name: "Frantz St. Lot" },
                ].map((player, i) => (
                  <motion.li
                    key={player.name}
                    variants={fadeUp}
                    className="flex items-baseline gap-3 border-l-2 border-haiti-red pl-3"
                  >
                    <span className="font-display text-haiti-red text-sm tabular-nums w-6 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <div className="font-display text-lg leading-tight">{player.name}</div>
                      {player.note && (
                        <div className="text-bg/60 text-xs italic mt-0.5">{player.note}</div>
                      )}
                    </div>
                  </motion.li>
                ))}
              </motion.ol>

              <p className="text-bg/70 italic leading-relaxed max-w-3xl mt-12 pt-8 border-t border-bg/10">
                Philippe Vorbe's Violette Athletic Club remains the through line: where Vorbe and Pierre Bayonne played, <Link to="/squad" className="text-haiti-red hover:text-bg underline decoration-haiti-red/30 hover:decoration-bg underline-offset-4 transition-colors">Woodensky Pierre</Link> plays today.
              </p>
            </div>
          </section>

          {/* Footer credit */}
          <div className="mt-16 pt-8 border-t border-line">
            <p className="text-sm text-muted leading-relaxed">
              <strong className="text-ink">Sourced precision.</strong> Dino Zoff's unbeaten streak is most often cited at 1,142 minutes, ended by Sanon's goal on June 15, 1974. Some sources round to 1,143 or cite 1,174; we use 1,142, the figure most commonly given by contemporary and Italian-language records.
            </p>
            <p className="text-sm text-muted leading-relaxed mt-4">
              Sources: FIFA, Wikipedia (Emmanuel Sanon, Philippe Vorbe, Pierre Bayonne, Henri Françillon, Wilner Nazaire, Antoine Tassy, 1973 CONCACAF Championship, Haiti at the 1974 World Cup), CONCACAF, <em>France Football</em>, Hugh McIlvanney in <em>The Observer</em> (February 1974), <em>Shoot!</em> (February 1974, Wilner Nazaire interview), David Coleman's BBC commentary (June 15, 1974), Bundesarchiv records, Getty Images, Potomitan, World Wide Soccer Stories.
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              to="/squad"
              className="inline-flex items-center gap-2 px-6 py-3 bg-haiti-red text-bg font-semibold rounded-full hover:bg-haiti-red-dark transition-colors"
            >
              Meet the 2026 squad →
            </Link>
            <Link
              to="/the-tribute"
              className="inline-flex items-center gap-2 px-6 py-3 bg-bg text-ink font-semibold rounded-full hover:bg-line transition-colors border border-line"
            >
              Creative tribute
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────

function Section({ heading, children }) {
  return (
    <section className="mb-8">
      <h2 className="font-display text-2xl md:text-3xl text-ink mb-4 mt-10 pb-2 border-b border-line">
        {heading}
      </h2>
      <div className="prose prose-lg max-w-none text-ink leading-relaxed space-y-4">
        {children}
      </div>
    </section>
  );
}

function ImageInline({ src, label, caption, aspect = "16/9", objectPosition = "center", fit = "cover", narrow = false }) {
  const wrapperClass = narrow
    ? "my-8 max-w-md mx-auto"
    : "my-8 -mx-5 md:mx-0";
  return (
    <figure className={wrapperClass}>
      <ImagePlaceholder
        src={src}
        aspect={aspect}
        label={label}
        rounded={false}
        className="md:rounded-lg"
        objectPosition={objectPosition}
        fit={fit}
      />
      {caption && (
        <figcaption className={`text-sm text-muted italic mt-3 leading-relaxed ${narrow ? "" : "px-5 md:px-0"}`}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
