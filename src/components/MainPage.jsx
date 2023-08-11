import React from 'react';
import { MainContainer, BigImage, MainButton } from './MainPageStyles';
import logo from '../img/bredis_logo_wide.png'

import  {useNavigate  } from "react-router-dom";

// Main page component
const MainPage = () => {
    const navigate = useNavigate();

    return (
        <MainContainer>
            <BigImage src={logo} alt="Descriptive Image" />
            <MainButton onClick={() => navigate("/login")}> 로그인</MainButton> 
            <MainButton onClick={() => navigate("/admin/login")}> 관리자 로그인</MainButton> 
        </MainContainer>
    );
};

export default MainPage;
