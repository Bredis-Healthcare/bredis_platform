import React, {useState} from "react";
import TableCell from "./TableCell";
import Select from "react-select";
import TableHeaderCell from "./TableHeaderCell";
import axios from "../../../api/axios";

function QuotationRequest (props) {
    let data = props.data

    const [inputModeOn, setInputMode] = useState(false);
    const [selectedBiomarkers, setSelectedBiomarkers] = useState([]);
    const [selectedSampleType, setSelectedSampleType] = useState("");
    const [selectedRepetition, setSelectedRepetition] = useState("");
    const [selectedAddAnalysis, setSelectedAddAnalysis] = useState([]);

    const biomarkerOptions = [
        { value: "GFAP", label: "GFAP" },
        { value: "BDNF", label: "BDNF" },
        { value: "NfL", label: "NfL" },
        { value: "AB40", label: "AB40" },
        { value: "AB42", label: "AB42" },
        { value: "p-Tau231", label: "p-Tau231" },
        { value: "p-Tau181", label: "p-Tau181" },
    ];

    const additionalAnalysisOptions = [
        { value: "없음", label: "없음" },
        { value: "Amyloid PET Positivity Prediction", label: "Amyloid PET Positivity Prediction" },
        { value: "Cognitive Stage Transition Prediction", label: "Cognitive Stage Transition Prediction" }
    ]

    const handleBiomarkersChange = (e) => {
        setSelectedBiomarkers(Array.isArray(e) ? e.map(x => x.value) : []);
    }
    const handleAddAnalysisChange = (e) => {
        setSelectedAddAnalysis(Array.isArray(e) ? e.map(x => x.value) : []);
    }

    const toggleInputMode = () => {
        setInputMode(inputModeOn => !inputModeOn); // on,off 개념 boolean
    }

    async function saveRow() {
        // let organization = document.getElementById("organizationInput").value
        // if (!organization) {
        //     alert("의뢰 기관을 입력해주세요.")
        //     return
        // }

        let uniqueNumber = document.getElementById("uniqueNumberInput").value
        if (!uniqueNumber) {
            alert("고유번호를 입력해주세요.")
            return
        }
        if (selectedBiomarkers.length < 1) {
            alert("바이오마커를 선택해주세요.")
            return
        }
        if (!selectedSampleType) {
            alert("샘플 종류를 선택해주세요.")
            return
        }
        if (!selectedRepetition) {
            alert("반복 횟수를 선택해주세요.")
            return
        }
        let volume = document.getElementById("volumeInput").value
        if (!volume) {
            alert("용량을 입력해주세요.")
            return
        }


        data.content.sampleDataList.push({
            "number": `${data.content.sampleDataList.length + 1}`,
            "uniqueNumber": uniqueNumber,
            "biomarkers": selectedBiomarkers,
            "sampleType": selectedSampleType,
            "repetition": selectedRepetition,
            "volume": volume + 'μl',
            "additionalAnalysis": selectedAddAnalysis
        })

        console.log(data.content)
        await axios.post(`/quotation-requests/save`, { "id": data.id, "contents": data.content});

        toggleInputMode()

    }
    return (
        <div className="top-[-150px] relative">
            <div className="Rectangle30 w-[1100px] h-[1020px] left-[300px] top-[363px] absolute bg-white shadow" />

            <div className=" w-[95px] h-[17px] left-[380px] top-[401px] absolute text-slate-500 text-lg font-bold font-['Inter']">의뢰 기관: </div>
            <input id="organizationInput" type="text" defaultValue={data.content.organization} className={`w-[200px] h-[30px] px-1.5 left-[459px] top-[401px] absolute text-lg font-normal font-['Inter'] bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
            <div className=" w-[95px] h-[17px] left-[380px] top-[443px] absolute text-slate-500 text-lg font-bold font-['Inter']">담당자:</div>
            <input id="managerNameInput" type="text" defaultValue={data.content.managerName} className={`w-[200px] h-[30px] px-1.5 left-[459px] top-[443px] absolute text-lg font-normal font-['Inter'] bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
            <div className=" w-[95px] h-[17px] left-[715px] top-[444px] absolute text-slate-500 text-lg font-bold font-['Inter']">전화번호:</div>
            <input id="mobileInput" type="text" defaultValue={data.content.mobile} className={`w-[200px] h-[30px] px-1.5 left-[800px] top-[443px] absolute text-lg font-normal font-['Inter'] bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
            <div className=" w-[95px] h-[17px] left-[1050px] top-[402px] absolute text-slate-500 text-lg font-bold font-['Inter']">의뢰일: </div>
            <input id="requestDateInput" type="date" defaultValue={data.content.requestDate.replaceAll('.', '-')} className={`w-[200px] h-[30px] px-1.5 left-[1110px] top-[402px] absolute text-lg font-normal font-['Inter'] bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
            <div className=" w-[95px] h-[17px] left-[1050px] top-[442px] absolute text-slate-500 text-lg font-bold font-['Inter']">이메일:</div>
            <input id="emailInput" type="email" defaultValue={data.content.email} className={`w-[200px] h-[30px] px-1.5 left-[1110px] top-[443px] absolute text-lg font-normal font-['Inter'] bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>

            <div className=" w-[297px] h-[17px] left-[382px] top-[509px] absolute text-slate-500 text-lg font-bold font-['Inter']">샘플 및 분석 대상 바이오마커 정보 입력</div>
            <div className=" w-[214px] h-6 left-[1130px] top-[510px] absolute">
                <div className=" left-0 top-[5px] absolute text-sky-900 text-[15px] font-bold font-['Inter']">바이오마커 상세 목록 다운로드</div>
                <div className="ImportLight w-6 h-6 left-[190px] top-0 absolute flex-col justify-start items-start inline-flex" />
            </div>

            <div id="table" className="left-[390px] top-[553px] absolute" style={{overflow: 'visible'}}>
                <table style={{borderCollapse: 'collapse', borderColor: '#ccc', borderSpacing:0}}>
                    <thead>
                    <tr>
                        <TableHeaderCell value="번호" minWidth="20px"/>
                        <TableHeaderCell value="고유번호" />
                        <TableHeaderCell value="바이오마커" />
                        <TableHeaderCell value="샘플 종류" />
                        <TableHeaderCell value="반복 횟수" maxWidth="130px"/>
                        <TableHeaderCell value="용량" />
                        <TableHeaderCell value="추가 분석" />
                        <TableHeaderCell value="동작" />
                    </tr>
                    </thead>
                    <tbody>
                    {
                            data.content.sampleDataList.map((row) => (
                                <tr>
                                    <TableCell value={`${row.number}`} minWidth="20px" />
                                    <TableCell value={`${row.uniqueNumber}`} />
                                    <TableCell value={`${row.biomarkers ? row.biomarkers.join(' ') : ''}`} />
                                    <TableCell value={`${row.sampleType}`} minWidth="110px"/>
                                    <TableCell value={`${row.repetition}`} maxWidth="110px"/>
                                    <TableCell value={`${row.volume}`} />
                                    <TableCell value={`${row.additionalAnalysis ? row.additionalAnalysis.join(' ') : ''}`} />
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
                            <TableCell value={`${data.content.sampleDataList.length + 1}`}minWidth="20px" />
                            <TableCell>
                                <input id="uniqueNumberInput" type="text" placeholder="고유번호" className={`${inputModeOn ? 'block' : 'hidden'} w-[70px] h-[25px] text-center text-sm text-gray-900 bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
                            </TableCell>
                            <TableCell minWidth="200px">
                                <Select isMulti name="biomarkersSelect" className={`${inputModeOn ? 'block' : 'hidden'} w-full`} classNamePrefix="select"
                                        value={biomarkerOptions.filter(obj => selectedBiomarkers.includes(obj.value))} onChange={handleBiomarkersChange} options={biomarkerOptions}/>
                            </TableCell>
                            <TableCell minWidth="110px">
                                <Select name="sampleTypeSelect" className={`${inputModeOn ? 'block' : 'hidden'} w-full text-center`} classNamePrefix="select"
                                        onChange={(choice) => setSelectedSampleType(choice.value)}
                                        options={[
                                            { value: "EDTA Plasma", label: "EDTA Plasma" },
                                            { value: "Serum", label: "Serum" },
                                            { value: "CSF", label: "CSF" }
                                        ]}/>
                            </TableCell>
                            <TableCell minWidth="110px">
                                <Select name="repetitionSelect" className={`${inputModeOn ? 'block' : 'hidden'} w-full text-center`} classNamePrefix="select"
                                        onChange={(choice) => setSelectedRepetition(choice.value)}
                                        options={[
                                            { value: "Single", label: "Single" },
                                            { value: "Duplicate", label: "Duplicate" },
                                            { value: "Triplicate", label: "Triplicate" },
                                            { value: "Quadruplicate", label: "Quadruplicate" }
                                        ]}/>
                            </TableCell>
                            <TableCell minWidth="100px">
                                <div className={`${inputModeOn ? 'block' : 'hidden'}`}>
                                    <input id="volumeInput" type="number" placeholder="용량" className={`w-[70px] h-[25px] mr-1 text-center text-sm text-gray-900 bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
                                    μl
                                </div>

                            </TableCell>
                            <TableCell minWidth="200px">
                                <Select isMulti name="additionalAnalysisSelect" className={`${inputModeOn ? 'block' : 'hidden'} w-full`} classNamePrefix="select"
                                        value={additionalAnalysisOptions.filter(obj => selectedAddAnalysis.includes(obj.value))} onChange={handleAddAnalysisChange} options={additionalAnalysisOptions}/>
                            </TableCell>
                            <TableCell>
                                    <button className={`${inputModeOn ? 'hidden' : 'inline-block'}  w-[41px] h-[26px] relative mx-1`} onClick={() => toggleInputMode()}>
                                        <div className="Rectangle7 w-[41px] h-[26px] left-0 top-0 absolute bg-slate-500 rounded-[9px]" />
                                        <div className=" w-[27px] h-[13px] left-[7px] top-[5px] absolute text-white text-sm font-bold font-['Inter']">복제</div>
                                    </button>
                                    <button className={`${inputModeOn ? 'hidden' : 'inline-block'} w-[41px] h-[26px] relative mx-1`} onClick={()=>toggleInputMode()}>
                                        <div className="Rectangle7 w-[41px] h-[26px] left-0 top-0 absolute bg-slate-500 rounded-[9px]" />
                                        <div className=" w-[27px] h-[13px] left-[7px] top-[5px] absolute text-white text-sm font-bold font-['Inter']">신규</div>
                                    </button>
                                <button className={`${inputModeOn ? 'inline-block' : 'hidden'}  w-[41px] h-[26px] relative mx-1`} onClick={() => toggleInputMode()}>
                                    <div className="Rectangle7 w-[41px] h-[26px] left-0 top-0 absolute bg-white rounded-[9px] border border-zinc-500" />
                                    <div className=" w-[27px] h-[13px] left-[7px] top-[5px] absolute text-zinc-500 text-sm font-bold font-['Inter']">취소</div>
                                </button>
                                <button className={`${inputModeOn ? 'inline-block' : 'hidden'} w-[41px] h-[26px] relative mx-1`} onClick={()=>saveRow()}>
                                    <div className="Rectangle7 w-[41px] h-[26px] left-0 top-0 absolute bg-slate-500 rounded-[9px]" />
                                    <div className=" w-[27px] h-[13px] left-[7px] top-[5px] absolute text-white text-sm font-bold font-['Inter']">저장</div>
                                </button>
                            </TableCell>
                        </tr>
                    }
                    </tbody>
                </table>
            </div>

            <div className=" w-[134px] h-[17px] left-[390px] top-[1096px] absolute text-slate-500 text-lg font-bold font-['Inter']">검체 수거 요청일:</div>
            <input id="sampleDeliveryWishDateInput" type="date" defaultValue={data.content.sampleDeliveryWishDate.replaceAll('.', '-')} className={`w-[200px] h-[30px] px-1.5 left-[534px] top-[1096px] absolute text-lg font-normal font-['Inter'] bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
            <div className=" w-[164px] h-[17px] left-[389px] top-[1139px] absolute text-slate-500 text-lg font-bold font-['Inter']">검체 수거 요청 주소:</div>
            <input id="sampleDeliveryAddressInput" type="text" defaultValue={data.content.sampleDeliveryAddress} className={`w-[700px] h-[30px] px-1.5 left-[553px] top-[1139px] absolute text-lg font-normal font-['Inter'] bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
            <div className=" w-[134px] h-[17px] left-[800px] top-[1096px] absolute text-slate-500 text-lg font-bold font-['Inter']">결과 보고 희망일:</div>
            <input id="reportWishDateInput" type="date" defaultValue={data.content.reportWishDate.replaceAll('.', '-')} className={`w-[200px] h-[30px] px-1.5 left-[935px] top-[1096px] absolute text-lg font-normal font-['Inter'] bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>

            <div className="Group38 w-[123px] h-[63px] left-[1149px] top-[1030px] absolute">
                <div className=" left-[16px] top-[44px] absolute text-zinc-500 text-[15px] font-bold font-['Inter']">양식 다운로드</div>
                <div className=" w-[123px] h-[35px] left-0 top-0 absolute">
                    <div className="Rectangle7 w-[123px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500" />
                    <div className=" w-[93.48px] h-[17px] left-[18.27px] top-[7px] absolute text-slate-500 text-lg font-bold font-['Inter']">파일 업로드</div>
                </div>
                <div className="ImportLight w-5 h-[21px] left-[102px] top-[42px] absolute" />
            </div>

            <div className=" w-[95px] h-[17px] left-[390px] top-[1180px] absolute text-slate-500 text-lg font-bold font-['Inter']">특이사항</div>
            <textarea id="message" rows="4" className="resize-none left-[390px] top-[1220px] absolute block p-2.5 w-[900px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="특이사항...">
                {data.content.additionalInfo}
            </textarea>
        </div>
    )

}
export default QuotationRequest;