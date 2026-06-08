// ╔══════════════════════════════════════════════════════════════════╗
// ║  RouteHead — keeps document.title + key meta in sync on client-side ║
// ║  navigation. The prerender sets the head on initial load; this hook ║
// ║  updates it on every in-app route change so the title never sticks  ║
// ║  on the previous page. Values come from the SAME source as the      ║
// ║  prerender (src/lib/routeMeta.js) so the two cannot drift.          ║
// ║                                                                    ║
// ║  Mount once inside the Router (next to ScrollToTop). Renders null.  ║
// ╚══════════════════════════════════════════════════════════════════╝

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BASE, DEFAULT_TITLE, DEFAULT_DESCRIPTION, resolveRouteMeta } from "../lib/routeMeta";
import { getMatch } from "../data/liveMatches";

function setMetaTag(attr, key, content) {
  if (content == null) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}
function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function RouteHead() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = resolveRouteMeta(pathname);

    let title;
    let description;

    if (meta) {
      // Static route (incl. /live/<known opponent>, /jeux, tribute, history…).
      title = meta.title;
      description = meta.description;
    } else if (/^\/live\/[^/]+\/?$/.test(pathname)) {
      // Dynamic match page not pre-listed: derive from the loaded match data,
      // with a sensible default before it resolves.
      const slug = pathname.split("/").filter(Boolean)[1];
      const m = getMatch(slug);
      const opponent = m?.opponent?.name || "Adversaire";
      title = `Haïti · ${opponent} · Groupe C`;
      description = DEFAULT_DESCRIPTION;
    } else {
      // Unlisted SPA route (e.g. /journal/<slug>): keep a sane site default.
      title = DEFAULT_TITLE;
      description = DEFAULT_DESCRIPTION;
    }

    const cleanPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
    const url = `${BASE}${cleanPath}`;

    document.title = title;
    setMetaTag("name", "description", description);
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", url);
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setCanonical(url);
  }, [pathname]);

  return null;
}
