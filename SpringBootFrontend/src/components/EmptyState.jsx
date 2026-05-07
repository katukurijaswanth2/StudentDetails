export const  EmptyState=({ search, loading })=> {
  if (loading) return (
    <div className="empty">
      <div className="spinner" />
      <p>Loading students…</p>
    </div>
  );
  return (
    <div className="empty">
      <div className="empty__icon"><i class="fa-solid fa-graduation-cap" style="color: rgb(177, 151, 252);"></i></div>
      <p>{search ? "No students match your search." : "No students yet. Add your first one!"}</p>
    </div>
  );
}