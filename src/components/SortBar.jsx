function SortBar({ sort, setSort }) {
  return (
    <select value={sort} onChange={(e) => setSort(e.target.value)}>
      <option value="recent">Plus récents</option>
      <option value="alphabetical">A → Z</option>
    </select>
  )
}

export default SortBar