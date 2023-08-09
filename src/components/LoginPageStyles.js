import styled from 'styled-components';

// Image displayed at the top of the login form
export const LoginImage = styled.img`
    width: 80%; // Set the image width
    max-width: 300px; // Max width to make it responsive
    margin-bottom: 20px; // Space below the image
`;

// Container for the login form
export const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60vh; // Reduced height to 60% of the viewport
    margin-top: 10vh; // Added top margin for spacing above the container
    width: 100%;
    background-color: #f7f7f7;
    max-width: 400px; // Set a max width for larger screens
    margin-left: auto;
    margin-right: auto; // Center the container on larger screens

    // Media query to make the container responsive on larger screens
    @media (min-width: 768px) {
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
`;

// Styled input fields
export const LoginInput = styled.input`
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    width: 80%;
`;

// Common button styles for both Login and Sign Up
const ButtonStyles = `
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;
    width: 48%; // Set the width of both buttons to be nearly half of the parent div, considering a little space in between
`;

// Styled login button
export const LoginButton = styled.button`
    ${ButtonStyles} // Using the common styles
    background-color: #007BFF;

    &:hover {
        background-color: #0056b3;
    }
`;

// Styled sign-up button
export const SignupButton = styled.button`
    ${ButtonStyles} // Using the common styles
    background-color: #28a745;

    &:hover {
        background-color: #218838;
    }
`;