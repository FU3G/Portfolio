// App.jsx — Composant racine : définit les routes et la one-page
//
// Routes :
//   /          → One-page portfolio (Hero, Experience, Projects, Certifications, Contact)
//   /projects  → Page galerie complète (GitHub API + recherche + tri)
//
// Les effets globaux (tilt 3D, scroll-reveal, bouton retour haut) ne s'appliquent
// qu'à la one-page ("/"). Sur "/projects" ces querySelector retourneront vide.

import { useEffect, useState } from "react"
import { Routes, Route }       from "react-router-dom"

import Navbar         from "./components/Navbar"
import Footer         from "./components/Footer"
import Hero           from "./pages/Hero"
import Experience     from "./pages/Experience"
import Projects       from "./pages/Projects"
import Certifications from "./pages/Certifications"
import Contact        from "./pages/Contact"
import ProjectsPage   from "./pages/ProjectsPage"

// ─── Layout one-page ─────────────────────────────────────────────────────────
// Contient toutes les sections + les effets globaux de la home.
function OnePage() {

  // Effet 1 : Tilt 3D sur les cartes métriques au survol
  useEffect(() => {
    const cards = document.querySelectorAll(".metric")
    const handlers = []
    cards.forEach(card => {
      const onMouseMove = (e) => {
        const rect = card.getBoundingClientRect()
        const x = (e.clientX - rect.left)  / rect.width  - 0.5
        const y = (e.clientY - rect.top)   / rect.height - 0.5
        card.style.transform = `perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) scale(1.02)`
      }
      const onMouseLeave = () => { card.style.transform = "" }
      card.addEventListener("mousemove",  onMouseMove)
      card.addEventListener("mouseleave", onMouseLeave)
      handlers.push({ card, onMouseMove, onMouseLeave })
    })
    return () => {
      handlers.forEach(({ card, onMouseMove, onMouseLeave }) => {
        card.removeEventListener("mousemove",  onMouseMove)
        card.removeEventListener("mouseleave", onMouseLeave)
      })
    }
  }, [])

  // Effet 2 : Animations scroll-reveal sur les sections
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]:not(#hero)")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.visible = "true"
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.06 }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
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
      <BackToTopButton />
    </>
  )
}

// ─── Bouton retour en haut ────────────────────────────────────────────────────
function BackToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <button
      className={`back-to-top${visible ? " back-to-top--visible" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Remonter en haut de la page"
    >
      <span className="btt-arrows">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
      </span>
    </button>
  )
}

// ─── Routeur principal ────────────────────────────────────────────────────────
function App() {
  return (
    <Routes>
      {/* One-page portfolio */}
      <Route path="/"         element={<OnePage />} />

      {/* Page galerie complète — accessible via /projects */}
      <Route path="/projects" element={<ProjectsPage />} />
    </Routes>
  )
}

export default App
