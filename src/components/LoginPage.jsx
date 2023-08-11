import React, { useState } from 'react';
import { LoginContainer, LoginButton, LoginInput, LoginImage, SignupButton } from './LoginPageStyles';
import logo from '../img/bredis_logo.png'
import axios from "../api/axios";
import  {useNavigate  } from "react-router-dom";

// Main login component
const LoginPage = () => {
    
    // States for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();




    // Function to handle form submission
    const handleLogin = (e) => {
        e.preventDefault();
        async function loginPress() {
            try {
                const request = await axios.post('login', {
                    "email": email,  // using state value for email
                    "password": password  // using state value for password
                });
                console.log("request data", request.data["memberId"]);
                
                navigate(`/Mypage/${request.data["memberId"]}`  );
                
            } catch (error) {
                console.error("Error while logging in:", error);
            }
        }
        loginPress();
    };

    return (
        <LoginContainer>
            <LoginImage src={logo} alt="Login Illustration" />
            <LoginInput 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <LoginInput 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <LoginButton onClick={handleLogin}>Login</LoginButton>
            <SignupButton 
                onClick={() => navigate("/signup"  )}
            >
                Sign Up
            </SignupButton>
        </LoginContainer>
    );
};

export default LoginPage;
