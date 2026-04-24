// Hero.jsx — Section d'accueil (première section visible)
//
// Structure :
//  ┌──────────────────────────────────────────┐
//  │  Texte (gauche)   │   Globe 3D (droite)  │
//  ├──────────────────────────────────────────┤
//  │         4 cartes métriques               │
//  └──────────────────────────────────────────┘
//  │         Flèche de défilement             │
//
// Le tout tient dans un seul viewport (hauteur 100vh).
// id="hero" permet à la navbar de détecter cette section.
// data-visible est déjà défini ici (pas besoin d'IntersectionObserver pour Hero).

import Globe   from "../components/Globe"
import CountUp from "../components/CountUp"

function Hero() {
  return (
    <section className="hero" id="hero" data-visible>
      <div className="container">

        {/* Ligne principale : texte à gauche, globe à droite */}
        <div className="hero-inner">

          {/* ── Colonne gauche ─────────────────────────────── */}
          <div>

            {/* Badge de disponibilité */}
            <div className="hero-avail reveal">
              <span className="dot-green" />
              Disponible · France - Québec
            </div>

            {/* Nom et titre */}
            <h1 className="hero-name reveal">
              Greg<br /><span>P.</span>
            </h1>
            <p className="hero-role reveal">
              Administrateur Réseau<br />& Infrastructure
            </p>

            {/* Biographie courte */}
            <p className="hero-bio reveal">
              Spécialisé dans les architectures et la sécurité des
              infrastructures réseau. Alternance au <strong>CNRS</strong> — M2i · Mastère
              Manager en Ingénierie Informatique.
            </p>

            {/* Boutons d'action */}
            <div className="hero-actions reveal">
              <a href="#contact" className="btn btn-primary">Me contacter</a>
              <a href="/cv.pdf" download className="btn btn-ghost">CV PDF ↓</a>
            </div>

            {/* Liens sociaux */}
            <div className="hero-links reveal">
              <a href="https://github.com/FU3G" target="_blank" rel="noreferrer" className="hero-link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                GitHub
              </a>
              <a href="https://linkedin.com/in/gregoryphina" target="_blank" rel="noreferrer" className="hero-link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
              <a href="mailto:gregory.phina@pm.me" className="hero-link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>
                gregory.phina@pm.me
              </a>
            </div>

          </div>

          {/* ── Colonne droite : globe 3D + villes ─────────── */}
          <div className="hero-visual">
            <div className="hero-globe-wrap">
              <Globe />
            </div>
            {/* Labels des deux villes marquées sur le globe */}
            <div className="hero-cities">
              <span className="hero-city">
                <span className="hero-city-dot" />
                <span>Marseille<br /><span className="hero-city-country">France</span></span>
              </span>
              <span className="hero-city">
                <span className="hero-city-dot" />
                <span>Montréal<br /><span className="hero-city-country">Canada</span></span>
              </span>
            </div>
          </div>

        </div>

        {/* ── Métriques ──────────────────────────────────────── */}
        {/* CountUp anime le chiffre de 0 jusqu'à `to` quand la carte entre dans le viewport */}
        <div className="metrics-grid">
          <div className="metric reveal">
            <span className="metric-value"><CountUp to={5} />+</span>
            <span className="metric-label">Années d'expérience</span>
            <span className="metric-sub">réseau & infra</span>
          </div>
          <div className="metric reveal">
            <span className="metric-value"><CountUp to={80} />+</span>
            <span className="metric-label">Équipements supervisés</span>
            <span className="metric-sub">Zabbix · Grafana</span>
          </div>
          <div className="metric reveal">
            <span className="metric-value"><CountUp to={8} /></span>
            <span className="metric-label">Sites</span>
            <span className="metric-sub">−40% de latence</span>
          </div>
          <div className="metric reveal">
            <span className="metric-value"><CountUp to={3} /></span>
            <span className="metric-label">Certifications actives</span>
            <span className="metric-sub">CCNA · NETACAD · CCSA</span>
          </div>
        </div>

      </div>

      {/* Flèche de défilement vers la section suivante */}
      <a href="#experience" className="scroll-hint" aria-label="Défiler vers la section Expérience">
        <span className="scroll-hint-arrow">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </a>

    </section>
  )
}

export default Hero
