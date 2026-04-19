import { useEffect, useRef } from "react"
import createGlobe from "cobe"

// Taille d'affichage en px (CSS). Le canvas réel sera SIZE × devicePixelRatio.
const SIZE = 250

export default function Globe() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1

    // Thèmes : valeurs selon le mode clair / sombre.
    // Pour personnaliser : modifier les deux objets ci-dessous.
    const THEMES = {
      light: {
        dark:          0,
        baseColor:     [1, 1, 1],
        glowColor:     [0.8, 0.8, 0.8],
        mapBrightness: 10,
      },
      dark: {
        dark:          1,
        baseColor:     [0.149, 0.149, 0.141],
        glowColor:     [0.149, 0.149, 0.141],
        mapBrightness: 10,
      },
    }

    // Lit le thème actuel depuis l'attribut data-theme du <html>.
    const getTheme = () =>
      document.documentElement.getAttribute("data-theme") === "dark"
        ? THEMES.dark
        : THEMES.light

    // Angle de rotation horizontal au démarrage (en radians).
    // 0 = face Atlantique, Math.PI = face Pacifique.
    let phi = 0.6
    let raf

    const globe = createGlobe(canvas, {
      // Résolution écran (1 = normal, 2 = retina). Auto-détecté ci-dessus.
      devicePixelRatio: dpr,

      // Dimensions du canvas en px logiques (multiplié par DPR en interne).
      width:  SIZE,
      height: SIZE,

      // Position de départ.
      phi,
      theta: 0.25, // légère inclinaison vers le nord (0 = équateur centré)

      // Intensité de la lumière ambiante sur les continents.
      diffuse: 1,

      // Nombre de points utilisés pour dessiner la carte.
      // 8000 = rapide, 16000 = équilibré, 30000 = haute qualité.
      mapSamples: 20000,

      // Couleur des marqueurs de villes [R, G, B].
      // [0.13, 0.83, 0.35] = vert fluo (#22d35a).
      markerColor: [0.13, 0.83, 0.35],

      // Liste des villes à marquer.
      // location: [latitude, longitude] — cherche "lat lon <ville>" sur Google.
      // size: rayon du point (0.03 = petit, 0.1 = grand).
      markers: [
        { location: [43.3,  5.4],  size: 0.07 }, // Marseille
        { location: [45.5, -73.6], size: 0.07 }, // Montréal
      ],

      // Thème initial.
      ...getTheme(),
    })

    // Boucle d'animation : incrémente phi à chaque frame pour faire tourner le globe.
    // Augmenter 0.02 pour accélérer la rotation, diminuer pour ralentir.
    function tick() {
      phi += 0.02
      globe.update({ phi, ...getTheme() })
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    // Nettoyage quand le composant est démonté.
    return () => {
      cancelAnimationFrame(raf)
      globe.destroy()
    }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{
        display:      "block",
        margin:       "6px auto 0",
        width:        SIZE,
        height:       SIZE,
        borderRadius: "50%", // Masque les coins pour un rendu circulaire propre.
      }}
    />
  )
}
