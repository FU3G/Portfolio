function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Rechercher un projet..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  )
}

export default SearchBar