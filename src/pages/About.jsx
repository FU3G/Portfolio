import { Link } from "react-router-dom"

function About() {
  return (
    <div className="bento-grid">

      {/* Bio */}
      <div className="bento-card col-2">
        <p className="bento-eyebrow">À propos</p>
        <h1 className="about-name page-title">
          Greg <span className="text-accent">&lt;p&gt;</span>
        </h1>
        <p className="about-bio-text">
          Administrateur réseau &amp; étudiant en{" "}
          <span className="text-accent">Mastère MIIM</span> (Sécurité Systèmes &amp; Réseaux),
          en alternance au CNRS. Passionné par les infrastructures fiables et le développement web.
        </p>
        <p className="about-bio-text">
          Reconverti après 9 ans chez la SNCF comme technicien électrique sur TGV —
          une expérience qui m'a forgé rigueur, sens des responsabilités et adaptabilité.
        </p>
        <div className="tech-grid" style={{ marginTop: "4px" }}>
          <span className="tech-badge">Réseaux TCP/IP</span>
          <span className="tech-badge">Cybersécurité</span>
          <span className="tech-badge">JavaScript &amp; React</span>
          <span className="tech-badge">Linux</span>
        </div>
        <div className="bento-actions">
          <Link to="/contact" className="button-primary">Me contacter</Link>
          <Link to="/projects" className="button-secondary">Voir mes projets</Link>
        </div>
      </div>

      {/* Parcours */}
      <div className="bento-card">
        <p className="bento-eyebrow">Parcours</p>
        <div className="about-timeline">

          <div className="timeline-item">
            <span className="timeline-dot"></span>
            <div className="timeline-content">
              <span className="parcours-year">2025 — aujourd'hui</span>
              <p className="timeline-title">Mastère MIIM</p>
              <p className="timeline-sub">M2i Formation · CNRS</p>
              <p className="timeline-role">Administrateur réseau</p>
            </div>
          </div>

          <div className="timeline-item">
            <span className="timeline-dot"></span>
            <div className="timeline-content">
              <span className="parcours-year">2023 — 2025</span>
              <p className="timeline-title">BTS SIO — SISR</p>
              <p className="timeline-sub">CNRS</p>
              <p className="timeline-role">Gestionnaire d'infrastructure</p>
            </div>
          </div>

          <div className="timeline-item timeline-item--last">
            <span className="timeline-dot timeline-dot--muted"></span>
            <div className="timeline-content">
              <span className="parcours-year">2014 — 2023</span>
              <p className="timeline-title">Technicien Électrique TGV</p>
              <p className="timeline-sub">SNCF</p>
              <p className="timeline-role">Maintenance des rames TGV</p>
            </div>
          </div>

        </div>
      </div>

      {/* Localisation */}
      <div className="bento-card">
        <p className="bento-eyebrow">Localisation</p>
        <p className="about-stat-big">Île-de-France</p>
        <p className="bento-status-detail">Présentiel · Remote · Mobilité possible</p>
      </div>

      {/* Langues */}
      <div className="bento-card">
        <p className="bento-eyebrow">Langues</p>
        <div className="about-lang-list">
          <div className="about-lang-item">
            <span className="about-lang-name">Français</span>
            <span className="about-lang-level">Natif</span>
          </div>
          <div className="about-lang-item">
            <span className="about-lang-name">Anglais</span>
            <span className="about-lang-level">Professionnel</span>
          </div>
        </div>
      </div>

      {/* Centres d'intérêt */}
      <div className="bento-card">
        <p className="bento-eyebrow">En dehors du travail</p>
        <div className="tech-grid">
          <span className="tech-badge">Homelab</span>
          <span className="tech-badge">CTF</span>
          <span className="tech-badge">Veille tech</span>
          <span className="tech-badge">Moto</span>
        </div>
      </div>

      {/* Soft Skills */}
      <div className="bento-card">
        <p className="bento-eyebrow">Soft skills</p>
        <div className="tech-grid">
          <span className="tech-badge">Rigueur</span>
          <span className="tech-badge">Autonomie</span>
          <span className="tech-badge">Adaptabilité</span>
          <span className="tech-badge">Curiosité</span>
          <span className="tech-badge">Pédagogie</span>
        </div>
      </div>

      {/* Disponibilité */}
      <div className="bento-card">
        <p className="bento-eyebrow">Disponibilité</p>
        <div className="bento-status">
          <span className="status-dot"></span>
          <span>Disponible</span>
        </div>
        <p className="bento-status-detail">Alternance · Stage</p>
      </div>

      {/* Contrat */}
      <div className="bento-card">
        <p className="bento-eyebrow">Contrat recherché</p>
        <p className="about-stat-big">Alternance</p>
        <p className="bento-status-detail">CDI à terme</p>
      </div>

      {/* Citation */}
      <div className="bento-card col-3 bento-card--quote">
        <p className="bento-eyebrow">Philosophie</p>
        <blockquote className="about-quote">
          "Un réseau bien conçu, c'est celui dont personne ne parle — parce qu'il fonctionne toujours."
        </blockquote>
      </div>

    </div>
  )
}

export default About
