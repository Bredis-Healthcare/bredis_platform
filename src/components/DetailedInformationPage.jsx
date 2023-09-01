import React, { useState, useEffect } from 'react';
import {
    MainContainer, InfoBox, HistoryContainer, HistoryItem, DownloadLink , UploadLink, DropdownSelect, SelectButton, InputBox,
} from './DetailedInformationPageStyles';
import  {useNavigate, useLoaderData, } from "react-router-dom";
import axios from "../api/axios";
import FileUploadModal from './modals/FileUploadModal';
import AnalisisResultChangeModal from './modals/AnalisisResultChangeModal';

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
    const [isFileUploadModalOpen, setIsFileUploadModalOpen] = useState(false);
    const [isAnalysisResultChangeModalOpen, setIsAnalysisResultChangeModalModalOpen] = useState(false);
    const [adminmassage1, setAdminmassage1] = useState('');
    const [adminmassage2, setAdminmassage2] = useState('');
    const navigate = useNavigate();
    const { orderId, isAdmin } = useLoaderData();
    const [selectedOption, setSelectedOption] = useState('');
    

    useEffect(() => {
        fetchData();
    }, [])

    
    const fetchData = async () => {
        try {
            const request = await axios.get(`/orders/${orderId}/detail`);
            const statusRequest = await axios.get(`/protocols`);
    
            setData(request.data);
            setStatusList(statusRequest.data.orderStatusList)
            setSelectedOption(request.data.status)
            console.log("request", request, "statusRequest", statusRequest)
            
        } catch (error) {
            console.log("error", error)
        }
        
    };  



    const handleDownloadClick = async (e, fileName, fileType) => {
        if (!fileName) {
            alert('아직 파일이 등록되지 않았습니다.');
            return;
        }
        const request = await axios.get(`/orders/${orderId}/files?type=${fileType}&fileName=${fileName}`);
        const downloadUrl = request.data.link;
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', `FileName.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    }

    const handleUploadClick = () => {
        setIsFileUploadModalOpen(true);
    }

    const closeFileUploadModal = () => {
        setIsFileUploadModalOpen(false);
    }

    const handleAnalysisResultChangeClick = () => {
        setIsAnalysisResultChangeModalModalOpen(true);
    }

    const closeAnalysisResultChangeModal = (doReload) => {
        setIsAnalysisResultChangeModalModalOpen(false);
        if(doReload){
            window.location.reload(false)
        }
    }

    const handleDropdownOptionSelect = async () => {
        statusList.map( async (value) => {
            // console.log(value.title, selectedOption)
            if(value.title === selectedOption )
            {
                // console.log("!")
                
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
                
                <h1>분석결과</h1>
                <InfoBox >
                    {
                        data.analysisResult ?
                        <div>{data.analysisResult}</div> :
                        "분석이 아직 진행 중 입니다."
                    }
                </InfoBox>

                {
                    isAdmin ? <SelectButton onClick={handleAnalysisResultChangeClick}>분석 결과 수정하기</SelectButton> : <></>
                }

                <h1>분석 정보</h1>
                    {
                        isAdmin ?
                            <div>
                                <UploadLink style={{width: '40%', display:'inline-block'}} onClick={() => handleUploadClick()} >분석 보고서 업로드</UploadLink>
                                <UploadLink style={{width: '40%', display:'inline-block'}} onClick={() => handleUploadClick()} >분석 가보고서 업로드</UploadLink>
                            </div> :
                            <div>
                                <DownloadLink style={{width: '40%', display:'inline-block'}} onClick={(e) => handleDownloadClick(e, data.reportFileName, "REPORT")} download>분석 보고서 다운로드</DownloadLink>
                                <DownloadLink style={{width: '40%', display:'inline-block'}} onClick={(e) => handleDownloadClick(e, data.dummyReportFileName, "DUMMY_REPORT")} download>분석 가보고서 다운로드</DownloadLink>
                            </div>



                    }

                    {
                        isAdmin ? <></> : <p><strong>상태:</strong> {data.status}</p>
                    }
                <div>
                    {
                    isAdmin ?
                        <div>
                            <h3 style={{display:"inline"}}>상태: </h3>
                            <DropdownSelect value={selectedOption} onChange={(e) => {setSelectedOption(e.target.value)}}
                                style={{display:"inline"}}>
                                <option value="" disabled>수정할 상태를 선택해주세요</option>
                                {statusList.map((value) => (
                            <option value={value.title}>{value.title}</option>
                            ))}
                            </DropdownSelect>
                            <SelectButton style={{display:"inline"}} onClick={handleDropdownOptionSelect}>수정하기</SelectButton>
                        </div>
                      :
                    <></>
                }
                </div>

                <h1>검체 정보</h1>

                    {
                        isAdmin ?
                            <DownloadLink style={{width: '40%', display:'inline-block'}} onClick={(e) => handleDownloadClick(e, data.sampleDataFileName, "SAMPLE_DATA")} download>검체 데이터 다운로드</DownloadLink> :
                            <div>
                                <DownloadLink style={{width: '40%', display:'inline-block'}} href={`https://drive.google.com/uc?export=download&id=1Um9eFOIDWFVslcgH-36AeLRYzGPLwyjY`} download>검체 데이터 양식 다운로드</DownloadLink>
                                <UploadLink style={{width: '40%', display:'inline-block'}} onClick={() => handleUploadClick()} >검체 데이터 업로드</UploadLink>
                            </div>
                    }
                <h3>분석 내역</h3>
                <HistoryContainer>
                    <InfoBox>
                        {
                            data.analysisHistory.length > 0 ? 
                            <div>{data.analysisHistory.map((history, index) => (
                                <HistoryItem key={index}>
                                    <span>{history.createdDatetime}</span>
                                    <p>{history.text}</p>
                                </HistoryItem>
                            ))}</div> :
                            <div>내역이 존재하지 않습니다.</div> 
                            
                        }
                        
                    </InfoBox>
                </HistoryContainer>
                <div>
                {
                    isAdmin ?
                    <div>
                        <InputBox
                            value={adminmassage1}
                            onChange={(e) => setAdminmassage1(e.target.value)}
                            placeholder="추가할 분석 내용을 입력해주세요"
                        />
                        <SelectButton onClick={handleAdminMassage1}>분석 내역 추가</SelectButton>
                    </div>

                      :
                    <></>
                }
                </div>
    
                <HistoryContainer>
                    <h1>결제 내역</h1>
                    <InfoBox>
                        {
                            data.paymentHistory.length > 0 ?
                            <div>
                                {data.paymentHistory.map((payment, index) => (
                                    <HistoryItem key={index}>
                                        <span>{payment.createdDatetime}</span>
                                        <p>{payment.text}</p>
                                    </HistoryItem>
                                ))}
                            </div>:
                            <div>내역이 존재하지 않습니다.</div>
                        }
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
                            placeholder="추가할 결제 내용을 입력해주세요."
                        />
                        <SelectButton onClick={handleAdminMassage2}>결제 내역 추가</SelectButton>
                    </div>
                      :
                    <></>
                }
                </div>
                <FileUploadModal orderId = {orderId} isOpen={isFileUploadModalOpen} closeModal={closeFileUploadModal} />
                <AnalisisResultChangeModal orderId = {orderId} prvtext = {data.analysisResult} isOpen={isAnalysisResultChangeModalOpen} closeModal={closeAnalysisResultChangeModal} />
                </>
                ):(
                    <p>Loading...</p>
                )
            }
            
        </MainContainer>
    );
};

export default DetailedInformationPage;
