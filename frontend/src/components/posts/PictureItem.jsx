import React from 'react';
import styled, { css } from 'styled-components';

const PictureItemBlock = styled.div`
  display: flex;
  border: 1px solid green;
  width: 150px;
  height: 200px;
  margin: 15px;
  // ↓ 나중에 수정
  ${({ imgurl }) =>
    imgurl &&
    css`
      background-image: url('${imgurl}');
      background-size: cover;
      background-position: center;
    `}
`;

const PictureItem = ({ post }) => {
  return <PictureItemBlock imgurl={post && post.imgUrl}></PictureItemBlock>;
};

export default PictureItem;
