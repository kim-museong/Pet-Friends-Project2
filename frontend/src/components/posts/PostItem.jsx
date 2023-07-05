import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PostItemBlock = styled.div`
  display: flex;
  border: 1px solid green;
  width: 100%;
  height: 100px;
  margin: 0;
  cursor: pointer;
`;

const Wrapper = styled.div`
  width: 100%;
  margin: 15px;
`;

const PostItem = ({ post, loading }) => {
  return (
    <>
      <Wrapper>
        <Link to={`/community/${post.id}`}>
          <PostItemBlock>{post.title}</PostItemBlock>
        </Link>
      </Wrapper>
    </>
  );
};

export default PostItem;
