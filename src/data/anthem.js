// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  ANTHEM PAGE DATA                                                      ║
// ║  Edit this file to update the songs shown on /anthem                   ║
// ║                                                                        ║
// ║  TO CHANGE A SONG TITLE OR ARTIST:                                     ║
// ║    Just edit the `title` and `artist` fields below.                    ║
// ║                                                                        ║
// ║  TO ADD A NEW YOUTUBE VIDEO:                                           ║
// ║    1. Open the video on YouTube                                        ║
// ║    2. Copy the part of the URL AFTER `v=`                              ║
// ║       Example: youtube.com/watch?v=ABC123  →  videoId is "ABC123"     ║
// ║    3. Paste it into a `videoId` field below                            ║
// ╚═══════════════════════════════════════════════════════════════════════╝

export const spotifyPlaylist = {
  id: "60FtHS4uBJKdhQu1pmJbry",
  url: "https://open.spotify.com/playlist/60FtHS4uBJKdhQu1pmJbry",
  title: "Grenadiers 2026 — The Playlist",
  description:
    "Songs for the red and blue. Konpa, Rap Kreyòl, Rasin, anthems old and new — the soundtrack of the road to the World Cup.",
  curatedBy: "Chokarella",
};

export const youtubeVideos = [
  {
    videoId: "wHIpW-LvW2k",
    title: "Set It Off",
    artist: "Sincerely Suav · Afriken An · T-Ansyto",
    note: "",
  },
  {
    videoId: "R-MpbUg1M-8",
    title: "Ayiti... Dan !",
    artist: "Halfdan feat. BIC Tizon Dife",
    note: "",
  },
  // To add a 3rd video, uncomment the block below and fill in the videoId:
  // {
  //   videoId: "PASTE_VIDEO_ID_HERE",
  //   title: "Song title",
  //   artist: "Artist name",
  //   note: "",
  // },
];
