import React from 'react';
import SearchOptionMenuContainer from '../containers/common/SearchOptionMenuContainer';
import SortOptionMenuContainer from '../containers/common/SortOptionMenuContainer';
import PostButtonContainer from '../containers/posts/PostButtonContainer';
import PostListContainer from '../containers/posts/PostListContainer';

const CommunityPage = () => {
  return (
    <>
      <SearchOptionMenuContainer></SearchOptionMenuContainer>
      <SortOptionMenuContainer></SortOptionMenuContainer>
      <PostButtonContainer></PostButtonContainer>
      <PostListContainer></PostListContainer>
    </>
  );
};

export default CommunityPage;
