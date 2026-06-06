import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PageHeader from "../components/PageHeader";
import { watchPartyRegions, watchPartyStats, getAllParties } from "../data/watchParties";
import { useT } from "../lib/i18n";
import { CountUpNumber } from "../lib/motion";

const allParties = getAllParties();

export default function WatchParties() {
  const [view, setView] = useState("map"); // 'map' or 'list'
  const { t } = useT();

  return (
    <div>
      <PageHeader
        eyebrow={t("watchParties.eyebrow")}
        title={t("watchParties.title")}
        subtitle={t("watchParties.subtitle")}
      />

      {/* Stats strip */}
      <section className="bg-white border-b border-line">
        <div className="max-w-content mx-auto px-5 py-8 grid grid-cols-3 gap-6">
          <Stat label="Villes" value={watchPartyStats.cities} />
          <Stat label="Pays" value={watchPartyStats.countries} />
          <Stat label="Départements (Haïti)" value={watchPartyStats.haitiDepartments} />
        </div>
      </section>

      {/* Submission CTA */}
      <section className="bg-haiti-blue text-bg">
        <div className="max-w-content mx-auto px-5 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl md:text-3xl mb-3">
              Vous connaissez un lieu fréquenté par la communauté haïtienne&nbsp;?
            </h2>
            <p className="text-bg/80 leading-relaxed">
              Restaurant, bar, centre communautaire, espace culturel — où que la communauté haïtienne se réunisse dans votre ville, nous voulons l'inscrire au répertoire. Aidez-nous à enrichir la liste.
            </p>
          </div>
          <a
            href="mailto:contact@grenadiers2026.com?subject=Proposition de lieu&body=Ville :%0ANom du lieu :%0AAdresse :%0AType (restaurant / bar / centre communautaire / espace culturel) :%0AVotre lien avec le lieu :%0AContact (e-mail ou téléphone) :%0ARemarques :"
            className="inline-flex items-center gap-2 px-6 py-3 bg-haiti-red text-bg font-semibold rounded-full hover:bg-haiti-red-dark transition-colors whitespace-nowrap self-start"
          >
            Proposer un lieu
          </a>
        </div>
      </section>

      {/* View toggle */}
      <section className="bg-white border-b border-line sticky top-[73px] z-30">
        <div className="max-w-content mx-auto px-5 py-3 flex items-center gap-3">
          <div className="flex gap-1 bg-bg p-1 rounded-full border border-line">
            <button
              onClick={() => setView("map")}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                view === "map" ? "bg-haiti-blue text-bg" : "text-ink hover:bg-line"
              }`}
            >
              Carte
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                view === "list" ? "bg-haiti-blue text-bg" : "text-ink hover:bg-line"
              }`}
            >
              Liste
            </button>
          </div>
          <span className="text-xs text-muted hidden md:inline">
            {view === "map" ? "Cliquer sur une épingle pour les détails" : "Parcourir par région"}
          </span>
        </div>
      </section>

      {/* Map or list */}
      {view === "map" ? (
        <section className="bg-bg">
          <div className="max-w-content mx-auto px-5 py-8">
            <div className="rounded-lg overflow-hidden border border-line shadow-sm">
              <MapContainer
                center={[28, -60]}
                zoom={3}
                scrollWheelZoom={true}
                style={{ height: "600px", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {allParties.map((party, idx) => (
                  <CircleMarker
                    key={idx}
                    center={[party.lat, party.lng]}
                    radius={party.featured ? 10 : 7}
                    pathOptions={{
                      color: party.featured ? "#D21034" : "#00209F",
                      fillColor: party.featured ? "#D21034" : "#00209F",
                      fillOpacity: 0.7,
                      weight: 2,
                    }}
                  >
                    <Popup>
                      <div className="min-w-[200px]">
                        <p className="font-bold text-base m-0 mb-1">{party.city}</p>
                        {party.area && (
                          <p className="text-xs text-gray-500 m-0 mb-2">{party.area}</p>
                        )}
                        {party.featured && (
                          <span className="inline-block text-[10px] font-bold px-2 py-0.5 bg-red-100 text-red-800 rounded uppercase tracking-wider mb-2">
                            À l'affiche
                          </span>
                        )}
                        <p className="text-sm m-0 mb-1">{party.venue}</p>
                        {party.type && (
                          <p className="text-xs text-gray-600 m-0">{party.type}</p>
                        )}
                        {party.note && (
                          <p className="text-xs italic text-gray-600 m-0 mt-2 border-t border-gray-200 pt-2">
                            {party.note}
                          </p>
                        )}
                      </div>
                    </Popup>
                  </CircleMarker>
                ))}
              </MapContainer>
            </div>
            <div className="flex items-center gap-6 mt-4 text-xs text-muted">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-haiti-red"></span>
                Lieu à l'affiche
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-haiti-blue"></span>
                Lieu haïtien
              </span>
            </div>
          </div>
        </section>
      ) : (
        <div className="max-w-content mx-auto px-5 py-16 space-y-16">
          {/* Region quick nav */}
          <nav className="flex gap-2 overflow-x-auto pb-2 -mb-2">
            {watchPartyRegions.map((r) => (
              <a
                key={r.id}
                href={`#${r.id}`}
                className="text-xs uppercase tracking-wider font-semibold px-3 py-2 rounded-full bg-white hover:bg-line text-ink whitespace-nowrap border border-line"
              >
                {r.name.split(" — ")[1] || r.name}
              </a>
            ))}
          </nav>

          {watchPartyRegions.map((region) => (
            <RegionSection key={region.id} region={region} />
          ))}
        </div>
      )}

      {/* Bottom note + FIFA disclaimer */}
      <div className="max-w-content mx-auto px-5 pb-16 space-y-4">
        <section className="bg-white border border-line rounded-lg p-6 md:p-8">
          <p className="text-xs uppercase tracking-wider text-muted font-semibold mb-2">
            À propos de ce répertoire
          </p>
          <p className="text-ink leading-relaxed mb-4">
            Il s'agit d'un répertoire communautaire de lieux fréquentés par la communauté haïtienne — bars, restaurants, centres communautaires, espaces culturels. Toutes les entrées sont actuellement des emplacements en attente de propositions de la part de la communauté. Pour ajouter ou modifier une fiche, écrire à{" "}
            <a href="mailto:contact@grenadiers2026.com" className="text-haiti-blue underline hover:no-underline">
              contact@grenadiers2026.com
            </a>
            .
          </p>
          <p className="text-sm text-muted leading-relaxed">
            <strong className="text-ink">Note relative à la diffusion publique :</strong> La diffusion publique des matchs de la Coupe du Monde de la FIFA requiert une licence FIFA Public Viewing, distincte des droits de retransmission commerciale que peuvent déjà détenir certains établissements. Ce répertoire n'organise pas et ne cautionne pas l'organisation de projections publiques de matchs. Tout établissement qui choisit de retransmettre un match en est seul responsable, notamment en ce qui concerne l'obtention de la licence FIFA requise et le respect de la réglementation applicable.
          </p>
        </section>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="text-center md:text-left">
      <div className="font-display text-3xl md:text-4xl text-haiti-blue tabular-nums">
        <CountUpNumber target={value} duration={1500} />
      </div>
      <div className="text-xs uppercase tracking-wider text-muted mt-1 font-semibold">{label}</div>
    </div>
  );
}

function RegionSection({ region }) {
  return (
    <section id={region.id} className="scroll-mt-32">
      <div className="border-b border-line pb-4 mb-6">
        <div className="flex items-baseline justify-between gap-4 flex-wrap">
          <h2 className="font-display text-2xl md:text-3xl">{region.name}</h2>
          <span className="text-sm text-muted uppercase tracking-wider font-semibold whitespace-nowrap">
            {region.parties.length} {region.parties.length === 1 ? "lieu" : "lieux"}
          </span>
        </div>
        {region.note && (
          <p className="text-muted text-sm mt-2 leading-relaxed max-w-prose">{region.note}</p>
        )}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {region.parties.map((party, idx) => (
          <PartyCard key={`${region.id}-${idx}`} party={party} />
        ))}
      </div>
    </section>
  );
}

function PartyCard({ party }) {
  return (
    <div
      className={`p-5 rounded-lg border bg-white relative ${
        party.featured ? "border-haiti-red shadow-sm" : "border-line"
      }`}
    >
      {party.featured && (
        <div className="absolute top-4 right-4">
          <span className="text-xs font-bold px-2 py-0.5 bg-haiti-red text-bg rounded uppercase tracking-wider">
            À l'affiche
          </span>
        </div>
      )}
      <h3 className="font-display text-lg mb-1 pr-20">{party.city}</h3>
      {party.area && <p className="text-xs text-muted mb-2">{party.area}</p>}
      <p className="text-sm text-ink mb-3">{party.venue}</p>

      {party.note && (
        <p className="text-xs text-muted italic mb-3 leading-relaxed">{party.note}</p>
      )}

      {party.type && (
        <p className="text-xs uppercase tracking-wider text-muted font-semibold mt-2">
          {party.type}
        </p>
      )}
    </div>
  );
}
