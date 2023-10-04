import React, { useState, useEffect } from 'react';
import {
    Container,
    Header,
    SubHeader,
    Information,
    OrderList,
    OrderItem,
    GoButton,
} from './AdminUserDetailPageStyle';
import axios from "../../api/axios";
import { useCookies } from 'react-cookie';

import  {useNavigate, useLoaderData, } from "react-router-dom";

export async function loader({ params }) {
    const userId = params.userId
    return { userId };
  }

const AdminUserDetailPage = () => {
    const { userId } = useLoaderData();
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
	const [cookies, setCookie, removeCookie] = useCookies(['login']);

    useEffect(() => {
        console.log("cookie", cookies)
        fetchData();
    }, [userId]);

    const handelGoToThread = (e, threadID, userId) => {
        navigate(`../thread/${threadID}/${userId}`)
    }

    const handelGoToDetailedInformation = (e, orderNumber) => {
        navigate(`../orders/${orderNumber}/detail`)
    }

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
            <Header>고객 상세</Header>
            <SubHeader>이름: {userData.name}</SubHeader>
            <Information>이메일: {userData.email}</Information>
            <Information>전화번호: {userData.mobile}</Information>
            <Information>조직: {userData.organization}</Information>
            <Information>부서: {userData.department}</Information>
            <Information>직책: {userData.position}</Information>
            <Information>가입일시: {userData.createdDatetime}</Information>
            
            <SubHeader>관리자 메모</SubHeader>
            <Information> {userData.adminMemo ? userData.adminMemo : "N/A"}</Information>
            
            
            <SubHeader>주문 내역</SubHeader>
            <OrderList>
                {userData.orderHistory.map(order => (
                    <OrderItem key={order.id} style={{position:'relative'}}>
                        <div style={{display:'inline-block'}}>
                            <Information style={{fontWeight: "bold"}}>주문번호: {order.orderNumber}</Information>
                            <Information>주문 항목: {order.items}</Information>
                            <Information>상태: {order.status}</Information>
                            <Information>금액: {order.price}</Information>
                            <Information>생성일시: {order.createdDatetime}</Information>
                            <Information>최종수정일시: {order.updatedDatetime}</Information>
                        </div>
                        <GoButton style={{position:'absolute', width: '30%', right: '5%', bottom: '10%', display:'inline-block'}} onClick={(e) => {handelGoToDetailedInformation(e, order.orderNumber )}}> 상세 보기</GoButton>
                    </OrderItem>
                ))}
            </OrderList>
            <SubHeader>견적 및 기타 문의 내역</SubHeader>
            주문 건에 대한 문의 내역은 각 주문 상세 정보에서 확인할 수 있습니다.
            <OrderList>
                {userData.threads.map(order => (
                    <OrderItem key={order.id} style={{position:'relative'}}>
                        <div style={{display:'inline-block'}}>
                            <Information>문의 Id: {order.id}</Information>
                            <Information>카테고리: {order.category}</Information>
                            <Information>생성일시: {order.createdDatetime}</Information>
                        </div>
                        <GoButton style={{position:'absolute', width: '30%', right: '5%', bottom: '10%'}} onClick={(e) => {handelGoToThread(e, order.id, userData.id)}}>상세 보기</GoButton>
                    </OrderItem>
                ))}
            </OrderList>
        </Container>
    );
};

export default AdminUserDetailPage;
