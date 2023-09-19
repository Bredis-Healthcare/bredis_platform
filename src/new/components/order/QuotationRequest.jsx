import React from "react";
import TableCell from "./TableCell";

function QuotationRequest (props) {
    let data = props.data
    return (
        <div className="top-[-150px] relative">
            <div className="Rectangle30 w-[861px] h-[1020px] left-[428px] top-[363px] absolute bg-white shadow" />

            <div className=" w-[95px] h-[17px] left-[480px] top-[401px] absolute text-slate-500 text-lg font-bold font-['Inter']">의뢰 기관: </div>
            <div className=" w-[141px] h-[18px] left-[559px] top-[401px] absolute text-black text-lg font-normal font-['Inter']">{data.content.organization}</div>
            <div className=" w-[95px] h-[17px] left-[480px] top-[443px] absolute text-slate-500 text-lg font-bold font-['Inter']">담당자:</div>
            <div className=" w-[141px] h-[18px] left-[559px] top-[443px] absolute text-black text-lg font-normal font-['Inter']">{data.content.managerName}</div>
            <div className=" w-[95px] h-[17px] left-[750px] top-[444px] absolute text-slate-500 text-lg font-bold font-['Inter']">전화번호:</div>
            <div className="12341234 w-[141px] h-[18px] left-[834px] top-[443px] absolute text-black text-lg font-normal font-['Inter']">{data.content.mobile}</div>
            <div className=" w-[95px] h-[17px] left-[1060px] top-[402px] absolute text-slate-500 text-lg font-bold font-['Inter']">의뢰일: </div>
            <div className="0831 w-[141px] h-[18px] left-[1119px] top-[402px] absolute text-black text-lg font-normal font-['Inter']">{data.content.requestDate}</div>
            <div className=" w-[95px] h-[17px] left-[1062px] top-[442px] absolute text-slate-500 text-lg font-bold font-['Inter']">이메일:</div>
            <div className="EmailGmailCom w-[165px] h-[18px] left-[1124px] top-[443px] absolute text-black text-base font-normal font-['Inter']">{data.content.email}</div>

            <div className=" w-[297px] h-[17px] left-[482px] top-[509px] absolute text-slate-500 text-lg font-bold font-['Inter']">샘플 및 분석 대상 바이오마커 정보 입력</div>
            <div className=" w-[214px] h-6 left-[1030px] top-[510px] absolute">
                <div className=" left-0 top-[5px] absolute text-sky-900 text-[15px] font-bold font-['Inter']">바이오마커 상세 목록 다운로드</div>
                <div className="ImportLight w-6 h-6 left-[190px] top-0 absolute flex-col justify-start items-start inline-flex" />
            </div>

            <div id="table" className="left-[490px] top-[553px] absolute">
                <table style={{borderCollapse: 'collapse', borderColor: '#ccc', borderSpacing:0}}>
                    <thead>
                    <tr>
                        {
                            ['번호', '고유번호','바이오마커','샘플 종류','반복 횟수','용량','추가 분석','동작'].map((name) => (
                                <th style={{backgroundColor: '#f0f0f0', borderColor: '#ccc', color:'#333', borderStyle: 'solid', borderWidth: '1px', fontFamily: 'Arial sansSerif', fontSize: '14px',
                                    fontWeight: 'bold', overflow:'hidden', padding:'10px 5px', wordBreak: 'break-all'}}>{name}</th>
                            ))
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                            data.content.sampleDataList.map((row) => (
                                <tr>
                                    {
                                        [row.number, row.uniqueNumber, row.biomarkers ? row.biomarkers.join(' ') : '', row.sampleType, row.repetition, row.volume, row.additionalAnalysis ? row.additionalAnalysis.join(' ') : ''].map((value) => (
                                            <TableCell value={value}/>
                                        ))

                                    }
                                    <TableCell>
                                        <button className=" w-[41px] h-[26px] relative mx-1">
                                            <div className="Rectangle7 w-[41px] h-[26px] left-0 top-0 absolute bg-white rounded-[9px] border border-zinc-500" />
                                            <div className=" w-[27px] h-[13px] left-[7px] top-[5px] absolute text-zinc-500 text-sm font-bold font-['Inter']">삭제</div>
                                        </button>
                                        <button className=" w-[41px] h-[26px] relative mx-1">
                                            <div className="Rectangle7 w-[41px] h-[26px] left-0 top-0 absolute bg-white rounded-[9px] border border-zinc-500" />
                                            <div className=" w-[27px] h-[13px] left-[7px] top-[5px] absolute text-zinc-500 text-sm font-bold font-['Inter']">수정</div>
                                        </button>
                                    </TableCell>
                                </tr>
                            ))
                    }
                    {
                        <tr>
                            <TableCell>
                                {data.content.sampleDataList.length + 1}
                            </TableCell>
                            <TableCell/><TableCell/><TableCell/><TableCell/><TableCell/><TableCell/>
                            <TableCell>
                                    <button className=" w-[41px] h-[26px] relative mx-1">
                                        <div className="Rectangle7 w-[41px] h-[26px] left-0 top-0 absolute bg-slate-500 rounded-[9px]" />
                                        <div className=" w-[27px] h-[13px] left-[7px] top-[5px] absolute text-white text-sm font-bold font-['Inter']">복제</div>
                                    </button>
                                    <button className=" w-[41px] h-[26px] relative mx-1">
                                        <div className="Rectangle7 w-[41px] h-[26px] left-0 top-0 absolute bg-slate-500 rounded-[9px]" />
                                        <div className=" w-[27px] h-[13px] left-[7px] top-[5px] absolute text-white text-sm font-bold font-['Inter']">신규</div>
                                    </button>
                            </TableCell>
                        </tr>
                    }
                    </tbody>
                </table>
            </div>

            <div className=" w-[134px] h-[17px] left-[490px] top-[1096px] absolute text-slate-500 text-lg font-bold font-['Inter']">검체 수거 요청일:</div>
            <div className="1101 w-[141px] h-[18px] left-[634px] top-[1096px] absolute text-black text-lg font-normal font-['Inter']">{data.content.sampleDeliveryWishDate}</div>
            <div className=" w-[164px] h-[17px] left-[489px] top-[1139px] absolute text-slate-500 text-lg font-bold font-['Inter']">검체 수거 요청 주소:</div>
            <div className="51395 left-[653px] top-[1139px] absolute text-black text-lg font-normal font-['Inter']">{data.content.sampleDeliveryAddress}</div>
            <div className=" w-[134px] h-[17px] left-[935px] top-[1096px] absolute text-slate-500 text-lg font-bold font-['Inter']">결과 보고 희망일:</div>
            <div className="1201 w-[141px] h-[18px] left-[1074px] top-[1096px] absolute text-black text-lg font-normal font-['Inter']">{data.content.reportWishDate}</div>

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
                {data.content.additionalInfo}
            </textarea>
        </div>
    )

}
export default QuotationRequest;