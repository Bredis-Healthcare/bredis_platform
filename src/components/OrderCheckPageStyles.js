import styled from 'styled-components';

// Main outer container for centering the order container
export const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; // Full viewport height
    background-color: #f5f5f5;
`;

// Container for all order blocks
export const OrderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;/
    height: 100vh;
    width : 50%;
    background-color: #f1f1f1; // Lighter background color
`;

// Individual order block style
export const OrderBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 80%; // Adjust as needed
    padding: 20px;
    border: 1px solid rgba(0,0,0,0.1); // Subtle border
    border-radius: 5px;
    margin-bottom: 20px;
    background-color: #ffffff; // White background color for blocks
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05); // Softer shadow
`;

// Information within each order block
export const OrderInfo = styled.p`
    margin: 5px 0;
    font-size: 16px;
    color: #555; // Darker font color
`;

// Button to see detailed information
export const DetailButton = styled.button`
    margin-top: 15px;
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
