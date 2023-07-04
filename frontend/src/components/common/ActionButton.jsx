import React from 'react';
import { styled } from 'styled-components';
import Button from './Button';

const ActionButtonBlock = styled.div`
  border: 1px solid green;
`;

const ActionButton = () => {
  return (
    <ActionButtonBlock>
      <Button>수정</Button>
      <Button>삭제</Button>
    </ActionButtonBlock>
  );
};

export default ActionButton;
