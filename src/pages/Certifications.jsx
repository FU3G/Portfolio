// Certifications.jsx — Section "Certifications"
//
// Deux colonnes :
//  - Gauche  : certifications obtenues (OBTAINED)
//  - Droite  : certifications en cours (IN_PROGRESS) + profil TryHackMe
//
// Les barres de progression des certifs "en cours" s'animent au scroll :
// quand la section entre dans le viewport, `shown` passe à true et
// le CSS transition sur la width fait glisser les barres.

import { useEffect, useRef, useState } from "react"

// ─── Certifications obtenues ─────────────────────────────────────────────────
const OBTAINED = [
  {
    id:     "ccna",
    code:   "CCNA",
    name:   "Cisco CCNA",
    date:   "Mars 2023",
    expiry: "2026",
    color:  "#1ba0d7",
    bg:     "rgba(27,160,215,.13)",
  },
  {
    id:     "netplus",
    code:   "N+",
    name:   "CompTIA Network+",
    date:   "Sept 2022",
    expiry: "2025",
    color:  "#539e43",
    bg:     "rgba(83,158,67,.13)",
  },
  {
    id:     "az104",
    code:   "AZ",
    name:   "Azure Administrator AZ-104",
    date:   "Janv 2024",
    expiry: "2026",
    color:  "#0078d4",
    bg:     "rgba(0,120,212,.13)",
  },
]

// ─── Certifications en préparation ───────────────────────────────────────────
// percent : avancement estimé (0-100), affiché via une barre animée
const IN_PROGRESS = [
  {
    id:      "ccnp",
    code:    "CCNP",
    name:    "Cisco CCNP Enterprise",
    preview: "T3 2026",
    percent: 65,
    color:   "#f7a040",
  },
  {
    id:      "secplus",
    code:    "Sec+",
    name:    "CompTIA Security+",
    preview: "T4 2026",
    percent: 30,
    color:   "#8b5cf6",
  },
]

function Certifications() {
  const sectionRef = useRef(null)
  // shown = true quand la section est visible → déclenche l'animation des barres
  const [shown, setShown] = useState(false)

  // Observe la section et bascule `shown` dès qu'elle entre dans le viewport
  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect() // on n'observe qu'une seule fois
        }
      },
      { threshold: 0.15 } // 15% de la section visible suffit
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="certifications" id="certifications" ref={sectionRef}>
      <div className="container">

        {/* En-tête de section */}
        <p className="section-label">Accréditations</p>
        <h2 className="section-title">Certifications</h2>
        <p className="section-sub">
          Preuves concrètes de compétences techniques validées par des organismes internationaux.
        </p>

        <div className="cert-layout" style={{ marginTop: 48 }}>

          {/* ── Colonne gauche : certifications obtenues ── */}
          <div>
            <p className="cert-section-title">Certifications obtenues</p>
            <div className="cert-list">
              {OBTAINED.map(cert => (
                <div key={cert.id} className="cert-item reveal">
                  <span className="cert-icon" style={{ background: cert.bg, color: cert.color }}>
                    {cert.code}
                  </span>
                  <div className="cert-info">
                    <p className="cert-name">{cert.name}</p>
                    <p className="cert-meta">Obtenu · {cert.date} · Expire {cert.expiry}</p>
                  </div>
                  <span className="cert-active">Actif</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Colonne droite : en préparation + TryHackMe ── */}
          <div>
            <p className="cert-section-title">En préparation</p>
            <div className="cert-progress-list">
              {IN_PROGRESS.map(cert => (
                <div key={cert.id} className="cert-progress-item reveal">
                  <div className="cert-progress-row">
                    <span className="cert-icon" style={{ background: `${cert.color}18`, color: cert.color }}>
                      {cert.code}
                    </span>
                    <div className="cert-info">
                      <p className="cert-name">{cert.name}</p>
                      <p className="cert-meta">Prévu · {cert.preview}</p>
                    </div>
                    <span className="cert-pct">{cert.percent}%</span>
                  </div>

                  {/* Barre de progression : la width passe de 0% à cert.percent%
                      quand `shown` devient true (transition CSS définie dans global.css) */}
                  <div className="cert-bar-wrap">
                    <div
                      className="cert-bar"
                      style={{
                        width:      shown ? `${cert.percent}%` : "0%",
                        background: cert.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* TryHackMe */}
            <div style={{ marginTop: 20 }}>
              <p className="cert-section-title">TryHackMe</p>
              <div className="thm-card reveal">
                <div className="thm-badge">THM</div>
                <div className="thm-info">
                  <p className="thm-name">@FW3G0</p>
                  <p className="thm-rank">Hacker · Top 5%</p>
                </div>
                <div className="thm-stats">
                  <div className="thm-stat">
                    <p className="thm-stat-n">45+</p>
                    <p className="thm-stat-l">Rooms</p>
                  </div>
                  <div className="thm-stat">
                    <p className="thm-stat-n">30+</p>
                    <p className="thm-stat-l">Streak</p>
                  </div>
                </div>
                <a
                  href="https://tryhackme.com/p/FW3G0"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost"
                  style={{ padding: "7px 14px", fontSize: 12 }}
                >
                  Profil ↗
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Certifications
