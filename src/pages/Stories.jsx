import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import ImagePlaceholder from "../components/ImagePlaceholder";
import { stories } from "../data/stories";
import { useT } from "../lib/i18n";

export default function Stories() {
  const { t } = useT();
  const featured = stories.find((s) => s.featured);
  const rest = stories.filter((s) => !s.featured);

  return (
    <div>
      <PageHeader
        eyebrow={t("stories.eyebrow")}
        title={t("stories.title")}
        subtitle={t("stories.subtitle")}
      />

      <div className="max-w-content mx-auto px-5 py-16 space-y-16">
        {/* Featured story */}
        {featured && (
          <section>
            <Link
              to={`/stories/${featured.slug}`}
              className="block group bg-ink text-bg rounded-lg overflow-hidden border border-ink hover:border-haiti-red transition-colors"
            >
              <div className="grid md:grid-cols-2 gap-0">
                <ImagePlaceholder
                  src={featured.image}
                  label={featured.imageLabel}
                  aspect="4/3"
                  rounded={false}
                  className="md:rounded-l-lg"
                />
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-3">
                    Featured · {featured.eyebrow}
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl mb-4 group-hover:text-haiti-red transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-bg/80 text-base md:text-lg leading-relaxed mb-6">
                    {featured.dek}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-bg/60">
                    <span>{featured.author}</span>
                    <span>·</span>
                    <span>{featured.date}</span>
                    <span>·</span>
                    <span>{featured.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Story list */}
        <section>
          <h2 className="font-display text-2xl md:text-3xl mb-6 border-b border-line pb-3">
            More stories
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {rest.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </section>

        {/* Note */}
        <section className="bg-white border border-line rounded-lg p-6 md:p-8">
          <p className="text-xs uppercase tracking-wider text-muted font-semibold mb-2">
            About these stories
          </p>
          <p className="text-ink leading-relaxed">
            More features coming throughout the tournament — pre-match analysis, post-match reaction, family interviews, and on-the-ground reporting from the watch parties. Got a story to tell? Email{" "}
            <a href="mailto:contact@grenadiers2026.com" className="text-haiti-blue underline hover:no-underline">
              contact@grenadiers2026.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

function StoryCard({ story }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
      <Link
        to={`/stories/${story.slug}`}
        className="block bg-white border border-line rounded-lg overflow-hidden hover:border-haiti-red hover:shadow-lg transition-all group"
      >
        <div className="overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <ImagePlaceholder
              src={story.image}
              label={story.imageLabel}
              aspect="16/9"
              rounded={false}
            />
          </motion.div>
        </div>
        <div className="p-6">
          <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-3">
            {story.eyebrow}
          </p>
          <h3 className="font-display text-xl mb-3 group-hover:text-haiti-blue transition-colors">
            {story.title}
          </h3>
          <p className="text-muted text-sm leading-relaxed mb-4">{story.dek}</p>
          <div className="flex items-center gap-3 text-xs text-muted">
            <span>{story.date}</span>
            <span>·</span>
            <span>{story.readTime}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
