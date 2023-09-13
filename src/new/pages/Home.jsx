import React, {useEffect} from 'react';
import {BigImage, MainButton, MainContainer} from '../../components/MainPageStyles';
import logo from '../../img/bredis_logo_wide.png'

import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {LoginModalProvider, useLoginModal} from '../../components/LoginModalContext';
import {setUnauthorizedHandler} from '../../api/axios';
import LoginPageModal from '../../components/modals/LoginModal';
import Layout from "../components/Layout";


const Home = () => {
    return (
        <LoginModalProvider>
            <MainPageContent/>
        </LoginModalProvider>
    );
};

const MainPageContent = () => {
    const {isModalOpen, setIsModalOpen} = useLoginModal();
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
        <Layout menuName="홈">
            {isModalOpen && location["pathname"] !== '/login' && <LoginPageModal/>}
            {location["pathname"] === '/' && <MainContainer>
                <BigImage src={logo} alt="Descriptive Image"/>
                <MainButton onClick={() => navigate("/login")}> 로그인</MainButton>
            </MainContainer>}
            <Outlet/>
        </Layout>
    );
};

export default Home;
