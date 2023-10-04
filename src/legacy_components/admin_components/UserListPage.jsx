import React from 'react';
import { useState, useEffect  } from 'react';
import { UserList, UserItem, UserButton, PageContainer, UserName, UserInfos, UserInfo } from './UserListPageStyles';
import axios from "../../api/axios";
import  {useNavigate  } from "react-router-dom";
import { useCookies } from 'react-cookie';

const UserListPage = () => {
	const [cookies, setCookie, removeCookie] = useCookies(['login']);

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {  
        console.log("cookie", cookies)
        fetchData();
    }, [])

    const fetchData = async () => {
        const request = await axios.get(`/members`);
        console.log('request', request.data);
        setUsers(request.data.memberItems);
    };

    const handleCreateOrderClick = (user, e) => {
        navigate(`../userdetail/${user.id}`   )
    }

    return (
        <PageContainer>
            <UserList>
                {users.map((user, index) => (
                    <UserItem key={index}>
                        <UserInfos>
                            <UserName>{user.name}</UserName>
                            <UserInfo>이메일: {user.email}</UserInfo>
                            <UserInfo>전화번호: {user.mobile}</UserInfo>
                            <UserInfo>조직: {user.organization}</UserInfo>
                            <UserInfo>부서: {user.department}</UserInfo>
                            <UserInfo>직책: {user.position}</UserInfo>
                            <UserInfo>가입일시: {user.createdDatetime}</UserInfo>
                        </UserInfos>
                        <UserButton  onClick={(e) => {handleCreateOrderClick(user, e)}} >상세 보기</UserButton>
                    </UserItem>
                ))}
            </UserList>
        </PageContainer>
    );
};

export default UserListPage;
