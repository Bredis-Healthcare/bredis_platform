function TableCell(props) {
    return (
        <td style={{backgroundColor: '#fff', borderColor: '#ccc', color:'#333', borderStyle: 'solid', borderWidth: '1px', fontFamily: 'Arial sansSerif',  fontSize: '14px',
            fontWeight: 'normal', overflow: 'hidden', padding:'10px 7px', wordBreak: 'break-all', textAlign: 'center', verticalAlign:'top'}}>
            {props.value}
            {props.children}
        </td>
    )
}

export default TableCell