import React from "react";

function QuotationRequest (props) {
    let data = props.data
    return (
        <div className="top-[-150px] relative">
            <div className="Rectangle30 w-[861px] h-[1020px] left-[428px] top-[363px] absolute bg-white shadow" />

            <div className=" w-[95px] h-[17px] left-[480px] top-[401px] absolute text-slate-500 text-lg font-bold font-['Inter']">의뢰 기관: </div>
            <div className=" w-[141px] h-[18px] left-[559px] top-[401px] absolute text-black text-lg font-normal font-['Inter']">서울성모병원</div>
            <div className=" w-[95px] h-[17px] left-[480px] top-[443px] absolute text-slate-500 text-lg font-bold font-['Inter']">담당자:</div>
            <div className=" w-[141px] h-[18px] left-[559px] top-[443px] absolute text-black text-lg font-normal font-['Inter']">김철수</div>
            <div className=" w-[95px] h-[17px] left-[750px] top-[444px] absolute text-slate-500 text-lg font-bold font-['Inter']">전화번호:</div>
            <div className="12341234 w-[141px] h-[18px] left-[834px] top-[443px] absolute text-black text-lg font-normal font-['Inter']">010-1234-1234</div>
            <div className=" w-[95px] h-[17px] left-[1060px] top-[402px] absolute text-slate-500 text-lg font-bold font-['Inter']">의뢰일: </div>
            <div className="0831 w-[141px] h-[18px] left-[1119px] top-[402px] absolute text-black text-lg font-normal font-['Inter']">2023.08.31</div>
            <div className=" w-[95px] h-[17px] left-[1062px] top-[442px] absolute text-slate-500 text-lg font-bold font-['Inter']">이메일:</div>
            <div className="EmailGmailCom w-[165px] h-[18px] left-[1124px] top-[443px] absolute text-black text-base font-normal font-['Inter']">email@gmail.com</div>

            <div className=" w-[297px] h-[17px] left-[482px] top-[509px] absolute text-slate-500 text-lg font-bold font-['Inter']">샘플 및 분석 대상 바이오마커 정보 입력</div>
            <div className=" w-[214px] h-6 left-[1030px] top-[510px] absolute">
                <div className=" left-0 top-[5px] absolute text-sky-900 text-[15px] font-bold font-['Inter']">바이오마커 상세 목록 다운로드</div>
                <div className="ImportLight w-6 h-6 left-[190px] top-0 absolute flex-col justify-start items-start inline-flex" />
            </div>

            <div>
                {/*table은 나중에 다른 라이브러리 사용하여 구현. 굳이 디자인을 따를 필요 없음.*/}
                <div className=" w-8 h-[17px] left-[501px] top-[553px] absolute text-slate-500 text-[15px] font-bold font-['Inter']">번호</div>
                <div className=" w-[60px] h-[17px] left-[554px] top-[553px] absolute text-slate-500 text-[15px] font-bold font-['Inter']">고유번호</div>
                <div className=" w-[95px] h-[17px] left-[628px] top-[553px] absolute text-slate-500 text-[15px] font-bold font-['Inter']">바이오마커</div>
                <div className=" w-[95px] h-[17px] left-[714px] top-[553px] absolute text-slate-500 text-[15px] font-bold font-['Inter']">샘플 종류</div>
                <div className=" w-[95px] h-[17px] left-[789px] top-[553px] absolute text-slate-500 text-[15px] font-bold font-['Inter']">반복 횟수</div>
                <div className=" w-[38px] h-[17px] left-[881px] top-[553px] absolute text-slate-500 text-[15px] font-bold font-['Inter']">용량</div>
                <div className=" w-[95px] h-[17px] left-[1024px] top-[553px] absolute text-slate-500 text-[15px] font-bold font-['Inter']">추가 분석</div>
                <div className=" w-[31px] h-[17px] left-[1194px] top-[553px] absolute text-slate-500 text-[15px] font-bold font-['Inter']">동작</div>

                <div className=" w-[17px] h-[18px] left-[514px] top-[582px] absolute text-black text-sm font-normal font-['Inter']">1</div>
                <div className=" w-[17px] h-[18px] left-[514px] top-[645px] absolute text-black text-sm font-normal font-['Inter']">2</div>
                <div className=" w-[17px] h-[18px] left-[514px] top-[704px] absolute text-black text-sm font-normal font-['Inter']">3</div>
                <div className=" w-[17px] h-[18px] left-[513px] top-[743px] absolute text-black text-sm font-normal font-['Inter']">4</div>
                <div className=" w-[17px] h-[18px] left-[513px] top-[777px] absolute text-black text-sm font-normal font-['Inter']">5</div>
                <div className="S01 w-[52px] h-[18px] left-[555px] top-[583px] absolute text-black text-sm font-normal font-['Inter']">01S01</div>
                <div className="S02 w-[55px] h-[18px] left-[554px] top-[645px] absolute text-black text-sm font-normal font-['Inter']">01S02</div>
                <div className="S03 w-[55px] h-[18px] left-[555px] top-[705px] absolute text-black text-sm font-normal font-['Inter']">01S03</div>
                <div className="S04 w-[55px] h-[18px] left-[555px] top-[742px] absolute text-black text-sm font-normal font-['Inter']">01S04</div>
                <div className="S05 w-[55px] h-[18px] left-[555px] top-[780px] absolute text-black text-sm font-normal font-['Inter']">01S05</div>

                <div className="GfapNflBdnf w-[83px] h-3 left-[630px] top-[585px] absolute text-black text-sm font-normal font-['Inter']">GFAP<br/>NfL<br/>BDNF</div>
                <div className="GfapNflBdnf w-[83px] h-3 left-[630px] top-[646px] absolute text-black text-sm font-normal font-['Inter']">GFAP<br/>NfL<br/>BDNF</div>
                <div className="Bdnf w-[68.48px] h-3 left-[630px] top-[700px] absolute text-black text-sm font-normal font-['Inter']">BDNF</div>
                <div className="Bdnf w-[68.48px] h-3 left-[630px] top-[745px] absolute text-black text-sm font-normal font-['Inter']">BDNF</div>
                <div className="Bdnf w-[68.48px] h-3 left-[630px] top-[780px] absolute text-black text-sm font-normal font-['Inter']">BDNF</div>

                <div className="Line16 w-[782px] h-[0px] left-[480px] top-[431px] absolute border border-zinc-500"></div>
                <div className="Line17 w-[782px] h-[0px] left-[480px] top-[475px] absolute border border-zinc-500"></div>
                <div className="Line18 w-[772px] h-[0px] left-[490px] top-[1130px] absolute border border-zinc-500"></div>
                <div className="Line19 w-[771px] h-[0px] left-[490px] top-[1171px] absolute border border-zinc-500"></div>
                <div className=" w-[782px] h-[442px] left-[492px] top-[579px] absolute">
                    <div className="Line26 w-[775.38px] h-[0px] left-0 top-[65px] absolute border border-zinc-500"></div>
                    <div className="Line27 w-[774.11px] h-[0px] left-0 top-[119.08px] absolute border border-zinc-500"></div>
                    <div className="Line28 w-[775.38px] h-[0px] left-0 top-[157px] absolute border border-zinc-500"></div>
                    <div className="Line29 w-[775.38px] h-[0px] left-0 top-[191px] absolute border border-zinc-500"></div>
                    <div className="Line30 w-[775.38px] h-[0px] left-0 top-[229px] absolute border border-zinc-500"></div>
                    <div className="Line31 w-[774.11px] h-[0px] left-0 top-[262px] absolute border border-zinc-500"></div>
                    <div className="Line32 w-[775.38px] h-[0px] left-0 top-[296px] absolute border border-zinc-500"></div>
                    <div className="Line33 w-[775.38px] h-[0px] left-0 top-[335px] absolute border border-zinc-500"></div>
                    <div className="Line34 w-[775.38px] h-[0px] left-0 top-[372px] absolute border border-zinc-500"></div>
                    <div className="Line35 w-[775.38px] h-[0px] left-0 top-[409px] absolute border border-zinc-500"></div>
                    <div className="Line19 w-[439px] h-[0px] left-[50.57px] top-[3px] absolute origin-top-left rotate-90 border border-zinc-500"></div>
                    <div className="Line20 w-[439px] h-[0px] left-[129.98px] top-[1px] absolute origin-top-left rotate-90 border border-zinc-500"></div>
                    <div className="Line22 w-[439px] h-[0px] left-[287px] top-[1px] absolute origin-top-left rotate-90 border border-zinc-500"></div>
                    <div className="Line36 w-[439px] h-[0px] left-[214.04px] top-[1px] absolute origin-top-left rotate-90 border border-zinc-500"></div>
                    <div className="Line23 w-[439px] h-[0px] left-[452.85px] top-[3px] absolute origin-top-left rotate-90 border border-zinc-500"></div>
                    <div className="Line37 w-[439px] h-[0px] left-[369px] top-[1px] absolute origin-top-left rotate-90 border border-zinc-500"></div>
                    <div className="Line24 w-[439px] h-[0px] left-[663.82px] top-[1px] absolute origin-top-left rotate-90 border border-zinc-500"></div>
                </div>
                <div className="AmyloidPetPositivityPrediction w-[162px] left-[993px] top-[583px] absolute text-black text-[9px] font-normal font-['Inter']">Amyloid PET Positivity Prediction</div>
                <div className="AmyloidPetPositivityPrediction w-[162px] left-[993px] top-[646px] absolute text-black text-[9px] font-normal font-['Inter']">Amyloid PET Positivity Prediction</div>
                <div className=" w-[22px] left-[1047px] top-[708px] absolute text-black text-[9px] font-normal font-['Inter']">없음</div>
                <div className=" w-[22px] left-[1047px] top-[748px] absolute text-black text-[9px] font-normal font-['Inter']">없음</div>
                <div className=" w-[22px] left-[1047px] top-[784px] absolute text-black text-[9px] font-normal font-['Inter']">없음</div>

                <div className="Duplicate w-[74px] h-3 left-[787px] top-[645px] absolute text-black text-sm font-normal font-['Inter']">Duplicate</div>
                <div className="Duplicate w-[74px] h-3 left-[787px] top-[585px] absolute text-black text-sm font-normal font-['Inter']">Duplicate</div>
                <div className="Duplicate w-[74px] h-3 left-[787px] top-[706px] absolute text-black text-sm font-normal font-['Inter']">Duplicate</div>
                <div className="Duplicate w-[74px] h-3 left-[787px] top-[745px] absolute text-black text-sm font-normal font-['Inter']">Duplicate</div>
                <div className="Duplicate w-[74px] h-3 left-[787px] top-[782px] absolute text-black text-sm font-normal font-['Inter']">Duplicate</div>

                <div className="Serum w-[74px] h-3 left-[713px] top-[585px] absolute text-black text-sm font-normal font-['Inter']">Serum</div>
                <div className="Serum w-[74px] h-3 left-[713px] top-[644px] absolute text-black text-sm font-normal font-['Inter']">Serum</div>
                <div className="Serum w-[74px] h-3 left-[715px] top-[706px] absolute text-black text-sm font-normal font-['Inter']">Serum</div>
                <div className="EdtaPlasma w-[74px] h-[30px] left-[700px] top-[739px] absolute text-center text-black text-xs font-normal font-['Inter']">EDTA Plasma</div>
                <div className="EdtaPlasma w-[74px] h-3 left-[700px] top-[774px] absolute text-center text-black text-xs font-normal font-['Inter']">EDTA Plasma</div>

                <div className="L w-[62px] h-3 left-[884px] top-[643px] absolute text-black text-sm font-normal font-['Inter']">45μl</div>
                <div className="L w-[62px] h-3 left-[882px] top-[583px] absolute text-black text-sm font-normal font-['Inter']">45μl</div>
                <div className="L w-[62px] h-3 left-[884px] top-[703px] absolute text-black text-sm font-normal font-['Inter']">70μl</div>
                <div className="L w-[62px] h-3 left-[884px] top-[742px] absolute text-black text-sm font-normal font-['Inter']">70μl</div>
                <div className="L w-[62px] h-3 left-[884px] top-[779px] absolute text-black text-sm font-normal font-['Inter']">70μl</div>

                <div className=" w-[40.45px] h-[26px] left-[1160px] top-[600px] absolute">
                    <div className="Rectangle7 w-[40.45px] h-[26px] left-0 top-0 absolute bg-white rounded-[9px] border border-zinc-500" />
                    <div className=" w-[26.64px] h-[13px] left-[6.91px] top-[5px] absolute text-zinc-500 text-sm font-bold font-['Inter']">삭제</div>
                </div>
                <div className=" w-[41px] h-[26px] left-[1210px] top-[600px] absolute">
                    <div className="Rectangle7 w-[41px] h-[26px] left-0 top-0 absolute bg-white rounded-[9px] border border-zinc-500" />
                    <div className=" w-[27px] h-[13px] left-[7px] top-[5px] absolute text-zinc-500 text-sm font-bold font-['Inter']">수정</div>
                </div>
                <div className=" w-[41px] h-[26px] left-[1163px] top-[661px] absolute">
                    <div className="Rectangle7 w-[41px] h-[26px] left-0 top-0 absolute bg-white rounded-[9px] border border-zinc-500" />
                    <div className=" w-[27px] h-[13px] left-[7px] top-[5px] absolute text-zinc-500 text-sm font-bold font-['Inter']">삭제</div>
                </div>
                <div className=" w-[41px] h-[26px] left-[1209px] top-[661px] absolute">
                    <div className="Rectangle7 w-[41px] h-[26px] left-0 top-0 absolute bg-white rounded-[9px] border border-zinc-500" />
                    <div className=" w-[27px] h-[13px] left-[7px] top-[5px] absolute text-zinc-500 text-sm font-bold font-['Inter']">수정</div>
                </div>
                <div className=" w-[41px] h-[26px] left-[1163px] top-[703px] absolute">
                    <div className="Rectangle7 w-[41px] h-[26px] left-0 top-0 absolute bg-white rounded-[9px] border border-zinc-500" />
                    <div className=" w-[27px] h-[13px] left-[7px] top-[5px] absolute text-zinc-500 text-sm font-bold font-['Inter']">삭제</div>
                </div>
                <div className=" w-[41px] h-[26px] left-[1209px] top-[702px] absolute">
                    <div className="Rectangle7 w-[41px] h-[26px] left-0 top-0 absolute bg-white rounded-[9px] border border-zinc-500" />
                    <div className=" w-[27px] h-[13px] left-[7px] top-[5px] absolute text-zinc-500 text-sm font-bold font-['Inter']">수정</div>
                </div>
                <div className=" w-[41px] h-[26px] left-[1163px] top-[739px] absolute">
                    <div className="Rectangle7 w-[41px] h-[26px] left-0 top-0 absolute bg-white rounded-[9px] border border-zinc-500" />
                    <div className=" w-[27px] h-[13px] left-[7px] top-[5px] absolute text-zinc-500 text-sm font-bold font-['Inter']">삭제</div>
                </div>
                <div className=" w-[41px] h-[26px] left-[1209px] top-[739px] absolute">
                    <div className="Rectangle7 w-[41px] h-[26px] left-0 top-0 absolute bg-white rounded-[9px] border border-zinc-500" />
                    <div className=" w-[27px] h-[13px] left-[7px] top-[5px] absolute text-zinc-500 text-sm font-bold font-['Inter']">수정</div>
                </div>
                <div className=" w-[41px] h-[26px] left-[1163px] top-[772px] absolute">
                    <div className="Rectangle7 w-[41px] h-[26px] left-0 top-0 absolute bg-white rounded-[9px] border border-zinc-500" />
                    <div className=" w-[27px] h-[13px] left-[7px] top-[5px] absolute text-zinc-500 text-sm font-bold font-['Inter']">삭제</div>
                </div>
                <div className=" w-[41px] h-[26px] left-[1209px] top-[772px] absolute">
                    <div className="Rectangle7 w-[41px] h-[26px] left-0 top-0 absolute bg-white rounded-[9px] border border-zinc-500" />
                    <div className=" w-[27px] h-[13px] left-[7px] top-[5px] absolute text-zinc-500 text-sm font-bold font-['Inter']">수정</div>
                </div>
                <div className=" w-[69px] h-[57px] left-[1181px] top-[810px] absolute">
                    <div className="Rectangle7 w-[41px] h-[26px] left-[28px] top-0 absolute bg-slate-500 rounded-[9px]" />
                    <div className=" w-[27px] h-[13px] left-[35px] top-[5px] absolute text-white text-sm font-bold font-['Inter']">복제</div>
                </div>
                <div className=" w-[41px] h-[26px] left-[1163px] top-[810px] absolute">
                    <div className="Rectangle7 w-[41px] h-[26px] left-0 top-0 absolute bg-slate-500 rounded-[9px]" />
                    <div className=" w-[27px] h-[13px] left-[7px] top-[5px] absolute text-white text-sm font-bold font-['Inter']">신규</div>
                </div>
            </div>

            <div className=" w-[134px] h-[17px] left-[490px] top-[1096px] absolute text-slate-500 text-lg font-bold font-['Inter']">검체 수거 요청일:</div>
            <div className="1101 w-[141px] h-[18px] left-[634px] top-[1096px] absolute text-black text-lg font-normal font-['Inter']">2023.11.01</div>
            <div className=" w-[164px] h-[17px] left-[489px] top-[1139px] absolute text-slate-500 text-lg font-bold font-['Inter']">검체 수거 요청 주소:</div>
            <div className="51395 left-[653px] top-[1139px] absolute text-black text-lg font-normal font-['Inter']">경기도 구리시 건원대로 51, 395호</div>
            <div className=" w-[134px] h-[17px] left-[935px] top-[1096px] absolute text-slate-500 text-lg font-bold font-['Inter']">결과 보고 희망일:</div>
            <div className="1201 w-[141px] h-[18px] left-[1074px] top-[1096px] absolute text-black text-lg font-normal font-['Inter']">2023.12.01</div>

            <div className="Group38 w-[123px] h-[63px] left-[1149px] top-[1030px] absolute">
                <div className=" left-[16px] top-[44px] absolute text-zinc-500 text-[15px] font-bold font-['Inter']">양식 다운로드</div>
                <div className=" w-[123px] h-[35px] left-0 top-0 absolute">
                    <div className="Rectangle7 w-[123px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500" />
                    <div className=" w-[93.48px] h-[17px] left-[18.27px] top-[7px] absolute text-slate-500 text-lg font-bold font-['Inter']">파일 업로드</div>
                </div>
                <div className="ImportLight w-5 h-[21px] left-[102px] top-[42px] absolute" />
            </div>

            <div className=" w-[95px] h-[17px] left-[490px] top-[1180px] absolute text-slate-500 text-lg font-bold font-['Inter']">특이사항</div>
            <textarea id="message" rows="4" className="resize-none left-[490px] top-[1220px] absolute block p-2.5 w-[760px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="특이사항...">
                {data.content}
            </textarea>
        </div>
    )

}
export default QuotationRequest;