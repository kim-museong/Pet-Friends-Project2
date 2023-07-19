import React, { useEffect } from 'react';
import styled from 'styled-components';
import LoginFormContainer from '../containers/main/LoginFormContainer';
import AutoPlayMethods from '../containers/main/eventContainer';
import PopularpostContainer from '../containers/main/PopularpostContainer';
import MeunlistsContainer from '../containers/main/MeunlistsContainer';
import WeatherContainer from '../containers/main/WeatherContainer';
import HeaderContainer from '../containers/common/HeaderContainer';
import Footer from '../lib/main/Footer';
import { useDispatch } from '../../node_modules/react-redux/es/exports';
import { initialize } from '../modules/find';
import { initializeForm } from '../modules/auth';
import NewsTicker from '../components/main/NewsTicker';
import RandomContainer from '../containers/main/RandomContainer';

const ContainBox = styled.div`
  width: 90%;
  margin: 50px auto 20px;
  display: flex;
  justify-content: center;
`;

const MainBox = styled.div`
  width: 50%;
  display: inline-block;
  margin-right: 30px;
`;

const SideBox = styled.div`
  display: inline-block;
`;

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialize('findPwd'));
    dispatch(initializeForm('register'));
  }, [dispatch]);
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
          <WeatherContainer />
          <NewsTicker />
          <PopularpostContainer />
          <RandomContainer />
        </SideBox>
      </ContainBox>
      <Footer />
    </>
  );
};

export default React.memo(MainPage);
