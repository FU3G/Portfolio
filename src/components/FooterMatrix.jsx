// FooterMatrix.jsx — Animation constellation dans le footer
//
// Dessine sur un <canvas> :
//  - 20 points (nœuds) qui se déplacent en rebondissant sur les bords
//  - Des lignes grises entre les nœuds proches (< 100px)
//  - Au survol de la souris :
//      → Les nœuds proches (< 120px) deviennent orange
//      → Des lignes oranges relient la souris à ces nœuds
//      → Un point orange suit le curseur
//
// Le canvas se redimensionne automatiquement avec ResizeObserver.

import { useEffect, useRef } from "react"

// ─── Constantes de configuration ─────────────────────────────────────────────

const NODE_COUNT    = 20     // nombre de points
const LINK_DISTANCE = 100    // distance max pour tracer une ligne entre 2 nœuds (px)
const MOUSE_RADIUS  = 120    // distance max pour réagir au survol de la souris (px)
const SPEED         = 0.4    // vitesse de déplacement des nœuds (px/frame)

const COLOR_GRAY   = "160,160,170"  // couleur des nœuds et lignes normaux (R,G,B)
const COLOR_ORANGE = "255,105,40"   // couleur au survol de la souris (R,G,B)

// ─── Fonctions utilitaires ────────────────────────────────────────────────────

// Crée un nœud avec une position et une vélocité aléatoires
function createNode(width, height) {
  const angle = Math.random() * Math.PI * 2 // direction aléatoire
  return {
    x:  Math.random() * width,
    y:  Math.random() * height,
    vx: Math.cos(angle) * SPEED, // vélocité horizontale
    vy: Math.sin(angle) * SPEED, // vélocité verticale
    r:  1.5 + Math.random() * 2, // rayon du point (entre 1.5 et 3.5px)
  }
}

// Calcule la distance euclidienne entre deux points
function distance(ax, ay, bx, by) {
  const dx = ax - bx
  const dy = ay - by
  return Math.sqrt(dx * dx + dy * dy)
}

// ─── Composant ────────────────────────────────────────────────────────────────

export default function FooterConstellation() {
  const canvasRef = useRef(null)
  // Position de la souris. x/y très négatifs = souris hors du canvas
  const mouseRef  = useRef({ x: -9999, y: -9999, over: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")

    let nodes = []
    let animationFrameId

    // Initialise le canvas aux bonnes dimensions et crée les nœuds
    function init() {
      const rect = canvas.getBoundingClientRect()
      const dpr  = window.devicePixelRatio || 1
      const W    = rect.width
      const H    = 200

      // Le canvas physique est plus grand (× dpr) pour les écrans Retina
      canvas.width        = W * dpr
      canvas.height       = H * dpr
      canvas.style.width  = W + "px"
      canvas.style.height = H + "px"
      ctx.scale(dpr, dpr)

      nodes = Array.from({ length: NODE_COUNT }, () => createNode(W, H))
    }

    // Boucle de rendu appelée ~60× par seconde
    function loop() {
      const dpr = window.devicePixelRatio || 1
      const W   = canvas.width  / dpr
      const H   = canvas.height / dpr

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 1) Déplacer les nœuds et les faire rebondir sur les bords
      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy
        if (node.x <= 0) { node.vx =  Math.abs(node.vx); node.x = 0 }
        if (node.x >= W) { node.vx = -Math.abs(node.vx); node.x = W }
        if (node.y <= 0) { node.vy =  Math.abs(node.vy); node.y = 0 }
        if (node.y >= H) { node.vy = -Math.abs(node.vy); node.y = H }
      }

      const { x: mouseX, y: mouseY, over: isHovered } = mouseRef.current

      // 2) Identifier les nœuds proches de la souris (seront colorés en orange)
      const hotNodes = new Set()
      if (isHovered) {
        nodes.forEach((node, i) => {
          if (distance(node.x, node.y, mouseX, mouseY) < MOUSE_RADIUS) {
            hotNodes.add(i)
          }
        })
      }

      // 3) Tracer les lignes nœud-à-nœud (grises, opacité proportionnelle à la distance)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = distance(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y)
          if (d < LINK_DISTANCE) {
            const opacity = (1 - d / LINK_DISTANCE) * 0.4
            ctx.strokeStyle = `rgba(${COLOR_GRAY},${opacity})`
            ctx.lineWidth   = 0.8
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // 4) Tracer les lignes souris-à-nœud (orange) quand la souris est sur le canvas
      if (isHovered) {
        for (const i of hotNodes) {
          const d = distance(nodes[i].x, nodes[i].y, mouseX, mouseY)
          const opacity = (1 - d / MOUSE_RADIUS) * 0.85
          ctx.strokeStyle = `rgba(${COLOR_ORANGE},${opacity})`
          ctx.lineWidth   = 1
          ctx.beginPath()
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(mouseX, mouseY)
          ctx.stroke()
        }
      }

      // 5) Dessiner les nœuds (halo + point central)
      for (let i = 0; i < nodes.length; i++) {
        const node   = nodes[i]
        const isHot  = hotNodes.has(i)
        const color  = isHot ? COLOR_ORANGE : COLOR_GRAY
        const radius = node.r ?? 2.5

        // Halo flou autour du nœud
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius + 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color},${isHot ? 0.12 : 0.07})`
        ctx.fill()

        // Point central avec glow
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
        ctx.fillStyle   = `rgba(${color},${isHot ? 1 : 0.85})`
        ctx.shadowColor = `rgba(${color},${isHot ? 0.8 : 0.5})`
        ctx.shadowBlur  = isHot ? 12 : 6
        ctx.fill()
        ctx.shadowBlur = 0 // reset pour ne pas affecter les tracés suivants
      }

      // 6) Point orange qui suit la souris
      if (isHovered) {
        ctx.beginPath()
        ctx.arc(mouseX, mouseY, 4, 0, Math.PI * 2)
        ctx.fillStyle   = `rgba(${COLOR_ORANGE},1)`
        ctx.shadowColor = `rgba(${COLOR_ORANGE},0.7)`
        ctx.shadowBlur  = 10
        ctx.fill()
        ctx.shadowBlur = 0
      }

      animationFrameId = requestAnimationFrame(loop)
    }

    // Mise à jour de la position de la souris dans la ref
    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x:    e.clientX - rect.left,
        y:    e.clientY - rect.top,
        over: true,
      }
    }
    function onMouseLeave() {
      mouseRef.current.over = false
    }

    // Redimensionnement automatique si le footer change de taille
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(animationFrameId)
      init()
      animationFrameId = requestAnimationFrame(loop)
    })

    resizeObserver.observe(canvas)
    canvas.addEventListener("mousemove",  onMouseMove)
    canvas.addEventListener("mouseleave", onMouseLeave)

    init()
    animationFrameId = requestAnimationFrame(loop)

    // Nettoyage quand le composant est démonté
    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      canvas.removeEventListener("mousemove",  onMouseMove)
      canvas.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="footer-matrix"
      style={{ display: "block", width: "100%", height: "200px" }}
    />
  )
}
