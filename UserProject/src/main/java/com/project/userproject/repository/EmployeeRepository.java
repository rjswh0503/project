package com.project.userproject.repository;

import com.project.userproject.entity.Employee;
import com.project.userproject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByUser(User user);

    List<Employee> user(User user);


    Optional<Employee> findByName(String name);

    List<Employee> findByNameContaining(String name);

    List<Employee> findByDepartment(String department);



}
