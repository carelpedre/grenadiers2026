import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import ImagePlaceholder from "../components/ImagePlaceholder";
import { fadeUp, stagger } from "../lib/motion";
import { documentaryFeature, trailers, pressFeatures } from "../data/documentary";

// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  DOCUMENTARY PAGE — /documentary                                       ║
// ║                                                                        ║
// ║  Houses Chokarella's documentary about Les Grenadiers, plus trailers,  ║
// ║  press features (FOX, SI), and behind-the-scenes content.              ║
// ║                                                                        ║
// ║  Designed so it works whether content is live or "coming soon" —       ║
// ║  Carel can launch this page now and fill in content as it's ready.     ║
// ╚═══════════════════════════════════════════════════════════════════════╝

export default function Documentary() {
  return (
    <div>
      <PageHeader
        eyebrow="The film · The story"
        title={documentaryFeature.title}
        subtitle={documentaryFeature.subtitle}
      />

      <div className="max-w-content mx-auto px-5 py-12 md:py-16 space-y-20">
        {/* Hero: feature poster + description */}
        <section className="grid md:grid-cols-[1.2fr_1fr] gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-haiti-red/10 text-haiti-red text-xs font-bold uppercase tracking-wider rounded-full mb-4">
              {documentaryFeature.releaseLine}
            </div>
            <h2 className="font-display text-3xl md:text-5xl mb-5 leading-tight">
              52 years, in 90 minutes.
            </h2>
            <p className="text-ink/80 leading-relaxed mb-6 text-lg">
              {documentaryFeature.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:contact@grenadiers2026.com?subject=Documentary inquiry — Les Grenadiers"
                className="inline-flex items-center gap-2 px-6 py-3 bg-haiti-blue hover:bg-haiti-blue-dark text-bg font-semibold rounded-full transition-colors"
              >
                Press inquiries →
              </a>
              <a
                href="#trailers"
                className="inline-flex items-center gap-2 px-6 py-3 border border-line hover:border-haiti-red text-ink font-semibold rounded-full transition-colors"
              >
                Watch the trailers
              </a>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <ImagePlaceholder
              src={documentaryFeature.posterImage}
              label={documentaryFeature.posterLabel}
              aspect="3/4"
            />
          </div>
        </section>

        {/* Trailers grid */}
        <section id="trailers">
          <SectionHeader
            eyebrow="Trailers · Clips"
            title="Watch"
            subtitle="Trailers, behind-the-scenes, and special features from Chokarella's coverage of Les Grenadiers."
          />
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {trailers.map((t) => (
              <TrailerCard key={t.slug} trailer={t} />
            ))}
          </motion.div>
        </section>

        {/* Press / magazine features */}
        <section>
          <SectionHeader
            eyebrow="In the press"
            title="Cover art & features"
            subtitle="Original art produced by Chokarella for major outlets covering Haiti's return."
          />
          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {pressFeatures.map((p) => (
              <PressFeatureCard key={p.slug} feature={p} />
            ))}
          </motion.div>
        </section>

        {/* CTA — sign up to be notified */}
        <section className="bg-gradient-to-br from-haiti-blue to-ink text-bg rounded-2xl p-8 md:p-12 text-center">
          <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-3">Be first to watch</p>
          <h2 className="font-display text-2xl md:text-3xl mb-3 max-w-2xl mx-auto">
            We'll tell you when the documentary drops.
          </h2>
          <p className="text-bg/70 leading-relaxed mb-6 max-w-2xl mx-auto">
            Sign up for The Grenadier Brief — Chokarella's free newsletter. We'll email when the documentary, trailers, and bonus footage go live.
          </p>
          <a
            href="/#newsletter"
            className="inline-flex items-center gap-2 px-6 py-3 bg-haiti-red hover:bg-haiti-red-dark text-bg font-semibold rounded-full transition-colors"
          >
            Subscribe to The Grenadier Brief →
          </a>
        </section>
      </div>
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-8">
      <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-2">{eyebrow}</p>
      <h2 className="font-display text-2xl md:text-4xl text-ink mb-3">{title}</h2>
      {subtitle && <p className="text-muted leading-relaxed max-w-2xl">{subtitle}</p>}
    </div>
  );
}

function TrailerCard({ trailer }) {
  const { title, subtitle, duration, youtubeId, posterImage, posterLabel, comingSoon, releaseDate } = trailer;

  if (!comingSoon && youtubeId) {
    return (
      <motion.div variants={fadeUp} className="rounded-lg overflow-hidden border border-line bg-white">
        <div className="aspect-video bg-ink">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
        <div className="p-5">
          <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-1">{duration}</p>
          <h3 className="font-display text-lg mb-1">{title}</h3>
          <p className="text-muted text-sm">{subtitle}</p>
        </div>
      </motion.div>
    );
  }

  // Coming soon placeholder
  return (
    <motion.div variants={fadeUp} className="rounded-lg overflow-hidden border border-line bg-white relative group">
      <div className="relative">
        <ImagePlaceholder src={posterImage} label={posterLabel} aspect="16/9" rounded={false} />
        <div className="absolute inset-0 bg-ink/50 flex items-center justify-center">
          <div className="text-center text-bg">
            <div className="w-16 h-16 mx-auto rounded-full bg-haiti-red/90 flex items-center justify-center mb-3">
              <svg className="w-7 h-7 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="font-display text-sm uppercase tracking-wider opacity-90">{releaseDate}</p>
          </div>
        </div>
      </div>
      <div className="p-5">
        <p className="text-muted text-xs uppercase tracking-wider font-bold mb-1">{duration}</p>
        <h3 className="font-display text-lg mb-1">{title}</h3>
        <p className="text-muted text-sm">{subtitle}</p>
      </div>
    </motion.div>
  );
}

function PressFeatureCard({ feature }) {
  return (
    <motion.div variants={fadeUp} className="bg-white border border-line rounded-lg overflow-hidden">
      <div className="relative">
        <ImagePlaceholder src={feature.image} label={feature.imageLabel} aspect="4/3" rounded={false} />
        {feature.comingSoon && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-ink/80 text-bg text-xs uppercase tracking-wider font-bold rounded">
            Coming soon
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-2">{feature.publication}</p>
        <h3 className="font-display text-xl mb-3">{feature.headline}</h3>
        <p className="text-ink/70 text-sm leading-relaxed">{feature.caption}</p>
      </div>
    </motion.div>
  );
}
