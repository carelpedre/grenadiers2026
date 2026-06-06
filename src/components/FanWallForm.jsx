import { useState, useRef } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { submitFanMessage } from "../lib/fanWallApi";
import { orderedCountries } from "../data/countries";

const { pinned: PINNED_COUNTRIES, rest: REST_COUNTRIES } = orderedCountries();

const TURNSTILE_SITE_KEY = "0x4AAAAAADfvT0oEdQ7QfVgV";
const MAX_MESSAGE = 500;

// Formulaire de soumission au Mur des supporters.
// Props :
//   wallOpen  — true / false / null (null = inconnu → on affiche le formulaire,
//               la fonction edge tranchera)
//   onSubmitted — callback après un envoi réussi (pour rafraîchir le mur)
export default function FanWallForm({ wallOpen, onSubmitted }) {
  const [name, setName] = useState("");
  const [anon, setAnon] = useState(false);
  const [city, setCity] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [feedback, setFeedback] = useState("");
  const turnstileRef = useRef(null);

  if (wallOpen === false) {
    return (
      <div className="bg-white border border-line rounded-xl p-8 text-center">
        <p className="text-3xl mb-3">🔒</p>
        <p className="text-ink font-semibold">Le mur des supporters est temporairement fermé.</p>
        <p className="text-muted text-sm mt-2">Revenez bientôt pour laisser votre message.</p>
      </div>
    );
  }

  const remaining = MAX_MESSAGE - message.length;

  function resetCaptcha() {
    setToken("");
    try {
      turnstileRef.current?.reset();
    } catch {
      /* ignore */
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFeedback("");

    if (!message.trim()) {
      setStatus("error");
      setFeedback("Écrivez d'abord votre message.");
      return;
    }
    if (!countryCode) {
      setStatus("error");
      setFeedback("Veuillez sélectionner votre pays.");
      return;
    }
    if (!token) {
      setStatus("error");
      setFeedback("Veuillez compléter la vérification anti-robot.");
      return;
    }

    const picked = [...PINNED_COUNTRIES, ...REST_COUNTRIES].find((c) => c.code === countryCode);

    setStatus("sending");
    const { data } = await submitFanMessage({
      name: anon ? "" : name,
      is_anonymous: anon,
      location_city: city,
      location_country: picked?.name || "",
      location_country_code: countryCode,
      message,
      turnstile_token: token,
    });

    resetCaptcha();

    if (data?.ok) {
      setStatus("success");
      setFeedback("Merci ! Votre message sera publié après vérification.");
      setName("");
      setCity("");
      setCountryCode("");
      setMessage("");
      setAnon(false);
      onSubmitted?.();
    } else {
      setStatus("error");
      setFeedback(data?.message || "Une erreur est survenue. Réessayez.");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white border border-line rounded-xl p-8 text-center">
        <p className="text-3xl mb-3">🇭🇹</p>
        <p className="text-ink font-semibold text-lg">{feedback}</p>
        <button
          onClick={() => {
            setStatus("idle");
            setFeedback("");
          }}
          className="mt-5 inline-flex items-center gap-2 px-6 py-3 bg-haiti-blue text-bg font-semibold rounded-full hover:bg-haiti-blue-dark transition-colors"
        >
          Laisser un autre message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-line rounded-xl p-5 md:p-7 space-y-4"
    >
      {/* Toggle anonyme */}
      <label className="flex items-center justify-between gap-3 cursor-pointer select-none">
        <span className="text-sm font-semibold text-ink">Poster en anonyme</span>
        <span className="relative inline-flex items-center">
          <input
            type="checkbox"
            checked={anon}
            onChange={(e) => setAnon(e.target.checked)}
            className="sr-only peer"
          />
          <span className="h-6 w-11 rounded-full bg-line peer-checked:bg-haiti-blue transition-colors" />
          <span className="absolute left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
        </span>
      </label>

      {/* Nom (masqué si anonyme) */}
      {!anon && (
        <div>
          <label className="block text-xs uppercase tracking-wider text-muted font-semibold mb-1.5">
            Votre nom
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={60}
            placeholder="Ex. Jean-Robert"
            className="w-full px-4 py-3 rounded-lg border border-line focus:outline-none focus:border-haiti-blue text-ink"
          />
        </div>
      )}

      {/* Localisation */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs uppercase tracking-wider text-muted font-semibold mb-1.5">
            Ville <span className="normal-case text-muted/70">(facultatif)</span>
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            maxLength={80}
            placeholder="Port-au-Prince"
            className="w-full px-4 py-3 rounded-lg border border-line focus:outline-none focus:border-haiti-blue text-ink"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-muted font-semibold mb-1.5">
            Pays <span className="text-haiti-red">*</span>
          </label>
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            required
            className={`w-full px-4 py-3 rounded-lg border border-line bg-white focus:outline-none focus:border-haiti-blue ${
              countryCode ? "text-ink" : "text-muted"
            }`}
          >
            <option value="" disabled>
              Sélectionnez…
            </option>
            <optgroup label="Fréquents">
              {PINNED_COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Tous les pays">
              {REST_COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs uppercase tracking-wider text-muted font-semibold mb-1.5">
          Votre message
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, MAX_MESSAGE))}
          rows={4}
          placeholder="Allez les Grenadiers ! 🇭🇹"
          className="w-full px-4 py-3 rounded-lg border border-line focus:outline-none focus:border-haiti-blue text-ink resize-y min-h-[110px]"
        />
        <div className="flex justify-end mt-1">
          <span className={`text-xs tabular-nums ${remaining <= 20 ? "text-haiti-red" : "text-muted"}`}>
            {remaining} caractère{Math.abs(remaining) > 1 ? "s" : ""} restant{Math.abs(remaining) > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Turnstile (wrapper React — gère le cycle de vie SPA) */}
      <Turnstile
        ref={turnstileRef}
        siteKey={TURNSTILE_SITE_KEY}
        onSuccess={(t) => setToken(t)}
        onError={() => setToken("")}
        onExpire={() => setToken("")}
        options={{ theme: "light" }}
      />

      {/* Consentement */}
      <p className="text-xs text-muted leading-relaxed">
        En envoyant, votre message pourra être publié sur le site après modération.
      </p>

      {/* Retour d'état */}
      {feedback && status === "error" && (
        <p className="text-sm text-haiti-red font-medium">{feedback}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending" || !token}
        className="w-full px-6 py-3.5 bg-haiti-red text-bg font-semibold rounded-full hover:bg-haiti-red-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Envoi…" : !token ? "Vérification en cours…" : "Envoyer mon message"}
      </button>
    </form>
  );
}
