import React from 'react';
import styled from 'styled-components';
import LoginFormContainer from '../containers/main/LoginFormContainer';
import HeaderContainer from '../containers/common/HeaderContainer';

const ContainBox = styled.div`
  width: 80%;
  margin: 50px auto;
`;

const MainBox = styled.div`
  width: 70%;
  display: inline-block;
`;

const SideBox = styled.div`
  width: 30%;
  display: inline-block;
`;

const MainPage = () => {
  return (
    <>
      <HeaderContainer />
      <ContainBox>
        <MainBox>
          <div>메인페이지</div>
        </MainBox>
        <SideBox>
          <LoginFormContainer />
        </SideBox>
      </ContainBox>
    </>
  );
};

export default MainPage;
