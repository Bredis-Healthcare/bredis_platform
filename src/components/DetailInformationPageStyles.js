import styled from 'styled-components';

// Main outer container for centering the detail container
export const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; // Full viewport height
    background-color: #f5f5f5;
`;

// Main container for the detail page
export const DetailContainer = styled.div`
    max-width: 800px; // Limit the width
    width: 100%;
    padding: 20px;
    background-color: #f1f1f1;
    border-radius: 10px;
    overflow-y: auto; // Add scrolling if content overflows
`;

// Header style
export const Header = styled.h2`
    font-size: 24px;
    color: #333;
    margin-top: 20px;
`;

// Information box style
export const InfoBox = styled.div`
    background-color: #fff;
    padding: 20px;
    margin: 10px 0;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 5px;
`;

// Order state box style
export const StateBox = styled.div`
    color: #555;
    margin-bottom: 20px;
    font-weight: bold;
`;

export const HistoryContainer = styled.div`
    background-color: #fff;
    padding: 20px;
    margin: 10px 0;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 5px;
    max-height: 100px; // Limit the height of the box
    overflow-y: auto; // Add vertical scrolling if content overflows
`;

export const HistoryList = styled.ul`
    list-style-type: none;
    padding-left: 0;
    color: #555;
    margin: 0;
`;

// Button container style
export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0;

    button {
        width: 48%; // To ensure equal widths for two buttons
        padding: 8px 12px;
        background-color: #007BFF;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #0056b3;
        }
    }
`;

// Report container with date info
export const ReportContainer = styled.div`
    display: flex;
    flex-direction: column;

    div {
        display: flex;
        align-items: center;
        margin: 10px 0;

        button {
            margin-right: 10px;
            padding: 8px 12px;
            background-color: #28a745;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;

            &:hover {
                background-color: #218838;
            }
        }
    }
`;

// Created date information style
export const DateInfo = styled.span`
    color: #777;
`;
