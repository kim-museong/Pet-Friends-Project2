import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';

const CommentInputBlock = styled.div`
  margin: 20px 0;
  padding: 10px 20px;
  border: 1px solid ${palette.border};
  width: 100%;
  display: flex;
`;

const StyledTextarea = styled.textarea`
  font-size: 18px;
  padding: 10px 20px;
  height: 100%;
  flex: 1;
  resize: none;
  border: 1px solid ${palette.border};
  background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'white ')};
  outline: none;
  margin-right: 0.5rem;
  overflow: hidden;
  ${({ disabled }) =>
    disabled &&
    `
    color: gray;
  `}
`;

const StyledButton = styled(Button)`
  width: 100px;
  padding: 10px;
  background-color: inherit;
  color: ${palette.mainColor};

  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
    cursor:default;
  `};

  &:hover {
    background: inherit;
    color: ${palette.border};
  }
`;

const CommentInput = ({ handleCommentChange, loggedInUser, textareaEl, handleClick, theme }) => {
  return (
    <>
      <CommentInputBlock>
        <StyledTextarea
          rows={1}
          onChange={handleCommentChange}
          disabled={!loggedInUser}
          placeholder={loggedInUser ? '' : '로그인한 유저만 댓글을 등록하실 수 있습니다.'}
          ref={textareaEl}
          theme={String(theme)}
        ></StyledTextarea>

        <StyledButton onClick={handleClick}>댓글쓰기</StyledButton>
      </CommentInputBlock>
    </>
  );
};

export default CommentInput;
