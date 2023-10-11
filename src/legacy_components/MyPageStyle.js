import styled from 'styled-components';

export const MyInfoContainer = styled.div`
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
`;

export const ProfileInfoContainer = styled.div`
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
`;

export const OrderHistoryContainer = styled.div`
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
`;

export const OrderItem = styled.div`
    background-color: #ffffff;
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
    border: solid grey;
    position: relative
`;

export const GoButton = styled.button`
    margin-top: 10px;
    width: 30%;
    padding: 8px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: inline-block;
    position: absolute;
    right: 5%;
    bottom: 10%;

    &:hover {
        background-color: #0056b3;
    }
`;