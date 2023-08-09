import React from 'react';
import OrderModal from './OrderModal';
import { OrderContainer, OrderBlock, OrderInfo, DetailButton, PageContainer, CreateOrderButton } from './OrderCheckPageStyles';
import { useState, useEffect  } from 'react';
import axios from "../api/axios";
import {
    useLoaderData,
} from 'react-router-dom'

export async function loader({ params }) {
    const userId = params.userId
    return { userId };
  }

const OrderCheckPage = () => {
    const { userId } = useLoaderData();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [memberId, setMemberID] = useState(userId);
    const [orders, setOrders] = useState([]);

    useEffect(() => {  
        fetchData();
    }, [])


    const handleDetailsClick = (orderName) => {
        // Logic to show detailed information about an order
        console.log(`Details for ${orderName}`);
    }

    const handleCreateOrderClick = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const fetchData = async () => {
        const request = await axios.get(`/orders?memberId=${memberId}`);
        console.log('request', request.data);
        setOrders(request.data.orderItems);
    };

    return (
        <PageContainer>
            <OrderContainer>
                {
                    orders.map((order, index) => (
                        <OrderBlock key={index}>
                            <OrderInfo><strong>OrderNumber:</strong> {order.orderNumber}</OrderInfo>
                            <OrderInfo><strong>Items:</strong> {order.items}</OrderInfo>
                            <OrderInfo><strong>Status:</strong> {order.status}</OrderInfo>
                            <OrderInfo><strong>Final Update:</strong> {order.updatedDatetime}</OrderInfo>
                            <OrderInfo><strong>Price:</strong> {order.price}</OrderInfo>
                            <DetailButton onClick={() => handleDetailsClick(order.items)}>Details</DetailButton>
                        </OrderBlock>
                    ))
                }
                <CreateOrderButton onClick={handleCreateOrderClick}>Create Order</CreateOrderButton>
            </OrderContainer>
            <OrderModal userId = {userId} isOpen={isModalOpen} closeModal={closeModal} />
        </PageContainer>
    );
};

export default OrderCheckPage;
