import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import ThemeToggle from "./components/ThemeToggle";
import WeatherBG from "./components/WeatherBG";
import {
  getWeatherByCity,
  getForecastByCity,
  groupForecastToDaily,
  getWeatherByCoords,
  getForecastByCoords,
} from "./services/weather";

export default function App() {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Optional default city
    handleSearch("London");
  }, []);

  async function handleSearch(city) {
    setError(null);
    setLoading(true);
    try {
      const cur = await getWeatherByCity(city);
      setCurrent(cur);

      const fc = await getForecastByCity(city);
      const daily = groupForecastToDaily(fc.list);
      const today = new Date().toISOString().split("T")[0];
      setForecast(daily.filter(d => d.date !== today).slice(0, 5));
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || err.message || "Failed to fetch");
      setCurrent(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleUseLocation(lat, lon) {
    setError(null);
    setLoading(true);
    try {
      const cur = await getWeatherByCoords(lat, lon);
      setCurrent(cur);

      const fc = await getForecastByCoords(lat, lon);
      const daily = groupForecastToDaily(fc.list);
      const today = new Date().toISOString().split("T")[0];
      setForecast(daily.filter(d => d.date !== today).slice(0, 5));
    } catch (err) {
      console.error(err);
      setError("Failed to fetch location weather");
      setCurrent(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <WeatherBG weatherId={current?.weather?.[0]?.id} />

      <div className="container">
        <div className="header" style={{ marginBottom: 12 }}>
          <h1 style={{ margin: 0 }}>Weather App</h1>
          <ThemeToggle />
        </div>

        <SearchBar onSearch={handleSearch} onUseLocation={handleUseLocation} loading={loading} />

        {loading && (
          <div style={{ marginTop: 16 }}>
            <div className="skel-hero skeleton" />
            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
              {[...Array(5)].map((_, i) => (
                <div key={i} style={{ width: 132 }}>
                  <div className="skeleton" style={{ height: 100, borderRadius: 10 }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {error && <div style={{ marginTop: 12, color: "salmon" }}>{error}</div>}

        {!loading && current && (
          <>
            <div style={{ marginTop: 16 }}>
              <WeatherCard data={current} />
            </div>

            {forecast.length > 0 && (
              <div style={{ marginTop: 18 }}>
                <h3 style={{ marginBottom: 8 }}>5-day forecast</h3>
                <div className="forecast-row">
                  {forecast.map((d) => <ForecastCard key={d.date} day={d} />)}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
