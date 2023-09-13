import {Link, useNavigate} from "react-router-dom";
import * as React from 'react';

const Home = () => {

    const navigate = useNavigate();
    return (
        <div className="1 w-[1667px] h-[1072px] relative bg-neutral-100">
            <div className="MenuHeader w-[1667px] h-[115px] left-0 top-[70px] absolute">
                <div className="Rectangle6 w-[1667px] h-[115px] left-0 top-0 absolute bg-sky-900" />
                <div className=" left-[33px] top-[57px] absolute text-white text-3xl font-bold">홈</div>
            </div>
            <div className="Header w-[1667px] h-[76px] left-0 top-0 absolute">
                <div className=" w-[1667px] h-[76px] left-0 top-0 absolute bg-white" />
                <div className=" w-[1667px] h-[76px] left-0 top-0 absolute bg-white" />
                <div className=" left-[1326px] top-[32px] absolute text-black text-xl font-bold">주문하기</div>
                <Link to={"/orders/list"}>
                    <div className=" left-[1421px] top-[32px] absolute text-sky-900 text-xl font-bold">주문내역</div>
                </Link>
                <Link to={"/"}>
                    <div className="DigitalElisa left-[189px] top-[21px] absolute text-black text-[26px] font-bold">Digital ELISA 연구분석서비스</div>
                    <img className=" w-[189px] h-[76px] left-0 top-0 absolute" src="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F6ef4e97d4d2943759576eb7807cff8ac?&width=800" />
                </Link>
                <div className=" w-[50px] h-[30px] left-[1521px] top-[29px] absolute">
                    <div className="Bell w-[55px] h-[30px] left-0 top-0 absolute">
                        <img className="object-cover object-center" src="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fec38e501943d468fa0df8b6f1a34a36f?&width=200" alt=""/>
                    </div>
                </div>
                <div className=" left-[1223px] top-[32px] absolute text-neutral-700 text-xl font-bold">문의하기</div>
                <div className=" left-[1099px] top-[32px] absolute text-black text-xl font-bold">서비스 소개</div>
                <div className=" w-[85px] h-[3px] left-[1415px] top-[16px] absolute bg-sky-900" />
                <div className=" w-[49px] h-[30px] left-[1581px] top-[29px] absolute">
                    <div className="UserCicrleLight w-[55px] h-[30px] left-0 top-0 absolute">
                        <img className="object-cover object-center" src="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F620ec0bc269049aa87c29d8e1cbbc3be?&width=200" alt=""/>
                    </div>
                </div>
            </div>
            <div>홈 화면 입니다.</div>
            <div className="Footer w-[1667px] h-[87px] left-0 top-[986px] absolute">
                <div className="Rectangle38 w-[1667px] h-[87px] left-0 top-0 absolute bg-gray-200" />
                <div className=" w-[116px] h-4 left-[465px] top-[39px] absolute text-zinc-500 text-[10px] font-bold">회사 소개서 다운로드</div>
                <div className="Rfq w-[116px] h-4 left-[602px] top-[39px] absolute text-zinc-500 text-[10px] font-bold">RFQ 다운로드</div>
                <div className="3655524 left-[876px] top-[15px] absolute text-center"><span className="text-zinc-500 text-[10px] font-bold">주소 </span><span className="text-zinc-500 text-[10px] font-normal">|</span><span className="text-zinc-500 text-[10px] font-bold"> 부산광역시 남구 신선로 365, 5층 524호(용담동, 부산창업지원센터) </span></div>
                <div className=" left-[465px] top-[15px] absolute text-center"><span className="text-zinc-500 text-[10px] font-bold">주식회사  </span><span className="text-zinc-500 text-[10px] font-normal">|</span><span className="text-zinc-500 text-[10px] font-bold"> 브레디스헬스케어</span></div>
                <div className=" left-[601px] top-[15px] absolute text-center"><span className="text-zinc-500 text-[10px] font-bold">대표자 </span><span className="text-zinc-500 text-[10px] font-normal">|</span><span className="text-zinc-500 text-[10px] font-bold"> 황현두 , 김지나</span></div>
                <div className="4418602877 left-[715px] top-[15px] absolute text-center"><span className="text-zinc-500 text-[10px] font-bold">사업자등록번호 </span><span className="text-zinc-500 text-[10px] font-normal">|</span><span className="text-zinc-500 text-[10px] font-bold"> 441-86-02877</span></div>
                <div className="Copyrights2023BredisHealthcareIncAllRightsReserved left-[465px] top-[63px] absolute text-center text-zinc-500 text-[10px] font-bold">Copyrights ⓒ 2023 Bredis Healthcare Inc. All Rights Reserved</div>
            </div>
        </div>
    );
}

export default Home;