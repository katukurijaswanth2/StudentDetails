// Each department gets a plain solid color — green or orange
const DEPT_COLORS = {
  "Computer Science": "#22c55e",
  "Mathematics":      "#f97316",
  "Physics":          "#22c55e",
  "Engineering":      "#f97316",
  "Business":         "#22c55e",
  "Arts":             "#f97316",
};

// Get the color for a department
const getColor = (dept) => DEPT_COLORS[dept] || "#64748b";

// Get first letters of name — example: "John Doe" => "JD"
const getInitials = (name) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function StudentTable({ students, onEdit, onDelete }) {
  return (
    <div className="table-wrap">
      <table className="table">

        {/* TABLE HEADER */}
        <thead>
          <tr>
            <th>#</th>
            <th>Student</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="table__row">

              {/* ID */}
              <td className="table__id">{s.id}</td>

              {/* NAME + AVATAR */}
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

              {/* EMAIL */}
              <td className="table__email">{s.email}</td>

              {/* DEPARTMENT BADGE */}
              <td>
                <span
                  className="badge"
                  style={{ background: getColor(s.department) }}
                >
                  {s.department}
                </span>
              </td>

              {/* EDIT AND DELETE BUTTONS */}
              <td>
                <div className="actions">
                  <button
                    className="btn btn--edit"
                    onClick={() => onEdit(s)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn--delete"
                    onClick={() => onDelete(s.id)}
                  >
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