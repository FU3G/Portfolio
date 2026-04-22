import { useEffect, useState } from "react"

const TECH_COLORS = {
  "JavaScript": { color: "#d4a800", bg: "rgba(212,168,0,.13)" },
  "TypeScript": { color: "#3178c6", bg: "rgba(49,120,198,.13)" },
  "Python":     { color: "#3776ab", bg: "rgba(55,118,171,.13)" },
  "CSS":        { color: "#264de4", bg: "rgba(38,77,228,.13)" },
  "Shell":      { color: "#22d35a", bg: "rgba(34,211,90,.12)" },
  "React":      { color: "#61dafb", bg: "rgba(97,218,251,.12)" },
  "Ansible":    { color: "#ee0000", bg: "rgba(238,0,0,.10)" },
  "Docker":     { color: "#2496ed", bg: "rgba(36,150,237,.12)" },
  "Grafana":    { color: "#f46800", bg: "rgba(244,104,0,.12)" },
  "Zabbix":     { color: "#d40000", bg: "rgba(212,0,0,.11)" },
  "pfSense":    { color: "#1a6aad", bg: "rgba(26,106,173,.12)" },
  "Suricata":   { color: "#ff6928", bg: "rgba(255,105,40,.12)" },
  "BGP":        { color: "#539e43", bg: "rgba(83,158,67,.12)" },
  "SD-WAN":     { color: "#1ba0d7", bg: "rgba(27,160,215,.12)" },
  "EVE-NG":     { color: "#e67e22", bg: "rgba(230,126,34,.12)" },
  "Cisco Viptela": { color: "#1ba0d7", bg: "rgba(27,160,215,.12)" },
}

function techStyle(name) {
  const t = TECH_COLORS[name]
  return t ? { color: t.color, background: t.bg, borderColor: "transparent" } : {}
}

const MANUAL = [
  {
    id: "m1",
    source: "manual",
    tag: "Homelab",
    tagColor: "#539e43",
    tagBg: "rgba(83,158,67,.14)",
    title: "Segmentation VLAN & IDS",
    desc: "Infra simulée EVE-NG avec pfSense, 6 VLANs isolés et IDS Suricata. Supervision trafic via Grafana.",
    techs: ["EVE-NG", "pfSense", "Suricata", "Grafana"],
    github: null,
    linkLabel: null,
    impact: "6 VLANs isolés",
  },
  {
    id: "m2",
    source: "manual",
    tag: "Pro",
    tagColor: "#6366f1",
    tagBg: "rgba(99,102,241,.13)",
    title: "Migration SD-WAN multi-sites",
    desc: "Migration de 8 sites distants vers Cisco Viptela SD-WAN. Réduction de la latence de 40%.",
    techs: ["Cisco Viptela", "SD-WAN", "BGP"],
    github: null,
    linkLabel: "Schéma",
    impact: "−40% latence",
  },
  {
    id: "m3",
    source: "manual",
    tag: "Monitoring",
    tagColor: "#e67e22",
    tagBg: "rgba(230,126,34,.13)",
    title: "Stack monitoring Zabbix + Grafana",
    desc: "Supervision de 60+ équipements, alerting Slack et dashboards temps réel. Déployable en 1 commande Ansible.",
    techs: ["Zabbix", "Grafana", "Ansible"],
    github: null,
    linkLabel: null,
    impact: "60+ équipements",
  },
]

function ProjCard({ p }) {
  const isGh = p.source === "github"
  return (
    <div className="proj-card reveal">
      <div className="proj-card-top">
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, flex: 1, minWidth: 0 }}>
          <span className={`proj-type-dot proj-type-dot--${isGh ? "github" : "manual"}`} />
          <span className="proj-card-title">{p.title}</span>
        </div>
        {p.tag && (
          <span className="proj-card-tag" style={{ background: p.tagBg, color: p.tagColor }}>
            {p.tag}
          </span>
        )}
      </div>

      {p.desc && <p className="proj-card-desc">{p.desc}</p>}

      {p.techs?.length > 0 && (
        <div className="proj-card-techs">
          {p.techs.map(t => (
            <span key={t} className="tech" style={techStyle(t)}>{t}</span>
          ))}
        </div>
      )}

      <div className="proj-card-footer">
        <span className="proj-card-meta">
          {isGh ? (
            <>
              {p.stars > 0 && `★ ${p.stars}`}
              {p.language && ` · ${p.language}`}
            </>
          ) : (
            p.impact ? <strong style={{ color: "var(--accent)" }}>{p.impact}</strong> : <span className="proj-private">Code non public</span>
          )}
        </span>

        {(p.github || p.linkLabel) && (
          <a
            href={p.github || "#"}
            target={p.github ? "_blank" : undefined}
            rel={p.github ? "noreferrer" : undefined}
            className="proj-card-link"
          >
            {p.github ? "GitHub ↗" : `${p.linkLabel} ↗`}
          </a>
        )}
      </div>
    </div>
  )
}

function Projects() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("Tous")

  useEffect(() => {
    fetch("https://api.github.com/users/FU3G/repos?per_page=30&sort=updated")
      .then(r => r.ok ? r.json() : [])
      .then(data => {
        const list = Array.isArray(data) ? data.filter(r => !r.fork) : []
        setRepos(list.map(r => ({
          id: `gh-${r.id}`,
          source: "github",
          tag: null, tagColor: null, tagBg: null,
          title: r.name,
          desc: r.description || "",
          techs: r.language ? [r.language] : [],
          github: r.html_url,
          linkLabel: null,
          stars: r.stargazers_count,
          language: r.language,
          impact: null,
        })))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const all = [...MANUAL, ...repos]
  const tags = ["Tous", ...new Set(MANUAL.map(p => p.tag)), "GitHub"]
  const visible = all.filter(p => {
    if (filter === "Tous") return true
    if (filter === "GitHub") return p.source === "github"
    return p.tag === filter
  })

  return (
    <section className="projects" id="projets">
      <div className="container">

        <div className="proj-header">
          <div>
            <p className="section-label">Réalisations</p>
            <h2 className="section-title">Projets &amp; Labs</h2>
          </div>
          <a href="https://github.com/FU3G" target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ gap: 6 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
            Voir GitHub
          </a>
        </div>

        <div className="proj-legend">
          <span className="proj-legend-item">
            <span className="proj-type-dot proj-type-dot--github" />
            Repo GitHub
          </span>
          <span className="proj-legend-item">
            <span className="proj-type-dot proj-type-dot--manual" />
            Projet personnel ou professionnel
          </span>
        </div>

        <div className="proj-filters">
          {tags.map(t => (
            <button
              key={t}
              className={`filter-btn${filter === t ? " filter-btn--active" : ""}`}
              onClick={() => setFilter(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="proj-loading">
            <span /><span /><span />
          </div>
        ) : (
          <div className="proj-grid">
            {visible.map(p => <ProjCard key={p.id} project={p} p={p} />)}
          </div>
        )}

      </div>
    </section>
  )
}

export default Projects
