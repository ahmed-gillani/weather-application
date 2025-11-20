import React from "react";

/**
 * Simple presentational background based on weather id
 * thunder 200-232, drizzle/rain 300-531, snow 600-622, clear 800, clouds 801-804
 */
export default function WeatherBG({ weatherId }) {
  if (!weatherId) return null;

  if (weatherId >= 200 && weatherId < 600) {
    // Rain / thunder
    return (
      <div className="bg-layer">
        <div className="bg-clouds" />
        <div className="bg-rain" />
      </div>
    );
  }

  if (weatherId === 800) {
    return (
      <div className="bg-layer">
        <div className="bg-sun" />
      </div>
    );
  }

  if (weatherId > 800) {
    return (
      <div className="bg-layer">
        <div className="bg-clouds" />
      </div>
    );
  }

  // default
  return (
    <div className="bg-layer">
      <div className="bg-clouds" />
    </div>
  );
}
