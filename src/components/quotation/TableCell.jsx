function TableCell(props) {
    let minWidth = props.minWidth ? props.minWidth : '80px'
    let maxWidth = props.maxWidth ? props.maxWidth : '150px'
    let rowNumber = props.rowNumber

    return (
        <td className={`rowNumber${rowNumber}`} style={{maxWidth: maxWidth, minWidth: minWidth, backgroundColor: '#fff', borderColor: '#ccc', color:'#333', borderStyle: 'solid', borderWidth: '1px', fontFamily: 'Arial sansSerif',  fontSize: '14px',
            fontWeight: 'normal', overflow: 'visible', padding:'8px 6px', wordBreak: 'break-all', textAlign: 'center', verticalAlign:'top'}}>
            {props.value}
            {props.children}
        </td>
    )
}

export default TableCell