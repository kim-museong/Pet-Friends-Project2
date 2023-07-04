import React from 'react';
import { styled } from 'styled-components';
import Responsive from '../common/Responsive';

const PictureBlock = styled(Responsive)`
  border: 1px solid tomato;
  display: block;
`;

const Picture = ({ post }) => {
  console.log('post data : ', post);
  return (
    <PictureBlock>
      <div>작성자 : {post && post.post.User.userId}</div>
      <div>제목 : {post && post.post.title}</div>
      <div>좋아요 : {post && post.likeCount}</div>
      <div>조회수 : {post && post.post.view}</div>
      <div>댓글 수 : {post && post.commentCount}</div>
    </PictureBlock>
  );
};

export default React.memo(Picture);
