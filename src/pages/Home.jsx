import { Link } from "react-router-dom"
import QRCodeWidget from "../components/QRCodeWidget"
import avatar from "../assets/avatar.png"

const stack = [
  { label: "JavaScript / Node.js",  color: "#f7df1e" },
  { label: "React",                 color: "#61dafb" },
  { label: "Cisco IOS · TCP/IP",    color: "#1ba0d7" },
  { label: "Linux · pfSense",       color: "#e95420" },
  { label: "Ansible · Scripting",   color: "#539e43" },
  { label: "Zabbix · Grafana",      color: "#e67e22" },
]

const featured = [
  {
    id: "proj-001",
    title: "Portfolio React",
    desc: "Ce portfolio — SPA React avec bento grid, glassmorphism et thème clair/sombre.",
    techs: ["React", "Vite", "CSS"],
    tag: "Web",
    url: "/projects",
  },
  {
    id: "proj-002",
    title: "Dashboard Analytics",
    desc: "Interface de visualisation de données avec graphiques interactifs.",
    techs: ["React", "Chart.js"],
    tag: "Stage",
    url: "/projects",
  },
]

function Home() {
  return (
    <div className="bento-grid">

      {/* Intro */}
      <div className="bento-card col-2">
        <div className="bento-intro-top">
          <div className="bento-intro-text">
            <p className="bento-eyebrow">Administrateur Réseau</p>
            <h1 className="bento-title">
              <span className="text-gradient">Hello,<br />I'm </span>
              <span className="text-accent">Greg</span>.
            </h1>
          </div>
          <img src={avatar} alt="Greg" className="bento-avatar" />
        </div>
        <p className="bento-subtitle">
          Administrateur Réseau &amp; étudiant en{" "}
          <span className="text-accent">Mastère MIIM</span> — je me forme au développement web avec{" "}
          <span className="text-accent">JavaScript</span> &amp; <span className="text-accent">React</span>.
        </p>
        <div className="bento-actions">
          <Link to="/contact" className="button-primary">Me contacter</Link>
          <Link to="/projects" className="button-secondary">Voir mes projets</Link>
        </div>
      </div>

      {/* Statut */}
      <div className="bento-card">
        <p className="bento-eyebrow">Statut</p>
        <div className="bento-status">
          <span className="status-dot"></span>
          <span>Disponible</span>
        </div>
        <p className="bento-status-detail">Alternance · Stage<br />Île-de-France · Remote</p>
      </div>

      {/* Stat — Expérience */}
      <div className="bento-card bento-stat-card">
        <p className="bento-eyebrow">Expérience</p>
        <p className="stat-value">9 ans</p>
        <p className="stat-sub">d'expérience professionnelle</p>
      </div>

      {/* Stat — Alternance */}
      <div className="bento-card bento-stat-card">
        <p className="bento-eyebrow">Alternance</p>
        <p className="stat-value">CNRS</p>
        <p className="stat-sub">Admin réseau · Île-de-France</p>
      </div>

      {/* Stat — Formation */}
      <div className="bento-card bento-stat-card">
        <p className="bento-eyebrow">Formation</p>
        <p className="stat-value">Bac+5</p>
        <p className="stat-sub">Mastère MIIM · M2i</p>
      </div>

      {/* Stack principale — row-span 2 */}
      <div className="bento-card row-2">
        <p className="bento-eyebrow">Stack principale</p>
        <div className="stack-list">
          {stack.map((item) => (
            <div key={item.label} className="stack-item">
              <span className="stack-dot" style={{ background: item.color }}></span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Liens + QR fusionnés */}
      <div className="bento-card">
        <p className="bento-eyebrow">Liens</p>
        <div className="bento-link-list">
          <a href="https://github.com/FU3G" target="_blank" rel="noreferrer" className="bento-link-item">
            GitHub ↗
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="bento-link-item">
            LinkedIn ↗
          </a>
        </div>
        <div className="bento-qr-merged">
          <QRCodeWidget color="#ff6928" size={72} />
          <p className="bento-qr-label">vCard</p>
        </div>
      </div>

      {/* Certifications */}
      <div className="bento-card bento-stat-card">
        <p className="bento-eyebrow">Certifications</p>
        <p className="stat-value">En cours</p>
        <div className="tech-grid" style={{ marginTop: "4px" }}>
          <span className="tech-badge">CCNA</span>
          <span className="tech-badge">Net+</span>
        </div>
      </div>

      {/* Projets — 2 réalisations */}
      <div className="bento-card bento-card-cta col-2">
        <p className="bento-eyebrow">Projets</p>
        <div className="bento-projects-list">
          {featured.map((p, i) => (
            <div key={p.id} className={`bento-project-item${i < featured.length - 1 ? " bento-project-item--sep" : ""}`}>
              <div className="bento-project-top">
                <span className="bento-project-title">{p.title}</span>
                <span className="tech-badge">{p.tag}</span>
              </div>
              <p className="bento-project-desc">{p.desc}</p>
              <div className="tech-grid">
                {p.techs.map(t => <span key={t} className="tech-badge">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
        <Link to="/projects" className="bento-cta-link">
          Voir tous les projets →
        </Link>
      </div>

    </div>
  )
}

export default Home
