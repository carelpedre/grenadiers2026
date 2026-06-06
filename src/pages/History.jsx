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
  const { t } = useT();
  return (
    <div>
      <PageHeader
        eyebrow="1974 · Allemagne de l'Ouest"
        title="Les hommes qui ont ouvert la route."
        subtitle="L'histoire des vingt-deux Haïtiens qui ont fait entrer le pays dans la Coupe du Monde — et préparé le chemin jusqu'en 2026."
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
          <ImagePlaceholder src="/images/photos/squad-1974.jpg" aspect="16/9" objectPosition="center top" label="Sélection nationale d'Haïti · Photo de groupe avant la Coupe du Monde 1974" />
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
            <p>Cette histoire n'est pas seulement celle d'un but. Elle est celle de <strong className="text-ink">vingt-deux hommes qui ont ouvert une route</strong> — une route qui mènera, cinquante-deux ans plus tard, jusqu'à la Coupe du Monde 2026.</p>
          </div>

          {/* ─── AVANT MUNICH ──────────────────────────────────────── */}
          <Section heading="Avant Munich">
            <p>Bien avant l'Allemagne, bien avant les caméras du monde entier, bien avant que le football haïtien ne fasse son entrée dans les archives officielles de la FIFA, il y avait le Stade Sylvio Cator.</p>
            <p>Dans les années 1960 et au début des années 1970, le football est déjà profondément ancré dans la culture populaire haïtienne. Les grandes affiches entre le Racing Club Haïtien, le Violette Athletic Club, l'Aigle Noir et le Victory Sportif Club attirent des foules considérables. Les meilleurs joueurs du pays sont connus de tous. Ils deviennent des figures populaires — des héros.</p>
            <p>La sélection nationale progresse également. En 1971, lors du Championnat de la CONCACAF disputé à Trinité-et-Tobago, Haïti termine à la deuxième place derrière le Mexique à la différence de buts. Le pays comprend alors qu'il peut rivaliser avec les meilleures nations de la région.</p>
            <p>La qualification à la Coupe du Monde n'est plus une utopie. Elle devient un objectif.</p>
          </Section>

          {/* ─── LE TOURNOI QUI A CHANGÉ L'HISTOIRE ────────────────── */}
          <Section heading="Le tournoi qui a changé l'histoire">
            <p>Du 29 novembre au 18 décembre 1973, Port-au-Prince accueille le Championnat de la CONCACAF. À l'époque, la compétition a une importance particulière : le champion est directement qualifié pour la Coupe du Monde. Pas de barrage. Pas de seconde chance. Une seule équipe ira en Allemagne de l'Ouest.</p>
            <p>Six nations prennent le départ — Haïti, Mexique, Honduras, Guatemala, Trinité-et-Tobago, Antilles néerlandaises. Pendant vingt jours, le pays retient son souffle. Match après match, les Grenadiers avancent. Les victoires s'accumulent, le public remplit les tribunes, l'espoir grandit.</p>
            <p>Au terme du tournoi, Haïti affiche <strong className="text-ink">quatre victoires et une seule défaite. Huit buts marqués. Trois encaissés.</strong> Championne de la CONCACAF — pour la première fois de son histoire, et encore aujourd'hui, pour la seule fois.</p>
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
            <p>Son équipe doit être prête — mentalement, physiquement, tactiquement. À une époque où les ressources sont limitées, Tassy prépare minutieusement ses joueurs. Les témoignages de l'époque racontent qu'il étudie les adversaires avec une rigueur rarement vue dans la région.</p>
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
              caption="Le groupe à Munich, lors de la Coupe du Monde. Vingt-deux hommes, trois clubs principaux à Port-au-Prince — Racing, Aigle Noir, Violette — plus Victory SC pour le gardien Françillon."
            />
            <p>La sélection haïtienne qui débarque en Allemagne ne ressemble à aucune autre. La majorité de ses joueurs évoluent encore dans le championnat national. Beaucoup ont grandi ensemble. La plupart se connaissent depuis des années.</p>
            <p>Ils représentent principalement trois clubs historiques : <strong className="text-ink">le Racing Club Haïtien, le Violette Athletic Club, l'Aigle Noir.</strong> Henri Françillon est le seul joueur issu du Victory Sportif Club.</p>
            <p>À leur tête se trouve le capitaine Wilner Nazaire. Dans les buts, Henri Françillon. Au milieu du terrain, Philippe Vorbe. En attaque, Emmanuel Sanon. Autour d'eux : Pierre Bayonne, Guy Saint-Vil, Jean-Claude Désir, Serge Racine, Arsène Auguste, Eddy Antoine et bien d'autres.</p>
            <p>Ils n'ont pas les moyens des grandes puissances. Mais ils possèdent quelque chose d'inestimable — ils croient en eux.</p>
          </Section>

          {/* ─── ITALIE — 15 JUIN 1974 ─────────────────────────────── */}
          <Section heading="15 juin 1974 — face à l'Italie">
            <p>L'Olympiastadion est plein. L'Italie est favorite. Dino Zoff est considéré comme presque imbattable — sa série d'invincibilité atteint 1 142 minutes. La presse italienne se demande quel attaquant pourra enfin mettre un terme à cette séquence exceptionnelle.</p>
            <p>Personne ne pense à Emmanuel Sanon.</p>
            <ImageInline
              src="/images/photos/francillon-italie.jpg"
              label="Henri Françillon · Italie–Haïti · Olympiastadion, Munich · 15 juin 1974"
              caption="« Le Chat des Caraïbes » tient l'Italie en première période. À la mi-temps, le tableau d'affichage indique 0-0."
            />
            <p>Le coup d'envoi est donné. Et pendant quarante-cinq minutes, Haïti résiste. Les Italiens attaquent, encore et encore, mais Henri Françillon répond présent — sorties aériennes, parades réflexes, interventions décisives. Minute après minute, le gardien haïtien repousse les assauts italiens.</p>
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
              title="Le but — Emmanuel Sanon met fin à la série record de Dino Zoff, 1974"
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
              caption="Depuis la chaîne officielle YouTube de la FIFA, publié le 14 juin 2016 — 42ᵉ anniversaire. « En ce jour de 1974, Haïti a disputé sa première et unique apparition en Coupe du Monde — une performance immense, toujours célébrée par le football haïtien. »"
              aspect="16/9"
            />
          </Section>

          {/* ─── FACE À LA POLOGNE ─────────────────────────────────── */}
          <Section heading="19 juin — face à la Pologne">
            <p>Quatre jours plus tard, Haïti affronte l'une des meilleures équipes du tournoi : la Pologne de Grzegorz Lato — une équipe qui terminera <strong className="text-ink">troisième de la Coupe du Monde.</strong></p>
            <ImageInline
              src="/images/photos/pologne-1974.jpg"
              label="Haïti–Pologne · Olympiastadion, Munich · 19 juin 1974"
              caption="Face à la Pologne de Lato, Szarmach et Deyna — qui terminera troisième du Mondial. Sept buts encaissés, mais aucun match abandonné."
            />
            <p>Les Polonais imposent leur rythme dès le début de la rencontre. Le talent offensif est exceptionnel. Lato marque. Szarmach marque. Deyna marque. Le score enfle. La rencontre se termine sur un lourd revers : 7 à 0.</p>
            <p>Mais même dans la difficulté, les Haïtiens continuent de se battre. Henri Françillon réalise encore plusieurs arrêts remarquables. Personne n'abandonne. Personne ne baisse les bras.</p>
          </Section>

          {/* ─── LE DERNIER MATCH ──────────────────────────────────── */}
          <Section heading="23 juin — le dernier match">
            <p>Le 23 juin 1974, Haïti dispute son dernier match du tournoi. L'adversaire s'appelle Argentine — une autre puissance mondiale, une autre montagne à gravir.</p>
            <ImageInline
              src="/images/photos/argentine-1974.jpg"
              label="Haïti–Argentine · Olympiastadion, Munich · 23 juin 1974"
              caption="Le dernier match du tournoi. À la 63ᵉ minute, Vorbe lance Sanon en profondeur. L'attaquant haïtien réduit l'écart. Aucun autre Haïtien n'a marqué en Coupe du Monde depuis."
            />
            <p>Yazalde ouvre le score, puis ajoute un deuxième but. L'Argentine prend le contrôle de la rencontre. Mais à la 63ᵉ minute, l'histoire revient frapper à la porte.</p>
            <p>Philippe Vorbe aperçoit un appel. Encore une fois. Il lance Emmanuel Sanon. Encore une fois. L'attaquant contrôle. Frappe. <strong className="text-ink">But.</strong></p>
            <p>Le deuxième de sa Coupe du Monde. Le deuxième de l'histoire d'Haïti en Coupe du Monde. Le dernier également.</p>
            <p>Le score final est de 4 à 1. Le parcours s'arrête. Mais quelque chose demeure — un nom dans les archives. <strong className="text-ink">E. Sanon. Deux buts.</strong> Face à l'Italie. Face à l'Argentine. À côté de ceux de Cruyff, Müller, Beckenbauer, Lato et Rivelino.</p>
          </Section>

          {/* ─── APRÈS MUNICH ──────────────────────────────────────── */}
          <Section heading="Après Munich">
            <p>La Coupe du Monde change des vies. Henri Françillon rejoint le TSV 1860 Munich en Allemagne. Manno Sanon signe plus tard au Beerschot en Belgique, où il connaîtra plusieurs saisons réussies et remportera la Coupe de Belgique.</p>
            <p>Le football haïtien exporte désormais ses talents. Les performances de 1974 ont ouvert des portes — elles ont montré que les joueurs haïtiens pouvaient rivaliser au plus haut niveau, et offert une visibilité nouvelle au pays.</p>
          </Section>

          {/* ─── MANNO SANON ───────────────────────────────────────── */}
          <Section heading="Manno Sanon">
            <p>Pour beaucoup, il reste le visage de cette aventure. Orphelin très jeune, formé au Don Bosco, champion national, meilleur buteur de la qualification, auteur des deux premiers buts haïtiens en Coupe du Monde.</p>
            <p>Son parcours dépasse le football. Il devient un symbole — celui d'un jeune Haïtien capable de se mesurer aux plus grands. En 1994, <em>France Football</em> l'inclut parmi les cent plus grandes figures de l'histoire de la Coupe du Monde. Une reconnaissance exceptionnelle. <strong className="text-ink">Un Haïtien parmi les légendes du football mondial.</strong></p>
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
            <p>Parce que le retour d'Haïti à la Coupe du Monde ne commence pas en 2026. Il commence à Port-au-Prince en 1973. Il passe par Munich en 1974. Il passe par le but de Sanon, par les arrêts de Françillon, par la vision de Vorbe, par le brassard de Nazaire — par les vingt-deux hommes qui ont osé croire que leur place était parmi les meilleurs.</p>
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
