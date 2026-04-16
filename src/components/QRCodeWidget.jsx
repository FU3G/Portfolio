import { QRCodeSVG } from "qrcode.react"

function QRCodeWidget({ color = "#888888", size = 110 }) {

  const vcardUrl = `${window.location.origin}/contact.vcf`

  return (
    <div className="qr-widget">
      <QRCodeSVG
        value={vcardUrl}
        size={size}
        fgColor={color}
        bgColor="transparent"
        level="H"
      />
    </div>
  )
}

export default QRCodeWidget
