import React from 'react';
import { HeaderContainer, Logo, HeaderTitle, HeaderButtonContainer, HeaderButton, LogoTitleContainer } from './HeaderStyles';
import { useNavigate } from 'react-router-dom';
import logo from '../img/bredis_logo_wide.png'


const Header = () => {
    const navigate = useNavigate();

    return (
        <HeaderContainer>
            <LogoTitleContainer onClick={() => navigate("/")}>
                <Logo src={logo} alt="Bredis Logo" />
                <HeaderTitle >연구서비스</HeaderTitle>
            </LogoTitleContainer>
            <HeaderButtonContainer>
                <HeaderButton onClick={() => navigate("/Mypage")} >내 정보</HeaderButton>
                <HeaderButton onClick={() => navigate("/")} >서비스 소개</HeaderButton>
            </HeaderButtonContainer>
        </HeaderContainer>
    );
};

export default Header;
