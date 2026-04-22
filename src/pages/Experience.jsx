const EXPERIENCE = [
  {
    date: "2025 — Présent",
    title: "Administrateur Réseau",
    company: "CNRS · Marseille FR",
    active: true,
    desc: "Alternance en parallèle du Mastère M2i. Gestion de l'infrastructure réseau multi-sites, supervision de 80+ équipements.",
    tags: ["Cisco", "Aruba", "HPE", "Observium", "Netdisco"],
  },
  {
    date: "2023 — 2025",
    title: "Gestionnaire d'Infrastructure Informatique",
    company: "CNRS · Marseille FR",
    active: false,
    desc: "Alternance en parallèle du BTS Service Informatique aux Organisations option SISR. Déploiement et maintenance d'infrastructures réseau, administration systèmes Linux/Windows, support N2/N3 et gestion des incidents.",
    tags: ["Linux", "Windows Server", "GLPI", "VLAN", "VPN"],
  },
  {
    date: "2014 — 2023",
    title: "Technicien Electrique TGV",
    company: "SNCF · Marseille - Lyon FR",
    active: false,
    desc: "Alternance BAC PRO Maintenance des Equipements Industriels et CDI. Entretien et dépannage des TGV au niveau électrique. Travail en équipe, gestion de la sécurité et respect des procédures strictes dans un environnement exigeant.",
    tags: ["Dépannage", "Documentation", "Sécurité", "Travail d'équipe"],
  },
]

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
        <p className="section-label">Parcours</p>
        <h2 className="section-title">Expérience &amp; Compétences</h2>
        <p className="section-sub">
          5 ans en administration réseau, 9 ans en dépannage électrique.
        </p>

        <div className="exp-layout">

          {/* Timeline */}
          <div>
            <p className="cert-section-title">Expérience professionnelle</p>
            <div className="timeline">
              {EXPERIENCE.map((e, i) => (
                <div key={i} className="tl-item reveal">
                  <div className={`tl-dot${e.active ? " tl-dot--active" : ""}`} />
                  <div className="tl-body">
                    <p className="tl-date">{e.date}</p>
                    <p className="tl-title">{e.title}</p>
                    <p className="tl-company">{e.company}</p>
                    <p className="tl-desc">{e.desc}</p>
                    <div className="tl-tags">
                      {e.tags.map(t => <span key={t} className="tech">{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="skills-col">
            <p className="cert-section-title">Compétences techniques</p>
            {SKILLS.map(g => (
              <div key={g.group} className="reveal">
                <p className="skill-group-title">{g.group}</p>
                <div className="skill-tags">
                  {g.items.map(s => <span key={s} className="skill-tag">{s}</span>)}
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
