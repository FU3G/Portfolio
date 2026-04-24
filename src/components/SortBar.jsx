// SortBar.jsx — Sélecteur de tri des projets
//
// Props :
//   value    {string}   Valeur actuelle ("recent" ou "alpha")
//   onChange {function} Appelée avec la nouvelle valeur au changement

const SORT_OPTIONS = [
  { value: "recent", label: "Plus récents" },
  { value: "alpha",  label: "A → Z"        },
]

function SortBar({ value, onChange }) {
  return (
    <select
      className="sort-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Trier les projets"
    >
      {SORT_OPTIONS.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  )
}

export default SortBar
