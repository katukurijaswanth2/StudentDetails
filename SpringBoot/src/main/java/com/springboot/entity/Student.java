package com.springboot.entity;

import jakarta.persistence.*;

@Entity                          // Tells JPA this is a DB table
@Table(name = "students")        // Table name in PostgreSQL
public class Student {

    @Id                          // This is the Primary Key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto increment
    private Long id;

    @Column(nullable = false)    // This column cannot be empty
    private String name;

    @Column(nullable = false, unique = true) // Must be unique
    private String email;

    @Column(nullable = false)
    private String department;

    // ✅ Default Constructor (required by JPA)
    public Student() {}

    // ✅ Parameterized Constructor
    public Student(String name, String email, String department) {
        this.name = name;
        this.email = email;
        this.department = department;
    }

    // ✅ Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
}