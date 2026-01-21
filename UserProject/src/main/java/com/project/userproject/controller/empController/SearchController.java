package com.project.userproject.controller.empController;

import com.project.userproject.entity.Employee;
import com.project.userproject.service.employee.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/admin/users")
public class SearchController {

    private final EmployeeService employeeService;

    @GetMapping("/search")
    public ResponseEntity<List<Employee>> searchEmployee(
            @RequestParam(required = false)String name
            ,@RequestParam(required = false) String department
            ,@RequestParam(required = false) String position
            ,@RequestParam(required = false) String employeeNo
            ,@RequestParam(required = false) String email
            ,@RequestParam(required = false) String phone
    ){

        List<Employee> employees = employeeService.searchEmployees(name, department, position,employeeNo,email,phone);
                return ResponseEntity.ok(employees);

    }


}
