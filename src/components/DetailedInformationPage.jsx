import React, { useState, useEffect } from 'react';
import {
    MainContainer, InfoBox, HistoryContainer, HistoryItem, DownloadLink , UploadLink,
} from './DetailedInformationPageStyles';
import  {useNavigate, useLoaderData, } from "react-router-dom";
import axios from "../api/axios";
import FileUploadModal from './FileUploadModal';

export async function loader({ params }) {
    const orderId = params.orderId
    return { orderId };
}


const DetailedInformationPage = () => {
    const [data, setData] = useState(null); // or your fetching logic
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const { orderId } = useLoaderData();

    useEffect(() => {
        setData(orderInfo);  
        // fetchData();
    }, [])
    
    // const fetchData = async () => {
    //     const request = await axios.get(`/orders/${orderId}/detail`);
    //     console.log('request', request.data);
    //     console.log('!!!');
    //     setData(request.data);
    // };  


    const handleUploadClick = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

  

    const orderInfo = {
        id: 3,
        orderNumber: "202308090246-61f81f",
        member_id: 1,
        items: "testItem",
        status: "분석 진행중",
        analysisHistory: [
          {
            createdDatetime: "2023-08-10 14:37:00",
            text: "원자재 입고가 완료되어 분석을 시작합니다."
          },
          {
            createdDatetime: "2023-08-10 14:37:00",
            text: "원자재 입고가 완료되어 분석을 시작합니다."
          }
        ],
        sampleDataExampleDownloadLink: "",
        sampleDataDownloadLink: "test-service/202308090246-61f81f/SAMPLE_DATA_202308090246-61f81f.csv",
        reportDownloadLink: "test-service/202308090246-61f81f/REPORT_202308090246-61f81f.pdf",
        fakeReportDownloadLink: "test-service/202308090246-61f81f/TEMP_REPORT_202308090246-61f81f.pdf",
        price: 15000,
        paymentHistory: [
          {
            createdDatetime: "2023-08-10 14:37:00",
            text: "1,000,000 결제 (계좌 이체) / 잔금 1,370,000"
          },
          {
            createdDatetime: "2023-08-10 14:37:00",
            text: "1,000,000 결제 (계좌 이체) / 잔금 1,370,000"
          }
        ],
        createdDatetime: "2023-08-09 02:46:40",
        updatedDatetime: "2023-08-09 02:46:40"
      };

      
    return (
        <MainContainer>
            {data ? (
                <>
                <h1>Order #{data.orderNumber}</h1>
                <InfoBox>
                    <p><strong>Status:</strong> {data.status}</p>
                    <p><strong>Items:</strong> {data.items}</p>
                    <p><strong>Price:</strong> {data.price}</p>
                </InfoBox>
    
                <HistoryContainer>
                    <h2>Analysis History</h2>
                    {data.analysisHistory.map((history, index) => (
                        <HistoryItem key={index}>
                            <span>{history.createdDatetime}</span>
                            <p>{history.text}</p>
                        </HistoryItem>
                    ))}
                </HistoryContainer>
    
                <HistoryContainer>
                    <h2>Payment History</h2>
                    {data.paymentHistory.map((payment, index) => (
                        <HistoryItem key={index}>
                            <span>{payment.createdDatetime}</span>
                            <p>{payment.text}</p>
                        </HistoryItem>
                    ))}
                </HistoryContainer>
    
                <DownloadLink href={data.sampleDataDownloadLink}>Download Sample Data</DownloadLink>
                <DownloadLink href={data.reportDownloadLink}>Download Report</DownloadLink>
                <DownloadLink href={data.fakeReportDownloadLink}>Download Fake Report</DownloadLink>
                <UploadLink onClick={() => handleUploadClick()} >Upload Data</UploadLink>
                <FileUploadModal isOpen={isModalOpen} closeModal={closeModal} />
                </>
                ):(
                    <p>Loading...</p>
                )
            }
            
        </MainContainer>
    );
};

export default DetailedInformationPage;
