import CountUp from "../components/CountUp"

const obtained = [
  {
    id: "ccna",
    code: "CCNA",
    name: "Cisco CCNA",
    date: "Mars 2023",
    expiry: "2026",
    color: "#1ba0d7",
    bg: "rgba(27,160,215,0.13)",
  },
  {
    id: "netplus",
    code: "N+",
    name: "CompTIA Network+",
    date: "Sept 2022",
    expiry: "2025",
    color: "#539e43",
    bg: "rgba(83,158,67,0.13)",
  },
  {
    id: "az104",
    code: "AZ",
    name: "Azure Administrator AZ-104",
    date: "Janv 2024",
    expiry: "2026",
    color: "#0078d4",
    bg: "rgba(0,120,212,0.13)",
  },
]

const inProgress = [
  {
    id: "ccnp",
    code: "CCNP",
    name: "Cisco CCNP Enterprise",
    preview: "Prévu · T3 2025",
    percent: 65,
    color: "#f7a040",
    bg: "rgba(247,160,64,0.14)",
  },
  {
    id: "secplus",
    code: "Sec+",
    name: "CompTIA Security+",
    preview: "Prévu · T4 2025",
    percent: 30,
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.14)",
  },
]

function Certifications() {
  return (
    <div className="cert-bento">

      {/* Intro */}
      <div className="bento-card col-2">
        <p className="bento-eyebrow">Certifications</p>
        <h1 className="cert-heading">
          Ce que j'ai prouvé,<br />pas juste appris.
        </h1>
      </div>

      {/* Stat obtenues */}
      <div className="bento-card bento-stat-card">
        <p className="bento-eyebrow">Obtenues</p>
        <p className="stat-value"><CountUp to={3} /></p>
        <p className="stat-sub">certifications actives</p>
      </div>

      {/* Stat en cours */}
      <div className="bento-card bento-stat-card">
        <p className="bento-eyebrow">En cours</p>
        <p className="stat-value"><CountUp to={2} /></p>
        <p className="stat-sub">en préparation</p>
      </div>

      {/* Liste certifications obtenues */}
      <div className="bento-card col-2 row-2">
        <p className="bento-eyebrow">Certifications obtenues</p>
        <div className="cert-list">
          {obtained.map((c) => (
            <div key={c.id} className="cert-row">
              <span className="cert-icon" style={{ background: c.bg, color: c.color }}>
                {c.code}
              </span>
              <div className="cert-info">
                <span className="cert-name">{c.name}</span>
                <span className="cert-meta">Obtenu · {c.date} · Expire {c.expiry}</span>
              </div>
              <span className="cert-active-badge">Actif</span>
            </div>
          ))}
        </div>
      </div>

      {/* En préparation */}
      <div className="bento-card col-2">
        <p className="bento-eyebrow">En préparation</p>
        <div className="cert-progress-list">
          {inProgress.map((c) => (
            <div key={c.id} className="cert-progress-item">
              <div className="cert-progress-top">
                <span className="cert-icon" style={{ background: c.bg, color: c.color }}>
                  {c.code}
                </span>
                <div className="cert-info">
                  <span className="cert-name">{c.name}</span>
                  <span className="cert-meta">{c.preview}</span>
                </div>
                <span className="cert-percent">{c.percent}%</span>
              </div>
              <div className="cert-bar">
                <div
                  className="cert-bar-fill"
                  style={{ width: `${c.percent}%`, background: c.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TryHackMe */}
      <div className="bento-card col-2">
        <p className="bento-eyebrow">TryHackMe</p>
        <div className="thm-profile">
          <span className="thm-badge">THM</span>
          <div className="thm-profile-info">
            {/* Remplace par ton username TryHackMe */}
            <p className="thm-username">@username</p>
            <p className="thm-rank">Rank · Hacker</p>
          </div>
          <a
            href="https://tryhackme.com"
            target="_blank"
            rel="noreferrer"
            className="proj-card-btn"
          >
            Profil ↗
          </a>
        </div>
        <div className="thm-stats">
          <div className="thm-stat-box">
            <span className="thm-stat-value">45+</span>
            <span className="thm-stat-label">Rooms</span>
          </div>
          <div className="thm-stat-box">
            <span className="thm-stat-value">Top 5%</span>
            <span className="thm-stat-label">Classement</span>
          </div>
          <div className="thm-stat-box">
            <span className="thm-stat-value">30+</span>
            <span className="thm-stat-label">Streak</span>
          </div>
        </div>
        <div className="tech-grid">
          <span className="tech-badge">Web Exploitation</span>
          <span className="tech-badge">Linux PrivEsc</span>
          <span className="tech-badge">Network Security</span>
          <span className="tech-badge">CTF</span>
        </div>
      </div>

      {/* Domaines */}
      <div className="bento-card col-2">
        <p className="bento-eyebrow">Domaines couverts</p>
        <div className="tech-grid">
          <span className="tech-badge">Réseau</span>
          <span className="tech-badge">Sécurité</span>
          <span className="tech-badge">Cloud</span>
        </div>
      </div>

      {/* Organismes */}
      <div className="bento-card col-2">
        <p className="bento-eyebrow">Organismes</p>
        <div className="cert-orgs">
          <span>Cisco Systems</span>
          <span>CompTIA</span>
          <span>Microsoft</span>
        </div>
      </div>

    </div>
  )
}

export default Certifications
