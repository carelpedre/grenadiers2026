import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import ImagePlaceholder from "../components/ImagePlaceholder";
import { fadeUp, stagger } from "../lib/motion";
import { interviews } from "../data/interviews";

// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  INTERVIEWS PAGE — /interviews                                         ║
// ║                                                                        ║
// ║  Lists all published interviews. Each card links to /interviews/:slug. ║
// ║  Coming-soon interviews show a placeholder until real content lands.   ║
// ╚═══════════════════════════════════════════════════════════════════════╝

export default function Interviews() {
  return (
    <div>
      <PageHeader
        eyebrow="Chokarella · Long conversations"
        title="Interviews"
        subtitle="On-the-record conversations with the people behind Haiti's return to the World Cup — players, coaches, federation officials, and family. By Chokarella Media."
      />

      <div className="max-w-content mx-auto px-5 py-12 md:py-16">
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {interviews.map((interview) => (
            <InterviewCard key={interview.slug} interview={interview} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function InterviewCard({ interview }) {
  const { slug, subject, title, eyebrow, date, duration, language, keyQuote, comingSoon } = interview;

  const card = (
    <motion.div variants={fadeUp}>
      <div className="bg-white border border-line rounded-lg overflow-hidden hover:border-haiti-red hover:shadow-lg transition-all h-full flex flex-col">
        <div className="relative">
          <ImagePlaceholder src={subject.photo} label={subject.name} aspect="4/3" rounded={false} />
          {comingSoon && (
            <div className="absolute top-3 right-3 px-2 py-1 bg-ink/80 text-bg text-xs uppercase tracking-wider font-bold rounded">
              Coming soon
            </div>
          )}
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-2">{eyebrow}</p>
          <h3 className="font-display text-xl mb-3 group-hover:text-haiti-blue transition-colors">{title}</h3>
          <blockquote className="text-ink/70 text-sm leading-relaxed mb-4 italic border-l-2 border-haiti-red pl-3 flex-1">
            "{keyQuote}"
          </blockquote>
          <div className="flex items-center gap-3 text-xs text-muted">
            <span>{date}</span>
            {duration !== "—" && (
              <>
                <span>·</span>
                <span>{duration}</span>
              </>
            )}
            <span>·</span>
            <span>{language}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (comingSoon) {
    return <div className="opacity-70">{card}</div>;
  }

  return (
    <Link to={`/interviews/${slug}`} className="group">
      {card}
    </Link>
  );
}
