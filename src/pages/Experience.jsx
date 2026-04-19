const EXPERIENCE = [
  {
    date: "2023 — Présent",
    title: "Administrateur Réseau",
    company: "CNRS · Île-de-France",
    active: true,
    desc: "Alternance en parallèle du Mastère MIIM. Gestion de l'infrastructure réseau multi-sites, supervision Zabbix/Grafana de 60+ équipements, migrations SD-WAN Cisco Viptela et automatisation Ansible.",
    tags: ["Cisco Viptela", "SD-WAN", "Zabbix", "Grafana", "Ansible", "BGP"],
  },
  {
    date: "2021 — 2023",
    title: "Technicien Réseau & Systèmes",
    company: "Expérience professionnelle",
    active: false,
    desc: "Déploiement et maintenance d'infrastructures réseau, administration systèmes Linux/Windows, support N2/N3 et gestion des incidents.",
    tags: ["Linux", "Windows Server", "TCP/IP", "VLAN", "VPN"],
  },
  {
    date: "2019 — 2021",
    title: "Technicien Support Infra",
    company: "Expérience professionnelle",
    active: false,
    desc: "Support utilisateurs et infrastructure, déploiement poste de travail, participation à des projets de virtualisation et de monitoring.",
    tags: ["VMware", "pfSense", "Helpdesk", "Active Directory"],
  },
]

const SKILLS = [
  {
    group: "Réseau & Routing",
    items: ["Cisco IOS", "Cisco Viptela", "BGP", "OSPF", "SD-WAN", "VLAN", "VPN IPsec", "QoS"],
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
    items: ["Azure AZ-104", "Python", "JavaScript", "React", "Netmiko", "Jinja2"],
  },
]

function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="container">
        <p className="section-label">Parcours</p>
        <h2 className="section-title">Expérience &amp; Compétences</h2>
        <p className="section-sub">
          5 ans en administration réseau, de la maintenance N2 aux migrations SD-WAN multi-sites.
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
