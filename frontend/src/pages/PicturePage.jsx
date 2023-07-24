import React from 'react';

import SortOptionMenuContainer from '../containers/common/SortOptionMenuContainer';
import PictureButtonContainer from '../containers/posts/PictureButtonContainer';
import PictureListContainer from '../containers/posts/PictureListContainer';

const PicturePage = () => {
  return (
    <>
      <SortOptionMenuContainer></SortOptionMenuContainer>
      <PictureButtonContainer></PictureButtonContainer>
      <PictureListContainer></PictureListContainer>
    </>
  );
};

export default PicturePage;
