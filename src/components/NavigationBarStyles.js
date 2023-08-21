import styled from 'styled-components';

export const NavBarContainer = styled.div`
    display: flex;
    z-index: 10;
    top:120px;
    gap: 10px;
    position: sticky;
    background-color: #f7f7f7;
`;

export const NavItem = styled.div`
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;
