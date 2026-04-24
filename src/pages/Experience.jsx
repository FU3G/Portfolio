// Experience.jsx — Section "Expérience & Compétences"
//
// Deux colonnes côte à côte :
//  - Gauche  : timeline des postes professionnels (EXPERIENCE)
//  - Droite  : grille de compétences groupées par domaine (SKILLS)
//
// Les données sont définies en dehors du composant (pas de fetch réseau).
// Pour modifier ton parcours ou tes compétences : édite les tableaux ci-dessous.

// ─── Données : Expérience professionnelle ────────────────────────────────────
// active: true = le poste actuel (le point de la timeline clignote en orange)
const EXPERIENCE = [
  {
    date:    "2025 — Présent",
    title:   "Administrateur Réseau",
    company: "CNRS · Marseille FR",
    active:  true,
    desc:    "Alternance en parallèle du Mastère M2i. Gestion de l'infrastructure réseau multi-sites, supervision de 80+ équipements.",
    tags:    ["Cisco", "Aruba", "HPE", "Observium", "Netdisco"],
  },
  {
    date:    "2023 — 2025",
    title:   "Gestionnaire d'Infrastructure Informatique",
    company: "CNRS · Marseille FR",
    active:  false,
    desc:    "Alternance en parallèle du BTS Service Informatique aux Organisations option SISR. Déploiement et maintenance d'infrastructures réseau, administration systèmes Linux/Windows, support N2/N3 et gestion des incidents.",
    tags:    ["Linux", "Windows Server", "GLPI", "VLAN", "VPN"],
  },
  {
    date:    "2014 — 2023",
    title:   "Technicien Electrique TGV",
    company: "SNCF · Marseille - Lyon FR",
    active:  false,
    desc:    "Alternance BAC PRO Maintenance des Équipements Industriels et CDI. Entretien et dépannage des TGV au niveau électrique. Travail en équipe, gestion de la sécurité et respect des procédures strictes dans un environnement exigeant.",
    tags:    ["Dépannage", "Documentation", "Sécurité", "Travail d'équipe"],
  },
]

// ─── Données : Compétences techniques ────────────────────────────────────────
const SKILLS = [
  {
    group: "Réseau & Routing",
    items: ["Cisco IOS", "Cisco Viptela", "BGP", "OSPF", "SD-WAN", "VLAN", "VPN IPsec"],
  },
  {
    group: "Sécurité",
    items: ["pfSense", "Suricata", "IDS/IPS", "ACL", "NAT", "Firewall", "EVE-NG"],
  },
  {
    group: "Supervision & DevOps",
    items: ["Zabbix", "Grafana", "Ansible", "Docker", "Linux", "SNMP", "Syslog"],
  },
  {
    group: "Cloud & Dev",
    items: ["Python", "JavaScript", "React", "Git", "Nextcloud"],
  },
]

function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="container">

        {/* En-tête de section */}
        <p className="section-label">Parcours</p>
        <h2 className="section-title">Expérience &amp; Compétences</h2>
        <p className="section-sub">
          5 ans en administration réseau, 9 ans en dépannage électrique.
        </p>

        {/* Layout 2 colonnes */}
        <div className="exp-layout">

          {/* ── Colonne gauche : timeline ── */}
          <div>
            <p className="cert-section-title">Expérience professionnelle</p>
            <div className="timeline">
              {EXPERIENCE.map((job, index) => (
                <div key={index} className="tl-item reveal">
                  {/* Le point est orange et clignote si c'est le poste actuel */}
                  <div className={`tl-dot${job.active ? " tl-dot--active" : ""}`} />
                  <div className="tl-body">
                    <p className="tl-date">{job.date}</p>
                    <p className="tl-title">{job.title}</p>
                    <p className="tl-company">{job.company}</p>
                    <p className="tl-desc">{job.desc}</p>
                    <div className="tl-tags">
                      {job.tags.map(tag => (
                        <span key={tag} className="tech">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Colonne droite : compétences ── */}
          <div className="skills-col">
            <p className="cert-section-title">Compétences techniques</p>
            {SKILLS.map(skillGroup => (
              <div key={skillGroup.group} className="reveal">
                <p className="skill-group-title">{skillGroup.group}</p>
                <div className="skill-tags">
                  {skillGroup.items.map(skill => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export default Experience
