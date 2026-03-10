import QRCodeWidget from "./QRCodeWidget"

function Footer() {

  return (

    <footer className="footer">

      <div className="footer-content">

        <div className="footer-left">

          <p className="footer-name">
            Gregory P
          </p>

          <p className="footer-text">
            Développeur JavaScript & React
          </p>

        </div>

        <div className="footer-links">

          <a href="https://github.com/FU3G" target="_blank">
            GitHub
          </a>

          <a href="https://linkedin.com" target="_blank">
            LinkedIn
          </a>

        </div>

        <div className="footer-qr">

          <QRCodeWidget />

        </div>
      </div>

    <p className="footer-text">
    © {new Date().getFullYear()} Gregory P
    </p>

    </footer>

  )

}

export default Footer