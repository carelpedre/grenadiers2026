import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import ImagePlaceholder from "../components/ImagePlaceholder";
import { getEntriesSorted } from "../data/diary";
import { fadeUp, stagger } from "../lib/motion";

export default function Diary() {
  const entries = getEntriesSorted();

  return (
    <div>
      <PageHeader
        eyebrow="Le Journal"
        title="La sélection, jour après jour."
        subtitle="Chronique de la campagne des Grenadiers à la Coupe du Monde 2026 — préparation, déplacements, coulisses et instants marquants."
      />

      <section className="max-w-content mx-auto px-5 py-16">
        {entries.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted text-lg">
              Premières chroniques à paraître prochainement.
            </p>
          </div>
        ) : (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {entries.map((entry) => (
              <EntryCard key={entry.slug} entry={entry} />
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}

function EntryCard({ entry }) {
  return (
    <motion.div variants={fadeUp} whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
      <Link
        to={`/journal/${entry.slug}`}
        className="block bg-white border border-line rounded-lg overflow-hidden hover:border-haiti-red hover:shadow-lg transition-all h-full"
      >
        <div className="overflow-hidden">
          <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.5 }}>
            <ImagePlaceholder src={entry.cover} label={entry.title} aspect="16/9" rounded={false} />
          </motion.div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3 text-xs">
            <span className="text-haiti-red uppercase tracking-wider font-bold">
              {entry.eyebrow}
            </span>
            <span className="text-muted">{entry.dateLabel}</span>
          </div>
          <h3 className="font-display text-xl md:text-2xl mb-2 leading-snug">{entry.title}</h3>
          <p className="text-muted text-sm leading-relaxed">{entry.dek}</p>
          <p className="mt-4 text-sm font-semibold text-haiti-blue">Lire la chronique →</p>
        </div>
      </Link>
    </motion.div>
  );
}
