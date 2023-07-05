import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const SortOptionMenuBlock = styled.div`
  border: 1px solid blue;
  background: #b0a5a5;
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const StyledButton = styled(Button)`
  margin-left: 1rem;
  box-shadow: 5px 5px 5px rgba(235, 173, 38, 0.5);
`;

const SortOptionMenu = ({ onSelectSortType }) => {
  return (
    <>
      <SortOptionMenuBlock>
        <StyledButton onClick={() => onSelectSortType('newest')}>최신순</StyledButton>
        <StyledButton onClick={() => onSelectSortType('oldest')}>오래된순</StyledButton>
        <StyledButton onClick={() => onSelectSortType('highestViews')}>높은조회수</StyledButton>
        <StyledButton onClick={() => onSelectSortType('lowestViews')}>낮은조회수</StyledButton>
      </SortOptionMenuBlock>
    </>
  );
};

export default SortOptionMenu;
