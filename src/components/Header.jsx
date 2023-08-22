import React, { useEffect } from 'react';
import { HeaderContainer, Logo, HeaderTitle, HeaderButtonContainer, HeaderButton, LogoTitleContainer } from './HeaderStyles';
import { useNavigate } from 'react-router-dom';
import logo from '../img/bredis_logo_wide.png'
import { useCookies } from 'react-cookie';
import axios from "../api/axios";


const Header = () => {
    const navigate = useNavigate();
	const [cookies, setCookie, removeCookie] = useCookies(['login']);

    useEffect(()=>{

    }, [])

    const handleLogout = async () => {
        const request = await axios.post('logout')
        removeCookie(['login']);
        navigate("/");
    }

    return (
        <HeaderContainer>
            <LogoTitleContainer onClick={() => navigate("/")}>
                <Logo src={logo} alt="Bredis Logo" />
                <HeaderTitle >연구서비스</HeaderTitle>
            </LogoTitleContainer>
            <HeaderButtonContainer>
                <HeaderButton onClick={() => navigate("/Mypage")} >내 정보</HeaderButton>
                <HeaderButton onClick={() => navigate("/")} >서비스 소개</HeaderButton>
                {
                    cookies?.login ? 
                    <HeaderButton onClick={() => handleLogout()} >로그아웃</HeaderButton> :
                    <></>
                }
            </HeaderButtonContainer>
        </HeaderContainer>
    );
};

export default Header;
