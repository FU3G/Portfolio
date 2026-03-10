import { QRCodeSVG } from "qrcode.react"

function QRCodeWidget() {

  const vcardUrl = `${window.location.origin}/contact.vcf`

  return (
    <div>

      <p>Scannez pour enregistrer mon contact</p>

      <QRCodeSVG
        value={vcardUrl}
        size={160}
        fgColor="#1E3A5F"
        level="H"
        includeMargin
      />

      <p>
        <a href="/contact.vcf" download>
          Télécharger la vCard
        </a>
      </p>

    </div>
  )
}

export default QRCodeWidget