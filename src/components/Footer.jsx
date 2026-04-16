import { useLocation } from "react-router-dom"
import QRCodeWidget from "./QRCodeWidget"

function Footer() {

  const location = useLocation()
  const isHome = location.pathname === "/"

  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-left">
          <p className="footer-name">Greg<span>&lt;p&gt;</span></p>
          <p className="footer-text">Administrateur Réseau</p>
        </div>

        <div className="footer-links">
          <a href="https://github.com/FU3G" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>

        {!isHome && (
          <div className="footer-qr">
            <QRCodeWidget size={64} />
          </div>
        )}

      </div>

      <p className="footer-copy">© {new Date().getFullYear()} Gregory P</p>

    </footer>
  )
}

export default Footer
