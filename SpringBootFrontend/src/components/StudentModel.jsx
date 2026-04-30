import { useState, useEffect } from "react";

const DEPARTMENTS = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Engineering",
  "Business",
  "Arts",
  "Other",
];

export default function StudentModal({ student, onSave, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", department: "" });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (student) {
      setForm({ name: student.name, email: student.email, department: student.department });
    }
  }, [student]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.department) e.department = "Department is required";
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <div className="overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        {/* Header */}
        <div className="modal__header">
          <div>
            <h2 className="modal__title">
              {student ? "Edit Student" : "Add New Student"}
            </h2>
            <p className="modal__sub">
              {student ? `Editing record #${student.id}` : "Fill in the details below"}
            </p>
          </div>
          <button className="modal__close" onClick={onClose}>✕</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="modal__form">
          <div className="field">
            <label className="label">Full Name</label>
            <input
              className={`input ${errors.name ? "input--error" : ""}`}
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. John Smith"
            />
            {errors.name && <span className="error-msg">{errors.name}</span>}
          </div>

          <div className="field">
            <label className="label">Email Address</label>
            <input
              className={`input ${errors.email ? "input--error" : ""}`}
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="e.g. john@university.edu"
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className="field">
            <label className="label">Department</label>
            <select
              className={`input ${errors.department ? "input--error" : ""}`}
              name="department"
              value={form.department}
              onChange={handleChange}
            >
              <option value="">— Select a department —</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            {errors.department && <span className="error-msg">{errors.department}</span>}
          </div>

          <div className="modal__footer">
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary" disabled={saving}>
              {saving ? "Saving…" : student ? "Update Student" : "Create Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}