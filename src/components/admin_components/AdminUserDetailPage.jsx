import React, { useState, useEffect } from 'react';
import {
    Container,
    Header,
    SubHeader,
    Information,
    OrderList,
    OrderItem
} from './AdminUserDetailPageStyle';
import axios from "../../api/axios";
import {
    useLoaderData,
} from 'react-router-dom'

export async function loader({ params }) {
    const userId = params.userId
    return { userId };
  }

const AdminUserDetailPage = () => {
    const { userId } = useLoaderData();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetchData();
    }, [userId]);

    const fetchData = async () => {
        const request = await axios.get(`/members/${userId}/detail`);
        console.log('request', request.data);
        setUserData(request.data)
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Header>User Details</Header>
            <SubHeader>{userData.name}</SubHeader>
            <Information>Email: {userData.email}</Information>
            <Information>Mobile: {userData.mobile}</Information>
            <Information>Organization: {userData.organization}</Information>
            <Information>Department: {userData.department}</Information>
            <Information>Position: {userData.position}</Information>
            <Information>Created At: {userData.createdDatetime}</Information>
            <Information>Admin Memo: {userData.adminMemo ? userData.adminMemo : "N/A"}</Information>
            
            <SubHeader>Order History</SubHeader>
            <OrderList>
                {userData.orderHistory.map(order => (
                    <OrderItem key={order.id}>
                        <Information>Order Number: {order.orderNumber}</Information>
                        <Information>Items: {order.items}</Information>
                        <Information>Status: {order.status}</Information>
                        <Information>Price: {order.price}</Information>
                        <Information>Created At: {order.createdDatetime}</Information>
                        <Information>Updated At: {order.updatedDatetime}</Information>
                    </OrderItem>
                ))}
            </OrderList>
        </Container>
    );
};

export default AdminUserDetailPage;
