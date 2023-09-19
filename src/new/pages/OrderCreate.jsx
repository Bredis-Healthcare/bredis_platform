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
        let contents = document.getElementById("message").value
        if (window.confirm("견적 요청서를 제출하시겠습니까?")) {
            await axios.post(`/quotation-requests/submit`, { "id": id, "contents": contents});
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
                    <div className="12 w-[1667px] h-[1450px] relative bg-neutral-100">
                        <OrderProgressUI status={data.status} />
                        {
                            data.status === 'SUBMITTED' ? <WaitReply/> : <QuotationRequest data={data}/>
                        }
                        {
                            (data.status === 'SUBMITTED' || data.status === 'ORDER_STARTED') ? <></> :
                                <>
                                    {
                                        data.status === 'QUOTATION_SUGGESTED' ? (
                                            <div className=" w-[114px] h-[35px] left-[1113px] top-[1420px] absolute">
                                                <div className="Rectangle7 w-[114px] h-[35px] left-0 top-0 absolute bg-slate-500 rounded-[9px]"/>
                                                <div className=" w-[95px] h-[17px] left-[11px] top-[6px] absolute text-white text-lg font-bold font-['Inter']">
                                                    주문 발주
                                                </div>
                                            </div>
                                        ) : (
                                            <button className=" w-[114px] h-[35px] left-[1263px] top-[1430px] absolute"
                                                    onClick={() => submitRequest(data.id)}>
                                                <div className="Rectangle7 w-[114px] h-[35px] left-0 top-0 absolute bg-slate-500 rounded-[9px]"/>
                                                <div className=" w-[95px] h-[17px] left-[11px] top-[6px] absolute text-white text-lg font-bold font-['Inter']">
                                                    { data.status === 'OPINION_REGISTERED' ? '요청서 수정' : '요청서 전송' }
                                                </div>
                                            </button>
                                        )
                                    }
                                    <button className=" w-[106px] h-[35px] left-[1140px] top-[1430px] absolute"
                                            onClick={() => cancelRequest(data.id)}>
                                        <div className="Rectangle7 w-[106px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500"/>
                                        <div className=" w-[80px] h-[17px] left-[15px] top-[7px] absolute text-slate-500 text-lg font-bold font-['Inter']">다시 작성</div>
                                    </button>
                                </>
                        }
                        {
                            data.status === 'OPINION_REGISTERED' ? (
                                <div className="Group17 w-[815px] h-[146px] left-[443px] top-[1250px] absolute">
                                    <div className="Rectangle39 w-[815px] h-[146px] left-0 top-0 absolute bg-slate-500 rounded-[22px] shadow" />
                                    <div className=" w-[276.21px] h-[18px] left-[20.59px] top-[12px] absolute text-white text-lg font-semibold font-['Inter']">담당자 의견</div>
                                    <div className="Xxx23YyyXxx w-[773.78px] left-[20.59px] top-[38px] absolute text-white text-lg font-normal font-['Inter']">{data.managerComment}</div>
                                </div>
                            ) : (
                                <></>
                            )
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