import styled from 'styled-components';

// Container for the signup form
export const SignupContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh; 
    margin-top: 10vh;
    width: 100%;
    background-color: #f7f7f7;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;

    @media (min-width: 768px) {
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
`;

// Styled component for input labels
export const InputLabel = styled.label`
    font-size: 16px;
    font-weight: bold;
    margin: 10px 0 5px 0;
    color: #333;
    width: 80%; // Match the width of the input fields for consistency
`;

// Styled input fields for signup details
export const SignupInput = styled.input`
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    width: 80%;
`;

// Styled signup button
export const SignupButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #007BFF;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;

    &:hover {
        background-color: #0056b3;
    }
`;

export const PasswordMatchInfo = styled.p`
    color: red; // Color for mismatch information
    font-size: 14px;
    margin: 0;
    padding: 0;
    height: 20px; // Ensuring consistent spacing

    // If the content is 'Passwords match!', then color it green
    ${props => props.children === '비밀번호가 일치합니다.' && `
        color: green;
    `}
`;