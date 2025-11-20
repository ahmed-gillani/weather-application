// src/services/weather.js
import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE = "https://api.openweathermap.org/data/2.5";

export async function getWeatherByCity(city) {
  if (!city) return null;
  const res = await axios.get(`${BASE}/weather`, {
    params: { q: city, appid: API_KEY, units: "metric" },
  });
  return res.data;
}

export async function getWeatherByCoords(lat, lon) {
  const res = await axios.get(`${BASE}/weather`, {
    params: { lat, lon, appid: API_KEY, units: "metric" },
  });
  return res.data;
}

export async function getForecastByCity(city) {
  const res = await axios.get(`${BASE}/forecast`, {
    params: { q: city, appid: API_KEY, units: "metric" },
  });
  return res.data;
}

export async function getForecastByCoords(lat, lon) {
  const res = await axios.get(`${BASE}/forecast`, {
    params: { lat, lon, appid: API_KEY, units: "metric" },
  });
  return res.data;
}

/** group 3-hour forecast list into daily summaries */
export function groupForecastToDaily(list = []) {
  const days = {};
  list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!days[date]) days[date] = [];
    days[date].push(item);
  });

  const out = Object.keys(days)
    .map((date) => {
      const entries = days[date];
      const temps = entries.map((e) => e.main.temp);
      const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
      const humidities = entries.map((e) => e.main.humidity);
      const avgHumidity = Math.round(humidities.reduce((a, b) => a + b, 0) / humidities.length);
      const avgWind = entries.reduce((s, e) => s + e.wind.speed, 0) / entries.length;
      const midday = entries.find((e) => e.dt_txt.includes("12:00:00")) || entries[Math.floor(entries.length / 2)];
      return {
        date,
        temp: Math.round(avgTemp),
        humidity: avgHumidity,
        wind: Math.round(avgWind),
        weather: midday.weather[0],
      };
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  return out;
}
