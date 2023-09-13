import {Link, useNavigate} from "react-router-dom";
import * as React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";

const OrderList = () => {

    const navigate = useNavigate();
    return (
        <div className=" w-[1667px] h-[1072px] relative bg-neutral-100">
            <div className="MenuHeader w-[1667px] h-[115px] left-0 top-[70px] absolute">
                <div className="Rectangle6 w-[1667px] h-[115px] left-0 top-0 absolute bg-sky-900" />
                <div className=" left-[33px] top-[57px] absolute text-white text-3xl font-bold font-['Inter']">주문 내역</div>
            </div>
            <Header />
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
            <Footer />
        </div>
    );
}

export default OrderList;