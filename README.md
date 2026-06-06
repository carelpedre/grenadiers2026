# Grenadiers 2026

The home of Haiti at the FIFA World Cup 2026. A Chokarella project.

Live at: **grenadiers.chokarella.com**

## Stack

- Vite + React 18
- React Router v6
- Tailwind CSS 3
- Plus Jakarta Sans (Google Fonts)
- Deployed to DreamHost as static files

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build for production

```bash
npm run build
```

Outputs to `dist/`.

## Deploy to DreamHost

Build locally, then upload the contents of `dist/` to the DreamHost web root for grenadiers.chokarella.com.

### One-time DreamHost setup

1. In the DreamHost panel: Websites → Manage Websites → Add Website
2. Add `grenadiers.chokarella.com` as a subdomain (or fully hosted domain pointing to chokarella.com's account)
3. Set the web directory to something like `/home/USER/grenadiers.chokarella.com`
4. Wait for DNS to propagate (usually a few minutes since chokarella.com is already on DreamHost)

### Deploy via rsync (recommended)

```bash
npm run build
rsync -avz --delete dist/ USER@SERVER.dreamhost.com:/home/USER/grenadiers.chokarella.com/
```

Replace `USER` and `SERVER` with your DreamHost SSH credentials.

### Deploy via SFTP (alternative)

Open Cyberduck / Transmit / FileZilla, connect to your DreamHost server, and upload the contents of `dist/` to the site's web directory.

### Important: the `.htaccess` file

`public/.htaccess` is automatically copied into `dist/` on build. It tells Apache to route all non-file requests to `index.html` so React Router works on direct page loads (e.g. someone visits grenadiers.chokarella.com/matches directly).

## Project structure

```
src/
├── App.jsx              # Router
├── main.jsx             # Entry point
├── index.css            # Tailwind + global styles
├── components/
│   ├── Layout.jsx       # Header, nav, footer
│   ├── PageHeader.jsx   # Reusable inner-page hero
│   └── CountdownClock.jsx
└── pages/
    ├── Home.jsx
    ├── Squad.jsx
    ├── Matches.jsx
    ├── WatchParties.jsx
    ├── Stories.jsx
    └── History.jsx
```

## Brand

- **Haiti blue:** `#00209F` (flag blue)
- **Haiti red:** `#D21034` (flag red)
- **Gold accent:** `#C8A45C` (carried over from carelpedre.com)
- **Background:** `#FAFAF7` (warm off-white)
- **Ink:** `#0A0A0A` (near-black)
- **Font:** Plus Jakarta Sans (400/500/600/700/800)

All colors are configured as Tailwind utilities: `bg-haiti-blue`, `text-haiti-red`, `border-line`, etc.

## Group C fixtures

| # | Match | Date | Time (ET) | Venue |
|---|---|---|---|---|
| 1 | Haiti vs Scotland | June 13, 2026 | 9:00 PM | Gillette Stadium, Foxboro MA |
| 2 | Haiti vs Brazil | June 19, 2026 | TBD | Philadelphia or Foxboro |
| 3 | Haiti vs Morocco | June 24, 2026 | TBD | Miami or Atlanta |

## Roadmap to launch (June 12)

- [x] Project scaffold, design system, routing
- [x] Home page with hero, countdown, group preview
- [x] Matches page with fixtures
- [ ] Squad page with full 26-man roster
- [ ] Watch parties directory (seeded with diaspora hubs)
- [ ] Stories page with 5-10 launch articles
- [ ] 1974 history piece (the emotional anchor)
- [ ] Sponsor slot integration
- [ ] Bilingual EN/HT toggle
- [ ] Open Graph images for social sharing
- [ ] DreamHost deployment and DNS

---

© 2026 Chokarella Media LLC
