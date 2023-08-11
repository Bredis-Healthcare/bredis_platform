import React from 'react';
import { useState, useEffect  } from 'react';
import { UserList, UserItem, UserButton, PageContainer, UserName, UserInfos, UserInfo } from './UserListPageStyles';
import axios from "../../api/axios";
import  {useNavigate  } from "react-router-dom";

const UserListPage = () => {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {  
        fetchData();
    }, [])

    const fetchData = async () => {
        const request = await axios.get(`/members`);
        console.log('request', request.data);
        setUsers(request.data.memberItems);
    };

    const handleCreateOrderClick = (user, e) => {
        navigate(`/admin/userdetail/${user.id}`   )
    }

    return (
        <PageContainer>
            <UserList>
                {users.map((user, index) => (
                    <UserItem key={index}>
                        <UserInfos>
                            <UserName>name: {user.name}</UserName>
                            <UserInfo>email: {user.email}</UserInfo>
                            <UserInfo>mobile: {user.mobile}</UserInfo>
                            <UserInfo>organization: {user.organization}</UserInfo>
                            <UserInfo>department: {user.department}</UserInfo>
                            <UserInfo>position: {user.position}</UserInfo>
                            <UserInfo>createdDatetime: {user.createdDatetime}</UserInfo>
                        </UserInfos>
                        <UserButton  onClick={(e) => {handleCreateOrderClick(user, e)}} >Direct</UserButton>
                    </UserItem>
                ))}
            </UserList>
        </PageContainer>
    );
};

export default UserListPage;
