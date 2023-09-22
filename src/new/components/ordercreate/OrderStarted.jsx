import React from "react";
import axios from "../../../api/axios";

function OrderStarted (props) {
    async function createNewQuotationRequest(memberId) {
        await axios.post(`/quotation-requests/create?memberId=${memberId}`);
        window.location.reload();
    }

    return (
        <div className="top-[250px] h-[1000px] relative flex flex-col">
            <div className="text-[#888988] text-center not-italic font-bold font-['Inter'] text-[27px] self-center flex flex-col ml-[40px] mt-[134px]">
                주문 발주가 완료되었습니다!<br />상세 내역은 [주문내역] 메뉴에서 확인하실 수 있습니다.
            </div>
            <button className="alwayson w-[200px] h-[45px] self-center flex flex-col relative mt-[30px]"
                    onClick={() => createNewQuotationRequest(props.memberId)}>
                <div className="Rectangle7 w-[200px] h-[45px] absolute bg-slate-500 rounded-[9px]"/>
                <div className=" w-[180px] h-[17px] left-[10px] top-[10px] absolute text-white text-[20px] font-bold font-['Inter']">새로운 견적 요청하기</div>
            </button>
        </div>
    )
}

export default OrderStarted