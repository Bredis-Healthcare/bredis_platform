import React, { useState, useEffect } from 'react';
import {
    MainContainer, InfoBox, HistoryContainer, HistoryItem, DownloadLink , UploadLink, DropdownSelect, SelectButton, InputBox,
} from './DetailedInformationPageStyles';
import  {useNavigate, useLoaderData, } from "react-router-dom";
import axios from "../api/axios";
import FileUploadModal from './FileUploadModal';

export async function loader({ params }) {
    const orderId = params.orderId
    const isAdmin = false
    return { orderId , isAdmin};
}

export async function adminloader({ params }) {
    const orderId = params.orderId
    const isAdmin = true
    return { orderId, isAdmin };
}

const DetailedInformationPage = () => {
    const [data, setData] = useState(null); // or your fetching logic
    const [statusList, setStatusList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [adminmassage1, setAdminmassage1] = useState('');
    const [adminmassage2, setAdminmassage2] = useState('');
    const navigate = useNavigate();
    const { orderId, isAdmin } = useLoaderData();
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOptionCode, setSelectedOptionCode] = useState('');

    useEffect(() => {
        // setData(orderInfo);  
        fetchData();
    }, [])
    
    const fetchData = async () => {
        const request = await axios.get(`/orders/${orderId}/detail`);
        const statusRequest = await axios.get(`/orders/status/list`);

        setData(request.data);
        setStatusList(statusRequest.data.list)
        setSelectedOption(request.data.status)
        console.log("request", request, "statusRequest", statusRequest)
        
    };  




    const handleUploadClick = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const handleDropdownOptionSelect = async () => {
        statusList.map( async (value) => {
            // console.log(value.title, selectedOption)
            if(value.title === selectedOption )
            {
                // console.log("!")
                setSelectedOptionCode(value.code)
                
                // alert(`You selected: ${selectedOption} Code : ${value.code}`);
                const request = await axios.patch(`/orders/${orderId}/status?status=${value.code}`); 
                fetchData();
                console.log(request)
            }
         })
    };

    const handleAdminMassage1 = async () => {
        const request = await axios.post(`/orders/${orderId}/analysis-history`, { "historyText": adminmassage1 });
        setAdminmassage1('');
        console.log(request);
        
        await fetchData();
    }

    const handleAdminMassage2 = async () => {
        const request = await axios.post(`/orders/${orderId}/payment-history`, { "historyText": adminmassage2 });
        setAdminmassage1('');
        console.log(request);

        await fetchData();
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
                <h1>주문번호 #{data.orderNumber}</h1>
                <InfoBox>
                    <p><strong>주문 항목:</strong> {data.items}</p>
                    <p><strong>주문 상태:</strong> {data.status}</p>
                    <p><strong>금액:</strong> {data.price}</p>
                </InfoBox>
                <div>
                {
                    isAdmin ?
                    <div>
                        <DropdownSelect value={selectedOption} onChange={(e) => {setSelectedOption(e.target.value)}} >
                            <option value="" disabled>수정 할 상태를 고르세요</option>
                            {statusList.map((value) => (
                                <option value={value.title}>{value.title}</option>
                            ))}
                        </DropdownSelect>
                        <SelectButton onClick={handleDropdownOptionSelect}>상태 수정하기</SelectButton>
                    </div>
                      :
                    <></>
                }
                </div>
                <HistoryContainer>
                    <h2>분석 히스토리</h2>
                    <InfoBox>
                        {data.analysisHistory.map((history, index) => (
                            <HistoryItem key={index}>
                                <span>{history.createdDatetime}</span>
                                <p>{history.text}</p>
                            </HistoryItem>
                        ))}
                    </InfoBox>
                </HistoryContainer>
                <div>
                {
                    isAdmin ?
                    <div>
                        <InputBox
                            value={adminmassage1}
                            onChange={(e) => setAdminmassage1(e.target.value)}
                            placeholder="업데이트할 분석 내용을 적어주세요"
                        />
                        <SelectButton onClick={handleAdminMassage1}>분석 업데이트</SelectButton>
                    </div>

                      :
                    <></>
                }
                </div>
                <DownloadLink href={data.sampleDataDownloadLink} download>샘플 데이터 양식 다운로드</DownloadLink>
                <UploadLink onClick={() => handleUploadClick()} >샘플 데이터 업로드</UploadLink>
    
                <HistoryContainer>
                    <h2>결제 히스토리</h2>
                    <InfoBox>
                        {data.paymentHistory.map((payment, index) => (
                            <HistoryItem key={index}>
                                <span>{payment.createdDatetime}</span>
                                <p>{payment.text}</p>
                            </HistoryItem>
                        ))}
                    </InfoBox>
                </HistoryContainer>
                <div>
                {
                    isAdmin ?
                    <div>   
                        <InputBox
                            value={adminmassage2}
                            onChange={(e) => setAdminmassage2(e.target.value)}
                            placeholder="업데이트 할 결제 내역을 적어주세요."
                        />
                        <SelectButton onClick={handleAdminMassage2}>결제 업데이트</SelectButton>
                    </div>
                      :
                    <></>
                }
                </div>
                <DownloadLink href={data.reportDownloadLink}>분석 보고서 다운로드</DownloadLink>
                <DownloadLink href={data.fakeReportDownloadLink}>임시 분석 보고서 다운로드</DownloadLink>
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
