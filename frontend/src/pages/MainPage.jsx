import React from 'react';
import styled from 'styled-components';
import LoginFormContainer from '../containers/main/LoginFormContainer';
import HeaderContainer from '../containers/common/HeaderContainer';
import AutoPlayMethods from '../containers/main/eventContainer';
import PopularpostContainer from '../containers/main/PopularpostContainer';
import PopularCardContainer from '../containers/main/PopularCardContainer';

const ContainBox = styled.div`
  width: 80%;
  margin: 50px auto;
  display: flex;
  justify-content: space-evenly;
`;

const MainBox = styled.div`
  width: 65%;
  display: inline-block;
`;

const SideBox = styled.div`
  width: 34%;
  display: inline-block;
`;

const MainPage = () => {
  return (
    <>
      <HeaderContainer />
      <ContainBox>
        <MainBox>
          <AutoPlayMethods />
          <PopularpostContainer />
          <PopularCardContainer />
        </MainBox>
        <SideBox>
          <LoginFormContainer />
        </SideBox>
      </ContainBox>
    </>
  );
};

export default MainPage;
