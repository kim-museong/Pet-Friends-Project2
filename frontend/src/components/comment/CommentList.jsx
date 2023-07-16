import React from 'react';
import styled from 'styled-components';

const CommentListBlock = styled.div`
  border: 1px solid greenyellow;
`;

const Comment = () => {
  return <div>comment</div>;
};

const CommentList = () => {
  return (
    <CommentListBlock>
      <Comment></Comment>
      <Comment></Comment>
      <Comment></Comment>
      <Comment></Comment>
    </CommentListBlock>
  );
};

export default CommentList;
