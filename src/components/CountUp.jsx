// CountUp.jsx — Animation de compteur numérique
//
// Ce composant affiche un chiffre qui s'incrémente de 0 jusqu'à `to`
// quand l'élément entre dans le viewport (scroll-reveal).
//
// Props :
//   to        {number}  Valeur finale à atteindre (ex: 80)
//   duration  {number}  Durée de l'animation en ms (défaut: 1100)
//   className {string}  Classe CSS optionnelle sur le <span>
//   children  {node}    Contenu affiché après le chiffre (ex: "+")
//
// Exemple d'utilisation :
//   <CountUp to={80} />+   →  affiche "0" puis monte jusqu'à "80+"

import { useEffect, useRef, useState } from "react"

export default function CountUp({ to, duration = 1100, className, children }) {
  const [value, setValue] = useState(0)   // valeur affichée à l'écran
  const elementRef        = useRef(null)  // référence sur le <span> DOM
  const hasRun            = useRef(false) // garde-fou : n'anime qu'une seule fois

  useEffect(() => {
    if (!to || to <= 0 || hasRun.current) return
    const el = elementRef.current
    if (!el) return

    // On observe quand le <span> entre dans le viewport
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasRun.current) return

      hasRun.current = true
      observer.disconnect()

      // Animation : on calcule le pourcentage d'avancement à chaque frame
      const startTime = performance.now()

      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1)

        // Easing "ease-out cubic" : rapide au début, ralentit vers la fin
        // Formule : 1 - (1 - progress)^3
        const eased = 1 - Math.pow(1 - progress, 3)

        setValue(Math.round(eased * to))

        if (progress < 1) requestAnimationFrame(tick) // continue jusqu'à 100%
      }

      requestAnimationFrame(tick)
    }, { threshold: 0.4 }) // se déclenche quand 40% du composant est visible

    observer.observe(el)
    return () => observer.disconnect()
  }, [to, duration])

  return (
    <span ref={elementRef} className={className}>
      {value}{children}
    </span>
  )
}
