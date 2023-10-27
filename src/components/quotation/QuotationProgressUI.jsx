import React from "react";

const statusList = ['BEFORE_SUBMIT', 'SUBMITTED', 'OPINION_REGISTERED', 'QUOTATION_SUGGESTED', 'ORDER_STARTED', 'CANCELED']

function QuotationProgressUI (props) {
    let statusNumber = statusList.indexOf(props.status)
    return (
        <div className="Ui w-[683px] h-20 left-[492px] top-[80px] relative">
            <div className={`left-0 top-[56px] absolute text-slate-500 text-xl font-bold font-['Inter']`}>견적 요청서 작성</div>
            <div className="Group14 w-[45px] h-[45px] left-[39px] top-0 absolute">
                <div className="Ellipse50 w-[45px] h-[45px] left-0 top-0 absolute rounded-full border-2 border-slate-500" />
                <div className={`left-[17px] top-[10px] absolute 'text-slate-500' text-xl font-bold font-['Inter']`}>1</div>
            </div>

            <div className={`Line13 w-[246px] h-[0px] left-[84px] top-[22px] absolute border-2 ${statusNumber > 0 ? 'border-slate-500' : 'border-zinc-500'}`}></div>

            <div className={` left-[316px] top-[56px] absolute ${statusNumber > 1 ? 'text-slate-500' : 'text-zinc-500'} text-xl font-bold font-['Inter']`}>견적 협의</div>
            <div className="Group12 w-[45px] h-[45px] left-[330px] top-0 absolute">
                <div className={`Ellipse51 w-[45px] h-[45px] left-0 top-0 absolute rounded-full border-2 ${statusNumber > 1 ? 'border-slate-500' : 'border-zinc-500'}`} />
                <div className={`left-[17px] top-[10px] absolute ${statusNumber > 1 ? 'text-slate-500' : 'text-zinc-500'} text-xl font-bold font-['Inter']`}>2</div>
            </div>

            <div className={`Line14 w-[246px] h-[0px] left-[375px] top-[22px] absolute border-2 ${statusNumber > 2 ? 'border-slate-500' : 'border-zinc-500'}`}></div>

            <div className={`left-[604px] top-[56px] absolute ${statusNumber === 4 ? 'text-slate-500' : 'text-zinc-500'} text-xl font-bold font-['Inter']`}>주문 발주</div>
            <div className="Group13 w-[45px] h-[45px] left-[621px] top-0 absolute">
                <div className={`Ellipse52 w-[45px] h-[45px] left-0 top-0 absolute rounded-full border-2 ${statusNumber === 4 ? 'border-slate-500' : 'border-zinc-500'}`} />
                <div className={`left-[17px] top-[10px] absolute ${statusNumber === 4 ? 'text-slate-500' : 'text-zinc-500'} text-xl font-bold font-['Inter']`}>3</div>
            </div>
        </div>
    )
}
export default QuotationProgressUI;