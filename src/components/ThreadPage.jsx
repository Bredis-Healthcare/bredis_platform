import React, { useState, useEffect } from 'react';
import { MainContainer, ChatBox, UserInfo, ChatContent, InputBox, SendButton, DropdownSelect, SelectButton, } from './ThreadPageStyles';
import {
    useLoaderData,
} from 'react-router-dom'
import axios from "../api/axios";
import OrderModal from './modals/OrderModalAdd';
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
    const [statusList, setStatusList] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
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
        const request = await axios.get(`/messages?threadId=${cookies.thread['id']}`);
        const statusRequest = await axios.get(`/protocols`);

        console.log('statusRequest', statusRequest.data.threadCategoryList);
        console.log('request', request.data);
        setStatusList(statusRequest.data.threadCategoryList);
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
                    "threadId": cookies.thread['id'],
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

    const handleDropdownOptionSelect = async () => {
        statusList.map( async (value) => {
            // console.log(value.title, selectedOption)
            if(value.title === selectedOption )
            {
                fetchData();
                // console.log(request)
            }
         })
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
                    isAdmin ?
                    <></> :
                    <SendButton onClick={handleGoToOrderCheck}>돌아가기</SendButton>
                }
            </div>

            <div>
                    {
                    isAdmin ?
                        <div>
                            <h3 style={{display:"inline"}}>주문 상태: </h3>
                            <DropdownSelect value={selectedOption} onChange={(e) => {setSelectedOption(e.target.value)}}
                                style={{display:"inline"}}>
                                <option value="" disabled>수정할 상태를 선택해주세요</option>
                                {statusList.map((value) => (
                            <option value={value.title}>{value.title}</option>
                            ))}
                            </DropdownSelect>
                            <SelectButton style={{display:"inline"}} onClick={handleDropdownOptionSelect}>수정하기</SelectButton>
                        </div>
                      :
                    <></>
                }
                </div>
            
            <OrderModal threadId = {cookies.thread['id']} userId = {userId} isOpen={isModalOpen} closeModal={closeModal} />
        </MainContainer>
    );
};

export default ThreadPage;
