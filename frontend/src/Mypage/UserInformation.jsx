import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const UserInfo = styled.div`
  .user-info {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    padding: 20px;
    margin-top: 20px;
  }
`;

function UserInformation() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('/api/users/3'); // /current
            const userData = response.data;
            setUser(userData);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <UserInfo>
            {user && (
                <div className="user-info">
                    <h3>{user.nickname} 님</h3>
                    <p>이메일: {user.email}</p>
                    <p>주소: {user.address2} {user.address3}</p>
                    <p>가입일: {user.createdAt}</p>
                </div>
            )}
        </UserInfo>
    );
}

export default UserInformation;
