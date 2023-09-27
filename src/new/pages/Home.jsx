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
import DefaultPage from './DefaultPage';

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
                {location["pathname"] === '/' && <DefaultPage/>}
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Home;
