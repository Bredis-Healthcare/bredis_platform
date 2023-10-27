import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate,} from "react-router-dom";
import axios from "../../api/axios";
import {useCookies} from "react-cookie";
import Select from "react-select";
import AdminLayout from "../../components/layout/AdminLayout";
import PurchaseDetail from "../../components/order/PurchaseDetail";
import DownloadButton from "../../components/file/DownloadButton";

import icon_edit from "../../resources/img/icon_edit.png"
import icon_save from "../../resources/img/icon_save.svg"
import toggle_off from "../../resources/img/toggle_off.svg"
import toggle_on from "../../resources/img/toggle_on.svg"

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

const AdminOrderDetail = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['login']);
    const [data, setData] = useState(null); // or your fetching logic
    const [threadData, setThreadData] = useState(null); // or your fetching logic
    const [statusList, setStatusList] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const location = useLocation()
    const navigate = useNavigate();

    const [orderInfoOn, setToggleOrderInfo] = useState(false);  // 메뉴의 초기값을 false로 설정
    const [analysisInfoOn, setToggleAnalysisInfo] = useState(false);
    const [threadInfoOn, setToggleThreadInfo] = useState(false);

    const [editStatusOn, setEditStatusOn] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [editRequestDetailOn, setEditRequestDetailOn] = useState(false);
    const [editAnalysisResultOn, setEditAnalysisResultOn] = useState(false);
    const [editAnalysisHistoryOn, setAnalysisHistoryOn] = useState(false);


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

        } catch (error) {
            console.log("error", error)
        }
        
    };

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


    function toggleEditStatus() {
        setEditStatusOn(editStatusOn => !editStatusOn); // on,off 개념 boolean
    }

    async function saveStatus() {
        if (!selectedStatus) {
            alert("주문 상태를 선택해주세요.")
            return
        }
        await axios.patch(`/orders/${data.orderNumber}/status?status=${selectedStatus}`);
        window.location.reload();
    }

    function toggleEditRequestDetail() {
        setEditRequestDetailOn(editRequestDetailOn => !editRequestDetailOn); // on,off 개념 boolean

    }

    async function saveRequestDetail() {
        let editContent = document.getElementById("requestDetailInput").value
        if (!editContent) {
            alert("의뢰 내용을 입력해주세요.")
            return
        }
        await axios.patch(`/orders/${data.orderNumber}/request-detail`,{"requestDetail": `${editContent}`});
        window.location.reload();
    }

    async function submitMessage() {
        let contents = document.getElementById("message").value
        if (window.confirm("메시지를 전송하시겠습니까?")) {
            let file = document.querySelector("#messageFileInput").files[0]
            const formData = new FormData();
            formData.append("file", file);

            await axios.post(`/admin/threads/messages?threadId=${threadData.id}&content=${encodeURIComponent(contents)}`, formData, {
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

    function toggleEditAnalysisResult() {
        setEditAnalysisResultOn(editAnalysisResultOn => !editAnalysisResultOn);
    }

    async function saveAnalysisResult() {
        let editContent = document.getElementById("analysisResultInput").value
        if (!editContent) {
            alert("분석 결과 내용을 입력해주세요.")
            return
        }
        await axios.post(`/orders/${data.orderNumber}/analysis-result`,{"resultText": `${editContent}`});
        window.location.reload();
    }

    function toggleEditAnalysisHistory() {
        setAnalysisHistoryOn(editAnalysisHistoryOn => !editAnalysisHistoryOn);
    }

    async function addAnalysisHistory() {
        if (window.confirm("분석 이력을 추가하시겠습니까?")) {
            
            let addContent = document.getElementById("analysisHistoryInput").value;
            let editContent = document.getElementById("analysisResultInput").value;

            let file = document.querySelector("#analysisResultFileInput").files[0];
            const formData = new FormData();
            formData.append("file", file);

            if (!addContent) {
                alert("분석 이력 내용을 입력해주세요.")
                return
            }
            if (!editContent && editAnalysisResultOn) {
                alert("분석 결과 내용을 입력해주세요.")
                return
            }
            let result = await axios.post(`/orders/${data.orderNumber}/analysis-history`,{
                "historyText": addContent, 
                "resultText": editContent 
            });

            await axios.post(`/orders/${data.orderNumber}/analysis-report-file?analysisHistoryId=${result.data.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "boundary": "--boundary",
                }}
            );
            window.location.reload();
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

    return (
        <div>
            {data ? (
                <>
                    <AdminLayout menuName="고객 목록 > 고객 상세 > 주문 내역 > 주문 상세" menuNameAddInfo={`${data.orderNumber}`}>
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
                                                <div className="flex flex-row">
                                                    <div className="text-[#888988] not-italic font-normal text-[16px] flex flex-col mt-[26px]">
                                                        의뢰내용
                                                    </div>
                                                    <button className={`editButton ${editRequestDetailOn ? 'hidden' : 'block'}`} onClick={()=>toggleEditRequestDetail()}>
                                                        <img src={icon_edit} className="aspect-[1.06] object-cover object-center w-[35px] mt-[18px] self-stretch shrink-0"/>
                                                    </button>
                                                    <button className={`saveButton ${editRequestDetailOn ? 'block' : 'hidden'}`} onClick={()=>saveRequestDetail()}>
                                                        <img src={icon_save} className="aspect-[1.06] object-cover object-center w-[28px] mt-[18px] mx-[3px] self-stretch shrink-0"/>
                                                    </button>
                                                </div>

                                                <div className={`${editRequestDetailOn ? 'hidden' : 'block'} whitespace-pre-line w-[500px] text-black not-italic font-normal text-[18px] self-stretch flex flex-col mt-[16px]`}>
                                                    {data.requestDetail}
                                                </div>
                                                <textarea id="requestDetailInput" rows="4" className={`${editRequestDetailOn ? 'block' : 'hidden'} resize-none left-[0px] mt-5 relative block p-2.5 w-[500px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="특이사항...`}>
                                                    {data.requestDetail}
                                                </textarea>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-stretch leading-[normal] w-[calc(45%_-_10px)] ml-[20px] max-sm:w-full">
                                            <div className="flex flex-col max-md:mt-[50px]">
                                                <div className="flex max-sm:flex-col max-sm:items-stretch">
                                                    <div className="flex flex-col items-stretch leading-[normal] w-[calc(78%_-_10px)] max-sm:w-full">
                                                        <div className="flex flex-col items-center max-md:mt-px mt-[12px]">
                                                            <div className="text-[#888988] not-italic font-normal text-[16px] text-center flex flex-col">
                                                                주문일시
                                                            </div>
                                                            <div className="text-black not-italic font-light text-[22px] text-center flex flex-col mt-[21px]">
                                                                {data.createdDatetime}
                                                            </div>
                                                            <div className="text-[#888988] not-italic font-normal text-[16px] text-center flex flex-col mt-[36px]">
                                                                검체 정보
                                                            </div>
                                                            <DownloadButton title='검체 정보 파일 다운로드' fileName={data.sampleDataFileName} fileType="SAMPLE_DATA" orderNumber={data.orderNumber} />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-stretch leading-[normal] w-[calc(22%_-_10px)] ml-[20px] max-sm:w-full">
                                                        <div className="flex flex-col items-center mt-[4px] max-md:mt-px">
                                                            <div className="flex flex-row">
                                                                <div className="text-[#888988] not-italic font-normal text-[16px] self-center text-center flex flex-col ml-[2px]">
                                                                    상태
                                                                </div>
                                                                <button className={`editButton ${editStatusOn ? 'hidden' : 'block'}`} onClick={()=>toggleEditStatus()}>
                                                                    <img src={icon_edit} className="aspect-[1.06] object-cover object-center w-[35px] self-stretch shrink-0"/>
                                                                </button>
                                                                <button className={`saveButton ${editStatusOn ? 'block' : 'hidden'}`} onClick={()=>saveStatus()}>
                                                                    <img src={icon_save} className="aspect-[1.06] object-cover object-center w-[28px] mx-[3px] self-stretch shrink-0"/>
                                                                </button>
                                                            </div>
                                                            <Select name="statusSelect" className={`${editStatusOn ? 'block' : 'hidden'} w-[150px] text-center`} classNamePrefix="select"
                                                                    onChange={(choice) => setSelectedStatus(choice.value)}
                                                                    options={[
                                                                        {value: "ORDER_ACCEPTED", label: "주문 접수"},
                                                                        {value: "SAMPLE_PICKUP_IN_PROGRESS", label: "검체 수거 중"},
                                                                        {value: "SAMPLE_PICKUP_COMPLETE", label: "검체 인수 완료"},
                                                                        {value: "ANALYSIS_STAND_BY", label: "분석 대기"},
                                                                        {value: "ANALYSIS_IN_PROGRESS", label: "분석 중"},
                                                                        {value: "ANALYSIS_COMPLETE", label: "분석 완료"}
                                                                    ]}/>
                                                            { data.status ==="분석 완료" ?
                                                                <div id="statusLabel" className={`${editStatusOn ? 'hidden' : 'block'} text-sky-900 w-[150px] not-italic font-bold text-[22px] self-stretch flex flex-col mt-[10px]`}>{data.status}</div> :
                                                                <div id="statusLabel" className={`${editStatusOn ? 'hidden' : 'block'} text-lime-500 w-[150px] not-italic font-bold text-[22px] self-stretch flex flex-col mt-[10px]`}>{data.status}</div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*구매 내역*/}
                                    <div className="w-full flex flex-row gap-[2.98779296875px] items-start flex-wrap mt-[23px]"
                                         onClick={()=>toggleOrderInfo()}>
                                        <div className="text-[#888988] not-italic font-normal text-[16px] self-center text-center flex flex-col -mt-px">
                                            구매 내역
                                        </div>
                                        <div className="aspect-[1] object-cover object-center w-[24px] self-stretch shrink-0">
                                            <img className={`object-cover object-center ${orderInfoOn ? 'block' : 'hidden'}`} src={toggle_off} alt="" />
                                            <img className={`object-cover object-center ${orderInfoOn ? 'hidden' : 'block'}`} src={toggle_on} alt="" />
                                        </div>
                                    </div>
                                    <div className={`orderInfo ${orderInfoOn ? 'block' : 'hidden'} ml-[45px] w-[950px]`}>
                                        {
                                            data.purchaseDetail.total ? <>
                                                    <PurchaseDetail data={data.purchaseDetail} />
                                                    {/*<div className={"flex-row flex"}>*/}
                                                    {/*    <button className="flex flex-col m-[5px] w-[160px] relative"*/}
                                                    {/*            onClick={() => handleUploadClick("INVOICE")}>*/}
                                                    {/*        <div className="Rectangle7 w-[150px] h-[35px] left-0 top-0 absolute bg-slate-500 rounded-[9px]" />*/}
                                                    {/*        <div className=" w-[140px] h-[17px] left-[6px] top-[6px] absolute text-white text-lg font-bold font-['Inter']">거래명세서 업로드</div>*/}
                                                    {/*    </button>*/}
                                                    {/*    <button className="flex flex-col m-[5px] w-[160px] relative"*/}
                                                    {/*            onClick={() => handleUploadClick("TAX_INVOICE")}>*/}
                                                    {/*        <div className="Rectangle7 w-[150px] h-[35px] left-0 top-0 absolute bg-slate-500 rounded-[9px]" />*/}
                                                    {/*        <div className=" w-[140px] h-[17px] left-[6px] top-[6px] absolute text-white text-lg font-bold font-['Inter']">세금계산서 업로드</div>*/}
                                                    {/*    </button>*/}
                                                    {/*</div>*/}

                                                </>
                                                :
                                                <div className="text-black not-italic font-normal text-[16px] flex flex-col ml-[54px] mt-[13px] max-md:ml-[10px]">
                                                    구매 내역이 없습니다.
                                                </div>
                                        }

                                    </div>

                                    {/*분석 결과*/}
                                    <div className="w-full flex flex-row gap-[1.2958984375px] items-start flex-wrap mt-[17px]"
                                         onClick={()=>toggleAnalysisInfo()}>
                                        <div className="text-[#888988] not-italic font-normal text-[16px] self-center text-center flex flex-col -mt-px">
                                            분석 결과
                                        </div>
                                        <div className="aspect-[1] object-cover object-center w-[24px] self-stretch shrink-0">
                                            <img className={`object-cover object-center ${analysisInfoOn ? 'block' : 'hidden'}`} src={toggle_off} alt="" />
                                            <img className={`object-cover object-center ${analysisInfoOn ? 'hidden' : 'block'}`} src={toggle_on} alt="" />
                                        </div>
                                    </div>
                                    <div className={`analysisInfoOn ${analysisInfoOn ? 'block' : 'hidden'}`}>
                                        
                                        <div className="relative">
                                            <div className="text-[#222] not-italic font-bold text-[20px] flex flex-col ml-[51px] mt-[13px] max-md:ml-[10px]">
                                                분석 이력
                                                <br />
                                            </div>
                                            <div className="w-[950px] h-[0px] ml-[45px] flex flex-col mt-[15px] border-[0.5px] border-black border-opacity-25"/>
                                            {
                                                data.analysisHistory.length > 0 ? data.analysisHistory.map(history => (<div>
                                                        <div className="text-black not-italic font-medium text-[16px] flex flex-col ml-[55px] mt-[12px] max-md:ml-[10px]">
                                                            {history.createdDatetime}
                                                        </div>
                                                        <div className="text-black not-italic font-normal text-[16px] flex flex-col ml-[54px] mt-[13px] max-md:ml-[10px]">
                                                            {history.text}
                                                        </div>
                                                        
                                                        { history.analysisResult && <div>
                                                            <div className="w-[910px] h-[0px] ml-[65px] flex flex-col mt-[15px] border-[0.5px] border-black border-opacity-25"/>
                                                            <div className="whitespace-pre-line w-full  max-w-[896px] pb-[-7px] flex flex-col text-black not-italic font-semibold text-[16px] z-[1] ml-[60px] mt-[8px] pl-[12px] pr-[20px] pt-[10px] max-md:ml-[10px]">분석 결과</div>
                                                            <div id="analysisResultText" className={`whitespace-pre-line w-full  max-w-[896px] pb-[-7px] flex flex-col text-black not-italic font-normal text-[16px] z-[1] ml-[60px] mt-[8px] pl-[12px] pr-[20px] pt-[10px] max-md:ml-[10px]`}>
                                                                {history.analysisResult ? history.analysisResult : '분석 결과가 아직 등록되지 않았습니다.'}
                                                            </div>
                                                        </div>}
                                                        {
                                                            history.reportFileName ? <>
                                                                <div className="ml-[700px]">
                                                                    <DownloadButton title='분석 보고서 다운로드' fileName={history.reportFileName} fileType='REPORT' orderNumber={data.orderNumber} />
                                                                </div></> : <></>
                                                        }
                                                        <div className="w-[950px] h-[0px] ml-[45px] flex flex-col mt-[30px] border-[0.5px] border-black border-opacity-25"/>
                                                    </div>



                                                )) : <div>
                                                    <div className="text-black not-italic font-normal text-[16px] flex flex-col ml-[54px] mt-[13px] max-md:ml-[10px]">
                                                        분석 이력이 없습니다.
                                                    </div>
                                                    <div className="w-[950px] h-[0px] ml-[45px] flex flex-col mt-[15px] border-[0.5px] border-black border-opacity-25"/>
                                                </div>
                                                
                                            }

                                            <div className="flex flex-row">

                                                
                                                <div className="text-[#222] not-italic font-bold text-[20px] flex flex-col ml-[51px] mt-[13px] max-md:ml-[10px]">
                                                    분석 이력 추가
                                                    <br />
                                                </div>
                                                <button className={`editButton ${editAnalysisHistoryOn ? 'hidden' : 'block'}`} onClick={()=>toggleEditAnalysisHistory()}>
                                                    <img src={icon_edit} className="aspect-[1.06] object-cover object-center w-[35px] mt-[10px] self-stretch shrink-0"/>
                                                </button>
                                                <button className={`saveButton ${editAnalysisHistoryOn ? 'block' : 'hidden'}`} onClick={()=>addAnalysisHistory()}>
                                                    <img src={icon_save} className="aspect-[1.06] object-cover object-center w-[28px] mt-[10px] mx-[3px] self-stretch shrink-0"/>
                                                </button>
                                                <button className={`notsaveButton ${editAnalysisHistoryOn ? 'block' : 'hidden'}`} onClick={()=>toggleEditAnalysisHistory()}>
                                                    <div className="w-[28px] aspect-[1] mt-[10px] flex justify-center items-center text-red-500 font-bold border-[2px] border-red-500 border-opacity-50 rounded-lg ">X</div>    
                                                </button>
                                            </div>
                                            { editAnalysisHistoryOn && <div>
                                                <textarea id="analysisHistoryInput" rows="12" className={`${editAnalysisHistoryOn ? 'block' : 'hidden'} resize-none left-[45px] mt-5 relative block p-2.5 w-[955px] text-sm text-gray-900 bg-gray-50 rounded-lg border-[0.5px] border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="특이사항...`}>
                                                </textarea>

                                                <div className="flex flex-row ml-[20px]">
                                                    <div className="text-[#222] not-italic font-bold text-[20px] flex flex-col ml-[51px] mt-[30px] max-md:ml-[10px]">
                                                        분석 결과 작성
                                                        <br />
                                                    </div>
                                                    <button className={`editButton ${editAnalysisResultOn ? 'hidden' : 'block'}`} onClick={()=>toggleEditAnalysisResult()}>
                                                        <img src={icon_edit} className="aspect-[1.06] object-cover object-center w-[35px] mt-[26px] self-stretch shrink-0"/>
                                                    </button>
                                                    <button className={`saveButton ${editAnalysisResultOn ? 'block' : 'hidden'}`} onClick={()=>toggleEditAnalysisResult()}>
                                                        <div className="w-[28px] aspect-[1] mt-[26px] flex justify-center items-center text-red-500 font-bold  border-[2px] border-red-500 border-opacity-50 rounded-lg ">X</div>
                                                    </button>
                                                </div>
                                                <textarea id="analysisResultInput" rows="12" className={`${editAnalysisResultOn ? 'block' : 'hidden'} resize-none left-[65px] mt-5 relative block p-2.5 w-[935px] text-sm text-gray-900 bg-gray-50 rounded-lg border-[0.5px] border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="특이사항...`}>
                                                    
                                                </textarea>

                                                
                                                <div className={` ${editAnalysisResultOn ? 'block' : 'hidden'} mt-[13px] flex-row flex items-center justify-end`}>
                                                    {/* <button className="flex flex-col m-[5px] mr-[40px] w-[160px] relative"
                                                            onClick={() => handleUploadClick("REPORT")}>
                                                        <div className="Rectangle7 w-[150px] h-[35px] left-0 top-0 absolute bg-slate-500 rounded-[9px]" />
                                                        <div className=" w-[140px] h-[17px] left-[6px] top-[6px] absolute text-white text-lg font-bold font-['Inter']">분석 보고서 업로드</div>
                                                    </button> */}
                                                    <div className="inline-block text-neutral-700 text-[14px] font-normal font-['Inter'] mt-[5px]">분석 보고서 업로드: </div>
                                                    <input id="analysisResultFileInput" className={`inline-block text-[14px] my-[10px] mx-[10px]`} type="file" />
                                                </div>
                                            </div> }
                                            

                                        </div>
                                    </div>

                                    {/*1:1 문의*/}
                                    <div className="w-full flex flex-row gap-[2.98779296875px] items-start flex-wrap mt-[23px]"
                                         onClick={()=>toggleThreadInfo()}>
                                        <div className="text-[#888988] not-italic font-normal text-[16px] self-center text-center flex flex-col -mt-px">
                                            1:1 문의
                                        </div>
                                        <div className="aspect-[1] object-cover object-center w-[24px] self-stretch shrink-0">
                                            <img className={`object-cover object-center ${threadInfoOn ? 'block' : 'hidden'}`} src={toggle_off} alt="" />
                                            <img className={`object-cover object-center ${threadInfoOn ? 'hidden' : 'block'}`} src={toggle_on} alt="" />
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
                                                        <div className="Line2 flex flex-col w-[920px] h-[0px] left-[2.83px] border-[0.5px] border-black border-opacity-25"></div>
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
                                                    <div className="Line2 flex flex-col w-[920px] h-[0px] left-[2.83px] border-[0.5px] border-black border-opacity-25"></div>
                                                    <div className="text-black text-[15px] font-medium font-['Inter'] flex flex-col my-5">문의 내역이 없습니다.</div>
                                                </div>
                                                }
                                                <div className="Line2 flex flex-col w-[920px] h-[0px] left-[2.83px] border-[0.5px] border-black border-opacity-25"></div>
                                                <div className={`${sendModeOn ? 'block' : 'hidden'}`}>
                                                    <div className=" w-[1000px] h-[22px] text-neutral-500 text-[10px] mt-3 font-medium font-['Inter']">
                                                        ※ 무분별한 비방이나 욕설 등 상대방에게 수치심을 느낄 수 있게 하는 내용의 메시지는 엄격히 금지되며, 위반 시 이용이 제한되고 관계 법률에 따른 법적 조치가 진행될 수 있습니다.<br />
                                                        ※ 수신된 메시지에는 부정경쟁 방지 및 영업비밀 보호에 관한 법률에 의해 보호의 대상이 되는 영업비밀, 산업기술 등을 포함할 수 있습니다. 이의 전부 또는 일부를 무단으로 제3자에게 공개, 배포, 복사 또는 사용하는 것은 엄격히 금지됩니다.
                                                    </div>
                                                    <textarea id="message" rows="12" className="resize-none left-[0px] top-[20px] relative block p-2.5 mb-3 w-[910px] text-sm text-gray-900 bg-gray-50 rounded-lg border-[0.5px] border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="메시지를 입력해주세요."></textarea>
                                                    <div className="inline-block text-neutral-700 text-[14px] font-normal font-['Inter'] mt-[20px]">첨부 파일: </div>
                                                    <input id="messageFileInput" className={`inline-block text-[14px] my-[10px] mx-[10px]`} type="file" />
                                                </div>
                                                <div className="flex flex-row-reverse max-sm:flex-col max-sm:items-stretch mr-[50px] mt-[10px]">
                                                    <button className={`${sendModeOn ? 'hidden' : 'block'} w-[120px] h-[35px] relative mx-2 my-2`}
                                                            onClick={()=>toggleSendMode()}>
                                                        <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-slate-500 rounded-[9px]"/>
                                                        <div className=" w-[101px] h-[17px] left-[10px] top-[5px] absolute text-white text-lg font-bold font-['Inter']">메시지 작성</div>
                                                    </button>
                                                    <button className={`${sendModeOn ? 'block' : 'hidden'} w-[120px] h-[35px] relative mx-2 my-2`}
                                                            onClick={() => submitMessage()}>
                                                        <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-slate-500 rounded-[9px]"/>
                                                        <div className=" w-[101px] h-[17px] left-[10px] top-[5px] absolute text-white text-lg font-bold font-['Inter']">메시지 전송</div>
                                                    </button>
                                                    <button className={`${sendModeOn ? 'hidden' : 'block'} w-[120px] h-[35px] relative mx-2 my-2`} onClick={() => navigate(-1)}>
                                                        <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500"/>
                                                        <div className=" w-[79px] h-[17px] left-[20px] top-[5px] absolute text-slate-500 text-lg font-bold font-['Inter']">뒤로 가기</div>
                                                    </button>
                                                    <button className={`${sendModeOn ? 'block' : 'hidden'} w-[120px] h-[35px] relative mx-2 my-2`}
                                                            onClick={()=>toggleSendMode()}>>
                                                        <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500"/>
                                                        <div className=" w-[79px] h-[17px] left-[20px] top-[5px] absolute text-slate-500 text-lg font-bold font-['Inter']">취소</div>
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
                        {/* <FileUploadModal orderNumber = {data.orderNumber} uploadFileType={uploadFileType} isOpen={isFileUploadModalOpen} closeModal={closeFileUploadModal} /> */}
                    </AdminLayout>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AdminOrderDetail;
