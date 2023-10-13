import axios from "../../api/axios";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Layout from "../components/Layout";
import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import DownloadButton from "../components/DownloadButton";

function ThreadsDetail() {

    const [cookies, setCookie, removeCookie] = useCookies(['login']);
    const [data, setData] = useState(null); // or your fetching logic
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
            const request = await axios.get(`/threads/${pageInfo.resourceId}`);
            setData(request.data);
        } catch (error) {
            console.log("error", error)
        }
    };

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

            await axios.post(`/messages?threadId=${pageInfo.resourceId}&content=${encodeURIComponent(contents)}&senderId=${cookies.login && cookies.login['id']}`, formData, {
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
                <Layout menuName="문의하기 > 문의 목록 > 문의 상세">
                    <div className=" w-[925px] h-[89px] left-[350px] top-[43px] relative">
                        <div className="Gfap left-0 top-[30px] absolute text-black text-2xl font-bold font-['Inter']">{data.title}</div>
                        <div className=" left-0 top-0 absolute text-zinc-500 text-lg font-normal font-['Inter']">{data.category}</div>
                        <div className=" left-[853px] top-[45px] absolute text-lime-500 text-2xl font-bold font-['Inter']">{data.status}</div>
                        <div className=" left-[870px] top-[15px] absolute text-zinc-500 text-lg font-normal font-['Inter']">상태</div>
                        <div className="20220831143000 left-0 top-[67px] absolute text-zinc-500 text-lg font-normal font-['Inter']">생성일시: {data.createdDatetime}</div>
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
                            <div className=" w-[1100px] h-[22px] text-neutral-500 text-[11px] mt-3 font-medium font-['Inter']">
                                ※ 무분별한 비방이나 욕설 등 상대방에게 수치심을 느낄 수 있게 하는 내용의 메시지는 엄격히 금지되며, 위반 시 이용이 제한되고 관계 법률에 따른 법적 조치가 진행될 수 있습니다.<br />
                                ※ 수신된 메시지에는 부정경쟁 방지 및 영업비밀 보호에 관한 법률에 의해 보호의 대상이 되는 영업비밀, 산업기술 등을 포함할 수 있습니다. 이의 전부 또는 일부를 무단으로 제3자에게 공개, 배포, 복사 또는 사용하는 것은 엄격히 금지됩니다.
                            </div>
                            <textarea id="message" rows="12" className="resize-none left-[0px] top-[20px] relative block p-2.5 mb-3 w-[990px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="메시지를 입력해주세요."></textarea>
                            <div className="inline-block text-neutral-700 text-[14px] font-normal font-['Inter'] mt-[20px]">첨부 파일: </div>
                            <input id="messageFileInput" className={`inline-block text-[14px] my-[10px] mx-[10px]`} type="file" />
                        </div>
                        <div className="flex flex-row-reverse max-sm:flex-col max-sm:items-stretch">
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
                </Layout>
            </>
        ) : (
            <p>Loading...</p>
        )}
        </div>
    )
}

export default ThreadsDetail