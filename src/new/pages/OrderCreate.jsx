import Layout from "../components/Layout";
import axios from "../../api/axios";
import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import OrderProgressUI from "../components/ordercreate/OrderProgressUI";
import QuotationRequest from "../components/ordercreate/QuotationRequest";
import WaitReply from "../components/ordercreate/WaitReply";
import AskButton from "../components/AskButton";
import OrderStarted from "../components/ordercreate/OrderStarted";
import PurchaseDetail from "../components/order/PurchaseDetail";

import toggle_off from "../../img/toggle_off.svg"
import toggle_on from "../../img/toggle_on.svg"

function OrderCreate() {

    const [cookies, setCookie, removeCookie] = useCookies(['login']);
    const [data, setData] = useState(null); // or your fetching logic
    const [quotationPreviewOn, setQuotationPreviewOn] = useState(false);
    const [isQuotationRequestOk, setIsQuotationRequestOk] = useState(true);
    const [quotationRequestList, setQuotationRequestList] = useState("");

    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {

        try {
            const request = await axios.get(`/quotation-requests/by-memberId?memberId=${cookies.login && cookies.login['id']}`);
            setData(request.data);
            console.log(data);

        } catch (error) {
            console.log("error", error)
        }
    };

    async function submitRequest (id) {
        if (window.confirm("견적 요청서를 제출하시겠습니까?")) {
            // console.log("!", isQuotationRequestOk, quotationRequestList)

            if (!data.content.organization) { alert("의뢰 기관명을 입력해주세요."); return }
            if (!data.content.requestDate) { alert("의뢰일을 입력해주세요."); return }
            if (!data.content.managerName) { alert("담당자를 입력해주세요."); return }
            if (!data.content.mobile) { alert("전화번호를 입력해주세요."); return }
            if (!data.content.email) { alert("이메일을 입력해주세요."); return }
            if (!isQuotationRequestOk) { 
                alert(`${quotationRequestList}을(를) 확인해주세요`); return
            }

            await axios.post(`/quotation-requests/submit`, { "id": id, "contents": data.content});
            window.location.reload();
        }
    }

    async function cancelRequest (id) {
        if (window.confirm("진행 중이던 견적 요청 내용이 모두 삭제됩니다. 정말로 다시 작성하시겠습니까?")) {
            await axios.post(`/quotation-requests/${id}/cancel`);
            await axios.post(`/quotation-requests/create?memberId=${cookies.login && cookies.login['id']}`);
            window.location.reload();
        }
    }

    async function createOrder(id) {
        if (window.confirm("주문을 진행합니다. 주문 이전에 견적서를 먼저 꼭 확인해주세요.")) {
            await axios.post(`/quotation-requests/${id}/order`);
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
                            data.status === 'BEFORE_SUBMIT' ? (
                                <>
                                    <QuotationRequest data={data} setIsQuotationRequestOk={setIsQuotationRequestOk} setQuotationRequestList={setQuotationRequestList}/>
                                    <div className="mt-[8px] w-[600px] mr-[20px] ml-auto">
                                        <button className="w-[114px] h-[35px] relative inline-block mx-[10px]"
                                                onClick={() => cancelRequest(data.id)}>
                                            <div className="Rectangle7 w-[114px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500"/>
                                            <div className=" w-[95px] h-[17px] left-[10px] top-[7px] absolute text-slate-500 text-lg font-bold font-['Inter']">다시 작성</div>
                                        </button>
                                        <button className="w-[114px] h-[35px] relative inline-block mx-[10px]"
                                                onClick={() => submitRequest(data.id)}>
                                            <div className="Rectangle7 w-[114px] h-[35px] left-0 top-0 absolute bg-slate-500 rounded-[9px]"/>
                                            <div className=" w-[95px] h-[17px] left-[11px] top-[6px] absolute text-white text-lg font-bold font-['Inter']">요청서 작성</div>
                                        </button>
                                    </div>
                                </>
                            ) : <></>
                        }
                        {
                            data.status === 'SUBMITTED' ? <WaitReply/> : <></>
                        }
                        {
                            data.status === 'OPINION_REGISTERED' ? (
                                <>
                                    <QuotationRequest data={data} setIsQuotationRequestOk={setIsQuotationRequestOk} setQuotationRequestList={setQuotationRequestList}/>
                                    <div className="Group17 w-[815px] h-[200px] left-[443px] top-[30px] relative">
                                        <div className="Rectangle39 w-[815px] h-[150px] left-0 top-0 absolute bg-slate-500 rounded-[22px] shadow" />
                                        <div className=" w-[276.21px] h-[18px] left-[20.59px] top-[12px] absolute text-white text-lg font-semibold font-['Inter']">담당자 의견</div>
                                        <textarea value={data.managerComment} readOnly rows="4" className="resize-none bg-transparent Xxx23YyyXxx w-[773.78px] left-[20.59px] top-[38px] absolute text-white text-lg font-normal font-['Inter']"></textarea>
                                    </div>
                                    <div className="mr-40 ml-auto w-[300px] mt-[8px] relative">
                                        <button className="w-[114px] h-[35px] relative inline-block mx-[10px]"
                                                onClick={() => cancelRequest(data.id)}>
                                            <div className="Rectangle7 w-[114px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500"/>
                                            <div className=" w-[95px] h-[17px] left-[10px] top-[7px] absolute text-slate-500 text-lg font-bold font-['Inter']">다시 작성</div>
                                        </button>
                                        <button className="w-[114px] h-[35px] relative inline-block mx-[10px]"
                                                onClick={() => submitRequest(data.id)}>
                                            <div className="Rectangle7 w-[114px] h-[35px] left-0 top-0 absolute bg-slate-500 rounded-[9px]"/>
                                            <div className=" w-[95px] h-[17px] left-[11px] top-[6px] absolute text-white text-lg font-bold font-['Inter']">요청서 수정</div>
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <></>
                            )
                        }
                        {
                            data.status === 'QUOTATION_SUGGESTED' ? (
                                <>
                                    <QuotationRequest data={data} readOnly={true}/>
                                    <div className="ml-[300px] flex flex-row gap-[1.2958984375px] items-start flex-wrap mt-[10px]">
                                        <div className="text-sky-900 not-italic font-bold text-[20px] font-['Inter'] self-center text-center flex flex-col -mt-px">견적 제안 확인하기</div>
                                        <div className="aspect-[1] object-cover object-center w-[24px] self-stretch shrink-0"
                                             onClick={()=>setQuotationPreviewOn(quotationPreviewOn => !quotationPreviewOn)}>
                                            <img className={`object-cover object-center ${quotationPreviewOn ? 'block' : 'hidden'}`} src={toggle_off} alt="" />
                                            <img className={`object-cover object-center ${quotationPreviewOn ? 'hidden' : 'block'}`} src={toggle_on} alt="" />
                                        </div>
                                    </div>
                                    <div className={`${quotationPreviewOn ? 'block' : 'hidden'} w-[1100px] h-auto left-[300px] top-[10px] mb-[20px] relative bg-white shadow`}>
                                        <div className="flex flex-col items-center">
                                            <PurchaseDetail quotationRequestId={data.id} data={data.purchaseSuggestion}/>
                                        </div>
                                    </div>

                                    <div className="flex flex-row gap-4 mt-[8px] mr-40 ml-auto">
                                        <button className="w-[114px] h-[35px] relative inline-block"
                                                onClick={() => createOrder(data.id)}>
                                            <div className="Rectangle7 w-[114px] h-[35px] left-0 top-0 absolute bg-slate-500 rounded-[9px]"/>
                                            <div className=" w-[95px] h-[17px] left-[11px] top-[6px] absolute text-white text-lg font-bold font-['Inter']">주문 발주</div>
                                        </button>
                                        <button className="w-[114px] h-[35px] relative inline-block"
                                                onClick={() => cancelRequest(data.id)}>
                                            <div className="Rectangle7 w-[114px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500"/>
                                            <div className=" w-[95px] h-[17px] left-[10px] top-[7px] absolute text-slate-500 text-lg font-bold font-['Inter']">다시 작성</div>
                                        </button>
                                    </div>
                                </>
                            ) : <></>
                        }
                        {
                            data.status === 'ORDER_STARTED' ? <OrderStarted data={data} quotationRequestId={data.id} memberId={cookies.login && cookies.login['id']}/> : <></>
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