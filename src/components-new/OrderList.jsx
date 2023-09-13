import {Link, useNavigate} from "react-router-dom";
import * as React from 'react';

const OrderList = () => {

    const navigate = useNavigate();
    return (
        <div className=" w-[1667px] h-[1072px] relative bg-neutral-100">
            <div className="MenuHeader w-[1667px] h-[115px] left-0 top-[70px] absolute">
                <div className="Rectangle6 w-[1667px] h-[115px] left-0 top-0 absolute bg-sky-900" />
                <div className=" left-[33px] top-[57px] absolute text-white text-3xl font-bold font-['Inter']">주문 내역</div>
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
            <div className=" w-[1222px] h-[718px] left-[223px] top-[231px] absolute">
                <div className=" w-[1222px] h-[718px] left-0 top-0 absolute bg-neutral-100 shadow" />
                <div className=" w-[1077px] h-[153px] left-[76px] top-[44px] absolute">
                    <div className="SimoaPtau181AdvantageV214 left-0 top-[30px] absolute text-black text-2xl font-bold font-['Inter']">SIMOA pTau181 Advantage v2.1 외 4건</div>
                    <div className="Ab40Ab42GfapNflPtau181 left-0 top-[121px] absolute text-black text-2xl font-normal font-['Inter']">Ab40, Ab42, GFAP, NFL, pTAU181 혈액검체 검사 의뢰</div>
                    <div className="0503 left-[769px] top-[31px] absolute text-black text-2xl font-light font-['Inter']">2023.05.03</div>
                    <div className="38262070 left-[756px] top-[121px] absolute text-black text-2xl font-medium font-['Inter']">₩38,262,070</div>
                    <div className=" left-[933px] top-[31px] absolute text-lime-500 text-2xl font-bold font-['Inter']">검체 인수 완료</div>
                    <div className="987204 left-0 top-0 absolute text-zinc-500 text-lg font-normal font-['Inter']">202308181119-987204</div>
                    <div className=" left-[802px] top-[1px] absolute text-zinc-500 text-lg font-normal font-['Inter']">주문일시</div>
                    <div className=" left-0 top-[88px] absolute text-zinc-500 text-lg font-normal font-['Inter']">의뢰내용</div>
                    <div className=" left-[988px] top-[1px] absolute text-zinc-500 text-lg font-normal font-['Inter']">상태</div>
                    <div className=" left-[820px] top-[88px] absolute text-zinc-500 text-lg font-normal font-['Inter']">금액</div>
                    <Link to="/orders/detail">
                        <button className=" w-[120px] h-[35px] left-[950px] top-[118px] absolute">
                            <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500" />
                            <div className=" w-[90px] h-[17px] left-[19px] top-[6px] absolute text-slate-500 text-lg font-bold font-['Inter']">주문 상세 ></div>
                        </button>
                    </Link>
                </div>
                <div className="Line5 w-[1114px] h-[0px] left-[62px] top-[246px] absolute border border-zinc-500"></div>
                <div className=" w-[1100px] h-[153px] left-[76px] top-[281px] absolute">
                    <div className="NfLightV2SimoaGfapDiscoveryAssay2 left-0 top-[30px] absolute text-black text-2xl font-bold font-['Inter']">NF-light V2, Simoa GFAP discovery assay 외 2건</div>
                    <div className="GfapNflPtau181 left-0 top-[121px] absolute text-black text-2xl font-normal font-['Inter']">GFAP, NFL, pTAU181 혈액검체 검사 의뢰</div>
                    <div className="0430 left-[769px] top-[31px] absolute text-black text-2xl font-light font-['Inter']">2023.04.30</div>
                    <div className="17131030 left-[756px] top-[121px] absolute text-black text-2xl font-medium font-['Inter']">₩17,131,030</div>
                    <div className=" left-[959px] top-[31px] absolute text-lime-500 text-2xl font-bold font-['Inter']">분석 대기</div>
                    <div className="2e0a61 left-0 top-0 absolute text-zinc-500 text-lg font-normal font-['Inter']">202308091520-2e0a61</div>
                    <div className=" left-[802px] top-[1px] absolute text-zinc-500 text-lg font-normal font-['Inter']">주문일시</div>
                    <div className=" left-0 top-[88px] absolute text-zinc-500 text-lg font-normal font-['Inter']">의뢰내용</div>
                    <div className=" left-[988px] top-[1px] absolute text-zinc-500 text-lg font-normal font-['Inter']">상태</div>
                    <div className=" left-[820px] top-[88px] absolute text-zinc-500 text-lg font-normal font-['Inter']">금액</div>
                    <div className=" w-[150px] h-[35px] left-[950px] top-[118px] absolute">
                        <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500" />
                        <div className=" w-[131px] h-[17px] left-[19px] top-[6px] absolute text-slate-500 text-lg font-bold font-['Inter']">주문 상세 ></div>
                    </div>
                </div>
                <div className="Line6 w-[1114px] h-[0px] left-[62px] top-[482px] absolute border border-zinc-500"></div>
                <div className=" w-[1100px] h-[153px] left-[76px] top-[519px] absolute">
                    <div className="SimoaPtau181AdvantageV212 left-0 top-[30px] absolute text-black text-2xl font-bold font-['Inter']">SIMOA pTau181 Advantage v2.1 외 2건</div>
                    <div className="PTau181682Gfap592Nfl592 left-0 top-[121px] absolute text-black text-2xl font-normal font-['Inter']">P-tau 181 682건, GFAP 592건, NfL 592건 분석 요청</div>
                    <div className="0131 left-[769px] top-[31px] absolute text-black text-2xl font-light font-['Inter']">2023.01.31</div>
                    <div className="56131030 left-[756px] top-[121px] absolute text-black text-2xl font-medium font-['Inter']">₩56,131,030</div>
                    <div className=" left-[959px] top-[31px] absolute text-slate-500 text-2xl font-bold font-['Inter']">결과 확인</div>
                    <div className="61f81f left-0 top-0 absolute text-zinc-500 text-lg font-normal font-['Inter']">202308090246-61f81f</div>
                    <div className=" left-[802px] top-[1px] absolute text-zinc-500 text-lg font-normal font-['Inter']">주문일시</div>
                    <div className=" left-0 top-[88px] absolute text-zinc-500 text-lg font-normal font-['Inter']">의뢰내용</div>
                    <div className=" left-[988px] top-[1px] absolute text-zinc-500 text-lg font-normal font-['Inter']">상태</div>
                    <div className=" left-[820px] top-[88px] absolute text-zinc-500 text-lg font-normal font-['Inter']">금액</div>
                    <div className=" w-[150px] h-[35px] left-[950px] top-[118px] absolute">
                        <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500" />
                        <div className=" w-[131px] h-[17px] left-[19px] top-[6px] absolute text-slate-500 text-lg font-bold font-['Inter']">주문 상세 ></div>
                    </div>
                </div>
            </div>
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

export default OrderList;