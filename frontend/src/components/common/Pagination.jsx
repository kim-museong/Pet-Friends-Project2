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
`;

const PageButton = ({ buttonText, handleClick }) => {
  return <StyledButton onClick={() => handleClick(buttonText)}>{buttonText}</StyledButton>;
};

const Pagination = ({ firstPageNum, lastPageNum, handleClick }) => {
  return (
    <PaginationBlock>
      <PageButton handleClick={handleClick} buttonText={'<<'}></PageButton>
      <PageButton handleClick={handleClick} buttonText={'<'}></PageButton>
      {Array(lastPageNum - firstPageNum + 1)
        .fill()
        .map((_, index) => (
          <PageButton key={index} handleClick={handleClick} buttonText={firstPageNum + index}></PageButton>
        ))}
      <PageButton handleClick={handleClick} buttonText={'>'}></PageButton>
      <PageButton handleClick={handleClick} buttonText={'>>'}></PageButton>
    </PaginationBlock>
  );
};

export default Pagination;
