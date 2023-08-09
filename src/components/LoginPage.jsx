import React, { useState } from 'react';
import { LoginContainer, LoginButton, LoginInput, LoginImage, SignupButton } from './LoginPageStyles';
import logo from '../img/bredis_logo.png'

// Main login component
const LoginPage = () => {
    // States for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Function to handle form submission
    const handleLogin = (e) => {
        e.preventDefault();
        // Logic for handling login can be added here
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
            <SignupButton>Sign Up</SignupButton>
        </LoginContainer>
    );
};

export default LoginPage;
