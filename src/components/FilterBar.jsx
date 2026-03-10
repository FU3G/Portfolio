function FilterBar({ filter, setFilter }) {
  return (
    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
      <option value="all">Tous</option>
      <option value="web">Web</option>
      <option value="stage">Stage</option>
      <option value="design">Design</option>
    </select>
  )
}

export default FilterBar