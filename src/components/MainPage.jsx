import React from 'react';
import { MainContainer, BigImage, MainButton } from './MainPageStyles';
import logo from '../img/bredis_logo_wide.png'

// Main page component
const MainPage = () => {
    return (
        <MainContainer>
            <BigImage src={logo} alt="Descriptive Image" />
            <MainButton primary>로그인</MainButton> 
            <MainButton>문의하기</MainButton>
        </MainContainer>
    );
};

export default MainPage;
