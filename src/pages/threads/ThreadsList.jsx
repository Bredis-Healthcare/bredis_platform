import Layout from "../../components/layout/Layout";
import {useCookies} from "react-cookie";
import React, {useEffect, useState} from "react";
import axios from "../../api/axios";
import {Link, useNavigate} from "react-router-dom";

function ThreadsList () {
    const [cookies, setCookie, removeCookie] = useCookies(['login']);
    const [data, setData] = useState(null); // or your fetching logic
    const navigate = useNavigate()

    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {

        try {
            const request = await axios.get(`/threads?memberId=${cookies.login && cookies.login['id']}`);
            setData(request.data);
            if (request.data.list.length < 1) {
                navigate("/threads/new")
            }

        } catch (error) {
            console.log("error", error)
        }
    };

    return (
        <div>
            {data ? (
                <>
                <Layout menuName="문의하기 > 문의 목록">
                    <div className="Contents shadow-[0px_0px_4px_2px_rgba(0,0,0,0.25)] w-[1222px] self-center flex flex-col m-auto px-[20px] pt-[30px] pb-[30px]">
                        <Link className="flex justify-end" to="/threads/new">
                            <button className="NewThreadButton w-[120px] h-[35px] relative ml-auto mx-[40px]">
                                <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-slate-500 rounded-[9px]" />
                                <div className=" w-[98px] h-[17px] left-[14px] top-[6px] absolute text-white text-lg font-bold font-['Inter']">새로운 문의</div>
                            </button>
                        </Link>
                        {
                                data.list.map((thread, index) => (
                                    <div key={thread.id}>
                                        <div>
                                            <div className={`Line5 w-[1114px] h-[0px] left-[45px] my-5 top-[0px] relative border-[0.5px] border-zinc-400`}></div>
                                        </div>
                                        <div className={`w-[1097px] h-[90px] left-[76px] relative`}>
                                            <div className="Gfap left-0 top-[30px] absolute text-black text-2xl font-bold font-['Inter']">{thread.title}</div>
                                            <div className=" left-0 top-0 absolute text-zinc-500 text-lg font-normal font-['Inter']">{thread.category}</div>
                                            {
                                                thread.unreadAdminMessages > 0 ? (
                                                    <div className="UnreadNoti">
                                                        <div className="Ellipse49 w-3 h-3 left-[774px] top-[27px] absolute bg-red-600 rounded-full" />
                                                        <div className="1 left-[543px] top-[33px] absolute text-zinc-500 text-lg font-normal font-['Inter']">읽지 않은 메시지가 {thread.unreadAdminMessages}건 있습니다.</div>
                                                    </div>
                                                ) : (<div />)
                                            }

                                            <div className=" left-[800px] w-[100px] top-0 absolute text-zinc-500 text-lg font-normal font-['Inter'] flex justify-center items-center ">상태</div>
                                            {
                                                thread.status !== '종료' ? 
                                                <div className=" left-[800px] w-[100px] top-[30px] absolute text-lime-500 text-2xl font-bold font-['Inter'] flex justify-center items-center">{thread.status}</div> :
                                                <div className=" left-[800px] w-[100px] top-[30px] absolute text-sky-900 text-2xl font-bold font-['Inter'] flex justify-center items-center">{thread.status}</div>
                                            }
                                            
                                            <div className="20220831143000 left-0 top-[67px] absolute text-zinc-500 text-lg font-normal font-['Inter']">문의일시: {thread.createdDatetime}</div>
                                            {
                                                thread.status !== '종료' ? (<div />) : (
                                                    <div className="20230331150000 left-[820px] top-[68px] absolute text-zinc-500 text-lg font-normal font-['Inter']">종료일시: {thread.updatedDatetime}</div>
                                                )
                                            }
                                            <Link to="/threads/detail" state={{resourceId: thread.id}}>
                                                <button className=" w-[120px] h-[35px] left-[947px] top-[28px] absolute">
                                                    <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500" />
                                                    <div className=" w-[120px] h-[17px] left-[0px] top-[6px] absolute text-slate-500 text-lg font-bold font-['Inter']">내용 보기 ></div>
                                                </button>
                                            </Link>

                                        </div>
                                    </div>
                                ))

                            }
                    </div>
                </Layout>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
        )
}

export default ThreadsList