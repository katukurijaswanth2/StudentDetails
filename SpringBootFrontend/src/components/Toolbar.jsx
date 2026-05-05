export const Toolbar=({ search, onSearchChange, onAdd })=> {
  return (
    <div className="toolbar">
      <div className="search-wrap">
        <span className="search-icon">⌕</span>
        <input
          className="search"
          placeholder="Search by name, email or department…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <button className="btn btn--primary" onClick={onAdd}>
        + Add Student
      </button>
    </div>
  );
}