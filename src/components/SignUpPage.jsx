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
            <InputLabel>Email</InputLabel>
            <SignupInput 
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputLabel>Password</InputLabel>
            <SignupInput 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <InputLabel>Confirm Password</InputLabel>
            <SignupInput 
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <PasswordMatchInfo>
                {confirmPassword && (password === confirmPassword ? 'Passwords match!' : 'Passwords do not match!')}
            </PasswordMatchInfo>
            <InputLabel>Name</InputLabel>
            <SignupInput 
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <InputLabel>Phone Number</InputLabel>
            <SignupInput 
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <InputLabel>Organization</InputLabel>
            <SignupInput 
                type="text"
                placeholder="Organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
            />
            <InputLabel>Department</InputLabel>
            <SignupInput 
                type="text"
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
            />
            <InputLabel>Position</InputLabel>
            <SignupInput 
                type="text"
                placeholder="Position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
            />
            <SignupButton onClick={handleSignup}>Sign Up</SignupButton>
        </SignupContainer>
    );
};

export default SignUpPage;
