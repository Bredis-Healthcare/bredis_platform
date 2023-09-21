import React, {useEffect, useState} from "react";
import TableCell from "./TableCell";
import Select from "react-select";
import TableHeaderCell from "./TableHeaderCell";
import axios from "../../../api/axios";

function QuotationRequest (props) {


    const [inputModeOn, setInputMode] = useState(false);
    const [readOnly, setReadOnly] = useState(false);
    const [selectedBiomarkers, setSelectedBiomarkers] = useState([]);
    const [selectedSampleType, setSelectedSampleType] = useState("");
    const [selectedRepetition, setSelectedRepetition] = useState("");
    const [selectedAddAnalysis, setSelectedAddAnalysis] = useState([]);
    const [inputAdditionalInfo, setInputAdditionalInfo] = useState("");

    let data = props.data

    useEffect(() => {
        setReadOnly(props.readOnly)
        if (props.readOnly) {
            document.querySelectorAll('input').forEach(input => input.setAttribute("readOnly", ''))
            document.querySelectorAll('button').forEach(button => {
                if (!button.classList.contains('alwaysOn')) {
                    button.style.display='none'
                }
            })
        }
    }, [])

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

    const handleAdditionalInfoChange = (e) => {
        setInputAdditionalInfo(e.target.value)
    }

    const toggleInputMode = () => {
        setInputMode(inputModeOn => !inputModeOn); // on,off 개념 boolean
    }

    async function saveRow() {
        if (readOnly) {
            return
        }

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

    async function deleteRow(e) {
        if(readOnly || !window.confirm("삭제하시겠습니까?")) {
            return;
        }
        data.content.sampleDataList.splice(e.target.attributes.rownumber.value, 1);
        await axios.post(`/quotation-requests/save`, { "id": data.id, "contents": data.content});

        toggleInputMode() //FIXME: 이것 호출 안해도 새로고침 되도록.
    }

    return (
        <div className="Rectangle30 w-[1100px] h-[1200px] left-[300px] top-[120px] relative bg-white shadow">
            {/*<div className="" />*/}

            <div className="relative left-[10px] h-[170px]">
                <div className=" w-[95px] h-[17px] left-[80px] top-[45px] absolute text-slate-500 text-lg font-bold font-['Inter']">의뢰 기관: </div>
                <input id="organizationInput" type="text" defaultValue={data.content.organization} className={`w-[200px] h-[30px] px-1.5 left-[159px] top-[45px] absolute text-lg font-normal font-['Inter'] bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
                <div className=" w-[95px] h-[17px] left-[80px] top-[88px] absolute text-slate-500 text-lg font-bold font-['Inter']">담당자:</div>
                <input id="managerNameInput" type="text" defaultValue={data.content.managerName} className={`w-[200px] h-[30px] px-1.5 left-[159px] top-[88px] absolute text-lg font-normal font-['Inter'] bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
                <div className=" w-[95px] h-[17px] left-[415px] top-[88px] absolute text-slate-500 text-lg font-bold font-['Inter']">전화번호:</div>
                <input id="mobileInput" type="text" defaultValue={data.content.mobile} className={`w-[200px] h-[30px] px-1.5 left-[500px] top-[88px] absolute text-lg font-normal font-['Inter'] bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
                <div className=" w-[95px] h-[17px] left-[750px] top-[45px] absolute text-slate-500 text-lg font-bold font-['Inter']">의뢰일: </div>
                <input id="requestDateInput" type="date" defaultValue={data.content.requestDate.replaceAll('.', '-')} className={`w-[200px] h-[30px] px-1.5 left-[810px] top-[45px] absolute text-lg font-normal font-['Inter'] bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
                <div className=" w-[95px] h-[17px] left-[750px] top-[88px] absolute text-slate-500 text-lg font-bold font-['Inter']">이메일:</div>
                <input id="emailInput" type="email" defaultValue={data.content.email} className={`w-[200px] h-[30px] px-1.5 left-[810px] top-[88px] absolute text-lg font-normal font-['Inter'] bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
            </div>

            <div className="relative top-[0px] h-[630px]">
                <div className=" w-[297px] h-[17px] left-[90px] top-[12px] relative text-slate-500 text-lg font-bold font-['Inter']">샘플 및 분석 대상 바이오마커 정보 입력</div>
                <div className=" w-[214px] h-6 left-[830px] top-[0px] relative">
                    <div className=" left-0 top-[0px] absolute text-sky-900 text-[15px] font-bold font-['Inter']">바이오마커 상세 목록 다운로드</div>
                    <div className="ImportLight w-6 h-6 left-[190px] top-0 absolute flex-col justify-start items-start inline-flex" />
                </div>
                {/*테이블 높이는 600으로 고정시키고 싶다.*/}
                <div id="table" className="left-[90px] top-[10px] w-auto float-left relative max-h-[580px] overflow-y-scroll">
                    <table style={{borderCollapse: 'collapse', borderColor: '#ccc', borderSpacing:0, minWidth:'900px'}}>
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
                            data.content.sampleDataList.map((row, index) => (
                                <tr key={index}>
                                    <TableCell value={`${index + 1}`} minWidth="20px" />
                                    <TableCell value={`${row.uniqueNumber}`} />
                                    <TableCell value={`${row.biomarkers ? row.biomarkers.join(' ') : ''}`} />
                                    <TableCell value={`${row.sampleType}`} minWidth="110px"/>
                                    <TableCell value={`${row.repetition}`} maxWidth="110px"/>
                                    <TableCell value={`${row.volume}`} />
                                    <TableCell value={`${row.additionalAnalysis ? row.additionalAnalysis.join(', ') : ''}`} />
                                    <TableCell>
                                        <button className=" w-[41px] h-[26px] relative mx-1" rownumber={`${index}`}
                                                onClick={(e) => deleteRow(e)}>
                                            <div className="Rectangle7 w-[41px] h-[26px] left-0 top-0 absolute bg-white rounded-[9px] border border-zinc-500" rownumber={`${index}`}/>
                                            <div className=" w-[27px] h-[13px] left-[7px] top-[5px] absolute text-zinc-500 text-sm font-bold font-['Inter']" rownumber={`${index}`}>삭제</div>
                                        </button>
                                        <button className="editButton w-[41px] h-[26px] relative mx-1">
                                            <div className="Rectangle7 w-[41px] h-[26px] left-0 top-0 absolute bg-white rounded-[9px] border border-zinc-500" />
                                            <div className=" w-[27px] h-[13px] left-[7px] top-[5px] absolute text-zinc-500 text-sm font-bold font-['Inter']">수정</div>
                                        </button>
                                    </TableCell>
                                </tr>
                            ))
                        }
                        {
                            readOnly ? <></> :
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

            </div>

            <div className="relative top-[10px]">
                <div className="Group38 w-[123px] flex flex-col left-[900px] relative my-5">
                    <button className=" w-[123px] h-[35px] left-0 top-0 relative">
                        <div className="Rectangle7 w-[123px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500" />
                        <div className=" w-[93.48px] h-[17px] left-[18.27px] top-[7px] absolute text-slate-500 text-lg font-bold font-['Inter']">파일 업로드</div>
                    </button>
                    <button className="mt-[10px] relative text-zinc-500 text-[15px] font-bold font-['Inter']">양식 다운로드</button>
                    <div className="ImportLight w-5 h-[21px] left-[102px] top-[42px] absolute" />
                </div>

                <div className=" w-[134px] h-[17px] left-[90px] top-[10px] relative inline-block text-slate-500 text-lg font-bold font-['Inter']">검체 수거 요청일:</div>
                <input id="sampleDeliveryWishDateInput" type="date" defaultValue={data.content.sampleDeliveryWishDate.replaceAll('.', '-')} className={`w-[200px] h-[30px] px-1.5 left-[105px] top-[10px] relative inline-block text-lg font-normal font-['Inter'] bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
                <div className=" w-[134px] h-[17px] left-[300px] top-[10px] relative inline-block text-slate-500 text-lg font-bold font-['Inter']">결과 보고 희망일:</div>
                <input id="reportWishDateInput" type="date" defaultValue={data.content.reportWishDate.replaceAll('.', '-')} className={`w-[200px] h-[30px] px-1.5 left-[315px] top-[10px] relative inline-block text-lg font-normal font-['Inter'] bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
                <div className=" w-[164px] h-[17px] left-[90px] top-[30px] relative text-slate-500 text-lg font-bold font-['Inter']">검체 수거 요청 주소:</div>
                <input id="sampleDeliveryAddressInput" type="text" defaultValue={data.content.sampleDeliveryAddress} className={`w-[730px] h-[30px] px-1.5 left-[253px] top-[10px] relative inline text-lg font-normal font-['Inter'] bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>

                <div className=" w-[95px] h-[17px] left-[90px] mt-10 relative text-slate-500 text-lg font-bold font-['Inter']">특이사항</div>
                <textarea value={inputAdditionalInfo ? inputAdditionalInfo : data.content.additionalInfo} onChange={(e)=>handleAdditionalInfoChange(e)}id="message" rows="4" className="resize-none left-[90px] mt-5 relative block p-2.5 w-[900px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="특이사항...">
                </textarea>
            </div>
        </div>
    )

}
export default QuotationRequest;