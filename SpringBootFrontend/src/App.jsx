// ============================================================
// App.jsx — The Root Component
// ============================================================
// In React, a "component" is just a function that returns UI (HTML-like JSX).
// This is the TOP-LEVEL component — the one that holds everything together.
// All other components (Header, StudentTable, etc.) live INSIDE this one.
// ============================================================

// --- IMPORTS ---
// React hooks let us add features like storing data and running side effects.
// useState  → stores data that can change (like a list of students)
// useEffect → runs code automatically (like fetching data when the page loads)
import { useState, useEffect } from "react";

// axios is a library that makes it easy to send HTTP requests (GET, POST, etc.)
// to a backend server. Think of it as a messenger between your app and the server.
import axios from "axios";

// These are our own custom components, each living in a separate file.
// We import them here so we can use them inside this component's JSX.
import StudentModal from "./components/StudentModel";   // The popup form (add/edit)
import StudentTable from "./components/StudentTable";   // The list/table of students
import { Header } from "./components/Header";           // Top section with title & stats
import { Toolbar } from "./components/Toolbar";         // Search bar + "Add Student" button
import { Toast } from "./components/Toast";             // Temporary notification message
import { EmptyState } from "./components/EmptyState";   // Shown when there are no results

// CSS file for global styling of this component
import "./App.css";

// ============================================================
// BASE URL — The address of our backend API
// We define it once here so we don't repeat it everywhere.
// All our HTTP requests will start with this URL.
// ============================================================
const BASE_URL = "http://localhost:8080/api/students";

// ============================================================
// THE MAIN COMPONENT
// "export default" means this is the main thing this file provides.
// Other files can import it with: import App from "./App"
// ============================================================
export default function App() {

  // ==========================================================
  // STATE — Data that lives inside this component
  // useState(initialValue) returns: [currentValue, functionToUpdateIt]
  // When state changes, React automatically re-renders the UI.
  // ==========================================================

  // The list of all students fetched from the server
  const [students, setStudents] = useState([]); // starts as an empty array

  // True while we're waiting for the server to respond
  const [loading, setLoading] = useState(false); // starts as false (not loading)

  // Controls whether the add/edit popup (modal) is visible
  const [modalOpen, setModalOpen] = useState(false); // starts hidden

  // Holds the student being edited (null means we're adding a NEW student)
  const [editingStudent, setEditingStudent] = useState(null);

  // Holds the current notification message (null means no toast is showing)
  const [toast, setToast] = useState(null);

  // The text the user typed in the search bar
  const [search, setSearch] = useState(""); // starts empty


  // ==========================================================
  // HELPER FUNCTION — Show a notification message (toast)
  // ==========================================================
  // This function sets the toast state (which shows the message),
  // then automatically hides it after 3 seconds (3000 milliseconds).
  //
  // Parameters:
  //   message → the text to show (e.g. "Student deleted")
  //   type    → "success" (green) or "error" (red). Defaults to "success".
  const showToast = (message, type = "success") => {
    setToast({ message, type }); // show the toast with the given message and type

    // setTimeout is a built-in browser function that runs code after a delay.
    // Here, after 3 seconds we hide the toast by setting it back to null.
    setTimeout(() => setToast(null), 3000);
  };


  // ==========================================================
  // FETCH STUDENTS — Load all students from the server
  // ==========================================================
  // This is an "async" function, meaning it can pause and wait
  // for slow operations (like network requests) without freezing the page.
  //
  // "async/await" is cleaner than using .then() chains.
  // try/catch handles errors gracefully (instead of crashing the app).
  const fetchStudents = async () => {
    setLoading(true); // show a loading spinner or empty state

    try {
      // axios.get() sends a GET request to the server and waits for a response.
      // The "await" keyword pauses here until the server replies.
      const response = await axios.get(BASE_URL);

      // response.data contains the actual data from the server (an array of students).
      // We store it in our students state, which triggers a re-render.
      setStudents(response.data);

    } catch {
      // If anything goes wrong (network error, server down, etc.),
      // the catch block runs instead of crashing the app.
      showToast("Failed to load students", "error");
    }

    setLoading(false); // hide the loading indicator whether it succeeded or failed
  };


  // ==========================================================
  // useEffect — Run code when the component first appears on screen
  // ==========================================================
  // useEffect takes two arguments:
  //   1. A function to run (our fetchStudents call)
  //   2. A dependency array — [] means "run only ONCE when the component mounts"
  //      (If you leave out the [], it would run after EVERY render, which is too much.)
  useEffect(() => {
    fetchStudents(); // load students from the server when the page first loads
  }, []); // the empty [] means: only run this once


  // ==========================================================
  // SAVE STUDENT — Create a new student OR update an existing one
  // ==========================================================
  // This function is passed DOWN to the StudentModal component.
  // When the user submits the form, the modal calls this function with the form data.
  //
  // Parameters:
  //   formData → the student information from the form (name, email, department, etc.)
  const handleSave = async (formData) => {
    try {
      if (editingStudent) {
        // --- UPDATE MODE ---
        // If editingStudent is not null, we're editing an existing student.
        // We send a PUT request to update that specific student by their ID.
        // Template literal (`${...}`) lets us insert variables into a string.
        await axios.put(`${BASE_URL}/${editingStudent.id}`, formData);
        showToast("Student updated successfully!");

      } else {
        // --- CREATE MODE ---
        // If editingStudent is null, we're adding a brand new student.
        // We send a POST request with the new student's data.
        await axios.post(BASE_URL, formData);
        showToast("Student created successfully!");
      }

      // After saving: close the modal, clear the editing state, and refresh the list
      setModalOpen(false);
      setEditingStudent(null);
      fetchStudents(); // re-fetch so the table shows the latest data

    } catch {
      showToast("Something went wrong", "error");
    }
  };


  // ==========================================================
  // DELETE STUDENT — Remove a student from the server
  // ==========================================================
  // Parameters:
  //   id → the unique ID of the student to delete
  const handleDelete = async (id) => {
    // window.confirm() shows a browser popup asking "are you sure?"
    // If the user clicks Cancel, confirm() returns false and we stop here.
    if (!window.confirm("Delete this student?")) return;

    try {
      // axios.delete() sends a DELETE request to remove the student by ID
      await axios.delete(`${BASE_URL}/${id}`);
      showToast("Student deleted");
      fetchStudents(); // refresh the list so the deleted student disappears

    } catch {
      showToast("Failed to delete student", "error");
    }
  };


  // ==========================================================
  // OPEN EDIT MODAL — Fill the form with an existing student's data
  // ==========================================================
  // Parameters:
  //   student → the full student object clicked in the table
  const handleEdit = (student) => {
    setEditingStudent(student); // save which student we're editing
    setModalOpen(true);         // open the modal popup
  };


  // ==========================================================
  // SEARCH FILTER — Narrow down the student list based on search text
  // ==========================================================
  // Array.filter() creates a NEW array with only the items that pass the test.
  // Here we keep students whose name, email, or department contains the search text.
  //
  // .toLowerCase() makes the comparison case-insensitive.
  // (e.g. searching "alice" will match "Alice")
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase()) ||
    student.department.toLowerCase().includes(search.toLowerCase())
  );


  // ==========================================================
  // CALCULATE UNIQUE DEPARTMENTS — for the Header stats display
  // ==========================================================
  // new Set(...) creates a collection of UNIQUE values (removes duplicates).
  // [...new Set(...)] spreads those unique values back into a normal array.
  // .length gives us the count.
  //
  // Example: ["CS", "Math", "CS", "Physics"] → Set → ["CS", "Math", "Physics"] → length = 3
  const totalDepts = [...new Set(students.map((s) => s.department))].length;


  // ==========================================================
  // JSX — What this component renders on the screen
  // ==========================================================
  // JSX looks like HTML but it's actually JavaScript.
  // Each component tag (like <Header />) calls that component's function
  // and renders whatever it returns.
  //
  // Props (attributes on component tags) are how we pass data DOWN to child components.
  // Example: <Header totalStudents={students.length} /> passes the count as a prop.
  return (
    <div className="app">

      {/*
        TOAST NOTIFICATION
        We always render <Toast />, but it only shows something when `toast` is not null.
        The Toast component itself decides whether to display based on the `toast` prop.
      */}
      <Toast toast={toast} />

      {/*
        HEADER
        Receives the total number of students and departments as props.
        It just displays those numbers — it doesn't manage them itself.
      */}
      <Header
        totalStudents={students.length}
        totalDepts={totalDepts}
      />

      {/*
        TOOLBAR (Search bar + Add button)
        - search: the current search text (so the input stays in sync with state)
        - onSearchChange: when the user types, update our `search` state
        - onAdd: when the user clicks "Add Student", open the modal in CREATE mode
      */}
      <Toolbar
        search={search}
        onSearchChange={setSearch}
        onAdd={() => {
          setEditingStudent(null); // null = add mode (not editing an existing student)
          setModalOpen(true);
        }}
      />

      {/*
        MAIN CONTENT AREA
        Conditionally renders either:
          A) EmptyState — shown when loading OR when no students match the search
          B) StudentTable — shown when there are matching students to display
        
        The || (OR) means: show EmptyState if EITHER condition is true.
      */}
      <main className="main">
        {loading || filteredStudents.length === 0 ? (
          // Ternary operator: condition ? "if true" : "if false"
          // Pass `search` so EmptyState can show different text
          // ("No students found" vs "Loading...") depending on the situation
          <EmptyState search={search} loading={loading} />
        ) : (
          // Pass the filtered list + handler functions as props
          <StudentTable
            students={filteredStudents}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>

      {/*
        STUDENT MODAL (Add/Edit Popup)
        We only render this when `modalOpen` is true.
        The && operator: if the left side is true, render the right side.
        
        - student: if editing, pass the existing student data to pre-fill the form
        - onSave: called when the form is submitted
        - onClose: called when the user clicks Cancel or the X button
      */}
      {modalOpen && (
        <StudentModal
          student={editingStudent}
          onSave={handleSave}
          onClose={() => {
            setModalOpen(false);
            setEditingStudent(null); // clear editing state when closed
          }}
        />
      )}

    </div>
  );
}