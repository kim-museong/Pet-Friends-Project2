import React from 'react';
import UserProfile from "../Mypage/UserProfile";
import styled from "styled-components";


const Mypage = styled.div`
  margin: 10% auto;
  max-width: 800px;
  padding: 40px;
  border: 1px solid #ddd;
  border-radius: 10px;


`;

function MyPage() {
  return (
      <Mypage>
        <UserProfile/>
      </Mypage>
  );
}

export default MyPage;
