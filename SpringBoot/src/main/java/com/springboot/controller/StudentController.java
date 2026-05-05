package com.springboot.controller;

import com.springboot.entity.Student;
import com.springboot.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for managing Student CRUD operations.
 *
 * This class handles HTTP requests from the browser or Postman
 * and sends back data as JSON automatically.
 * It communicates with the StudentService layer to perform
 * business logic and interact with the database.
 *
 * Base URL : http://localhost:8080/api/students
 * Frontend : https://student-details-nine-pearl.vercel.app
 *
 * @author  Jaswanth Katukuri
 * @version 1.0
 * @since   2026-05-03
 */
@RestController
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://student-details-nine-pearl.vercel.app"
})
@RequestMapping("/api/students")
public class StudentController {

    // Spring will automatically create and inject
    // the StudentService object — we don't create it manually
    @Autowired
    private StudentService studentService;


    // ==================== CREATE ====================
    // Runs when POST request is sent to /api/students
    // @RequestBody converts incoming JSON → Student object
    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentService.createStudent(student);
    }


    // ==================== READ ALL ====================
    // Runs when GET request is sent to /api/students
    // Returns a list of all students as JSON
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }


    // ==================== READ ONE ====================
    // Runs when GET request is sent to /api/students/{id}
    // @PathVariable takes {id} from URL → gives it as a variable
    // Example: /api/students/1 → id = 1
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }


    // ==================== UPDATE ====================
    // Runs when PUT request is sent to /api/students/{id}
    // Needs: id (from URL) + student data (from request body)
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id,
                                 @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }


    // ==================== DELETE ====================
    // Runs when DELETE request is sent to /api/students/{id}
    // Returns a success message like "Student deleted successfully"
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {
        return studentService.deleteStudent(id);
    }

}