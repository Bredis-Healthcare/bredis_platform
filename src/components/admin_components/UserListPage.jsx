import React from 'react';
import { UserList, UserItem, UserButton, PageContainer, UserName, DateInfo, UserInfo } from './UserListPageStyles';

const UserListPage = () => {
    // Sample user data (Replace with real data from API or database)
    const users = [
        { name: 'John Doe', lastConfirmed: '2023-08-05' },
        { name: 'Jane Smith', lastConfirmed: '2023-08-04' },
        { name: 'bbbbbbbbb', lastConfirmed: '2023-08-07' },
        { name: 'aaaaaaaa', lastConfirmed: '2023-08-08' },
        // ... Add more users as required
    ];

    return (
        <PageContainer>
            <UserList>
                {users.map((user, index) => (
                    <UserItem key={index}>
                        <UserInfo>
                            <UserName>User: {user.name}</UserName>
                            <DateInfo>Last Confirmed: {user.lastConfirmed}</DateInfo>
                        </UserInfo>
                        <UserButton>Direct</UserButton>
                    </UserItem>
                ))}
            </UserList>
        </PageContainer>
    );
};

export default UserListPage;
