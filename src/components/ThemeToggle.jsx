// ThemeToggle.jsx — Bouton bascule clair / sombre
//
// Fonctionnement :
//  - Le thème est stocké dans localStorage pour être mémorisé entre les visites.
//  - Il est appliqué via l'attribut data-theme sur la balise <html>.
//  - Le CSS dans global.css lit cet attribut pour choisir les bonnes variables
//    de couleur (--bg, --text, --accent, etc.).
//  - Une animation de spin dure 450ms après chaque clic.

import { useEffect, useState } from "react"

// Icône soleil (mode clair)
const SunIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2"  x2="12" y2="5"  />
    <line x1="12" y1="19" x2="12" y2="22" />
    <line x1="4.22"  y1="4.22"  x2="6.34"  y2="6.34"  />
    <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
    <line x1="2"  y1="12" x2="5"  y2="12" />
    <line x1="19" y1="12" x2="22" y2="12" />
    <line x1="4.22"  y1="19.78" x2="6.34"  y2="17.66" />
    <line x1="17.66" y1="6.34"  x2="19.78" y2="4.22"  />
  </svg>
)

// Icône lune (mode sombre)
const MoonIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

function ThemeToggle() {
  const [theme,    setTheme]    = useState("light")
  const [spinning, setSpinning] = useState(false)

  // Au premier chargement : on lit le thème sauvegardé dans localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute("data-theme", savedTheme)
    }
  }, [])

  // Appelé au clic — bascule entre "light" et "dark"
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)

    // Animation de rotation de l'icône pendant 450ms
    setSpinning(true)
    setTimeout(() => setSpinning(false), 450)
  }

  return (
    <button
      className={`theme-toggle${theme === "dark" ? " theme-toggle--dark" : ""}`}
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Activer le mode sombre" : "Activer le mode clair"}
    >
      <span className="theme-toggle-thumb">
        {/* En mode clair → on propose la lune ; en mode sombre → on propose le soleil */}
        <span className={`theme-icon${spinning ? " theme-icon--spin" : ""}`}>
          {theme === "light" ? <MoonIcon /> : <SunIcon />}
        </span>
      </span>
    </button>
  )
}

export default ThemeToggle
