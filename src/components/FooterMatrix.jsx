import { useEffect, useRef } from "react"

const COUNT   = 20
const LINK_D  = 100
const MOUSE_D = 120
const SPEED   = 0.4
const NODE_CLR = "160,160,170"
const ORNG_CLR = "255,105,40"

function makeNode(W, H) {
  const angle = Math.random() * Math.PI * 2
  return {
    x:  Math.random() * W,
    y:  Math.random() * H,
    vx: Math.cos(angle) * SPEED,
    vy: Math.sin(angle) * SPEED,
    r:  1.5 + Math.random() * 2,
  }
}

function dist(ax, ay, bx, by) {
  const dx = ax - bx, dy = ay - by
  return Math.sqrt(dx * dx + dy * dy)
}

export default function FooterConstellation() {
  const canvasRef = useRef(null)
  const mouse     = useRef({ x: -9999, y: -9999, over: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let nodes = []
    let raf

    function init() {
      const rect = canvas.getBoundingClientRect()
      const dpr  = window.devicePixelRatio || 1
      const W    = rect.width
      const H    = 200

      canvas.width  = W * dpr
      canvas.height = H * dpr
      canvas.style.width  = W + "px"
      canvas.style.height = H + "px"

      ctx.scale(dpr, dpr)

      nodes = Array.from({ length: COUNT }, () => makeNode(W, H))
    }

    function loop() {
      const dpr = window.devicePixelRatio || 1
      const W   = canvas.width  / dpr
      const H   = canvas.height / dpr

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Move + bounce
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy
        if (n.x <= 0) { n.vx =  Math.abs(n.vx); n.x = 0 }
        if (n.x >= W) { n.vx = -Math.abs(n.vx); n.x = W }
        if (n.y <= 0) { n.vy =  Math.abs(n.vy); n.y = 0 }
        if (n.y >= H) { n.vy = -Math.abs(n.vy); n.y = H }
      }

      const { x: mx, y: my, over } = mouse.current

      // Tag nodes near mouse
      const hot = new Set()
      if (over) {
        for (let i = 0; i < nodes.length; i++) {
          if (dist(nodes[i].x, nodes[i].y, mx, my) < MOUSE_D) hot.add(i)
        }
      }

      // Node–node lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = dist(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y)
          if (d < LINK_D) {
            ctx.strokeStyle = `rgba(${NODE_CLR},${(1 - d / LINK_D) * 0.4})`
            ctx.lineWidth   = 0.8
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Mouse–node lines (orange)
      if (over) {
        for (const i of hot) {
          const d = dist(nodes[i].x, nodes[i].y, mx, my)
          ctx.strokeStyle = `rgba(${ORNG_CLR},${(1 - d / MOUSE_D) * 0.85})`
          ctx.lineWidth   = 1
          ctx.beginPath()
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(mx, my)
          ctx.stroke()
        }
      }

      // Nœuds
      for (let i = 0; i < nodes.length; i++) {
        const n  = nodes[i]
        const hi = hot.has(i)
        const r  = n.r ?? 2.5

        // Halo extérieur
        ctx.beginPath()
        ctx.arc(n.x, n.y, r + 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${hi ? ORNG_CLR : NODE_CLR},${hi ? 0.12 : 0.07})`
        ctx.fill()

        // Point central
        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fillStyle   = `rgba(${hi ? ORNG_CLR : NODE_CLR},${hi ? 1 : 0.85})`
        ctx.shadowColor = `rgba(${hi ? ORNG_CLR : NODE_CLR},${hi ? 0.8 : 0.5})`
        ctx.shadowBlur  = hi ? 12 : 6
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // Curseur souris
      if (over) {
        ctx.beginPath()
        ctx.arc(mx, my, 4, 0, Math.PI * 2)
        ctx.fillStyle   = `rgba(${ORNG_CLR},1)`
        ctx.shadowColor = `rgba(${ORNG_CLR},0.7)`
        ctx.shadowBlur  = 10
        ctx.fill()
        ctx.shadowBlur = 0
      }

      raf = requestAnimationFrame(loop)
    }

    function onMove(e) {
      const r = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top, over: true }
    }
    function onLeave() { mouse.current.over = false }

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf)
      init()
      raf = requestAnimationFrame(loop)
    })

    ro.observe(canvas)
    canvas.addEventListener("mousemove", onMove)
    canvas.addEventListener("mouseleave", onLeave)

    init()
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener("mousemove", onMove)
      canvas.removeEventListener("mouseleave", onLeave)
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