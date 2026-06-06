import { useParams, Link, Navigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import ImagePlaceholder from "../components/ImagePlaceholder";
import { stories } from "../data/stories";

export default function Story() {
  const { slug } = useParams();
  const story = stories.find((s) => s.slug === slug);

  if (!story) {
    return <Navigate to="/stories" replace />;
  }

  const related = stories.filter((s) => s.slug !== slug).slice(0, 2);

  return (
    <div>
      <PageHeader eyebrow={story.eyebrow} title={story.title} subtitle={story.dek} />

      {/* Hero image */}
      <section className="bg-bg border-b border-line">
        <div className="max-w-content mx-auto px-5 py-8">
          <ImagePlaceholder
            src={story.image}
            label={story.imageLabel}
            aspect="16/9"
            objectPosition={story.imagePosition || "center top"}
          />
        </div>
      </section>

      <article className="bg-white">
        <div className="max-w-prose mx-auto px-5 py-12">
          {/* Byline */}
          <div className="flex items-center gap-4 text-sm text-muted mb-10 pb-6 border-b border-line">
            <span className="font-semibold text-ink">{story.author}</span>
            <span>·</span>
            <span>{story.date}</span>
            <span>·</span>
            <span>{story.readTime}</span>
          </div>

          {/* Body */}
          <div className="space-y-5 text-ink text-lg leading-relaxed">
            {story.body.map((block, idx) => {
              if (block.type === "h2") {
                return (
                  <h2
                    key={idx}
                    className="font-display text-2xl md:text-3xl mt-12 mb-2 text-ink"
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "pullquote") {
                return (
                  <blockquote key={idx} className="my-10 pl-6 border-l-4 border-haiti-red">
                    <p className="font-display text-xl md:text-2xl text-ink leading-snug italic">
                      {block.text}
                    </p>
                    {block.attribution && (
                      <footer className="mt-3 text-sm not-italic font-medium text-muted uppercase tracking-wider">
                        — {block.attribution}
                      </footer>
                    )}
                  </blockquote>
                );
              }
              return (
                <p key={idx} className="text-ink leading-relaxed">
                  {block.text}
                </p>
              );
            })}
          </div>

          {/* Back link */}
          <div className="mt-16 pt-8 border-t border-line">
            <Link
              to="/stories"
              className="inline-flex items-center gap-2 text-haiti-blue font-semibold hover:gap-3 transition-all"
            >
              ← All stories
            </Link>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-bg border-t border-line">
          <div className="max-w-content mx-auto px-5 py-16">
            <h2 className="font-display text-2xl mb-6">Keep reading</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/stories/${r.slug}`}
                  className="block bg-white border border-line rounded-lg overflow-hidden hover:border-haiti-red transition-colors group"
                >
                  <ImagePlaceholder
                    src={r.image}
                    label={r.imageLabel}
                    aspect="16/9"
                    rounded={false}
                  />
                  <div className="p-6">
                    <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-3">
                      {r.eyebrow}
                    </p>
                    <h3 className="font-display text-xl mb-3 group-hover:text-haiti-blue transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed">{r.dek}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
