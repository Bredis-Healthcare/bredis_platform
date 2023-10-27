import React, {useEffect, useState} from 'react';
import logo from '../../resources/img/bredis_logo.png'
import axios from "../../api/axios";
import {useNavigate} from "react-router-dom";
import {useCookies} from 'react-cookie';
import {useLoginModal} from './LoginModalContext';

const LoginPageModal = () => {
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
    const handleKeyUp = (e) => {
        if (e.key === 'Escape') {
            setIsModalOpen(false);
            navigate("/");
        }
    };

    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        async function loginPress() {
            try {
                const request = await axios.post('login', {
                    "email": email,  // using state value for email
                    "password": password  // using state value for password
                });
                
                if(request !== "오류"){
                    // console.log("request data", request.data["memberId"], "authToken", request.data["authToken"]);
                    setCookie('login', {id : request.data["memberId"], authToken : request.data["authToken"]}, {path : "/" , maxAge : 86400 })
                    setIsModalOpen(false);
                    window.location.reload();
                }
                else{
                    alert("로그인 정보가 맞지 않습니다.")
                }
                

            } catch (error) {
                console.error("Error while logging in:", error);
                console.error(error.request['status']);
            }
        }
        loginPress();
    };

    return (
        <div className="py-10 fixed flex flex-col w-[100vw] h-[100vh] min-w-[200px] min-h-[740px] top-[0px] left-[0px] bg-black bg-opacity-75 z-50 overflow-auto">
            <button className="absolute right-[10px] top-[10px] text-lg cursor-pointer" onClick={(e) => {setIsModalOpen(false)}}>X</button>
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
                    <button className="w-[100%] py-2 bg-sky-900 rounded-[9px] flex justify-center items-center text-white text-lg hover:bg-sky-950 cursor-pointer" type="submit" >로그인</button>
                    <button className="w-[100%] py-2 rounded-[9px] border border-sky-900 flex justify-center items-center text-sky-900 text-lg hover:bg-zinc-200 cursor-pointer"  onClick={() => navigate("/signup"  )} >회원가입</button>
                </div>
            </form>
        </div>
    );
};

export default LoginPageModal;