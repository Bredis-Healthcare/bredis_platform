import axios from "../../api/axios";
import icon_download from "../../img/icon_download.png"
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
        } else if (props.messageId) {
            request = await axios.get(`/threads/messages/${props.messageId}/files?fileName=${props.fileName}`);
        } else {
            return
        }
        if(request)
        {   
            const downloadUrl = request.data.link;
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', `FileName.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

        }
    }

    return (
        <div className="inline-block mx-[10px]">
            <button>
                <div className={`inline-block py-[2px] my-[5px] text-[18px]`} style={{textAlign: 'center', textDecoration: 'none'}}
                     onClick={() => handleDownloadClick()}>
                    {props.title}
                </div>
                <img src={icon_download} className="inline-block aspect-[1] object-cover object-center w-[22px] ml-[5px] mb-[4px] self-center shrink-0"/>
            </button>
        </div>
    )
}

export default DownloadButton