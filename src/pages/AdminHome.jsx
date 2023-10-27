import React, {useEffect} from 'react';

import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {LoginModalProvider, useLoginModal} from '../components/login/LoginModalContext';
import {setUnauthorizedHandler} from '../api/axios';

import Footer from "../components/layout/Footer";
import AdminHeader from '../components/layout/AdminHeader';
import AdminLoginPageModal from '../components/login/AdminLoginModal';
import {useCookies} from "react-cookie";
import AdminLoginPage from "./login/AdminLoginPage";

export async function loader({ params }) {
    const isAdmin = false;
    return { isAdmin };
  }

  export async function adminloader({ params }) {
    const isAdmin = true;
    return { isAdmin };
  }

const AdminHome = () => {
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
        //console.log(isModalOpen, location["pathname"])
        setUnauthorizedHandler(() => {
            setIsModalOpen(true);
            removeCookie('login', {path:'/'});
        });
    }, [setIsModalOpen]);

    return (
        <div className ="w-full justify-center relative " >
            <AdminHeader/>
                {isModalOpen && (location["pathname"] !== 'admin/login' && location["pathname"] !== '/admin') && <AdminLoginPageModal/>}
                {location["pathname"] === '/admin' && <AdminLoginPage/>}
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default AdminHome;
