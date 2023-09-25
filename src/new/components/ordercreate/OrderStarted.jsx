import React from "react";
import axios from "../../../api/axios";
import PurchaseDetail from "../order/PurchaseDetail";

function OrderStarted (props) {
    async function createNewQuotationRequest(memberId) {
        await axios.post(`/quotation-requests/create?memberId=${memberId}`);
        window.location.reload();
    }


    return (
        <>
            <div className="top-[150px] h-[300px] relative ml-[300px]">
                <div className="text-black text-left not-italic font-bold font-['Inter'] text-[27px] self-center flex flex-col ml-[40px] mt-[10px]">
                    주문 발주가 완료되었습니다!<br />상세 내역은 [주문내역] 메뉴에서 확인하실 수 있습니다.
                </div>
                <div className="text-[#888988] text-left not-italic font-normal font-['Inter'] text-[20px] self-center flex flex-col ml-[40px] mt-[10px]">
                    주문 일시: {props.data.orderDatetime}<br />주문 번호: {props.data.orderNumber}
                </div>
            </div>
            <div className="relative ml-[300px] mt-[30px] w-[1100px]">
                <PurchaseDetail data={props.data.purchaseSuggestion}/>
            </div>
            <button className="w-[200px] h-[45px] self-center flex flex-col relative mt-[30px]"
                    onClick={() => createNewQuotationRequest(props.memberId)}>
                <div className="Rectangle7 w-[200px] h-[45px] absolute bg-slate-500 rounded-[9px]"/>
                <div className=" w-[180px] h-[17px] left-[10px] top-[10px] absolute text-white text-[20px] font-bold font-['Inter']">새로운 견적 요청하기</div>
            </button>
        </>
    )
}

export default OrderStarted