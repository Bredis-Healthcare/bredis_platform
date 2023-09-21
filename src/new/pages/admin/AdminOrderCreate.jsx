import Layout from "../../components/Layout";
import QuotationRequest from "../../components/order/QuotationRequest";
import React, {useEffect, useState} from "react";
import axios from "../../../api/axios";
import {useLocation, useNavigate} from "react-router-dom";

function AdminOrderCreate() {
    const [data, setData] = useState(null); // or your fetching logic
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {

        try {
            const request = await axios.get(`/quotation-requests/${location.state.quotationRequestId}`);
            setData(request.data);

        } catch (error) {
            console.log("error", error)
        }
    };

    // async function submitRequest (id) {
    //     let contents = document.getElementById("message").value
    //     if (window.confirm("견적 요청서를 제출하시겠습니까?")) {
    //         await axios.post(`/quotation-requests/submit`, { "id": id, "contents": contents});
    //         window.location.reload();
    //     }
    // }
    //
    // async function cancelRequest (id) {
    //     if (window.confirm("진행 중이던 견적 요청 내용이 모두 삭제됩니다. 정말로 다시 작성하시겠습니까?")) {
    //         await axios.post(`/quotation-requests/${id}/cancel`);
    //         window.location.reload();
    //     }
    // }

    function toggleCommentOn(id) {

    }

    function toggleQuotationSuggestionOn(id) {

    }

    return (
        <div>
            {data ? (
                <>
                    <Layout menuName="고객 목록 > 고객 상세 > 견적 요청서">
                        <div className="12 w-[1667px] h-[1450px] relative bg-neutral-100">
                            <QuotationRequest data={data} readOnly={true}/>
                            <div className="relative top-[150px]">
                                <button className="alwaysOn w-[106px] h-[35px] left-[400px] relative"
                                        onClick={() => navigate(-1)}>
                                    <div className="Rectangle7 w-[106px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500"/>
                                    <div className=" w-[80px] h-[17px] left-[15px] top-[7px] absolute text-slate-500 text-lg font-bold font-['Inter']">뒤로 가기</div>
                                </button>
                                <button className="alwaysOn w-[140px] h-[35px] left-[930px] relative"
                                        onClick={() => toggleCommentOn(data.id)}>
                                    <div className="Rectangle7 w-[140px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500"/>
                                    <div className=" w-[120px] h-[17px] left-[10px] top-[7px] absolute text-slate-500 text-lg font-bold font-['Inter']">주문 수정 요청</div>
                                </button>
                                <button className="alwaysOn w-[114px] h-[35px] left-[950px] relative"
                                        onClick={() => toggleQuotationSuggestionOn(data.id)}>
                                    <div className="Rectangle7 w-[114px] h-[35px] left-0 top-0 absolute bg-slate-500 rounded-[9px]"/>
                                    <div className=" w-[95px] h-[17px] left-[11px] top-[6px] absolute text-white text-lg font-bold font-['Inter']">견적 제안</div>
                                </button>
                            </div>
                        </div>
                    </Layout>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default AdminOrderCreate