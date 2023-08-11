import React, { useState, useEffect } from 'react';
import { MainContainer, ChatBox, UserInfo, ChatContent, InputBox, SendButton } from './ThreadPageStyles';
import {
    useLoaderData,
} from 'react-router-dom'
import axios from "../api/axios";
import OrderModal from './OrderModalAdd';
import  {useNavigate  } from "react-router-dom";


// Sample data (You can replace this with real data from your API or database)
// const chats = [
//     { name: 'John Doe', position: 'Manager', message: 'Hello everyone!' },
//     { name: 'Jane Smith', position: 'Employee', message: 'Hello, John!' },
//     { name: 'Anna Lee', position: 'CEO', message: 'Hope everyone is doing well.' },
//     // ... more chats
// ];

export async function loader({ params }) {
    const threadId = params.threadId
    const userId = params.userId
    return { threadId, userId };
  }

const ThreadPage = () => {
    const [message, setMessage] = useState('');
    const [chats, setChats] = useState([]);
    const { userId, threadId } = useLoaderData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {  
        fetchData();
    }, [message])

    const handleOffer= () => {
        setIsModalOpen(true);
    }

    const handleGoToOrderCheck= () => {
        navigate(`../../../${userId}/order_check`);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }


    const fetchData = async () => {
        const request = await axios.get(`/messages?threadId=${threadId}`);
        console.log('request', request.data);
        setChats(request.data.messages);
    };

    const handleSend = () => {
        // Logic to send message, e.g., update chats array, send to an API, etc.
        console.log(message);
        console.log("!", threadId, userId );

        async function sendMessage() {
            try {
                const request = await axios.post('/messages', 
                {
                    "senderId": userId,
                    "threadId": threadId,
                    "content": message,
                });
                console.log("request data", request);

            } catch (error) {
                console.error("Error while send message in:", error);
            }
        }

        sendMessage()
        setMessage(''); // Clear the input box after sending
    };

    return (
        
        <MainContainer>
            {
                chats.map((chat, index) => (
                    <ChatBox key={index}>
                        <UserInfo>{chat.id} {chat.createdDatetime}</UserInfo>
                        <ChatContent>{chat.content}</ChatContent>
                    </ChatBox>
                ))
            }
            <InputBox
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
            />
            <SendButton onClick={handleSend}>Send</SendButton>
            <SendButton onClick={handleOffer}>Add Offer</SendButton>
            <SendButton onClick={handleGoToOrderCheck}>Go to Order Check</SendButton>
            <OrderModal threadId = {threadId} userId = {userId} isOpen={isModalOpen} closeModal={closeModal} />
        </MainContainer>
    );
};

export default ThreadPage;
