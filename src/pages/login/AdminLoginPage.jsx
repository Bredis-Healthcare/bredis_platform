import React, { useEffect, useState } from 'react';
import { LoginContainer, LoginButton, LoginInput, LoginImage, SignupButton } from './LoginPageStyles';
import logo from '../../resources/img/bredis_logo.png'
import axios from "../../api/axios";
import  {useNavigate  } from "react-router-dom";
import {useCookies} from 'react-cookie';

// Main login component
const LoginPage = () => {
    
    // States for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie] = useCookies(['name']);
    const navigate = useNavigate();


    // Function to handle form submission
    const handleLogin = (e) => {
        e.preventDefault();
        async function loginPress() {
            try {
                const request = await axios.post('/admin/login', {
                    "email": email,  // using state value for email
                    "password": password  // using state value for password
                });
                
                if(request !== "오류"){
                    //console.log("request data", request.data["memberId"], "authToken", request.data["authToken"]);
                    setCookie('login', {id : request.data["memberId"], authToken : request.data["authToken"]}, {path : "/" , maxAge : 86400 })
                    navigate("/admin/members/list" );
                }
                else{
                    alert("가입 정보를 다시 확인해주세요.")
                }
            } catch (error) {
                console.error("Error while logging in:", error);
            }
        }
        loginPress();
    };

    return (
        <div className="py-10 overflow-auto fixed flex flex-col w-[100vw] h-[100vh] min-w-[200px] min-h-[700px] top-[0px] left-[0px] bg-neutral-100 z-10">
            <form className="w-[100%] min-w-[200px] max-w-[400px] h-[60vh] min-h-[700px] relative bg-neutral-100 rounded-[40px] m-auto flex flex-col justify-center items-center gap-4"  onSubmit={handleLogin} >
                <img className="w-[60%] max-w-[300px]" src={logo} alt='bredis_logo' />
                
                <div className="text-black text-[22px] font-bold break-keep text-center ">Digital ELISA 연구분석서비스</div>
                <div className="w-[80%] pt-4 flex flex-col justify-start items-start gap-[1rem] ">
                    <input type="email" className="w-[100%] h-14 px-3 bg-white rounded-lg border border-zinc-500 text-base flex justify-center items-center" placeholder="이메일"
                    value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" className="w-[100%] h-14 px-3 bg-white rounded-lg border border-zinc-500 text-base flex justify-center items-center" placeholder="비밀번호" 
                    value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="w-[40%] pt-4 gap-2 flex flex-col justify-center items-center">
                    <button className="w-[100%] py-2 bg-sky-900 rounded-[9px] flex justify-center items-center text-white text-lg hover:bg-sky-950 cursor-pointer" type="submit" >관리자 로그인</button>
                </div>
            </form>
        </div>
        // <LoginContainer>
        //     <p>연구서비스 플랫폼 어드민에 오신 것을 환영합니다.</p>
        //     <form onSubmit={handleLogin}>
        //         <LoginInput
        //             type="email"
        //             placeholder="이메일"
        //             value={email}
        //             onChange={(e) => setEmail(e.target.value)}
        //             style={{position: 'relative', left: '50%', transform: 'translate(-50%, 0%)'}}
        //         />
        //         <LoginInput
        //             type="password"
        //             placeholder="비밀번호"
        //             value={password}
        //             onChange={(e) => setPassword(e.target.value)}
        //             style={{position: 'relative', left: '50%', transform: 'translate(-50%, 0%)'}}
        //         />
        //         <LoginButton
        //             type="submit"
        //             style={{position: 'relative', left: '50%', transform: 'translate(-50%, 0%)'}}
        //         >
        //             로그인
        //         </LoginButton>
        //     </form>
        // </LoginContainer>
    );
};

export default LoginPage;
