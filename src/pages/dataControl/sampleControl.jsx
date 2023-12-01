import React, {useState, useEffect, useRef} from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from "../../api/axios";
import { AgGridReact } from 'ag-grid-react';
import * as XLSX from 'xlsx';

const SampleDataGrid = () => {
    const [rowData, setRowData] = useState([]);
    const [selectRowData, setSelectRowData] = useState([]);
    const gridRef = useRef();
    const selectGridRef = useRef();
    const [columnDefs, setColumnDefs] = useState([
        { headerName: "id", field: "id", hide:true },
        { headerName: "내부고유코드", field: "inHouseUniqueSampleName", filter: "agTextColumnFilter", hide:false, headerCheckboxSelection: true,
            checkboxSelection: true, },
        { headerName: "입고일", field: "inHouseDate", filter: "agDateColumnFilter", hide:true },
        { headerName: "담당자", field: "personInCharge", filter: "agTextColumnFilter", hide:true },
        { headerName: "고객코드", field: "customerId", filter: "agTextColumnFilter", hide:false },
        { headerName: "박스", field: "boxInfo", filter: "agTextColumnFilter", hide:false },
        { headerName: "고객제공코드", field: "customerSampleCode", filter: "agTextColumnFilter", hide:true },
        { headerName: "샘플타입", field: "sampleType", filter: "agTextColumnFilter", hide:false },
        { headerName: "보관위치", field: "stockPosition", filter: "agTextColumnFilter", hide:false },
        { headerName: "추가 샘플코드", field: "uniqSampleCode", filter: "agTextColumnFilter", hide:true },
        { headerName: "키트", field: "kitInfo", filter: "agTextColumnFilter", hide:true },
        { headerName: "키트번호", field: "kitNumber", filter: "agNumberColumnFilter", hide:true },
        { headerName: "분석날짜", field: "testDate", filter: "agDateColumnFilter", hide:true  },
        { headerName: "기존 용량", field: "initialVolume", filter: "agNumberColumnFilter", hide:true },
        { headerName: "현재 용량", field: "currentVolume", filter: "agNumberColumnFilter", hide:true },
        { headerName: "사용 용량", field: "usingVolume", filter: "agNumberColumnFilter", hide:true },
        { headerName: "잔여 용량", field: "residualVolume", filter: "agNumberColumnFilter", hide:true },
        { headerName: "희석배율", field: "dilutionMagnification" , filter: "agNumberColumnFilter", hide:true},
        { headerName: "메모", field: "memo", hide:false },

    ]);
    const [showColumnPopup, setShowColumnPopup] = useState(false);
    const [columnVisibility, setColumnVisibility] = useState({});

    // 오늘 날짜를 기본값으로 설정합니다.
    const today = new Date().toISOString().split('T')[0];

    // 각 항목에 대한 state를 생성합니다.
    const [kitType, setKitType] = useState('kit종류');
    const [kitNumber, setKitNumber] = useState('kit번호');
    const [date, setDate] = useState(today);
    const [analyst, setAnalyst] = useState('분석자');
    const [usedVolume, setUsedVolume] = useState(80);
    const [dilution, setDilution] = useState(1);
    const [memo, setMemo] = useState('');

    // 폼 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { kitType, kitNumber, date, analyst, usedVolume, dilution, memo };
        console.log(data);
        // 여기에 데이터를 처리하는 로직을 추가하세요.
    };

    useEffect(() => {
        const initialVisibility = {};
        columnDefs.forEach(colDef => {
            initialVisibility[colDef.field] = !colDef.hide; // 모든 컬럼을 초기에 표시
        });
        setColumnVisibility(initialVisibility);
        console.log(initialVisibility)
        fetchData();
    }, []);

    const onGridReady = (params) => {
        console.log("Grid is ready:", params.api);
    };


    // 엑셀로 내보내기 함수
    const onBtnExport = () => {
        const gridApi = gridRef.current.api;
        const columnApi = gridRef.current.columnApi;
        const displayedColumns = columnApi.getAllDisplayedColumns();
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

    const onBtnSelected = () => {
        // 선택된 행의 노드를 가져옵니다.
        const selectedNodes = gridRef.current.api.getSelectedNodes();
        // 선택된 노드에서 데이터만 추출합니다.
        const selectedData = selectedNodes.map(node => node.data);

        // 화면에 표시되고 있는 컬럼의 정보를 가져옵니다.
        const displayedColumns = gridRef.current.columnApi.getAllDisplayedColumns();
        // 컬럼의 field 값을 기준으로 필터링된 컬럼 데이터를 생성합니다.
        const exportedData = selectedData.map(rowData => {
            let exportedRowData = {};
            displayedColumns.forEach(col => {
                const colId = col.getColId();
                exportedRowData[colId] = rowData[colId];
            });
            return exportedRowData;
        });
        gridRef.current.api.deselectAll();

        // 새롭게 생성된 데이터를 state에 저장하여 표를 업데이트합니다.
        setSelectRowData(selectRowData.concat(exportedData));
    };


    const fetchData = async () => {
        try {
            const response = await axios.get('sampleLoad');
            setRowData(response.data);
            // console.log("data", response.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
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
        const columnApi = gridRef.current.columnApi;
        columnApi.setColumnVisible(field, isVisible);
    };

    const handleTogglePopup = () => {
        setShowColumnPopup(!showColumnPopup);
    };

    const handleCheckboxChange = (field) => {
        const updatedVisibility = {
            ...columnVisibility,
            [field]: !columnVisibility[field]
        };
        setColumnVisibility(updatedVisibility);
        gridRef.current.columnApi.setColumnVisible(field, updatedVisibility[field]);
    };

    const handleColumnToggle = (e) => {
        const columnApi = gridRef.current.columnApi;
        columnDefs.forEach(colDef => {
            const isChecked = e.target.value.includes(colDef.field);
            columnApi.setColumnVisible(colDef.field, isChecked);
        });
    };

    const onClearSelection = () => {
        gridRef.current.api.deselectAll();
    };

    const onSelectClear = () => {
        setSelectRowData([])
    };

    return (
        <div>
            <input
                id="excelfile"
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
            />
            <button onClick={sendFile}>파일 전송</button>
            <br/>
            <button onClick={onBtnExport}>Export to Excel</button>
            <br/>
            <button onClick={handleTogglePopup}>Columns</button>
            <br/>
            <button onClick={onClearSelection}>선택 해제</button>
            {showColumnPopup && (
                <div>
                    {columnDefs.map(colDef => (
                        <div key={colDef.field}>
                            <input
                                type="checkbox"
                                id={colDef.field}
                                checked={columnVisibility[colDef.field]}
                                onChange={() => handleCheckboxChange(colDef.field)}
                            />
                            <label htmlFor={colDef.field}>{colDef.headerName}</label>
                        </div>
                    ))}
                </div>
            )}
            <div className="ag-theme-alpine w-[100%] h-[70vh]">
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={100}
                    animateRows={true}
                    onGridReady={onGridReady} // 그리드 준비 이벤트 핸들러 추가
                    rowSelection="multiple"
                    rowMultiSelectWithClick={true}
                />

            </div>
            <button onClick={onBtnSelected}>선택한 행 추가 하기</button>
            <br/>
            <button onClick={onSelectClear}>선택 초기화</button>
            <div className="ag-theme-alpine w-[100%] h-[70vh]">
                <AgGridReact
                    ref={selectGridRef}
                    rowData={selectRowData}
                    columnDefs={columnDefs}
                />
            </div>
            <form className="flex flex-col w-[400px]" onSubmit={handleSubmit}>
                <div className="flex items-center mb-2">
                    <label className="w-24 mr-2">Kit 종류</label>
                    <input type="text" value={kitType} onChange={e => setKitType(e.target.value)} placeholder="Kit 종류" />
                </div>
                <div className="flex items-center mb-2">
                    <label className="w-24 mr-2">Kit 번호</label>
                    <input type="text" value={kitNumber} onChange={e => setKitNumber(e.target.value)} placeholder="Kit 번호" />
                </div>
                <div className="flex items-center mb-2">
                    <label className="w-24 mr-2">날짜</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} />           </div>
                <div className="flex items-center mb-2">
                    <label className="w-24 mr-2">분석자</label>
                    <input type="text" value={kitNumber} onChange={e => setKitNumber(e.target.value)} placeholder="Kit 번호" />
                </div>
                <div className="flex items-center mb-2">
                    <label className="w-24 mr-2">사용용량</label>
                    <input type="number" value={usedVolume} onChange={e => setUsedVolume(e.target.value)} placeholder="사용 용량" />
                    <label className="">µl</label>
                </div>
                <div className="flex items-center mb-2">
                    <label className="w-24 mr-2">희석배율</label>
                    <input type="number" value={dilution} onChange={e => setDilution(e.target.value)} placeholder="희석" />
                </div>
                <div className="flex items-center mb-2">
                    <label className="w-24 mr-2">메모</label>
                    <textarea value={memo} onChange={e => setMemo(e.target.value)} placeholder="메모" />
                </div>
                <button type="submit" className="mt-4">키트 만들기</button>
            </form>





        </div>
    );
};

export default SampleDataGrid;
