import React, {useState, useEffect, useRef} from 'react';
import axios from "../../api/axios";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import * as XLSX from 'xlsx';

const SampleDataGrid = () => {
    const [rowData, setRowData] = useState([]);
    const gridRef = useRef();
    const [columnDefs, setColumnDefs] = useState([
        { headerName: "id", field: "id", hide:true },
        { headerName: "내부고유코드", field: "inHouseUniqueSampleName", filter: "agTextColumnFilter", hide:false },
        { headerName: "입고일", field: "inHouseDate", filter: "agDateColumnFilter", hide:false },
        { headerName: "담당자", field: "personInCharge", filter: "agTextColumnFilter", hide:false },
        { headerName: "고객코드", field: "customerId", filter: "agTextColumnFilter", hide:false },
        { headerName: "박스", field: "boxInfo", filter: "agTextColumnFilter", hide:false },
        { headerName: "고객제공코드", field: "customerSampleCode", filter: "agTextColumnFilter", hide:false },
        { headerName: "샘플타입", field: "sampleType", filter: "agTextColumnFilter", hide:false },
        { headerName: "보관위치", field: "stockPosition", filter: "agTextColumnFilter", hide:false },
        { headerName: "추가 샘플코드", field: "uniqSampleCode", filter: "agTextColumnFilter", hide:false },
        { headerName: "키트", field: "kitInfo", filter: "agTextColumnFilter", hide:false },
        { headerName: "키트번호", field: "kitNumber", filter: "agNumberColumnFilter", hide:false },
        { headerName: "분석날짜", field: "testDate", filter: "agDateColumnFilter", hide:false  },
        { headerName: "기존 용량", field: "initialVolume", filter: "agNumberColumnFilter", hide:false },
        { headerName: "현재 용량", field: "currentVolume", filter: "agNumberColumnFilter", hide:false },
        { headerName: "사용 용량", field: "usingVolume", filter: "agNumberColumnFilter", hide:false },
        { headerName: "잔여 용량", field: "residualVolume", filter: "agNumberColumnFilter", hide:false },
        { headerName: "희석배율", field: "dilutionMagnification" , filter: "agNumberColumnFilter", hide:false},
        { headerName: "메모", field: "memo", hide:false },

    ]);
    const [showColumnPopup, setShowColumnPopup] = useState(false);
    const [columnVisibility, setColumnVisibility] = useState({});

    useEffect(() => {
        const initialVisibility = {};
        columnDefs.forEach(colDef => {
            initialVisibility[colDef.field] = true; // 모든 컬럼을 초기에 표시
        });
        initialVisibility["id"] = false;
        setColumnVisibility(initialVisibility);
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

    return (
        <div>
            <input
                id="excelfile"
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
            />
            <button onClick={sendFile}>파일 전송</button>
            <button onClick={onBtnExport}>Export to Excel</button>
            <br/>
            <button onClick={handleTogglePopup}>Columns</button>
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

            <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                    animateRows={true}
                    onGridReady={onGridReady} // 그리드 준비 이벤트 핸들러 추가
                />
                />
            </div>

        </div>
    );
};

export default SampleDataGrid;
