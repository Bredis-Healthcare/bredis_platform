import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "../../../api/axios";
import AdminLayout from "../../components/admin/AdminLayout";
import Select from "react-select";
import DownloadButton from "../../components/DownloadButton";

function AdminThreadsDetail() {

    const [data, setData] = useState(null); // or your fetching logic
    const location = useLocation()
    const navigate = useNavigate()

    const [editStatusOn, setEditStatusOn] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("");

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
            const request = await axios.get(`/threads/${pageInfo.threadId}`);
            setData(request.data);
        } catch (error) {
            console.log("error", error)
        }
    };

    const [sendModeOn, setSendMode] = useState(false);

    const toggleSendMode = () => {
        setSendMode(sendModeOn => !sendModeOn); // on,off 개념 boolean
    }

    function toggleEditStatus() {
        setEditStatusOn(editStatusOn => !editStatusOn); // on,off 개념 boolean
    }

    async function saveStatus() {
        if (!selectedStatus) {
            alert("문의 상태를 선택해주세요.")
            return
        }
        await axios.patch(`/admin/threads/${pageInfo.threadId}/status`, {"status": selectedStatus});
        window.location.reload();
    }

    async function submitMessage() {
        let contents = document.getElementById("message").value
        if (window.confirm("메시지를 전송하시겠습니까?")) {

            let file = document.querySelector("#messageFileInput").files[0]
            const formData = new FormData();
            formData.append("file", file);

            await axios.post(`/admin/threads/messages?threadId=${pageInfo.threadId}&content=${encodeURIComponent(contents)}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "boundary": "--boundary",
                }}
            );

            window.location.reload();
        }
    }

    return (
        <div>
        {data ? (
            <>
                <AdminLayout menuName="문의하기 > 문의 목록 > 문의 상세">
                    <div className=" w-[925px] h-[89px] left-[350px] top-[43px] relative">
                        <div className="Gfap left-0 top-[30px] absolute text-black text-2xl font-bold font-['Inter']">{data.title}</div>
                        <div className=" left-0 top-0 absolute text-zinc-500 text-lg font-normal font-['Inter']">{data.category}</div>
                        <div className="20220831143000 left-0 top-[67px] absolute text-zinc-500 text-lg font-normal font-['Inter']">생성일시: {data.createdDatetime}</div>

                        <div className="left-[870px] top-[15px] absolute w-[200px] flex flex-col mt-[4px] max-md:mt-[5px]">
                            <div className="flex flex-row">
                                <div className="text-[#888988] not-italic font-normal text-[16px] self-center text-center flex flex-col ml-[2px]">
                                    상태
                                </div>
                                <button className={`editButton ${editStatusOn ? 'hidden' : 'block'}`} onClick={()=>toggleEditStatus()}>
                                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/73de0a7a-f287-4059-b05d-6e3300e6d3bb?&width=400" className="aspect-[1.06] object-cover object-center w-[35px] self-stretch shrink-0"/>
                                </button>
                                <button className={`saveButton ${editStatusOn ? 'block' : 'hidden'}`} onClick={()=>saveStatus()}>
                                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/313cfcf2-748d-4dec-aeb4-c74b734fed03?&width=400" className="aspect-[1.06] object-cover object-center w-[28px] mx-[3px] self-stretch shrink-0"/>
                                </button>
                            </div>
                            <Select name="statusSelect" className={`${editStatusOn ? 'block' : 'hidden'} w-full text-center`} classNamePrefix="select" placeholder="선택"
                                    onChange={(choice) => setSelectedStatus(choice.value)}
                                    options={[
                                        { value: "IN_PROGRESS", label: "진행중" },
                                        { value: "ENDED", label: "종료" }
                                    ]}/>
                            <div id="statusLabel" className={`${editStatusOn ? 'hidden' : 'block'} text-[#035772] not-italic font-bold text-[22px] self-stretch flex flex-col mt-[10px]`}>
                                {data.status}
                            </div>
                        </div>
                        {/*<div className=" left-[870px] top-[15px] absolute text-zinc-500 text-lg font-normal font-['Inter']">상태</div>*/}
                        {/*<div className=" left-[853px] top-[45px] absolute text-lime-500 text-2xl font-bold font-['Inter']">{data.status}</div>*/}

                    </div>
                    <div className="w-full max-w-[972px] left-[0px] top-[0px] self-center flex flex-col mt-[93px] relative">
                        {data.messages.map((message, index) => (
                            <div>
                                <div className="Line2 flex flex-col w-[1013px] h-[0px] left-[2.83px] border border-black border-opacity-25"></div>
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
                        ))}
                        <div className="Line2 flex flex-col w-[1013px] h-[0px] left-[2.83px] border border-black border-opacity-25"></div>
                        <div className={`${sendModeOn ? 'block' : 'hidden'}`}>
                            <div className=" w-[415px] h-[22px] text-neutral-700 text-[15px] mt-5 font-medium font-['Inter']">※ 간단한 주의사항...</div>
                            <textarea id="message" rows="12" className="resize-none left-[0px] top-[10px] relative block p-2.5 mb-3 w-[990px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="메시지를 입력해주세요."></textarea>
                            <div className="inline-block text-neutral-700 text-[14px] font-normal font-['Inter'] mt-[5px]">첨부 파일: </div>
                            <input id="messageFileInput" className={`inline-block text-[14px] my-[10px] mx-[10px]`} type="file" />
                        </div>
                        <div className="flex flex-row-reverse max-sm:flex-col max-sm:items-stretch">
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
                </AdminLayout>
            </>
        ) : (
            <p>Loading...</p>
        )}
        </div>
    )
}

export default AdminThreadsDetail