import { useState, useEffect } from "react";
import StudentModal from "./components/StudentModel";
import StudentTable from "./components/StudentTable";
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "./api/studentApi";
import "./App.css";

export default function App() {
  // ===== STATES =====
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");

  // ===== TOAST FUNCTION =====
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // ===== FETCH STUDENTS =====
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await getAllStudents();
      setStudents(response.data);
    } catch (error) {
      showToast("Failed to load students", "error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ===== SAVE (ADD OR UPDATE) =====
  const handleSave = async (formData) => {
    try {
      if (editingStudent) {
        await updateStudent(editingStudent.id, formData);
        showToast("Student updated successfully!");
      } else {
        await createStudent(formData);
        showToast("Student created successfully!");
      }
      setModalOpen(false);
      setEditingStudent(null);
      fetchStudents();
    } catch (error) {
      showToast("Something went wrong", "error");
    }
  };

  // ===== EDIT =====
  const handleEdit = (student) => {
    setEditingStudent(student);
    setModalOpen(true);
  };

  // ===== DELETE =====
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this student?");
    if (!confirmDelete) return;
    try {
      await deleteStudent(id);
      showToast("Student deleted");
      fetchStudents();
    } catch (error) {
      showToast("Failed to delete student", "error");
    }
  };

  // ===== ADD BUTTON =====
  const handleAdd = () => {
    setEditingStudent(null);
    setModalOpen(true);
  };

  // ===== SEARCH FILTER =====
  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase())
  );

  // ===== UI =====
  return (
    <div className="app">

      {/* TOAST MESSAGE */}
      {toast && (
        <div className={`toast toast--${toast.type}`}>
          <span>{toast.type === "success" ? "✓" : "✕"}</span>
          {toast.message}
        </div>
      )}

      {/* HEADER */}
      <header className="header">
        <div className="header__brand">
          <div className="header__logo">S</div>
          <div>
            <h1 className="header__title">StudentHub</h1>
            <p className="header__sub">Management System</p>
          </div>
        </div>

        <div className="header__stats">
          <div className="stat">
            <span className="stat__num">{students.length}</span>
            <span className="stat__label">Total</span>
          </div>
          <div className="stat">
            <span className="stat__num">
              {[...new Set(students.map((s) => s.department))].length}
            </span>
            <span className="stat__label">Depts</span>
          </div>
        </div>
      </header>

      {/* TOOLBAR */}
      <div className="toolbar">
        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input
            className="search"
            placeholder="Search by name, email or department…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="btn btn--primary" onClick={handleAdd}>
          + Add Student
        </button>
      </div>

      {/* MAIN CONTENT */}
      <main className="main">
        {loading ? (
          <div className="empty">
            <div className="spinner" />
            <p>Loading students…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty">
            <div className="empty__icon">🎓</div>
            <p>
              {search
                ? "No students match your search."
                : "No students yet. Add your first one!"}
            </p>
          </div>
        ) : (
          <StudentTable
            students={filtered}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>

      {/* MODAL */}
      {modalOpen && (
        <StudentModal
          student={editingStudent}
          onSave={handleSave}
          onClose={() => {
            setModalOpen(false);
            setEditingStudent(null);
          }}
        />
      )}
    </div>
  );
}