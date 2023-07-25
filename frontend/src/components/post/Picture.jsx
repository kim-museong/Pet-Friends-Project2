import React from 'react';
import { styled } from 'styled-components';

const PictureBlock = styled.div`
  border: 1px solid tomato;
  display: block;
  object-fit: cover;
  .test img {
    max-width: 100%;
  }
`;

const Picture = ({ post, likeCount, boardName, loading }) => {
  return (
    <PictureBlock>
      {post && (
        <>
          <div>작성자 : {post && post.post.User.userId}</div>
          <div className="test" dangerouslySetInnerHTML={{ __html: post.post.Content.content }} />
          <div>조회수 : {post && post.post.view}</div>
          <div>댓글 수 : {post && post.commentCount}</div>
          <div>추천수 : {likeCount}</div>
        </>
      )}
    </PictureBlock>
  );
};

export default React.memo(Picture);
