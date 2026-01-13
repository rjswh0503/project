package com.project.userproject.entity;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name= "department")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "departNo")
    private Long departNo;

    @Column(nullable = false)
    private String departName;

    @Column(nullable = false)
    private String departTel;

    @Column(nullable = false)
    private String departMail;

    @Column(nullable = false)
    private String departLocation;

   @OneToOne(fetch = FetchType.LAZY)
   @JoinColumn(name = "manager_id")
    private Employee manager_id;




}

