package com.project.userproject.dto.employee;

import com.project.userproject.entity.Employee;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class EmployeeRequest {

    private String employeeNo;

    private String name;

    private String email;

    private String phone;

    private String deaprtment;

    private String position;

    private LocalDate joinDate;


    public EmployeeRequest(Employee employee) {

    }
}
