import React, { useState} from 'react';
import { ModalContainer, ModalContent, CloseButton, InputBox, SubmitButton, DropdownSelect } from './OrderModalStyles';
import axios from "../../api/axios";
import  {useNavigate  } from "react-router-dom";
import { useCookies } from 'react-cookie';

const LoginModal = ({ statusList, userId, isOpen, closeModal }) => {
    const navigate = useNavigate();
    const [item, setItem] = useState('');
    const [price, setPrice] = useState('');
    const [detail, setDetail] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
	const [cookies, setCookie, removeCookie] = useCookies(['login']);
    

    if (!isOpen) return null;

    const handleSubmit = (orderName) => {
        let code = ""
        statusList.map( async (value) => {
            // console.log(value.title, selectedOption)
            if(value.title === selectedOption )
            {
                code = value.code
            }
         })
        async function MakeOrder() {
            try {
                const request = await axios.post('/messages/new-thread', 
                {
                    "memberId": userId,
                    "content": detail,
                    "category" : code

                });
                console.log("request data", request);
                setCookie('thread', {id : request.data["threadId"]}, {path : "/"})

                navigate(`../../thread/`);


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
                <div>
                    <h3 style={{display:"inline"}}>종류: </h3>
                    <DropdownSelect value={selectedOption} onChange={(e) => {setSelectedOption(e.target.value)}}
                        style={{display:"inline"}}>
                        <option value="" disabled>문의 종류를 선택해 주세요</option>
                        {statusList.map((value) => (
                    <option value={value.title}>{value.title}</option>
                    ))}
                    </DropdownSelect>
                </div>
                <SubmitButton onClick={handleSubmit} >전송</SubmitButton>
            </ModalContent>
        </ModalContainer>
    );
};

export default LoginModal;
