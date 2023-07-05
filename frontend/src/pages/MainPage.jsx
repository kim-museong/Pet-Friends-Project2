import React from 'react';
import styled from 'styled-components';
import LoginFormContainer from '../containers/main/LoginFormContainer';
import HeaderContainer from '../containers/common/HeaderContainer';
import AutoPlayMethods from '../containers/main/eventContainer';
import PopularpostContainer from '../containers/main/PopularpostContainer';
import MeunlistsContainer from '../containers/main/MeunlistsContainer';
import ShopBoxContainer from '../containers/main/ShopBoxContainer';
import PopularCardContainer from '../containers/main/PopularCardContainer';

const ContainBox = styled.div`
  width: 80%;
  margin: 50px auto;
  display: flex;
  justify-content: space-evenly;
`;

const MainBox = styled.div`
  width: 70%;
  display: inline-block;
`;

const SideBox = styled.div`
  display: inline-block;
`;

const ShopBox = styled.div`
  width: 77.5%;
  margin: 20px auto;
`;

const MainPage = () => {
  return (
    <>
      <HeaderContainer />
      <ContainBox>
        {/*--------------- 메인 -------------- */}
        <MainBox>
          <AutoPlayMethods />
          <MeunlistsContainer />
        </MainBox>
        {/* -------------- 사이드 ------------- */}
        <SideBox>
          <LoginFormContainer />
          <PopularpostContainer />
        </SideBox>
      </ContainBox>
      <ShopBox>
        <ShopBoxContainer />
      </ShopBox>
      <ContainBox>
        {/*--------------- 메인 -------------- */}
        <MainBox>
          <PopularCardContainer />
        </MainBox>
        {/* -------------- 사이드 ------------- */}
        <SideBox>
          <LoginFormContainer />
          <PopularpostContainer />
        </SideBox>
      </ContainBox>
    </>
  );
};

export default MainPage;
