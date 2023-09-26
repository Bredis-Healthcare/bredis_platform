import React, {useEffect} from 'react';
import {BigImage, MainButton, MainContainer} from '../../components/MainPageStyles';
import logo from '../../img/bredis_logo_wide.png'

import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {LoginModalProvider, useLoginModal} from '../../components/LoginModalContext';
import {setUnauthorizedHandler} from '../../api/axios';
import LoginPageModal from '../../components/modals/LoginModal';
import Layout from "../components/Layout";

import Header from "../components/Header";
import Footer from "../components/Footer";

export async function loader({ params }) {
    const isAdmin = false;
    return { isAdmin };
  }

  export async function adminloader({ params }) {
    const isAdmin = true;
    return { isAdmin };
  }

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
        <div>
            <Header/>
                {isModalOpen && location["pathname"] !== '/login' && <LoginPageModal/>}
                {location["pathname"] === '/' && <div>
                    <div className="MenuHeader w-[1667px] h-[115px]  bg-sky-900 relative">
                        <div className=" left-[33px] top-[57px] absolute text-white text-3xl font-bold font-['Inter']">홈</div>
                    </div>
                    <div className="relative w-[1667px] flex flex-col p-px bg-neutral-100 py-10">
                    <MainContainer>
                            <BigImage src={logo} alt="Descriptive Image"/>
                            <MainButton onClick={() => navigate("/login")}> 로그인</MainButton>
                            <MainButton onClick={() => navigate("/admin-page/login")}>관리자 로그인</MainButton>
                    </MainContainer>
                    
                    </div>
                </div>
                }
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Home;
