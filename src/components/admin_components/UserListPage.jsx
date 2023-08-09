import React from 'react';
import { useState, useEffect  } from 'react';
import { UserList, UserItem, UserButton, PageContainer, UserName, UserInfos, UserInfo } from './UserListPageStyles';
import axios from "../../api/axios";
import  {useNavigate  } from "react-router-dom";

const UserListPage = () => {
    // Sample user data (Replace with real data from API or database)
    // const users = [
    //     { name: 'John Doe', lastConfirmed: '2023-08-05' },
    //     { name: 'Jane Smith', lastConfirmed: '2023-08-04' },
    //     { name: 'bbbbbbbbb', lastConfirmed: '2023-08-07' },
    //     { name: 'aaaaaaaa', lastConfirmed: '2023-08-08' },
    //     // ... Add more users as required
    // ];

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
        navigate(`/admin/userdetail/${user.id}`,  {replace : true})
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
