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

const CommentInput = ({ user, handleCommentChange, handleClick }) => {
  return (
    <CommentInputBlock>
      <StyledTextarea
        onChange={handleCommentChange}
        disabled={!user}
        placeholder={user ? '' : '로그인한 유저만 댓글을 등록하실 수 있습니다.'}
      ></StyledTextarea>
      <StyledButton onClick={handleClick} disabled={!user}>
        댓글쓰기
      </StyledButton>
    </CommentInputBlock>
  );
};

export default CommentInput;
