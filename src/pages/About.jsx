import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";

export default function About() {
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
