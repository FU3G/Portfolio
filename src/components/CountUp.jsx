import { useEffect, useRef, useState } from "react"

export default function CountUp({ to, duration = 1100, className, children }) {
  const [val, setVal]   = useState(0)
  const elRef           = useRef(null)
  const ran             = useRef(false)

  useEffect(() => {
    if (!to || to <= 0 || ran.current) return
    const el = elRef.current
    if (!el) return

    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || ran.current) return
      ran.current = true
      obs.disconnect()
      const start = performance.now()
      const tick = (now) => {
        const p     = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        setVal(Math.round(eased * to))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.4 })

    obs.observe(el)
    return () => obs.disconnect()
  }, [to, duration])

  return (
    <span ref={elRef} className={className}>
      {val}{children}
    </span>
  )
}
