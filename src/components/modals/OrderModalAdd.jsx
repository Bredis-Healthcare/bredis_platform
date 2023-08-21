import React, { useState} from 'react';
import { ModalContainer, ModalContent, CloseButton, InputBox, SubmitButton } from './OrderModalStyles';
import axios from "../../api/axios";
import  {useNavigate  } from "react-router-dom";

const OrderModal = ({ threadId, userId, isOpen, closeModal }) => {
    const navigate = useNavigate();
    const [item, setItem] = useState('');
    const [price, setPrice] = useState('');
    const [detail, setDetail] = useState('');
    

    if (!isOpen) return null;

    const handleSubmit = (orderName) => {
        async function MakeOrder() {
            try {
                const request = await axios.post('/orders', 
                {
                    "memberId": userId,
                    "items": item,
                    "price": price,
                    "detail": detail,
                    "threadId": threadId
                });
                console.log("request data", request);

                // navigate(`../../thread/${request.data["threadId"]}/${userId}`  );


            } catch (error) {
                console.error("Error while ordering in:", error);
            }
        }

        MakeOrder();
        closeModal();
    }

    

    return (
        <ModalContainer>
            <ModalContent>
                <CloseButton onClick={closeModal}>X</CloseButton>

                <h1><strong>주문 생성</strong></h1>
                <InputBox>
                    <label><strong>주문 항목:</strong></label>
                    <input type="text" placeholder="주문 항목" onChange={(e) => setItem(e.target.value)} />
                </InputBox>

                <InputBox>
                    <label><strong>금액:</strong></label>
                    <input style={{height:'70px'}} type="text" placeholder="금액" onChange={(e) => setPrice(e.target.value)} />
                </InputBox>
                <InputBox>
                    <label><strong>상세내용:</strong></label>
                    <input type="text" placeholder="상세 내용" onChange={(e) => setDetail(e.target.value)} />
                </InputBox>

                <SubmitButton onClick={handleSubmit} >완료</SubmitButton>
            </ModalContent>
        </ModalContainer>
    );
};

export default OrderModal;
