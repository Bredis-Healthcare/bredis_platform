import React from "react";

function TableHeaderCell(props) {
    let minWidth = props.minWidth ? props.minWidth : '80px'
    let maxWidth = props.maxWidth ? props.maxWidth : '150px'

    return (
        <th style={{minWidth: minWidth, maxWidth: maxWidth, backgroundColor: '#f0f0f0', borderColor: '#ccc', color:'#333', borderStyle: 'solid', borderWidth: '1px', fontFamily: 'Arial sansSerif', fontSize: '14px',
            fontWeight: 'bold', overflow:'hidden', padding:'8px 6px', wordBreak: 'break-all'}}>
            {props.value}
            {props.children}
        </th>
    )
}

export default TableHeaderCell