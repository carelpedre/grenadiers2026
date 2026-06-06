import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";

export default function About() {
  return (
    <div>
      <PageHeader
        eyebrow="À propos"
        title="Site non-officiel des Grenadiers à la Coupe du Monde de la FIFA 2026, créé par Carel Pedre en collaboration avec la Fédération Haïtienne de Football."
        subtitle="grenadiers2026.com accompagne la sélection nationale haïtienne tout au long de sa préparation et de sa participation au Mondial, en collaboration avec la Fédération Haïtienne de Football."
      />

      <article className="bg-white">
        <div className="max-w-prose mx-auto px-5 py-12 space-y-6 text-ink text-lg leading-relaxed">
          <p>
            Pendant cinquante-deux ans, les supporters haïtiens ont attendu. De 1974 en Allemagne de l'Ouest — Sanon, Francillon, Vorbe — au 18 novembre 2025, jour où Les Grenadiers ont battu le Nicaragua 2-0 à Curaçao pour s'adjuger leur place à la Coupe du Monde de la FIFA 2026, le pays a vécu une longue absence. Toute une génération est née et a grandi sans voir Haïti sur la plus grande scène sportive du monde.
          </p>

          <p>
            L'attente s'achève en juin. Et ce site existe pour accompagner le moment.
          </p>

          <h2 className="font-display text-2xl md:text-3xl mt-12 mb-2">La raison d'être du site</h2>

          <p>
            grenadiers2026.com est édité par Chokarella Media LLC en collaboration avec la Fédération Haïtienne de Football. La plateforme constitue le point de référence numérique de la sélection nationale haïtienne durant la campagne du Mondial 2026 : actualités, programme des matchs, présentation du groupe, contenus éditoriaux et couverture quotidienne pendant le tournoi.
          </p>

          <p>
            Le site s'adresse en premier lieu aux supporters haïtiens, en Haïti comme dans la diaspora. La page consacrée au groupe présente chacun des vingt-six joueurs retenus par Sébastien Migné. Les pages des matchs détaillent les rencontres face à l'Écosse, au Brésil et au Maroc. La rubrique 1974 raconte la première et unique participation des Grenadiers à une Coupe du Monde, et la rubrique consacrée à la Fédération met en lumière l'institution qui porte le football haïtien depuis 1904.
          </p>

          <h2 className="font-display text-2xl md:text-3xl mt-12 mb-2">Une langue, une nation</h2>

          <p>
            Le site est publié en français, langue officielle de la Fédération Haïtienne de Football et de la République d'Haïti. Une déclinaison en créole haïtien est à l'étude pour les contenus éditoriaux principaux.
          </p>

          <h2 className="font-display text-2xl md:text-3xl mt-12 mb-2">Ce que propose le site</h2>

          <ul className="space-y-3 list-disc list-inside">
            <li><Link to="/squad" className="text-haiti-blue hover:text-haiti-red underline">Le groupe des 26</Link> — chaque joueur, son club, son parcours</li>
            <li><Link to="/matches" className="text-haiti-blue hover:text-haiti-red underline">Le calendrier</Link> — Écosse, Brésil, Maroc. Groupe C. Trois rendez-vous en juin.</li>
            <li><Link to="/journal" className="text-haiti-blue hover:text-haiti-red underline">Le Journal</Link> — les coulisses de la sélection, jour après jour</li>
            <li><Link to="/history-1974" className="text-haiti-blue hover:text-haiti-red underline">1974</Link> — le but de Sanon, les hommes qui l'ont rendu possible, et les survivants honorés en mai 2026</li>
            <li><Link to="/the-tribute" className="text-haiti-blue hover:text-haiti-red underline">Hommage créatif</Link> — la reconnaissance de la sélection envers les artistes haïtiens qui se mobilisent autour des Grenadiers</li>
            <li><Link to="/federation" className="text-haiti-blue hover:text-haiti-red underline">La Fédération</Link> — la FHF, son histoire et sa direction actuelle</li>
          </ul>

          <h2 className="font-display text-2xl md:text-3xl mt-12 mb-2">Les partenaires éditoriaux</h2>

          <p>
            <strong className="text-ink">Fédération Haïtienne de Football (FHF)</strong> — Fondée en 1904, membre de la FIFA depuis 1934 et membre fondateur de la CONCACAF depuis 1961, la FHF est l'instance dirigeante du football haïtien. Le site est réalisé en collaboration avec la fédération, qui valide les informations relatives à la sélection nationale et fournit l'accès officiel aux contenus institutionnels.
          </p>

          <p>
            <strong className="text-ink">Chokarella Media LLC</strong> — Société indépendante de médias haïtiens fondée en 2010 par Carel Pedre, basée à Sunrise, en Floride. Chokarella Media assure l'édition, la production éditoriale et la gestion technique de la plateforme, et rayonne auprès d'une audience cumulée de plus de 2,9 millions d'abonnés sur Instagram, Facebook, X, YouTube et TikTok.
          </p>

          <h2 className="font-display text-2xl md:text-3xl mt-12 mb-2">Corrections et contact</h2>

          <p>
            Pour signaler une erreur factuelle, proposer un événement ou un contenu, ou prendre contact avec la rédaction, écrire à <a href="mailto:contact@grenadiers2026.com" className="text-haiti-blue hover:text-haiti-red underline">contact@grenadiers2026.com</a>.
          </p>

          <h2 className="font-display text-2xl md:text-3xl mt-12 mb-2">En conclusion</h2>

          <p>
            Le football haïtien méritait un espace numérique à la hauteur de son histoire et de l'instant. Une plateforme dédiée, en collaboration avec la fédération, où la sélection nationale dispose d'un récit à la première personne, dans sa propre voix, sur ses propres termes.
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
