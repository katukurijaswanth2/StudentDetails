// Base URL of your Spring Boot API
const API_URL = "http://localhost:8080/api/students";

// ===== LOAD ALL STUDENTS =====
function loadStudents() {
    fetch(API_URL)
        .then(response => response.json())
        .then(students => {
            const tableBody = document.getElementById("studentTableBody");
            tableBody.innerHTML = ""; // Clear existing rows

            students.forEach(student => {
                const row = `
                    <tr>
                        <td>${student.id}</td>
                        <td>${student.name}</td>
                        <td>${student.email}</td>
                        <td>${student.department}</td>
                        <td class="action-buttons">
                            <button class="btn-edit" onclick="editStudent(${student.id}, '${student.name}', '${student.email}', '${student.department}')">Edit</button>
                            <button class="btn-delete" onclick="deleteStudent(${student.id})">Delete</button>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => alert("Error loading students: " + error));
}

// ===== SAVE STUDENT (CREATE or UPDATE) =====
function saveStudent() {
    const id         = document.getElementById("studentId").value;
    const name       = document.getElementById("name").value;
    const email      = document.getElementById("email").value;
    const department = document.getElementById("department").value;

    // Basic validation
    if (!name || !email || !department) {
        alert("Please fill in all fields!");
        return;
    }

    const studentData = { name, email, department };

    if (id) {
        // ===== UPDATE (PUT request) =====
        fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(studentData)
        })
        .then(response => response.json())
        .then(() => {
            alert("Student updated successfully!");
            clearForm();
            loadStudents();
        })
        .catch(error => alert("Error updating student: " + error));

    } else {
        // ===== CREATE (POST request) =====
        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(studentData)
        })
        .then(response => response.json())
        .then(() => {
            alert("Student created successfully!");
            clearForm();
            loadStudents();
        })
        .catch(error => alert("Error creating student: " + error));
    }
}

// ===== FILL FORM FOR EDITING =====
function editStudent(id, name, email, department) {
    // Fill the form with existing data
    document.getElementById("studentId").value   = id;
    document.getElementById("name").value        = name;
    document.getElementById("email").value       = email;
    document.getElementById("department").value  = department;

    // Change form title to show we are editing
    document.getElementById("form-title").innerText = "Update Student";

    // Scroll to top so user sees the form
    window.scrollTo(0, 0);
}

// ===== DELETE STUDENT =====
function deleteStudent(id) {
    if (confirm("Are you sure you want to delete this student?")) {
        fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            alert("Student deleted successfully!");
            loadStudents();
        })
        .catch(error => alert("Error deleting student: " + error));
    }
}

// ===== CLEAR FORM =====
function clearForm() {
    document.getElementById("studentId").value   = "";
    document.getElementById("name").value        = "";
    document.getElementById("email").value       = "";
    document.getElementById("department").value  = "";
    document.getElementById("form-title").innerText = "Add New Student";
}

// Auto load students when page opens
window.onload = loadStudents;