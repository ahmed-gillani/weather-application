import React, { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(prev => prev === "dark" ? "light" : "dark")}
      className="button"
      style={{ display: "flex", alignItems: "center", gap: 8, background: "transparent", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      {theme === "dark" ? <FiSun /> : <FiMoon />} {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
