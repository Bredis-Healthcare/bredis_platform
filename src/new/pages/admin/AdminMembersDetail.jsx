import React, {useEffect, useState} from "react";
import axios from "../../../api/axios";
import {Link, useLocation, useNavigate} from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import icon_edit from "../../../img/icon_edit.png"
import icon_save from "../../../img/icon_save.svg"

function AdminMembersDetail() {
    const [data, setData] = useState(null); // or your fetching logic
    const [editAdminMemoOn, setEditAdminMemoOn] = useState(false);
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
            const request = await axios.get(`/members/${pageInfo.resourceId}/detail`);
            setData(request.data);

        } catch (error) {
            //console.log("error", error)
        }
    };

    function toggleEditAdminMemo() {
        setEditAdminMemoOn(editAdminMemoOn => !editAdminMemoOn)

    }

    async function saveAdminMemo() {
        let editContent = document.getElementById("adminMemoInput").value
        if (!editContent) {
            alert("관리자 메모를 입력해주세요.")
            return
        }
        await axios.patch(`/members/${pageInfo.resourceId}/admin-memo`,{"content": `${editContent}`});
        window.location.reload();

    }

    return (
        <div>
            {data ? (
                <>
                <AdminLayout menuName="고객 목록 > 고객 상세" menuNameAddInfo={`${data.organization} ${data.name} ${data.position}`}>
                    <div className=" w-[1667px] h-[1157px] relative bg-neutral-100">
                        <div className=" w-[464px] h-[163px] left-[227px] top-[137px] absolute">
                            <div className="Rectangle21 w-[485px] h-[220px] left-0 top-0 absolute bg-white shadow" />
                            <div className="absolute top-[10px] left-[10px] w-[485px] h-[220px]">
                                <div className=" left-0 top-0 absolute text-black text-2xl font-bold font-['Inter']">{data.organization}</div>
                                <div className=" left-0 top-[55px] absolute text-black text-[22px] font-normal font-['Inter']">{data.name} {data.position} </div>
                                <div className="01012341234 left-0 top-[141px] absolute text-black text-lg font-normal font-['Inter']">전화번호: {data.mobile}</div>
                                <div className="TestGmailCom left-0 top-[118px] absolute text-black text-lg font-normal font-['Inter']">이메일: {data.email}</div>
                                <div className=" left-[2px] top-[29px] absolute text-zinc-500 text-base font-normal font-['Inter']">{data.department}</div>
                                <div className="20230131140000 left-[240px] top-[180px] absolute text-zinc-500 text-sm font-normal font-['Inter']">가입일시: {data.createdDatetime}</div>
                                {/*<div className="20230831140000 left-[183px] top-[22px] absolute text-zinc-500 text-sm font-normal font-['Inter']">최종 커뮤니케이션 일시: 2023.08.31 14:00:00</div>*/}
                            </div>
                        </div>

                        <div className="Group27 w-[485px] h-[196px] left-[227px] top-[381px] absolute">
                            <div className="Rectangle18 w-[485px] h-[196px] left-0 top-0 absolute bg-white shadow" />
                            <div className="EditLight w-[35px] h-[33.11px] left-[97px] top-0 absolute">
                                <button className={`editButton ${editAdminMemoOn ? 'hidden' : 'block'}`} onClick={()=>toggleEditAdminMemo()}>
                                    <img src={icon_edit} className="aspect-[1.06] object-cover object-center w-[35px] mt-[5x] self-stretch shrink-0"/>
                                </button>
                                <button className={`saveButton ${editAdminMemoOn ? 'block' : 'hidden'}`} onClick={()=>saveAdminMemo()}>
                                    <img src={icon_save} className="aspect-[1.06] object-cover object-center w-[28px] mt-[5px] mx-[3px] self-stretch shrink-0"/>
                                </button>
                            </div>
                            <div className=" left-[12px] top-[6px] absolute text-neutral-800 text-lg font-bold font-['Inter']">관리자 메모</div>
                            <div className={`${editAdminMemoOn ? 'hidden' : 'block'} whitespace-pre-line 081515000000 w-[407px] h-[30px] left-[12px] top-[35px] absolute text-black text-lg font-normal font-['Inter']`}>{data.adminMemo}</div>
                            <textarea id="adminMemoInput" rows="6" className={`${editAdminMemoOn ? 'block' : 'hidden'} resize-none left-[10px] top-[40px] relative block p-2.5 w-[400px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="특이사항...`}>
                                {data.adminMemo}
                            </textarea>
                        </div>
                        <div className="Group26 w-[485px] h-[148px] left-[730px] top-[137px] absolute">
                            <div className="Group25 w-[485px] h-[148px] left-0 top-0 absolute">
                                <div className="Rectangle21 w-[485px] h-[148px] left-0 top-0 absolute bg-white shadow" />
                                <div className=" left-[12px] top-[14px] absolute text-neutral-800 text-2xl font-bold font-['Inter']">견적 요청</div>
                                <Link to="/admin/members/orders/create" state={{resourceId: data.quotationRequestId}} className={`${data.quotationRequestId ? 'block' : 'hidden'}`}>
                                    <button className=" w-[120px] h-[35px] left-[345px] top-[69px] absolute">
                                        <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-400" />
                                        <div className=" w-[93px] h-[17px] left-[19px] top-[6px] absolute text-slate-400 text-lg font-bold font-['Inter']">상세 보기 ></div>
                                    </button>
                                </Link>
                            </div>
                            <div className={`${data.quotationRequestId ? 'block' : 'hidden'} left-[12px] top-[72px] absolute text-black text-2xl font-normal font-['Inter']`}>
                                <div className={"inline-block relative"}>견적 요청이 진행 중입니다.</div>
                                <div className={`inline-block Ellipse49 w-3 h-3 left-[0px] top-[-12px] relative bg-red-600 rounded-full`} />
                            </div>
                            <div className={`${data.quotationRequestId ? 'hidden' : 'block'} left-[12px] top-[72px] absolute text-black text-2xl font-normal font-['Inter']`}>진행 중인 견적 요청이 없습니다.</div>
                        </div>
                        <div className="Group24 w-[499px] h-[226px] left-[726px] top-[296px] absolute">
                            <div className="Rectangle21 w-[485px] h-[226px] left-0 top-0 absolute bg-white shadow" />
                            <div className=" left-[12px] top-[14px] absolute text-neutral-800 text-2xl font-bold font-['Inter']">문의</div>
                            <div className="Group21 w-[297px] h-[94px] left-[88px] top-[57px] absolute flex flex-row">
                                <div className="Group18 w-[91px] h-[94px] mx-[10px] flex flex-col">
                                    <div className={`text-center ${data.threadNeedResponseCount > 0 ? 'text-[#FA8484]': 'text-slate-400'} text-[45px] font-bold font-['Inter']`}>{data.threadNeedResponseCount}</div>
                                    <div className={`text-center ${data.threadNeedResponseCount > 0 ? 'text-[#FA8484]': 'text-slate-400'} text-xl font-bold font-['Inter']`}>답변필요</div>
                                </div>
                                <div className="Group19 w-[85px] h-[94px] mx-[10px] flex flex-col">
                                    <div className="text-center text-[#95A91D] text-[45px] font-bold font-['Inter']">{data.threadProgressCount}</div>
                                    <div className="text-center text-[#95A91D] text-xl font-bold font-['Inter']">진행중</div>
                                </div>
                                <div className="Group20 w-[85px] h-[94px] mx-[10px] flex flex-col">
                                    <div className="text-center text-slate-400 text-[45px] font-bold font-['Inter']">{data.threadCompleteCount}</div>
                                    <div className="text-center text-slate-400 text-xl font-bold font-['Inter']">완료</div>
                                </div>
                            </div>
                            <Link to="/admin/members/threads" state={{resourceId: data.id}}>
                                <div className=" w-[120px] h-[35px] left-[332px] top-[175px] absolute">
                                    <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-400" />
                                    <div className=" w-[90px] h-[17px] left-[19px] top-[6px] absolute text-slate-400 text-lg font-bold font-['Inter']">전체 보기 ></div>
                                </div>
                            </Link>
                        </div>
                        <div className="Group23 w-[485px] h-[226px] left-[726px] top-[533px] absolute">
                            <div className="Rectangle22 w-[485px] h-[226px] left-0 top-0 absolute bg-white shadow" />
                            <div className=" left-[12px] top-[14px] absolute text-neutral-800 text-2xl font-bold font-['Inter']">주문</div>
                            <div className="Group22 w-[297px] h-[94px] left-[94px] top-[57px] absolute flex flex-row">
                                <div className="Group18 w-[91px] h-[94px] mx-[10px] flex flex-col">
                                    <div className={`text-center ${data.orderNeedCheckCount > 0 ? 'text-[#FA8484]' : 'text-slate-400'} text-[45px] font-bold font-['Inter']`}>{data.orderNeedCheckCount}</div>
                                    <div className={`text-center ${data.orderNeedCheckCount > 0 ? 'text-[#FA8484]' : 'text-slate-400'} text-xl font-bold font-['Inter']`}>확인필요</div>
                                </div>
                                <div className="Group19 w-[85px] h-[94px] mx-[10px] flex flex-col">
                                    <div className="text-center text-[#95A91D] text-[45px] font-bold font-['Inter']">{data.orderProgressCount}</div>
                                    <div className="text-center text-[#95A91D] text-xl font-bold font-['Inter']">진행중</div>
                                </div>
                                <div className="Group20 w-[85px] h-[94px] mx-[10px] flex flex-col">
                                    <div className="text-center text-slate-400 text-[45px] font-bold font-['Inter']">{data.orderCompleteCount}</div>
                                    <div className="text-center text-slate-400 text-xl font-bold font-['Inter']">완료</div>
                                </div>
                            </div>
                            <Link to="/admin/members/orders" state={{resourceId: data.id}}>
                                <button className=" w-[120px] h-[35px] left-[332px] top-[175px] absolute">
                                    <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-400" />
                                    <div className=" w-[90px] h-[17px] left-[19px] top-[6px] absolute text-slate-400 text-lg font-bold font-['Inter']">전체 보기 ></div>
                                </button>
                            </Link>
                        </div>



                        <button className=" w-[120px] h-[35px] left-[1060px] top-[920px] absolute" onClick={() => navigate(-1)}>
                            <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500" />
                            <div className=" w-[79px] h-[17px] left-[20px] top-[7px] absolute text-slate-500 text-lg font-bold font-['Inter']">뒤로 가기</div>
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