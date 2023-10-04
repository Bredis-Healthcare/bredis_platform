import styled from 'styled-components';

// Container for the main page
export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60vh;
    width: 100%;
    background-color: #f7f7f7;
`;

// Big image in the middle of the page
export const BigImage = styled.img`
    width: 30%; // Adjust as needed
    height: auto;
    margin-bottom: 20px;
`;

// Button styles for 로그인 and 문의하기
export const MainButton = styled.button`
    padding: 12px 24px;
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-size: 18px;
    margin: 10px;
    width: 200px; // Setting a fixed width for buttons to make them same size
    background-color: ${props => props.primary ? '#007BFF' : '#ffc107'}; // Primary button gets blue color, secondary gets yellow

    &:hover {
        opacity: 0.9; // Slight opacity on hover for better UX
    }
`;
