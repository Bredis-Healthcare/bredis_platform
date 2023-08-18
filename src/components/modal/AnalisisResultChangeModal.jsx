import React, { useEffect, useState} from 'react';
import { ModalContainer, ModalContent, CloseButton, InputBox, SubmitButton} from './AnalisisResultChangeModalStyles.js';
import axios from "../../api/axios";
import  {useNavigate  } from "react-router-dom";

const AnalisisResultChangeModal = ({ orderId, prvtext, isOpen, closeModal }) => {
    const navigate = useNavigate();
    const [detail, setDetail] = useState('');
    
    useEffect(()=>{
        setDetail(prvtext)
    },[]);

    if (!isOpen) return null;

    const handleSubmit = () => {
        async function ChangeDetail() {
            try {
                const request = await axios.post(`orders/${orderId}/analysis-result`, 
                {
                    "resultText": detail
                });
                console.log("request data", request);


            } catch (error) {
                console.error("Error while changing detail :", error);
            }
        }

        ChangeDetail();
        closeModal(true);
    }

    

    return (
        <ModalContainer style={{zIndex: 999}}>
            <ModalContent>
                <CloseButton onClick={(e) => {closeModal(false)}}>X</CloseButton>

                {/* <InputBox>
                    <label><strong>Item:</strong></label>
                    <input type="text" placeholder="Enter item name" onChange={(e) => setItem(e.target.value)} />
                </InputBox>

                <InputBox>
                    <label><strong>Price:</strong></label>
                    <input type="text" placeholder="Enter price" onChange={(e) => setPrice(e.target.value)} />
                </InputBox> */}
                <h1><strong>분석 결과 수정</strong></h1>
                <InputBox>
                    <textarea type="text" value={detail} onChange={(e) => setDetail(e.target.value)} />
                </InputBox>

                <SubmitButton onClick={handleSubmit} >수정</SubmitButton>
            </ModalContent>
        </ModalContainer>
    );
};

export default AnalisisResultChangeModal;
