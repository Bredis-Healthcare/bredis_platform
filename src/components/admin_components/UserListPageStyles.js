import styled from 'styled-components';

export const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; // Full viewport height
    background-color: #f5f5f5;
`;

export const UserList = styled.ul`
    max-width: 600px; // Limit the width
    width: 100%;
    padding: 20px;
    background-color: #ffffff;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 5px;
    list-style-type: none;
    margin: 0;
`;

export const UserItem = styled.li`
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center; // Center items vertically
    border-bottom: 1px solid rgba(0,0,0,0.1);

    &:last-child {
        border-bottom: none;
    }
`;

export const UserInfos = styled.div`
    display: flex;
    flex-direction: column; // Stack items vertically
    align-items: flex-start;
`;

export const UserName = styled.div`
    font-size: 24px; // Increase font size
    font-weight: bold; // Make it bold
    margin-bottom: 10px; // Add spacing between name and info
`;

export const UserInfo = styled.div`
    font-size: 16px;
    margin-bottom: 3px;
`;

export const UserButton = styled.button`
    padding: 5px 10px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
        background-color: #2980b9;
    }
`;
