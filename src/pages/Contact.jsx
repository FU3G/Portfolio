import ContactForm from "../components/ContactForm"
import QRCodeWidget from "../components/QRCodeWidget"

function Contact() {
  return (
    <div className="contact-page">

      <h1 className="page-title">Contact</h1>
      <p className="contact-intro">
        Une question, une opportunité ? Je réponds généralement sous 24h.
      </p>

      <div className="contact-layout">

        {/* Formulaire */}
        <div className="contact-form-card">
          <p className="bento-eyebrow">Envoyer un message</p>
          <ContactForm />
        </div>

        {/* Colonne droite */}
        <div className="contact-side">

          <div className="contact-info-card">
            <p className="bento-eyebrow">Retrouvez-moi</p>
            <div className="contact-links">
              <a
                href="https://github.com/FU3G"
                target="_blank"
                rel="noreferrer"
                className="contact-link-row"
              >
                <span className="contact-link-icon">GH</span>
                <div className="contact-link-text">
                  <span className="contact-link-name">GitHub</span>
                  <span className="contact-link-sub">@FU3G</span>
                </div>
                <span className="contact-link-arrow">↗</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="contact-link-row"
              >
                <span className="contact-link-icon">IN</span>
                <div className="contact-link-text">
                  <span className="contact-link-name">LinkedIn</span>
                  <span className="contact-link-sub">Gregory P.</span>
                </div>
                <span className="contact-link-arrow">↗</span>
              </a>
            </div>
          </div>

          <div className="contact-qr-card">
            <p className="bento-eyebrow">Contact rapide</p>
            <div className="contact-qr-inner">
              <QRCodeWidget color="#ff6928" size={110} />
              <p className="contact-qr-label">
                Scanner pour enregistrer<br />mon contact vCard
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Contact
