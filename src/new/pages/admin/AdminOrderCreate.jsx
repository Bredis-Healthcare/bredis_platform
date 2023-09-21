import Layout from "../../components/Layout";
import QuotationRequest from "../../components/order/QuotationRequest";
import React, {useEffect, useState} from "react";
import axios from "../../../api/axios";
import {useLocation, useNavigate} from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";

function AdminOrderCreate() {
    const [data, setData] = useState(null); // or your fetching logic
    const location = useLocation()
    const navigate = useNavigate()

    const [commentOn, setCommentOn] = useState(false);
    const [managerCommentInput, setManagerCommentInput] = useState("");

    const toggleCommentOn = () => {
        setCommentOn(commentOn => !commentOn);
    }

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

    const handleManagerCommentChange = (e) => {
        setManagerCommentInput(e.target.value)
        data.managerComment = e.target.value
    }

    async function suggestQuotation(id) {
        if (window.confirm("견적서를 전송하시겠습니까?")) {
            await axios.post(`/quotation-requests/${id}/suggest-quotation`, { "quotationFileLink": "https://bredis.s3.ap-northeast-2.amazonaws.com/test-service/202308181119-987204/SAMPLE_DATA_202308181119-987204.pdf"});
            window.location.reload();
        }
    }

    async function submitComment(id) {
        let contents = document.getElementById("comment").value
        if (!contents) {
            alert("담당자 의견을 작성해주세요.")
            return
        }
        if (window.confirm("담당자 의견을 전송하시겠습니까?")) {
            await axios.post(`/quotation-requests/${id}/manager-comment`, { "comment": contents});
            window.location.reload();
        }
    }

    return (
        <div>
            {data ? (
                <>
                    <AdminLayout menuName="고객 목록 > 고객 상세 > 견적 요청서">
                        <div className="12 w-[1667px] h-auto relative bg-neutral-100">
                            <QuotationRequest data={data} readOnly={true}/>
                            <div className={`${data.status === 'SUBMITTED' ? 'block' : 'hidden'} flex flex-col relative`}>
                                <div className={`${commentOn ? 'block' : 'hidden'} relative h-[170px]`}>
                                    <div className=" w-[400px] h-[17px] left-[390px] mt-[10px] relative text-slate-500 text-lg font-bold font-['Inter']">견적 요청서 수정 필요 사항 - 담당자 의견 작성</div>
                                    <textarea value={managerCommentInput ? managerCommentInput : (data.managerComment ? data.managerComment : '')}
                                              onChange={(e)=>handleManagerCommentChange(e)}
                                              id="comment" rows="4" className="resize-none left-[390px] mt-5 relative block p-2.5 w-[900px] text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="고객에게 전달할 메시지를 입력해주세요."></textarea>
                                </div>
                                <div className="relative h-[30px] mt-[10px]">
                                    <button className="alwayson w-[106px] h-[35px] left-[400px] relative"
                                            onClick={() => navigate(-1)}>
                                        <div className="Rectangle7 w-[106px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500"/>
                                        <div className=" w-[80px] h-[17px] left-[15px] top-[7px] absolute text-slate-500 text-lg font-bold font-['Inter']">뒤로 가기</div>
                                    </button>
                                    <button className={`${commentOn ? 'inline-block' : 'hidden'} alwayson w-[106px] h-[35px] left-[900px] relative`}
                                            onClick={() => toggleCommentOn()}>
                                        <div className="Rectangle7 w-[106px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500"/>
                                        <div className=" w-[80px] h-[17px] left-[15px] top-[7px] absolute text-slate-500 text-lg font-bold font-['Inter']">취소</div>
                                    </button>
                                    <button className={`${commentOn ? 'hidden' : 'inline-block'} alwayson w-[140px] h-[35px] left-[930px] relative`}
                                            onClick={() => toggleCommentOn()}>
                                        <div className="Rectangle7 w-[140px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500"/>
                                        <div className=" w-[120px] h-[17px] left-[10px] top-[7px] absolute text-slate-500 text-lg font-bold font-['Inter']">주문 수정 요청</div>
                                    </button>
                                    <button className={`${commentOn ? 'inline-block' : 'hidden'} alwayson w-[140px] h-[35px] left-[930px] relative`}
                                            onClick={() => submitComment(data.id)}>
                                        <div className="Rectangle7 w-[140px] h-[35px] left-0 top-0 absolute bg-slate-500 rounded-[9px]"/>
                                        <div className=" w-[140px] h-[17px] left-[0px] top-[6px] absolute text-white text-lg font-bold font-['Inter']">담당자 의견 전송</div>
                                    </button>
                                    <button className={`${commentOn ? 'hidden' : 'inline-block'} alwayson w-[114px] h-[35px] left-[950px] relative`}
                                            onClick={() => suggestQuotation(data.id)}>
                                        <div className="Rectangle7 w-[114px] h-[35px] left-0 top-0 absolute bg-slate-500 rounded-[9px]"/>
                                        <div className=" w-[95px] h-[17px] left-[11px] top-[6px] absolute text-white text-lg font-bold font-['Inter']">견적 제안</div>
                                    </button>
                                </div>
                            </div>
                            <div className={`${data.status === 'OPINION_REGISTERED' ? 'block' : 'hidden'} relative mb-[30px]`}>
                                <div className=" w-[400px] h-[17px] left-[390px] mt-10 relative text-slate-500 text-lg font-bold font-['Inter']">견적 요청서 수정 필요 사항 - 담당자 의견 작성</div>
                                <textarea disabled defaultValue={data.managerComment ? data.managerComment : ''} id="comment" rows="4" className="resize-none left-[390px] mt-5 relative block p-2.5 w-[900px] text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="고객에게 전달할 메시지를 입력해주세요."></textarea>
                                <div className=" top-[30px] right-[370px] flex flex-row-reverse relative">
                                    <div className=" w-[149px] h-[17px] my-[5px] text-sky-900 text-lg font-bold font-['Inter']">주문 수정 요청 완료</div>
                                    <button className="alwayson w-[106px] h-[35px] relative mx-[20px]"
                                            onClick={() => navigate(-1)}>
                                        <div className="Rectangle7 w-[106px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500"/>
                                        <div className=" w-[80px] h-[17px] left-[15px] top-[7px] absolute text-slate-500 text-lg font-bold font-['Inter']">뒤로 가기</div>
                                    </button>
                                </div>

                            </div>
                            <div className={`${data.status === 'QUOTATION_SUGGESTED' ? 'block' : 'hidden'} top-[10px] right-[370px] flex flex-row-reverse relative`}>
                                <div className=" w-[149px] h-[17px] my-[5px] text-sky-900 text-lg font-bold font-['Inter']">견적 제안 완료</div>
                                <button className="alwayson w-[106px] h-[35px] relative mx-[20px]"
                                        onClick={() => navigate(-1)}>
                                    <div className="Rectangle7 w-[106px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500"/>
                                    <div className=" w-[80px] h-[17px] left-[15px] top-[7px] absolute text-slate-500 text-lg font-bold font-['Inter']">뒤로 가기</div>
                                </button>
                            </div>

                        </div>
                    </AdminLayout>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default AdminOrderCreate