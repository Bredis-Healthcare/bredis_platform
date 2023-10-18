import React, {useEffect} from 'react';

import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {LoginModalProvider, useLoginModal} from '../components/modals/LoginModalContext';
import {setUnauthorizedHandler} from '../../api/axios';
import LoginPageModal from '../components/modals/LoginModal';

import Header from "../components/Header";
import Footer from "../components/Footer";
import DefaultPage from './DefaultPage';
import {useCookies} from "react-cookie";
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
    const [cookies, setCookie, removeCookie] = useCookies(['login']);

    useEffect(() => {
        // setIsModalOpen(true)
        setUnauthorizedHandler(() => {
            setIsModalOpen(true);
            removeCookie('login', {path:'/'});
        });
    }, [setIsModalOpen]);

    return (
        <div className ="w-full justify-center relative ">
            <Header/>
                {isModalOpen && (location["pathname"] !== '/login' || location["pathname"] !== '/') && <LoginPageModal/>}
                {location["pathname"] === '/' && <DefaultPage/>}
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Home;
