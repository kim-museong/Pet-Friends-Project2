import React from 'react';
import { styled } from 'styled-components';
import Responsive from '../common/Responsive';

const PostBlock = styled(Responsive)`
  border: 1px solid tomato;
  display: block;
`;

const Post = ({ post }) => {
  console.log('post data : ', post);
  return (
    <PostBlock>
      <div>작성자 : {post && post.post.User.userId}</div>
      <div>제목 : {post && post.post.title}</div>
      <div>좋아요 : {post && post.likeCount}</div>
      <div>조회수 : {post && post.post.view}</div>
      <div>댓글 수 : {post && post.commentCount}</div>
    </PostBlock>
  );
};

export default React.memo(Post);
