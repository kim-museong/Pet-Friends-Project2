import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const WriteActionButtonBlock = styled.div`
  margin-top: 1rem;
  margin-bottom: 3rem;
  button + button {
    margin-left: 0.5rem;
  }
  display: flex;
  justify-content: flex-end;
`;

const StyledButton = styled(Button)`
  height: 2.125rem;
  & + & {
    margin-left: 0.5rem;
  }
`;

const WriteActionButton = ({ onSubmit, onCancel }) => {
  return (
    <WriteActionButtonBlock>
      <StyledButton onClick={onSubmit}> 글쓰기 </StyledButton>
      <StyledButton onClick={onCancel}> 취소 </StyledButton>
    </WriteActionButtonBlock>
  );
};

export default WriteActionButton;
