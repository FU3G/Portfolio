import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

const SEQUENCE = [
  { type: "cmd",   text: "traceroute " },
  { type: "muted", text: "traceroute to unknown host, 30 hops max, 60 byte packets" },
  { type: "muted", text: " 1  gateway.local (192.168.1.1)  0.421 ms  0.388 ms" },
  { type: "muted", text: " 2  10.0.0.1 (10.0.0.1)  8.214 ms  7.990 ms" },
  { type: "muted", text: " 3  * * *" },
  { type: "muted", text: " 4  * * *  Request timeout for icmp_seq 3" },
  { type: "muted", text: " 5  * * *  Request timeout for icmp_seq 4" },
  { type: "error", text: "— 404 Destination Host Unreachable —" },
  { type: "action" },
]

function NotFound() {
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    if (visible >= SEQUENCE.length) return
    const t = setTimeout(() => setVisible(v => v + 1), visible === 0 ? 200 : 380)
    return () => clearTimeout(t)
  }, [visible])

  return (
    <div className="not-found">
      <div className="terminal">

        <div className="terminal-bar">
          <span className="t-dot t-red"></span>
          <span className="t-dot t-yellow"></span>
          <span className="t-dot t-green"></span>
          <span className="t-bar-title">bash — greg@portfolio</span>
        </div>

        <div className="terminal-body">
          {SEQUENCE.slice(0, visible).map((line, i) => {
            if (line.type === "action") return (
              <div key={i} className="t-action">
                <p className="t-note">
                  Cette route n'existe pas sur ce réseau.
                </p>
                <Link to="/" className="button-primary">
                  cd ~/ — Retour à l'accueil
                </Link>
              </div>
            )

            return (
              <p key={i} className={`t-line t-${line.type}`}>
                {line.type === "cmd" && (
                  <span className="t-prompt">greg@portfolio:~$</span>
                )}
                {line.type === "cmd"
                  ? <>{" "}{line.text}<span className="t-path">{window.location.pathname}</span></>
                  : line.text
                }
              </p>
            )
          })}
          {visible < SEQUENCE.length && (
            <span className="t-cursor">▋</span>
          )}
        </div>

      </div>
    </div>
  )
}

export default NotFound
