package com.project.userproject.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employeeId")
    private Long id;

    // 수정: 컬럼명 소문자 규칙 적용 (UserId -> user_id)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "departNo")
    private  Department department;

    @Column(name = "employeeNo" , nullable = false, unique = true)
    private String employeeNo;

    @Column(nullable = false)
    private String name;

    private String email;

    private String phone;


    @Column(name = "position")
    private String position;

    @Column(name = "join_date")
    private LocalDate joinDate;

    // 팁: 필드명은 camelCase가 Java 관례입니다 (resignation_date -> resignationDate)
    // DB 컬럼명은 @Column으로 지정하면 됩니다.
    @Column(name = "resignation_date")
    private LocalDate resignationDate;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;



}