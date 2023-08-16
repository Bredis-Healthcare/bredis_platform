import styled from 'styled-components';

// Main container for the chat thread page
export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    background-color: #f5f5f5;
`;

// Individual chat box style
export const ChatBox = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    &:last-child {
        border-bottom: none;
    }
`;

// User information within each chat box
export const UserInfo = styled.div`
    flex: 1;
    font-weight: bold;
    margin-right: 10px;
`;

// Chat content within each chat box
export const ChatContent = styled.div`
    flex: 2;
    background-color: #e0e0e0;
    padding: 5px 10px;
    border-radius: 5px;
`;

export const InputBox = styled.input`
    width: 100%;
    padding: 10px;
    margin-top: 20px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    outline: none;
`;

// Send button to send the chat message
export const SendButton = styled.button`
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #007BFF;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease; // Smooth color transition

    &:hover {
        background-color: #0056b3;
    }
`;

