import React from 'react';
import { Helmet } from 'react-helmet-async';
import SortOptionMenuContainer from '../containers/common/SortOptionMenuContainer';
import PictureButtonContainer from '../containers/posts/PictureButtonContainer';
import PictureListContainer from '../containers/posts/PictureListContainer';
import RandomDog from '../components/api/RandomDog';

const PicturePage = () => {
  return (
    <>
      <Helmet>
        <title>펫프렌즈 - 사진</title>
      </Helmet>

      <SortOptionMenuContainer></SortOptionMenuContainer>
      <RandomDog />
      <PictureButtonContainer></PictureButtonContainer>
      <PictureListContainer></PictureListContainer>
    </>
  );
};

export default PicturePage;
