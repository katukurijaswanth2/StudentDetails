package com.springboot.repository;

import com.springboot.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    // JpaRepository gives you these methods for FREE:
    // save()        → Insert or Update
    // findById()    → Select by ID
    // findAll()     → Select all rows
    // deleteById()  → Delete by ID
    // existsById()  → Check if exists
}