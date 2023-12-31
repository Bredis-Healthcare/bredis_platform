import Layout from "../../components/layout/Layout";
import React, {useEffect, useState} from "react";
import axios from "../../api/axios";
import {useNavigate} from "react-router-dom";

function MemberCreate() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [certificateCode, setCertificateCode] = useState('');
    const [showCertificateCodeInput, setShowCertificateCodeInput] = useState(false);
    const [isCertificateSent, setIsCertificateSent] = useState(false);
    const [isCertificateComplete, setIsCertificateComplete] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [organization, setOrganization] = useState('');
    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [agree1, setAgree1] = useState(false);
    const [agree2, setAgree2] = useState(false);
    const [agree3, setAgree3] = useState(false);
    useEffect(() => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z.]{2,}$/;
        setIsValidEmail(emailRegex.test(email));
        // console.log(isValidEmail, email)
    }, [email]);

    async function submit() {
        if (!name) {alert("이름을 입력해주세요.");return}
        if (!email) {alert("이메일을 입력해주세요.");return}
        if (!isValidEmail) {alert("이메일을 확인해 주세요.");return}
        if (!isCertificateComplete) {alert("이메일 인증을 완료해주세요.");return}
        if (!password) {alert("비밀번호를 입력해주세요.");return}
        if (password !== confirmPassword) {alert("비밀번호를 확인해주세요.");return}
        if (!mobile) {alert("전화번호를 입력해주세요.");return}
        if (!agree1 || !agree2 || !agree3) {alert("모든 약관에 동의해주셔야 회원가입이 가능합니다."); return}

        const request = await axios.post(`register`, { email, password, name, mobile, organization, department, position });
        if(request !== "오류" ){
            alert("브레디스헬스케어 연구분석서비스의 회원이 되신 것을 환영합니다.")
            navigate("/");
        }
        else{
            alert("이미 가입된 이메일입니다.")
        }
    }

    async function certificateEmail() {
        if (!email) {alert("이메일을 입력해주세요.");return}
        await axios.post(`/register/email-certificate-request?email=${email}`);
        alert('인증번호가 발송되었습니다. 이메일을 확인해주세요.');
        setShowCertificateCodeInput(true);
        setIsCertificateSent(true);
    }

    async function confirmEmailCode() {
        if (!email) {alert("이메일을 입력해주세요.");return}
        if (!certificateCode) {alert("인증번호를 입력해주세요.");return}
        await axios.post(`/register/email-certificate-confirm?email=${email}&certificateCode=${certificateCode}`);
        alert('인증되었습니다.');
        setShowCertificateCodeInput(false);
        setIsCertificateComplete(true);
    }

    return <Layout menuName="회원가입">
        <div className="2 w-[1667px] h-[1100px] relative bg-neutral-100">
            <div className=" w-[90px] h-[23px] left-[470px] top-[20px] relative text-black text-base font-bold font-['Inter'] mt-10">이름</div>
            <input id="name" rows="1" value={name} onChange={(e) => setName(e.target.value)}  className="resize-none left-[470px] top-[30px] relative block p-2.5 mb-3 w-[633px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="홍길동"></input>

            <div className=" w-[90px] h-[23px] left-[470px] top-[20px] relative text-black text-base font-bold font-['Inter'] mt-10">이메일</div>
            <div className="flex flex-row top-[30px] left-[470px] relative">
                <input id="email" type="email" rows="1" value={email} onChange={(e) => setEmail(e.target.value)} className="resize-none p-2.5 mb-3 w-[520px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@bredis.co.kr"></input>
                {isCertificateComplete ? <div className={"text-base font-semibold font-['Inter'] mx-4 my-2 text-sky-900"}>인증 완료</div> :
                    <button className=" w-[80px] h-[35px] mx-4 my-1 flex relative" onClick={() => certificateEmail()}>
                        <div className="Rectangle7 w-[80px] h-[30px] left-0 top-0 absolute bg-slate-500 rounded-[9px]" />
                        <div className=" w-[80px] h-[17px] left-[1px] top-[3px] absolute text-white text-base font-bold font-['Inter']">{isCertificateSent ? '재전송' : '인증하기'}</div>
                    </button>
                }
            </div>
            {!isValidEmail && email &&
                <p className="left-[470px] top-[20px] relative text-red-500 text-sm h-[20px]">
                    {"이메일 형식이 올바르지 않습니다."}
                </p>
            }
            <div className={`${showCertificateCodeInput ? 'block' : 'hidden'} flex flex-row top-[30px] left-[470px] relative`}>
                <input id="emailConfirm" rows="1" value={certificateCode} onChange={(e) => setCertificateCode(e.target.value)}  className="resize-none block p-2.5 mb-3 w-[520px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="인증번호"></input>
                <button className=" w-[80px] h-[35px] mx-4 my-1 flex relative" onClick={() => confirmEmailCode()}>
                    <div className="Rectangle7 w-[80px] h-[30px] left-0 top-0 absolute bg-slate-500 rounded-[9px]" />
                    <div className=" w-[80px] h-[17px] left-[1px] top-[3px] absolute text-white text-base font-bold font-['Inter']">확인</div>
                </button>
            </div>

            <div className=" w-[90px] h-[23px] left-[470px] top-[20px] relative text-black text-base font-bold font-['Inter'] mt-10">비밀번호</div>
            <input id="password" type="password" rows="1" value={password} onChange={(e) => setPassword(e.target.value)}  className="resize-none left-[470px] top-[30px] relative block p-2.5 mb-3 w-[633px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="비밀번호를 입력해주세요."></input>

            <div className=" w-[90px] h-[23px] left-[470px] top-[20px] relative text-black text-base font-bold font-['Inter'] mt-10">비밀번호 확인</div>
            <input id="passwordConfirm" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} rows="1" className="resize-none left-[470px] top-[30px] relative block p-2.5 mb-3 w-[633px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="비밀번호를 다시 입력해주세요"></input>
            <p className="left-[470px] top-[20px] relative  text-red-500 text-sm h-[20px]">
                {confirmPassword && (password === confirmPassword ? <span className={"text-green-700"}>비밀번호가 일치합니다.</span> : <span>비밀번호가 일치하지 않습니다.</span>)}
            </p>
            <div className=" w-[90px] h-[23px] left-[470px] top-[20px] relative text-black text-base font-bold font-['Inter'] mt-10">전화번호</div>
            <input id="mobile" type="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} rows="1" className="resize-none left-[470px] top-[30px] relative block p-2.5 mb-3 w-[633px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="010-1234-1234"></input>
            
            <div className=" w-[90px] h-[23px] left-[470px] top-[20px] relative text-black text-base font-bold font-['Inter'] mt-10">조직</div>
            <input id="organization" rows="1" value={organization} onChange={(e) => setOrganization(e.target.value)} className="resize-none left-[470px] top-[30px] relative block p-2.5 mb-3 w-[633px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="브레디스헬스케어"></input>

            <div className=" w-[90px] h-[23px] left-[470px] top-[20px] relative text-black text-base font-bold font-['Inter'] mt-10">부서</div>
            <input id="department" rows="1"  value={department} onChange={(e) => setDepartment(e.target.value)} className="resize-none left-[470px] top-[30px] relative block p-2.5 mb-3 w-[633px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="R&D팀"></input>

            <div className=" w-[90px] h-[23px] left-[470px] top-[20px] relative text-black text-base font-bold font-['Inter'] mt-10">직책</div>
            <input id="position" rows="1" value={position} onChange={(e) => setPosition(e.target.value)} className="resize-none left-[470px] top-[30px] relative block p-2.5 mb-3 w-[633px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="연구원"></input>

            <div className="left-[450px] relative mt-[50px]">
                <input type="checkbox" id="checkbox1" onChange={(e) => setAgree1(e.target.checked)} checked={agree1} className="accent-slate-500 align-middle ml-[1.5rem] mr-[6px] h-[1.15rem] w-[1.15rem] "/>
                <label className="align-middle text-black text-base font-normal font-['Inter'] inline-block pl-[0.15rem] hover:cursor-pointer" htmlFor="checkbox1">
                    이용약관 동의
                </label>
                <a href="/terms/service" target="_blank" className="align-middle text-slate-500 underline text-base font-normal font-['Inter'] inline-block pl-[0.3rem] hover:cursor-pointer">보기</a>
            </div>
            <div className="left-[450px] relative mt-[10px]">
                <input type="checkbox" id="checkbox2" onChange={(e) => setAgree2(e.target.checked)} checked={agree2} className="accent-slate-500 align-middle ml-[1.5rem] mr-[6px] h-[1.15rem] w-[1.15rem] "/>
                <label className="align-middle text-black text-base font-normal font-['Inter'] inline-block pl-[0.15rem] hover:cursor-pointer" htmlFor="checkbox2">
                    개인정보 취급방침 동의
                </label>
                <a href="/terms/privacy" target="_blank" className="align-middle text-slate-500 underline text-base font-normal font-['Inter'] inline-block pl-[0.3rem] hover:cursor-pointer">보기</a>
            </div>
            <div className="left-[450px] relative mt-[10px]">
                <input type="checkbox" id="checkbox3" onChange={(e) => setAgree3(e.target.checked)} checked={agree3}  className="accent-slate-500 align-middle ml-[1.5rem] mr-[6px] h-[1.15rem] w-[1.15rem] "/>
                <label className="align-middle text-black text-base font-normal font-['Inter'] inline-block pl-[0.15rem] hover:cursor-pointer" htmlFor="checkbox3">
                    만 14세 이상입니다.
                </label>
            </div>

            <button style={{left: 'calc(50% - 120px)'}} className=" w-[126px] h-[35px] top-[40px] mx-2 my-2 relative" onClick={() => submit()}>
                <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-slate-500 rounded-[9px]" />
                <div className=" w-[98px] h-[17px] left-[12px] top-[5px] absolute text-white text-lg font-bold font-['Inter']">가입하기</div>
            </button>
        </div>
    </Layout>

}

export default MemberCreate