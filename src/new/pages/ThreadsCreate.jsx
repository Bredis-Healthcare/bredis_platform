import Layout from "../components/Layout";
import React from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "../../api/axios";
import {useCookies} from "react-cookie";

function ThreadsCreate () {
    const [cookies, setCookie, removeCookie] = useCookies(['login']);
    const navigate = useNavigate();

    async function submitMessage() {
        let category = document.getElementById("category").value
        let title = document.getElementById("title").value
        let contents = document.getElementById("contents").value
        if (!category) {
            alert("문의 유형을 선택해주세요.")
            return
        }
        if (window.confirm("새로운 문의를 전송합니다.")) {
            await axios.post(`/messages/new-thread`, { "category": category, "content": contents, "title": title, "memberId": cookies.login && cookies.login['id']});
            navigate(`/threads/list`);
        }
    }

    return (
        <Layout menuName="문의하기 > 새로운 문의">
            <div className="2 w-[1667px] h-[955px] relative bg-neutral-100">
                <div className=" w-[90px] h-[23px] left-[470px] top-[20px] relative text-black text-base font-bold font-['Inter'] mt-10">문의 유형<span className="text-red-500"> *</span> </div>

                <select id="category" style={{appearance: 'none'}} rows="1" className="resize-none left-[470px] top-[30px] relative block p-2.5 mb-3 w-[633px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="문의 유형을 선택해주세요">
                    <option value="" selected disabled style={{display: 'none'}}>문의 유형을 선택해주세요.</option>
                    <option value="BIOMARKER">바이오마커 검사</option>
                    <option value="KIT_DEVELOPMENT">신규 검사키트 개발</option>
                    <option value="RESEARCH">연구 협력</option>
                    <option value="OTHER">기타 문의</option>
                </select>
                <img className={`absolute top-[103px] left-[1070px]`} src="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Feede2644e07c40428a85a860afad0b8c?&width=200" alt="" />

                <div className=" w-[90px] h-[23px] left-[470px] top-[20px] relative text-black text-base font-bold font-['Inter'] mt-10">문의 제목<span className="text-red-500"> *</span> </div>
                <textarea id="title" rows="1" className="resize-none left-[470px] top-[30px] relative block p-2.5 mb-3 w-[633px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="문의 제목을 입력해주세요."></textarea>

                <div className=" w-[90px] h-[23px] left-[470px] top-[20px] relative text-black text-base font-bold font-['Inter'] mt-10">문의 내용<span className="text-red-500"> *</span> </div>
                <textarea id="contents" rows="14" className="resize-none left-[470px] top-[30px] relative block p-2.5 mb-3 w-[633px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="문의 내용을 입력해주세요."></textarea>

                <div className="flex flex-row-reverse">
                    <button className=" w-[126px] h-[35px] right-[565px] top-[30px] mx-2 my-2 relative"
                                onClick={() => submitMessage()}>
                        <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-slate-500 rounded-[9px]" />
                        <div className=" w-[98px] h-[17px] left-[12px] top-[5px] absolute text-white text-lg font-bold font-['Inter']">전송하기</div>
                    </button>

                    <Link to={"/threads/list"}>
                        <button className=" w-[120px] h-[35px] right-[565px] top-[30px] mx-2 my-2 relative">
                            <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500" />
                            <div className=" w-[79px] h-[17px] left-[19px] top-[5px] absolute text-slate-500 text-lg font-bold font-['Inter']">뒤로 가기</div>
                        </button>
                    </Link>
                </div>
            </div>
        </Layout>

    )
}

export default ThreadsCreate