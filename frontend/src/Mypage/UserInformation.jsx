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
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAuthentication();
    }, []);

    const checkAuthentication = async () => {
        try {
            const response = await axios.get('/api/users/check-auth'); // 로그인 상태를 확인하는 API 엔드포인트
            const isAuthenticated = response.data.isAuthenticated;
            setIsAuthenticated(isAuthenticated);
            if (isAuthenticated) {
                fetchUserData();
            }
        } catch (error) {
            console.error('로그인 상태를 확인하는데 실패했습니다:', error);
        }
    };

    const fetchUserData = async () => {
        try {
            const response = await axios.get('/api/users/current'); // 로그인된 사용자 정보를 가져오는 API 엔드포인트
            const userData = response.data;
            setUser(userData);
        } catch (error) {
            console.error('사용자 정보를 가져오지 못했습니다:', error);
        }
    };

    if (!isAuthenticated) {
        return null; // 로그인되지 않은 상태라면 아무 내용도 표시하지 않음
    }

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
