import React, {useState} from 'react'
import Layout from '../components/Layout'
import {useNavigate} from 'react-router-dom';
import coverImage from '../../img/info/coverImage.png'
import img1000x from '../../img/info/1000x.png'
import pos1 from '../../img/info/pos1.png'
import pos2 from '../../img/info/pos2.png'
import pos3 from '../../img/info/pos3.png'
import hdx from '../../img/info/hdx.png'
import companys from '../../img/info/companys.png'
import design1 from '../../img/info/design1.png'

import AskButton from '../components/AskButton';
import {FadeLoader} from 'react-spinners';

const DefaultPage = () => {
    const [loadedImages, setLoadedImages] = useState(0);
    const handleImageLoaded = () => {
        setLoadedImages(loadedImages + 1);
        // console.log(loadedImages, totalImages===loadedImages)
    };
    return (
        <div>
            <Layout menuName="홈">
                {false ?
                    <div children="w-full h-full justify-center items-center">
                        <FadeLoader color="#1C434D" height={15} width={5} radius={2} margin={2}/>
                    </div>
                    :
                    <div className="bg-white flex-col relative justify-start items-center gap-[170px] inline-flex w-full  pb-[50px] mt-[-2.5rem] mb-[-40px]">
                        <div className="w-full  bg-gray-200 relative aspect-video ">
                            <img className="w-full" src={coverImage} onLoad={handleImageLoaded} alt="coverImage"/>
                            <div className="left-[10%] bottom-[10%] absolute">
                                <span className="text-stone-950 text-6xl font-bold ">WE MAKE<br/></span>
                                <span className="text-white text-6xl font-bold ">BRE</span>
                                <span className="text-stone-950 text-6xl font-bold ">AKTHROUGH &<br/></span>
                                <span className="text-white text-6xl font-bold ">DIS</span>
                                <span className="text-stone-950 text-6xl font-bold">RUPTIVE<br/>INNOVATIONS</span>
                            </div>
                        </div>
                        <div className="w-[90%] h-[3px] bg-zinc-400 opacity-60"/>
                        <div className="w-[90%] justify-start items-center gap-[33px] inline-flex lg:flex-row md:flex-col">
                            <div className="flex-col justify-start items-start lg:gap-40 md:gap-3 inline-flex">
                                <div className="text-black text-4xl font-bold">기존 플레이트 Immunoassay의<br/> 약 1,000배 이상의 민감도</div>
                                <div className="text-black text-xl font-bold">㈜브레디스헬스케어의 Digital ELISA 연구분석 서비스는 Single Molecule Array Technology를 사용하는 SimoaTM HD-X를 활용하여 Femto
                                    Molar(fM) 수준, 기존의 ELISA의 약 1,000배 이상의 감도의 초고감도로 혈액 및 척수액 바이오마커의 농도를 측정하는 서비스입니다
                                </div>
                            </div>
                            <img className="lg:w-[50%] md:w-[80%]" onLoad={handleImageLoaded} src={img1000x} alt="img1000x"/>
                        </div>
                        <div className="w-[90%] h-[3px] bg-zinc-400 opacity-60"/>
                        <div className="w-[90%] flex-col justify-start items-center gap-[78px] inline-flex">
                            <div className="text-center text-black lg:text-5xl md:text:3xl font-bold">초고감도 바이오마커 분석이 필요한 연구를<br/>가장 적합한 방식으로 지원합니다</div>
                            <div className="w-[100%] relative">
                                <img className="w-full " onLoad={handleImageLoaded} src={design1} alt="design1"/>
                                <div className="w-[100%] top-[10%] absolute justify-center items-center gap-[5%] inline-flex ">
                                    <div
                                        className="w-[20%] aspect-square bg-[#D7F0F5] border-[#004E5A] border-[1px] rounded-full flex flex-col justify-center items-center overflow-visible ">
                                        <div className="m-4 lg:text-4xl md:text-2xl font-bold ">서비스 기획</div>
                                        <div className="m-4 text-neutral-400 text-center lg:text-lg md:text-base font-normal ">연구분석 목적에 꼭 맞는 분석 서비스를 제안드립니다.</div>
                                    </div>
                                    <div
                                        className="w-[20%] aspect-square bg-[#D7F0F5] border-[#004E5A] border-[1px] rounded-full flex flex-col justify-center items-center overflow-visible">
                                        <div className="m-4 lg:text-4xl md:text-2xl font-bold ">검체 수거</div>
                                        <div className="m-4 text-neutral-400 text-center lg:text-lg md:text-base  font-normal ">전문인력이 안전하고 정확하게 분석대상 검체를 수거합니다.</div>
                                    </div>
                                    <div
                                        className="w-[20%] aspect-square bg-[#D7F0F5] border-[#004E5A] border-[1px] rounded-full flex flex-col justify-center items-center overflow-visible">
                                        <div className="m-4 lg:text-4xl md:text-2xl font-bold ">연구분석</div>
                                        <div className="m-4 text-neutral-400 text-center lg:text-lg md:text-base  font-normal ">온습도, 청정도가 통제된 클린룸 환경에서 정밀하게 분석합니다.</div>
                                    </div>
                                    <div
                                        className="w-[20%] aspect-square bg-[#D7F0F5] border-[#004E5A] border-[1px] rounded-full flex flex-col justify-center items-center overflow-visible last:gap-0">
                                        <div className="m-4 lg:text-4xl md:text-2xl font-bold ">결과보고</div>
                                        <div className="m-4 text-neutral-400 text-center lg:text-lg md:text-base font-normal ">분석결과 Raw Data와 <br/>연구분석 목적에 따른 추가분석을 제공합니다.</div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[90%] h-[45px] justify-center items-start gap-[15%] inline-flex text-[#A9A9A9] lg:text-2xl md:text-xl font-normal">
                                <div className="w-[20%] h-[3rem] bg-[#DEE3E5] rounded-[10px] flex items-center justify-center ">1-2 weeks</div>
                                <div className="w-[40%] h-[3rem] bg-[#DEE3E5] rounded-[10px] flex items-center justify-center ">2-4 weeks</div>
                                <div className="w-[20%] h-[3rem] bg-[#DEE3E5] rounded-[10px] flex items-center justify-center ">3 days</div>
                            </div>
                        </div>
                        <div className="w-[90%] h-[3px] bg-zinc-400 opacity-60"/>
                        <div className="w-[90%] justify-center items-start lg:gap-[6%] md:gap-20 flex lg:flex-row md:flex-col  break-keep">
                            <div className="lg:w-[30%] md:[90%]  flex-col justify-center items-center gap-6 inline-flex relative">
                                <div className="text-center text-black text-4xl font-bold ">Experienced</div>
                                <div className="text-center text-black text-2xl font-bold  ">10,000건 이상의 분석 경험으로 글로벌 최고수준 연구협력이 가능합니다.</div>
                                <div className="w-[100%] p-4 rounded-2xl border-2 border-zinc-400 flex-col justify-center items-center gap-[20px] flex">
                                    <div className="text-center text-neutral-500 lg:text-base md:text-2xl font-bold">글로벌 Top Journal 개제 논문 연구 참여 경험 다수 의료기관, 연구기관, 대학, 기업과 다양한 연구협력
                                        경험
                                    </div>
                                    <img className="w-[90%]" onLoad={handleImageLoaded} src={pos1} alt="pos1"/>
                                </div>
                            </div>
                            <div className="lg:w-[30%] md:[90%]  flex-col justify-center items-center gap-6 inline-flex relative">
                                <div className="text-center text-black text-4xl font-bold ">Professional</div>
                                <div className="text-center text-black text-2xl font-bold ">온습도, 청정도가 통제된 클린룸 활용 등 검체의 변질과 분석오류 가능성을 최소화합니다.</div>
                                <div className="w-[100%] p-4 rounded-2xl border-2 border-zinc-400 flex-col justify-center items-center gap-[20px] flex">
                                    <div className="text-center text-neutral-500 text-base md:text-2xl font-bold">자체 전문인력으로 구성된 분석팀 보유<br/>제조사 국내 영업점 공인 국내 독보적 최고수준 <br/>Qualification
                                        장비 자체보유 (2023.07 Qual. 기준)
                                    </div>
                                    <img className="w-[90%]" onLoad={handleImageLoaded} src={pos2} alt="pos2"/>
                                </div>
                            </div>
                            <div className="lg:w-[30%] md:[90%]  flex-col justify-center items-center gap-6 inline-flex relative">
                                <div className="text-center text-black text-4xl font-bold ">Insightful</div>
                                <div className="text-center text-black text-2xl font-bold ">기 보유 자체 데이터분석모형을 통해 분석 결과 관련 추가 인사이트를 제공합니다.</div>
                                <div className="w-[100%] p-4 rounded-2xl border-2 border-zinc-400 flex-col justify-center items-center gap-[20px] flex">
                                    <div className="text-center"><span className="text-neutral-500 text-base md:text-2xl font-bold ">자체보유 임상데이터 기반 데이터분석모형 보유<br/></span><span
                                        className="text-neutral-500 text-[10px] font-bold font-['Inter']">(알츠하이머병 및 인지기능 장애 관련 1,000명 이상 데이터 기반)</span></div>
                                    <img className="w-[90%]" onLoad={handleImageLoaded} src={pos3} alt="pos3"/>
                                </div>
                            </div>
                        </div>
                        <div className="w-[90%] h-[3px] bg-zinc-400 opacity-60"/>
                        <div className="w-[90%] flex-col justify-start items-center gap-[50px] inline-flex">
                            <div className="text-center text-black lg:text-5xl md:text-3xl font-bold break-keep">자사 클린룸 내 자체보유 장비로 분석 서비스를 제공합니다</div>
                            <img className="w-[80%] h-[100%]" onLoad={handleImageLoaded} src={hdx} alt="hdx"/>
                        </div>
                        <div className="w-[90%] h-[3px] bg-zinc-400 opacity-60"/>
                        <div className="w-[90%] flex-col justify-start items-center gap-[50px] inline-flex">
                            <div className="text-center text-black lg:text-5xl md:text-3xl font-bold break-keep">국내외 상급종합병원에 서비스를 공급하고 있으며 다양한 방식으로 연구기관, 의료기관, 글로벌 기업과 협업하고 있습니다
                            </div>
                            <img className="w-[80%] h-[100%]" onLoad={handleImageLoaded} src={companys} alt="companys"/>
                        </div>

                        <AskButton/>
                    </div>}
            </Layout>


        </div>
    )
}

export default DefaultPage
