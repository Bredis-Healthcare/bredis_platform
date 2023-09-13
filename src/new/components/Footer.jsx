import {Link, useNavigate} from "react-router-dom";
import * as React from 'react';

function Footer() {

    const navigate = useNavigate();
    return (
        <div className="self-stretch w-full shrink-0 flex flex-col min-h-[84px] mt-[38px] px-[20px] py-[37px] max-md:min-h-[30px] relative">
            <div className="Rectangle38 w-[1667px] h-[87px] left-0 top-0 absolute bg-gray-200" />
            <div className=" w-[116px] h-4 left-[465px] top-[39px] absolute text-zinc-500 text-[10px] font-bold">회사 소개서 다운로드</div>
            <div className="Rfq w-[116px] h-4 left-[602px] top-[39px] absolute text-zinc-500 text-[10px] font-bold">RFQ 다운로드</div>
            <div className="3655524 left-[876px] top-[15px] absolute text-center"><span className="text-zinc-500 text-[10px] font-bold">주소 </span><span className="text-zinc-500 text-[10px] font-normal">|</span><span className="text-zinc-500 text-[10px] font-bold"> 부산광역시 남구 신선로 365, 5층 524호(용담동, 부산창업지원센터) </span></div>
            <div className=" left-[465px] top-[15px] absolute text-center"><span className="text-zinc-500 text-[10px] font-bold">주식회사  </span><span className="text-zinc-500 text-[10px] font-normal">|</span><span className="text-zinc-500 text-[10px] font-bold"> 브레디스헬스케어</span></div>
            <div className=" left-[601px] top-[15px] absolute text-center"><span className="text-zinc-500 text-[10px] font-bold">대표자 </span><span className="text-zinc-500 text-[10px] font-normal">|</span><span className="text-zinc-500 text-[10px] font-bold"> 황현두 , 김지나</span></div>
            <div className="4418602877 left-[715px] top-[15px] absolute text-center"><span className="text-zinc-500 text-[10px] font-bold">사업자등록번호 </span><span className="text-zinc-500 text-[10px] font-normal">|</span><span className="text-zinc-500 text-[10px] font-bold"> 441-86-02877</span></div>
            <div className="Copyrights2023BredisHealthcareIncAllRightsReserved left-[465px] top-[63px] absolute text-center text-zinc-500 text-[10px] font-bold">Copyrights ⓒ 2023 Bredis Healthcare Inc. All Rights Reserved</div>
        </div>
    );
}

export default Footer;