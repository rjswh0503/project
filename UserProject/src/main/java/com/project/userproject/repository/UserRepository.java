package com.project.userproject.repository;


import com.project.userproject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmployeeNo(String employeeNo);
    boolean existsByEmployeeNo(String employeeNo);

}
