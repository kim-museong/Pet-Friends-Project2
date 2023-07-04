import React from 'react';
import { styled } from 'styled-components';

const CommentsBlock = styled.div`
  border: 1px solid tan;
`;

const Comments = ({ comments }) => {
  console.log('test', comments);
  return;
  <CommentsBlock>
    {comments.map((comment) => (
      <div key={comment.id}>{comment.content}</div>
    ))}
  </CommentsBlock>;
};

export default Comments;
