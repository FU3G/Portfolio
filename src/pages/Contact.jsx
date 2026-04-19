import { useState } from "react"

function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="contact" id="contact">
      <div className="container">

        <p className="section-label">Contact</p>
        <h2 className="section-title">Travaillons ensemble</h2>
        <p className="section-sub">
          Disponible pour une alternance, un CDI ou une mission réseau/infra. Réponse sous 24h.
        </p>

        <div className="contact-layout">

          {/* Form */}
          <div className="contact-form-card reveal">
            <p className="contact-form-title">Envoyer un message</p>
            {sent ? (
              <div style={{ padding: "32px 0", textAlign: "center" }}>
                <p style={{ fontSize: 32, marginBottom: 8 }}>✓</p>
                <p style={{ fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>Message envoyé</p>
                <p style={{ fontSize: 13, color: "var(--text-2)" }}>Je vous répondrai dans les plus brefs délais.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div className="form-field">
                    <label className="form-label">Nom</label>
                    <input className="form-input" type="text" placeholder="Jean Dupont" required />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Email</label>
                    <input className="form-input" type="email" placeholder="jean@example.com" required />
                  </div>
                </div>
                <div className="form-field">
                  <label className="form-label">Sujet</label>
                  <input className="form-input" type="text" placeholder="Opportunité réseau · alternance · mission..." />
                </div>
                <div className="form-field">
                  <label className="form-label">Message</label>
                  <textarea className="form-textarea" placeholder="Décrivez votre besoin ou votre projet..." required />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 4 }}>
                  Envoyer le message
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="contact-sidebar">

            <div className="contact-meta reveal">
              <div className="contact-meta-card">
                <p className="contact-meta-label">Disponibilité</p>
                <div className="contact-avail">
                  <span className="dot-green" />
                  <span className="contact-meta-value">Disponible</span>
                </div>
                <p className="contact-meta-sub">Réponse sous 24h</p>
              </div>
              <div className="contact-meta-card">
                <p className="contact-meta-label">Fuseau</p>
                <p className="contact-meta-value">UTC +2</p>
                <p className="contact-meta-sub">Île-de-France</p>
              </div>
            </div>

            <div className="contact-info-card reveal">
              <p className="contact-info-title">Liens directs</p>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="contact-link-row">
                <div className="contact-link-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </div>
                <div className="contact-link-text">
                  <p className="contact-link-name">LinkedIn</p>
                  <p className="contact-link-sub">linkedin.com/in/gregoryphina</p>
                </div>
                <span className="contact-arrow">↗</span>
              </a>
              <a href="https://github.com/FU3G" target="_blank" rel="noreferrer" className="contact-link-row">
                <div className="contact-link-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                </div>
                <div className="contact-link-text">
                  <p className="contact-link-name">GitHub</p>
                  <p className="contact-link-sub">github.com/FU3G</p>
                </div>
                <span className="contact-arrow">↗</span>
              </a>
              <a href="mailto:thewolfuego@gmail.com" className="contact-link-row">
                <div className="contact-link-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>
                </div>
                <div className="contact-link-text">
                  <p className="contact-link-name">Email direct</p>
                  <p className="contact-link-sub">thewolfuego@gmail.com</p>
                </div>
                <span className="contact-arrow">↗</span>
              </a>
            </div>

            <div className="contact-info-card reveal">
              <p className="contact-info-title">CV disponible sur demande</p>
              <p style={{ fontSize: 13, color: "var(--text-2)", marginBottom: 14, lineHeight: 1.6 }}>
                Document PDF complet incluant parcours détaillé, projets et références.
              </p>
              <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }}>
                Télécharger CV ↓
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
