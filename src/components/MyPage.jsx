import React, { useState, useEffect } from 'react';
import {
    MyInfoContainer,
    ProfileInfoContainer,
    OrderHistoryContainer,
    OrderItem,
    GoButton
} from './MyPageStyle.js';
import OrderModal from './modal/OrderModal';
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
                <div>
                    <h2>{userInfo.name}님의 정보</h2>
                    <OrderItem>
                        <div style={{display:'inline-block'}}>
                            <p>{userInfo.email}</p>
                            <p>{userInfo.mobile}</p>
                            <p>{userInfo.organization}/{userInfo.department}/{userInfo.position}</p>
                        </div>
                        <GoButton onClick={handleOffer} style={{backgroundColor: '#dbd807'}}>문의하기</GoButton>
                    </OrderItem>
                </div>
            </ProfileInfoContainer>
        );
    }
    
    function OrderHistory({ orderHistory }) {
        return (
            <OrderHistoryContainer>
                <h3>주문 내역</h3>
                {orderHistory.map((order) => (
                    <OrderItem key={order.id}>
                        <div style={{display:'inline-block'}}>
                            <p>주문번호: {order.orderNumber}</p>
                            <p>주문 항목: {order.items}</p>
                            <p>상태: {order.status}</p>
                            <p>금액: {order.price}</p>
                            <p>주문일시: {order.createdDatetime}</p>
                        </div>
                        <GoButton onClick={(e) => {handelGoToDetailInformation(e, order.orderNumber)} }>상세 보기</GoButton>
                    </OrderItem>
                ))}
            </OrderHistoryContainer>
        );
    }
    
    function ThreadHistory({ threadHistory }) {
        return (
            <OrderHistoryContainer>
                <h3>문의 내역</h3>
                {threadHistory.map((order) => (
                    <OrderItem key={order.id}>
                        <div style={{display:'inline-block'}}>
                            <p>번호: {order.id}</p>
                            <p>생성일시: {order.createdDatetime}</p>
                        </div>
                        <GoButton onClick={(e) => {handelGoToThread(e, order.id)}}>상세 보기</GoButton>
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
