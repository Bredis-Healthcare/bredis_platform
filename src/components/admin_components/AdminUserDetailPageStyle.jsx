import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px;
    background-color: #f5f5f5;
    max-width: 800px;
    margin: auto;
`;

export const Header = styled.h1`
    font-size: 24px;
    margin-bottom: 20px;
`;

export const SubHeader = styled.h2`
    font-size: 20px;
    margin-bottom: 10px;
`;

export const Information = styled.p`
    margin: 5px 0;
    font-size: 16px;
`;

export const OrderList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

export const OrderItem = styled.li`
    background-color: #ffffff;
    border: 1px solid #d4d4d4;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 4px;
`;

export default {
    Container,
    Header,
    SubHeader,
    Information,
    OrderList,
    OrderItem
};