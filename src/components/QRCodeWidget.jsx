// QRCodeWidget.jsx — QR Code pointant vers la vCard de contact
//
// Scanne ce QR code avec un smartphone → ouvre /contact.vcf → ajout direct
// dans les contacts du téléphone.
//
// La vCard se trouve dans public/contact.vcf (accessible directement par Vercel).
//
// Props :
//   color  {string}  Couleur des modules du QR (défaut: gris #888888)
//   size   {number}  Taille en pixels (défaut: 110)

import { QRCodeSVG } from "qrcode.react"

function QRCodeWidget({ color = "#888888", size = 110 }) {
  // window.location.origin = l'URL de base du site (ex: https://gregoryphina.vercel.app)
  const vcardUrl = `${window.location.origin}/contact.vcf`

  return (
    <div className="qr-widget">
      <QRCodeSVG
        value={vcardUrl}      // URL encodée dans le QR
        size={size}
        fgColor={color}       // couleur des carrés du QR
        bgColor="transparent" // fond transparent (s'adapte au thème)
        level="H"             // niveau de correction d'erreur : H = haute (30%)
      />
    </div>
  )
}

export default QRCodeWidget
