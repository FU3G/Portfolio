import ContactForm from "../components/ContactForm"

function Contact() {
  return (
    <div className="contact-bento-page">

      <div className="contact-bento">

        {/* Intro */}
        <div className="bento-card col-2">
          <p className="bento-eyebrow">Parlons-nous</p>
          <h1 className="contact-heading">
            Une infra à sécuriser ?<br />Un poste à pourvoir ?
          </h1>
        </div>

        {/* Disponibilité */}
        <div className="bento-card">
          <p className="bento-eyebrow">Disponibilité</p>
          <div className="bento-status">
            <span className="status-dot"></span>
            <span>Disponible</span>
          </div>
          <p className="stat-sub">Réponse sous 24h</p>
        </div>

        {/* Fuseau horaire */}
        <div className="bento-card bento-stat-card">
          <p className="bento-eyebrow">Fuseau horaire</p>
          <p className="stat-value">UTC+2</p>
          <p className="stat-sub">Île-de-France, France</p>
        </div>

        {/* Formulaire */}
        <div className="bento-card col-2 row-2 contact-form-bento">
          <p className="bento-eyebrow">Envoyer un message</p>
          <ContactForm />
        </div>

        {/* Liens & Réseaux */}
        <div className="bento-card col-2">
          <p className="bento-eyebrow">Liens & Réseaux</p>
          <div className="contact-network-list">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="contact-network-row"
            >
              <div className="contact-network-text">
                <span className="contact-network-title">LinkedIn</span>
                <span className="contact-network-sub">linkedin.com/in/gregoryphina</span>
              </div>
              <span className="contact-network-arrow">↗</span>
            </a>
            <a
              href="https://github.com/FU3G"
              target="_blank"
              rel="noreferrer"
              className="contact-network-row"
            >
              <div className="contact-network-text">
                <span className="contact-network-title">GitHub</span>
                <span className="contact-network-sub">github.com/FU3G</span>
              </div>
              <span className="contact-network-arrow">↗</span>
            </a>
            <a
              href="mailto:thewolfuego@gmail.com"
              className="contact-network-row"
            >
              <div className="contact-network-text">
                <span className="contact-network-title">Email direct</span>
                <span className="contact-network-sub">thewolfuego@gmail.com</span>
              </div>
              <span className="contact-network-arrow">↗</span>
            </a>
          </div>
        </div>

        {/* Préférence contact */}
        <div className="bento-card bento-stat-card">
          <p className="bento-eyebrow">Préférence contact</p>
          <p className="contact-pref-title">Email ou LinkedIn</p>
          <p className="stat-sub">Pas de démarchage téléphonique</p>
        </div>

        {/* CV */}
        <div className="bento-card bento-stat-card">
          <p className="bento-eyebrow">CV</p>
          <p className="contact-pref-title">Disponible sur demande</p>
          <button className="contact-dl-btn">Télécharger ↓</button>
        </div>

      </div>

      {/* Banner */}
      <div className="contact-banner">
        <p className="contact-banner-text">
          Vous recrutez ou avez un projet réseau ? Je lis tous mes messages et réponds dans la journée.
        </p>
        <span className="contact-banner-email">thewolfuego@gmail.com</span>
      </div>

    </div>
  )
}

export default Contact
