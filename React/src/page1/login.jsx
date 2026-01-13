import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';
import { Button } from "flowbite-react";
import { initFlowbite } from 'flowbite';



const Login = () => {
    const [inputs, setInputs] = useState({
        employeeNo: '',
        password: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        initFlowbite();
    }, []);

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };


    const handleLogin = async () => {
        try {
            await api.post('/api/login', inputs);
            alert("로그인 성공");
            navigate("/home")
        } catch (e) {
            alert("로그인 실패: 사번이나 비밀번호를 확인해주세요.");
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">로그인</h2>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">사번</label>
                        <input
                            name='employeeNo'
                            type="text"
                            placeholder='사번 입력'
                            value={inputs.employeeNo}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호</label>
                        <input
                            name='password'
                            type='password'
                            placeholder='비밀번호 입력'
                            value={inputs.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        />
                    </div>
                </div>

                <div className="mt-8">
                    <Button 
                        color="blue" 
                        pill 
                        onClick={handleLogin}
                        className="w-full"
                    >
                        로그인
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default Login;