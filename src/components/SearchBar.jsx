// SearchBar.jsx — Barre de recherche en temps réel
//
// Filtre les projets au fur et à mesure que l'utilisateur tape.
// La logique de filtrage est dans le parent (ProjectsPage).
//
// Props :
//   value       {string}   Valeur actuelle de la recherche
//   onChange    {function} Appelée avec la nouvelle valeur à chaque frappe
//   placeholder {string}   Texte indicatif (optionnel)

function SearchBar({ value, onChange, placeholder = "Rechercher un projet, une techno..." }) {
  return (
    <div className="search-bar">
      {/* Icône loupe */}
      <svg className="search-bar-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>

      <input
        type="text"
        className="search-bar-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Rechercher un projet"
      />

      {/* Bouton effacer — visible seulement si du texte est saisi */}
      {value && (
        <button
          className="search-bar-clear"
          onClick={() => onChange("")}
          aria-label="Effacer la recherche"
        >
          ×
        </button>
      )}
    </div>
  )
}

export default SearchBar
