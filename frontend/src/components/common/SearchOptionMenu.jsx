import React, { useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const SearchOptionMenuBlock = styled.div`
  background: ${({ theme }) => (theme === 'true' ? 'rgb(30,30,30)' : 'white')};
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  padding-bottom: 1rem;

  select,
  input,
  button {
    border-radius: 0;
    border: none;
    background: inherit;
    margin: 0 5px;
    outline: none;
    color: ${({ theme }) => (theme === 'true' ? 'white' : 'black')};
  }

  select,
  option,
  button {
    cursor: pointer;
    padding: 3px 10px;
    font-weight: bold;

    &:hover {
      color: ${palette.mainColor};
    }
  }
`;

const SearchBlock = styled.div`
  border: ${({ theme }) => (theme === 'true' ? '2px solid rgb(30,30,30)' : `2px solid ${palette.mainColor}`)};
  background: ${({ theme }) => (theme === 'true' ? 'rgb(60,60,60)' : 'white')};
  color: ${({ theme }) => (theme === 'true' ? 'white' : 'black')};
  padding: 10px 20px;

  input {
    width: 300px;
  }
`;

const SearchOptionMenu = ({
  handleSearchClick,
  handleResetClick,
  handleCategoryChange,
  handleKeywordChange,
  handleKeydown,
  searchCategory = '',
  searchKeyword,
  sortType,
  pageNumber,
  tag,
  inputEl,
  theme,
}) => {
  // keydown 이벤트 활성화
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);

  return (
    <SearchOptionMenuBlock theme={String(theme)}>
      <SearchBlock theme={String(theme)}>
        <select name="" id="searchType" value={searchCategory} onChange={handleCategoryChange}>
          <option value="titleDetail">제목+내용</option>
          <option value="title">제목</option>
          <option value="nickname">작성자</option>
        </select>
        <input type="text" placeholder="검색어를 입력하세요." onChange={handleKeywordChange} ref={inputEl} />
        <button onClick={() => handleSearchClick(searchCategory, searchKeyword)}>검색</button>
        {(searchKeyword || searchCategory !== 'titleDetail' || sortType !== 'newest' || pageNumber !== 1 || tag) && (
          <button onClick={() => handleResetClick()}>검색 조건 초기화</button>
        )}
      </SearchBlock>
    </SearchOptionMenuBlock>
  );
};

export default SearchOptionMenu;
