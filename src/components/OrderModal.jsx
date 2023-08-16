import React, { useState} from 'react';
import { ModalContainer, ModalContent, CloseButton, InputBox, SubmitButton } from './OrderModalStyles';
import axios from "../api/axios";
import  {useNavigate  } from "react-router-dom";

const OrderModal = ({ userId, isOpen, closeModal }) => {
    const navigate = useNavigate();
    const [item, setItem] = useState('');
    const [price, setPrice] = useState('');
    const [detail, setDetail] = useState('');
    

    if (!isOpen) return null;

    const handleSubmit = (orderName) => {
        async function MakeOrder() {
            try {
                const request = await axios.post('/messages/new-thread', 
                {
                    "memberId": userId,
                    "content": detail
                });
                console.log("request data", request);

                navigate(`../../thread/${request.data["threadId"]}/${userId}`);


            } catch (error) {
                console.error("Error while ordering in:", error);
            }
        }

        MakeOrder();
        closeModal();
    }

    

    return (
        <ModalContainer style={{zIndex: 999}}>
            <ModalContent>
                <CloseButton onClick={closeModal}>X</CloseButton>

                {/* <InputBox>
                    <label><strong>Item:</strong></label>
                    <input type="text" placeholder="Enter item name" onChange={(e) => setItem(e.target.value)} />
                </InputBox>

                <InputBox>
                    <label><strong>Price:</strong></label>
                    <input type="text" placeholder="Enter price" onChange={(e) => setPrice(e.target.value)} />
                </InputBox> */}
                <h1><strong>견적 문의</strong></h1>
                <InputBox>
                    <input type="text" placeholder="문의 내용을 입력해주세요." onChange={(e) => setDetail(e.target.value)} />
                </InputBox>

                <SubmitButton onClick={handleSubmit} >전송</SubmitButton>
            </ModalContent>
        </ModalContainer>
    );
};

export default OrderModal;
