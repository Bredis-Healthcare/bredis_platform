import {Link, useNavigate} from "react-router-dom";
import * as React from 'react';

function Footer() {

    const navigate = useNavigate();
    return (
        <div className="w-full px-[20px] py-[37px] text-zinc-500 text-[12px] font-normal bg-gray-200 flex justify-center">
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
                <div className = "flex flex-row mt-[10px] mb-[10px]" >
                    <a href="/terms/service" className="mx-[10px] hover:cursor-pointer">이용약관</a>
                    <a href="/terms/privacy" className="mx-[10px] hover:cursor-pointer">개인정보 취급방침</a>
                    <a download href="https://bredis-public.s3.ap-northeast-2.amazonaws.com/test-service/Digital+ELISA+%E1%84%8B%E1%85%A7%E1%86%AB%E1%84%80%E1%85%AE%E1%84%87%E1%85%AE%E1%86%AB%E1%84%89%E1%85%A5%E1%86%A8+%E1%84%89%E1%85%A5%E1%84%87%E1%85%B5%E1%84%89%E1%85%B3_%E1%84%87%E1%85%B3%E1%84%85%E1%85%A6%E1%84%83%E1%85%B5%E1%84%89%E1%85%B3%E1%84%92%E1%85%A6%E1%86%AF%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A6%E1%84%8B%E1%85%A5.pdf"
                       className="mx-[10px] hover:cursor-pointer">서비스 소개서</a>
                </div>
                <a href="/admin" className="mx-[10px] hover:cursor-pointer">관리자 페이지</a>
                <div className="mx-[10px] mt-[20px]">Copyrights ⓒ 2023 Bredis Healthcare Inc. All Rights Reserved</div>
            </div>
        </div>
    );
}

export default Footer;