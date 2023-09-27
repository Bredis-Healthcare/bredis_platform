import React from 'react'
import Layout from '../components/Layout'
import { BigImage, MainButton, MainContainer } from '../../components/MainPageStyles'
import { useNavigate } from 'react-router-dom';
import logo from '../../img/bredis_logo_wide.png'


const DefaultPage = () => {
    const navigate = useNavigate();
  return (
    <div>
        <Layout menuName = "홈">
                <MainContainer>
                    <BigImage src={logo} alt="Descriptive Image"/>
                    <MainButton onClick={() => navigate("/login")}> 회원 로그인</MainButton>
                    <MainButton onClick={() => navigate("/admin")}>관리자 페이지</MainButton>
                </MainContainer>
        </Layout>
      
    </div>
  )
}

export default DefaultPage
