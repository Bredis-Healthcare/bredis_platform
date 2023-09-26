import React, {useEffect, useState} from "react";
import axios from "../../../api/axios";
import {Link, useLocation, useNavigate} from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";

function AdminMembersDetail() {
    const [data, setData] = useState(null); // or your fetching logic
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {

        try {
            const request = await axios.get(`/members/${location.state.memberId}/detail`);
            setData(request.data);

        } catch (error) {
            console.log("error", error)
        }
    };
    return (
        <div>
            {data ? (
                <>
                <AdminLayout menuName="고객 목록 > 고객 상세" menuNameAddInfo={`${data.organization} ${data.name} ${data.position}`}>
                    <div className=" w-[1667px] h-[1157px] relative bg-neutral-100">
                        <div className=" w-[464px] h-[163px] left-[237px] top-[249px] absolute">
                            <div className=" left-0 top-0 absolute text-black text-2xl font-bold font-['Inter']">{data.organization}</div>
                            <div className=" left-0 top-[55px] absolute text-black text-[22px] font-normal font-['Inter']">{data.name} {data.position} </div>
                            <div className="01012341234 left-0 top-[141px] absolute text-black text-lg font-normal font-['Inter']">전화번호: {data.mobile}</div>
                            <div className="TestGmailCom left-0 top-[118px] absolute text-black text-lg font-normal font-['Inter']">이메일: {data.email}</div>
                            <div className=" left-[2px] top-[29px] absolute text-zinc-500 text-base font-normal font-['Inter']">{data.department}</div>
                            <div className="20230131140000 left-[183px] top-[2px] absolute text-zinc-500 text-sm font-normal font-['Inter']">가입일시: {data.createdDatetime}</div>
                            <div className="20230831140000 left-[183px] top-[22px] absolute text-zinc-500 text-sm font-normal font-['Inter']">최종 커뮤니케이션 일시: 2023.08.31 14:00:00</div>
                        </div>
                        <div className="Group23 w-[485px] h-[226px] left-[726px] top-[633px] absolute">
                            <div className="Rectangle22 w-[485px] h-[226px] left-0 top-0 absolute bg-white shadow" />
                            <Link to="/admin-page/members/orders" state={{memberId: data.id}}>
                                <button className=" w-[120px] h-[35px] left-[332px] top-[175px] absolute">
                                    <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-400" />
                                    <div className=" w-[90px] h-[17px] left-[19px] top-[6px] absolute text-slate-400 text-lg font-bold font-['Inter']">전체 보기 ></div>
                                </button>
                            </Link>
                            <div className="Group22 w-[297px] h-[94px] left-[94px] top-[57px] absolute">
                                <div className="Group19 w-[85px] h-[94px] left-[106px] top-0 absolute">
                                    <div className=" w-7 h-[41px] left-[29px] top-[6px] absolute text-zinc-500 text-[45px] font-bold font-['Inter']">0</div>
                                    <div className=" w-[58px] h-[23px] left-[15px] top-[58px] absolute text-zinc-500 text-xl font-bold font-['Inter']">진행중</div>
                                </div>
                                <div className="Group18 w-[91px] h-[94px] left-0 top-0 absolute">
                                    <div className=" w-7 h-[41px] left-[29px] top-[6px] absolute text-zinc-500 text-[45px] font-bold font-['Inter']">0</div>
                                    <div className=" w-[85px] h-[23px] left-[6px] top-[58px] absolute text-zinc-500 text-xl font-bold font-['Inter']">확인필요</div>
                                </div>
                                <div className="Group20 w-[85px] h-[94px] left-[212px] top-0 absolute">
                                    <div className=" w-7 h-[41px] left-[27px] top-[6px] absolute text-slate-400 text-[45px] font-bold font-['Inter']">5</div>
                                    <div className=" w-[43px] h-[23px] left-[23px] top-[58px] absolute text-slate-400 text-xl font-bold font-['Inter']">완료</div>
                                </div>
                            </div>
                            <div className=" left-[12px] top-[14px] absolute text-neutral-800 text-2xl font-bold font-['Inter']">주문</div>
                        </div>
                        <div className="Group27 w-[485px] h-[196px] left-[227px] top-[481px] absolute">
                            <div className="Rectangle18 w-[485px] h-[196px] left-0 top-0 absolute bg-white shadow" />
                            <div className="EditLight w-[35px] h-[33.11px] left-[97px] top-0 absolute" />
                            <div className=" left-[12px] top-[6px] absolute text-neutral-800 text-lg font-bold font-['Inter']">관리자 메모</div>
                            <div className="081515000000 w-[407px] h-[30px] left-[12px] top-[35px] absolute text-black text-lg font-normal font-['Inter']">2023.08.15 선 납입금 15,000,000원 있습니다.<br/></div>
                        </div>
                        <div className="Group24 w-[499px] h-[226px] left-[726px] top-[396px] absolute">
                            <div className="Rectangle21 w-[485px] h-[226px] left-0 top-0 absolute bg-white shadow" />

                            <Link to="/admin-page/members/threads" state={{memberId: data.id}}>
                                <div className=" w-[120px] h-[35px] left-[349px] top-[175px] absolute">
                                    <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-400" />
                                    <div className=" w-[90px] h-[17px] left-[19px] top-[6px] absolute text-slate-400 text-lg font-bold font-['Inter']">전체 보기 ></div>
                                </div>
                            </Link>
                            <div className=" left-[12px] top-[14px] absolute text-neutral-800 text-2xl font-bold font-['Inter']">문의</div>
                            <div className="Group21 w-[297px] h-[94px] left-[88px] top-[57px] absolute">
                                <div className="Group19 w-[85px] h-[94px] left-[106px] top-0 absolute">
                                    <div className=" w-7 h-[41px] left-[32px] top-[6px] absolute text-lime-500 text-[45px] font-bold font-['Inter']">1</div>
                                    <div className=" w-[58px] h-[23px] left-[15px] top-[58px] absolute text-lime-500 text-xl font-bold font-['Inter']">진행중</div>
                                </div>
                                <div className="Group18 w-[91px] h-[94px] left-0 top-0 absolute">
                                    <div className=" w-7 h-[41px] left-[32px] top-[6px] absolute text-rose-400 text-[45px] font-bold font-['Inter']">1</div>
                                    <div className=" w-[85px] h-[23px] left-[6px] top-[58px] absolute text-rose-400 text-xl font-bold font-['Inter']">답변필요</div>
                                </div>
                                <div className="Group20 w-[85px] h-[94px] left-[212px] top-0 absolute">
                                    <div className=" w-7 h-[41px] left-[27px] top-[6px] absolute text-slate-400 text-[45px] font-bold font-['Inter']">3</div>
                                    <div className=" w-[43px] h-[23px] left-[23px] top-[58px] absolute text-slate-400 text-xl font-bold font-['Inter']">완료</div>
                                </div>
                            </div>
                        </div>
                        <div className="Group26 w-[485px] h-[148px] left-[730px] top-[237px] absolute">
                            <div className="Group25 w-[485px] h-[148px] left-0 top-0 absolute">
                                <div className="Rectangle21 w-[485px] h-[148px] left-0 top-0 absolute bg-white shadow" />
                                <Link to="/admin-page/members/orders/create" state={{quotationRequestId: data.quotationRequestId}} className={`${data.quotationRequestId ? 'block' : 'hidden'}`}>
                                    <button className=" w-[120px] h-[35px] left-[345px] top-[69px] absolute">
                                        <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-400" />
                                        <div className=" w-[93px] h-[17px] left-[19px] top-[6px] absolute text-slate-400 text-lg font-bold font-['Inter']">상세 보기 ></div>
                                    </button>
                                </Link>
                                <div className=" left-[12px] top-[14px] absolute text-neutral-800 text-2xl font-bold font-['Inter']">견적 요청</div>
                            </div>
                            <div className={`${data.quotationRequestId ? 'block' : 'hidden'} left-[12px] top-[72px] absolute text-black text-2xl font-normal font-['Inter']`}>견적 요청이 진행 중입니다.</div>
                            <div className={`${data.quotationRequestId ? 'hidden' : 'block'} left-[12px] top-[72px] absolute text-black text-2xl font-normal font-['Inter']`}>진행 중인 견적 요청이 없습니다.</div>
                        </div>
                        <button className=" w-[120px] h-[35px] left-[1077px] top-[1020px] absolute" onClick={() => navigate(-1)}>
                            <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500" />
                            <div className=" w-[79px] h-[17px] left-[25px] top-[7px] absolute text-slate-500 text-lg font-bold font-['Inter']">뒤로 가기</div>
                        </button>
                    </div>
                </AdminLayout>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default AdminMembersDetail