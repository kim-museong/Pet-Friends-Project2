import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import PictureItem from './PictureItem';

const PictureListBlock = styled(Responsive)`
  margin-top: 3rem;
  border: 1px solid red;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* align-content: flex-start; */
  justify-content: center;
`;

// 스크롤바 바닥에 닿으면 게시글 추가 요청해서
// store > state > picturelist 갱신
const PictureList = () => {
  return (
    <PictureListBlock>
      <PictureItem></PictureItem>
      <PictureItem></PictureItem>
      <PictureItem></PictureItem>
      <PictureItem></PictureItem>
      <PictureItem></PictureItem>
      <PictureItem></PictureItem>
      <PictureItem></PictureItem>
      <PictureItem></PictureItem>
      <PictureItem></PictureItem>
      <PictureItem></PictureItem>
      <PictureItem></PictureItem>
      <PictureItem></PictureItem>
      <PictureItem></PictureItem>
      <PictureItem></PictureItem>
      <PictureItem></PictureItem>
      <PictureItem></PictureItem>
    </PictureListBlock>
  );
};

export default PictureList;
