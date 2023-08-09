import React, { useState} from 'react';
import { ModalContainer, ModalContent, CloseButton, InputBox, SubmitButton } from './OrderModalStyles';
import axios from "../api/axios";
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
                    "threadId": threadId
                });
                console.log("request data", request);

                navigate(`../../thread/${request.data["threadId"]}/${userId}`,  {replace : true});


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

                <h1><strong>Set New Offer</strong></h1>
                <InputBox>
                    <label><strong>Item:</strong></label>
                    <input type="text" placeholder="Enter item name" onChange={(e) => setItem(e.target.value)} />
                </InputBox>

                <InputBox>
                    <label><strong>Price:</strong></label>
                    <input type="text" placeholder="Enter price" onChange={(e) => setPrice(e.target.value)} />
                </InputBox>
                <InputBox>
                    <label><strong>Details:</strong></label>
                    <input type="text" placeholder="Enter price" onChange={(e) => setDetail(e.target.value)} />
                </InputBox>

                <SubmitButton onClick={handleSubmit} >Submit</SubmitButton>
            </ModalContent>
        </ModalContainer>
    );
};

export default OrderModal;
