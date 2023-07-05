import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import PostItem from './PostItem';

const PostListBlock = styled(Responsive)`
  margin-top: 3rem;
  border: 1px solid red;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const PostList = ({ posts, loading }) => {
  return <PostListBlock>{posts && posts.map((post) => <PostItem key={post.id} post={post}></PostItem>)}</PostListBlock>;
};

export default PostList;
