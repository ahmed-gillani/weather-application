import React from "react";

export default function ForecastCard({ day }) {
  if (!day) return null;
  const d = new Date(day.date);
  const label = d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  const iconUrl = `https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`;

  return (
    <div className="forecast-card card" style={{ padding: 10 }}>
      <div style={{ fontSize: 12 }} className="muted">{label}</div>
      <img src={iconUrl} alt={day.weather.description} style={{ width: 64, height: 64 }} />
      <div style={{ fontWeight: 700, marginTop: 6 }}>{day.temp}°C</div>
      <div className="muted" style={{ fontSize: 12 }}>Hum {day.humidity}%</div>
    </div>
  );
}
