import React from "react";

export default function WeatherCard({ data }) {
  if (!data) return null;
  const { name, sys, main, weather } = data;
  const icon = weather?.[0]?.icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  return (
    <div className="card" style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <div>
        <img src={iconUrl} alt={weather?.[0]?.description} width={100} height={100} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 20, fontWeight: 700 }}>{name}, {sys?.country}</div>
        <div style={{ fontSize: 36, fontWeight: 800, margin: "8px 0" }}>{Math.round(main.temp)}°C</div>
        <div className="muted" style={{ marginBottom: 6 }}>{weather?.[0]?.description}</div>
        <div className="muted">Feels like {Math.round(main.feels_like)}°C • Humidity {main.humidity}% • Wind {Math.round(data.wind?.speed)} m/s</div>
      </div>
    </div>
  );
}
