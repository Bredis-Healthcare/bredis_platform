import React, {useEffect, useState} from "react";
import TableCell from "./TableCell";
import Select from "react-select";
import TableHeaderCell from "./TableHeaderCell";
import axios from "../../../api/axios";
import readXlsxFile from 'read-excel-file'

function QuotationRequest (props) {


    const [inputModeOn, setInputMode] = useState(false);
    const [copyModeOn, setCopyMode] = useState(false);
    const [fileInputOn, setFileInputOn] = useState(false);
    const [readOnly, setReadOnly] = useState(false);
    const [volumeAlert, setVolumeAlert] = useState(false);
    const [volumeAlertLimit, setVolumeAlertLimit] = useState(0);
    const [selectedBiomarkers, setSelectedBiomarkers] = useState([]);
    const [selectedSampleType, setSelectedSampleType] = useState("");
    const [selectedRepetition, setSelectedRepetition] = useState("");
    const [selectedAddAnalysis, setSelectedAddAnalysis] = useState([]);
    const [inputAdditionalInfo, setInputAdditionalInfo] = useState("");

    let data = props.data

    useEffect(() => {
        setReadOnly(props.readOnly)
        if (props.readOnly) {
            let quotationRequest = document.querySelector("#quotation-request");
            quotationRequest.querySelectorAll('input').forEach(input => input.setAttribute("readOnly", ''))
            quotationRequest.querySelectorAll('button').forEach(button => {button.style.display='none'})
            quotationRequest.querySelector('#additionalInfo').setAttribute("readonly", '')
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

    const sampleTypeOptions = [
        {value: "EDTA Plasma", label: "EDTA Plasma"},
        {value: "Serum", label: "Serum"},
        {value: "CSF", label: "CSF"}
    ];

    const repetitionOptions = [
        { value: "Single", label: "Single" },
        { value: "Duplicate", label: "Duplicate" },
        { value: "Triplicate", label: "Triplicate" },
        { value: "Quadruplicate", label: "Quadruplicate" }
    ];

    const handleBiomarkersChange = (e) => {
        setSelectedBiomarkers(Array.isArray(e) ? e.map(x => x.value) : []);
    }
    const handleAddAnalysisChange = (e) => {
        setSelectedAddAnalysis(Array.isArray(e) ? e.map(x => x.value) : []);
    }

    const handleAdditionalInfoChange = (e) => {
        setInputAdditionalInfo(e.target.value)
        data.content.additionalInfo = e.target.value
    }

    const toggleInputMode = () => {
        setInputMode(inputModeOn => !inputModeOn); // on,off 개념 boolean
    }

    const toggleCopyMode = () => {
        setCopyMode(copyModeOn => !copyModeOn); // on,off 개념 boolean
    }

    async function saveRow() {
        if (readOnly) {return}

        let uniqueNumber = document.getElementById("uniqueNumberInput").value
        let volume = document.getElementById("volumeInput").value

        if (!uniqueNumber) {alert("고유번호를 입력해주세요."); return;}
        if (selectedBiomarkers.length < 1) {alert("바이오마커를 선택해주세요."); return;}
        if (!selectedSampleType) {alert("샘플 종류를 선택해주세요."); return;}
        if (!selectedRepetition) {alert("반복 횟수를 선택해주세요."); return;}
        if (!volume) {alert("용량을 입력해주세요."); return;}
        if (volumeAlert) {alert("용량을 수정해주세요."); return;}


        data.content.sampleDataList.push({
            "number": `${data.content.sampleDataList.length + 1}`,
            "uniqueNumber": uniqueNumber,
            "biomarkers": selectedBiomarkers,
            "sampleType": selectedSampleType,
            "repetition": selectedRepetition,
            "volume": volume + 'μl',
            "additionalAnalysis": selectedAddAnalysis
        })

        await saveContent()
        toggleInputMode()
    }

    async function saveContent() {
        await axios.post(`/quotation-requests/save`, { "id": data.id, "contents": data.content});
    }

    async function deleteRow(e) {
        if(readOnly || !window.confirm("삭제하시겠습니까?")) {
            return;
        }
        data.content.sampleDataList.splice(e.target.attributes.rownumber.value, 1);
        await axios.post(`/quotation-requests/save`, { "id": data.id, "contents": data.content});

        toggleInputMode() //FIXME: 이것 호출 안해도 새로고침 되도록.
    }

    function copySampleData() {
        let targetSampleNumber = parseInt(document.querySelector('#copySampleNumberInput').value)
        let count = parseInt(document.querySelector('#copyCountInput').value)
        let toCopyData = data.content.sampleDataList[targetSampleNumber - 1]
        if (!toCopyData) {
            alert("유효한 샘플 번호를 입력해주세요.")
            return
        }
        for (let i = 0; i < count; i++) {
            data.content.sampleDataList.splice(targetSampleNumber - 1, 0,
                {
                    "number": `${data.content.sampleDataList.length + 1}`,
                    "uniqueNumber": toCopyData.uniqueNumber,
                    "biomarkers": toCopyData.biomarkers,
                    "sampleType": toCopyData.sampleType,
                    "repetition": toCopyData.repetition,
                    "volume": toCopyData.volume,
                    "additionalAnalysis": toCopyData.additionalAnalysis
                }
            )
        }
        toggleInputMode()
        toggleCopyMode()
        saveContent()
    }

    function toggleFileInput() {
        setFileInputOn(fileInputOn => !fileInputOn)
    }

    function validateBiomarkers(biomarkers) {
        if (biomarkers.length < 1) {
            alert("바이오마커는 필수값입니다.");
            return false;
        }
        let biomarkerNames = biomarkerOptions.map(o => o.label);
        for (const marker of biomarkers) {
            if (!biomarkerNames.includes(marker)) {
                alert(`${marker}는 유효하지 않은 값입니다. 분석 가능한 바이오마커 목록을 확인해주시고, 여러 개의 바이오마커를 동시에 분석하고자 하시는 경우 콤마(,)로 구분해주세요.`)
                return false;
            }
        }
        return true;
    }

    function validateSampleType(sampleType) {
        if (!sampleType) {
            alert("샘플 종류는 필수값입니다.");
            return;
        }
        let sampleTypeNames = sampleTypeOptions.map(o => o.label);
        if (!sampleTypeNames.includes(sampleType)) {
            alert(`${sampleType}은 유효하지 않은 값입니다. 분석 가능한 샘플 종류를 확인해주세요.`)
            return false;
        }
        return true;
    }

    function validateRepetition(repetition) {
        if (!repetition) {
            alert("반복 횟수는 필수값입니다.");
            return;
        }
        let repetitionNames = repetitionOptions.map(o => o.label);
        if (!repetitionNames.includes(repetition)) {
            alert(`${repetition}은 유효하지 않은 값입니다. 요청 가능한 반복 횟수를 확인해주세요.`)
            return false;
        }
        return true;
    }

    function validateVolume(biomarkers, sampleType, repetition, volume) {
        if (!volume) {
            alert("용량은 필수값입니다.");
            return;
        }
        let volumeLimit = calculateVolumeLimit(biomarkers, sampleType, repetition);
        if (volume < volumeLimit) {
            alert(`바이오마커 ${biomarkers.join(",")}, 샘플 종류 ${sampleType}, 반복 횟수 ${repetition}에 대해서는 용량이 최소 ${volumeLimit}μl가 필요합니다.`)
            return false;
        }
        return true;
    }

    function validateAdditionalAnalysis(additionalAnalysisList) {
        let additionalAnalysisNames = additionalAnalysisOptions.map(o => o.label);
        for (const a of additionalAnalysisList) {
            if (!additionalAnalysisNames.includes(a)) {
                alert(`${a}은 유효하지 않은 값입니다. 요청 가능한 추가 분석 옵션 목록을 확인해주시고, 여러 개의 추가 분석 옵션을 동시에 선택하고자 하시는 경우 콤마(,)로 구분해주세요.`)
                return false;
            }
        }
        return true;
    }

    function saveFileInput() {
        let file = document.querySelector("#sampleDataByFileInput").files[0]
        if (!file) {
            alert("파일을 선택해주세요.");
            return;
        }
        readXlsxFile(file).then((rows) => {

            let dataToAdd = [];
            for (const item of rows.slice(1)) {
                let uniqueNumber = item[0];
                let biomarkers = item[1] ? item[1].split(',').map(s => s.replaceAll(" ", "")) : [];
                let sampleType = item[2];
                let repetition = item[3];
                let volume = item[4];
                let additionalDataAnalysis = item[5] ? item[5].split(',').map(s => s.replaceAll(" ", "")) : ["없음"];

                if (!validateBiomarkers(biomarkers)) {return;}
                if (!validateSampleType(sampleType)) {return;}
                if (!validateRepetition(repetition)) {return;}
                if (!validateVolume(biomarkers, sampleType, repetition, volume)) {return;}
                if (!validateAdditionalAnalysis(additionalDataAnalysis)) {return;}

                dataToAdd.push({
                    "number": `${data.content.sampleDataList.length + 1}`,
                    "uniqueNumber": uniqueNumber,
                    "biomarkers": biomarkers.map(s => s.replaceAll(' ', '')),
                    "sampleType": sampleType,
                    "repetition": repetition,
                    "volume": `${volume}μl`,
                    "additionalAnalysis": additionalDataAnalysis.map(s => s.replaceAll(' ', '')),
                })
            }
            Array.prototype.push.apply(data.content.sampleDataList, dataToAdd);

            toggleFileInput()
            saveContent()
            console.log(`saved ${rows.length -1} rows`)
        });
    }

    function calculateVolumeLimit(biomarkers, sampleType, repetition) {
        let needVolume = 0;
        if (biomarkers.includes("BDNF")) {
            needVolume += 30;
        }

        if (biomarkers.includes("GFAP")) {
            needVolume += 30;
        }
        if (repetition === 'Duplicate') {
            needVolume *= 1.5;
        }
        // selectedRepetition
        // selectedSampleType
        //  에 따라 다르게 동작하도록.
        // 기본값 return 0;
        return needVolume;
    }

    return (
        <div>
        {data ? (
                <>
                <div id="quotation-request" className="Rectangle30 w-[1100px] h-[1200px] left-[300px] top-[120px] mb-[150px] relative bg-white shadow">
                    {/*<div className="" />*/}

                    <div className="relative left-[10px] h-[170px]">
                        <div className=" w-[95px] h-[17px] left-[80px] top-[45px] absolute text-slate-500 text-lg font-bold font-['Inter']">의뢰 기관: </div>
                        <input id="organizationInput" type="text" defaultValue={data.content.organization}
                                onChange={(e)=>{data.content.organization = e.target.value; saveContent()}}
                               className={`w-[200px] h-[30px] px-1.5 left-[159px] top-[45px] absolute text-lg font-normal font-['Inter'] bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
                        <div className=" w-[95px] h-[17px] left-[80px] top-[88px] absolute text-slate-500 text-lg font-bold font-['Inter']">담당자:</div>
                        <input id="managerNameInput" type="text" defaultValue={data.content.managerName}
                               onChange={(e)=>{data.content.managerName = e.target.value; saveContent()}}
                               className={`w-[200px] h-[30px] px-1.5 left-[159px] top-[88px] absolute text-lg font-normal font-['Inter'] bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
                        <div className=" w-[95px] h-[17px] left-[415px] top-[88px] absolute text-slate-500 text-lg font-bold font-['Inter']">전화번호:</div>
                        <input id="mobileInput" type="text" defaultValue={data.content.mobile}
                               onChange={(e)=>{data.content.mobile = e.target.value; saveContent()}}
                               className={`w-[200px] h-[30px] px-1.5 left-[500px] top-[88px] absolute text-lg font-normal font-['Inter'] bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
                        <div className=" w-[95px] h-[17px] left-[750px] top-[45px] absolute text-slate-500 text-lg font-bold font-['Inter']">의뢰일: </div>
                        <input id="requestDateInput" type="date" defaultValue={data.content.requestDate ? data.content.requestDate.replaceAll('.', '-') : ''}
                               onChange={(e)=>{data.content.requestDate = e.target.value.replaceAll('-', '.'); saveContent()}}
                               className={`w-[200px] h-[30px] px-1.5 left-[810px] top-[45px] absolute text-lg font-normal font-['Inter'] bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
                        <div className=" w-[95px] h-[17px] left-[750px] top-[88px] absolute text-slate-500 text-lg font-bold font-['Inter']">이메일:</div>
                        <input id="emailInput" type="email" defaultValue={data.content.email}
                               onChange={(e)=>{data.content.email = e.target.value; saveContent()}}
                               className={`w-[200px] h-[30px] px-1.5 left-[810px] top-[88px] absolute text-lg font-normal font-['Inter'] bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
                    </div>

                    <div className="relative top-[0px] h-[630px]">
                        <div className=" w-[297px] h-[17px] left-[90px] top-[12px] relative text-slate-500 text-lg font-bold font-['Inter']">샘플 및 분석 대상 바이오마커 정보 입력</div>
                        <a download href="https://bredis-public.s3.ap-northeast-2.amazonaws.com/test-service/RFQ_%E1%84%87%E1%85%B3%E1%84%85%E1%85%A6%E1%84%83%E1%85%B5%E1%84%89%E1%85%B3%E1%84%92%E1%85%A6%E1%86%AF%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A6%E1%84%8B%E1%85%A5.pdf"
                           className=" w-[214px] h-6 left-[830px] top-[0px] relative">
                            <div className=" left-0 top-[0px] text-sky-900 text-[15px] font-bold font-['Inter'] inline-block">바이오마커 상세 목록 다운로드</div>
                            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/09d437dc-f4b1-488e-8408-a412fc62c665?&width=400" className="inline-block aspect-[1] object-cover object-center w-[22px] mb-[3px] self-center shrink-0"/>
                        </a>
                        {/*테이블 높이는 600으로 고정시키고 싶다.*/}
                        <div id="table" className="left-[90px] top-[10px] w-auto float-left relative min-h-[500px] max-h-[580px] overflow-y-scroll">
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
                                            <TableCell value={`${row.biomarkers ? row.biomarkers.join(', ') : ''}`} />
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
                                        <TableCell value={`${data.content.sampleDataList.length + 1}`} minWidth="20px" />
                                        <TableCell minWidth="90px" maxWidth="90px">
                                            <input id="uniqueNumberInput" type="text" placeholder="고유번호" className={`${inputModeOn ? 'block' : 'hidden'} w-[70px] h-[25px] text-center text-sm text-gray-900 bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
                                        </TableCell>
                                        <TableCell minWidth="190px" maxWidth="190px">
                                            <Select isMulti name="biomarkersSelect" className={`${inputModeOn ? 'block' : 'hidden'} w-full`} classNamePrefix="select" placeholder="바이오마커"
                                                    value={biomarkerOptions.filter(obj => selectedBiomarkers.includes(obj.value))} onChange={handleBiomarkersChange} options={biomarkerOptions}/>
                                        </TableCell>
                                        <TableCell minWidth="120px" maxWidth="120px">
                                            <Select name="sampleTypeSelect" className={`${inputModeOn ? 'block' : 'hidden'} w-full text-center`} classNamePrefix="select" placeholder="샘플 종류"
                                                    onChange={(choice) => setSelectedSampleType(choice.value)}
                                                    options={sampleTypeOptions}/>
                                        </TableCell>
                                        <TableCell minWidth="130px" maxWidth="130px">
                                            <Select name="repetitionSelect" className={`${inputModeOn ? 'block' : 'hidden'} w-full text-center`} classNamePrefix="select" placeholder="반복 횟수"
                                                    onChange={(choice) => {setSelectedRepetition(choice.value); setVolumeAlert(true)}}
                                                    options={repetitionOptions}/>
                                        </TableCell>
                                        <TableCell minWidth="100px" maxWidth="100px">
                                            <div className={`${inputModeOn ? 'block' : 'hidden'}`}>
                                                <input id="volumeInput" type="number" placeholder="용량"
                                                       className={`w-[70px] h-[25px] mr-1 text-center text-sm text-gray-900 bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                                       onChange={(e) => {setVolumeAlertLimit(calculateVolumeLimit(selectedBiomarkers, selectedSampleType, selectedRepetition)); setVolumeAlert(e.target.value < volumeAlertLimit)}}
                                                />
                                                μl
                                                <p className={`${volumeAlert ? 'block' : 'hidden'} text-red-500 text-xs italic`}>{volumeAlertLimit}μl 이상부터<br />가능합니다.</p>
                                            </div>

                                        </TableCell>
                                        <TableCell minWidth="200px" maxWidth="200px">
                                            <Select isMulti name="additionalAnalysisSelect" className={`${inputModeOn ? 'block' : 'hidden'} w-full`} classNamePrefix="select" placeholder="추가 분석"
                                                    value={additionalAnalysisOptions.filter(obj => selectedAddAnalysis.includes(obj.value))} onChange={handleAddAnalysisChange} options={additionalAnalysisOptions}/>
                                        </TableCell>
                                        <TableCell>
                                            <div className="relative">
                                                <button className={`${inputModeOn ? 'hidden' : 'inline-block'}  w-[41px] h-[26px] relative mx-1`} onClick={() => toggleCopyMode()}>
                                                    <div className="Rectangle7 w-[41px] h-[26px] left-0 top-0 absolute bg-slate-500 rounded-[9px]" />
                                                    <div className=" w-[27px] h-[13px] left-[7px] top-[5px] absolute text-white text-sm font-bold font-['Inter']">복제</div>
                                                </button>
                                                <div className={`${(copyModeOn && !inputModeOn) ? 'block' : 'hidden'} absolute w-[240px] h-[150px] right-[5px] top-[22px] z-10`}>
                                                    <img className="object-contain object-center h-[100%]" src="https://cdn.builder.io/api/v1/image/assets/TEMP/bca921d1-aa51-484b-b5ef-f90ff93de920?&width=800" alt=""/>
                                                    <div className="Group28 w-[240px] h-[151px] left-[0px] top-[0px] absolute">
                                                        <div className=" left-[18px] top-[30px] absolute text-black text-[16px] font-normal font-['Inter']">샘플 정보를 복제합니다.</div>
                                                        <div className=" left-[18px] top-[55px] absolute text-black text-[16px] font-normal font-['Inter']">복제 대상 샘플 번호: </div>
                                                        <input id="copySampleNumberInput" type="text" maxLength={4}
                                                               className={`w-[55px] h-[22px] px-1.5 left-[150px] top-[55px] absolute text-[16px] font-normal font-['Inter'] bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
                                                        <div className=" left-[18px] top-[80px] absolute text-black text-[16px] font-no기rmal font-['Inter']">복제 횟수: </div>
                                                        <input id="copyCountInput" type="text" maxLength={4}
                                                               className={`w-[55px] h-[24px] px-1.5 left-[90px] top-[80px] absolute text-[16px] font-normal font-['Inter'] bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
                                                        <button className="Group11 w-[82px] h-[28px] left-[80px] top-[110px] absolute"
                                                                onClick={(e) => copySampleData(e)}>
                                                            <div className="Rectangle7 w-[82px] h-[28px] left-0 top-0 absolute bg-slate-500 rounded-[9px]" />
                                                            <div className=" w-[74px] h-[10.69px] left-[4px] top-[4px] absolute text-white text-[16px] font-bold font-['Inter']">복제하기</div>
                                                        </button>
                                                    </div>
                                                </div>
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
                                            </div>

                                        </TableCell>
                                    </tr>
                                }
                                </tbody>
                            </table>
                        </div>

                    </div>

                    <div className="relative top-[10px]">
                    <div className="Group38 w-[40%] flex flex-col my-5 ml-auto">
                            <div className="flex flex-row justify-end mr-10">
                                <button className={`${fileInputOn ? 'hidden' : 'block'} w-[123px] h-[35px] left-0 top-0 relative mx-[10px]`} onClick={() => toggleFileInput()}>
                                    <div className="Rectangle7 w-[123px] h-[35px] bg-neutral-100 rounded-[9px] border-2 border-slate-500 flex justify-center items-center text-slate-500 text-lg font-bold">파일로 입력</div>
                                </button>
                                <button className={`${fileInputOn ? 'block' : 'hidden'} w-[123px] h-[35px] left-0 top-0 relative mx-[10px]`} onClick={() => saveFileInput()}>
                                    <div className="Rectangle7 w-[123px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500 flex justify-center items-center text-slate-500 text-lg font-bold ">저장하기</div>
                                </button>
                                <button className={`${fileInputOn ? 'block' : 'hidden'} w-[123px] h-[35px] left-0 top-0 relative mx-[10px]`} onClick={() => toggleFileInput()}>
                                    <div className="Rectangle7 w-[123px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500 flex justify-center items-center text-slate-500 text-lg font-bold ">취소</div>
                                </button>
                                <a download href="https://bredis-public.s3.ap-northeast-2.amazonaws.com/test-service/%EA%B2%80%EC%B2%B4+%EC%A0%95%EB%B3%B4+%EC%9E%85%EB%A0%A5+%E1%84%8B%E1%85%A3%E1%86%BC%E1%84%89%E1%85%B5%E1%86%A8_%EB%B8%8C%EB%A0%88%EB%94%94%EC%8A%A4%ED%97%AC%EC%8A%A4%EC%BC%80%EC%96%B4.xlsx"
                                   className="mt-[10px]">
                                    <div className="relative text-zinc-500 text-[15px] font-bold font-['Inter'] inline-block">양식 다운로드</div>
                                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/09d437dc-f4b1-488e-8408-a412fc62c665?&width=400" className="inline-block aspect-[1] object-cover object-center w-[22px] mb-[3px] self-center shrink-0" alt="다운버튼"/>
                                </a>

                            </div>
                            <input id="sampleDataByFileInput" className={`${fileInputOn ? 'block' : 'hidden'} my-[10px] mx-[30px]`} type="file" />
                            <div className="ImportLight w-5 h-[21px] left-[102px] top-[42px] absolute" />
                        </div>

                        <div className=" w-[134px] h-[17px] left-[90px] top-[10px] relative inline-block text-slate-500 text-lg font-bold font-['Inter']">검체 수거 요청일:</div>
                        <input id="sampleDeliveryWishD
                        
                        
                          ateInput" type="date" defaultValue={data.content.sampleDeliveryWishDate ? data.content.sampleDeliveryWishDate.replaceAll('.', '-') : ''}
                               onChange={(e)=>{data.content.sampleDeliveryWishDate = e.target.value.replaceAll('.', '-'); saveContent()}}
                               className={`w-[200px] h-[30px] px-1.5 left-[105px] top-[10px] relative inline-block text-lg font-normal font-['Inter'] bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
                        <div className=" w-[134px] h-[17px] left-[300px] top-[10px] relative inline-block text-slate-500 text-lg font-bold font-['Inter']">결과 보고 희망일:</div>
                        <input id="reportWishDateInput" type="date" defaultValue={data.content.reportWishDate ? data.content.reportWishDate.replaceAll('.', '-') : ''}
                               onChange={(e)=>{data.content.reportWishDate = e.target.value.replaceAll('.', '-'); saveContent()}}
                               className={`w-[200px] h-[30px] px-1.5 left-[315px] top-[10px] relative inline-block text-lg font-normal font-['Inter'] bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
                        <div className=" w-[164px] h-[17px] left-[90px] top-[30px] relative text-slate-500 text-lg font-bold font-['Inter']">검체 수거 요청 주소:</div>
                        <input id="sampleDeliveryAddressInput" type="text" defaultValue={data.content.sampleDeliveryAddress}
                               onChange={(e)=>{data.content.sampleDeliveryAddress = e.target.value; saveContent()}}
                               className={`w-[730px] h-[30px] px-1.5 left-[253px] top-[10px] relative inline text-lg font-normal font-['Inter'] bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>

                        <div className=" w-[95px] h-[17px] left-[90px] mt-10 relative text-slate-500 text-lg font-bold font-['Inter']">특이사항</div>
                        <textarea value={inputAdditionalInfo ? inputAdditionalInfo : (data.content.additionalInfo ? data.content.additionalInfo : '')} onChange={(e)=> {handleAdditionalInfoChange(e); saveContent()}}
                                  id="additionalInfo" rows="4"
                                  className="resize-none left-[90px] mt-5 relative block p-2.5 w-[900px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="특이사항...">
                        </textarea>
                    </div>
                </div>
                </>
        ) : (
            <p>Loading...</p>
        )}
        </div>
    )

}
export default QuotationRequest;