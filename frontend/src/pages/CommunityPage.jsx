import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import SearchOptionMenuContainer from '../containers/common/SearchOptionMenuContainer';
import SortOptionMenuContainer from '../containers/common/SortOptionMenuContainer';

const CommunityPage = () => {
  return (
    <>
      <HeaderContainer></HeaderContainer>
      <SearchOptionMenuContainer></SearchOptionMenuContainer>
      <SortOptionMenuContainer></SortOptionMenuContainer>
      <div>CommunityPage</div>
    </>
  );
};

export default CommunityPage;
