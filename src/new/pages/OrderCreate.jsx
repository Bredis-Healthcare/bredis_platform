import Layout from "../components/Layout";
import axios from "../../api/axios";
import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import OrderProgressUI from "../components/order/OrderProgressUI";
import QuotationRequest from "../components/order/QuotationRequest";
import WaitReply from "../components/order/WaitReply";
import AskButton from "../components/AskButton";

function OrderCreate() {

    const [cookies, setCookie, removeCookie] = useCookies(['login']);
    const [data, setData] = useState(null); // or your fetching logic

    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {

        try {
            const request = await axios.get(`/quotation-requests/by-memberId?memberId=${cookies.login && cookies.login['id']}`);
            setData(request.data);

        } catch (error) {
            console.log("error", error)
        }
    };

    async function submitRequest (id) {
        if (window.confirm("견적 요청서를 제출하시겠습니까?")) {
            await axios.post(`/quotation-requests/submit`, { "id": id, "contents": data.content});
            window.location.reload();
        }
    }

    async function cancelRequest (id) {
        if (window.confirm("진행 중이던 견적 요청 내용이 모두 삭제됩니다. 정말로 다시 작성하시겠습니까?")) {
            await axios.post(`/quotation-requests/${id}/cancel`);
            window.location.reload();
        }
    }

    return (
        <div>
            {data ? (
                <>
                <Layout menuName="주문하기 > 견적 요청서 작성" menuNameAddInfo="견적 요청서 작성 → 견적 협의 → 주문 발주 의 순서로 진행됩니다.">
                    <div className="12 w-[1667px] flex flex-col relative bg-neutral-100">
                        <OrderProgressUI status={data.status} />
                        {
                            data.status === 'SUBMITTED' ? <WaitReply/> : <QuotationRequest data={data}/>
                        }
                        {
                            data.status === 'OPINION_REGISTERED' ? (
                                <div className="Group17 w-[815px] h-[200px] left-[443px] top-[30px] relative">
                                    <div className="Rectangle39 w-[815px] h-[150px] left-0 top-0 absolute bg-slate-500 rounded-[22px] shadow" />
                                    <div className=" w-[276.21px] h-[18px] left-[20.59px] top-[12px] absolute text-white text-lg font-semibold font-['Inter']">담당자 의견</div>
                                    <textarea value={data.managerComment} readOnly rows="4" className="resize-none bg-transparent Xxx23YyyXxx w-[773.78px] left-[20.59px] top-[38px] absolute text-white text-lg font-normal font-['Inter']"></textarea>
                                </div>
                            ) : (
                                <></>
                            )
                        }
                        {
                            data.status === 'QUOTATION_SUGGESTED' ? (
                                <button className=" w-[160px] h-6 left-[1220px] top-[0px] relative mb-[20px]">
                                    <div className=" left-0 top-[0px] absolute text-sky-900 text-[20px] font-bold font-['Inter']">견적서 다운로드</div>
                                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4f619a59-11ff-42d9-abed-a0d5839fa57a?&width=800"
                                        className="ImportLight w-[26px] left-[130px] top-0 absolute flex-col justify-start items-start inline-flex"/>
                                </button>
                            ) : <></>
                        }
                        {
                            (data.status === 'SUBMITTED' || data.status === 'ORDER_STARTED') ? <></> :
                                <div className="flex flex-row relative">
                                    {
                                        data.status === 'QUOTATION_SUGGESTED' ? (
                                            <button className="alwayson w-[114px] h-[35px] left-[1263px] top-[10px] relative inline-block">
                                                <div className="Rectangle7 w-[114px] h-[35px] left-0 top-0 absolute bg-slate-500 rounded-[9px]"/>
                                                <div className=" w-[95px] h-[17px] left-[11px] top-[6px] absolute text-white text-lg font-bold font-['Inter']">
                                                    주문 발주
                                                </div>
                                            </button>
                                        ) : (
                                            <button className="alwayson w-[114px] h-[35px] left-[1263px] top-[10px] relative inline-block"
                                                    onClick={() => submitRequest(data.id)}>
                                                <div className="Rectangle7 w-[114px] h-[35px] left-0 top-0 absolute bg-slate-500 rounded-[9px]"/>
                                                <div className=" w-[95px] h-[17px] left-[11px] top-[6px] absolute text-white text-lg font-bold font-['Inter']">
                                                    { data.status === 'OPINION_REGISTERED' ? '요청서 수정' : '요청서 전송' }
                                                </div>
                                            </button>
                                        )
                                    }
                                    <button className="alwayson w-[114px] h-[35px] left-[1020px] top-[10px] relative inline-block"
                                            onClick={() => cancelRequest(data.id)}>
                                        <div className="Rectangle7 w-[114px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500"/>
                                        <div className=" w-[95px] h-[17px] left-[10px] top-[7px] absolute text-slate-500 text-lg font-bold font-['Inter']">다시 작성</div>
                                    </button>
                                </div>
                        }
                        <AskButton />
                    </div>
                </Layout>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default OrderCreate;