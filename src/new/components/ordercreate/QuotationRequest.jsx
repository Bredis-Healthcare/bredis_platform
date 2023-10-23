import React, {useEffect, useState} from "react";
import TableCell from "./TableCell";
import Select from "react-select";
import TableHeaderCell from "./TableHeaderCell";
import axios from "../../../api/axios";
import readXlsxFile from 'read-excel-file'
import icon_download from "../../../img/icon_download.png"
import info_box from "../../../img/info_box.png"

function QuotationRequest ({ setIsQuotationRequestOk, setQuotationRequestList, ...props }) {


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
    const [data, setData] = useState(props.data); //props.data에서 content, id만 쓰고 있어서 setData에서도 id, content만 넣어주고 있음, 다른 정보도 사용하는 경우 그 부분 꼭 확인 필요.
    const [isCheckedTemperature, setIsCheckedTemperature] = useState(props.data.content.isCheckedTemperature ?? false);
    const [isCheckedScheduleFlexible, setIsCheckedScheduleFlexible] = useState(props.data.content.isCheckedScheduleFlexible ?? false);
    const [isCheckedSampleRetrieval, setIsCheckedSampleRetrieval] = useState(props.data.content.isCheckedSampleRetrieval ?? false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectRowInfoOn, setSelectRowInfoOn] = useState(false);
    let dragInProgress = '';

    useEffect(() => {
        setReadOnly(props.readOnly);
        setNotice();
        if (props.readOnly) {
            let quotationRequest = document.querySelector("#quotation-request");
            //모든 종류의 input들을 비활성화시킨다
            quotationRequest.querySelectorAll('input').forEach(input => input.setAttribute("readOnly", ''))
            quotationRequest.querySelectorAll('button').forEach(button => {button.style.display='none'})
            quotationRequest.querySelector('#additionalInfo').setAttribute("readonly", '')
            quotationRequest.querySelectorAll('.checkbox').forEach(checkbox => checkbox.setAttribute("disabled", ''))
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
        // if (volumeAlert) {alert("용량을 수정해주세요."); return;}


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
    async function setNotice(){
        if(!setIsQuotationRequestOk){return;}
        if(data.content.sampleDeliveryWishDate &&  data.content.reportWishDate && data.content.sampleDeliveryAddress)
        {
            setIsQuotationRequestOk(true)
        }
        else{
            setIsQuotationRequestOk(false)
            let noString = "";
            if(!data.content.sampleDeliveryWishDate) { noString= noString+"검체 수거 요청일, "}
            if(!data.content.reportWishDate) { noString= noString+"결과 보고 희망일, "}
            if(!data.content.sampleDeliveryAddress) { noString= noString+"검체 수거 요청 주소, "}
            if (noString.endsWith(", ")) {
                noString = noString.slice(0, -2);
            }
            // //console.log(noString)
            setQuotationRequestList(noString);
        }
    }
    async function saveContent() {
        data.content.isCheckedTemperature = isCheckedTemperature;
        data.content.isCheckedScheduleFlexible = isCheckedScheduleFlexible;
        data.content.isCheckedSampleRetrieval = isCheckedSampleRetrieval;
        
        setNotice();
        
        await axios.post(`/quotation-requests/save`, { "id": data.id, "contents": data.content});
        // console.log("save");///
    }

    async function copySampleData() {
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
        toggleCopyMode()
        await saveContent()
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
        // volume 알람은 나중으로 미룸
        // let volumeLimit = calculateVolumeLimit(biomarkers, sampleType, repetition);
        // if (volume < volumeLimit) {
        //     alert(`바이오마커 ${biomarkers.join(",")}, 샘플 종류 ${sampleType}, 반복 횟수 ${repetition}에 대해서는 용량이 최소 ${volumeLimit}μl가 필요합니다.`)
        //     return false;
        // }
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
            // //console.log(`saved ${rows.length -1} rows`)
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

    function selectRow(rowNumber) {
        const index = selectedRows.indexOf(rowNumber)
        if (index > -1) {
            if (!dragInProgress) {
                dragInProgress = 'unselect'
            }
            if (dragInProgress === 'select') {
                return
            }
            selectedRows.splice(index, 1)
            document.querySelectorAll(`.rowNumber${rowNumber}`).forEach(td => td.style.backgroundColor = '#fff');
        } else {
            if (!dragInProgress) {
                dragInProgress = 'select'
            }
            if (dragInProgress === 'unselect') {
                return
            }
            selectedRows.push(rowNumber)
            document.querySelectorAll(`.rowNumber${rowNumber}`).forEach(td => td.style.backgroundColor = '#ddd');
        }
        setSelectedRows(selectedRows)
        // console.log(selectedRows)
        if (selectedRows.length > 0) {
            document.querySelector('.selectedRowsLabel').innerText = selectedRows.length > 0 ? `${selectedRows.length}개 행 선택됨` : ''
            setSelectRowInfoOn(true);
        } else {
            setSelectRowInfoOn(false);
        }
    }

    function selectAllRows() {
        const allRowNumbers = [...Array(data.content.sampleDataList.length).keys()];
        if (selectedRows.length === allRowNumbers.length) {
            setSelectedRows([])
            document.querySelectorAll('td').forEach(td => td.style.backgroundColor='#fff')
            setSelectRowInfoOn(false);
            return
        }
        setSelectedRows(allRowNumbers)
        const tableElements = Array.from(document.querySelectorAll(`td`));
        tableElements.splice(-8)
        tableElements.forEach(td => td.style.backgroundColor = '#ddd');
        setSelectRowInfoOn(true);
        //console.log(allRowNumbers)
        document.querySelector('.selectedRowsLabel').innerText = allRowNumbers.length > 0 ? `${allRowNumbers.length}개 행 선택됨` : ''
    }

    async function deleteSelectedRows() {
        if (readOnly || !window.confirm(`선택한 행들을 삭제하시겠습니까? 총 ${selectedRows.length}개의 행이 삭제됩니다.`)) {
            return;
        }

        for (let i = selectedRows.length -1; i >= 0; i--) {
            data.content.sampleDataList.splice(selectedRows[i],1);
        }

        await axios.post(`/quotation-requests/save`, { "id": data.id, "contents": data.content});
        setSelectedRows([])
        document.querySelectorAll('td').forEach(td => td.style.backgroundColor='#fff')
        setSelectRowInfoOn(false);
        setData({
            content: data.content,
            id: data.id
        });

    }

    return (
        <div onPointerUp={() => dragInProgress = false}>
        {data ? (
                <>
                <div id="quotation-request" className="Rectangle30 w-[1100px] h-[1480px] left-[300px] top-[120px] mb-[150px] relative bg-white shadow">
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
                        <div className=" w-[297px] h-[20px] left-[90px] top-[0px] relative text-slate-500 text-lg font-bold font-['Inter']">
                            <div className="inline-block">샘플 및 분석 대상 바이오마커 정보 입력</div>
                            <span className="align-left text-gray-400 leading-4 text-[12px] font-normal inline-block pl-[0.3rem] w-[800px] mt-0">
                                - 원심분리 및 불순물 제거가 된 상태에서의 용량을 기준으로 입력해주세요.
                                {/*<br /> - 필요 용량 기준치에 미달되는 샘플이 있는 경우, ‘문의하기’를 통해 알려주세요. 담당자가 검토 후 도움을 드리겠습니다.*/}
                            </span>
                        </div>
                        <div className=" w-[214px] h-6 left-[830px] top-[12px] relative">
                            <a download href="https://bredis-public.s3.ap-northeast-2.amazonaws.com/test-service/Digital+ELISA+%E1%84%8B%E1%85%A7%E1%86%AB%E1%84%80%E1%85%AE%E1%84%87%E1%85%AE%E1%86%AB%E1%84%89%E1%85%A5%E1%86%A8+%E1%84%89%E1%85%A5%E1%84%87%E1%85%B5%E1%84%89%E1%85%B3_%E1%84%87%E1%85%B3%E1%84%85%E1%85%A6%E1%84%83%E1%85%B5%E1%84%89%E1%85%B3%E1%84%92%E1%85%A6%E1%86%AF%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A6%E1%84%8B%E1%85%A5.pdf"
                               className=" left-0 top-[0px] text-sky-900 text-[15px] font-bold font-['Inter'] inline-block">바이오마커 상세 목록 다운로드</a>
                            <img src={icon_download} className="inline-block aspect-[1] object-cover object-center w-[22px] mb-[3px] self-center shrink-0"/>
                        </div>
                        {/*테이블 높이는 600으로 고정시키고 싶다.*/}
                        <div id="table" className="left-[90px] top-[20px] w-auto float-left relative min-h-[500px] max-h-[580px] overflow-y-scroll">
                            <table style={{borderCollapse: 'collapse', borderColor: '#ccc', borderSpacing:0, minWidth:'900px', userSelect:'none', msUserSelect: 'none'}}>
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
                                        <tr key={index}
                                            onPointerDown={() => {selectRow(index);}}
                                            onPointerOver={() => dragInProgress ? selectRow(index) : ''}
                                            onPointerUp={() => {dragInProgress = '';}}
                                        >
                                            <TableCell rowNumber={index} value={`${index + 1}`} minWidth="20px" />
                                            <TableCell rowNumber={index} value={`${row.uniqueNumber}`} />
                                            <TableCell rowNumber={index} value={`${row.biomarkers ? row.biomarkers.join(', ') : ''}`} />
                                            <TableCell rowNumber={index} value={`${row.sampleType}`} minWidth="110px"/>
                                            <TableCell rowNumber={index} value={`${row.repetition}`} maxWidth="110px"/>
                                            <TableCell rowNumber={index} value={`${row.volume}`} />
                                            <TableCell rowNumber={index} value={`${row.additionalAnalysis ? row.additionalAnalysis.join(', ') : ''}`} />
                                            <TableCell rowNumber={index}>
                                                {/*<button className=" w-[41px] h-[26px] relative mx-1" rownumber={`${index}`}*/}
                                                {/*        onClick={(e) => deleteRow(e)}>*/}
                                                {/*    <div className="Rectangle7 w-[41px] h-[26px] left-0 top-0 absolute bg-white rounded-[9px] border border-zinc-500" rownumber={`${index}`}/>*/}
                                                {/*    <div className=" w-[27px] h-[13px] left-[6px] top-[4px] absolute text-zinc-500 text-sm font-bold font-['Inter']" rownumber={`${index}`}>삭제</div>*/}
                                                {/*</button>*/}
                                                {/*<button className="editButton w-[41px] h-[26px] relative mx-1"*/}
                                                {/*        onClick={(e) => selectRow(index)}>*/}
                                                {/*    <div className="Rectangle7 w-[41px] h-[26px] left-0 top-0 absolute bg-white rounded-[9px] border border-zinc-500" />*/}
                                                {/*    <div className=" w-[27px] h-[13px] left-[6px] top-[4px] absolute text-zinc-500 text-sm font-bold font-['Inter']">선택</div>*/}
                                                {/*</button>*/}
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
                                                       // onChange={(e) => {setVolumeAlertLimit(calculateVolumeLimit(selectedBiomarkers, selectedSampleType, selectedRepetition)); setVolumeAlert(e.target.value < volumeAlertLimit)}}
                                                />
                                                μl
                                                {/*<p className={`${volumeAlert ? 'block' : 'hidden'} text-red-500 text-xs italic`}>{volumeAlertLimit}μl 이상부터<br />가능합니다.</p>*/}
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
                                                    <div className=" w-[27px] h-[13px] left-[6px] top-[4px] absolute text-white text-sm font-bold font-['Inter']">복제</div>
                                                </button>
                                                <div className={`${(copyModeOn && !inputModeOn) ? 'block' : 'hidden'} absolute w-[240px] h-[150px] right-[5px] top-[22px] z-10`}>
                                                    <img className="object-contain object-center h-[100%]" src={info_box} alt=""/>
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
                                                    <div className=" w-[27px] h-[13px] left-[6px] top-[4px] absolute text-white text-sm font-bold font-['Inter']">신규</div>
                                                </button>
                                                <button className={`${inputModeOn ? 'inline-block' : 'hidden'}  w-[41px] h-[26px] relative mx-1`} onClick={() => toggleInputMode()}>
                                                    <div className="Rectangle7 w-[41px] h-[26px] left-0 top-0 absolute bg-white rounded-[9px] border border-zinc-500" />
                                                    <div className=" w-[27px] h-[13px] left-[6px] top-[4px] absolute text-zinc-500 text-sm font-bold font-['Inter']">취소</div>
                                                </button>
                                                <button className={`${inputModeOn ? 'inline-block' : 'hidden'} w-[41px] h-[26px] relative mx-1`} onClick={()=>saveRow()}>
                                                    <div className="Rectangle7 w-[41px] h-[26px] left-0 top-0 absolute bg-slate-500 rounded-[9px]" />
                                                    <div className=" w-[27px] h-[13px] left-[6px] top-[4px] absolute text-white text-sm font-bold font-['Inter']">저장</div>
                                                </button>
                                            </div>

                                        </TableCell>
                                    </tr>
                                }
                                {
                                    data.content.sampleDataList.length < 13 ?
                                        [...Array(13 - data.content.sampleDataList.length).keys()].map((key) => (<tr key={key}>
                                        <TableCell value={`${data.content.sampleDataList.length + key + 2}`} minWidth="20px" maxWidth="90px"/>
                                        <TableCell maxWidth="90px"/>
                                        <TableCell maxWidth="90px"/>
                                        <TableCell maxWidth="90px"/>
                                        <TableCell maxWidth="90px"/>
                                        <TableCell maxWidth="90px"/>
                                        <TableCell maxWidth="90px"/>
                                        <TableCell maxWidth="90px"/>
                                    </tr>)) : <></>
                                }
                                </tbody>
                            </table>
                        </div>

                    </div>

                    <div className="relative top-[10px]">
                        <div className="flex flex-row">
                            <div className={`flex flex-row w-[35%] my-3 mx-auto`}>
                                <div className={`${selectRowInfoOn ? 'block' : 'hidden'} mx-3 text-zinc-500 text-[15px] font-normal selectedRowsLabel`}></div>
                                <button className="mx-5 h-[1rem] text-zinc-500 text-[15px] font-bold"
                                        onClick={() => selectAllRows()}>
                                    전체 선택
                                </button>
                                <button className={`${selectRowInfoOn ? 'block' : 'hidden'} h-[1rem] mx-3 text-zinc-500 text-[15px] font-bold`}
                                        onClick={() => deleteSelectedRows()}>
                                    삭제
                                </button>
                            </div>
                            <div className="Group38 w-[40%] flex flex-col my-3 ml-auto">
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
                                    <a download href="https://bredis-public.s3.ap-northeast-2.amazonaws.com/test-service/%EA%B2%80%EC%B2%B4+%EC%A0%95%EB%B3%B4+%EC%9E%85%EB%A0%A5+%EC%96%91%EC%8B%9D_%EB%B8%8C%EB%A0%88%EB%94%94%EC%8A%A4%ED%97%AC%EC%8A%A4%EC%BC%80%EC%96%B4.xlsx
"
                                       className="mt-[10px]">
                                        <div className="relative text-zinc-500 text-[15px] font-bold font-['Inter'] inline-block">양식 다운로드</div>
                                        <img src={icon_download} className="inline-block aspect-[1] object-cover object-center w-[22px] mb-[3px] self-center shrink-0" alt="다운버튼"/>
                                    </a>

                                </div>
                                <input id="sampleDataByFileInput" className={`${fileInputOn ? 'block' : 'hidden'} my-[10px] mx-[30px]`} type="file" />
                            </div>
                        </div>

                        <div className=" w-[134px] h-[17px] left-[90px] top-[10px] relative inline-block text-slate-500 text-lg font-bold font-['Inter']">검체 수거 요청일:</div>
                        <input id="sampleDeliveryWishDateInput" type="date" defaultValue={data.content.sampleDeliveryWishDate ? data.content.sampleDeliveryWishDate.replaceAll('.', '-') : ''}
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

                        <div className=" w-[95px] h-[17px] left-[90px] mt-8 relative text-slate-500 text-lg font-bold font-['Inter']">특이사항</div>
                        <textarea value={inputAdditionalInfo ? inputAdditionalInfo : (data.content.additionalInfo ? data.content.additionalInfo : '')} onChange={(e)=> {handleAdditionalInfoChange(e); saveContent()}}
                                  id="additionalInfo" rows="4"
                                  className="resize-none left-[90px] mt-5 relative block p-2.5 w-[900px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="특이사항...">
                        </textarea>
                        <div className='checkboxes flex flex-col justify-start items-start mt-[10px] ml-[90px]'>
                            <div className="">
                                <input type="checkbox" id="checkbox1" checked={isCheckedTemperature} onChange={(e) => {setIsCheckedTemperature(e.target.checked); saveContent()}} className="checkbox accent-slate-500 align-middle mr-[6px] h-[1.15rem] w-[1.15rem] "/>
                                <label className="align-left text-black text-base font-normal inline-block pl-[0.15rem] hover:cursor-pointer" htmlFor="checkbox1">
                                    모든 샘플은 초저온 냉동보관(-80°C) 중입니다.
                                </label>
                            </div>
                            <div className="">
                                <input type="checkbox" id="checkbox2" checked={isCheckedScheduleFlexible} onChange={(e) => {setIsCheckedScheduleFlexible(e.target.checked); saveContent()}} className="checkbox accent-slate-500 align-middle mr-[6px] h-[1.15rem] w-[1.15rem] "/>
                                <label className="align-left text-black text-base font-normal inline-block pl-[0.15rem] hover:cursor-pointer" htmlFor="checkbox2">
                                    결과 보고 일정 조정이 가능합니다.
                                </label>
                                <label className="align-left text-gray-400 text-[13px] inline-block pl-[0.3rem]">동의하시는 경우, 가격 혜택을 얻으실 수 있도록 브레디스헬스케어에서 일정 조정을 도와드립니다.</label>
                            </div>
                            <div className="mt-3">
                                <div>
                                    <label className="align-left text-black text-base font-normal inline-block hover:cursor-pointer">
                                        잔여 검체 처리 방식
                                    </label>
                                    <label className="align-left text-gray-400 text-[13px] inline-block pl-[0.3rem]">IRB 내용과 동일하게 체크해주세요.</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="checkbox3" checked={!isCheckedSampleRetrieval} onChange={(e) => {setIsCheckedSampleRetrieval(!e.target.checked); saveContent()}} className="checkbox accent-slate-500 align-middle mr-[6px] h-[1.15rem] w-[1.15rem] "/>
                                    <label className="align-left text-gray-600 text-base font-normal inline-block px-[0.15rem] hover:cursor-pointer" htmlFor="checkbox3">폐기 요청</label>
                                    <input type="checkbox" id="checkbox4" checked={isCheckedSampleRetrieval} onChange={(e) => {setIsCheckedSampleRetrieval(e.target.checked); saveContent()}} className="checkbox accent-slate-500 align-middle mx-[6px] h-[1.15rem] w-[1.15rem] "/>
                                    <label className="align-left text-gray-600 text-base font-normal inline-block px-[0.15rem] hover:cursor-pointer" htmlFor="checkbox4">직접 회수</label>
                                </div>
                            </div>
                        </div>
                        <div className="ml-[90px] mt-[30px]">
                            <div className="text-slate-500 text-base font-bold font-['Inter']">유의사항</div>
                            <div>
                                <p className="align-left text-gray-400 text-[12px] w-[930px]">
                                    - 본 바이오마커 검사서비스는 (주)브레디스헬스케어에서 제공하는 연구 목적의 검사 서비스로, 사람의 혈청 또는 혈장 검체로부터 알츠하이머병 관련 바이오마커를 정량 측정한 결과를 제공합니다.
                                    <br /> - 검사 진행 과정은 1) 의뢰 접수, 2) 검체 수거, 3) 검사 진행, 4) 결과 분석, 5) 결과보고서 발송 순으로 이루어지며, 의뢰 접수에서부터 결과보고서 발송까지 약 4~6주의 기간이 소요됩니다.
                                    <br /> - 검사 일정은 상황에 따라 변동될 수 있으며, 일정 변경 시 담당자에게 사전 공지됩니다.
                                    <br /> - 검사 서비스 의뢰에 사용되는 검체는 검사의 목적으로 사용할 것에 대하여 검체 제공자로부터 동의를 받은 검체만을 사용해야 합니다. 검체 제공자의 동의를 받지 않은 검체를 사용함으로 써 발생하는 문제에 대해 (주)브레디스헬스케어는 책임지지 않습니다.
                                    <br /> - 검사 서비스 의뢰를 위한 검체(혈청 또는 혈장)는 전용 용기(SST 또는 EDTA tube)에 채혈한 혈액 검체에 한하며, 검체 수거 전 시료의 신뢰성 확보를 위하여 각각 권장하는 방법에 따라 전처리 후 냉동(-20 ~ -80 ℃) 보관된 검체에 대해 검사 서비스 제공이 가능합니다.
                                    <br /> - 검사에 부적합한 검체(예: 검체량 부족, 검체 보관상태 부적합 등)로 확인된 경우에는 검체의 수거가 이루어지지 않습니다.
                                    <br /> - 검사 및 분석은 검체의 보관상태, 분석기기의 상태, 검사항목의 특성 등의 이유로 실패할 가능성이 존재하며, (주)브레디스헬스케어는 해당 결과에 대한 책임을 지지 않습니다.
                                </p>
                            </div>
                        </div>
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