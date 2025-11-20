import React, { useState } from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";

export default function SearchBar({ onSearch, onUseLocation, loading }) {
  const [q, setQ] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!q.trim()) return;
    onSearch(q.trim());
    setQ("");
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 12 }}>
      <input
        className="input"
        placeholder="Search...!"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="City"
      />
      <button className="button" type="submit" disabled={loading}>
        <FiSearch style={{ marginRight: 6 }} /> Search
      </button>

      <button
        type="button"
        className="button"
        onClick={() => {
          if (!navigator.geolocation) return alert("Geolocation not available");
          navigator.geolocation.getCurrentPosition(
            (pos) => onUseLocation && onUseLocation(pos.coords.latitude, pos.coords.longitude),
            () => alert("Could not get location or permission denied")
          );
        }}
        disabled={loading}
        style={{ background: "linear-gradient(90deg,#06b6d4,#0ea5b7)" }}
      >
        <FiMapPin style={{ marginRight: 6 }} /> Use my location
      </button>
    </form>
  );
}
