import React, {useEffect, useState} from 'react';
import {useLocation,} from "react-router-dom";
import axios from "../../api/axios";
import Layout from "../components/Layout";

export async function loader({ params }) {
    const orderId = params.orderId
    const isAdmin = false
    return { orderId , isAdmin};
}

export async function adminloader({ params }) {
    const orderId = params.orderId
    const isAdmin = true
    return { orderId, isAdmin };
}

const OrderDetail = () => {
    const [data, setData] = useState(null); // or your fetching logic
    const [statusList, setStatusList] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const location = useLocation()

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const request = await axios.get(`/orders/${location.state.orderNumber}/detail`);
            const statusRequest = await axios.get(`/protocols`);
    
            setData(request.data);
            setStatusList(statusRequest.data.orderStatusList)
            setSelectedOption(request.data.status)
            console.log("request", request, "statusRequest", statusRequest)
            
        } catch (error) {
            console.log("error", error)
        }
        
    };

    const [orderInfoOn, setToggleOrderInfo] = useState(false);  // 메뉴의 초기값을 false로 설정
    const [analysisInfoOn, setToggleAnalysisInfo] = useState(false);

    const toggleOrderInfo = () => {
        setToggleOrderInfo(orderInfoOn => !orderInfoOn); // on,off 개념 boolean
    }
    const toggleAnalysisInfo = () => {
        setToggleAnalysisInfo(analysisInfoOn => !analysisInfoOn);
    }

    return (
        <div>
            {data ? (
                <>
                    <Layout menuName="주문 내역 > 주문 상세" menuNameAddInfo={`${data.orderNumber}`}>
                        <div className="shadow-[0px_0px_4px_2px_rgba(0,0,0,0.25)] w-full max-w-[1222px] self-center flex flex-col ml-[0.5px] mt-[46px] px-[20px] py-[39px]">
                            <div className="w-full max-w-[1098px] mt-[-2px] self-center flex flex-col ml-[16px] mb-[47px]">
                                <div className="w-full max-w-[1047px] flex flex-col">
                                    <div className="flex max-sm:flex-col max-sm:items-stretch">
                                        <div className="flex flex-col items-stretch leading-[normal] w-[calc(55%_-_10px)] max-sm:w-full">
                                            <div className="flex flex-col mt-[12px] max-md:mt-[50px]">
                                                <div className="text-[#888988] not-italic font-normal text-[16px] flex flex-col ml-px max-md:ml-px">
                                                    202308181119-987204
                                                </div>
                                                <div className="text-black not-italic font-bold text-[22px] flex flex-col mt-[15px]">
                                                    {data.title}
                                                </div>
                                                <div className="text-[#888988] not-italic font-normal text-[16px] flex flex-col mt-[26px]">
                                                    의뢰내용
                                                </div>
                                                <div className="text-black not-italic font-normal text-[18px] self-stretch flex flex-col mt-[16px]">
                                                    {data.requestDetail}
                                                </div>


                                            </div>
                                        </div>
                                        <div className="flex flex-col items-stretch leading-[normal] w-[calc(45%_-_10px)] ml-[20px] max-sm:w-full">
                                            <div className="flex flex-col max-md:mt-[50px]">
                                                <div className="flex max-sm:flex-col max-sm:items-stretch">
                                                    <div className="flex flex-col items-stretch leading-[normal] w-[calc(78%_-_10px)] max-sm:w-full">
                                                        <div className="flex flex-col max-md:mt-px">
                                                            <div className="text-[#888988] not-italic font-normal text-[16px] ml-[-55px] self-center text-center flex flex-col">
                                                                주문일시
                                                            </div>
                                                            <div className="text-black not-italic font-light text-[22px] flex flex-col mt-[21px]">
                                                                {data.createdDatetime}
                                                            </div>
                                                            <div className="text-[#888988] not-italic font-normal text-[16px] ml-[-52px] self-center text-center flex flex-col mt-[36px]">
                                                                검체 정보
                                                            </div>
                                                            <div className="w-full flex flex-row gap-[4.732421875px] items-start flex-wrap mt-[3px] max-md:justify-center">
                                                                <div className="text-[#33363F] not-italic font-normal text-[18px] self-center text-center flex flex-col mt-px">
                                                                    검체 정보.pdf
                                                                </div>
                                                                <img
                                                                    loading="lazy"
                                                                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/09d437dc-f4b1-488e-8408-a412fc62c665?&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/09d437dc-f4b1-488e-8408-a412fc62c665?&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/09d437dc-f4b1-488e-8408-a412fc62c665?&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/09d437dc-f4b1-488e-8408-a412fc62c665?&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/09d437dc-f4b1-488e-8408-a412fc62c665?&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/09d437dc-f4b1-488e-8408-a412fc62c665?&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/09d437dc-f4b1-488e-8408-a412fc62c665?&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/09d437dc-f4b1-488e-8408-a412fc62c665?"
                                                                    className="aspect-[1] object-cover object-center w-[24px] self-center shrink-0 mt-[0.5px]"
                                                                />
                                                                {/*<div className="self-stretch flex flex-col text-[color:var(--White,#FFF)] not-italic font-bold text-[16px] mt-[-0px] pl-[17px] pr-[15px] py-[9px] rounded-[9px]">*/}
                                                                {/*    수정 업로드*/}
                                                                {/*</div>*/}
                                                                <div className="self-stretch flex flex-col mt-[-0px] ml-10 pl-[17px] pr-[15px] py-[9px] relative">
                                                                    <div className="Rectangle7 w-[117.46px] h-[35px] left-0 top-0 absolute bg-slate-500 rounded-[9px]" />
                                                                    <div className=" w-[108.84px] h-[17px] left-[16.16px] top-[6px] absolute text-white text-lg font-bold font-['Inter']">수정 업로드</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-stretch leading-[normal] w-[calc(22%_-_10px)] ml-[20px] max-sm:w-full">
                                                        <div className="flex flex-col mt-[4px] max-md:mt-[5px]">
                                                            <div className="text-[#888988] not-italic font-normal text-[16px] self-center text-center flex flex-col ml-[2px]">
                                                                상태
                                                            </div>
                                                            <div className="text-[#035772] not-italic font-bold text-[22px] self-stretch flex flex-col mt-[15px]">
                                                                {data.status}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*구매 내역*/}
                                    <div className="w-full flex flex-row gap-[2.98779296875px] items-start flex-wrap mt-[23px]">
                                        <div className="text-[#888988] not-italic font-normal text-[16px] self-center text-center flex flex-col -mt-px">
                                            구매 내역
                                        </div>
                                        <div className="aspect-[1] object-cover object-center w-[24px] self-stretch shrink-0"
                                             onClick={()=>toggleOrderInfo()}>
                                            <img className={`object-cover object-center ${orderInfoOn ? 'block' : 'hidden'}`} src="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Feede2644e07c40428a85a860afad0b8c?&width=200" alt="" />
                                            <img className={`object-cover object-center ${orderInfoOn ? 'hidden' : 'block'}`} src="https://cdn.builder.io/api/v1/image/assets/TEMP/46b519a3-c692-4c74-8f9f-12d963d49c9f?&width=200" alt="" />
                                        </div>
                                    </div>

                                    <div className={`orderInfo ${orderInfoOn ? 'block' : 'hidden'}`}>
                                        <div className="w-full max-w-[1097px] flex flex-col ml-[6px] mt-[20px] max-md:ml-[6px] relative">
                                            <div className="Line7 w-[1099px] h-[0px] left-[6px] top-[287px] absolute border border-zinc-500"></div>
                                            <div className="Line8 w-[1099px] h-[0px] left-0 top-[1px] absolute border border-zinc-500"></div>
                                            <div className="Line9 w-[1099px] h-[0px] left-[1px] top-[44px] absolute border border-zinc-500"></div>
                                            <div className="flex max-sm:flex-col max-sm:items-stretch">
                                                <div className="flex flex-col items-stretch leading-[normal] w-[calc(80%_-_10px)] max-sm:w-full">
                                                    <div className="flex flex-col max-md:mt-[50px]">
                                                        <div className="flex max-sm:flex-col max-sm:items-stretch">
                                                            <div className="flex flex-col items-stretch leading-[normal] w-[calc(41%_-_15px)] max-sm:w-full">
                                                                <div className="flex flex-col mt-px max-md:mt-[28px]">
                                                                    <div className="text-[#33363F] not-italic font-normal text-[16px] ml-[-13px] self-center text-center flex flex-col mt-3">
                                                                        종목
                                                                    </div>
                                                                    <div className="text-black not-italic font-normal text-[16px] flex flex-col mt-[38px]">
                                                                        SIMOA pTau181 Advantage v2. 1
                                                                    </div>
                                                                    <div className="text-black not-italic font-normal text-[16px] flex flex-col mt-[22px]">
                                                                        Simoa GFAP discovery assay
                                                                    </div>
                                                                    <div className="text-black not-italic font-normal text-[16px] flex flex-col ml-px mt-[22px] max-md:ml-px">
                                                                        NF-light V2
                                                                    </div>
                                                                    <div className="text-black not-italic font-normal text-[16px] self-stretch flex flex-col ml-px mt-[20px] max-md:ml-px">
                                                                        Neurology 2-Plex B (GFAP, NF-Light)
                                                                    </div>
                                                                    <div className="text-black not-italic font-normal text-[16px] flex flex-col mt-[20px]">
                                                                        Neurology 4-Plex E (Abeta40, 42, <br />
                                                                        GFAP, NF-Light)
                                                                    </div>
                                                                    <div className="text-[#33363F] not-italic font-normal text-[16px] ml-[-14px] self-center text-center flex flex-col mt-[38px]">
                                                                        합계
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col items-stretch leading-[normal] w-[calc(26%_-_15px)] ml-[20px] max-sm:w-full">
                                                                <div className="flex flex-col max-md:mt-[27px]">
                                                                    <div className="self-stretch flex flex-row gap-[20px] items-start fglex-wrap justify-between w-full max-w-[136px]">
                                                                        <div className="text-[#33363F] not-italic font-normal text-[16px] self-center text-center flex flex-col mt-3 min-w-[30px]">
                                                                            규격
                                                                        </div>
                                                                        <div className="text-[#33363F] not-italic font-normal text-[16px] self-center text-center flex flex-col mt-3 min-w-[32px]">
                                                                            수량
                                                                        </div>
                                                                    </div>
                                                                    <div className="w-full max-w-[115px] ml-[-3px] self-center flex flex-row gap-[20px] items-start flex-wrap justify-between mt-[39px]">
                                                                        <div className="flex flex-col min-w-[18px]">
                                                                            <div className="text-black not-italic font-normal text-[16px] self-center text-center  flex flex-col">
                                                                                ea
                                                                            </div>
                                                                            <div className="text-black not-italic font-normal text-[16px] self-center text-center  flex flex-col mt-[23px]">
                                                                                ea
                                                                            </div>
                                                                            <div className="text-black not-italic font-normal text-[16px] self-center text-center  flex flex-col mt-[23px]">
                                                                                ea
                                                                            </div>
                                                                            <div className="text-black not-italic font-normal text-[16px] self-center text-center  flex flex-col mt-[23px]">
                                                                                ea
                                                                            </div>
                                                                            <div className="text-black not-italic font-normal text-[16px] self-center text-center  flex flex-col mt-[34px]">
                                                                                ea
                                                                            </div>
                                                                        </div>
                                                                        <div className="self-stretch flex flex-col min-w-[5px]">
                                                                            <div className="text-black not-italic font-normal text-[16px] self-stretch flex flex-col">
                                                                                1
                                                                            </div>
                                                                            <div className="text-black not-italic font-normal text-[16px] self-stretch flex flex-col mt-[23px]">
                                                                                1
                                                                            </div>
                                                                            <div className="text-black not-italic font-normal text-[16px] self-stretch flex flex-col mt-[23px]">
                                                                                1
                                                                            </div>
                                                                            <div className="text-black not-italic font-normal text-[16px] self-stretch flex flex-col mt-[23px]">
                                                                                1
                                                                            </div>
                                                                            <div className="text-black not-italic font-normal text-[16px] self-stretch flex flex-col mt-[34px]">
                                                                                1
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col items-stretch leading-[normal] w-[calc(20%_-_15px)] ml-[20px] max-sm:w-full">
                                                                <div className="flex flex-col max-md:mt-[27px]">
                                                                    <div className="text-[#33363F] not-italic font-normal text-[16px] self-center text-center flex flex-col mt-3 ml-[5px]">
                                                                        단가(원)
                                                                    </div>
                                                                    <div className="text-black not-italic font-normal text-[16px] self-center text-center flex flex-col mt-[37px]">
                                                                        4,993,500
                                                                    </div>
                                                                    <div className="text-black not-italic font-normal text-[16px] self-center text-center  flex flex-col ml-[2px] mr-px mt-[23px] max-md:ml-[2px] max-md:mr-px">
                                                                        7,860,000
                                                                    </div>
                                                                    <div className="text-black not-italic font-normal text-[16px] self-center text-center flex flex-col ml-[2px] mt-[23px] max-md:ml-[2px]">
                                                                        5,706,000
                                                                    </div>
                                                                    <div className="text-black not-italic font-normal text-[16px] self-center text-center flex flex-col ml-[9px] mt-[23px] max-md:ml-[9px]">
                                                                        7,177,500
                                                                    </div>
                                                                    <div className="text-black not-italic font-normal text-[16px] self-center text-center self-stretch flex flex-col mr-[2px] mt-[34px] max-md:mr-[2px]">
                                                                        9,046,700
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col items-stretch leading-[normal] w-[calc(13%_-_15px)] ml-[20px] max-sm:w-full">
                                                                <div className="flex flex-col max-md:mt-[27px]">
                                                                    <div className="text-[#33363F] not-italic font-normal text-[16px] self-stretch flex flex-col ml-[2px] mt-3 max-md:ml-[2px]">
                                                                        공급가액(원)
                                                                    </div>
                                                                    <div className="text-black not-italic font-normal text-[16px] ml-[-2px] self-center text-center flex flex-col mt-[37px]">
                                                                        4,993,500
                                                                    </div>
                                                                    <div className="text-black not-italic font-normal text-[16px] self-center text-center flex flex-col -ml-px mt-[23px]">
                                                                        7,860,000
                                                                    </div>
                                                                    <div className="text-black not-italic font-normal text-[16px] self-center text-center flex flex-col mt-[23px]">
                                                                        5,706,000
                                                                    </div>
                                                                    <div className="text-black not-italic font-normal text-[16px] self-center text-center flex flex-col ml-[4px] mt-[23px]">
                                                                        7,177,500
                                                                    </div>
                                                                    <div className="text-black not-italic font-normal text-[16px] self-center text-center flex flex-col -ml-px mt-[34px]">
                                                                        9,046,700
                                                                    </div>
                                                                    <div className="text-black not-italic font-normal text-[16px] self-stretch flex flex-col mt-[38px]">
                                                                        34,783,700
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-stretch leading-[normal] w-[calc(20%_-_10px)] ml-[20px] max-sm:w-full">
                                                    <div className="flex flex-col max-md:mt-[50px]">
                                                        <div className="text-[#33363F] not-italic font-normal text-[16px] self-center text-center flex flex-col mt-3 ml-[22px]">
                                                            세액(원)
                                                        </div>
                                                        <div className="text-black not-italic font-normal text-[16px] self-center text-center flex flex-col ml-[30px] mt-[37px]">
                                                            499,350
                                                        </div>
                                                        <div className="text-black not-italic font-normal text-[16px] self-center text-center flex flex-col ml-[31px] mt-[23px]">
                                                            786,000
                                                        </div>
                                                        <div className="text-black not-italic font-normal text-[16px] self-center text-center flex flex-col ml-[32px] mt-[23px]">
                                                            570,600
                                                        </div>
                                                        <div className="text-black not-italic font-normal text-[16px] self-center text-center flex flex-col ml-[33px] mt-[23px]">
                                                            717,750
                                                        </div>
                                                        <div className="text-black not-italic font-normal text-[16px] self-center text-center flex flex-col ml-[31px] mt-[34px]">
                                                            904,670
                                                        </div>
                                                        <div className="text-black not-italic font-normal text-[16px] self-center text-center flex flex-col ml-[31px] mt-[38px] max-md:mr-[10px]">
                                                            3,478,370
                                                        </div>
                                                        <div className="text-[#888988] not-italic font-normal text-[16px] self-center text-center flex flex-col ml-px mt-[41px]">
                                                            합계금액(공급가액 + 세액)
                                                        </div>
                                                        <div className="text-black not-italic font-medium text-[29px] self-stretch flex flex-col mt-[17px]">
                                                            ₩38,262,070
                                                        </div>
                                                        <div className="w-full flex flex-row gap-[1.8076171875px] items-start flex-wrap ml-[10px] mt-[15px] max-md:ml-[10px]">
                                                            <div className="text-[#33363F] not-italic font-normal text-[18px] mt-[-0px] self-center text-center flex flex-col">
                                                                거래명세서 다운로드
                                                            </div>
                                                            <img
                                                                loading="lazy"
                                                                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/a1625ca3-edd2-485a-8d3b-a03a9ded7067?&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a1625ca3-edd2-485a-8d3b-a03a9ded7067?&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a1625ca3-edd2-485a-8d3b-a03a9ded7067?&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a1625ca3-edd2-485a-8d3b-a03a9ded7067?&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a1625ca3-edd2-485a-8d3b-a03a9ded7067?&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a1625ca3-edd2-485a-8d3b-a03a9ded7067?&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a1625ca3-edd2-485a-8d3b-a03a9ded7067?&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a1625ca3-edd2-485a-8d3b-a03a9ded7067?"
                                                                className="aspect-[1] object-cover object-center w-[24px] self-stretch shrink-0"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/*분석 결과*/}
                                    <div className="w-full flex flex-row gap-[1.2958984375px] items-start flex-wrap mt-[17px]">
                                        <div className="text-[#888988] not-italic font-normal text-[16px] self-center text-center flex flex-col -mt-px">
                                            분석 결과
                                        </div>
                                        <div className="aspect-[1] object-cover object-center w-[24px] self-stretch shrink-0"
                                             onClick={()=>toggleAnalysisInfo()}>
                                            <img className={`object-cover object-center ${analysisInfoOn ? 'block' : 'hidden'}`} src="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Feede2644e07c40428a85a860afad0b8c?&width=200" alt="" />
                                            <img className={`object-cover object-center ${analysisInfoOn ? 'hidden' : 'block'}`} src="https://cdn.builder.io/api/v1/image/assets/TEMP/46b519a3-c692-4c74-8f9f-12d963d49c9f?&width=200" alt="" />
                                        </div>
                                    </div>
                                    <div className={`analysisInfoOn ${analysisInfoOn ? 'block' : 'hidden'}`}>
                                        <div className="text-[#222] not-italic font-bold text-[20px] flex flex-col ml-[51px] mt-[30px] max-md:ml-[10px]">
                                            분석 결과
                                            <br />
                                        </div>
                                        <div className="Line7 w-[950px] flex flex-col ml-[45px] mt-3 border border-zinc-500"></div>
                                        <div className="relative">
                                            <div className="w-full max-w-[896px] pb-[-7px] flex flex-col text-black not-italic font-normal text-[16px] z-[1] ml-[39px] mt-[8px] pl-[12px] pr-[20px] pt-[21px] max-md:ml-[10px]">
                                                {data.analysisResult}
                                            </div>
                                            <div className="Line9 w-[950px] flex flex-col mt-5 ml-[45px] border border-zinc-500"></div>

                                            <div className="w-full mt-[13px] flex-col flex relative">
                                                <div className="left-[800px] top-0 absolute text-neutral-700 text-lg font-normal font-['Inter'] block">분석 보고서 다운로드</div>
                                                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/16efaad3-9492-49e4-a992-7de20eda52a3?&width=200" className="left-[950px] absolute aspect-[1] object-cover object-center w-[24px] self-stretch shrink-0"/>
                                            </div>

                                            <div className="text-[#222] not-italic font-bold text-[20px] flex flex-col ml-[51px] mt-[13px] max-md:ml-[10px]">
                                                분석 이력
                                                <br />
                                            </div>
                                            {
                                                data.analysisHistory.map(history => (<div>
                                                        <div className="w-[1000px] h-[0px] ml-[45px] flex flex-col mt-[25px] border border-zinc-500"/>
                                                        <div className="text-black not-italic font-semibold text-[16px] flex flex-col ml-[55px] mt-[19px] max-md:ml-[10px]">
                                                            {history.createdDatetime}
                                                        </div>
                                                        <div className="text-black not-italic font-normal text-[16px] flex flex-col ml-[54px] mt-[13px] max-md:ml-[10px]">
                                                            {history.text}
                                                        </div>
                                                    </div>
                                                ))
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Layout>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default OrderDetail;
