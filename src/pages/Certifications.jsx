// Ajoute tes certifications dans ce tableau
const certs = [
  // Exemple :
  // {
  //   id: 1,
  //   name: "CCNA",
  //   issuer: "Cisco",
  //   date: "2025",
  //   status: "obtained", // "obtained" | "in-progress"
  //   description: "Cisco Certified Network Associate"
  // },
]

function CertCard({ cert }) {
  return (
    <div className="cert-card">
      <div className="cert-card-top">
        <div className="cert-issuer-badge">{cert.issuer.slice(0, 2).toUpperCase()}</div>
        <span className={`cert-status cert-status--${cert.status}`}>
          {cert.status === "obtained" ? "Obtenu" : "En cours"}
        </span>
      </div>
      <h3 className="cert-name">{cert.name}</h3>
      <p className="cert-issuer">{cert.issuer}</p>
      {cert.description && <p className="cert-description">{cert.description}</p>}
      <span className="cert-date">{cert.date}</span>
    </div>
  )
}

function Certifications() {
  return (
    <div className="certs-page">

      <h1 className="page-title">Certifications</h1>
      <p className="contact-intro">
        Certifications professionnelles et formations reconnues dans le domaine des réseaux,
        de la sécurité et du développement.
      </p>

      {certs.length === 0 ? (
        <div className="certs-empty bento-card">
          <p className="bento-eyebrow">En construction</p>
          <p className="certs-empty-text">
            Certifications à venir — cette section sera mise à jour prochainement.
          </p>
          <div className="tech-grid" style={{ marginTop: "8px" }}>
            <span className="tech-badge">CCNA</span>
            <span className="tech-badge">CompTIA Net+</span>
            <span className="tech-badge">CompTIA Sec+</span>
            <span className="tech-badge">Azure AZ-900</span>
          </div>
        </div>
      ) : (
        <div className="certs-grid">
          {certs.map(cert => (
            <CertCard key={cert.id} cert={cert} />
          ))}
        </div>
      )}

    </div>
  )
}

export default Certifications
