// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  YOUTUBE EMBED (with graceful link-out fallback)                       ║
// ║                                                                        ║
// ║  Some channels (like FIFA) block third-party embeds. So instead of     ║
// ║  showing a broken iframe, we render a beautiful thumbnail card that    ║
// ║  links out to YouTube directly.                                        ║
// ║                                                                        ║
// ║  Set `embeddable={true}` ONLY for videos you've verified can be        ║
// ║  embedded (e.g. your own Chokarella YouTube uploads).                  ║
// ║  Default is link-out, which works for everyone.                        ║
// ║                                                                        ║
// ║  Usage:                                                                ║
// ║    <YouTubeEmbed                                                       ║
// ║      videoId="Nx9gqAuyGRI"                                             ║
// ║      title="Manno Sanon's goal vs Italy, 1974"                         ║
// ║      caption="Source: FIFA's official YouTube channel"                 ║
// ║      aspect="9/16"   // for Shorts                                     ║
// ║      embeddable={false}  // link out — works for FIFA, etc.           ║
// ║    />                                                                  ║
// ╚═══════════════════════════════════════════════════════════════════════╝

import { motion } from "framer-motion";
import { fadeUp } from "../lib/motion";

export default function YouTubeEmbed({
  videoId,
  title,
  caption,
  aspect = "16/9",
  embeddable = false, // default to link-out for safety
}) {
  const aspectClass = aspect === "9/16"
    ? "aspect-[9/16] max-w-sm mx-auto"
    : "aspect-video";

  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
  // YouTube thumbnail URL — maxresdefault is best, falls back to hqdefault
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  const fallbackThumb = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <motion.figure
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="my-10 -mx-5 md:mx-0"
    >
      {embeddable ? (
        <div className={`${aspectClass} md:rounded-lg overflow-hidden bg-ink shadow-lg`}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      ) : (
        // Link-out card
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${aspectClass} md:rounded-lg overflow-hidden bg-ink shadow-lg block relative group`}
          aria-label={`Watch on YouTube: ${title}`}
        >
          {/* Thumbnail */}
          <img
            src={thumbnailUrl}
            onError={(e) => {
              if (e.currentTarget.src !== fallbackThumb) {
                e.currentTarget.src = fallbackThumb;
              }
            }}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          {/* Dark gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/40"></div>

          {/* Big play button center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-haiti-red/95 group-hover:bg-haiti-red group-hover:scale-110 transition-all flex items-center justify-center shadow-2xl">
              <svg className="w-9 h-9 md:w-11 md:h-11 text-bg ml-1.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Top-left: YouTube badge */}
          <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 bg-ink/75 backdrop-blur-sm rounded-full text-bg text-xs font-semibold">
            <svg className="w-4 h-4 text-haiti-red" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Watch on YouTube
          </div>

          {/* Bottom: video title */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 text-bg">
            <p className="font-display text-base md:text-lg leading-tight line-clamp-2">
              {title}
            </p>
          </div>
        </a>
      )}

      {caption && (
        <figcaption className="text-xs text-muted italic mt-3 px-5 md:px-0">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}
