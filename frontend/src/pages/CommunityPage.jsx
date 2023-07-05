import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import SearchOptionMenuContainer from '../containers/common/SearchOptionMenuContainer';
import SortOptionMenuContainer from '../containers/common/SortOptionMenuContainer';
import PostButtonContainer from '../containers/posts/PostButtonContainer';
import PostListContainer from '../containers/posts/PostListContainer';

const CommunityPage = () => {
  return (
    <>
      <HeaderContainer></HeaderContainer>
      <SearchOptionMenuContainer></SearchOptionMenuContainer>
      <SortOptionMenuContainer></SortOptionMenuContainer>
      <PostButtonContainer></PostButtonContainer>
      <PostListContainer></PostListContainer>
    </>
  );
};

export default CommunityPage;
