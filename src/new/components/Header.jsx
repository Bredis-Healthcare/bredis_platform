import {Link, useNavigate} from "react-router-dom";
import * as React from 'react';

const Header = () => {

    const navigate = useNavigate();

    return (
            <div className="Header w-[1667px] h-[76px] left-0 top-0 absolute">
                <div className=" w-[1667px] h-[76px] left-0 top-0 absolute bg-white" />
                <Link to={"/"}>
                    <div className="DigitalElisa left-[189px] top-[21px] absolute text-black text-[26px] font-bold">Digital ELISA 연구분석서비스</div>
                    <img className=" w-[189px] h-[76px] left-0 top-0 absolute" src="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F6ef4e97d4d2943759576eb7807cff8ac?&width=800" />
                </Link>

                <div className=" left-[1099px] top-[32px] absolute text-black text-xl font-bold">서비스 소개</div>
                <div className=" left-[1223px] top-[32px] absolute text-black text-xl font-bold">문의하기</div>

                <Link to={"/orders/create"}>
                    <div className=" left-[1326px] top-[32px] absolute text-black text-xl font-bold">주문하기</div>
                </Link>

                <div className=" w-[85px] h-[3px] left-[1415px] top-[16px] absolute bg-sky-900" />
                <Link to={"/orders/list"}>
                    <div className=" left-[1421px] top-[32px] absolute text-sky-900 text-xl font-bold">주문내역</div>
                </Link>
                <div className=" w-[50px] h-[30px] left-[1521px] top-[29px] absolute">
                    <div className="Bell w-[55px] h-[30px] left-0 top-0 absolute">
                        <img className="object-cover object-center" src="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fec38e501943d468fa0df8b6f1a34a36f?&width=200" alt=""/>
                    </div>
                </div>
                <div className=" w-[49px] h-[30px] left-[1581px] top-[29px] absolute">
                    <div className="UserCicrleLight w-[55px] h-[30px] left-0 top-0 absolute">
                        <img className="object-cover object-center" src="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F620ec0bc269049aa87c29d8e1cbbc3be?&width=200" alt=""/>
                    </div>
                </div>
            </div>
    );
}

export default Header;