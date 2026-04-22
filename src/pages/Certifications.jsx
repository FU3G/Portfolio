import { useEffect, useRef, useState } from "react"

const OBTAINED = [
  { id: "ccna",   code: "CCNA", name: "Cisco CCNA",                  date: "Mars 2023",  expiry: "2026", color: "#1ba0d7", bg: "rgba(27,160,215,.13)" },
  { id: "netplus",code: "N+",   name: "CompTIA Network+",            date: "Sept 2022",  expiry: "2025", color: "#539e43", bg: "rgba(83,158,67,.13)"  },
  { id: "az104",  code: "AZ",   name: "Azure Administrator AZ-104",  date: "Janv 2024",  expiry: "2026", color: "#0078d4", bg: "rgba(0,120,212,.13)"  },
]

const IN_PROGRESS = [
  { id: "ccnp",    code: "CCNP",  name: "Cisco CCNP Enterprise",   preview: "T3 2026", percent: 65, color: "#f7a040" },
  { id: "secplus", code: "Sec+",  name: "CompTIA Security+",        preview: "T4 2026", percent: 30, color: "#8b5cf6" },
]

function Certifications() {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="certifications" id="certifications" ref={ref}>
      <div className="container">

        <p className="section-label">Accréditations</p>
        <h2 className="section-title">Certifications</h2>
        <p className="section-sub">
          Preuves concrètes de compétences techniques validées par des organismes internationaux.
        </p>

        <div className="cert-layout" style={{ marginTop: 48 }}>

          {/* Obtained */}
          <div>
            <p className="cert-section-title">Certifications obtenues</p>
            <div className="cert-list">
              {OBTAINED.map(c => (
                <div key={c.id} className="cert-item reveal">
                  <span className="cert-icon" style={{ background: c.bg, color: c.color }}>{c.code}</span>
                  <div className="cert-info">
                    <p className="cert-name">{c.name}</p>
                    <p className="cert-meta">Obtenu · {c.date} · Expire {c.expiry}</p>
                  </div>
                  <span className="cert-active">Actif</span>
                </div>
              ))}
            </div>
          </div>

          {/* In progress */}
          <div>
            <p className="cert-section-title">En préparation</p>
            <div className="cert-progress-list">
              {IN_PROGRESS.map(c => (
                <div key={c.id} className="cert-progress-item reveal">
                  <div className="cert-progress-row">
                    <span className="cert-icon" style={{ background: `${c.color}18`, color: c.color }}>{c.code}</span>
                    <div className="cert-info">
                      <p className="cert-name">{c.name}</p>
                      <p className="cert-meta">Prévu · {c.preview}</p>
                    </div>
                    <span className="cert-pct">{c.percent}%</span>
                  </div>
                  <div className="cert-bar-wrap">
                    <div
                      className="cert-bar"
                      style={{ width: shown ? `${c.percent}%` : "0%", background: c.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* TryHackMe */}
            <div style={{ marginTop: 20 }}>
              <p className="cert-section-title">TryHackMe</p>
              <div className="thm-card reveal" style={{ gridColumn: "span 1" }}>
                <div className="thm-badge">THM</div>
                <div className="thm-info">
                  <p className="thm-name">@username</p>
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
                <a href="https://tryhackme.com/p/FW3G0" target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ padding: "7px 14px", fontSize: 12 }}>
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
