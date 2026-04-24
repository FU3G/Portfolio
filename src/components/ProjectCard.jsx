// ProjectCard.jsx — Carte de projet réutilisable
//
// Accepte un objet `project` qui peut venir de deux sources :
//   - "manual" : projet du fichier src/data/projects.json
//   - "github" : repo récupéré depuis l'API GitHub
//
// Props :
//   project {object} — données normalisées du projet (voir shape ci-dessous)
//   reveal  {boolean} — ajoute la classe "reveal" pour l'animation scroll (défaut: true)
//
// Shape attendue de `project` :
//   id, source, title, description, techs[], type, typeColor, typeBg,
//   github, liveUrl, impact, stars, language, updatedAt

// Couleurs par technologie — complète si besoin
const TECH_COLORS = {
  "JavaScript":    { color: "#d4a800", bg: "rgba(212,168,0,.13)"   },
  "TypeScript":    { color: "#3178c6", bg: "rgba(49,120,198,.13)"  },
  "Python":        { color: "#3776ab", bg: "rgba(55,118,171,.13)"  },
  "CSS":           { color: "#264de4", bg: "rgba(38,77,228,.13)"   },
  "Shell":         { color: "#22d35a", bg: "rgba(34,211,90,.12)"   },
  "React":         { color: "#61dafb", bg: "rgba(97,218,251,.12)"  },
  "Ansible":       { color: "#ee0000", bg: "rgba(238,0,0,.10)"     },
  "Docker":        { color: "#2496ed", bg: "rgba(36,150,237,.12)"  },
  "Grafana":       { color: "#f46800", bg: "rgba(244,104,0,.12)"   },
  "Zabbix":        { color: "#d40000", bg: "rgba(212,0,0,.11)"     },
  "pfSense":       { color: "#1a6aad", bg: "rgba(26,106,173,.12)"  },
  "Suricata":      { color: "#ff6928", bg: "rgba(255,105,40,.12)"  },
  "BGP":           { color: "#539e43", bg: "rgba(83,158,67,.12)"   },
  "SD-WAN":        { color: "#1ba0d7", bg: "rgba(27,160,215,.12)"  },
  "EVE-NG":        { color: "#e67e22", bg: "rgba(230,126,34,.12)"  },
  "Cisco Viptela": { color: "#1ba0d7", bg: "rgba(27,160,215,.12)"  },
}

function getTechStyle(name) {
  const tech = TECH_COLORS[name]
  return tech ? { color: tech.color, background: tech.bg, borderColor: "transparent" } : {}
}

// Formate une date ISO en "15 jan. 2024"
function formatDate(isoString) {
  if (!isoString) return null
  return new Date(isoString).toLocaleDateString("fr-FR", {
    day:   "numeric",
    month: "short",
    year:  "numeric",
  })
}

function ProjectCard({ project, reveal = true }) {
  const isGithub = project.source === "github"

  return (
    <div className={`proj-card${reveal ? " reveal" : ""}`}>

      {/* En-tête : titre + badge de type (Homelab, Pro, etc.) */}
      <div className="proj-card-top">
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, flex: 1, minWidth: 0 }}>
          <span className={`proj-type-dot proj-type-dot--${isGithub ? "github" : "manual"}`} />
          <span className="proj-card-title">{project.title}</span>
        </div>
        {project.type && (
          <span
            className="proj-card-tag"
            style={{ background: project.typeBg, color: project.typeColor }}
          >
            {project.type}
          </span>
        )}
      </div>

      {/* Description */}
      {project.description && (
        <p className="proj-card-desc">{project.description}</p>
      )}

      {/* Badges technologie */}
      {project.techs?.length > 0 && (
        <div className="proj-card-techs">
          {project.techs.map(tech => (
            <span key={tech} className="tech" style={getTechStyle(tech)}>{tech}</span>
          ))}
        </div>
      )}

      {/* Pied de carte */}
      <div className="proj-card-footer">
        <span className="proj-card-meta">
          {isGithub ? (
            <>
              {project.stars > 0 && `★ ${project.stars}`}
              {project.language && ` · ${project.language}`}
              {project.updatedAt && (
                <span style={{ color: "var(--text-3)", marginLeft: project.stars > 0 || project.language ? 6 : 0 }}>
                  · {formatDate(project.updatedAt)}
                </span>
              )}
            </>
          ) : (
            project.impact
              ? <strong style={{ color: "var(--accent)" }}>{project.impact}</strong>
              : <span className="proj-private">Code non public</span>
          )}
        </span>

        {/* Lien GitHub ou URL live */}
        {(project.github || project.liveUrl) && (
          <a
            href={project.github || project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="proj-card-link"
          >
            {project.github ? "GitHub ↗" : "Voir ↗"}
          </a>
        )}
      </div>

    </div>
  )
}

export default ProjectCard
