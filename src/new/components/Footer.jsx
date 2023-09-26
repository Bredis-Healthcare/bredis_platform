import {Link, useNavigate} from "react-router-dom";
import * as React from 'react';

function Footer() {

    const navigate = useNavigate();
    return (
        <div className="w-[1667px] px-[20px] py-[37px] text-zinc-500 text-[10px] font-bold bg-gray-200 flex justify-center">
            <div className="w-fit">
                <div className = "flex flex-row ">
                    <div className="mx-[5px]">주식회사 | 브레디스헬스케어  </div>
                    <div className="mx-[5px]">대표자 | 황현두 , 김지나  </div>
                    <div className="mx-[5px]">사업자등록번호 | 441-86-02877  </div>
                    <div className="mx-[5px]">주소 | 부산광역시 남구 신선로 365, 5층 524호(용담동, 부산창업지원센터)</div>
                </div>
                <div className = "flex flex-row" >
                    <div className="mx-[5px]">회사 소개서 다운로드</div>
                    <div className="mx-[5px]">RFQ 다운로드</div>
                </div>
                <div className="mt-[5px]">Copyrights ⓒ 2023 Bredis Healthcare Inc. All Rights Reserved</div>
            </div>
        </div>
    );
}

export default Footer;

