import React, {useEffect, useState} from "react";

function PurchaseDetailInput (props) {
    const [subtotal, setSubtotal] = useState(props.data.subtotal);
    const [tax, setTax] = useState(props.data.tax);
    const [total, setTotal] = useState(props.data.total);
    const [items, setItems] = useState(props.data.items);
    const [inputData, setInputData] = useState({"item": '', "size": '', "quantity": '', "unitPrice": '', "supplyValue": '', "tax": ''});

    useEffect(() => {
        let supplyValueSum = Array.from(document.querySelector(".purchaseDetailInputTable").querySelectorAll(".supplyValuedata"))
            .map(target => parseInt(target.innerText.replaceAll(',', '')))
            .reduce((v1, v2) => v1 + v2, 0)
        let taxSum = Array.from(document.querySelector(".purchaseDetailInputTable").querySelectorAll(".taxdata"))
            .map(target => parseInt(target.innerText.replaceAll(',', '')))
            .reduce((v1, v2) => v1 + v2, 0)

        setSubtotal(numberWithCommas(supplyValueSum))
        setTax(numberWithCommas(taxSum))
        setTotal(numberWithCommas(supplyValueSum + taxSum))
    }, [items]);

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function isNumeric(value) {
        return /^\d+$/.test(value);
    }

    function addItem() {
        if (!inputData.item) {alert("종목을 입력해주세요.");return}
        if (!inputData.size) {alert("규격을 입력해주세요.");return}
        if (!inputData.quantity) {alert("수량을 입력해주세요.");return}
        if (!inputData.unitPrice) {alert("단가를 입력해주세요.");return}
        if (!isNumeric(inputData.unitPrice)) {alert("단가는 0 이상의 값을 숫자로만 입력해주세요.");return}
        if (!inputData.supplyValue) {alert("공급가액을 입력해주세요.");return}
        if (!isNumeric(inputData.supplyValue)) {alert("공급가액은 0 이상의 값을 숫자로만 입력해주세요.");return}
        if (!inputData.tax) {alert("세액을 입력해주세요.");return}
        if (!isNumeric(inputData.tax)) {alert("세액은 0 이상의 값을 숫자로만 입력해주세요.");return}

        setItems(oldItems => [...oldItems,inputData] );
    }

    return (
        <div>
            <table id="purchase-detail" className="purchaseDetailInputTable text-[33363F] not-italic font-light text-[16px]" style={{border:'none', borderCollapse: 'collapse', borderSpacing:0, overflow: 'hidden', wordBreak: 'normal'}}>
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
                    items.map((item, index) =>(
                        <tr key={index}>
                            <td className="itemdata" style={{padding:'10px 35px', textAlign: 'left', verticalAlign: 'top'}}>{item.item}</td>
                            <td className="sizedata" style={{padding:'10px 35px', textAlign: 'right', verticalAlign: 'top'}}>{item.size}</td>
                            <td className="quantitydata" style={{padding:'10px 35px', textAlign: 'right', verticalAlign: 'top'}}>{item.quantity}</td>
                            <td className="unitPricedata" style={{padding:'10px 35px', textAlign: 'right', verticalAlign: 'top'}}>{item.unitPrice}</td>
                            <td className="supplyValuedata" style={{padding:'10px 35px', textAlign: 'right', verticalAlign: 'top'}}>{item.supplyValue}</td>
                            <td className="taxdata" style={{padding:'10px 35px', textAlign: 'right', verticalAlign: 'top'}}>{item.tax}</td>
                            <td style={{verticalAlign: 'top'}}>
                                <button className={`w-[34px] h-[26px] relative mt-[10px]`}
                                        onClick={()=> {
                                            const rows = [...items];
                                            rows.splice(index, 1);
                                            setItems(rows);}}>
                                    <div className="Rectangle7 w-[34px] h-[26px] left-0 top-0 absolute bg-white rounded-[9px] border border-zinc-500" />
                                    <div className=" w-[27px] h-[13px] left-[3px] top-[5px] absolute text-zinc-500 text-sm font-bold font-['Inter']">삭제</div>
                                </button>
                            </td>
                        </tr>
                    ))
                }
                <tr>
                    <td style={{padding:'10px 20px', textAlign: 'left', verticalAlign: 'top'}}>
                        <input defaultValue={inputData.item} onChange={(e)=> inputData.item = e.target.value} id="itemInput-new" type="text" placeholder="종목" className={`w-[320px] h-[25px] text-center text-sm text-gray-900 bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
                    </td>
                    <td style={{padding:'10px 20px', textAlign: 'left', verticalAlign: 'top'}}>
                        <input defaultValue={inputData.size} onChange={(e)=> inputData.size = e.target.value} id="sizeInput-new" type="text" placeholder="규격" className={`w-[70px] h-[25px] text-center text-sm text-gray-900 bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
                    </td>
                    <td style={{padding:'10px 20px', textAlign: 'left', verticalAlign: 'top'}}>
                        <input defaultValue={inputData.quantity} onChange={(e)=> inputData.quantity = e.target.value} id="quantityInput-new" type="number" placeholder="수량" className={`w-[70px] h-[25px] text-center text-sm text-gray-900 bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
                    </td>
                    <td style={{padding:'10px 20px', textAlign: 'left', verticalAlign: 'top'}}>
                        <input defaultValue={inputData.unitPrice} onChange={(e)=> inputData.unitPrice = e.target.value} id="unitPriceInput-new" type="text" placeholder="단가(원)" className={`w-[120px] h-[25px] text-center text-sm text-gray-900 bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
                    </td>
                    <td style={{padding:'10px 20px', textAlign: 'left', verticalAlign: 'top'}}>
                        <input defaultValue={inputData.supplyValue} onChange={(e)=> inputData.supplyValue = e.target.value} id="supplyValueInput-new" type="text" placeholder="공급가액(원)" className={`w-[120px] h-[25px] text-center text-sm text-gray-900 bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
                    </td>
                    <td style={{padding:'10px 20px', textAlign: 'left', verticalAlign: 'top'}}>
                        <input defaultValue={inputData.tax} onChange={(e)=> inputData.tax = e.target.value} id="taxInput-new" type="text" placeholder="세액(원)" className={`w-[120px] h-[25px] text-center text-sm text-gray-900 bg-gray-50 rounded-[4px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
                    </td>
                    <td style={{verticalAlign: 'top'}}>
                        <button className={`w-[34px] h-[26px] relative mt-[10px]`}
                                onClick={()=> addItem()}>
                            <div className="Rectangle7 w-[34px] h-[26px] left-0 top-0 absolute bg-white rounded-[9px] border border-zinc-500" />
                            <div className=" w-[27px] h-[13px] left-[3px] top-[5px] absolute text-zinc-500 text-sm font-bold font-['Inter']">추가</div>
                        </button>
                    </td>
                </tr>
                <tr style={{borderStyle: 'solid', borderTopWidth: '1px', borderColor: '#888988', fontWeight: 'normal'}}>
                    <td style={{padding:'10px 35px', textAlign: 'center', verticalAlign: 'top'}}>합계</td>
                    <td style={{padding:'10px 35px', textAlign: 'right', verticalAlign: 'top'}}></td>
                    <td style={{padding:'10px 35px', textAlign: 'right', verticalAlign: 'top'}}></td>
                    <td style={{padding:'10px 35px', textAlign: 'right', verticalAlign: 'top'}}></td>
                    <td id="subtotalValue" style={{padding:'10px 35px', textAlign: 'right', verticalAlign: 'top'}}>{subtotal}</td>
                    <td id="taxValue" style={{padding:'10px 35px', textAlign: 'right', verticalAlign: 'top'}}>{tax}</td>
                </tr>

                </tbody>
            </table>
            <div className="float-right mt-[20px]">
                <div className="text-zinc-500 text-lg font-[18px] font-['Inter'] ">합계금액(공급가액 + 세액)</div>
                <div id="totalValue" className="38262070 text-black text-[24px] font-medium font-['Inter']">₩{total}</div>
                <div className="inline-block text-neutral-700 text-xl font-normal font-['Inter'] mt-[5px]">견적서 첨부: </div>
                <input id="quotationFileInput" className={`inline-block my-[10px] mx-[30px]`} type="file" />
            </div>
        </div>
    )

}

export default PurchaseDetailInput