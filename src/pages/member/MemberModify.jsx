import Layout from "../../components/layout/Layout";
import React, {useEffect, useState} from "react";
import axios from "../../api/axios";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

function MemberModify() {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['login']);
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {

        try {
            const request = await axios.get(`/members/${cookies.login && cookies.login['id']}/info`);
            setData(request.data);
        } catch (error) {
            console.log("error", error)
        }
    };

    async function submit() {
        let name = document.getElementById('name').value
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value
        let passwordConfirm = document.getElementById('passwordConfirm').value
        let mobile = document.getElementById('mobile').value
        let organization = document.getElementById('organization').value
        let department = document.getElementById('department').value
        let position = document.getElementById('position').value
        if (!name) {alert("이름을 입력해주세요.");return}
        if (!email) {alert("이메일을 입력해주세요.");return}
        if (!password) {alert("비밀번호를 입력해주세요.");return}
        if (password !== passwordConfirm) {alert("비밀번호를 확인해주세요.");return}
        if (!mobile) {alert("전화번호를 입력해주세요.");return}

        await axios.post(`/members/${cookies.login && cookies.login['id']}`, { "password": password, "name": name, "mobile": mobile, "organization": organization, "department": department, "position": position});
        alert("변경 사항이 저장되었습니다.")
        navigate("/");
    }

    return <div>
        {data ?
            <Layout menuName="프로필 정보 변경">
                <div className="2 w-[1667px] h-[955px] relative bg-neutral-100">
                    <div className=" w-[90px] h-[23px] left-[470px] top-[20px] relative text-black text-base font-bold font-['Inter'] mt-10">이름</div>
                    <input id="name" defaultValue={data.name} rows="1" className="resize-none left-[470px] top-[30px] relative block p-2.5 mb-3 w-[633px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="홍길동"></input>

                    <div className=" w-[90px] h-[23px] left-[470px] top-[20px] relative text-black text-base font-bold font-['Inter'] mt-10">이메일</div>
                    <input disabled id="email" type="email" defaultValue={data.email} rows="1" className="resize-none left-[470px] top-[30px] relative block p-2.5 mb-3 w-[633px] text-sm text-gray-500 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@bredis.co.kr"></input>
                    <div className="w-[633px] h-[10px] top-[20px] left-[475px] relative  text-zinc-500 text-xs font-normal font-['Inter'] mt-[2px]">이메일은 수정이 불가능합니다. 수정이 필요하신 경우 ‘문의하기’를 통해 문의 주시면 감사하겠습니다.</div>

                    <div className=" w-[90px] h-[23px] left-[470px] top-[20px] relative text-black text-base font-bold font-['Inter'] mt-10">비밀번호</div>
                    <input id="password" type="password" rows="1" className="resize-none left-[470px] top-[30px] relative block p-2.5 mb-3 w-[633px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="비밀번호를 입력해주세요."></input>

                    <div className=" w-[90px] h-[23px] left-[470px] top-[20px] relative text-black text-base font-bold font-['Inter'] mt-10">비밀번호 확인</div>
                    <input id="passwordConfirm" type="password" rows="1" className="resize-none left-[470px] top-[30px] relative block p-2.5 mb-3 w-[633px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="비밀번호를 입력해주세요."></input>

                    <div className=" w-[90px] h-[23px] left-[470px] top-[20px] relative text-black text-base font-bold font-['Inter'] mt-10">전화번호</div>
                    <input id="mobile" type="mobile" defaultValue={data.mobile} rows="1" className="resize-none left-[470px] top-[30px] relative block p-2.5 mb-3 w-[633px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="010-1234-1234"></input>

                    <div className=" w-[90px] h-[23px] left-[470px] top-[20px] relative text-black text-base font-bold font-['Inter'] mt-10">조직</div>
                    <input id="organization" defaultValue={data.organization} rows="1" className="resize-none left-[470px] top-[30px] relative block p-2.5 mb-3 w-[633px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="브레디스헬스케어"></input>

                    <div className=" w-[90px] h-[23px] left-[470px] top-[20px] relative text-black text-base font-bold font-['Inter'] mt-10">부서</div>
                    <input id="department" defaultValue={data.department} rows="1" className="resize-none left-[470px] top-[30px] relative block p-2.5 mb-3 w-[633px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="R&D팀"></input>

                    <div className=" w-[90px] h-[23px] left-[470px] top-[20px] relative text-black text-base font-bold font-['Inter'] mt-10">직책</div>
                    <input id="position" defaultValue={data.position} rows="1" className="resize-none left-[470px] top-[30px] relative block p-2.5 mb-3 w-[633px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="연구원"></input>


                    <button style={{left: 'calc(50% - 120px)'}} className=" w-[126px] h-[35px] top-[50px] mx-2 my-2 relative" onClick={() => submit()}>
                        <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-slate-500 rounded-[9px]" />
                        <div className=" w-[98px] h-[17px] left-[12px] top-[5px] absolute text-white text-lg font-bold font-['Inter']">저장하기</div>
                    </button>
                </div>
            </Layout>
            : <></>
        }
    </div>


}

export default MemberModify