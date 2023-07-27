import React from 'react';
import SearchOptionMenuContainer from '../containers/common/SearchOptionMenuContainer';
import SortOptionMenuContainer from '../containers/common/SortOptionMenuContainer';
import PostButtonContainer from '../containers/posts/PostButtonContainer';
import PostListContainer from '../containers/posts/PostListContainer';
import PaginationContainer from '../containers/common/PaginationContainer';
import styled from 'styled-components';

const Space = styled.div`
  width: 100%;
  height: 50px;
`;

const InformationPage = () => {
  return (
    <>
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

export default InformationPage;
