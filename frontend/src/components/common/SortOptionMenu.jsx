import React from 'react';
import styled from 'styled-components';

const SortOptionMenuBlock = styled.div`
  border: 1px solid blue;
  background: #b0a5a5;
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const SortOptionMenu = ({ onSelectSortType }) => {
  return (
    <>
      <SortOptionMenuBlock>
        <button onClick={() => onSelectSortType('newest')}>최신순</button>
        <button onClick={() => onSelectSortType('oldest')}>오래된순</button>
        <button onClick={() => onSelectSortType('highview')}>높은조회수</button>
        <button onClick={() => onSelectSortType('lowview')}>낮은조회수</button>
      </SortOptionMenuBlock>
    </>
  );
};

export default SortOptionMenu;
