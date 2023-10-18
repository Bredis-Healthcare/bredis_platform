import React, { useState } from 'react';
import { SignupContainer, SignupButton, SignupInput, PasswordMatchInfo, InputLabel } from './SignUpPageStyles';
import axios from "../api/axios";
import  {useNavigate  } from "react-router-dom";

// Main signup component
const SignUpPage = () => {
    const navigate = useNavigate();
    // States for signup details
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [organization, setOrganization] = useState('');
    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');

    // Function to handle form submission
    const handleSignup = (e) => {
        e.preventDefault();
        async function SignUpPress() {
            try {
                const request = await axios.post('register', 
                {
                    "email": email,
                    "password": password, 
                    "name":  name,
                    "mobile": phoneNumber,
                    "organization":  organization,
                    "department": department,
                    "position":  position,
                });
                console.log("request data", request.data["memberId"]);
                if (
                    !window.confirm(
                      "Sign up message will be mailed after administrator's check"
                    )
                ) {
                    e.preventDefault();
                }

            } catch (error) {
                console.error("Error while logging in:", error);
            }
        }
        SignUpPress();
        navigate("/");
        

        // Logic for handling signup can be added here
    };

    return (
        <SignupContainer>
            <InputLabel>이메일</InputLabel>
            <SignupInput 
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputLabel>비밀번호</InputLabel>
            <SignupInput 
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <InputLabel>비밀번호 확인</InputLabel>
            <SignupInput 
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <PasswordMatchInfo>
                1
                {confirmPassword && (password === confirmPassword ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.')}
            </PasswordMatchInfo>
            <InputLabel>이름</InputLabel>
            <SignupInput 
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <InputLabel>전화번호</InputLabel>
            <SignupInput 
                type="tel"
                placeholder="전화번호"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <InputLabel>조직</InputLabel>
            <SignupInput 
                type="text"
                placeholder="조직"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
            />
            <InputLabel>부서</InputLabel>
            <SignupInput 
                type="text"
                placeholder="부서"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
            />
            <InputLabel>직책</InputLabel>
            <SignupInput 
                type="text"
                placeholder="직책"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
            />
            <SignupButton onClick={handleSignup}>완료</SignupButton>
        </SignupContainer>
    );
};

export default SignUpPage;
