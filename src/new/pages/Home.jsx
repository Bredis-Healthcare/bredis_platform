import React, {useEffect} from 'react';
import {MainContainer, BigImage, MainButton} from '../../components/MainPageStyles';
import logo from '../../img/bredis_logo_wide.png'

import {useNavigate, Outlet, useLocation} from "react-router-dom";
import {LoginModalProvider} from '../../components/LoginModalContext';
import {useLoginModal} from '../../components/LoginModalContext';
import {setUnauthorizedHandler} from '../../api/axios';
import LoginPageModal from '../../components/modals/LoginModal';
import Header from '../components/Header';
import Footer from '../components/Footer';


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
        <>
            <div className="1 w-[1667px] h-[1072px] relative bg-neutral-100">
                <div className="MenuHeader w-[1667px] h-[115px] left-0 top-[70px] absolute">
                    <div className="Rectangle6 w-[1667px] h-[115px] left-0 top-0 absolute bg-sky-900"/>
                    <div className=" left-[33px] top-[57px] absolute text-white text-3xl font-bold">홈</div>
                </div>
                <Header/>
                {isModalOpen && location["pathname"] !== '/login' && <LoginPageModal/>}
                {location["pathname"] === '/' && <MainContainer>
                    <BigImage src={logo} alt="Descriptive Image"/>
                    <MainButton onClick={() => navigate("/login")}> 로그인</MainButton>
                </MainContainer>}
                <Outlet/>
                <Footer/>
            </div>
        </>
    );
};

export default Home;
