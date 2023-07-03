import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import SortOptionMenuContainer from '../containers/common/SortOptionMenuContainer';
import PictureListContainer from '../containers/posts/PictureListContainer';
import SearchOptionMenuContainer from '../containers/common/SearchOptionMenuContainer';

const PicturePage = () => {
  return (
    <>
      <HeaderContainer></HeaderContainer>
      <SearchOptionMenuContainer></SearchOptionMenuContainer>
      <SortOptionMenuContainer></SortOptionMenuContainer>
      <PictureListContainer></PictureListContainer>
    </>
  );
};

export default PicturePage;
