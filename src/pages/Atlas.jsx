import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "../components/PageHeader";
import { CountUpNumber } from "../lib/motion";

// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  ATLAS — DIASPORA PIN MAP                                              ║
// ║                                                                        ║
// ║  Visitors drop a pin showing where they're watching from. The map     ║
// ║  fills up with red dots — every dot is a Haitian (or supporter).      ║
// ║                                                                        ║
// ║  Backend: /api/atlas.php (GET returns pins, POST adds one)             ║
// ║  Anti-abuse: rate-limited 1 pin per IP per hour, basic profanity      ║
// ║  filter, message capped at 140 chars.                                  ║
// ╚═══════════════════════════════════════════════════════════════════════╝

export default function Atlas() {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [locating, setLocating] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [autoDetected, setAutoDetected] = useState(false); // true once IP-detect ran
  const [formData, setFormData] = useState({ city: "", country: "", message: "" });
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [submitError, setSubmitError] = useState("");

  // Load existing pins
  useEffect(() => {
    fetch("/api/atlas.php")
      .then((r) => r.ok ? r.json() : { pins: [], count: 0 })
      .then((data) => {
        setPins(data.pins || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Auto-detect visitor location via IP on page load (one-shot, non-blocking)
  // Uses ipapi.co — free tier, no API key, JSON over HTTPS.
  // This populates a "You are here" marker on the map without requiring any
  // browser permission prompt. Visitors still have to explicitly drop a pin
  // to add themselves to the public list.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        if (data && data.latitude && data.longitude) {
          setUserLocation({ lat: data.latitude, lng: data.longitude });
          setFormData((f) => ({
            city: f.city || data.city || "",
            country: f.country || data.country_name || "",
            message: f.message,
          }));
          setAutoDetected(true);
        }
      } catch {
        // silent — visitor can still drop a pin manually
      }
    })();
    return () => { cancelled = true; };
  }, []);

  async function detectLocation() {
    setLocating(true);
    setSubmitError("");
    if (!navigator.geolocation) {
      setSubmitError("Your browser doesn't support location detection. Please enter your city manually.");
      setLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setUserLocation({ lat, lng });
        setAutoDetected(false); // user upgraded to precise location
        // Try to reverse-geocode using a free service
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`, {
            headers: { "Accept-Language": "en" }
          });
          if (res.ok) {
            const data = await res.json();
            const city = data.address?.city || data.address?.town || data.address?.village || data.address?.county || "";
            const country = data.address?.country || "";
            setFormData((f) => ({ ...f, city: f.city || city, country: f.country || country }));
          }
        } catch (e) {
          // ignore
        }
        setLocating(false);
      },
      (err) => {
        setSubmitError("Couldn't get your location. Please enter your city manually.");
        setLocating(false);
      },
      { timeout: 10000 }
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!userLocation) {
      setSubmitError("Please share your location first by tapping 'Use my location'.");
      return;
    }
    if (!formData.city || !formData.country) {
      setSubmitError("Please fill in your city and country.");
      return;
    }
    setSubmitStatus("loading");
    setSubmitError("");

    try {
      const res = await fetch("/api/atlas.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city: formData.city,
          country: formData.country,
          lat: userLocation.lat,
          lng: userLocation.lng,
          message: formData.message,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Couldn't add your pin");
      }
      setPins((p) => [...p, data.pin]);
      setSubmitStatus("success");
      setTimeout(() => {
        setShowForm(false);
        setSubmitStatus("idle");
        setFormData({ city: "", country: "", message: "" });
      }, 2000);
    } catch (err) {
      setSubmitError(err.message);
      setSubmitStatus("idle");
    }
  }

  // Derived stats
  const totalPins = pins.length;
  const uniqueCountries = new Set(pins.map((p) => p.country.toLowerCase())).size;
  const uniqueCities = new Set(pins.map((p) => `${p.city.toLowerCase()}-${p.country.toLowerCase()}`)).size;

  return (
    <div>
      <PageHeader
        eyebrow="The diaspora · The map"
        title="The Atlas"
        subtitle="Drop a pin from wherever you're watching. By June 13, this map should be covered. Every dot is one of us."
      />

      <div className="max-w-content mx-auto px-5 py-12 md:py-16">
        {/* Stats */}
        <section className="grid grid-cols-3 gap-4 md:gap-6 mb-10">
          <Stat value={totalPins} label="Pins dropped" />
          <Stat value={uniqueCities} label="Cities" />
          <Stat value={uniqueCountries} label="Countries" />
        </section>

        {/* CTA strip */}
        <section className="bg-haiti-blue text-bg rounded-2xl p-6 md:p-8 mb-10">
          <div className="grid md:grid-cols-[1fr_auto] gap-5 items-center">
            <div>
              {autoDetected && formData.city ? (
                <>
                  <h2 className="font-display text-2xl md:text-3xl mb-2">
                    Hey {formData.city} 👋
                  </h2>
                  <p className="text-bg/80 leading-relaxed">
                    We've placed you on the map (the gold dot). Make it official — drop your pin, leave a note, become part of The Atlas.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="font-display text-2xl md:text-3xl mb-2">Where are you watching from?</h2>
                  <p className="text-bg/80 leading-relaxed">
                    Add yourself to the map. It takes 10 seconds. One pin per location, anonymous, no email needed.
                  </p>
                </>
              )}
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-haiti-red hover:bg-haiti-red-dark text-bg font-semibold rounded-full transition-colors whitespace-nowrap"
            >
              Drop your pin →
            </button>
          </div>
        </section>

        {/* Map */}
        <section className="rounded-2xl overflow-hidden border border-line">
          <div style={{ height: "600px" }}>
            <MapContainer center={[20, -50]} zoom={3} className="w-full h-full" scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* "You are here" marker — auto-detected via IP, only shown if visitor hasn't dropped a pin */}
              {autoDetected && userLocation && (
                <CircleMarker
                  center={[userLocation.lat, userLocation.lng]}
                  radius={9}
                  pathOptions={{
                    color: "#C8A45C",
                    fillColor: "#C8A45C",
                    fillOpacity: 0.85,
                    weight: 3,
                  }}
                >
                  <Popup>
                    <div className="text-sm">
                      <p className="font-display text-base mb-1">You are here</p>
                      <p className="text-ink/70">
                        {formData.city}{formData.country ? `, ${formData.country}` : ""}
                      </p>
                      <p className="text-xs text-muted mt-2 italic">
                        Drop a pin to make it official.
                      </p>
                    </div>
                  </Popup>
                </CircleMarker>
              )}
              {pins.map((pin) => (
                <CircleMarker
                  key={pin.id}
                  center={[pin.lat, pin.lng]}
                  radius={6}
                  pathOptions={{ color: "#D21034", fillColor: "#D21034", fillOpacity: 0.7, weight: 1 }}
                >
                  <Popup>
                    <div className="text-sm">
                      <p className="font-display text-base mb-1">{pin.city}, {pin.country}</p>
                      {pin.message && <p className="text-ink/70 italic">"{pin.message}"</p>}
                      <p className="text-xs text-muted mt-2">{new Date(pin.createdAt).toLocaleDateString()}</p>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
        </section>

        {loading && (
          <p className="text-muted text-sm text-center mt-4">Loading pins…</p>
        )}
      </div>

      {/* Pin submission modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4"
            onClick={() => setShowForm(false)}
          >
            <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.95, y: 12, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 12, opacity: 0 }}
              className="relative bg-white rounded-lg max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {submitStatus === "success" ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-haiti-red flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl mb-2">You're on the map.</h3>
                  <p className="text-muted">Welcome to The Atlas.</p>
                </div>
              ) : (
                <>
                  <p className="text-haiti-red text-xs uppercase tracking-wider font-bold mb-2">Drop your pin</p>
                  <h3 className="font-display text-2xl mb-4">Where are you?</h3>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {!userLocation ? (
                      <button
                        type="button"
                        onClick={detectLocation}
                        disabled={locating}
                        className="w-full px-4 py-3 bg-haiti-blue hover:bg-haiti-blue-dark text-bg font-semibold rounded-full transition-colors disabled:opacity-50"
                      >
                        {locating ? "Locating…" : "📍 Use my location"}
                      </button>
                    ) : autoDetected ? (
                      <div className="bg-haiti-blue/5 border border-haiti-blue/20 rounded-lg p-3 text-sm text-ink space-y-2">
                        <p>✓ We placed you near {formData.city || "your area"} based on your network.</p>
                        <button
                          type="button"
                          onClick={detectLocation}
                          disabled={locating}
                          className="text-haiti-blue underline text-xs hover:no-underline disabled:opacity-50"
                        >
                          {locating ? "Locating…" : "Use precise location instead"}
                        </button>
                      </div>
                    ) : (
                      <div className="bg-haiti-blue/5 border border-haiti-blue/20 rounded-lg p-3 text-sm text-ink">
                        ✓ Precise location detected
                      </div>
                    )}

                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="City (e.g. Brooklyn)"
                      maxLength={80}
                      required
                      className="w-full px-4 py-3 bg-white border border-line rounded-full focus:outline-none focus:border-haiti-red"
                    />
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="Country (e.g. United States)"
                      maxLength={80}
                      required
                      className="w-full px-4 py-3 bg-white border border-line rounded-full focus:outline-none focus:border-haiti-red"
                    />
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="A short message (optional, max 140 chars)"
                      maxLength={140}
                      rows={2}
                      className="w-full px-4 py-3 bg-white border border-line rounded-2xl focus:outline-none focus:border-haiti-red resize-none"
                    />
                    <p className="text-xs text-muted">
                      {formData.message.length}/140 · anonymous · one pin per hour
                    </p>

                    {submitError && (
                      <p className="text-haiti-red text-sm">{submitError}</p>
                    )}

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="flex-1 px-4 py-3 border border-line hover:border-haiti-red text-ink font-semibold rounded-full transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={submitStatus === "loading" || !userLocation}
                        className="flex-1 px-4 py-3 bg-haiti-red hover:bg-haiti-red-dark disabled:opacity-50 text-bg font-semibold rounded-full transition-colors"
                      >
                        {submitStatus === "loading" ? "Adding…" : "Add my pin"}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="text-center">
      <div className="font-display text-3xl md:text-5xl text-haiti-blue tabular-nums">
        <CountUpNumber target={value} duration={1500} />
      </div>
      <div className="text-xs uppercase tracking-wider text-muted mt-1 font-semibold">{label}</div>
    </div>
  );
}
