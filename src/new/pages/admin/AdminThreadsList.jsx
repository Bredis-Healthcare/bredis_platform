import {useCookies} from "react-cookie";
import React, {useEffect, useState} from "react";
import axios from "../../../api/axios";
import {Link, useLocation} from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";

function AdminThreadsList () {
    const [data, setData] = useState(null); // or your fetching logic
    const location = useLocation()

    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {

        try {
            const request = await axios.get(`/admin/threads?memberId=${location.state.memberId}`);
            setData(request.data);

        } catch (error) {
            console.log("error", error)
        }
    };

    return (
        <div>
            {data ? (
                <>
                <AdminLayout menuName="고객 목록 > 고객 상세 > 문의 목록">
                    <div className="Contents shadow-[0px_0px_4px_2px_rgba(0,0,0,0.25)] w-full max-w-[1222px] self-center flex flex-col ml-[0.5px] mt-[46px] px-[20px] pt-[60px] pb-[30px] mb-[50px]">
                        {
                                data.list.map((thread, index) => (
                                    <div key={thread.id}>
                                        <div>
                                            <div className={`Line5 w-[1114px] h-[0px] left-[45px] my-5 top-[0px] relative border border-zinc-500`}></div>
                                        </div>
                                        <div className={`w-[1097px] h-[90px] left-[76px] relative`}>
                                            <div className="Gfap left-0 top-[30px] absolute text-black text-2xl font-bold font-['Inter']">{thread.title}</div>
                                            <div className=" left-0 top-0 absolute text-zinc-500 text-lg font-normal font-['Inter']">{thread.category}</div>
                                            {
                                                thread.unreadMessages > 0 ? (
                                                    <div className="UnreadNoti">
                                                        <div className="Ellipse49 w-3 h-3 left-[774px] top-[27px] absolute bg-red-600 rounded-full" />
                                                        <div className="1 left-[543px] top-[33px] absolute text-zinc-500 text-lg font-normal font-['Inter']">읽지 않은 메시지가 {thread.unreadMessages}건 있습니다.</div>
                                                    </div>
                                                ) : (<div />)
                                            }

                                            <div className=" left-[835px] top-0 absolute text-zinc-500 text-lg font-normal font-['Inter']">상태</div>
                                            <div className=" left-[817px] top-[30px] absolute text-lime-500 text-2xl font-bold font-['Inter']">{thread.status}</div>
                                            <div className="20220831143000 left-0 top-[67px] absolute text-zinc-500 text-lg font-normal font-['Inter']">문의일시: {thread.createdDatetime}</div>
                                            {
                                                thread.status !== '종료' ? (<div />) : (
                                                    <div className="20230331150000 left-[807px] top-[68px] absolute text-zinc-500 text-lg font-normal font-['Inter']">종료일시: {thread.updatedDatetime}</div>
                                                )
                                            }
                                            <Link to="/admin-page/members/threads/detail" state={{threadId: thread.id}}>
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
                </AdminLayout>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
        )
}

export default AdminThreadsList