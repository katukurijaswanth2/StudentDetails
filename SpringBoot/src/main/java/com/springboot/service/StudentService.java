package com.springboot.service;

import com.springboot.entity.Student;
import com.springboot.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    // ✅ CREATE - Save new student
    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }

    // ✅ READ ALL - Get all students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // ✅ READ ONE - Get student by ID
    public Student getStudentById(Long id) {
        Optional<Student> student = studentRepository.findById(id);
        if (student.isPresent()) {
            return student.get();
        } else {
            throw new RuntimeException("Student not found with id: " + id);
        }
    }

    // ✅ UPDATE - Update existing student
    public Student updateStudent(Long id, Student updatedStudent) {
        Student existing = getStudentById(id); // Fetch existing
        existing.setName(updatedStudent.getName());
        existing.setEmail(updatedStudent.getEmail());
        existing.setDepartment(updatedStudent.getDepartment());
        return studentRepository.save(existing); // Save updated
    }

    // ✅ DELETE - Delete student by ID
    public String deleteStudent(Long id) {
        if (studentRepository.existsById(id)) {
            studentRepository.deleteById(id);
            return "Student deleted successfully with id: " + id;
        } else {
            throw new RuntimeException("Student not found with id: " + id);
        }
    }
}