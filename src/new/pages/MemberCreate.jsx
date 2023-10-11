import Layout from "../components/Layout";
import React from "react";
import axios from "../../api/axios";
import {useNavigate} from "react-router-dom";

function MemberCreate() {
    const navigate = useNavigate();
    async function submit() {
        let name = document.getElementById('name').value
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value
        let passwordConfirm = document.getElementById('passwordConfirm').value
        let mobile = document.getElementById('mobile').value
        let organization = document.getElementById('organization').value
        let department = document.getElementById('department').value
        let position = document.getElementById('position').value
        let agree1 = document.getElementById('checkbox1').checked
        let agree2 = document.getElementById('checkbox2').checked
        let agree3 = document.getElementById('checkbox3').checked
        if (!name) {alert("이름을 입력해주세요.");return}
        if (!email) {alert("이메일을 입력해주세요.");return}
        if (!password) {alert("비밀번호를 입력해주세요.");return}
        if (password !== passwordConfirm) {alert("비밀번호를 확인해주세요.");return}
        if (!mobile) {alert("전화번호를 입력해주세요.");return}
        if (!agree1 || !agree2 || !agree3) {alert("모든 약관에 동의해주셔야 회원가입이 가능합니다."); return}

        await axios.post(`/register`, { "email": email, "password": password, "name": name, "mobile": mobile, "organization": organization, "department": department, "position": position});
        alert("브레디스헬스케어 연구분석서비스의 회원이 되신 것을 환영합니다.")
        navigate("/");
    }

    return <Layout menuName="회원가입">
        <div className="2 w-[1667px] h-[1100px] relative bg-neutral-100">
            <div className=" w-[90px] h-[23px] left-[470px] top-[20px] relative text-black text-base font-bold font-['Inter'] mt-10">이름</div>
            <input id="name" rows="1" className="resize-none left-[470px] top-[30px] relative block p-2.5 mb-3 w-[633px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="홍길동"></input>

            <div className=" w-[90px] h-[23px] left-[470px] top-[20px] relative text-black text-base font-bold font-['Inter'] mt-10">이메일</div>
            <input id="email" type="email" rows="1" className="resize-none left-[470px] top-[30px] relative block p-2.5 mb-3 w-[633px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@bredis.co.kr"></input>

            <div className=" w-[90px] h-[23px] left-[470px] top-[20px] relative text-black text-base font-bold font-['Inter'] mt-10">비밀번호</div>
            <input id="password" type="password" rows="1" className="resize-none left-[470px] top-[30px] relative block p-2.5 mb-3 w-[633px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="비밀번호를 입력해주세요."></input>

            <div className=" w-[90px] h-[23px] left-[470px] top-[20px] relative text-black text-base font-bold font-['Inter'] mt-10">비밀번호 확인</div>
            <input id="passwordConfirm" type="password" rows="1" className="resize-none left-[470px] top-[30px] relative block p-2.5 mb-3 w-[633px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="비밀번호를 입력해주세요."></input>

            <div className=" w-[90px] h-[23px] left-[470px] top-[20px] relative text-black text-base font-bold font-['Inter'] mt-10">전화번호</div>
            <input id="mobile" type="mobile" rows="1" className="resize-none left-[470px] top-[30px] relative block p-2.5 mb-3 w-[633px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="010-1234-1234"></input>

            <div className=" w-[90px] h-[23px] left-[470px] top-[20px] relative text-black text-base font-bold font-['Inter'] mt-10">조직</div>
            <input id="organization" rows="1" className="resize-none left-[470px] top-[30px] relative block p-2.5 mb-3 w-[633px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="브레디스헬스케어"></input>

            <div className=" w-[90px] h-[23px] left-[470px] top-[20px] relative text-black text-base font-bold font-['Inter'] mt-10">부서</div>
            <input id="department" rows="1" className="resize-none left-[470px] top-[30px] relative block p-2.5 mb-3 w-[633px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="R&D팀"></input>

            <div className=" w-[90px] h-[23px] left-[470px] top-[20px] relative text-black text-base font-bold font-['Inter'] mt-10">직책</div>
            <input id="position" rows="1" className="resize-none left-[470px] top-[30px] relative block p-2.5 mb-3 w-[633px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="연구원"></input>

            <div className="left-[450px] relative mt-[50px]">
                <input type="checkbox" id="checkbox1" className="accent-slate-500 align-middle ml-[1.5rem] mr-[6px] h-[1.35rem] w-[1.35rem] "/>
                <label className="align-middle text-black text-base font-normal font-['Inter'] inline-block pl-[0.15rem] hover:cursor-pointer" htmlFor="checkbox1">
                    이용약관 동의
                </label>
                <a href="/terms/service" target="_blank" className="align-middle text-slate-500 underline text-base font-normal font-['Inter'] inline-block pl-[0.3rem] hover:cursor-pointer">보기</a>
            </div>
            <div className="left-[450px] relative mt-[10px]">
                <input type="checkbox" id="checkbox2" className="accent-slate-500 align-middle ml-[1.5rem] mr-[6px] h-[1.35rem] w-[1.35rem] "/>
                <label className="align-middle text-black text-base font-normal font-['Inter'] inline-block pl-[0.15rem] hover:cursor-pointer" htmlFor="checkbox2">
                    개인정보 취급방침 동의
                </label>
                <a href="/terms/privacy" target="_blank" className="align-middle text-slate-500 underline text-base font-normal font-['Inter'] inline-block pl-[0.3rem] hover:cursor-pointer">보기</a>
            </div>
            <div className="left-[450px] relative mt-[10px]">
                <input type="checkbox" id="checkbox3" className="accent-slate-500 align-middle ml-[1.5rem] mr-[6px] h-[1.35rem] w-[1.35rem] "/>
                <label className="align-middle text-black text-base font-normal font-['Inter'] inline-block pl-[0.15rem] hover:cursor-pointer" htmlFor="checkbox3">
                    만 14세 이상입니다.
                </label>
            </div>

            <button style={{left: 'calc(50% - 120px)'}} className=" w-[126px] h-[35px] top-[50px] mx-2 my-2 relative" onClick={() => submit()}>
                <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-slate-500 rounded-[9px]" />
                <div className=" w-[98px] h-[17px] left-[12px] top-[5px] absolute text-white text-lg font-bold font-['Inter']">가입하기</div>
            </button>
        </div>
    </Layout>

}

export default MemberCreate