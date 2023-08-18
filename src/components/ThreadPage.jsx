import React, { useState, useEffect } from 'react';
import { MainContainer, ChatBox, UserInfo, ChatContent, InputBox, SendButton } from './ThreadPageStyles';
import {
    useLoaderData,
} from 'react-router-dom'
import axios from "../api/axios";
import OrderModal from './modal/OrderModalAdd';
import  {useNavigate  } from "react-router-dom";
import { useCookies } from 'react-cookie';



export async function loader({ params }) {
    const threadId = params.threadId
    const userId = params.userId
    const isAdmin = false
    return { threadId, userId, isAdmin };
  }

export async function adminloader({ params }) {
    const threadId = params.threadId
    const userId = params.userId
    const isAdmin = true
    return { threadId, userId , isAdmin };
}

const ThreadPage = () => {
    
	const [cookies, setCookie, removeCookie] = useCookies(['login']);
    const [message, setMessage] = useState('');
    const [chats, setChats] = useState([]);
    const { userId, threadId, isAdmin } = useLoaderData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {  
        console.log("cookies", cookies)
        fetchData();
    }, [])


    const handleOffer= () => {
        setIsModalOpen(true);
    }

    const handleGoToOrderCheck= () => {
        navigate(`../../../Mypage`);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }


    const fetchData = async () => {
        const request = await axios.get(`/messages?threadId=${threadId}`);
        console.log('request', request.data);
        setChats(request.data.messages);
    };

    const handleSend = async () => {
        // Logic to send message, e.g., update chats array, send to an API, etc.
        console.log(message);
        console.log("!", threadId, userId );

        async function sendMessage() {
            try {
                const request = await axios.post('/messages', 
                {
                    "senderId": cookies.login['id'],
                    "threadId": threadId,
                    "content": message,
                });
                console.log("request data", request);

            } catch (error) {
                console.error("Error while send message in:", error);
            }
        }

        await sendMessage()

        fetchData()
        console.log("fetch");
        setMessage(''); // Clear the input box after sending
    };

    return (
        
        <MainContainer>
            {
                chats.map((chat, index) => (
                    <ChatBox key={index}>
                        <UserInfo style={{fontWeight: "lighter"}}>{chat.createdDatetime}
                            <div style={{fontWeight: "normal"}}>
                                {
                                    chat.senderId === 0 ? "관리자" : ""
                                }
                            </div>
                        </UserInfo>
                        <ChatContent>{chat.content}</ChatContent>
                    </ChatBox>
                ))
            }
            <InputBox
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메시지를 입력해주세요."
            />
            <SendButton onClick={handleSend}>전송</SendButton>
            <div>
                {
                    isAdmin ?
                    <SendButton onClick={handleOffer}>주문 생성하기(관리자 기능)</SendButton> :
                    <></>
                }
            </div>

            <div>
                {
                    !isAdmin ?
                    <SendButton onClick={handleGoToOrderCheck}>돌아가기</SendButton> :
                    <></>
                }
            </div>
            
            <OrderModal threadId = {threadId} userId = {userId} isOpen={isModalOpen} closeModal={closeModal} />
        </MainContainer>
    );
};

export default ThreadPage;
