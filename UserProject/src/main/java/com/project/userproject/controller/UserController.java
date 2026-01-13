package com.project.userproject.controller;


import com.project.userproject.dto.LoginRequest;
import com.project.userproject.dto.RegisterRequest;
import com.project.userproject.entity.Employee;
import com.project.userproject.entity.User;
import com.project.userproject.repository.EmployeeRepository;
import com.project.userproject.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {

    private final UserService userService;
    private final EmployeeRepository employeeRepository;


    // 관리자: 사원 등록
    @PostMapping("/admin/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request){
        userService.registerUser(request);
        return ResponseEntity.ok("사원 등록 완료 (사번: " + request.getEmployeeNo() + ", 비번: 1111");

    }

    // 로그인

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request){
        User user = userService.login(loginRequest);

        if(user == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패(정보 확인 필요");

        }

        HttpSession session  = request.getSession();
        session.setAttribute("loginUser", user);

        return ResponseEntity.ok("로그인 성공!!");
    }


    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session != null ) session.invalidate();
        return ResponseEntity.ok("로그아웃 성공!!!");
    }



    // 세션 확인
    @GetMapping("/check-login")
    public ResponseEntity<Map<String, Object>> checkLogin(HttpServletRequest request) {
        System.out.println("================ check-login 요청 들어옴 ================");

        // 1. 세션이 있는지 확인 (false: 없으면 null 반환)
        HttpSession session = request.getSession(false);

        if (session == null) {
            System.out.println("❌ 실패 원인: session이 null임 (서버가 이 브라우저를 처음 봄)");
            System.out.println("   -> 브라우저가 보낸 쿠키가 없거나, 서버가 재시작되어서 다 까먹음.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // 2. 세션 ID 확인 (디버깅용)
        System.out.println("✅ 세션 발견! ID: " + session.getId());

        // 3. 세션 안에 유저 정보가 들어있는지 확인
        Object loginUserObj = session.getAttribute("loginUser");

        if (loginUserObj == null) {
            System.out.println("❌ 실패 원인: session은 있는데 'loginUser' 데이터가 없음");
            System.out.println("   -> 로그인 할 때 setAttribute('loginUser', user) 가 제대로 안 됐거나 이름이 틀림.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // 4. 성공 및 데이터 조회
        System.out.println("🎉 성공! 유저 정보 찾음: " + loginUserObj);

        // 세션에서 User 객체 형변환
        User user = (User) loginUserObj;

        // User 정보로 Employee 정보 조회 (Optional 처리)
        Employee employee = employeeRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("사원 정보를 찾을 수 없습니다."));

        // 5. 응답 데이터 구성
        Map<String, Object> response = new HashMap<>();
        response.put("name", employee.getName());

        // (주의) user.getEmployeeNo()가 맞는지 확인 필요. 보통은 employee.getEmployeeNo() 일 수 있음.
        // User 엔티티에 employeeNo 필드가 있다면 그대로 두셔도 됩니다.
        response.put("employeeNo", user.getEmployeeNo());
        response.put("role", user.getRole());
        response.put("name", employee.getName());
        response.put("email", employee.getEmail());

        return ResponseEntity.ok(response);
    }



}
