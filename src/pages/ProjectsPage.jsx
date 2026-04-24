// ProjectsPage.jsx — Page dédiée à tous les projets (/projects)
//
// Page complète accessible via React Router (route "/projects").
// Affiche tous les projets : manuels (JSON) + repos GitHub publics.
//
// Fonctionnalités :
//   - Fetch GitHub API avec retry si erreur réseau
//   - Anti-doublon : si un projet JSON a le même nom qu'un repo GitHub,
//     la version JSON est prioritaire (données plus complètes)
//   - Recherche en temps réel sur titre, description et technologies
//   - Filtres par catégorie (Tous | Homelab | Pro | Monitoring | GitHub)
//   - Tri : plus récents ou alphabétique
//   - Affichage de la date de mise à jour pour les repos GitHub

import { useEffect, useState } from "react"
import { Link }               from "react-router-dom"
import ProjectCard            from "../components/ProjectCard"
import SearchBar              from "../components/SearchBar"
import SortBar                from "../components/SortBar"
import ThemeToggle            from "../components/ThemeToggle"
import manualProjectsData     from "../data/projects.json"

// Normalise un repo GitHub dans le même format que les projets manuels
function normalizeGithubRepo(repo) {
  return {
    id:          `gh-${repo.id}`,
    source:      "github",
    title:       repo.name,
    description: repo.description || "",
    techs:       repo.language ? [repo.language] : [],
    type:        null,
    typeColor:   null,
    typeBg:      null,
    github:      repo.html_url,
    liveUrl:     null,
    impact:      null,
    stars:       repo.stargazers_count,
    language:    repo.language,
    updatedAt:   repo.updated_at,
  }
}

// Normalise un projet manuel JSON dans le même format
function normalizeManualProject(project) {
  return {
    ...project,
    source:    "manual",
    stars:     0,
    language:  null,
    updatedAt: null,
  }
}

function ProjectsPage() {
  const [githubRepos, setGithubRepos] = useState([])
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState(false)
  const [filter,      setFilter]      = useState("Tous")
  const [search,      setSearch]      = useState("")
  const [sort,        setSort]        = useState("recent")

  useEffect(() => {
    // Remonter en haut de page à l'arrivée sur cette route
    window.scrollTo(0, 0)
    fetchRepos()
  }, [])

  // Récupère les repos GitHub (appelé au montage + par le bouton "Réessayer")
  function fetchRepos() {
    setLoading(true)
    setError(false)

    fetch("https://api.github.com/users/FU3G/repos?per_page=30&sort=updated")
      .then(response => {
        if (!response.ok) throw new Error("Erreur API")
        return response.json()
      })
      .then(data => {
        // Garde seulement les repos qui nous appartiennent (pas les forks)
        const ownRepos = Array.isArray(data) ? data.filter(r => !r.fork) : []

        // Anti-doublon : on ignore les repos GitHub dont le nom correspond
        // à un projet JSON (la version JSON est plus complète)
        const manualTitles = new Set(
          manualProjectsData.map(p => p.title.toLowerCase())
        )
        const deduplicated = ownRepos.filter(
          r => !manualTitles.has(r.name.toLowerCase())
        )

        setGithubRepos(deduplicated.map(normalizeGithubRepo))
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }

  // ─── Construction de la liste finale ────────────────────────────────────────

  const normalizedManual = manualProjectsData.map(normalizeManualProject)
  let allProjects = [...normalizedManual, ...githubRepos]

  // 1. Filtre par catégorie
  if (filter !== "Tous") {
    allProjects = allProjects.filter(p =>
      filter === "GitHub" ? p.source === "github" : p.type === filter
    )
  }

  // 2. Recherche sur titre, description et technologies
  if (search.trim()) {
    const query = search.toLowerCase()
    allProjects = allProjects.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.description?.toLowerCase().includes(query) ||
      p.techs?.some(t => t.toLowerCase().includes(query))
    )
  }

  // 3. Tri
  allProjects = [...allProjects].sort((a, b) => {
    if (sort === "alpha") {
      return a.title.localeCompare(b.title, "fr")
    }
    // "recent" : projets manuels en premier, puis GitHub par date décroissante
    if (a.source === "manual" && b.source === "github") return -1
    if (a.source === "github" && b.source === "manual") return  1
    if (a.updatedAt && b.updatedAt) {
      return new Date(b.updatedAt) - new Date(a.updatedAt)
    }
    return 0
  })

  // Onglets de filtre : "Tous" + types des projets manuels + "GitHub"
  const filterTabs = [
    "Tous",
    ...new Set(manualProjectsData.map(p => p.type)),
    "GitHub",
  ]

  return (
    <div className="proj-page">

      {/* ── Header de page ──────────────────────────────────────────────────── */}
      <header className="proj-page-header">
        <div className="proj-page-header-inner">
          <Link to="/" className="proj-page-back">
            ← Retour au portfolio
          </Link>
          <span className="nav-brand">Greg<em>&lt;/P&gt;</em></span>
          <ThemeToggle />
        </div>
      </header>

      {/* ── Contenu ─────────────────────────────────────────────────────────── */}
      <main className="proj-page-main container">

        <p className="section-label">Réalisations</p>
        <h1 className="section-title">Tous les projets</h1>
        <p className="section-sub">
          Projets professionnels, homelab et repos GitHub publics.
        </p>

        {/* ── Barre de contrôles : recherche + tri ── */}
        <div className="proj-controls">
          <SearchBar value={search} onChange={setSearch} />
          <SortBar   value={sort}   onChange={setSort}   />
        </div>

        {/* ── Filtres par catégorie ── */}
        <div className="proj-filters">
          {filterTabs.map(tag => (
            <button
              key={tag}
              className={`filter-btn${filter === tag ? " filter-btn--active" : ""}`}
              onClick={() => setFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* ── Légende ── */}
        <div className="proj-legend">
          <span className="proj-legend-item">
            <span className="proj-type-dot proj-type-dot--github" /> Repo GitHub
          </span>
          <span className="proj-legend-item">
            <span className="proj-type-dot proj-type-dot--manual" /> Projet pro / homelab
          </span>
        </div>

        {/* ── Grille de projets ── */}
        {loading ? (
          <div className="proj-loading"><span /><span /><span /></div>
        ) : error ? (
          // Erreur API GitHub → message explicite + bouton retry
          <div className="proj-error">
            <p className="proj-error-msg">
              Impossible de charger les repos GitHub. Vérifiez votre connexion.
            </p>
            <button className="btn btn-ghost" onClick={fetchRepos}>
              Réessayer
            </button>
          </div>
        ) : allProjects.length === 0 ? (
          <p className="proj-empty">Aucun projet ne correspond à votre recherche.</p>
        ) : (
          <>
            <p className="proj-count">
              {allProjects.length} projet{allProjects.length > 1 ? "s" : ""}
              {search && ` pour « ${search} »`}
            </p>
            <div className="proj-grid">
              {allProjects.map(project => (
                <ProjectCard key={project.id} project={project} reveal={false} />
              ))}
            </div>
          </>
        )}

      </main>

    </div>
  )
}

export default ProjectsPage
