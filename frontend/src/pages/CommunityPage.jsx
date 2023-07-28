import React from 'react';
import SearchOptionMenuContainer from '../containers/common/SearchOptionMenuContainer';
import SortOptionMenuContainer from '../containers/common/SortOptionMenuContainer';
import PostButtonContainer from '../containers/posts/PostButtonContainer';
import PostListContainer from '../containers/posts/PostListContainer';
import PaginationContainer from '../containers/common/PaginationContainer';
import { Helmet } from 'react-helmet-async';

const CommunityPage = () => {
  return (
    <>
      <Helmet>
        <title>펫프렌즈 - 커뮤니티</title>
      </Helmet>
      <SearchOptionMenuContainer></SearchOptionMenuContainer>
      <SortOptionMenuContainer></SortOptionMenuContainer>
      <PaginationContainer />
      <PostButtonContainer></PostButtonContainer>
      <PostListContainer></PostListContainer>
      <PaginationContainer />
    </>
  );
};

export default CommunityPage;
