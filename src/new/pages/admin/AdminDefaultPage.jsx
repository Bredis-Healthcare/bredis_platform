import React from 'react'
import Layout from '../../components/Layout'
import { BigImage, MainButton, MainContainer } from '../../../components/MainPageStyles'
import { useNavigate } from 'react-router-dom';
import logo from '../../../img/bredis_logo_wide.png'


const AdminDefaultPage = () => {
    const navigate = useNavigate();
  return (
    <div>
        <Layout menuName = "홈">
                <MainContainer>
                    <BigImage src={logo} alt="Descriptive Image"/>
                    <MainButton onClick={() => navigate("/admin/login")}> 관리자 로그인</MainButton>
                </MainContainer>
        </Layout>
      
    </div>
  )
}

export default AdminDefaultPage
