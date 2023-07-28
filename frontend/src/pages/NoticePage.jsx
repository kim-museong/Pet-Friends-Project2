import React from 'react';
import SearchOptionMenuContainer from '../containers/common/SearchOptionMenuContainer';
import SortOptionMenuContainer from '../containers/common/SortOptionMenuContainer';
import PostButtonContainer from '../containers/posts/PostButtonContainer';
import PostListContainer from '../containers/posts/PostListContainer';
import PaginationContainer from '../containers/common/PaginationContainer';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';

const Space = styled.div`
  height: 50px;
`;

const NoticePage = () => {
  return (
    <>
      <Helmet>
        <title>펫프렌즈 - 공지사항</title>
      </Helmet>
      <SearchOptionMenuContainer></SearchOptionMenuContainer>
      <SortOptionMenuContainer></SortOptionMenuContainer>
      <PaginationContainer />
      <PostButtonContainer></PostButtonContainer>
      <PostListContainer></PostListContainer>
      <Space />
      <PaginationContainer />
    </>
  );
};

export default NoticePage;
