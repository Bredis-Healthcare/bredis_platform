import React, {useEffect, useState} from 'react';
import {useLocation,} from "react-router-dom";
import axios from "../../api/axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
    console.log(location.state)

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

    const toggleOrderInfo = () => {
        setToggleOrderInfo(orderInfoOn => !orderInfoOn); // on,off 개념 boolean
    }

    return (
        <div>
            {data ? (
                <>
                    <Header />
                    <div className="MenuHeader w-[1667px] h-[115px] left-0 top-[70px] absolute">
                        <div className="Rectangle6 w-[1667px] h-[115px] left-0 top-0 absolute bg-sky-900" />
                        <div className=" left-[33px] top-[57px] absolute text-white text-3xl font-bold">주문 내역 > 주문 상세</div>
                        <div className="987204 left-[323px] top-[63px] absolute"><span className="text-white text-2xl font-normal">{data.orderNumber}</span><span className="text-white text-2xl font-bold"> </span></div>
                    </div>
                    <div className="absolute top-[185px] w-[1667px]">
                        <div className={`w-full max-w-[1667px] flex flex-col p-px bg-neutral-100`}>
                            <div className="Contents shadow-[0px_0px_4px_2px_rgba(0,0,0,0.25)] w-full max-w-[1222px] self-center flex flex-col ml-[0.5px] mt-[46px] pt-[37px] pb-[32px] px-[20px]">
                                <div className="w-[1222px] h-[850px] ml-[58px] mr-[22px] max-md:mx-[10px] relative">
                                    <div className="SimoaPtau181AdvantageV214 left-0 top-[40px] absolute text-black text-2xl font-bold">{data.items}</div>
                                    <div className="Ab40Ab42GfapNflPtau181 left-0 top-[124px] absolute text-black text-xl font-normal">{data.request}</div>
                                    <div className="0503111932 left-[624px] top-[35px] absolute text-black text-2xl font-light">{data.createdDatetime}</div>
                                    <div className=" left-[933px] top-[34px] absolute text-lime-500 text-2xl font-bold">{data.status}</div>
                                    <div className="987204 left-0 top-[10px] absolute text-zinc-500 text-lg font-normal">{data.orderNumber}</div>
                                    <div className=" left-[703px] top-0 absolute text-zinc-500 text-lg font-normal">주문일시</div>
                                    <div className=" left-[701px] top-[91px] absolute text-zinc-500 text-lg font-normal">검체 정보</div>
                                    <div className=" w-[116px] h-[35px] left-[695px] top-[118px] absolute">
                                        <div className="Rectangle7 w-[79px] h-[35px] left-0 top-0 absolute bg-slate-500 rounded-[9px]" />
                                        <div className=" w-[101px] h-[17px] left-[15px] top-[6px] absolute text-white text-lg font-bold">업로드</div>
                                    </div>
                                    <div className=" left-0 top-[91px] absolute text-zinc-500 text-lg font-normal">의뢰내용</div>
                                    <div className=" left-[988px] top-[4px] absolute text-zinc-500 text-lg font-normal">상태</div>
                                    <div className=" w-[113px] h-5 left-[794px] top-[127px] absolute">
                                        <div className="ImportLight w-5 h-5 left-[93px] top-0 absolute flex-col justify-start items-start inline-flex" />
                                        <div className=" left-0 top-0 absolute text-zinc-500 text-base font-normal">양식 다운로드</div>
                                    </div>

                                    <div className=" w-24 h-6 left-0 top-[170px] absolute">
                                        <div className="ExpandDownLight w-6 h-6 left-[72px] top-1 absolute flex-col justify-start items-start inline-flex"
                                            onClick={()=>toggleOrderInfo()}>
                                            <img className={`object-cover object-center ${orderInfoOn ? 'block' : 'hidden'}`} src="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Feede2644e07c40428a85a860afad0b8c?&width=200" alt="" />
                                            <img className={`object-cover object-center ${orderInfoOn ? 'hidden' : 'block'}`} src="https://cdn.builder.io/api/v1/image/assets/TEMP/46b519a3-c692-4c74-8f9f-12d963d49c9f?&width=200" alt="" />
                                        </div>
                                        <div className=" left-0 top-0 absolute text-zinc-500 text-lg font-normal">구매 내역</div>
                                    </div>
                                    <div className={`orderInfo ${orderInfoOn ? 'block' : 'hidden'}`}>
                                        <div className=" w-[1105px] h-[322px] left-0 top-[210px] absolute">
                                            <div className="SimoaPtau181AdvantageV21 left-[5px] top-[61px] absolute text-black text-lg font-normal">SIMOA pTau181 Advantage v2. 1</div>
                                            <div className="Ea left-[349px] top-[61px] absolute text-black text-lg font-normal">ea</div>
                                            <div className=" left-[459px] top-[61px] absolute text-black text-lg font-normal">1</div>
                                            <div className=" left-[459px] top-[100px] absolute text-black text-lg font-normal">1</div>
                                            <div className=" left-[459px] top-[139px] absolute text-black text-lg font-normal">1</div>
                                            <div className=" left-[459px] top-[178px] absolute text-black text-lg font-normal">1</div>
                                            <div className=" left-[459px] top-[228px] absolute text-black text-lg font-normal">1</div>
                                            <div className="Ea left-[349px] top-[100px] absolute text-black text-lg font-normal">ea</div>
                                            <div className="Ea left-[349px] top-[139px] absolute text-black text-lg font-normal">ea</div>
                                            <div className="Ea left-[349px] top-[178px] absolute text-black text-lg font-normal">ea</div>
                                            <div className="Ea left-[349px] top-[228px] absolute text-black text-lg font-normal">ea</div>
                                            <div className="SimoaGfapDiscoveryAssay left-[5px] top-[100px] absolute text-black text-lg font-normal">Simoa GFAP discovery assay</div>
                                            <div className="NfLightV2 left-[5px] top-[139px] absolute text-black text-lg font-normal">NF-light V2</div>
                                            <div className="Neurology2PlexBGfapNfLight left-[5px] top-[178px] absolute text-black text-lg font-normal">Neurology 2-Plex B (GFAP, NF-Light)</div>
                                            <div className="Neurology4PlexEAbeta4042GfapNfLight left-[5px] top-[217px] absolute text-black text-lg font-normal">Neurology 4-Plex E (Abeta40, 42, <br/>GFAP, NF-Light)</div>
                                            <div className="993500 left-[565px] top-[61px] absolute text-black text-lg font-normal">4,993,500</div>
                                            <div className="993500 left-[744px] top-[61px] absolute text-black text-lg font-normal">4,993,500</div>
                                            <div className="860000 left-[567px] top-[100px] absolute text-black text-lg font-normal">7,860,000</div>
                                            <div className="706000 left-[567px] top-[139px] absolute text-black text-lg font-normal">5,706,000</div>
                                            <div className="177500 left-[574px] top-[178px] absolute text-black text-lg font-normal">7,177,500</div>
                                            <div className="046700 left-[565px] top-[228px] absolute text-black text-lg font-normal">9,046,700</div>
                                            <div className="860000 left-[747px] top-[100px] absolute text-black text-lg font-normal">7,860,000</div>
                                            <div className="706000 left-[747px] top-[139px] absolute text-black text-lg font-normal">5,706,000</div>
                                            <div className="177500 left-[755px] top-[178px] absolute text-black text-lg font-normal">7,177,500</div>
                                            <div className="046700 left-[746px] top-[228px] absolute text-black text-lg font-normal">9,046,700</div>
                                            <div className="350 left-[995px] top-[61px] absolute text-black text-lg font-normal">499,350</div>
                                            <div className="000 left-[997px] top-[100px] absolute text-black text-lg font-normal">786,000</div>
                                            <div className="600 left-[997px] top-[139px] absolute text-black text-lg font-normal">570,600</div>
                                            <div className="750 left-[1002px] top-[178px] absolute text-black text-lg font-normal">717,750</div>
                                            <div className="670 left-[996px] top-[228px] absolute text-black text-lg font-normal">904,670</div>
                                            <div className="783700 left-[741px] top-[296px] absolute text-black text-lg font-normal">34,783,700</div>
                                            <div className="478370 left-[989px] top-[296px] absolute text-black text-lg font-normal">3,478,370</div>
                                            <div className=" w-[54px] h-[26px] left-[131px] top-[8px] absolute text-neutral-700 text-lg font-normal">종목</div>
                                            <div className=" w-[54px] h-[26px] left-[131px] top-[296px] absolute text-neutral-700 text-lg font-normal">합계</div>
                                            <div className=" w-[54px] h-[26px] left-[342px] top-[8px] absolute text-neutral-700 text-lg font-normal">규격</div>
                                            <div className=" w-[54px] h-[26px] left-[446px] top-[8px] absolute text-neutral-700 text-lg font-normal">수량</div>
                                            <div className=" w-[88px] h-[26px] left-[583px] top-[8px] absolute text-neutral-700 text-lg font-normal">단가(원)</div>
                                            <div className=" w-[111px] h-[26px] left-[743px] top-[8px] absolute text-neutral-700 text-lg font-normal">공급가액(원)</div>
                                            <div className=" w-[111px] h-[26px] left-[992px] top-[8px] absolute text-neutral-700 text-lg font-normal">세액(원)</div>
                                            <div className="Line7 w-[1099px] h-[0px] left-[6px] top-[287px] absolute border border-zinc-500"></div>
                                            <div className="Line8 w-[1099px] h-[0px] left-0 top-[1px] absolute border border-zinc-500"></div>
                                            <div className="Line9 w-[1099px] h-[0px] left-[1px] top-[44px] absolute border border-zinc-500"></div>
                                        </div>
                                        <div className=" left-[902px] top-[565px] absolute text-zinc-500 text-lg font-normal">합계금액(공급가액 + 세액)</div>
                                        <div className="38262070 left-[897px] top-[595px] absolute text-black text-[32px] font-medium">₩38,262,070</div>
                                        <div className=" w-[196px] h-6 left-[907px] top-[647px] absolute">
                                            <div className="ImportLight w-6 h-6 left-[172px] top-0 absolute flex-col justify-start items-start inline-flex" />
                                            <div className=" left-0 top-0 absolute text-neutral-700 text-xl font-normal">거래명세서 다운로드</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Footer/>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default OrderDetail;
