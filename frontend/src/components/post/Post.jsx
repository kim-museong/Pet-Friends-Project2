import React from 'react';
import { styled } from 'styled-components';
import Responsive from '../common/Responsive';

const PostBlock = styled(Responsive)`
  border: 1px solid tomato;
  display: block;
  objectfit: cover;
  .test img {
    max-width: 100%;
  }
`;

const Post = ({ post }) => {
  return (
    <PostBlock>
      {post && (
        <>
          <div>작성자 : {post.post.User.userId}</div>
          <div>제목 : {post.post.title}</div>
          <div className="test" dangerouslySetInnerHTML={{ __html: post.post.Content.content }} />
          <div>좋아요 : {post.likeCount}</div>
          <div>조회수 : {post.post.view}</div>
          <div>댓글 수 : {post.commentCount}</div>
        </>
      )}
    </PostBlock>
  );
};

export default React.memo(Post);
