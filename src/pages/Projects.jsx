import { useEffect, useState } from "react"
import ProjectCard from "../components/ProjectCard"
import localProjects from "../data/projects.json"
import SearchBar from "../components/SearchBar"
import FilterBar from "../components/FilterBar"
import SortBar from "../components/SortBar"

function Projects() {

  const [githubProjects, setGithubProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [sort, setSort] = useState("recent")

  useEffect(() => {

    fetch("https://api.github.com/users/FU3G/repos?per_page=30&sort=updated")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur API GitHub")
        }
        return res.json()
      })
      .then((data) => {
        setGithubProjects(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })

  }, [])

  if (loading) return <p>Chargement des projets...</p>
  if (error) return <p>Erreur : {error}</p>

  const allProjects = [...localProjects, ...githubProjects]

  let filteredProjects = allProjects.filter(project => {

    const name = project.name || project.title || ""
    const techs = project.techs ? project.techs.join(" ") : project.language || ""

    const matchesSearch =
      name.toLowerCase().includes(search.toLowerCase()) ||
      techs.toLowerCase().includes(search.toLowerCase())

    const type = project.type || "web"

    const matchesFilter =
      filter === "all" || type.toLowerCase() === filter

    return matchesSearch && matchesFilter
  })

  if (sort === "alphabetical") {
    filteredProjects.sort((a, b) => {
      const nameA = a.name || a.title
      const nameB = b.name || b.title
      return nameA.localeCompare(nameB)
    })
  }

  return (
    <div>

      <h1>Mes projets</h1>

      <SearchBar search={search} setSearch={setSearch} />

      <FilterBar filter={filter} setFilter={setFilter} />

      <SortBar sort={sort} setSort={setSort} />

      {filteredProjects.length === 0 ? (
        <p>Aucun projet trouvé</p>
      ) : (
        <div className="projects-grid">

      {filteredProjects.map((project) => (
        <ProjectCard
          key={project.id || project.name}
          project={project}
        />
      ))}

    </div>
      )}

    </div>
  )
}

export default Projects