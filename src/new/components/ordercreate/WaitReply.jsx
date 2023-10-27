import checkIcon from "../../../resources/img/check_icon.png"

function WaitReply () {
    return (
        <div className="top-[250px] h-[1000px] relative">
            <img src={checkIcon}
                 className="object-cover object-center max-w-[452px] flex ml-auto mr-auto" />
            <div className="text-[#888988] text-center not-italic font-bold text-[27px] self-center flex flex-col ml-[40px] mt-[134px]">
                견적 요청서가 정상적으로 접수되었습니다.<br/>영업일 기준 3일 내에 담당자가 회신을 드릴 예정입니다.
            </div>
        </div>
    )
}

export default WaitReply