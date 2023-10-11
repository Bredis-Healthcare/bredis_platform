import {Link, useNavigate} from "react-router-dom";
import * as React from 'react';

function Footer() {

    const navigate = useNavigate();
    return (
        <div className="w-[1667px] px-[20px] py-[37px] text-zinc-500 text-[13px] font-medium bg-gray-200 flex justify-center">
            <div className="w-fit">
                <div className = "flex flex-row ">
                    <div className="mx-[10px]">주식회사 | 브레디스헬스케어  </div>
                    <div className="mx-[10px]">대표자 | 황현두 , 김지나  </div>
                    <div className="mx-[10px]">사업자등록번호 | 441-86-02877  </div>
                    <div className="mx-[10px]">본점: 부산광역시 남구 신선로 365, 5층 524호</div>
                    <div className="mx-[10px]">연구소/분석센터: 서울특별시 성동구 아차산로17길 57, 206호</div>
                </div>
                <div className="flex flex-row">


                </div>
                <div className = "flex flex-row mt-[10px]" >
                    <a href="/terms/service" className="mx-[10px] hover:cursor-pointer">이용약관</a>
                    <a href="/terms/privacy" className="mx-[10px] hover:cursor-pointer">개인정보 취급방침</a>
                    <div className="mx-[10px]">회사 소개서 다운로드</div>
                    <div className="mx-[10px]">RFQ 다운로드</div>
                </div>
                <div className="mx-[10px] mt-[20px]">Copyrights ⓒ 2023 Bredis Healthcare Inc. All Rights Reserved</div>
            </div>
        </div>
    );
}

export default Footer;

