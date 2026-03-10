function ProjectCard({ project }) {

  const title = project.name || project.title
  const description = project.description

  const techs = project.techs || (project.language ? [project.language] : [])

  const githubUrl = project.html_url
  const liveUrl = project.liveUrl

  return (

    <div className="project-card">

      <h3>{title}</h3>

      <p className="project-description">
        {description || "Pas de description disponible."}
      </p>

      <div className="project-tech">

        {techs.map((tech, index) => (
          <span key={index} className="tech-badge">
            {tech}
          </span>
        ))}

      </div>

      <div className="project-links">

        {githubUrl && (
          <a href={githubUrl} target="_blank">
            GitHub
          </a>
        )}

        {liveUrl && (
          <a href={liveUrl} target="_blank">
            Live
          </a>
        )}

      </div>

    </div>

  )

}

export default ProjectCard