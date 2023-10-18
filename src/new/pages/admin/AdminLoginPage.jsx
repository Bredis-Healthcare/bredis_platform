import React, { useEffect, useState } from 'react';
import { LoginContainer, LoginButton, LoginInput, LoginImage, SignupButton } from '../LoginPageStyles';
import axios from "../../../api/axios";
import  {useNavigate  } from "react-router-dom";
import {useCookies} from 'react-cookie';

// Main login component
const LoginPage = () => {
    
    // States for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie] = useCookies(['name']);
    const navigate = useNavigate();


    // Function to handle form submission
    const handleLogin = (e) => {
        e.preventDefault();
        async function loginPress() {
            try {
                const request = await axios.post('/admin/login', {
                    "email": email,  // using state value for email
                    "password": password  // using state value for password
                });
                
                if(request !== "오류"){
                    //console.log("request data", request.data["memberId"], "authToken", request.data["authToken"]);
                    setCookie('login', {id : request.data["memberId"], authToken : request.data["authToken"]}, {path : "/" , maxAge : 86400 })
                    navigate("/admin/members/list" );
                }
                else{
                    alert("로그인 정보가 맞지 않습니다.")
                }
            } catch (error) {
                console.error("Error while logging in:", error);
            }
        }
        loginPress();
    };

    return (
        <LoginContainer>
            <p>연구서비스 플랫폼 어드민에 오신 것을 환영합니다.</p>
            <form onSubmit={handleLogin}>
                <LoginInput
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{position: 'relative', left: '50%', transform: 'translate(-50%, 0%)'}}
                />
                <LoginInput
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{position: 'relative', left: '50%', transform: 'translate(-50%, 0%)'}}
                />
                <LoginButton
                    type="submit"
                    style={{position: 'relative', left: '50%', transform: 'translate(-50%, 0%)'}}
                >
                    로그인
                </LoginButton>
            </form>
        </LoginContainer>
    );
};

export default LoginPage;
