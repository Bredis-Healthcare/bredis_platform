import Layout from "../components/Layout";
import axios from "../../api/axios";
import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import OrderProgressUI from "../components/order/OrderProgressUI";
import QuotationRequest from "../components/order/QuotationRequest";
import WaitReply from "../components/order/WaitReply";
import OrderButtons from "../components/order/OrderButtons";
import AskButton from "../components/AskButton";

function MakeOrder() {

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
                        <OrderButtons status={data.status} />
                        {
                            data.status === 'OPINION_REGISTERED' ? (
                                <div className="Group17 w-[815px] h-[146px] left-[443px] top-[1400px] absolute">
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

export default MakeOrder;