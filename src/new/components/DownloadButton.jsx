import axios from "../../api/axios";
import React from "react";

function DownloadButton (props) {
    async function handleDownloadClick() {
        let request;
        if (props.orderNumber) {
            if (!props.fileName) {
                alert('아직 파일이 등록되지 않았습니다.');
                return;
            }
            request = await axios.get(`/orders/${props.orderNumber}/files?type=${props.fileType}&fileName=${props.fileName}`);
        } else if (props.quotationRequestId) {
            request = await axios.get(`/quotation-requests/${props.quotationRequestId}/file-link`);
        } else {
            return
        }

        const downloadUrl = request.data.link;
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', `FileName.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    }

    return (
        <div>
            <button>
                <div className={`inline-block py-[2px] my-[5px] text-[18px]`} style={{textAlign: 'center', textDecoration: 'none'}}
                     onClick={() => handleDownloadClick()}>
                    {props.title}
                </div>
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/09d437dc-f4b1-488e-8408-a412fc62c665?&width=400" className="inline-block aspect-[1] object-cover object-center w-[22px] ml-[5px] mb-[4px] self-center shrink-0"/>
            </button>
        </div>
    )
}

export default DownloadButton