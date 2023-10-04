import React, { useEffect } from 'react';
import { MainContainer, BigImage, MainButton } from './MainPageStyles';
import logo from '../img/bredis_logo_wide.png'

import  {useNavigate, Outlet, useLocation  } from "react-router-dom";
import { LoginModalProvider } from './LoginModalContext';
import { useLoginModal } from './LoginModalContext';
import { setUnauthorizedHandler } from '../api/axios';
import LoginPageModal from './modals/LoginModal';
import Header from './Header';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

// Main page component

const MainPage = () => {
    return (
        <LoginModalProvider>
            <MainPageContent />
        </LoginModalProvider>
    );
};

const MainPageContent = () => {
    const { isModalOpen, setIsModalOpen } = useLoginModal();
    const navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
        // setIsModalOpen(true)
        console.log(isModalOpen, location["pathname"])
        setUnauthorizedHandler(() => {
            setIsModalOpen(true);
        });
    }, [setIsModalOpen]);

    return (
        <>
            <Header/>
            <NavigationBar/>
            {isModalOpen && location["pathname"] !== '/login' && <LoginPageModal />}
            { location["pathname"] === '/' && <MainContainer>
                <BigImage src={logo} alt="Descriptive Image" />
                <MainButton onClick={() => navigate("/login")}> 로그인</MainButton> 
                <MainButton onClick={() => navigate("/admin/login")}> 관리자 로그인</MainButton> 
            </MainContainer> }
            <Outlet/>
            {/* Router 상에서 children에 정의해놓은 것들이 Outlet자리에 들어간다. 그러면 렌더링도 걔네들만 될 것.*/}
            <Footer/>
        </>
    );
};

export default MainPage;
