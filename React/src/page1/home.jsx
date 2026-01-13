import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';
import { Badge, Avatar } from 'flowbite-react';
import { 
  HiLogout, HiUserAdd, HiHome, HiUserCircle, HiChevronRight, 
  HiMail, HiPhone, HiIdentification, HiBriefcase, HiCalendar, HiShieldCheck
} from 'react-icons/hi';

function Home() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('record');
    const navigate = useNavigate();

    const today = new Date();
    const dateString = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

    useEffect(() => {
        api.get('/api/check-login')
            .then(res => {
                setUser(res.data);
                setLoading(false);
            })
            .catch(() => {
                alert("로그인이 필요합니다.");
                navigate('/login');
            });
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await api.post('/api/logout');
            navigate('/login');
        } catch (err) {
            navigate('/login');
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F6F6F6]">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900 mb-4"></div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">System Initializing...</p>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-[#F3F4F6] font-sans text-gray-900">
            
            {/* --- 사이드바: 정갈한 크기로 조정 --- */}
            <aside className="hidden lg:flex flex-col w-64 bg-[#111827] text-white fixed h-full z-30 shadow-xl">
                <div className="p-6 h-20 flex items-center border-b border-gray-800">
                    <span className="text-xl font-black tracking-tight italic text-blue-500">HR PORTAL</span>
                </div>
                
                <nav className="flex-1 p-4 space-y-1">
                    <SidebarItem 
                        icon={<HiHome className="text-lg" />} 
                        label="대시보드 메인" 
                        isActive={activeTab === 'record'} 
                        onClick={() => setActiveTab('record')} 
                    />
                    <SidebarItem 
                        icon={<HiUserCircle className="text-lg" />} 
                        label="내 정보 관리" 
                        isActive={activeTab === 'info'} 
                        onClick={() => setActiveTab('info')} 
                    />
                    {user?.role === 'ADMIN' && (
                        <div className="mt-8 border-t border-gray-800 pt-6">
                            <p className="px-4 text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest">Admin Menu</p>
                            <Link to="/admin/register">
                                <SidebarItem icon={<HiUserAdd className="text-lg" />} label="신규 사원 등록" />
                            </Link>
                        </div>
                    )}
                </nav>

                <div className="p-6 border-t border-gray-800">
                    <button onClick={handleLogout} className="flex items-center text-sm font-bold text-gray-400 hover:text-white transition-colors w-full px-4 py-2">
                        <HiLogout className="mr-3 text-lg" /> 로그아웃
                    </button>
                </div>
            </aside>

            {/* --- 메인 영역 --- */}
            <main className="flex-1 ml-64 min-h-screen flex flex-col">
                <header className="bg-white border-b border-gray-200 h-20 px-10 flex justify-between items-center sticky top-0 z-20 shadow-sm">
                    <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">
                        {activeTab === 'record' ? 'Dashboard Overview' : 'Employee Master Record'}
                    </h2>
                    <div className="flex items-center gap-6">
                        <div className="text-right border-r pr-6 border-gray-100">
                            <p className="text-sm font-black text-gray-900">{user?.name} {user?.position}</p>
                            <p className="text-[10px] font-bold text-gray-400 tracking-wider">{user?.employeeNo}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-bold text-gray-400">{dateString}</span>
                            <Avatar placeholderInitials={user?.name?.charAt(0)} rounded size="sm" />
                        </div>
                    </div>
                </header>

                <div className="p-10 w-full max-w-[1400px] mx-auto">
                    {activeTab === 'record' ? (
                        /* --- 대시보드 뷰 --- */
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                <CheckCard label="입실 체크 / Check-In" time="--" btnText="출근 등록" type="in" />
                                <CheckCard label="퇴실 체크 / Check-Out" time="--" btnText="퇴근 등록" type="out" />
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                <StatCard label="이번 달 근무일" value="--" unit="일" />
                                <StatCard label="근태 특이사항" value="--" unit="회" color="text-red-500" />
                                <StatCard label="연차 잔여일" value="--" unit="일" />
                                <StatCard label="초과 근로" value="--" unit="시간" />
                            </div>
                        </div>
                    ) : (
                        /* --- 내 정보 뷰 (이미지 스타일 최적화) --- */
                        <div className="animate-in fade-in slide-in-from-bottom-3 duration-700 space-y-10">
                            
                            {/* 상단 프로필 배너 (크기 최적화) */}
                            <div className="relative bg-white rounded-[32px] border border-gray-200 shadow-sm overflow-hidden min-h-[280px]">
                                <div className="h-[180px] bg-[#1a1f2c] relative">
                                    <div className="absolute bottom-6 left-[240px]">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h2 className="text-3xl font-black text-white tracking-tight">{user?.name}</h2>
                                            <Badge color="success" className="bg-[#dcfce7] text-[#166534] font-black px-2 py-0.5 rounded text-[10px]">재직중</Badge>
                                        </div>
                                        <p className="text-gray-400 font-bold text-sm">
                                            {user?.position} <span className="mx-2 opacity-20 text-white">|</span> {user?.employeeNo}
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute top-[80px] left-12">
                                    <div className="bg-white p-4 rounded-[40px] shadow-xl inline-block border border-gray-100">
                                        <div className="bg-[#4a5568] w-[120px] h-[120px] rounded-[32px] flex items-center justify-center border border-gray-100">
                                            <span className="text-white text-2xl font-black opacity-40 uppercase">{user?.name?.charAt(0)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-[100px] bg-white w-full"></div>
                            </div>

                            {/* 상세 데이터 그리드 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
                                <InfoField label="공식 이메일" value={user?.email} icon={<HiMail />} />
                                <InfoField label="연락처 (MOBILE)" value={user?.phone} icon={<HiPhone />} />
                                <InfoField label="사원 번호" value={user?.employeeNo} icon={<HiIdentification />} />
                                <InfoField label="입사 일자" value={user?.joinDate} icon={<HiCalendar />} />
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

// --- 표준 컴포넌트 ---

function SidebarItem({ icon, label, isActive, onClick }) {
    return (
        <button 
            onClick={onClick}
            className={`flex items-center w-full px-5 py-3 rounded-xl text-sm font-bold transition-all ${isActive ? 'bg-white text-black shadow-md' : 'text-gray-500 hover:text-white hover:bg-gray-800'}`}
        >
            <span className="mr-3">{icon}</span>
            {label}
        </button>
    );
}

function CheckCard({ label, time, btnText, type }) {
    return (
        <div className="bg-white border border-gray-200 p-8 rounded-[24px] flex justify-between items-center shadow-sm">
            <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{label}</p>
                <p className={`text-4xl font-black ${type === 'in' ? 'text-gray-900' : 'text-gray-200'}`}>{time}</p>
            </div>
            <button className={`px-8 py-3 rounded-xl font-black text-sm transition-all active:scale-95 ${type === 'in' ? 'bg-black text-white hover:bg-gray-800 shadow-lg shadow-black/10' : 'bg-gray-50 text-gray-300 border border-gray-100 cursor-not-allowed'}`}>
                {btnText}
            </button>
        </div>
    );
}

function StatCard({ label, value, unit, color = "text-gray-900" }) {
    return (
        <div className="bg-white border border-gray-200 p-8 rounded-[24px] shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">{label}</p>
            <p className={`text-3xl font-black ${color}`}>
                {value}
                <span className="text-xs ml-1 font-bold text-gray-300 uppercase">{unit}</span>
            </p>
        </div>
    );
}

function InfoField({ label, value, icon }) {
    return (
        <div className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm flex items-center gap-6 group hover:border-black transition-all">
            <div className="text-3xl text-gray-200 group-hover:text-black transition-colors">{icon}</div>
            <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-lg font-black text-gray-900 tracking-tight">{value || '-'}</p>
            </div>
        </div>
    );
}

export default Home;