import React from 'react';
import { styled } from 'styled-components';
import Button from '../common/Button';

const SubmitCommentBlock = styled.div`
  border: 1px solid orange;
`;

const StyledTextarea = styled.textarea`
  resize: none;
  width: 70%;
  height: 150px;
  font-size: 2rem;
`;

const SubmitButton = styled(Button)`
  height: 150px;
  width: 150px;
`;

const SubmitComment = () => {
  return (
    <SubmitCommentBlock>
      <StyledTextarea></StyledTextarea>
      <SubmitButton>등록</SubmitButton>
    </SubmitCommentBlock>
  );
};

export default SubmitComment;
