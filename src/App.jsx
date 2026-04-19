import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Hero from "./pages/Hero"
import Experience from "./pages/Experience"
import Projects from "./pages/Projects"
import Certifications from "./pages/Certifications"
import Contact from "./pages/Contact"

function App() {
  useEffect(() => {
    const cards = document.querySelectorAll(".metric")
    const handlers = []
    cards.forEach(card => {
      const move = e => {
        const r = card.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width  - 0.5
        const y = (e.clientY - r.top)  / r.height - 0.5
        card.style.transform = `perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) scale(1.02)`
      }
      const leave = () => { card.style.transform = "" }
      card.addEventListener("mousemove", move)
      card.addEventListener("mouseleave", leave)
      handlers.push({ card, move, leave })
    })
    return () => handlers.forEach(({ card, move, leave }) => {
      card.removeEventListener("mousemove", move)
      card.removeEventListener("mouseleave", leave)
    })
  }, [])

  const [showTop, setShowTop] = useState(false)
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]:not(#hero)")
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.dataset.visible = "true"
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.06 }
    )
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <div className="bg-grain" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <button
        className={`back-to-top${showTop ? " back-to-top--visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Remonter en haut"
      >
        <span className="btt-arrows">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
        </span>
      </button>
    </>
  )
}

export default App
