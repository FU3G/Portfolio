import { Link } from "react-router-dom"

function Home() {

  return (

    <>
      <section className="hero">

        <h1>
          Salut, je suis Gregory.
        </h1>

        <p className="hero-subtitle">
          Développeur JavaScript & React.
          Je construis des interfaces web modernes et performantes.
        </p>

        <div className="hero-actions">

          <Link to="/projects" className="button-primary">
            Voir mes projets
          </Link>

          <Link to="/contact" className="button-secondary">
            Me contacter
          </Link>

        </div>

      </section>

      <section className="tech-stack">

        <h2>Technologies</h2>

        <div className="tech-grid">

          <span className="tech-badge">JavaScript</span>
          <span className="tech-badge">React</span>
          <span className="tech-badge">Node.js</span>
          <span className="tech-badge">HTML</span>
          <span className="tech-badge">CSS</span>
          <span className="tech-badge">Git</span>

        </div>

      </section>

    </>
  )

}

export default Home