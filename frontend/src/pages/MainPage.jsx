import React from 'react';
import styled from 'styled-components';
import LoginFormContainer from '../containers/main/LoginFormContainer';
import AutoPlayMethods from '../containers/main/eventContainer';
import PopularpostContainer from '../containers/main/PopularpostContainer';
import MeunlistsContainer from '../containers/main/MeunlistsContainer';
import ShopBoxContainer from '../containers/main/ShopBoxContainer';
import PopularCardContainer from '../containers/main/PopularCardContainer';
import Attendance from '../lib/main/Attendance';
import WeatherContainer from '../containers/main/WeatherContainer';
import HeaderContainer from '../containers/common/HeaderContainer';
import Footer from '../lib/main/Footer';

const ContainBox = styled.div`
  width: 75%;
  margin: 50px auto 20px;
  display: flex;
  justify-content: center;
`;

const MainBox = styled.div`
  width: 70%;
  display: inline-block;
`;

const SideBox = styled.div`
  display: inline-block;
`;

const ShopBox = styled.div`
  width: 85%;
  margin: 0 auto;
`;

const MainPage = () => {
  return (
    <>
      <HeaderContainer />
      <ContainBox>
        {/*--------------- 메인 -------------- */}
        <MainBox>
          <AutoPlayMethods />
          <div style={{ display: 'flex', marginRight: '20px', marginTop: '20px' }}>
            <MeunlistsContainer />
            <Attendance />
          </div>
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
          <WeatherContainer />
        </SideBox>
      </ContainBox>
      <Footer />
    </>
  );
};

export default React.memo(MainPage);
