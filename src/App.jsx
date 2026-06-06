import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import { LangProvider } from "./lib/i18n";

// ─── Eager routes (loaded on first paint) ────────────────────────────
// Keep these synchronous — they're high-traffic, low-cost, and don't pull
// in heavy dependencies. The home page must be instant.
import Home from "./pages/Home";
import Squad from "./pages/Squad";
import Matches from "./pages/Matches";
import Stories from "./pages/Stories";
import About from "./pages/About";

// ─── Lazy routes (loaded on demand) ──────────────────────────────────
// These pull in Leaflet (~150KB) or are infrequently visited. Splitting
// them out keeps the initial bundle small.
const Story = lazy(() => import("./pages/Story"));
const History = lazy(() => import("./pages/History"));
const Federation = lazy(() => import("./pages/Federation"));
const Coverage = lazy(() => import("./pages/Coverage"));
const Live = lazy(() => import("./pages/Live"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Diary = lazy(() => import("./pages/Diary"));
const DiaryEntry = lazy(() => import("./pages/DiaryEntry"));
const Jeux = lazy(() => import("./pages/Jeux"));
const Quiz = lazy(() => import("./pages/Quiz"));
const Pwonostik = lazy(() => import("./pages/Pwonostik"));
const OnzeDepart = lazy(() => import("./pages/OnzeDepart"));
const DevineGrenadier = lazy(() => import("./pages/DevineGrenadier"));
const Mur = lazy(() => import("./pages/Mur"));
const AdminMur = lazy(() => import("./pages/AdminMur"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Lightweight loading fallback while a lazy route's chunk downloads
function PageLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-muted text-sm">Chargement…</div>
    </div>
  );
}

// French-only site (non-official, in collaboration with the FHF). No language picker.
const LANG = "fr";

export default function App() {
  return (
    <LangProvider lang={LANG}>
      <ScrollToTop />
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route element={<Layout lang={LANG} />}>
            <Route path="/" element={<Home />} />
            <Route path="/squad" element={<Squad />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/stories/:slug" element={<Story />} />
            <Route path="/anthem" element={<Coverage />} />
            <Route path="/federation" element={<Federation />} />
            <Route path="/history-1974" element={<History />} />
            <Route path="/the-tribute" element={<Coverage />} />
            <Route path="/the-coverage" element={<Coverage />} />
            <Route path="/documentary" element={<Coverage />} />
            {/* /live merged into /matches; keep the URL working as a redirect */}
            <Route path="/live" element={<Navigate to="/matches" replace />} />
            <Route path="/live/:slug" element={<Live />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/journal" element={<Diary />} />
            <Route path="/journal/:slug" element={<DiaryEntry />} />
            <Route path="/jeux" element={<Jeux />} />
            <Route path="/jeux/quiz" element={<Quiz />} />
            <Route path="/jeux/pwonostik" element={<Pwonostik />} />
            <Route path="/jeux/onze" element={<OnzeDepart />} />
            <Route path="/jeux/devine" element={<DevineGrenadier />} />
            <Route path="/mur" element={<Mur />} />
            <Route path="/about" element={<About />} />
            {/* Catch-all 404 — must be last */}
            <Route path="*" element={<NotFound />} />
          </Route>
          {/* Admin (unlinked, standalone — no public nav/footer; passphrase-gated) */}
          <Route path="/admin/mur" element={<AdminMur />} />
        </Routes>
      </Suspense>
    </LangProvider>
  );
}
