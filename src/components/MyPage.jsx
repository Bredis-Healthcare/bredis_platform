import React, { useState, useEffect } from 'react';
import {
    MyInfoContainer,
    ProfileInfoContainer,
    OrderHistoryContainer,
    OrderItem,
    GoButton
} from './MyPageStyle.js';
import OrderModal from './modals/OrderModal.jsx';
import  {useNavigate, useLoaderData, useLocation, Outlet, } from "react-router-dom";
import axios from "../api/axios";
import { useCookies } from 'react-cookie';
import LoginModal from './modals/LoginModal.jsx';

export async function loader({ params }) {
    const userId = params.userId
    return { userId };
  }


function MyPage() {
    
	const [cookies, setCookie, removeCookie] = useCookies(['login']);
    const [userInfo, setUserInfo] = useState(null); // or your fetching logic
    const { userId } = useLoaderData();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusList, setStatusList] = useState([]);
    
    let location = useLocation();
    

    useEffect(() => {  
        console.log("cookie", cookies)
        fetchData();
    }, [])

    
    

    // const fetchData = async () => {
    //     const request = await axios.post(`/my-info`, { "memberId": userId });
    //     console.log('request', request.data);
    //     setUserInfo(request.data);
    // }; 
    const fetchData = async () => {
        try {
            const statusRequest = await axios.get(`/protocols`);
            const request = await axios.post(`/my-info`, { "memberId": cookies.login && cookies.login['id'] });
            
            console.log('request', request.data);
            console.log('statusRequest', statusRequest.data.threadCategoryList);
            setUserInfo(request.data);
            setStatusList(statusRequest.data.threadCategoryList)
            
        } catch (error) {
            console.log("My Page fetch Error : ", error)
        }
    };    
    
    


    const handelGoToDetailInformation = (e, orderNumber) => {
        navigate(`orders/${orderNumber}/detail`)
    }
    const handelGoToThread = async (e, threadID) => {
        // navigate(`/thread/${threadID}/${cookies.login}`)
        console.log("threadID", threadID)
        await setCookie('thread', {id : threadID}, {path : "/"})
        navigate(`./thread`)
    
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
                {threadHistory.map((thread) => (
                    <OrderItem key={thread.id}>
                        <div style={{display:'inline-block'}}>
                            <p>번호: {thread.id}</p>
                            <p>생성일시: {thread.createdDatetime}</p>
                        </div>
                        <GoButton onClick={(e) => {handelGoToThread(e, thread.id)}}>문의 보기</GoButton>
                    </OrderItem>
                ))}
            </OrderHistoryContainer>
        );
    }



    
    // UseEffect or other logic to fetch data


    return (
        <div>
            
            { location["pathname"] === '/Mypage' && <MyInfoContainer>
            {userInfo ? (
                <>
                    <ProfileInfo userInfo={userInfo} />
                    <OrderModal statusList = {statusList} userId = {cookies.login['id']} isOpen={isModalOpen} closeModal={closeModal} />
                    <OrderHistory orderHistory={userInfo.orderHistory} />
                    <ThreadHistory threadHistory={userInfo.threads} />
                </>
            ) : (
                <p>Loading...</p>
            )}
            </MyInfoContainer> }
            <Outlet/>
        
    </div>
    );
}

export default MyPage;
