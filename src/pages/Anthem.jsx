import PageHeader from "../components/PageHeader";
import { spotifyPlaylist, youtubeVideos } from "../data/anthem";
import { useT } from "../lib/i18n";

export default function Anthem() {
  const { t } = useT();
  return (
    <div>
      <PageHeader
        eyebrow={t("anthem.eyebrow")}
        title={t("anthem.title")}
        subtitle={t("anthem.subtitle")}
      />

      {/* Spotify Playlist */}
      <section className="bg-white border-b border-line">
        <div className="max-w-content mx-auto px-5 py-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-wider text-haiti-red font-bold mb-3">
                The Grenadiers' playlist
              </p>
              <h2 className="font-display text-3xl md:text-4xl mb-3">
                {spotifyPlaylist.title}
              </h2>
              <p className="text-muted max-w-prose leading-relaxed">
                {spotifyPlaylist.description}
              </p>
            </div>
            <a
              href={spotifyPlaylist.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-bg font-semibold rounded-full hover:bg-ink/80 transition-colors text-sm whitespace-nowrap self-start"
            >
              Open in Spotify
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </a>
          </div>

          <div className="rounded-lg overflow-hidden border border-line bg-line">
            <iframe
              src={`https://open.spotify.com/embed/playlist/${spotifyPlaylist.id}?utm_source=generator&theme=0`}
              width="100%"
              height="500"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title={spotifyPlaylist.title}
              className="block"
            ></iframe>
          </div>

          <p className="text-xs text-muted mt-4">
            Curated by {spotifyPlaylist.curatedBy}. Updated regularly through the tournament.
          </p>
        </div>
      </section>

      {/* YouTube Videos */}
      <section className="bg-bg">
        <div className="max-w-content mx-auto px-5 py-16">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-wider text-haiti-red font-bold mb-3">
              The videos
            </p>
            <h2 className="font-display text-3xl md:text-4xl mb-3">
              Songs for Les Grenadiers
            </h2>
            <p className="text-muted max-w-prose leading-relaxed">
              The anthems, the tributes, the songs the diaspora is playing through World Cup 2026.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {youtubeVideos.map((video, idx) => (
              <VideoCard key={idx} video={video} />
            ))}
          </div>
        </div>
      </section>

      {/* Submit a song */}
      <section className="bg-haiti-blue text-bg">
        <div className="max-w-content mx-auto px-5 py-16 text-center">
          <h2 className="font-display text-3xl md:text-4xl mb-4">
            Got a song for the Grenadiers?
          </h2>
          <p className="text-bg/80 max-w-prose mx-auto mb-8 leading-relaxed">
            Send us the track — anthems, tributes, freestyles, throwbacks. If it belongs in the soundtrack of Haiti 2026, we want to hear it.
          </p>
          <a
            href="mailto:contact@grenadiers2026.com?subject=Grenadiers 2026 — Song Submission&body=Track title:%0AArtist:%0ASpotify link (if any):%0AYouTube link (if any):%0AWhy it belongs:"
            className="inline-flex items-center gap-2 px-6 py-3 bg-haiti-red text-bg font-semibold rounded-full hover:bg-haiti-red-dark transition-colors"
          >
            Submit a song
          </a>
        </div>
      </section>
    </div>
  );
}

function VideoCard({ video }) {
  const isPlaceholder = video.videoId.startsWith("REPLACE_ME");

  return (
    <div className="bg-white rounded-lg border border-line overflow-hidden">
      <div className="aspect-video bg-ink relative">
        {isPlaceholder ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-bg/40 text-sm gap-2 p-6 text-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="6" width="20" height="12" rx="2" />
              <polygon points="10,9 16,12 10,15" fill="currentColor" />
            </svg>
            <span className="italic">{video.note}</span>
          </div>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${video.videoId}`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 w-full h-full"
          ></iframe>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg mb-1">
          {video.title.startsWith("EDIT ME") ? (
            <span className="text-muted italic font-normal">Song title pending</span>
          ) : (
            video.title
          )}
        </h3>
        <p className="text-sm text-muted">
          {video.artist.startsWith("EDIT ME") ? "" : video.artist}
        </p>
      </div>
    </div>
  );
}
