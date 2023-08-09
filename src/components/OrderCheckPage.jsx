import React from 'react';
import { OrderContainer, OrderBlock, OrderInfo, DetailButton, PageContainer } from './OrderCheckPageStyles';

// Sample data (Replace with real data from API or database)
const orders = [
    { name: 'Product A', date: '2023-08-07', state: 'Shipped' },
    { name: 'Product B', date: '2023-08-06', state: 'Processing' },
    { name: 'Product C', date: '2023-08-05', state: 'Delivered' },
];

// Main order check page component
const OrderCheckPage = () => {
    const handleDetailsClick = (orderName) => {
        // Logic to show detailed information about an order
        console.log(`Details for ${orderName}`);
    }

    return (
        <PageContainer>
            <OrderContainer>
                {
                    orders.map((order, index) => (
                        <OrderBlock key={index}>
                            <OrderInfo><strong>Name:</strong> {order.name}</OrderInfo>
                            <OrderInfo><strong>Date:</strong> {order.date}</OrderInfo>
                            <OrderInfo><strong>State:</strong> {order.state}</OrderInfo>
                            <DetailButton onClick={() => handleDetailsClick(order.name)}>Details</DetailButton>
                        </OrderBlock>
                    ))
                }
            </OrderContainer>
        </PageContainer>
    );
};

export default OrderCheckPage;
