import { useState, useEffect } from "react";
import StudentModal from "./components/StudentModel";

import StudentTable from "./components/StudentTable";
import { Header } from "./components/Header";
import { Toolbar } from "./components/Toolbar";
import { Toast } from "./components/Toast";
import { EmptyState } from "./components/EmptyState";
import { StatCard } from "./components/StatCard";
import { getAllStudents, createStudent, updateStudent, deleteStudent } from "./api/studentApi";
import "./App.css";

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await getAllStudents();
      setStudents(response.data);
    } catch {
      showToast("Failed to load students", "error");
    }
    setLoading(false);
  };

  useEffect(() => { fetchStudents(); }, []);

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
    } catch {
      showToast("Something went wrong", "error");
    }
  };

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    s.department.toLowerCase().includes(search.toLowerCase())
  );

  const totalDepts = [...new Set(students.map((s) => s.department))].length;

  return (
    <div className="app">
      <Toast toast={toast} />

      <Header totalStudents={students.length} totalDepts={totalDepts} />

      <Toolbar
        search={search}
        onSearchChange={setSearch}
        onAdd={() => { setEditingStudent(null); setModalOpen(true); }}
      />

      <main className="main">
        {loading || filtered.length === 0 ? (
          <EmptyState search={search} loading={loading} />
        ) : (
          <StudentTable
            students={filtered}
            onEdit={(s) => { setEditingStudent(s); setModalOpen(true); }}
            onDelete={async (id) => {
              if (!window.confirm("Delete this student?")) return;
              try { await deleteStudent(id); showToast("Student deleted"); fetchStudents(); }
              catch { showToast("Failed to delete student", "error"); }
            }}
          />
        )}
      </main>

      {modalOpen && (
        <StudentModal
          student={editingStudent}
          onSave={handleSave}
          onClose={() => { setModalOpen(false); setEditingStudent(null); }}
        />
      )}
    </div>
  );
}