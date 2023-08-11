import styled from 'styled-components';

export const MainContainer = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    background-color: #f5f5f5;
    border-radius: 5px;
`;

export const InfoBox = styled.div`
    padding: 15px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
    margin-bottom: 20px;

    p {
        margin: 10px 0;
    }
`;

export const HistoryContainer = styled.div`
    margin-bottom: 20px;

    h2 {
        margin-bottom: 15px;
    }
`;

export const HistoryItem = styled.div`
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
    margin-bottom: 10px;

    span {
        font-weight: bold;
        margin-right: 10px;
    }
`;

export const DownloadLink = styled.a`
    display: block;
    padding: 10px;
    background-color: #007BFF;
    color: #fff;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 10px;
    text-decoration: none;

    &:hover {
        background-color: #0056b3;
    }
`;

export const UploadLink = styled.a`
    display: block;
    padding: 10px;
    background-color: #003BFF;
    color: #fff;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 10px;
    text-decoration: none;

    &:hover {
        background-color: #0056b3;
    }
`;

