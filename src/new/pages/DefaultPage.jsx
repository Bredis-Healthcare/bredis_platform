import React from 'react'
import Layout from '../components/Layout'
import { BigImage, MainButton, MainContainer } from './MainPageStyles'
import { useNavigate } from 'react-router-dom';
import logo from '../../img/bredis_logo_wide.png'
import coverImage from '../../img/info/coverImage.png'
import img1000x from '../../img/info/1000x.png'
import pos1 from '../../img/info/pos1.png'
import pos2 from '../../img/info/pos2.png'
import pos3 from '../../img/info/pos3.png'
import hdx from '../../img/info/hdx.png'
import companys from '../../img/info/companys.png'
import design1 from '../../img/info/design1.png'

import AskButton from '../components/AskButton';
import { motion } from "framer-motion"


const DefaultPage = () => {
    const navigate = useNavigate();
  return (
    <div>
        <Layout menuName = "홈">
                {/* <MainContainer>
                    <BigImage src={logo} alt="Descriptive Image"/>
                    <MainButton onClick={() => navigate("/login")}> 회원 로그인</MainButton>
                    <MainButton onClick={() => navigate("/admin")}>관리자 페이지</MainButton>
                </MainContainer> */}
                <div className="bg-white flex-col justify-start items-center gap-[200px] inline-flex w-full mt-[-157px] pb-[300px] mb-[-40px]">
                  <div className="w-[101%] h-[50%] relative">
                      <img className="w-full" src={coverImage} alt="coverImage"/>
                      <div className="left-[10%] bottom-[10%] absolute">
                        <span className="text-stone-950 text-6xl font-bold ">WE MAKE<br/></span>
                        <span className="text-white text-6xl font-bold ">BRE</span>
                        <span className="text-stone-950 text-6xl font-bold ">AKTHROUGH &<br/></span>
                        <span className="text-white text-6xl font-bold ">DIS</span>
                        <span className="text-stone-950 text-6xl font-bold">RUPTIVE<br/>INNOVATIONS</span>
                      </div>
                  </div>
                  <div className="w-[90%] h-[3px] bg-zinc-400 opacity-60"/>
                  <div className="w-[80%] justify-start items-center gap-[33px] inline-flex">
                    <div className="flex-col justify-start items-start gap-40 inline-flex">
                      <div className="text-black text-[44.76px] font-bold">기존 플레이트 Immunoassay의<br/>약 1,000배 이상의 민감도</div>
                      <div className="text-black text-xl font-bold">㈜브레디스헬스케어의 Digital ELISA 연구분석 서비스는 Single Molecule Array Technology를 사용하는 SimoaTM HD-X를 활용하여 Femto Molar(fM) 수준, 기존의 ELISA의 약 1,000배 이상의 감도의 초고감도로 혈액 및 척수액 바이오마커의 농도를 측정하는 서비스입니다</div>
                    </div>
                    <img className="w-[50%] " src={img1000x} alt="img1000x"/>
                  </div>
                  <div className="w-[90%] h-[3px] bg-zinc-400 opacity-60"/>
                  <div className="w-[90%] flex-col justify-start items-center gap-[78px] inline-flex">
                    <div className="text-center text-black text-[44.76px] font-bold font-['Inter']">초고감도 바이오마커 분석이 필요한 연구를<br/>가장 적합한 방식으로 지원합니다</div>
                    <div className="w-[100%] relative">
                      <img className="w-full " src={design1} alt="design1"/>
                      <div className="w-full left-[3%] top-[10%] absolute justify-start items-start gap-[5%] inline-flex">
                        <div className="w-[20%]  h-[289.11px] relative transition-all hover:scale-[1.1]">
                          <div className="w-[100%] h-[100%] left-0 top-0 absolute bg-sky-100 rounded-full" />
                          <div className="left-[49.49px] top-[90.29px] absolute text-center text-black text-[38.86px] font-bold ">서비스 기획</div>
                          <div className="w-[227.47px] left-[30.39px] top-[165.83px] absolute text-center text-neutral-400 text-lg font-bold ">연구분석 목적에 꼭 맞는 분석 서비스를 제안드립니다.</div>
                        </div>
                        <div className="w-[289.11px] h-[289.11px] relative transition-all hover:scale-[1.1] ">
                          <div className="w-[289.11px] h-[289.11px] left-0 top-0 absolute bg-sky-100 rounded-full" />
                          <div className="left-[67.49px] top-[90.29px] absolute text-center text-black text-[38.86px] font-bold">검체 수거</div>
                          <div className="w-[227.47px] left-[30.39px] top-[165.83px] absolute text-center text-neutral-400 text-lg font-bold ">전문인력이 안전하고 정확하게 분석대상 검체를 수거합니다.</div>
                        </div>
                        <div className="w-[289.11px] h-[289.11px] relative transition-all hover:scale-[1.1]">
                          <div className="w-[289.11px] h-[289.11px] left-0 top-0 absolute bg-sky-100 rounded-full" />
                          <div className="left-[71.49px] top-[90.29px] absolute text-center text-black text-[38.86px] font-bold ">연구분석</div>
                          <div className="w-[227.47px] left-[30.39px] top-[165.83px] absolute text-center text-neutral-400 text-lg font-bold ">온습도, 청정도가 통제된 클린룸 환경에서 정밀하게 분석합니다.</div>
                        </div>
                        <div className="w-[289.11px] h-[289.11px] relative transition-all hover:scale-[1.1] ">
                          <div className="w-[289.11px] h-[289.11px] left-0 top-0 absolute bg-sky-100 rounded-full" />
                          <div className="left-[71.49px] top-[90.29px] absolute text-center text-black text-[38.86px] font-bold ">결과보고</div>
                          <div className="w-[227.47px] left-[30.39px] top-[165.83px] absolute text-center text-neutral-400 text-lg font-bold ">분석결과 Raw Data와 <br/>연구분석 목적에 따른 추가분석을 제공합니다.</div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[90%] h-[45px] justify-center items-start gap-[10%] inline-flex">
                      <div className="w-[231px] h-[45px] relative">
                        <div className="w-[231px] h-[45px] left-0 top-0 absolute bg-zinc-300 rounded-[10px]" />
                        <div className="left-[40px] top-[5px] absolute text-center text-white text-3xl font-bold ">1-2 weeks</div>
                      </div>
                      <div className="w-[592px] h-[45px] relative">
                        <div className="w-[592px] h-[45px] left-0 top-0 absolute bg-zinc-300 rounded-[10px]" />
                        <div className="w-[251.15px] left-[169.14px] top-[5px] absolute text-center text-white text-3xl font-bold ">2-4 weeks</div>
                      </div>
                      <div className="w-[231px] h-[45px] relative">
                        <div className="w-[231px] h-[45px] left-0 top-0 absolute bg-zinc-300 rounded-[10px]" />
                        <div className="left-[66px] top-[5px] absolute text-center text-white text-3xl font-bold">3 days</div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[90%] h-[3px] bg-zinc-400 opacity-60"/>
                  <div className="w-[90%] justify-center items-start gap-[6%] inline-flex ">
                    <div className="w-[30%] flex-col justify-center items-center gap-[24.20px] inline-flex relative">
                      <div className="text-center text-black text-[41.73px] font-bold ">Experienced</div>
                      <div className="text-center text-black text-[22px] font-bold ">10,000건 이상의 분석 경험으로<br/>글로벌 최고수준 연구협력이 가능합니다.</div>
                      <div className="w-[100%] h-[300px] rounded-2xl border-2 border-zinc-400 flex-col justify-center items-center gap-[20px] flex">
                          <div className="text-center text-neutral-500 text-base font-bold">글로벌 Top Journal 개제 논문 연구 참여 경험 다수<br/>의료기관, 연구기관, 대학, 기업과 다양한 연구협력 경험</div>
                          <img className="w-[90%]" src={pos1} alt="pos1" />
                      </div>
                    </div>
                    <div className="w-[30%] flex-col justify-center items-center gap-[24.20px] inline-flex relative">
                      <div className="text-center text-black text-[41.73px] font-bold ">Professional</div>
                      <div className="text-center text-black text-[22px] font-bold ">온습도, 청정도가 통제된 클린룸 활용 등<br/>검체의 변질과 분석오류 가능성을 최소화합니다.</div>
                      <div className="w-[100%] h-[300px] rounded-2xl border-2 border-zinc-400 flex-col justify-center items-center gap-[20px] flex">
                          <div className="text-center text-neutral-500 text-base font-bold">자체 전문인력으로 구성된 분석팀 보유<br/>제조사 국내 영업점 공인 국내 독보적 최고수준 <br/>Qualification 장비 자체보유 (2023.07 Qual. 기준)</div>
                          <img className="w-[90%]" src={pos2} alt="pos2" />
                      </div>
                    </div>
                    <div className="w-[30%] flex-col justify-center items-center gap-[24.20px] inline-flex relative">
                      <div className="text-center text-black text-[41.73px] font-bold ">Insightful</div>
                      <div className="text-center text-black text-[22px] font-bold ">기 보유 자체 데이터분석모형을 통해<br/>분석 결과 관련 추가 인사이트를 제공합니다.</div>
                      <div className="w-[100%] h-[300px] rounded-2xl border-2 border-zinc-400 flex-col justify-center items-center gap-[20px] flex">
                          <div className="text-center"><span className="text-neutral-500 text-base font-bold ">자체보유 임상데이터 기반 데이터분석모형 보유<br/></span><span className="text-neutral-500 text-[10px] font-bold font-['Inter']">(알츠하이머병 및 인지기능 장애 관련 1,000명 이상 데이터 기반)</span></div>
                          <img className="w-[90%]" src={pos3} alt="pos3"  />
                      </div>
                    </div>
                  </div>
                  <div className="w-[90%] h-[3px] bg-zinc-400 opacity-60"/>
                  <div className="w-[90%] flex-col justify-start items-center gap-[50px] inline-flex">
                    <div className="text-center text-black text-[40px] font-bold ">자사 클린룸 내 자체보유 장비로 분석 서비스를 제공합니다</div>
                    <img className="w-[80%] h-[100%]" src={hdx} alt="hdx" />
                  </div>
                  <div className="w-[90%] h-[3px] bg-zinc-400 opacity-60"/>
                  <div className="w-[90%] flex-col justify-start items-center gap-[50px] inline-flex">
                    <div className="text-center text-black text-[40px] font-bold ">국내외 상급종합병원에 서비스를 공급하고 있으며<br/>다양한 방식으로 연구기관, 의료기관, 글로벌 기업과 협업하고 있습니다</div>
                    <img className="w-[80%] h-[100%]" src={companys} alt="companys" />
                  </div>
                </div>
                <AskButton/>
        </Layout>
        
      
    </div>
  )
}

export default DefaultPage
