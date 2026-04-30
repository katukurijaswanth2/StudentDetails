const DEPT_COLORS = {
  "Computer Science": "#6366f1",
  "Mathematics": "#f59e0b",
  "Physics": "#10b981",
  "Engineering": "#3b82f6",
  "Business": "#ec4899",
  "Arts": "#8b5cf6",
};

const getColor = (dept) =>
  DEPT_COLORS[dept] || "#64748b";

const getInitials = (name) =>
  name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

export default function StudentTable({ students, onEdit, onDelete }) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Student</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={s.id} className="table__row">
              <td className="table__id">{s.id}</td>
              <td>
                <div className="student-cell">
                  <div
                    className="avatar"
                    style={{ background: getColor(s.department) }}
                  >
                    {getInitials(s.name)}
                  </div>
                  <span className="student-name">{s.name}</span>
                </div>
              </td>
              <td className="table__email">{s.email}</td>
              <td>
                <span
                  className="badge"
                  style={{
                    background: getColor(s.department) + "18",
                    color: getColor(s.department),
                    border: `1px solid ${getColor(s.department)}40`,
                  }}
                >
                  {s.department}
                </span>
              </td>
              <td>
                <div className="actions">
                  <button className="btn btn--edit" onClick={() => onEdit(s)}>
                    Edit
                  </button>
                  <button className="btn btn--delete" onClick={() => onDelete(s.id)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}