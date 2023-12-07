import React, {useState, useEffect, useRef} from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from "../../api/axios";
import { AgGridReact } from 'ag-grid-react';
import * as XLSX from 'xlsx';
import Select from "react-select";

const SampleDataGrid = () => {
    const [rowData, setRowData] = useState([]);
    const [selectRowData, setSelectRowData] = useState([]);
    const [useRowData, setUseRowData] = useState([]);
    const [historyRowData, setHistoryRowData] = useState([]);
    const [joinedRowData, setJoinedRowData] = useState([]);
    const gridRef = useRef();
    const selectGridRef = useRef();
    const useGridRef = useRef();
    const joinedGridRef = useRef();
    const [columnDefs, setColumnDefs] = useState([
        { headerName: "id", field: "id", hide:true },
        { headerName: "내부고유코드", field: "inHouseUniqueSampleName", filter: "agTextColumnFilter", hide:false, headerCheckboxSelection: true,
            checkboxSelection: true,width: 300, suppressMovable: true  },
        { headerName: "입고일", field: "inHouseDate", filter: "agDateColumnFilter", hide:true, width: 100 },
        { headerName: "담당자", field: "personInCharge", filter: "agTextColumnFilter", hide:true , width: 100},
        { headerName: "고객코드", field: "customerId", filter: "agTextColumnFilter", hide:false, width: 100 },
        { headerName: "박스", field: "boxInfo", filter: "agTextColumnFilter", hide:false, width: 150 },
        { headerName: "고객제공코드", field: "customerSampleCode", filter: "agTextColumnFilter", hide:true, width: 100 },
        { headerName: "샘플타입", field: "sampleType", filter: "agTextColumnFilter", hide:false, width: 100 },
        { headerName: "보관위치", field: "stockPosition", filter: "agTextColumnFilter", hide:true, width: 100 },
        { headerName: "기존 용량(μl)", field: "initialVolume", filter: "agNumberColumnFilter", hide:true, width: 150 },
        { headerName: "현재 용량(μl)", field: "currentVolume", filter: "agNumberColumnFilter", hide:true, width: 150 },
        { headerName: "사용 횟수(μl)", field: "numOfUse", filter: "agNumberColumnFilter", hide:true, width: 150 },
        { headerName: "비고", field: "memo", hide:false },
        { headerName: "추가인식자1", field: "additional_column1", filter: "agTextColumnFilter", hide:true, width: 150 },
        { headerName: "추가인식자2", field: "additional_column2", filter: "agTextColumnFilter", hide:true, width: 150 },
        { headerName: "추가인식자3", field: "additional_column3", filter: "agTextColumnFilter", hide:true, width: 150 },
        { headerName: "추가인식자4", field: "additional_column4", filter: "agTextColumnFilter", hide:true, width: 150 },
        { headerName: "관련 검체", field: "relatedSampleName", filter: "agTextColumnFilter", hide:true, width: 300 }

    ]);
    const [selectColumnDefs, setSelectColumnDefs] = useState([]);
    const [useColumnDefs, setUseColumnDefs] = useState([
        { headerName: "id", field: "id", hide:true, cellStyle: nonEditableCellStyle, suppressMovable: true },
        { headerName: "내부고유코드", field: "inHouseUniqueSampleName", filter: "agTextColumnFilter", width: 300, cellStyle: nonEditableCellStyle,suppressMovable: true },
        { headerName: "키트종류", field: "kitType", filter: "agDateColumnFilter" , editable: true, width: 100,suppressMovable: true },
        { headerName: "키트번호", field: "kitNumber", filter: "agTextColumnFilter", editable: true, width: 100,suppressMovable: true},
        { headerName: "사용날짜", field: "date", filter: "agTextColumnFilter", editable: true, width: 150,suppressMovable: true },
        { headerName: "분석자", field: "analyst", filter: "agTextColumnFilter", editable: true, width: 100,suppressMovable: true},
        { headerName: "기존 용량(μl)", field: "initialVolume", filter: "agNumberColumnFilter", cellStyle: nonEditableCellStyle, width: 150,suppressMovable: true },
        { headerName: "현재 용량(μl)", field: "currentVolume", filter: "agNumberColumnFilter", cellStyle: nonEditableCellStyle, width: 150,suppressMovable: true },
        { headerName: "사용 용량(μl)", field: "usedVolume", filter: "agNumberColumnFilter", editable: true, width: 150,suppressMovable: true},
        { headerName: "희석 배율", field: "dilution", filter: "agNumberColumnFilter", editable: true, width: 100,suppressMovable: true},
        { headerName: "메모", field: "memo", hide:false, editable: true, width: 300,suppressMovable: true },

    ]);

    const [joinColumnDefs , setJoinColumnDefs ] = useState([
        { headerName: "내부고유코드", field: "inHouseUniqueSampleName", filter: "agTextColumnFilter", hide:false, headerCheckboxSelection: true,
            checkboxSelection: true,width: 300, suppressMovable: true  },
        { headerName: "입고일", field: "inHouseDate", filter: "agDateColumnFilter", hide:true },
        { headerName: "담당자", field: "personInCharge", filter: "agTextColumnFilter", hide:true },
        { headerName: "고객코드", field: "customerId", filter: "agTextColumnFilter", hide:true },
        { headerName: "박스", field: "boxInfo", filter: "agTextColumnFilter", hide:true },
        { headerName: "고객제공코드", field: "customerSampleCode", filter: "agTextColumnFilter", hide:true },
        { headerName: "샘플타입", field: "sampleType", filter: "agTextColumnFilter", hide:true },
        { headerName: "보관위치", field: "stockPosition", filter: "agTextColumnFilter", hide:true },
        { headerName: "기존 용량(μl)", field: "initialVolume", filter: "agNumberColumnFilter", hide:false },
        { headerName: "현재 용량(μl)", field: "currentVolume", filter: "agNumberColumnFilter", hide:false },
        { headerName: "사용 횟수", field: "numOfUse", filter: "agNumberColumnFilter", hide:true },
        { headerName: "비고", field: "memo", hide:true },
        { headerName: "추가인식자1", field: "additional_column1", filter: "agTextColumnFilter", hide:true, width: 150 },
        { headerName: "추가인식자2", field: "additional_column2", filter: "agTextColumnFilter", hide:true, width: 150 },
        { headerName: "추가인식자3", field: "additional_column3", filter: "agTextColumnFilter", hide:true, width: 150 },
        { headerName: "추가인식자4", field: "additional_column4", filter: "agTextColumnFilter", hide:true, width: 150 },
        { headerName: "관련 검체", field: "relatedSampleName", filter: "agTextColumnFilter", hide:true, width: 300 },

        { headerName: "id", field: "h_id", hide:true, cellStyle: nonEditableCellStyle },
        { headerName: "키트종류", field: "h_kit_type", filter: "agDateColumnFilter" ,width: 100 },
        { headerName: "키트번호", field: "h_kit_number", filter: "agTextColumnFilter", width: 100},
        { headerName: "사용날짜", field: "h_use_date", filter: "agTextColumnFilter", width: 150 },
        { headerName: "분석자", field: "h_analyst", filter: "agTextColumnFilter", width: 100},
        { headerName: "사용 용량(μl)", field: "h_usedVolume", filter: "agNumberColumnFilter", width: 150},
        { headerName: "희석 배율", field: "h_dilution_rate", filter: "agNumberColumnFilter",  width: 150},
        { headerName: "메모", field: "h_memo", hide:false, width: 300 },
    ]);

    function nonEditableCellStyle(params) {
        // 선택된 행인지 확인
        if (params.node.isSelected()) {
            return { backgroundColor: '#D2D2D2' }; // 선택된 행의 색상
        } else {
            return { backgroundColor: '#E2E2E2' }; // 기본 행 색상
        }
    }

    const sampleTypeOptions = [
        {value: "11", label: "pTau181"},
        {value: "12", label: "pTau217"},
        {value: "17", label: "pTau231"},
        {value: "16", label: "BDNF"},
        {value: "15", label: "GFAP"},
        {value: "14", label: "NfL"},
        {value: "20", label: "N2PB"},
        {value: "21", label: "N3PA"},
        {value: "22", label: "N4PA"},
        {value: "23", label: "N4PB"},
        {value: "24", label: "N4PE"},
        {value: "13", label: "Tau"},
        {value: "01", label: "희석"},
        {value: "09", label: "용량 조정"},
    ];

    const [showColumnPopup, setShowColumnPopup] = useState(false);
    const [showColumnPopup2, setShowColumnPopup2] = useState(false);
    const [showColumnPopup3, setShowColumnPopup3] = useState(false);

    const popupRef = useRef();
    const popupRef2 = useRef();
    const popupRef3 = useRef();

    const [columnVisibility, setColumnVisibility] = useState({});
    const [selectColumnVisibility, setSelectColumnVisibility] = useState({});
    const [joinColumnVisibility, setJoinColumnVisibility] = useState({});
    const [removedRowIds, setRemovedRowIds] = useState([]);

    // 오늘 날짜를 기본값으로 설정합니다.
    const today = new Date().toISOString().split('T')[0];

    // 각 항목에 대한 state를 생성합니다.
    const [kitType, setKitType] = useState({value: "99", label: "사용샘플"});
    const [kitNumber, setKitNumber] = useState("");
    const [date, setDate] = useState(today);
    const [analyst, setAnalyst] = useState('분석자');
    const [usedVolume, setUsedVolume] = useState(80);
    const [dilution, setDilution] = useState(1);
    const [memo, setMemo] = useState('');

    // 폼 제출 핸들러


    useEffect(() => {
        const initialVisibility = {};
        const initialSelectVisibility = {};
        const initialJoinVisibility = {};
        const updatedSelectColumnDefs = columnDefs.map(colDef => {
            // initialVolume과 currentVolume 컬럼에 대해 hide 속성을 false로 설정
            if (colDef.field === "initialVolume" || colDef.field === "currentVolume") {
                return { ...colDef, hide: false };
            }
            return colDef;
        });

        columnDefs.forEach(colDef => {
            initialVisibility[colDef.field] = !colDef.hide;
        })

        setColumnVisibility(initialVisibility);
        updatedSelectColumnDefs.forEach(colDef => {
            initialSelectVisibility[colDef.field] = !colDef.hide; // 모든 컬럼을 초기에 표시
        });
        setSelectColumnDefs(updatedSelectColumnDefs); // 업데이트된 컬럼 정의 사용
        setSelectColumnVisibility(initialSelectVisibility);

        joinColumnDefs.forEach(colDef => {
            initialJoinVisibility[colDef.field] = !colDef.hide; // 모든 컬럼을 초기에 표시
        });

        setJoinColumnVisibility(initialJoinVisibility);
        fetchData();
    }, []);


    useEffect(() => {
        // rowData와 historyRowData를 결합하는 함수
        const joinData = () => {
            const joinedData = [];

            rowData.forEach(rowItem => {
                // rowData의 각 항목에 대해 historyRowData에서 일치하는 항목들을 찾습니다.
                const relatedHistoryItems = historyRowData.filter(historyItem => historyItem.in_house_unique_sample_name === rowItem.inHouseUniqueSampleName);

                if (relatedHistoryItems.length > 0) {
                    // 각 relatedHistoryItems 항목에 대해 rowItem과 결합
                    relatedHistoryItems.forEach(historyItem => {
                        const combinedHistoryItem = {};

                        // historyRowData의 각 항목에 h_ 접두사를 추가합니다.
                        Object.keys(historyItem).forEach(key => {
                            combinedHistoryItem[`h_${key}`] = historyItem[key];
                        });

                        // rowData 항목과 combinedHistoryItem을 결합합니다.
                        joinedData.push({ ...rowItem, ...combinedHistoryItem });
                    });
                }
            });

            setJoinedRowData(joinedData);
        };

        // 데이터 결합 함수 호출
        joinData();
    }, [rowData, historyRowData]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowColumnPopup(false);
            }
            if (popupRef2.current && !popupRef2.current.contains(event.target)) {
                setShowColumnPopup2(false);
            }
            if (popupRef3.current && !popupRef3.current.contains(event.target)) {
                setShowColumnPopup3(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const onGridReady = (params) => {
        // console.log("Grid is ready:", params.api);
    };


    // 엑셀로 내보내기 함수
    const onBtnExport = () => {
        const gridApi = gridRef.current.api;
        const api = gridRef.current.api;
        const displayedColumns = api.getAllDisplayedColumns();
        const allRowData = [];
        const columnWidths = displayedColumns.map(col => col.getColDef().headerName.length); // headerName 길이로 초기화

        // 각 행 및 컬럼에 대해 반복하면서 최대 길이 계산
        gridApi.forEachNodeAfterFilterAndSort(node => {
            const rowData = {};
            displayedColumns.forEach((col, index) => {
                const headerName = col.getColDef().headerName;
                const cellValue = node.data[col.getColId()] ? node.data[col.getColId()].toString() : '';
                rowData[headerName] = cellValue;

                // 컬럼 너비 업데이트 (현재 셀 길이와 기존 최대 길이 비교)
                columnWidths[index] = Math.max(columnWidths[index], cellValue.length);
            });
            allRowData.push(rowData);
        });

        // 엑셀 시트 생성
        const ws = XLSX.utils.json_to_sheet(allRowData, { header: displayedColumns.map(col => col.getColDef().headerName) });

        // 컬럼 너비 설정 (각 컬럼의 최대 길이 + 여유 공간)
        ws['!cols'] = columnWidths.map(maxWidth => ({ wch: maxWidth + 5 })); // 여유 공간을 5로 설정

        // 워크북 생성 및 시트 추가
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        // 엑셀 파일로 내보내기
        XLSX.writeFile(wb, "exported_data.xlsx");
    };

    const onBtnUseExport = () => {
        const gridApi = useGridRef.current.api;
        const api = useGridRef.current.api;
        const displayedColumns = api.getAllDisplayedColumns();
        const allRowData = [];
        const columnWidths = displayedColumns.map(col => col.getColDef().headerName.length); // headerName 길이로 초기화

        // 각 행 및 컬럼에 대해 반복하면서 최대 길이 계산
        gridApi.forEachNodeAfterFilterAndSort(node => {
            const rowData = {};
            displayedColumns.forEach((col, index) => {
                const headerName = col.getColDef().headerName;
                const cellValue = node.data[col.getColId()] ? node.data[col.getColId()].toString() : '';
                rowData[headerName] = cellValue;

                // 컬럼 너비 업데이트 (현재 셀 길이와 기존 최대 길이 비교)
                columnWidths[index] = Math.max(columnWidths[index], cellValue.length);
            });
            allRowData.push(rowData);
        });

        // 엑셀 시트 생성
        const ws = XLSX.utils.json_to_sheet(allRowData, { header: displayedColumns.map(col => col.getColDef().headerName) });

        // 컬럼 너비 설정 (각 컬럼의 최대 길이 + 여유 공간)
        ws['!cols'] = columnWidths.map(maxWidth => ({ wch: maxWidth + 5 })); // 여유 공간을 5로 설정

        // 워크북 생성 및 시트 추가
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        // 엑셀 파일로 내보내기
        XLSX.writeFile(wb, "exported_use_data.xlsx");
    };

    const onBtnJoinExport = () => {
        const gridApi = joinedGridRef.current.api;
        const api = joinedGridRef.current.api;
        const displayedColumns = api.getAllDisplayedColumns();
        const allRowData = [];
        const columnWidths = displayedColumns.map(col => col.getColDef().headerName.length); // headerName 길이로 초기화

        // 각 행 및 컬럼에 대해 반복하면서 최대 길이 계산
        gridApi.forEachNodeAfterFilterAndSort(node => {
            const rowData = {};
            displayedColumns.forEach((col, index) => {
                const headerName = col.getColDef().headerName;
                const cellValue = node.data[col.getColId()] ? node.data[col.getColId()].toString() : '';
                rowData[headerName] = cellValue;

                // 컬럼 너비 업데이트 (현재 셀 길이와 기존 최대 길이 비교)
                columnWidths[index] = Math.max(columnWidths[index], cellValue.length);
            });
            allRowData.push(rowData);
        });

        // 엑셀 시트 생성
        const ws = XLSX.utils.json_to_sheet(allRowData, { header: displayedColumns.map(col => col.getColDef().headerName) });

        // 컬럼 너비 설정 (각 컬럼의 최대 길이 + 여유 공간)
        ws['!cols'] = columnWidths.map(maxWidth => ({ wch: maxWidth + 5 })); // 여유 공간을 5로 설정

        // 워크북 생성 및 시트 추가
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        // 엑셀 파일로 내보내기
        XLSX.writeFile(wb, "exported_sample_use_data.xlsx");
    };



    const onBtnSelected = () => {
        // 선택된 행의 노드를 가져옵니다.
        const selectedNodes = gridRef.current.api.getSelectedNodes();
        // 선택된 노드에서 데이터만 추출합니다.
        const selectedData = selectedNodes.map(node => node.data);

        // 중복을 제거하고 모든 정보를 가져옵니다.
        const nonDuplicateData = selectedData.filter(rowData => !isRowAlreadySelected(rowData));
        const allColumns = gridRef.current.api.getAllGridColumns();
        const exportedData = nonDuplicateData.map(rowData => {
            let exportedRowData = {};
            allColumns.forEach(col => {
                const colId = col.getColId();
                exportedRowData[colId] = rowData[colId];
            });
            return exportedRowData;
        });
        selectedNodes.forEach(node => {
            node.setSelected(false);
            node.setRowSelectable(false);
        });
        // gridRef.current.api.deselectAll();

        // 새롭게 생성된 데이터를 state에 저장하여 표를 업데이트합니다.
        setSelectRowData([...selectRowData, ...exportedData]);
    };

    const onBtnUseUpload = async () => {
        const gridApi = useGridRef.current.api;
        const displayedColumns = gridApi.getAllGridColumns();
        const allRowData = [];

        // 각 행 및 컬럼에 대해 반복하면서 데이터 추출
        gridApi.forEachNodeAfterFilterAndSort(node => {
            const rowData = {};
            displayedColumns.forEach(col => {
                const colId = col.getColId();
                rowData[colId] = node.data[colId];
            });
            allRowData.push(rowData);
        });

        // JSON 데이터를 생성합니다.
        const jsonData = JSON.stringify(allRowData);
        if(window.confirm(`${allRowData.length}개의 사용 기록을 등록 하겠습니까?`)){
            // 서버에 JSON 데이터를 보냅니다.
            // console.log("jsonData", jsonData)
            try {
                const response = await axios.post('/sampleUseUpload', jsonData, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                // console.log(response.data);
                alert("사용기록 데이터 등록 완료");

                window.location.reload();
            } catch (error) {
                console.error("사용기록 데이터 등록 중 오류 발생:", error);
            }
        }
    };



    const onRemoveSelected = () => {
        const selectedNodes = selectGridRef.current.api.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        const newRemovedRowIds = selectedData.map(row => row.id);

        const filteredData = selectRowData.filter(row =>
            !selectedData.some(selectedRow => selectedRow.id === row.id)
        );
        setSelectRowData(filteredData);

        // 삭제된 행들의 ID를 저장합니다.
        setRemovedRowIds(removedRowIds.concat(newRemovedRowIds));

        // 삭제된 행들의 ID를 이용하여 위 표의 상태를 업데이트합니다.
        updateRowSelectableState(newRemovedRowIds, true);
    };

    const onRemoveUse = async () => {
        const selectedNodes = joinedGridRef.current.api.getSelectedNodes();
        // 선택된 노드에서 데이터만 추출합니다.
        const selectedData = selectedNodes.map(node => node.data);
        const newRemovedRowIds = selectedData.map(row => row.h_id);
        if(window.confirm(`${newRemovedRowIds.length}개의 사용 기록을 삭제하겠습니까?`)){
            // console.log(newRemovedRowIds);
            try {
                const response = await axios.post('/deleteSampleUses', newRemovedRowIds, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                // console.log(response.data);
                alert("사용 기록 삭제 완료");

                window.location.reload();
            } catch (error) {
                console.error("사용 기록 삭제 중 오류 발생:", error);
            }

        }
    };

// 특정 ID의 행들의 선택 가능 상태를 업데이트하는 함수
    const updateRowSelectableState = (rowIds, isSelectable) => {
        gridRef.current.api.forEachNode(node => {
            if (rowIds.includes(node.data.id)) {
                node.setRowSelectable(isSelectable);
            }
        });
    };



    const isRowAlreadySelected = (rowData) => {
        return selectRowData.some(row => row.id === rowData.id);
    };



    const fetchData = async () => {
        try {
            const response = await axios.get('sampleLoad');
            setRowData(response.data);
            // console.log("data", response.data[0]);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }


        try {
            const response = await axios.get('sampleUseLoad');
            setHistoryRowData(response.data);
            // console.log("data", response.data[0]);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };
    const getRowStyle = (params) => {
        if (!params.node.selectable) {
            return { backgroundColor: 'lightcoral' };
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        // 파일 처리 로직을 여기에 작성하세요.

        console.log(file);
    };


    const sendFile = async () => {
        // 파일 처리 로직을 여기에 작성하세요.
        if (window.confirm("데이터를 추가하겠습니까?")) {
            let file = document.querySelector("#excelfile").files[0]
            const formData = new FormData();
            formData.append("file", file);
            await axios.post(`/excelUpload`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "boundary": "--boundary",
                    }
                }
            );
            window.location.reload();
        }
    };
    const toggleColumnVisibility = (field, isVisible) => {
        const api = gridRef.current.api;
        api.setColumnVisible(field, isVisible);
    };

    const handleTogglePopup = () => {
        setShowColumnPopup(!showColumnPopup);
    };
    const handleTogglePopup2 = () => {
        setShowColumnPopup2(!showColumnPopup2);
    };
    const handleTogglePopup3 = () => {
        setShowColumnPopup3(!showColumnPopup3);
    };

    const handleCheckboxChange = (field) => {
        const updatedVisibility = {
            ...columnVisibility,
            [field]: !columnVisibility[field]
        };
        setColumnVisibility(updatedVisibility);
        gridRef.current.api.setColumnVisible(field, updatedVisibility[field]);
    };

    const handleCheckboxChange2 = (field) => {
        const updatedVisibility = {
            ...selectColumnVisibility,
            [field]: !selectColumnVisibility[field]
        };
        setSelectColumnVisibility(updatedVisibility);
        selectGridRef.current.api.setColumnVisible(field, updatedVisibility[field]);
    };

    const handleCheckboxChange3 = (field) => {
        const updatedVisibility = {
            ...joinColumnVisibility,
            [field]: !joinColumnVisibility[field]
        };
        setJoinColumnVisibility(updatedVisibility);
        joinedGridRef.current.api.setColumnVisible(field, updatedVisibility[field]);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        // 폼 데이터
        const formData = {
            kitType, kitNumber, date, analyst, usedVolume, dilution, memo
        };

        // 두 번째 표의 모든 행 데이터 가져오기
        const allData = [];
        selectGridRef.current.api.forEachNode(node => allData.push(node.data));
        // console.log(formData);
        // console.log(formData["kitType"]["label"]);
        // 새로운 행 데이터 생성
        const newRows = allData.map(row => {
            const tmpRow = {
                id: row.id,
                inHouseUniqueSampleName: row.inHouseUniqueSampleName,
                initialVolume: row.initialVolume,
                currentVolume: row.currentVolume,
                // 폼 데이터 추가
                ...formData
            }
            tmpRow["kitType"] = tmpRow["kitType"]["label"];
            return tmpRow;
        });
        if(kitType["value"].startsWith("0")){
            useGridRef.current.api.setColumnVisible("dilution", false)
        }
        else{
            useGridRef.current.api.setColumnVisible("dilution", true)
        }
        if(kitType["value"].startsWith("09")){
            useGridRef.current.api.setColumnVisible("kitNumber", false)
        }
        else{
            useGridRef.current.api.setColumnVisible("kitNumber", true)

        }

        // 새로운 행을 세 번째 표의 데이터에 추가
        setUseRowData(newRows);
    };



    const onClearSelection = () => {
        gridRef.current.api.deselectAll();
    };

    const onSelectClear = () => {
        // 모든 노드를 가져옵니다.
        const allNodes = [];
        gridRef.current.api.forEachNode(node => allNodes.push(node));

        // 가져온 노드의 데이터를 추출합니다.
        const allData = allNodes.map(node => node.data);

        // 가져온 데이터의 ID를 추출합니다.
        const allDataIds = allData.map(row => row.id);

        // 선택된 데이터를 비웁니다.
        setSelectRowData([]);

        // 삭제된 행들의 ID를 이용하여 위 표의 상태를 업데이트합니다.
        updateRowSelectableState(allDataIds, true);
    };

    return (
        <div>
            <div className="mt-5 flex flex-col justify-end items-end">
                <div className="w-[450px]">
                    <a download href="https://bredis-public.s3.ap-northeast-2.amazonaws.com/test-service/data(%EC%96%91%EC%8B%9D).xlsx"
                       className="w-[100%] py-2 bg-sky-900 rounded-[9px] flex justify-center items-center text-white text-lg hover:bg-sky-950 hover:cursor-pointer">검체 등록 양식 다운로드</a>
                    <div className="mx-[10px] mb-[20px]">NA_000으로 입력된 추가 인식자는 공백으로 처리됩니다.</div>
                </div>
                <div className="flex flex-row items-centers justify-center w-[450px]">
                    <input
                        id="excelfile"
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileUpload}
                    />
                    <button className="w-[100px] py-2 bg-sky-900 rounded-[9px] flex justify-center items-center text-white text-lg hover:bg-sky-950 hover:cursor-pointer" onClick={sendFile}>검체 등록</button>
                </div>
            </div>
            <div className="mt-10 flex flex-col justify-start items-start">
                <div className="text-black text-4xl mx-auto">전체 검체 데이터베이스</div>
                <button className="mt-4 w-[200px] mb-2 bg-sky-600 rounded-[9px] flex justify-center items-center text-white text-sm hover:bg-sky-700 hover:cursor-pointer" onClick={onBtnExport}>현재 표 엑셀로 Export하기</button>
                <div className="flex flex-row">
                    <button className="w-[100px] mr-1 mb-1 bg-green-600 rounded-[9px] flex justify-center items-center text-white text-sm hover:bg-green-700 hover:cursor-pointer" onClick={handleTogglePopup}>열 선택</button>
                    <button className="w-[100px] mx-1 mb-1 bg-green-600 rounded-[9px] flex justify-center items-center text-white text-sm hover:bg-green-700 hover:cursor-pointer" onClick={onClearSelection}>선택 해제</button>
                    <button className="w-[150px] mx-1 mb-1 bg-green-600 rounded-[9px] flex justify-center items-center text-white text-sm hover:bg-green-700 hover:cursor-pointer" onClick={onBtnSelected}>선택 행 선정하기</button>
                </div>
                {showColumnPopup && (
                    <div ref={popupRef} className="mx-3 mb-5">
                        {columnDefs.map(colDef => (
                            <div key={colDef.field}>
                                <input
                                    type="checkbox"
                                    id={colDef.field}
                                    checked={columnVisibility[colDef.field]}
                                    onChange={() => handleCheckboxChange(colDef.field)}
                                />
                                <label htmlFor={colDef.field}> {colDef.headerName}</label>
                            </div>
                        ))}
                    </div>
                )}
                <div className="ag-theme-alpine w-[100%] h-[70vh]">
                    <AgGridReact
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        getRowStyle={getRowStyle}
                        pagination={true}
                        paginationPageSize={100}
                        animateRows={true}
                        onGridReady={onGridReady} // 그리드 준비 이벤트 핸들러 추가
                        rowSelection="multiple"
                        rowMultiSelectWithClick={true}
                    />

                </div>
            </div>
            <div className="mt-10 flex flex-col justify-start items-start">
                <div className="text-black text-4xl mx-auto">선정 검체</div>
                <div className="mt-4 flex flex-row">
                    <button className="w-[100px] mr-1 mb-1 bg-green-600 rounded-[9px] flex justify-center items-center text-white text-sm hover:bg-green-700 hover:cursor-pointer" onClick={handleTogglePopup2}>열 선택 </button>
                    <button className="w-[150px] mx-1 mb-1 bg-green-600 rounded-[9px] flex justify-center items-center text-white text-sm hover:bg-green-700 hover:cursor-pointer" onClick={onRemoveSelected}>선택 행 선정 해제</button>
                    <button className="w-[100px] mx-1 mb-1 bg-green-600 rounded-[9px] flex justify-center items-center text-white text-sm hover:bg-green-700 hover:cursor-pointer" onClick={onSelectClear}>선정 표 초기화</button>
                </div>

                {showColumnPopup2 && (
                    <div ref={popupRef2} className="mx-3 mb-5" >
                        {selectColumnDefs.map(colDef => (
                            <div key={colDef.field}>
                                <input
                                    type="checkbox"
                                    id={colDef.field}
                                    checked={selectColumnVisibility[colDef.field]}
                                    onChange={() => handleCheckboxChange2(colDef.field)}
                                />
                                <label htmlFor={colDef.field}>{colDef.headerName}</label>
                            </div>
                        ))}
                    </div>
                )}
                <div className="ag-theme-alpine w-[100%] h-[70vh]">
                    <AgGridReact
                        ref={selectGridRef}
                        rowData={selectRowData}
                        columnDefs={selectColumnDefs}
                        rowSelection="multiple"
                        rowMultiSelectWithClick={true}
                        pagination={true}
                        paginationPageSize={100}
                    />
                </div>
            </div>
            <div className="mt-10 flex flex-col justify-start items-start">
                <form className="flex flex-col w-[400px] my-10 mx-auto p-5 border-2 border-sky-400 rounded-2xl" onSubmit={handleSubmit}>
                    <div className="flex items-center mb-2">
                        <label className="w-24 mr-2">사용 사유</label>
                        <Select className="w-full" classNamePrefix="select" placeholder="사용 사유" defaultValue="KIT 이름"
                                onChange={(choice) => setKitType(choice)}
                                options={sampleTypeOptions}/>
                    </div>
                    {
                        ! kitType["value"].startsWith("0") && (
                        <div className="flex items-center mb-2">
                            <label className="w-24 mr-2">Kit 번호</label>
                            <input className="w-full" type="text" value={kitNumber} onChange={e => setKitNumber(e.target.value)} placeholder="Kit 번호" />
                        </div> )
                    }
                    <div className="flex items-center mb-2">
                        <label className="w-24 mr-2">날짜</label>
                        <input className="w-full" type="date" value={date} onChange={e => setDate(e.target.value)} />           </div>
                    <div className="flex items-center mb-2">
                        <label className="w-24 mr-2">분석자</label>
                        <input className="w-full" type="text" value={analyst} onChange={e => setAnalyst(e.target.value)} placeholder="Kit 번호" />
                    </div>
                    <div className="flex items-center mb-2">
                        <label className="w-24 mr-2">{kitType["value"].startsWith("09") ? "변동 용량" : "사용용량"}</label>
                        <input className="w-full" type="number" value={usedVolume} onChange={e => setUsedVolume(e.target.value)} placeholder="사용 용량" />
                        <label className="w-fit">µl</label>
                    </div>
                    {kitType["value"].startsWith("09") && (<label className="w-full ml-3 mb-3 text-gray-400  text-sm">사용 기준 입니다. 줄면 양수 입니다.</label>)}
                    {
                        ! kitType["value"].startsWith("09") && (
                            <div className="flex items-center mb-2">
                                <label className="w-24 mr-2">희석배율</label>
                                <input className="w-full" type="number" value={dilution} onChange={e => setDilution(e.target.value)} placeholder="희석" />
                            </div>
                        )
                    }
                    <div className="flex items-center mb-2">
                        <label className="w-24 mr-2">메모</label>
                        <textarea className="w-full" value={memo} onChange={e => setMemo(e.target.value)} placeholder="메모" />
                    </div>
                    <button type="submit" className="mt-4 py-2 bg-sky-900 rounded-[9px] flex justify-center items-center text-white text-lg hover:bg-sky-950 hover:cursor-pointer">사용 정보 등록</button>
                </form>

                <div className="text-black text-4xl mx-auto">검체 사용 기록 표</div>
                <button className="mt-4 w-[200px] mb-2 bg-sky-600 rounded-[9px] flex justify-center items-center text-white text-sm hover:bg-sky-700 hover:cursor-pointer" onClick={onBtnUseExport}>현재 표 엑셀로 Export하기</button>
                <button className="w-[150px] mb-2 bg-red-600 rounded-[9px] flex justify-center items-center text-white text-sm hover:bg-red-700 hover:cursor-pointer" onClick={onBtnUseUpload}>검체 사용 등록하기</button>

                <div className="ag-theme-alpine w-[100%] h-[70vh]">
                    <AgGridReact
                        ref={useGridRef}
                        rowData={useRowData}
                        columnDefs={useColumnDefs}
                        pagination={true}
                        paginationPageSize={100}
                    />
                </div>
            </div>

            <div className="mt-10 flex flex-col justify-start items-start">
                <div className="text-black text-4xl mx-auto">검체 사용기록 데이터베이스</div>
                <button className="mt-4 w-[200px] mb-2 bg-sky-600 rounded-[9px] flex justify-center items-center text-white text-sm hover:bg-sky-700 hover:cursor-pointer" onClick={onBtnJoinExport}>현재 표 엑셀로 Export하기</button>
                <div className="flex flex-row">
                    <button className="w-[100px] mr-1 mb-1 bg-green-600 rounded-[9px] flex justify-center items-center text-white text-sm hover:bg-green-700 hover:cursor-pointer" onClick={handleTogglePopup3}>열 선택</button>
                    <button className="w-[150px] mr-1 mb-1 bg-red-600 rounded-[9px] flex justify-center items-center text-white text-sm hover:bg-red-700 hover:cursor-pointer" onClick={onRemoveUse}>선택 사용 기록 삭제</button>
                </div >
                {showColumnPopup3 && (
                    <div ref={popupRef3} className="mx-3 mb-5" >
                        {joinColumnDefs.map(colDef => (
                            <div key={colDef.field}>
                                <input
                                    type="checkbox"
                                    id={colDef.field}
                                    checked={joinColumnVisibility[colDef.field]}
                                    onChange={() => handleCheckboxChange3(colDef.field)}
                                />
                                <label htmlFor={colDef.field}>{colDef.headerName}</label>
                            </div>
                        ))}
                    </div>
                )}
                <div className="ag-theme-alpine w-[100%] h-[70vh]">
                    <AgGridReact
                        ref={joinedGridRef}
                        rowData={joinedRowData}
                        columnDefs={joinColumnDefs}
                        pagination={true}
                        paginationPageSize={100}
                        rowSelection="multiple"
                        rowMultiSelectWithClick={true}
                    />
                </div>
            </div>
            <br/>




        </div>
    );
};

export default SampleDataGrid;
