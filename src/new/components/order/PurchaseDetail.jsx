import React from "react";
import DownloadButton from "../DownloadButton";

function PurchaseDetail (props) {
    let data = props.data
    return (
        <div>
            <table className="text-[33363F] not-italic font-light text-[16px]" style={{border:'none', borderCollapse: 'collapse', borderSpacing:0, overflow: 'hidden', wordBreak: 'normal'}}>
                <thead>
                <tr style={{borderStyle: 'solid', borderBottomWidth: '1px', borderColor: '#888988'}}>
                    <th style={{fontWeight: 'normal', padding: '10px 5px', textAlign: 'center', verticalAlign: 'center'}}>종목</th>
                    <th style={{fontWeight: 'normal', padding: '10px 5px', textAlign: 'center', verticalAlign: 'center'}}>규격</th>
                    <th style={{fontWeight: 'normal', padding: '10px 5px', textAlign: 'center', verticalAlign: 'center'}}>수량</th>
                    <th style={{fontWeight: 'normal', padding: '10px 5px', textAlign: 'center', verticalAlign: 'center'}}>단가(원)</th>
                    <th style={{fontWeight: 'normal', padding: '10px 5px', textAlign: 'center', verticalAlign: 'center'}}>공급가액(원)</th>
                    <th style={{fontWeight: 'normal', padding: '10px 5px', textAlign: 'center', verticalAlign: 'center'}}>세액(원)</th>
                </tr>
                </thead>
                <tbody>
                {
                    data ? data.items.map((item, index)=>(
                        <tr key={index}>
                            <td style={{padding:'10px 40px', textAlign: 'left', verticalAlign: 'top'}}>{item.item}</td>
                            <td style={{padding:'10px 40px', textAlign: 'right', verticalAlign: 'top'}}>{item.size}</td>
                            <td style={{padding:'10px 40px', textAlign: 'right', verticalAlign: 'top'}}>{item.quantity}</td>
                            <td style={{padding:'10px 40px', textAlign: 'right', verticalAlign: 'top'}}>{item.unitPrice}</td>
                            <td style={{padding:'10px 40px', textAlign: 'right', verticalAlign: 'top'}}>{item.supplyValue}</td>
                            <td style={{padding:'10px 40px', textAlign: 'right', verticalAlign: 'top'}}>{item.tax}</td>
                        </tr>
                    )) : <></>
                }

                {
                    data ? <tr style={{borderStyle: 'solid', borderTopWidth: '1px', borderColor: '#888988', fontWeight: 'normal'}}>
                        <td style={{padding:'10px 40px', textAlign: 'center', verticalAlign: 'top'}}>합계</td>
                        <td style={{padding:'10px 40px', textAlign: 'right', verticalAlign: 'top'}}></td>
                        <td style={{padding:'10px 40px', textAlign: 'right', verticalAlign: 'top'}}></td>
                        <td style={{padding:'10px 40px', textAlign: 'right', verticalAlign: 'top'}}></td>
                        <td style={{padding:'10px 40px', textAlign: 'right', verticalAlign: 'top'}}>{data.subtotal}</td>
                        <td style={{padding:'10px 40px', textAlign: 'right', verticalAlign: 'top'}}>{data.tax}</td>
                    </tr> : <></>
                }

                </tbody>
            </table>
            {
                data ? <div className="float-right mt-[20px]">
                    <div className="text-zinc-500 text-lg font-normal font-['Inter'] ">합계금액(공급가액 + 세액)</div>
                    <div className="38262070 text-black text-[32px] font-medium font-['Inter']">₩{data.total}</div>
                    {
                        props.quotationRequestId ?
                            <DownloadButton title='견적서 다운로드' quotationRequestId={props.quotationRequestId} />
                            : <></>
                    }
                </div> : <></>
            }
        </div>
    )

}

export default PurchaseDetail