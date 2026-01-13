import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';

function Register() {
  const navigate = useNavigate();

  // DTO(RegisterRequest) 필드명과 똑같이 맞춰야 함
  const [inputs, setInputs] = useState({
    employeeNo: '',  // 사번
    name: '',        // 이름 (필수)
    password: '1111', // (숨김 처리) 기본값
    departNo: '',    // 부서코드 (이전엔 department였음)
    position: '',    // 직급
    email: '',       // 이메일
    phone: '',       // 전화번호
    joinDate: ''     // 입사일 (yyyy-MM-dd)
  });

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {
    // 유효성 검사 (필수값 체크)
    if (!inputs.employeeNo || !inputs.name || !inputs.joinDate) {
      alert("사번, 이름, 입사일은 필수입니다!");
      return;
    }

    try {
      // 백엔드로 전송
      await api.post('/api/admin/register', inputs);
      
      alert(`[${inputs.name}] 사원 등록이 완료되었습니다!`);
      // 등록 후 목록이나 홈으로 이동
      navigate('/home'); 
      
    } catch (err) {
      console.error(err);
      alert("등록 실패: " + (err.response?.data || "오류 발생"));
    }
  };

  // 스타일 (간단한 디자인)
  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    boxSizing: "border-box"
  };

  return (
    <div style={{ padding: "40px", maxWidth: "500px", margin: "0 auto", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#fff" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>🛠️ 신규 사원 등록</h2>
      <p style={{ textAlign: "center", color: "gray", fontSize: "14px", marginBottom: "30px" }}>
        신규 입사자의 상세 정보를 입력해주세요.<br/>
        (초기 비밀번호는 <b>1111</b>입니다)
      </p>

      {/* 1. 사번 */}
      <label><b>사번 *</b></label>
      <input
        name="employeeNo"
        placeholder="ex: 20240101"
        value={inputs.employeeNo}
        onChange={handleChange}
        style={inputStyle}
      />

      {/* 2. 이름 */}
      <label><b>이름 *</b></label>
      <input
        name="name"
        placeholder="ex: 홍길동"
        value={inputs.name}
        onChange={handleChange}
        style={inputStyle}
      />

      {/* 3. 부서 (departNo) */}
      <label><b>부서명(코드)</b></label>
      <input
        name="departNo" 
        placeholder="ex: 개발1팀 (DEV01)"
        value={inputs.departNo}
        onChange={handleChange}
        style={inputStyle}
      />

      {/* 4. 직급 */}
      <label><b>직급</b></label>
      <input
        name="position"
        placeholder="ex: 대리, 사원"
        value={inputs.position}
        onChange={handleChange}
        style={inputStyle}
      />

      {/* 5. 연락처 */}
      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ flex: 1 }}>
            <label><b>이메일</b></label>
            <input
                name="email"
                type="email"
                placeholder="user@company.com"
                value={inputs.email}
                onChange={handleChange}
                style={inputStyle}
            />
        </div>
        <div style={{ flex: 1 }}>
            <label><b>전화번호</b></label>
            <input
                name="phone"
                placeholder="010-0000-0000"
                value={inputs.phone}
                onChange={handleChange}
                style={inputStyle}
            />
        </div>
      </div>

      {/* 6. 입사일 (날짜 선택기) */}
      <label><b>입사일 *</b></label>
      <input
        name="joinDate"
        type="date"  // 달력 나옴
        value={inputs.joinDate}
        onChange={handleChange}
        style={inputStyle}
      />
      
      <button 
        onClick={handleRegister} 
        style={{ 
            width: "100%", 
            padding: "15px", 
            backgroundColor: "#4CAF50", 
            color: "white", 
            border: "none", 
            borderRadius: "4px", 
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold"
        }}>
        사원 등록 완료
      </button>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Link to="/home" style={{ color: "#666", textDecoration: "none" }}>← 홈으로 돌아가기</Link>
      </div>
    </div>
  );
}

export default Register;