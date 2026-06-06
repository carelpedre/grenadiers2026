import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import ImagePlaceholder from "../components/ImagePlaceholder";
import { fadeUp } from "../lib/motion";
import { getInterview, publishedInterviews } from "../data/interviews";

// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  INDIVIDUAL INTERVIEW PAGE — /interviews/:slug                         ║
// ╚═══════════════════════════════════════════════════════════════════════╝

export default function Interview() {
  const { slug } = useParams();
  const interview = getInterview(slug);
  if (!interview || interview.comingSoon) return <Navigate to="/interviews" replace />;

  const { subject, title, eyebrow, date, duration, language, youtubeId, transcript, keyQuote } = interview;
  const others = publishedInterviews().filter((i) => i.slug !== slug).slice(0, 3);

  return (
    <article>
      <div className="bg-ink text-bg">
        <div className="max-w-content mx-auto px-5 py-12 md:py-20">
          <Link to="/interviews" className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-4 inline-block hover:text-bg transition-colors">
            ← Back to interviews
          </Link>
          <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-2">{eyebrow}</p>
          <h1 className="font-display text-3xl md:text-5xl mb-4 max-w-3xl">{title}</h1>
          <div className="flex items-center gap-4 text-sm text-bg/60 mb-8">
            <span>{date}</span>
            {duration !== "—" && (<><span>·</span><span>{duration}</span></>)}
            <span>·</span>
            <span>{language}</span>
          </div>

          {/* Subject */}
          <div className="flex items-center gap-4 max-w-md">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-haiti-red">
              <ImagePlaceholder src={subject.photo} label={subject.name} aspect="1/1" rounded={false} />
            </div>
            <div>
              <p className="font-display text-lg">{subject.name}</p>
              <p className="text-bg/60 text-sm">{subject.role}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-prose mx-auto px-5 py-12 md:py-16">
        {/* Video, if present */}
        {youtubeId && (
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="aspect-video rounded-lg overflow-hidden bg-ink mb-12">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </motion.div>
        )}

        {/* Pull quote */}
        <blockquote className="border-l-4 border-haiti-red pl-6 py-2 my-12 italic text-ink/90 text-xl md:text-2xl leading-relaxed">
          "{keyQuote}"
        </blockquote>

        {/* Transcript, if present */}
        {transcript && (
          <div className="prose prose-lg max-w-none text-ink/80 leading-relaxed space-y-6">
            {transcript.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}
      </div>

      {/* Related interviews */}
      {others.length > 0 && (
        <section className="bg-bg border-t border-line">
          <div className="max-w-content mx-auto px-5 py-12">
            <h2 className="font-display text-2xl mb-6">More conversations</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {others.map((o) => (
                <Link key={o.slug} to={`/interviews/${o.slug}`} className="block bg-white border border-line hover:border-haiti-red rounded-lg p-4 transition-colors">
                  <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-2">{o.eyebrow}</p>
                  <p className="font-display text-base mb-1">{o.title}</p>
                  <p className="text-muted text-xs">{o.subject.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
