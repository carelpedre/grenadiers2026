// Weather component using Open-Meteo (free, no API key required)
// Shows current temperature, conditions, and a simple icon for the stadium location.

import { useEffect, useState } from "react";

// Weather code descriptions (subset of WMO codes)
const weatherCodes = {
  0: { label: "Ciel dégagé", icon: "☀️" },
  1: { label: "Peu nuageux", icon: "🌤️" },
  2: { label: "Partiellement nuageux", icon: "⛅" },
  3: { label: "Couvert", icon: "☁️" },
  45: { label: "Brouillard", icon: "🌫️" },
  48: { label: "Brouillard", icon: "🌫️" },
  51: { label: "Bruine", icon: "🌦️" },
  53: { label: "Bruine", icon: "🌦️" },
  55: { label: "Bruine", icon: "🌦️" },
  61: { label: "Pluie faible", icon: "🌧️" },
  63: { label: "Pluie", icon: "🌧️" },
  65: { label: "Forte pluie", icon: "🌧️" },
  71: { label: "Faible chute de neige", icon: "🌨️" },
  73: { label: "Neige", icon: "🌨️" },
  75: { label: "Fortes chutes de neige", icon: "🌨️" },
  80: { label: "Averses", icon: "🌧️" },
  81: { label: "Averses", icon: "🌧️" },
  82: { label: "Fortes averses", icon: "⛈️" },
  95: { label: "Orage", icon: "⛈️" },
  96: { label: "Orage", icon: "⛈️" },
  99: { label: "Orage", icon: "⛈️" },
};

export default function StadiumWeather({ lat, lng, city, compact = false }) {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!lat || !lng) return;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code&temperature_unit=celsius`;
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (data && data.current) {
          setWeather({
            temp: Math.round(data.current.temperature_2m),
            code: data.current.weather_code,
          });
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true));
  }, [lat, lng]);

  if (error) return null;

  if (!weather) {
    return (
      <div className={compact ? "text-xs text-muted" : "text-sm text-muted"}>
        Chargement de la météo…
      </div>
    );
  }

  const condition = weatherCodes[weather.code] || { label: "—", icon: "🌡️" };

  if (compact) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-muted">
        <span>{condition.icon}</span>
        <span className="tabular-nums">{weather.temp}°C</span>
        <span className="text-muted/70">à {city}</span>
      </span>
    );
  }

  return (
    <div className="inline-flex items-center gap-3 bg-bg border border-line rounded-full px-4 py-2">
      <span className="text-xl">{condition.icon}</span>
      <div>
        <p className="font-display text-lg tabular-nums leading-none">{weather.temp}°C</p>
        <p className="text-xs text-muted leading-none mt-0.5">
          {condition.label} · {city}
        </p>
      </div>
    </div>
  );
}
