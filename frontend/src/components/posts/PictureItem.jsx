import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const PictureItemBlock = styled.div`
  display: flex;
  border: 1px solid green;
  width: 150px;
  height: 200px;
  margin: 0;
  // ↓ 나중에 수정
  ${({ imgurl }) =>
    imgurl &&
    css`
      background-image: url('${imgurl}');
      background-size: cover;
      background-position: center;
    `}
  cursor: pointer;
`;

const Wrapper = styled.div`
  margin: 15px;
`;

const PictureItem = ({ post, loading }) => {
  return (
    <>
      <Wrapper>
        <Link to={`/picture/${post.id}`}>
          <PictureItemBlock imgurl={post && post.PictureDetail.imgUrl}></PictureItemBlock>
        </Link>
      </Wrapper>
    </>
  );
};

export default PictureItem;
