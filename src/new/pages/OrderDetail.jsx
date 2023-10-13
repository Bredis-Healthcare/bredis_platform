import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate,} from "react-router-dom";
import axios from "../../api/axios";
import Layout from "../components/Layout";
import {useCookies} from "react-cookie";
import PurchaseDetail from "../components/order/PurchaseDetail";
import DownloadButton from "../components/DownloadButton";
import FileUploadModal from "../components/modals/FileUploadModal";

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

const OrderDetail = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['login']);
    const [data, setData] = useState(null); // or your fetching logic
    const [threadData, setThreadData] = useState(null); // or your fetching logic
    const [statusList, setStatusList] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const location = useLocation()
    const navigate = useNavigate()

    const [ pageInfo, setPageInfo ] = useState({});
    useEffect(() => {
        if(location.state != null)
        {
            window.sessionStorage.setItem("pageInfo", JSON.stringify(location.state));
            setPageInfo((pageInfo) => location.state)
        }
        else {
            setPageInfo((pageInfo) => JSON.parse(window.sessionStorage.getItem("pageInfo")))
        }
    }, [])

    useEffect(()=>{
        if(Object.keys(pageInfo).length !== 0)
        {
            fetchData();
        }
    }, [pageInfo])


    const fetchData = async () => {
        try {
            // console.log("!@!", pageInfo)
            const request = await axios.get(`/orders/${pageInfo.resourceId}/detail`);
            const statusRequest = await axios.get(`/protocols`);
            
            // request.data.analysisHistory = [
            //     {
            //         createdDatetime : "2023년 8월 1일",
            //         text : "분석 결과입니다",
            //         analysisResult : "분석결과는 ABCD",
            //         reportFileName : "1234"
            //     },
            //     {
            //         createdDatetime : "2023년 8월 3일",
            //         text : "2차 분석 준비 중입니다",
            //         analysisResult : "",
            //         reportFileName : ""
            //     },
            //     {
            //         createdDatetime : "2023년 8월 5일",
            //         text : "2차 분석 결과입니다",
            //         analysisResult : "분석결과는 abcd",
            //         reportFileName : "12345234"
            //     },
                
            // ];
            setData(request.data);
            setStatusList(statusRequest.data.orderStatusList)
            setSelectedOption(request.data.status)
            console.log("request", request, "statusRequest", statusRequest)
            
        } catch (error) {
            console.log("error", error)
        }
    };

    const [orderInfoOn, setToggleOrderInfo] = useState(false);  // 메뉴의 초기값을 false로 설정
    const [analysisInfoOn, setToggleAnalysisInfo] = useState(false);
    const [threadInfoOn, setToggleThreadInfo] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [onlyResultOn, setOnlyResultOn] = useState(false);

    const toggleOrderInfo = () => {
        setToggleOrderInfo(orderInfoOn => !orderInfoOn); // on,off 개념 boolean
    }
    const toggleAnalysisInfo = () => {
        setToggleAnalysisInfo(analysisInfoOn => !analysisInfoOn);
    }
    async function toggleThreadInfo() {
        if (!threadInfoOn && !threadData) {
            const threadsRequest = await axios.get(`/threads/by-order-number?orderNumber=${pageInfo.resourceId}`);
            setThreadData(threadsRequest.data)
        }
        setToggleThreadInfo(threadInfoOn => !threadInfoOn);
    }

    const [sendModeOn, setSendMode] = useState(false);

    const toggleSendMode = () => {
        setSendMode(sendModeOn => !sendModeOn); // on,off 개념 boolean
    }

    async function submitMessage() {
        let contents = document.getElementById("message").value
        if (window.confirm("메시지를 전송하시겠습니까?")) {

            let file = document.querySelector("#messageFileInput").files[0]
            const formData = new FormData();
            formData.append("file", file);

            await axios.post(`/messages?threadId=${threadData.id}&senderId=${cookies.login && cookies.login['id']}&content=${encodeURIComponent(contents)}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "boundary": "--boundary",
                }}
            );
            const threadsRequest = await axios.get(`/threads/by-order-number?orderNumber=${pageInfo.resourceId}`);
            setThreadData(threadsRequest.data)
            document.getElementById("message").value = ''
        }
    }
    const downloadAllReport = async () => {
        for (const history of data.analysisHistory) {
            if (history.reportFileName) {
                // console.log("!");
                try {
                    const request = await axios.get(`/orders/${data.orderNumber}/files?type=REPORT&fileName=${history.reportFileName}`);
                    let downloadUrl = request.data.link;
                    let link = document.createElement('a');
                    link.href = downloadUrl;
                    link.setAttribute('download', `FileName.pdf`);
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode.removeChild(link);
                } catch (error) {
                    console.error("다운로드 실패: ", error);
                }
                // 다음 파일 다운로드 사이에 일정 시간 지연이 필요하다면 아래 코드를 사용하십시오.
                await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 대기
            }
        }
    }


    const [isFileUploadModalOpen, setIsFileUploadModalOpen] = useState(false);
    const [uploadFileType, setUploadFileType] = useState('');

    const handleUploadClick = (fileType) => {
        setIsFileUploadModalOpen(true);
        setUploadFileType(fileType);
    }

    const closeFileUploadModal = () => {
        setIsFileUploadModalOpen(false);
    }

    const handleCheckboxChange = (e) => {
        // 체크박스의 현재 상태를 반전시킵니다.
        setIsChecked(e.target.checked);
        setOnlyResultOn(e.target.checked);
    };

    return (
        <div>
            {data ? (
                <>
                    <Layout menuName="주문 내역 > 주문 상세" menuNameAddInfo={`${data.orderNumber}`}>
                        <div className="shadow-[0px_0px_4px_2px_rgba(0,0,0,0.25)] w-full max-w-[1222px] self-center flex flex-col ml-[0.5px] mt-[46px] px-[20px] py-[39px]">
                            <div className="w-full max-w-[1098px] mt-[-2px] self-center flex flex-col ml-[16px] mb-[47px]">
                                <div className="w-full max-w-[1047px] flex flex-col">
                                    <div className="flex max-sm:flex-col max-sm:items-stretch">
                                        <div className="flex flex-col items-stretch leading-[normal] w-[calc(55%_-_10px)] max-sm:w-full">
                                            <div className="flex flex-col mt-[12px] max-md:mt-[50px]">
                                                <div className="text-[#888988] not-italic font-normal text-[16px] flex flex-col ml-px max-md:ml-px">
                                                    {data.orderNumber}
                                                </div>
                                                <div className="text-black not-italic font-bold text-[22px] flex flex-col mt-[15px]">
                                                    {data.title}
                                                </div>
                                                <div className="text-[#888988] not-italic font-normal text-[16px] flex flex-col mt-[26px]">
                                                    의뢰내용
                                                </div>
                                                <div className="text-black not-italic font-normal text-[18px] self-stretch flex flex-col mt-[16px]">
                                                    {data.requestDetail}
                                                </div>


                                            </div>
                                        </div>
                                        <div className="flex flex-col items-stretch leading-[normal] w-[calc(45%_-_10px)] ml-[20px] max-sm:w-full">
                                            <div className="flex flex-col max-md:mt-[50px]">
                                                <div className="flex max-sm:flex-col max-sm:items-stretch">
                                                    <div className="flex flex-col items-stretch leading-[normal] w-[calc(78%_-_10px)] max-sm:w-full">
                                                        <div className="flex flex-col items-center max-md:mt-px mt-[4px]">
                                                            <div className="text-[#888988] not-italic font-normal text-[16px] text-center flex flex-col">
                                                                주문일시
                                                            </div>
                                                            <div className="text-black not-italic font-light text-[22px] text-center flex flex-col mt-[21px]">
                                                                {data.createdDatetime}
                                                            </div>
                                                            <div className="text-[#888988] not-italic font-normal text-[16px] text-center flex flex-col mt-[36px]">
                                                                검체 정보
                                                            </div>
                                                            <div className="w-full flex flex-row gap-[5px] items-center justify-center flex-wrap mt-[3px] max-md:justify-center">
                                                                {
                                                                    data.sampleDataFileName ? <>
                                                                        <DownloadButton title='검체 정보 파일 다운로드' fileName={data.sampleDataFileName} fileType="SAMPLE_DATA" orderNumber={data.orderNumber} />
                                                                        <button className="self-stretch flex flex-col mt-[-0px] pl-[17px] pr-[15px] py-[9px] relative"
                                                                                onClick={() => handleUploadClick("SAMPLE_DATA")}>
                                                                            <div className="Rectangle7 w-[117.46px] h-[35px] left-0 top-0 absolute bg-slate-500 rounded-[9px]" />
                                                                            <div className=" w-[108.84px] h-[17px] left-[6px] top-[6px] absolute text-white text-lg font-bold font-['Inter']">수정 업로드</div>
                                                                        </button>
                                                                    </> : <>
                                                                        <button className="self-stretch flex flex-col mt-[-0px] pr-[15px] py-[9px] relative"
                                                                                onClick={() => handleUploadClick("SAMPLE_DATA")}>
                                                                            <div className="Rectangle7 w-[80px] h-[35px] left-[-30px] top-0 absolute bg-slate-500 rounded-[9px]" />
                                                                            <div className=" w-[60px] h-[17px] left-[-21px] top-[4px] absolute text-white text-lg font-bold font-['Inter']">업로드</div>
                                                                        </button>
                                                                    </>
                                                                }

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-stretch leading-[normal] w-[calc(22%_-_10px)] ml-[20px] max-sm:w-full">
                                                        <div className="flex flex-col items-center w-[150px] mt-[4px] max-md:mt-px">
                                                            <div className="text-[#888988] not-italic font-normal text-[16px] self-center text-center flex flex-col ml-[2px]">
                                                                상태
                                                            </div>
                                                            <div className="text-center self-center text-[#035772] w-[150px] not-italic font-bold text-[22px] self-stretch flex flex-col mt-[15px]">
                                                                {data.status}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*구매 내역*/}
                                    <div className="w-full flex flex-row gap-[2.98779296875px] items-start flex-wrap mt-[23px]">
                                        <div className="text-[#888988] not-italic font-normal text-[16px] self-center text-center flex flex-col -mt-px">
                                            구매 내역
                                        </div>
                                        <div className="aspect-[1] object-cover object-center w-[24px] self-stretch shrink-0"
                                             onClick={()=>toggleOrderInfo()}>
                                            <img className={`object-cover object-center ${orderInfoOn ? 'block' : 'hidden'}`} src="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Feede2644e07c40428a85a860afad0b8c?&width=200" alt="" />
                                            <img className={`object-cover object-center ${orderInfoOn ? 'hidden' : 'block'}`} src="https://cdn.builder.io/api/v1/image/assets/TEMP/46b519a3-c692-4c74-8f9f-12d963d49c9f?&width=200" alt="" />
                                        </div>
                                    </div>
                                    <div className={`orderInfo ${orderInfoOn ? 'block' : 'hidden'} ml-[45px] w-[950px]`}>
                                        {
                                            data.purchaseDetail.total ? <PurchaseDetail orderNumber={data.orderNumber} invoiceFileName={data.invoiceFileName} taxInvoiceFileName={data.taxInvoiceFileName} data={data.purchaseDetail} /> :
                                                <div className="text-black not-italic font-normal text-[16px] flex flex-col ml-[54px] mt-[13px] max-md:ml-[10px]">
                                                    구매 내역이 없습니다.
                                                </div>
                                        }

                                    </div>

                                    {/*분석 결과*/}
                                    <div className="w-full flex flex-row gap-[1.3px] items-start flex-wrap mt-[17px]">
                                        <div className="text-[#888988] not-italic font-normal text-[16px] self-center text-center flex flex-col -mt-px">
                                            분석 결과
                                        </div>
                                        <div className="aspect-[1] object-cover object-center w-[24px] self-stretch shrink-0"
                                             onClick={()=>toggleAnalysisInfo()}>
                                            <img className={`object-cover object-center ${analysisInfoOn ? 'block' : 'hidden'}`} src="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Feede2644e07c40428a85a860afad0b8c?&width=200" alt="" />
                                            <img className={`object-cover object-center ${analysisInfoOn ? 'hidden' : 'block'}`} src="https://cdn.builder.io/api/v1/image/assets/TEMP/46b519a3-c692-4c74-8f9f-12d963d49c9f?&width=200" alt="" />
                                        </div>
                                    </div>
                                    <div className={`analysisInfoOn ${analysisInfoOn ? 'block' : 'hidden'} flex flex-col`}>
                                        <div className="text-[#222] not-italic font-bold text-[25px] flex flex-col ml-[51px] mt-[30px] max-md:ml-[10px]">
                                            분석 이력
                                            <br />
                                        </div>
                                        <div className='flex flex-col justify-end items-end ml-auto'>
                                            <div className="">
                                                <input type="checkbox" id="checkbox" checked={isChecked} onChange={handleCheckboxChange} className="accent-slate-500 align-middle mr-[6px] h-[1.15rem] w-[1.15rem] "/>
                                                <label className="align-right text-black text-base font-normal inline-block pl-[0.15rem] hover:cursor-pointer" htmlFor="checkbox">
                                                    분석 보고서만 보기
                                                </label>
                                            </div>
                                            <div className="flex flex-row py-4  hover:cursor-pointer " onClick={downloadAllReport}>
                                                <div>분석 보고서 모두 다운로드</div>
                                                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/09d437dc-f4b1-488e-8408-a412fc62c665?&width=400" alt="downloadIcon" className="inline-block aspect-[1] object-cover object-center w-[22px] ml-[5px] mb-[4px] self-center shrink-0"/>
                                            </div>
                                            </div>
                                        <div className="w-[950px] h-[0px] ml-[45px] flex flex-col mt-[15px] border-[2px] border-black border-opacity-25"/>
                                        <div className="relative">
                                            {
                                                data ?
                                                    ( data.analysisHistory.length > 0 ? <>
                                                        {
                                                            data.analysisHistory.map((history) => (
                                                                <div>
                                                                    { onlyResultOn ? <div>
                                                                        {history.analysisResult && <div>
                                                                                <div className="text-[#222] not-italic font-bold text-[20px] flex flex-col ml-[51px] mt-[30px] max-md:ml-[10px]">분석 결과</div>
                                                                                <div className="w-full max-w-[896px] pb-[-7px] flex flex-col text-black not-italic font-normal text-[16px] z-[1] ml-[39px] mt-[8px] pl-[12px] pr-[20px] pt-[21px] max-md:ml-[10px]">
                                                                                    {history.analysisResult}
                                                                                </div>
                                                                                {
                                                                                    history.reportFileName ? <>
                                                                                        <div className="ml-[750px]">
                                                                                            <DownloadButton title='분석 보고서 다운로드' fileName={history.reportFileName} fileType='REPORT' orderNumber={data.orderNumber} />
                                                                                        </div></> : <></>
                                                                                }
                                                                                
                                                                        <div className="Line7 w-[950px] flex flex-col ml-[45px] my-10 border-[2px] border-black border-opacity-25"></div>
                                                                        </div>}
                                                                    </div> :
                                                                    <div>
                                                                        <div>
                                                                            <div className="text-black not-italic font-light text-[16px] flex flex-col ml-[55px] mt-[12px] max-md:ml-[10px]">
                                                                                {history.createdDatetime}
                                                                            </div>
                                                                            <div className="text-black not-italic font-normal text-[16px] flex flex-col ml-[54px] mt-[13px] max-md:ml-[10px]">
                                                                                {history.text}
                                                                            </div>
                                                                        </div>
                                                                        
                                                                        
                                                                        {history.analysisResult &&<div className="w-[920px] h-[0px] ml-[60px] flex flex-col mt-[15px] border border-black border-opacity-25"/>}
                                                                        <div className="w-[90%] ml-[5%]">
                                                                            {history.analysisResult && <div>
                                                                                <div className="text-[#222] not-italic font-bold text-[20px] flex flex-col ml-[51px] mt-[30px] max-md:ml-[10px]">분석 결과</div>
                                                                                <div className="w-full max-w-[896px] pb-[-7px] flex flex-col text-black not-italic font-normal text-[16px] z-[1] ml-[39px] mt-[8px] pl-[12px] pr-[20px] pt-[21px] max-md:ml-[10px]">
                                                                                    {history.analysisResult}
                                                                                </div>
                                                                                {
                                                                                    history.reportFileName ? <>
                                                                                        <div className="ml-[700px]">
                                                                                            <DownloadButton title='분석 보고서 다운로드' fileName={history.reportFileName} fileType='REPORT' orderNumber={data.orderNumber} />
                                                                                        </div></> : <></>
                                                                                }
                                                                            </div>}
                                                                        </div>
                                                                        
                                                                        <div className="Line7 w-[950px] flex flex-col ml-[45px] my-10 border-[2px] border-black border-opacity-25"></div>
                                                                    </div>}
                                                                </div>
                                                                
                                                            ))
                                                        }
                                                        </> : 
                                                        <>
                                                        <div className="w-full max-w-[896px] pb-[-7px] flex flex-col text-black not-italic font-normal text-[16px] z-[1] ml-[39px] mt-[8px] pl-[12px] pr-[20px] pt-[21px] max-md:ml-[10px]">
                                                            분석 이력이 없습니다.
                                                        </div>
                                                        </>
                                                    ) : <></>
                                            }
                                            
                                            

                                        </div>
                                    </div>

                                    {/*1:1 문의*/}
                                    <div className="w-full flex flex-row gap-[2.98779296875px] items-start flex-wrap mt-[23px]">
                                        <div className="text-[#888988] not-italic font-normal text-[16px] self-center text-center flex flex-col -mt-px">
                                            1:1 문의
                                        </div>
                                        <div className="aspect-[1] object-cover object-center w-[24px] self-stretch shrink-0"
                                             onClick={()=>toggleThreadInfo()}>
                                            <img className={`object-cover object-center ${threadInfoOn ? 'block' : 'hidden'}`} src="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Feede2644e07c40428a85a860afad0b8c?&width=200" alt="" />
                                            <img className={`object-cover object-center ${threadInfoOn ? 'hidden' : 'block'}`} src="https://cdn.builder.io/api/v1/image/assets/TEMP/46b519a3-c692-4c74-8f9f-12d963d49c9f?&width=200" alt="" />
                                        </div>
                                    </div>
                                    <div className={`threadInfoOn ${threadInfoOn ? 'block' : 'hidden'}`}>
                                        <div className="w-full max-w-[1013px] pt-[-1px] pb-[-1px] flex flex-col ml-[51px] mt-[18px] pr-[20px] relative">
                                            <div className="text-black not-italic font-bold text-[20px] mt-[-0px] flex flex-col">
                                                메시지
                                            </div>
                                            <div className="w-full max-w-[972px] left-[0px] top-[0px] self-center flex flex-col mt-[10px] relative">
                                                {threadData && threadData.messages.length > 0 ? threadData.messages.map((message, index) => (
                                                    <div key={index}>
                                                        <div className="Line2 flex flex-col w-[920px] h-[0px] left-[2.83px] border border-black border-opacity-25"></div>
                                                        <div className="flex max-sm:flex-col max-sm:items-stretch">
                                                            <div className="flex flex-col items-stretch leading-[normal] w-[calc(10%_-_10px)] max-sm:w-full my-3">
                                                                <div className="text-black text-[14px] font-light font-['Inter'] text-center flex flex-col my-3">
                                                                    {message.senderName}
                                                                    <br />
                                                                    {message.createdDatetime}
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col items-stretch leading-[normal] w-[calc(90%_-_10px)] ml-[20px] max-sm:w-full my-5">
                                                                <div className="text-black text-[15px] font-medium font-['Inter'] flex flex-col my-5">
                                                                    {message.content}
                                                                </div>
                                                                <div className="flex flex-row-reverse mr-[45px]">
                                                                    {
                                                                        message.files ? message.files.map((file, index) => (
                                                                            <DownloadButton messageId={message.id} title={`첨부파일 ${index + 1}`} fileName={file}/>
                                                                        )).reverse() : <></>
                                                                    }
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                )) : <div>
                                                    <div className="Line2 flex flex-col w-[920px] h-[0px] left-[2.83px] border border-black border-opacity-25"></div>
                                                    <div className="text-black text-[15px] font-medium font-['Inter'] flex flex-col my-5">문의 내역이 없습니다.</div>
                                                </div>
                                                }
                                                <div className="Line2 flex flex-col w-[920px] h-[0px] left-[2.83px] border border-black border-opacity-25"></div>
                                                <div className={`${sendModeOn ? 'block' : 'hidden'}`}>
                                                    <div className=" w-[415px] h-[22px] text-neutral-700 text-[15px] mt-5 font-medium font-['Inter']">※ 간단한 주의사항...</div>
                                                    <textarea id="message" rows="12" className="resize-none left-[0px] top-[10px] relative block p-2.5 mb-3 w-[910px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="메시지를 입력해주세요."></textarea>
                                                    <div className="inline-block text-neutral-700 text-[14px] font-normal font-['Inter'] mt-[5px]">첨부 파일: </div>
                                                    <input id="messageFileInput" className={`inline-block text-[14px] my-[10px] mx-[10px]`} type="file" />
                                                </div>
                                                <div className="flex flex-row-reverse max-sm:flex-col max-sm:items-stretch mr-[50px] mt-[10px]">
                                                    <button className={`${sendModeOn ? 'hidden' : 'block'} w-[120px] h-[35px] relative mx-2 my-2`}
                                                            onClick={()=>toggleSendMode()}>
                                                        <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-slate-500 rounded-[9px]"/>
                                                        <div className=" w-[101px] h-[17px] left-[10px] top-[6px] absolute text-white text-lg font-bold font-['Inter']">메시지 작성</div>
                                                    </button>
                                                    <button className={`${sendModeOn ? 'block' : 'hidden'} w-[120px] h-[35px] relative mx-2 my-2`}
                                                            onClick={() => submitMessage()}>
                                                        <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-slate-500 rounded-[9px]"/>
                                                        <div className=" w-[101px] h-[17px] left-[10px] top-[6px] absolute text-white text-lg font-bold font-['Inter']">메시지 전송</div>
                                                    </button>
                                                    <button className={`${sendModeOn ? 'hidden' : 'block'} w-[120px] h-[35px] relative mx-2 my-2`} onClick={() => navigate(-1)}>
                                                        <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500"/>
                                                        <div className=" w-[79px] h-[17px] left-[20px] top-[7px] absolute text-slate-500 text-lg font-bold font-['Inter']">뒤로 가기</div>
                                                    </button>
                                                    <button className={`${sendModeOn ? 'block' : 'hidden'} w-[120px] h-[35px] relative mx-2 my-2`}
                                                            onClick={()=>toggleSendMode()}>>
                                                        <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500"/>
                                                        <div className=" w-[79px] h-[17px] left-[20px] top-[7px] absolute text-slate-500 text-lg font-bold font-['Inter']">취소</div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button className={`threadInfoOn ${threadInfoOn ? 'hidden' : 'block'} w-[120px] h-[35px] left-[920px] top-[60px] relative mx-2 my-2`} onClick={()=> navigate(-1)}>
                                        <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500"/>
                                        <div className=" w-[79px] h-[17px] left-[20px] top-[7px] absolute text-slate-500 text-lg font-bold font-['Inter']">뒤로 가기</div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <FileUploadModal orderNumber = {data.orderNumber} uploadFileType={uploadFileType} isOpen={isFileUploadModalOpen} closeModal={closeFileUploadModal} />
                    </Layout>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default OrderDetail;
