import React, { useState, useEffect } from 'react';
import {
    MyInfoContainer,
    ProfileInfoContainer,
    OrderHistoryContainer,
    OrderItem,
    GoButton
} from './MyPageStyle.js';
import OrderModal from './OrderModal';
import  {useNavigate, useLoaderData, } from "react-router-dom";
import axios from "../api/axios";



export async function loader({ params }) {
    const userId = params.userId
    return { userId };
  }


function MyPage() {
    
    const [userInfo, setUserInfo] = useState(null); // or your fetching logic
    const { userId } = useLoaderData();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handelGoToDetailInformation = (e, orderNumber) => {
        navigate(`../../orders/${orderNumber}/detail`)
    }
    const handelGoToThread = (e, threadID) => {
        navigate(`/thread/${threadID}/${userId}`)
    
    }
    
    const handleOffer= () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }
    
    function ProfileInfo({ userInfo }) {
        return (
            <ProfileInfoContainer>
                <h2>{userInfo.name}</h2>
                <p>Email: {userInfo.email}</p>
                <p>Mobile: {userInfo.mobile}</p>
                <p>Organization: {userInfo.organization}</p>
                <p>Department: {userInfo.department}</p>
                <p>Position: {userInfo.position}</p>
                <p>Joined: {userInfo.createdDatetime}</p>
            </ProfileInfoContainer>
        );
    }
    
    function OrderHistory({ orderHistory }) {
        return (
            <OrderHistoryContainer>
                <h3>Order History</h3>
                {orderHistory.map((order) => (
                    <OrderItem key={order.id}>
                        <p>Order Number: {order.orderNumber}</p>
                        <p>Items: {order.items}</p>
                        <p>Status: {order.status}</p>
                        <p>Price: {order.price}</p>
                        <p>Ordered: {order.createdDatetime}</p>
                        <p>Last Updated: {order.updatedDatetime}</p>
                        <GoButton onClick={(e) => {handelGoToDetailInformation(e, order.orderNumber)} }>Go to Detail Information</GoButton>
                    </OrderItem>
                ))}
            </OrderHistoryContainer>
        );
    }
    
    function ThreadHistory({ threadHistory }) {
        return (
            <OrderHistoryContainer>
                <h3>Thread History</h3>
                {threadHistory.map((order) => (
                    <OrderItem key={order.id}>
                        <p>Id: {order.id}</p>
                        <p>createdDatetime: {order.createdDatetime}</p>
                        <GoButton onClick={(e) => {handelGoToThread(e, order.id)}}>Go to Thread</GoButton>
                    </OrderItem>
                ))}
            </OrderHistoryContainer>
        );
    }


    useEffect(() => {  
        fetchData();
    }, [])


    const fetchData = async () => {
        const request = await axios.post(`/my-info`, { "memberId": userId });
        console.log('request', request.data);
        setUserInfo(request.data);
    };    

    
    // UseEffect or other logic to fetch data

    return (
        <MyInfoContainer>
            {userInfo ? (
                <>
                    <ProfileInfo userInfo={userInfo} />
                    <GoButton onClick={handleOffer}>문의하기</GoButton>
                    <OrderModal userId = {userId} isOpen={isModalOpen} closeModal={closeModal} />
                    <OrderHistory orderHistory={userInfo.orderHistory} />
                    <ThreadHistory threadHistory={userInfo.threads} />
                </>
            ) : (
                <p>Loading...</p>
            )}
        </MyInfoContainer>
    );
}

export default MyPage;
