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

// Données vCard encodées directement dans le QR — pas besoin d'internet pour le scan,
// l'app Contacts s'ouvre immédiatement sur iOS et Android.
const VCARD_DATA = `BEGIN:VCARD
VERSION:3.0
FN:Gregory Phina
N:Phina;Gregory;;;
EMAIL;TYPE=INTERNET:gregory.phina@pm.me
URL;TYPE=WORK:https://portfolio-zeta-five-42.vercel.app
URL;TYPE=WORK:https://linkedin.com/in/gregoryphina
URL;TYPE=WORK:https://github.com/FU3G
TITLE:Administrateur Réseau
ORG:CNRS
NOTE:Mastère Manager en Ingénierie Informatique · M2i
END:VCARD`

function QRCodeWidget({ color = "#888888", size = 110 }) {
  return (
    <div className="qr-widget">
      <QRCodeSVG
        value={VCARD_DATA}
        size={size}
        fgColor={color}
        bgColor="transparent"
        level="M"
      />
    </div>
  )
}

export default QRCodeWidget
