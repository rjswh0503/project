import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Link 추가
import api from '../api/api';
import { Button } from 'flowbite-react';

function Home() {
    // const [empNo, setEmpNo] = useState(null); // 기존: 사번만 저장
    const [user, setUser] = useState(null);      // 변경: 유저 정보 통째로 저장
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/api/check-login')
            .then(res => setUser(res.data)) // res.data = { employeeNo: '...', role: 'ADMIN' }
            .catch(() => {
                alert("로그인이 필요합니다.");
                navigate('/login');
            });
    }, [navigate]);

    const handleLogout = async () => {
        try {
            // 1. 백엔드에 "나 갈게" 하고 알림 (세션 삭제 요청)
            await api.post('/api/logout');

            // 2. 알림창 띄우고
            alert("정상적으로 로그아웃 되었습니다.");

            // 3. 로그인 화면으로 쫓아내기
            navigate('/login');

        } catch (err) {
            console.error(err);
            alert("로그아웃 중 오류가 발생했지만, 로그인 화면으로 이동합니다.");
            navigate('/login'); // 에러나도 일단 내보냄
        }
    };

    if (!user) return <div>로딩중...</div>;

    return (
        <div style={{ padding: "50px", textAlign: "center" }}>
            <h1>🏢 사내 인트라넷</h1>
            <div style={{ background: "white", padding: "30px", border: "1px solid #ccc" }}>

                <h2>환영합니다! {user.name}님!</h2>
                <p>{user.email}</p>
                <p>현재 권한: {user.role}</p>

                {/* 👇 여기가 질문하신 삼항 연산자 부분! */}
                {user.role === 'ADMIN' ? (
                    // [참] 관리자일 때만 보이는 버튼
                    <div style={{ margin: "20px 0" }}>
                        <Link to="/admin/register">
                            <button style={{ backgroundColor: "orange", padding: "10px" }}>
                                🛠️ 사원 등록하러 가기
                            </button>
                        </Link>
                    </div>
                ) : (
                    // [거짓] 일반 유저는 아무것도 안 보임 (null)
                    null
                )}

                <br />
                <Button color="red" onClick={handleLogout}>로그아웃</Button>
            </div>
        </div>
    );
}

export default Home;