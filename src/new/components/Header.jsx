import {Link, useNavigate} from "react-router-dom";
import * as React from 'react';
import {useState} from 'react';
import axios from "../../api/axios";
import {useCookies} from "react-cookie";


const Header = () => {

    const navigate = useNavigate();
    const [isHovering1, setIsHovering1] = useState(false);
    const [isHovering2, setIsHovering2] = useState(false);
    const [isHovering3, setIsHovering3] = useState(false);
    const [isHovering4, setIsHovering4] = useState(false);
    const [profileMenuOn, setProfileMenuOn] = useState(false);

    const [cookies, setCookie, removeCookie] = useCookies(['login']);

    const colorOn1 = () => {
        setIsHovering1(true);
    }

    const colorOff1 = () => {
        setIsHovering1(false);
    }

    const colorOn2 = () => {
        setIsHovering2(true);
    }

    const colorOff2 = () => {
        setIsHovering2(false);
    }
    const colorOn3 = () => {
        setIsHovering3(true);
    }

    const colorOff3 = () => {
        setIsHovering3(false);
    }

    const colorOn4 = () => {
        setIsHovering4(true);
    }

    const colorOff4 = () => {
        setIsHovering4(false);
    }

    function clickProfileIcon() {
        setProfileMenuOn(profileMenuOn => !profileMenuOn)
    }

    async function logout() {
        const request = await axios.post('logout')
        removeCookie(['login']);
        clickProfileIcon()
        navigate("/");
    }

    return (
            <div className="Header w-[1667px] h-[76px] left-0 top-0 absolute">
                <div className=" w-[1667px] h-[76px] left-0 top-0 absolute bg-white" />
                <Link to={"/"}>
                    <div className="DigitalElisa left-[189px] top-[21px] absolute text-black text-[26px] font-bold">Digital ELISA 연구분석서비스</div>
                    <img className=" w-[189px] h-[76px] left-0 top-0 absolute" src="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F6ef4e97d4d2943759576eb7807cff8ac?&width=800" />
                </Link>

                <Link to={"/"} onMouseOver={colorOn1} onMouseOut={colorOff1}>
                    <div className={`${isHovering1 ? 'block' : 'hidden'} w-[94px] h-[3px] left-[1099px] top-[16px] absolute bg-sky-900`} />
                    <div className={`${isHovering1 ? 'text-sky-900' : 'text-black'} left-[1099px] top-[32px] absolute text-black text-xl font-bold`}>서비스 소개</div>
                </Link>
                <Link to={"/threads/list"} onMouseOver={colorOn2} onMouseOut={colorOff2}>
                    <div className={`${isHovering2 ? 'block' : 'hidden'} w-[82px] h-[3px] left-[1217px] top-[16px] absolute bg-sky-900`} />
                    <div className={`${isHovering2 ? 'text-sky-900' : 'text-black'} left-[1223px] top-[32px] absolute text-black text-xl font-bold`}>문의하기</div>
                </Link>

                <Link to={"/orders/create"} onMouseOver={colorOn3} onMouseOut={colorOff3}>
                    <div className={`${isHovering3 ? 'block' : 'hidden'} w-[82px] h-[3px] left-[1320px] top-[16px] absolute bg-sky-900`} />
                    <div className={`${isHovering3 ? 'text-sky-900' : 'text-black'} left-[1326px] top-[32px] absolute text-xl font-bold`}>주문하기</div>
                </Link>

                <Link to={"/orders/list"} onMouseOver={colorOn4} onMouseOut={colorOff4}>
                    <div className={`${isHovering4 ? 'block' : 'hidden'} w-[82px] h-[3px] left-[1415px] top-[16px] absolute bg-sky-900`} />
                    <div className={`${isHovering4 ? 'text-sky-900' : 'text-black'} left-[1421px] top-[32px] absolute  text-xl font-bold`}>주문내역</div>
                </Link>
                <div className=" w-[50px] h-[30px] left-[1521px] top-[29px] absolute">
                    <div className="Bell w-[55px] h-[30px] left-0 top-0 absolute">
                        <img className="object-cover object-center" src="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fec38e501943d468fa0df8b6f1a34a36f?&width=200" alt=""/>
                    </div>
                </div>
                <button className=" w-[49px] h-[30px] left-[1581px] top-[29px] absolute"
                        onClick={() => clickProfileIcon()}>
                    <div className="UserCicrleLight w-[55px] h-[30px] left-0 top-0 absolute">
                        <img className="object-cover object-center" src="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F620ec0bc269049aa87c29d8e1cbbc3be?&width=200" alt=""/>
                    </div>
                </button>
                <button className={`${profileMenuOn ? 'block' : 'hidden'} absolute w-auto left-[1515px] top-[58px] z-10`}
                        onClick={() => logout()}>
                    <img className="object-cover object-center" src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc18ab58-4f37-43ec-8a4c-32e441c85efb?&width=800" />
                </button>
            </div>
    );
}

export default Header;