import styled from 'styled-components';

export const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalContent = styled.div`
    width: 40%; // Adjust width as needed
    padding: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    position: relative;
`;

export const CloseButton = styled.button`
    position: absolute;
    right: 10px;
    top: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
`;

export const InputBox = styled.div`
    margin-bottom: 15px;

    label {
        display: block;
        margin-bottom: 5px;
    }

    input {
        width: 100%;
        height: 250px;
        padding: 8px;
        box-sizing: border-box;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
`;

export const SubmitButton = styled.button`
    width: 100%;
    padding: 8px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;
