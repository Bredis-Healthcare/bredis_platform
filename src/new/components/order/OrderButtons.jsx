import React from "react";

function OrderButtons(props) {
    return (
        <>
            {
                (props.status === 'SUBMITTED' || props.status === 'ORDER_STARTED') ? <></> :
                    <>
                        {
                            props.status === 'QUOTATION_SUGGESTED' ? (
                                <div className=" w-[114px] h-[35px] left-[1113px] top-[1420px] absolute">
                                    <div className="Rectangle7 w-[114px] h-[35px] left-0 top-0 absolute bg-slate-500 rounded-[9px]"/>
                                    <div className=" w-[95px] h-[17px] left-[11px] top-[6px] absolute text-white text-lg font-bold font-['Inter']">
                                        주문 발주
                                    </div>
                                </div>
                            ) : (
                                <div className=" w-[114px] h-[35px] left-[1113px] top-[1420px] absolute">
                                    <div className="Rectangle7 w-[114px] h-[35px] left-0 top-0 absolute bg-slate-500 rounded-[9px]"/>
                                    <div className=" w-[95px] h-[17px] left-[11px] top-[6px] absolute text-white text-lg font-bold font-['Inter']">
                                        { props.status === 'OPINION_REGISTERED' ? '요청서 수정' : '요청서 전송' }
                                    </div>
                                </div>
                            )
                        }
                        <div className=" w-[106px] h-[35px] left-[990px] top-[1420px] absolute">
                            <div className="Rectangle7 w-[106px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500"/>
                            <div className=" w-[41px] h-[17px] left-[37px] top-[7px] absolute text-slate-500 text-lg font-bold font-['Inter']">취소</div>
                        </div>
                    </>
            }
        </>
    )

}

export default OrderButtons