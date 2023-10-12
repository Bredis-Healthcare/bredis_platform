import React from 'react'
import Layout from '../../components/Layout'
import { BigImage, MainButton, MainContainer } from '../MainPageStyles'
import { useNavigate } from 'react-router-dom';
import logo from '../../../img/bredis_logo_wide.png'


const AdminDefaultPage = () => {
    const navigate = useNavigate();
  return (
    <div>
        <Layout menuName = "홈">
                <div className="flex flex-col items-center justify-center h-full w-full min-h-[60vh]">
                    <img className="w-[30%] mb-[20px]" src={logo} alt="Descriptive Image"/>
                    <MainButton onClick={() => navigate("/admin/login")}> 관리자 로그인</MainButton>
                </div>
        </Layout>
      
    </div>
  )
}

export default AdminDefaultPage
