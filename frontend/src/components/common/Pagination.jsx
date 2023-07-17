import React from 'react';
import { styled } from 'styled-components';
import Button from './Button';

const PaginationBlock = styled.div`
  border: 1px solid tomato;
  background: #bcefa8;
  display: flex;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  border: 1px solid green;
  & + & {
    margin-left: 0.25rem;
  }
  &:disabled {
    opacity: 0.5; // TODO : 테스트용. 동작 확인되면 0으로 바꿔서 아예 안보이게.
    cursor: default;
  }
`;

const PageButton = ({ handleClick, buttonText, disabled }) => {
  return (
    <StyledButton disabled={disabled} onClick={() => handleClick(buttonText)}>
      {buttonText}
    </StyledButton>
  );
};

const Pagination = ({ firstPageNum, lastPageNum, handleClick, currPageNum, totalPage }) => {
  return (
    <PaginationBlock>
      <PageButton disabled={currPageNum === 1} handleClick={handleClick} buttonText={'<<'}></PageButton>
      <PageButton disabled={currPageNum === 1} handleClick={handleClick} buttonText={'<'}></PageButton>
      {Array(lastPageNum - firstPageNum + 1)
        .fill()
        .map((_, index) => (
          <PageButton key={index} handleClick={handleClick} buttonText={firstPageNum + index}></PageButton>
        ))}
      <PageButton disabled={currPageNum === totalPage} handleClick={handleClick} buttonText={'>'}></PageButton>
      <PageButton disabled={currPageNum === totalPage} handleClick={handleClick} buttonText={'>>'}></PageButton>
    </PaginationBlock>
  );
};

export default Pagination;
