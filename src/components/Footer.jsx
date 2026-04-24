// Footer.jsx — Pied de page du portfolio
//
// Contient :
//  - La constellation animée (FooterMatrix)
//  - Le nom + titre professionnel
//  - Les icônes sociales (GitHub, LinkedIn, Email)
//  - Un faux terminal qui tape/efface des commandes réseau en boucle
//  - Le copyright avec l'année courante (dynamique)
//
// Le hook `useTypewriter` gère l'animation de frappe :
//  Tape la commande lettre par lettre → attend → efface → passe à la suivante.

import { useEffect, useState } from "react"
import FooterMatrix  from "./FooterMatrix"
import QRCodeWidget  from "./QRCodeWidget"

// Commandes réseau affichées dans l'animation terminal du footer
const COMMANDS = [
  " ping portfolio",
  " ssh greg@cnrs.fr",
  " nmap -sV 192.168.1.0/24",
  " traceroute réseau",
  " netstat -tulpn",
  " tcpdump -i eth0 -n",
  " arp -a | grep cnrs",
  " dig +short greg.dev",
  " curl -I https://portfolio",
  " route -n | grep 0.0.0.0",
  " iptables -L -n --line-numbers",
]

// Hook personnalisé : anime du texte qui se tape puis s'efface en boucle.
// typeSpeed  : délai entre chaque lettre ajoutée (ms)
// deleteSpeed: délai entre chaque lettre supprimée (ms)
// pauseMs    : temps d'attente à la fin d'une commande complète (ms)
function useTypewriter(commands, typeSpeed = 75, deleteSpeed = 35, pauseMs = 1800) {
  const [text,     setText]     = useState("")    // texte actuellement affiché
  const [index,    setIndex]    = useState(0)     // index de la commande en cours
  const [deleting, setDeleting] = useState(false) // est-on en train d'effacer ?

  useEffect(() => {
    const currentCommand = commands[index]

    if (!deleting && text.length < currentCommand.length) {
      // Phase frappe : on ajoute une lettre
      const timer = setTimeout(
        () => setText(currentCommand.slice(0, text.length + 1)),
        typeSpeed
      )
      return () => clearTimeout(timer)
    }

    if (!deleting && text.length === currentCommand.length) {
      // Commande complète → on attend avant d'effacer
      const timer = setTimeout(() => setDeleting(true), pauseMs)
      return () => clearTimeout(timer)
    }

    if (deleting && text.length > 0) {
      // Phase effacement : on retire une lettre
      const timer = setTimeout(
        () => setText(text.slice(0, -1)),
        deleteSpeed
      )
      return () => clearTimeout(timer)
    }

    if (deleting && text.length === 0) {
      // Effacement terminé → on passe à la commande suivante (boucle infinie)
      setDeleting(false)
      setIndex((index + 1) % commands.length)
    }
  }, [text, deleting, index, commands, typeSpeed, deleteSpeed, pauseMs])

  return text
}

function Footer() {
  const currentCommand = useTypewriter(COMMANDS)

  return (
    <footer className="footer-wrap">

      {/* Constellation animée en haut du footer */}
      <FooterMatrix />

      {/* Ligne principale : nom + liens sociaux */}
      <div className="footer-main">
        <div>
          <p className="footer-brand-name">Greg<em>&lt;/P&gt;</em></p>
          <p className="footer-brand-role">Administrateur Réseau · CNRS</p>
        </div>

        <div className="footer-icons">
          <a href="https://github.com/FU3G" target="_blank" rel="noreferrer" className="footer-icon" aria-label="GitHub">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
          </a>
          <a href="https://linkedin.com/in/gregoryphina" target="_blank" rel="noreferrer" className="footer-icon" aria-label="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="mailto:gregory.phina@pm.me" className="footer-icon" aria-label="Email">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>
          </a>

          {/* QR Code vCard — petit, pour ajouter le contact directement depuis le footer */}
          <div className="footer-qr" title="Scanner pour enregistrer mon contact">
            <QRCodeWidget size={44} />
            <span className="footer-qr-label">vCard</span>
          </div>
        </div>
      </div>

      {/* Barre du bas : faux terminal + copyright */}
      <div className="footer-bottom">
        <span className="footer-terminal">
          <span className="ft-host">greg@cnrs</span>
          <span className="ft-sep">:~$</span>
          <span className="ft-cmd">{currentCommand}</span>
          <span className="ft-cursor">▋</span>
        </span>
        {/* new Date().getFullYear() retourne toujours l'année courante automatiquement */}
        <span className="footer-copy">
          © {new Date().getFullYear()} Gregory Phina &nbsp;·&nbsp; Développé avec l'aide de{" "}
          <a href="https://claude.ai" target="_blank" rel="noreferrer" style={{ color: "var(--accent)", textDecoration: "none" }}>Claude AI</a>
        </span>
      </div>

    </footer>
  )
}

export default Footer
