package com.springboot.controller;

import com.springboot.entity.Student;
import com.springboot.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// @RestController means:
// This class handles requests from browser/postman
// and sends back data as JSON automatically
@RestController

// @RequestMapping means:
// All URLs in this class start with /api/students
// Example: http://localhost:8080/api/students
@RequestMapping("/api/students")

public class StudentController {

    // @Autowired means:
    // Spring will automatically create and give us
    // the StudentService object — we don't create it manually
    @Autowired
    private StudentService studentService;


    // ==================== CREATE ====================
    // @PostMapping means: this method runs when someone
    // sends a POST request to http://localhost:8080/api/students
    //
    // @RequestBody means:
    // Take the JSON data sent in the request
    // and convert it into a Student object automatically
    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentService.createStudent(student);
    }


    // ==================== READ ALL ====================
    // @GetMapping means: this method runs when someone
    // sends a GET request to http://localhost:8080/api/students
    //
    // List<Student> means: we are returning multiple students
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }


    // ==================== READ ONE ====================
    // @GetMapping("/{id}") means: this method runs when someone
    // sends a GET request to http://localhost:8080/api/students/1
    //
    // @PathVariable means:
    // Take the {id} from the URL and give it to us as a variable
    // Example URL: /api/students/1  → id = 1
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }


    // ==================== UPDATE ====================
    // @PutMapping means: this method runs when someone
    // sends a PUT request to http://localhost:8080/api/students/1
    //
    // We need two things:
    // 1. id        → from the URL      (@PathVariable)
    // 2. student   → from the body     (@RequestBody)
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id,
                                 @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }


    // ==================== DELETE ====================
    // @DeleteMapping means: this method runs when someone
    // sends a DELETE request to http://localhost:8080/api/students/1
    //
    // We return a simple String message like
    // "Student deleted successfully"
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {
        return studentService.deleteStudent(id);
    }

}