import React from 'react';
import styled, { css } from 'styled-components';
import Button from './Button';
import palette from '../../lib/styles/palette';

const SortOptionMenuBlock = styled.div`
  margin-top: 20px;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(30,30,30)' : 'white')};
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const buttonStyles = css`
  width: 70px;
  padding: 0 0 7px;
  font-size: 14px;
  border-radius: 0;
  background: inherit;
  cursor: pointer;

  & + & {
    margin: 0 5px;
  }

  &:hover {
    color: ${palette.mainColor};
    background: inherit;
  }
`;

const activeButtonStyles = css`
  color: ${palette.mainColor};
  border-bottom: 2px solid ${palette.mainColor};
`;

const StyledButton = styled(Button)`
  ${buttonStyles};
  color: ${({ theme }) => (theme === 'true' ? 'white' : 'black')};
  ${({ active }) => active && activeButtonStyles}
`;

const SortOptionMenu = ({ handleSortClick, searchCategory, searchKeyword, theme, activeButton }) => {
  return (
    <SortOptionMenuBlock theme={String(theme)}>
      <StyledButton
        theme={String(theme)}
        active={activeButton === 'newest'}
        onClick={() => handleSortClick(searchCategory, searchKeyword, 'newest')}
      >
        최신순
      </StyledButton>
      <StyledButton
        theme={String(theme)}
        active={activeButton === 'oldest'}
        onClick={() => handleSortClick(searchCategory, searchKeyword, 'oldest')}
      >
        오래된순
      </StyledButton>
      <StyledButton
        theme={String(theme)}
        active={activeButton === 'highestViews'}
        onClick={() => handleSortClick(searchCategory, searchKeyword, 'highestViews')}
      >
        높은조회수
      </StyledButton>
      <StyledButton
        theme={String(theme)}
        active={activeButton === 'lowestViews'}
        onClick={() => handleSortClick(searchCategory, searchKeyword, 'lowestViews')}
      >
        낮은조회수
      </StyledButton>
      <StyledButton
        theme={String(theme)}
        active={activeButton === 'highestLikes'}
        onClick={() => handleSortClick(searchCategory, searchKeyword, 'highestLikes')}
      >
        추천높은순
      </StyledButton>
      <StyledButton
        theme={String(theme)}
        active={activeButton === 'lowestLikes'}
        onClick={() => handleSortClick(searchCategory, searchKeyword, 'lowestLikes')}
      >
        추천낮은순
      </StyledButton>
    </SortOptionMenuBlock>
  );
};

export default SortOptionMenu;
