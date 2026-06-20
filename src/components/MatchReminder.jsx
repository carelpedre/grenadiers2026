// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  MATCH REMINDER — calendar export                                      ║
// ║                                                                        ║
// ║  Generates an .ics (iCalendar) file the user can add to:               ║
// ║    - iOS Calendar (Apple)                                              ║
// ║    - Google Calendar                                                   ║
// ║    - Outlook                                                           ║
// ║    - Anything else that reads .ics                                     ║
// ║                                                                        ║
// ║  No backend needed. Generated client-side, downloaded as a file, set  ║
// ║  with a 30-minute alarm before kickoff.                                ║
// ║                                                                        ║
// ║  Better than push notifications because:                              ║
// ║   - Works on every device                                              ║
// ║   - User stays in control                                              ║
// ║   - No permission prompt drama                                         ║
// ║   - Never bounces / no infrastructure to maintain                      ║
// ╚═══════════════════════════════════════════════════════════════════════╝

import { useState } from "react";
import { useT } from "../lib/i18n";
import { teamName } from "../lib/teamNames";

export default function MatchReminder({ match }) {
  const { t, lang } = useT();
  const [downloaded, setDownloaded] = useState(false);

  function handleDownload() {
    const ics = buildIcs(match, lang);
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `haiti-vs-${match.opponent.name.toLowerCase()}-grenadiers2026.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 4000);
  }

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 px-4 py-2 bg-haiti-blue hover:bg-haiti-blue-dark text-bg text-sm font-semibold rounded-full transition-colors"
    >
      {downloaded ? t("matches.calAdded") : t("matches.calReminder")}
    </button>
  );
}

// Build a single-event .ics file with a 30-minute reminder alarm
function buildIcs(match, lang) {
  const start = new Date(match.kickoff);
  const end = new Date(start.getTime() + 2.5 * 60 * 60 * 1000); // 2.5 hours

  const fmt = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const dtStart = fmt(start);
  const dtEnd = fmt(end);
  const dtStamp = fmt(new Date());
  const uid = `${match.slug}-grenadiers2026@grenadiers2026.com`;

  const en = lang === "en";
  const oppName = match.opponent.country ? teamName(match.opponent.country, lang) : match.opponent.name;
  const haiti = en ? "Haiti" : "Haïti";
  const city = en && match.stadium.cityEn ? match.stadium.cityEn : match.stadium.city;

  const summary = en
    ? `${haiti} vs ${oppName} - 2026 FIFA World Cup`
    : `${haiti} vs ${oppName} — Coupe du Monde FIFA 2026`;
  const description = (en
    ? [
        `Group C, match ${match.matchNumber}.`,
        `${match.stadium.fifaName}, ${city}.`,
        "",
        `Broadcast: ${match.broadcast || "Check local listings"}`,
        `Live coverage: https://grenadiers2026.com/live/${match.slug}`,
        `Find a watch party: https://grenadiers2026.com/watch-parties`,
      ]
    : [
        `Groupe C, match ${match.matchNumber}.`,
        `${match.stadium.fifaName}, ${city}.`,
        "",
        `Diffusion : ${match.broadcast || "Consulter la programmation locale"}`,
        `Suivi en direct : https://grenadiers2026.com/live/${match.slug}`,
        `Trouver une projection publique : https://grenadiers2026.com/watch-parties`,
      ]
  ).join("\\n");
  const location = `${match.stadium.fifaName}, ${city}`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Chokarella Media//grenadiers2026//FR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escapeIcs(summary)}`,
    `DESCRIPTION:${escapeIcs(description)}`,
    `LOCATION:${escapeIcs(location)}`,
    `URL:https://grenadiers2026.com/live/${match.slug}`,
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-PT30M",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeIcs(en ? "Haiti takes the field in 30 minutes! 🇭🇹" : "Haïti entre sur le terrain dans 30 minutes ! 🇭🇹")}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function escapeIcs(s) {
  return String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}
