import styled from 'styled-components';

export const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background : white;
    padding: 10px 50px;
    position: sticky;
    top: 0;
    z-index: 10;
    height : 100px;
`;

export const LogoTitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 20px; // gap between the logo and title
`;

export const Logo = styled.img`
    width: 200px;
    height: auto;
    cursor: pointer;
`;

export const HeaderTitle = styled.h1`
    font-size: 24px;
    cursor: pointer;
`;

export const HeaderButtonContainer = styled.div`
    display: flex;
    gap: 20px;
`;

export const HeaderButton = styled.button`
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;
