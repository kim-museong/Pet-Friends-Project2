import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import SortOptionMenuContainer from '../containers/common/SortOptionMenuContainer';
import PictureListContainer from '../containers/posts/PictureListContainer';

const PicturePage = () => {
  return (
    <>
      <HeaderContainer></HeaderContainer>
      <SortOptionMenuContainer></SortOptionMenuContainer>
      <PictureListContainer></PictureListContainer>
    </>
  );
};

export default PicturePage;
