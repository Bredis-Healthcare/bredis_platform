import React, {useState} from 'react';
import logo from '../resources/img/bredis_logo.png';
import {useNavigate} from "react-router-dom";
import {useCookies} from 'react-cookie';

// Main login component
const AdminMenuSelect = () => {

    // States for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie] = useCookies(['name']);
    const navigate = useNavigate();


    return (
        <div className="py-10 overflow-auto fixed flex flex-col w-[100vw] h-[100vh] min-w-[200px] min-h-[700px] top-[0px] left-[0px] bg-neutral-100 z-10">
            <div className="w-[100%] min-w-[200px] max-w-[400px] h-[60vh] min-h-[700px] relative bg-neutral-100 rounded-[40px] m-auto flex flex-col justify-center items-center gap-4" >
                <img className="w-[60%] max-w-[300px]" src={logo} alt='bredis_logo' />

                <div className="text-black text-[22px] font-bold break-keep text-center ">관리자님 반갑습니다!</div>
                <div className="w-[80%] pt-4 flex flex-col justify-start items-start gap-[1rem] ">
                    <div className="w-[100%] h-14 px-3 bg-sky-900 text-white text-2xl rounded-lg border border-zinc-500 flex justify-center items-center hover:cursor-pointer" onClick={(e)=>navigate(`/admin/members/list`)}>고객 관리하기</div>
                    <div className="w-[100%] h-14 px-3 bg-sky-900 text-white text-2xl rounded-lg border border-zinc-500 flex justify-center items-center hover:cursor-pointer" onClick={(e)=>navigate(`/admin/sampleControl`)}>검체 관리하기</div>
                </div>
            </div>
        </div>
    );
};

export default AdminMenuSelect;
