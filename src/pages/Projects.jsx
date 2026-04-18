import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

const TECH_COLORS = {
  // Langages
  "JavaScript":     { color: "#d4a800", bg: "rgba(212,168,0,0.13)" },
  "TypeScript":     { color: "#3178c6", bg: "rgba(49,120,198,0.13)" },
  "Python":         { color: "#3776ab", bg: "rgba(55,118,171,0.13)" },
  "CSS":            { color: "#264de4", bg: "rgba(38,77,228,0.13)" },
  "HTML":           { color: "#e34f26", bg: "rgba(227,79,38,0.13)" },
  "Shell":          { color: "#22d35a", bg: "rgba(34,211,90,0.12)" },
  "Go":             { color: "#00acd7", bg: "rgba(0,172,215,0.12)" },
  "Rust":           { color: "#ce422b", bg: "rgba(206,66,43,0.12)" },
  "Java":           { color: "#f89820", bg: "rgba(248,152,32,0.12)" },
  "PHP":            { color: "#7b7fb5", bg: "rgba(123,127,181,0.12)" },
  "Ruby":           { color: "#cc342d", bg: "rgba(204,52,45,0.12)" },
  "C":              { color: "#888888", bg: "rgba(136,136,136,0.12)" },
  "C++":            { color: "#f34b7d", bg: "rgba(243,75,125,0.12)" },
  "YAML":           { color: "#cb171e", bg: "rgba(203,23,30,0.12)" },
  // Frameworks & outils
  "React":          { color: "#61dafb", bg: "rgba(97,218,251,0.12)" },
  "Vite":           { color: "#646cff", bg: "rgba(100,108,255,0.12)" },
  "Ansible":        { color: "#ee0000", bg: "rgba(238,0,0,0.10)" },
  "Docker":         { color: "#2496ed", bg: "rgba(36,150,237,0.12)" },
  // Réseau & infra
  "Grafana":        { color: "#f46800", bg: "rgba(244,104,0,0.12)" },
  "Zabbix":         { color: "#d40000", bg: "rgba(212,0,0,0.11)" },
  "pfSense":        { color: "#1a6aad", bg: "rgba(26,106,173,0.12)" },
  "Suricata":       { color: "#ff6928", bg: "rgba(255,105,40,0.12)" },
  "BGP":            { color: "#539e43", bg: "rgba(83,158,67,0.12)" },
  "SD-WAN":         { color: "#1ba0d7", bg: "rgba(27,160,215,0.12)" },
  "SNMP":           { color: "#6366f1", bg: "rgba(99,102,241,0.12)" },
  "Cisco IOS":      { color: "#1ba0d7", bg: "rgba(27,160,215,0.12)" },
  "Cisco Viptela":  { color: "#1ba0d7", bg: "rgba(27,160,215,0.12)" },
  "EVE-NG":         { color: "#e67e22", bg: "rgba(230,126,34,0.12)" },
  "Slack API":      { color: "#4a154b", bg: "rgba(74,21,75,0.12)" },
  "Netmiko":        { color: "#3776ab", bg: "rgba(55,118,171,0.12)" },
  "Jinja2":         { color: "#b41717", bg: "rgba(180,23,23,0.12)" },
}

function getTechStyle(name) {
  const t = TECH_COLORS[name]
  if (!t) return {}
  return { color: t.color, background: t.bg, borderColor: "transparent" }
}

const manualProjects = [
  {
    id: "m1",
    source: "manual",
    tag: "Homelab",
    tagColor: "#539e43",
    tagBg: "rgba(83,158,67,0.14)",
    title: "Segmentation VLAN & IDS",
    desc: "Infra simulée sur EVE-NG avec pfSense, 6 VLANs isolés et IDS Suricata. Supervision du trafic via Grafana.",
    techs: ["EVE-NG", "pfSense", "Suricata", "Grafana"],
    github: null,
    linkLabel: null,
  },
  {
    id: "m2",
    source: "manual",
    tag: "Pro",
    tagColor: "#6366f1",
    tagBg: "rgba(99,102,241,0.13)",
    title: "Migration SD-WAN multi-sites",
    desc: "Migration de 8 sites distants vers une architecture SD-WAN Cisco Viptela. Réduction de la latence de 40%. Confidentiel — schéma anonymisé disponible.",
    techs: ["Cisco Viptela", "SD-WAN", "BGP"],
    github: null,
    linkLabel: "Schéma",
  },
  {
    id: "m3",
    source: "manual",
    tag: "Monitoring",
    tagColor: "#e67e22",
    tagBg: "rgba(230,126,34,0.13)",
    title: "Stack monitoring Zabbix + Grafana",
    desc: "Supervision complète d'une infra de 60 équipements avec alerting Slack et dashboards temps réel. Déployable en 1 commande.",
    techs: ["Zabbix", "Grafana", "SNMP", "Slack API"],
    github: null,
    linkLabel: null,
  },
]

function ProjectCard({ project }) {
  const isGitHub = project.source === "github"

  return (
    <div className="proj-card">
      <div className="proj-card-header">
        <div className="proj-card-title-row">
          <span className={`proj-dot ${isGitHub ? "proj-dot--green" : "proj-dot--blue"}`} />
          <h3 className="proj-card-title">{project.title}</h3>
        </div>
        {project.tag && (
          <span
            className="proj-card-tag"
            style={{ background: project.tagBg, color: project.tagColor }}
          >
            {project.tag}
          </span>
        )}
      </div>

      {project.desc && (
        <p className="proj-card-desc">{project.desc}</p>
      )}

      {project.techs?.length > 0 && (
        <div className="proj-card-techs">
          {project.techs.map(t => (
            <span key={t} className="tech-badge" style={getTechStyle(t)}>{t}</span>
          ))}
        </div>
      )}

      <div className="proj-card-footer">
        <div className="proj-card-stats">
          {isGitHub ? (
            <>
              {project.stars > 0 && <span className="proj-stat">★ {project.stars}</span>}
              {project.forks > 0 && <span className="proj-stat">⑂ {project.forks}</span>}
              {project.language && (
                <span className="proj-stat proj-stat--lang">{project.language}</span>
              )}
            </>
          ) : (
            <span className="proj-private">Code non public</span>
          )}
        </div>

        {(project.github || project.linkLabel) && (
          <a
            href={project.github || "#"}
            target={project.github ? "_blank" : undefined}
            rel={project.github ? "noreferrer" : undefined}
            className="proj-card-btn"
          >
            {project.github ? "GitHub ↗" : `${project.linkLabel} ↗`}
          </a>
        )}
      </div>
    </div>
  )
}

function Projects() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("Tous")

  useEffect(() => {
    fetch("https://api.github.com/users/FU3G/repos?per_page=30&sort=updated")
      .then(res => (res.ok ? res.json() : []))
      .then(data => {
        const list = Array.isArray(data) ? data.filter(r => !r.fork) : []
        setRepos(
          list.map(r => ({
            id: `gh-${r.id}`,
            source: "github",
            tag: null,
            tagColor: null,
            tagBg: null,
            title: r.name,
            desc: r.description || "",
            techs: r.language ? [r.language] : [],
            github: r.html_url,
            linkLabel: null,
            stars: r.stargazers_count,
            forks: r.forks_count,
            language: r.language,
          }))
        )
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const allProjects = [...manualProjects, ...repos]

  const tags = [
    "Tous",
    ...new Set(manualProjects.map(p => p.tag)),
    "GitHub uniquement",
  ]

  const visible = allProjects.filter(p => {
    if (activeFilter === "Tous") return true
    if (activeFilter === "GitHub uniquement") return p.source === "github"
    return p.tag === activeFilter
  })

  return (
    <div className="proj-page">

      {/* Bento header */}
      <div className="proj-bento">

        <div className="bento-card col-2">
          <p className="bento-eyebrow">Projets & Labs</p>
          <h1 className="proj-heading">
            Des infras réelles,<br />des problèmes concrets.
          </h1>
          <div className="proj-legend">
            <span className="proj-legend-item">
              <span className="proj-dot proj-dot--green" />GitHub auto
            </span>
            <span className="proj-legend-item">
              <span className="proj-dot proj-dot--blue" />Ajouté manuellement
            </span>
          </div>
        </div>

        <div className="bento-card bento-stat-card">
          <p className="bento-eyebrow">Total</p>
          <p className="stat-value">{loading ? "…" : allProjects.length}</p>
          <p className="stat-sub">projets & repos</p>
        </div>

        <div className="bento-card bento-stat-card">
          <p className="bento-eyebrow">Homelab & Pro</p>
          <p className="stat-value">{manualProjects.length}</p>
          <p className="stat-sub">ajoutés manuellement</p>
        </div>

      </div>

      {/* Filters */}
      <div className="proj-filters">
        {tags.map(tag => (
          <button
            key={tag}
            className={`proj-filter-btn${activeFilter === tag ? " proj-filter-btn--active" : ""}`}
            onClick={() => setActiveFilter(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="gh-loading">
          <span className="gh-loading-dot" />
          <span className="gh-loading-dot" />
          <span className="gh-loading-dot" />
        </div>
      ) : (
        <div className="proj-grid">
          {visible.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      )}

      {/* Banner */}
      <div className="contact-banner" style={{ marginTop: "20px" }}>
        <p className="contact-banner-text">
          Projets pro disponibles sur demande — documentés et prêts à présenter.
        </p>
        <Link to="/contact" className="contact-banner-email">
          Me contacter ↗
        </Link>
      </div>

    </div>
  )
}

export default Projects
