// Globe.jsx — Globe 3D interactif (bibliothèque cobe)
//
// Cobe est une bibliothèque WebGL légère qui dessine un globe rotatif
// dans un élément <canvas>. Le globe tourne automatiquement et s'adapte
// au thème clair/sombre grâce à getTheme() appelée à chaque frame.
//
// Pour personnaliser :
//   - Villes    → tableau `markers` (latitude, longitude, taille du point)
//   - Couleurs  → objets THEMES.light / THEMES.dark
//   - Vitesse   → constante ROTATION_SPEED (en radians par frame)

import { useEffect, useRef } from "react"
import createGlobe from "cobe"

// Taille d'affichage en pixels CSS (le canvas réel est SIZE × devicePixelRatio)
const SIZE = 250

// Vitesse de rotation horizontale (radians ajoutés par frame ~60fps)
// 0.02 rad/frame ≈ 1 tour complet toutes les 5 secondes
const ROTATION_SPEED = 0.02

export default function Globe() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // devicePixelRatio = 2 sur les écrans Retina (rendu plus net)
    const dpr = window.devicePixelRatio || 1

    // Paramètres visuels selon le thème actif
    const THEMES = {
      light: {
        dark:          0,             // 0 = mode "jour" (continents sombres sur fond blanc)
        baseColor:     [1, 1, 1],     // couleur de base : blanc [R, G, B] entre 0 et 1
        glowColor:     [0.8, 0.8, 0.8],
        mapBrightness: 10,
      },
      dark: {
        dark:          1,             // 1 = mode "nuit" (continents clairs sur fond sombre)
        baseColor:     [0.149, 0.149, 0.141],
        glowColor:     [0.149, 0.149, 0.141],
        mapBrightness: 10,
      },
    }

    // Lit le thème depuis l'attribut data-theme du <html> (géré par ThemeToggle)
    const getTheme = () =>
      document.documentElement.getAttribute("data-theme") === "dark"
        ? THEMES.dark
        : THEMES.light

    let phi = 0.6  // angle de départ (0.6 rad ≈ vue centrée sur l'Europe/Afrique)
    let animationFrameId

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width:       SIZE,
      height:      SIZE,
      phi,
      theta:       0.25,    // légère inclinaison vers le nord (0 = équateur centré)
      diffuse:     1,       // intensité de la lumière ambiante sur les continents
      mapSamples:  20000,   // nombre de points pour dessiner la carte (plus = plus net)
      markerColor: [0.13, 0.83, 0.35], // vert fluo [R, G, B]

      // Villes marquées sur le globe.
      // location : [latitude, longitude] — cherche "lat lon <ville>" sur Google Maps.
      // size : rayon du marqueur (0.03 = petit, 0.1 = grand)
      markers: [
        { location: [43.3,  5.4],  size: 0.07 }, // Marseille
        { location: [45.5, -73.6], size: 0.07 }, // Montréal
      ],

      ...getTheme(),
    })

    // Boucle d'animation : incrémente phi à chaque frame pour faire tourner le globe
    function tick() {
      phi += ROTATION_SPEED
      globe.update({ phi, ...getTheme() })
      animationFrameId = requestAnimationFrame(tick)
    }

    animationFrameId = requestAnimationFrame(tick)

    // Nettoyage quand le composant est retiré du DOM
    return () => {
      cancelAnimationFrame(animationFrameId)
      globe.destroy()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        display:      "block",
        margin:       "6px auto 0",
        width:        SIZE,
        height:       SIZE,
        borderRadius: "50%", // masque les coins du canvas pour un rendu circulaire
      }}
    />
  )
}
