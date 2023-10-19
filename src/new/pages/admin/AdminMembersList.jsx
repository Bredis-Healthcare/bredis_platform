import React, {useEffect, useState} from "react";
import axios from "../../../api/axios";
import {Link} from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";

function AdminMembersList() {
    const [data, setData] = useState(null); // or your fetching logic

    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {

        try {
            const request = await axios.get(`/members`);
            setData(request.data);

        } catch (error) {
            console.log("error", error)
        }
    };

    return (
        <div>
            {data ? (
                <>
                <AdminLayout menuName="고객 목록">
                    <div className="Contents shadow-[0px_0px_4px_2px_rgba(0,0,0,0.25)] w-full max-w-[1222px] self-center flex flex-col ml-[0.5px] mt-[46px] px-[20px] pt-[30px] pb-[30px]">
                        {
                            data.memberItems.map((member, index) => (
                                <div key={member.id}>
                                    <div className=" w-[1066px] h-[160px] left-[77px] top-[0px] my-[8px] relative">
                                        <div className=" left-0 top-[56px] absolute text-black text-2xl font-bold font-['Inter']">{member.organization}</div>
                                        <Link to="/admin/members/detail" state={{resourceId: member.id}}>
                                            <button className=" w-[120px] h-[35px] left-[946px] top-[45px] absolute">
                                                <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500" />
                                                <div className=" w-[93px] h-[17px] left-[19px] top-[6px] absolute text-slate-500 text-lg font-bold font-['Inter']">상세 보기 ></div>
                                            </button>
                                        </Link>
                                        <div className=" left-[456px] top-[21px] absolute text-neutral-800 text-lg font-medium font-['Inter']">문의 상태</div>
                                        <div className=" left-[456px] top-[100px] absolute text-neutral-800 text-lg font-medium font-['Inter']">주문 상태</div>
                                        <div className=" left-[456px] top-[64px] absolute text-neutral-800 text-lg font-medium font-['Inter']">견적 요청</div>
                                        <div className="left-[559px] top-[21px] absolute text-neutral-800 text-lg font-light font-['Inter']">
                                            <div className={"inline-block"}>읽지 않은 문의 {member.unreadMessages}건</div>
                                            <div className={`${member.unreadMessages > 0 ? 'inline-block' : 'hidden'} Ellipse49 w-3 h-3 left-[2px] top-[-7px] relative bg-red-600 rounded-full`} />
                                        </div>

                                        <div className="1214 left-[559px] top-[64px] absolute text-neutral-800 text-lg font-light font-['Inter']">
                                            고객 응답 대기 {member.quotationRequestWaitingCustomerCount}건
                                            <div className={`mx-[4px] ${member.quotationRequestWaitingAdminCount > 0 ? 'inline-block' : 'hidden'}`}>
                                                | 확인 필요 {member.quotationRequestWaitingAdminCount}건
                                                <div className={ `inline-block Ellipse49 w-3 h-3 left-[2px] top-[-7px] relative bg-red-600 rounded-full`} />
                                            </div>
                                        </div>
                                        <div className="1214 left-[559px] top-[100px] absolute text-neutral-800 text-lg font-light font-['Inter']">
                                            주문 진행 {member.inProgressOrderCount}건
                                            <div className={`mx-[4px] ${member.unreadOrderMessages > 0 ? 'inline-block' : 'hidden'}`}>
                                                | 읽지 않은 문의 {member.unreadOrderMessages}건
                                                <div className={ `inline-block Ellipse49 w-3 h-3 left-[2px] top-[-7px] relative bg-red-600 rounded-full`} />
                                            </div>
                                            <br/>분석 완료 {member.completeOrderCount}건
                                        </div>
                                        <div className=" left-0 w-[180px] top-[93px] absolute text-black text-lg font-normal font-['Inter'] break-keep">{member.name} {member.position}</div>
                                        <div className="20230831143000 left-0 top-0 absolute text-zinc-500 text-base font-normal font-['Inter']"><br/>가입 일시: {member.createdDatetime}</div>
                                        <div className="TestGmailCom left-[200px] w-[200px] top-[93px] absolute text-black text-lg font-normal font-['Inter']  break-all">{member.email}</div>
                                    </div>
                                    <div className="Line5 w-[1114px] h-[0px] left-[54px] top-[0px] my-[30px] relative border border-zinc-300"></div>
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

export default AdminMembersList