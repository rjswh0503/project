package com.project.userproject.service.employee;

import com.project.userproject.dto.employee.EmployeeRequest;
import com.project.userproject.entity.Employee;
import com.project.userproject.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EmployeeService {

    private final EmployeeRepository employeeRepository;


    // 사원 전체이름으로 검색
    public List<Employee> searchEmployees(String name, String department, String position, String employeeNo, String email,String phone){
        Employee employee = employeeRepository.findByName(name).orElseThrow(() -> new IllegalArgumentException("해당 이름의 사원이 없습니다."));


        return employeeRepository.findAll();

    }


    // 이름 포함 단어로 여러 사원 조회
    public List<EmployeeRequest> searchEmployeeByName(String name){
        return employeeRepository.findByNameContaining(name).stream().map(EmployeeRequest::new).collect(Collectors.toList());

    }



}
