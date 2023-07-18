import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const CommentInputBlock = styled.div`
  margin-top: 0.5rem;
  padding: 0.5rem;
  border: 1px solid green;
  width: 100%;
  height: 6rem;
  display: flex;
`;

const StyledTextarea = styled.textarea`
  flex: 1;
  height: 100%;
  resize: none;
  margin-right: 0.5rem;
  ${({ disabled }) =>
    disabled &&
    `
    color: gray;
  `}
`;

const StyledButton = styled(Button)`
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
    cursor:default;
  `}
`;

const TESTCommentInput = () => {
  return (
    <CommentInputBlock>
      <StyledTextarea></StyledTextarea>
      <StyledButton>댓글쓰기</StyledButton>
    </CommentInputBlock>
  );
};

export default TESTCommentInput;
