import React, {useEffect} from 'react';
import {BigImage, MainButton, MainContainer} from './MainPageStyles';
import logo from '../../img/bredis_logo_wide.png'

import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {LoginModalProvider, useLoginModal} from '../components/modals/LoginModalContext';
import {setUnauthorizedHandler} from '../../api/axios';
import Layout from "../components/Layout";

import Footer from "../components/Footer";
import DefaultPage from './DefaultPage';
import AdminDefaultPage from './admin/AdminDefaultPage';
import AdminHeader from '../components/admin/AdminHeader';
import AdminLoginPageModal from '../components/modals/AdminLoginModal';

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

    useEffect(() => {
        // setIsModalOpen(true)
        console.log(isModalOpen, location["pathname"])
        setUnauthorizedHandler(() => {
            setIsModalOpen(true);
        });
    }, [setIsModalOpen]);

    return (
        <div>
            <AdminHeader/>
                {isModalOpen && location["pathname"] !== 'admin/login' && <AdminLoginPageModal/>}
                {location["pathname"] === '/admin' && <AdminDefaultPage/>}
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default AdminHome;
