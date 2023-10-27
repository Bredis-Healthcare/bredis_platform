import React, { useEffect, useState } from 'react';
import logo from '../../../img/bredis_logo.png'
import axios from "../../../api/axios";
import  {useNavigate  } from "react-router-dom";
import {useCookies} from 'react-cookie';
import { LoginContainer, LoginButton, LoginInput, LoginImage, SignupButton, ModalOverlay, CloseButton } from './LoginPageStyles';
import { useLoginModal } from './LoginModalContext';

const AdminLoginPageModal = () => {
    const { setIsModalOpen } = useLoginModal();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie] = useCookies(['name']);
    const navigate = useNavigate();
    const handleOutsideClick = (e) => {
        // if (e.target === e.currentTarget) {
        //     setIsModalOpen(false);
        // }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        async function loginPress() {
            try {
                const request = await axios.post('/admin/login', {
                    "email": email,  // using state value for email
                    "password": password  // using state value for password
                });
                // console.log("request data", request.data["memberId"], "authToken", request.data["authToken"]);
                setCookie('login', {id : request.data["memberId"], authToken : request.data["authToken"]}, {path : "/" , maxAge : 86400 })
                setIsModalOpen(false);
                window.location.reload();
            } catch (error) {
                console.error("Error while logging in:", error);
            }
        }
        loginPress();
    };

    return (
        <div className="py-10 overflow-auto fixed flex flex-col min-w-[200px] min-h-[740px] w-[100vw] h-[100vh] top-[0px] left-[0px] bg-black bg-opacity-75 z-50">
            <button className="absolute right-[10px] top-[10px] text-lg cursor-pointer"onClick={(e) => {setIsModalOpen(false)}}>X</button>
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
        // <ModalOverlay onClick={handleOutsideClick}>
        //     <LoginContainer>
        //         <h1>관리자 로그인이 만료되었습니다.</h1>
        //         <h1> 다시 로그인해주세요</h1>
        //         <CloseButton onClick={(e) => {setIsModalOpen(false)}}>X</CloseButton>
        //         <LoginImage src={logo} alt="Login Illustration" />
        //         <form onSubmit={handleLogin}>
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
        //         </form>
        //     </LoginContainer>
        // </ModalOverlay>
    );
};

export default AdminLoginPageModal;