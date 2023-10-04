import React, { useEffect, useState } from 'react';
import { NavBarContainer, NavItem } from './NavigationBarStyles';
import { useLocation, useNavigate } from 'react-router-dom';

const NavigationBar = () => {    
    let location = useLocation();
    const [locationPart, setLocationPart] = useState(["홈"]);
    const navigate = useNavigate();
    const link2text = {
        "Mypage" : "내정보",
        "login" : "로그인",
        "signup" : "회원가입",
        "orders" : "주문정보",
        "thread" : "문의",
        "admin" : "관리자",
        "userlist" : "고객목록",
        "userdetail" : "고객세부정보",
    }

    const text2link = {
        "홈" : "/",
        "내정보" : "/Mypage",
        "관리자" : "/admin/userlist",
        "고객목록" : "/admin/userlist", 
    }

    useEffect(()=>{
        let parts = location["pathname"].split("/");
        let newLocationParts = ["홈"];
        parts.map((text, index) => {
            if(index > 0 && text in link2text){
                newLocationParts.push(link2text[text]);
            }
        })
        setLocationPart(newLocationParts);
        
    },[location]);
    
    const handelPassClick = (e, path) => {
        console.log("!!!", path, path in text2link)
        if(path in text2link){
            navigate(text2link[path])
        }
    }

    return (
        <NavBarContainer>
            {
                locationPart.map((path, index) => (
                    <React.Fragment key={path}>
                        <NavItem onClick={(e) => handelPassClick(e, path)}>{path}</NavItem>
                        {index !== locationPart.length - 1 && <span> &gt; </span>}
                    </React.Fragment>
                ))
              }
        </NavBarContainer>
    );
};

export default NavigationBar;
