import axios from "../../api/axios";
import {Link, useLocation} from "react-router-dom";
import Layout from "../components/Layout";
import React, {useEffect, useState} from "react";

function ThreadsDetail() {

    const [data, setData] = useState(null); // or your fetching logic
    const location = useLocation()

    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {

        try {
            const request = await axios.get(`/threads/${location.state.threadId}`);
            setData(request.data);
        } catch (error) {
            console.log("error", error)
        }
    };

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
                                <div className="Line2 flex flex-col w-[1013.17px] h-[0px] left-[2.83px] border border-black border-opacity-25"></div>
                                <div className="flex max-sm:flex-col max-sm:items-stretch">
                                    <div className="flex flex-col items-stretch leading-[normal] w-[calc(10%_-_10px)] max-sm:w-full my-3">
                                        <div className="text-black text-[14px] font-light font-['Inter'] text-center flex flex-col my-3">
                                            {message.senderId}
                                            <br />
                                            {message.createdDatetime}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-stretch leading-[normal] w-[calc(90%_-_10px)] ml-[20px] max-sm:w-full my-5">
                                        <div className="text-black text-[15px] font-medium font-['Inter'] flex flex-col my-5">
                                            {message.content}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="flex flex-row-reverse max-sm:flex-col max-sm:items-stretch">
                            <button className=" w-[120px] h-[35px] relative mx-2 my-2">
                                <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-slate-500 rounded-[9px]"/>
                                <div className=" w-[101px] h-[17px] left-[10px] top-[6px] absolute text-white text-lg font-bold font-['Inter']">메시지 작성</div>
                            </button>
                            <Link to="/threads/list">
                                <button className=" w-[120px] h-[35px] relative mx-2 my-2">
                                    <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500"/>
                                    <div className=" w-[79px] h-[17px] left-[20px] top-[7px] absolute text-slate-500 text-lg font-bold font-['Inter']">뒤로 가기</div>
                                </button>
                            </Link>
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