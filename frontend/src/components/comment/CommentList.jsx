import React from 'react';
import styled from 'styled-components';

const CommentListBlock = styled.div`
  border: 1px solid greenyellow;
`;

const Comment = ({ comment }) => {
  return (
    <div>
      <div>{comment.createdAt}</div>
      <div>{comment.content}</div>
    </div>
  );
};

const CommentList = ({ comments }) => {
  return (
    <CommentListBlock>
      {comments && comments.map((comment) => <Comment key={comment.id} comment={comment}></Comment>)}
    </CommentListBlock>
  );
};

export default CommentList;
