import React, { useEffect } from 'react';
import styled from 'styled-components';

const SearchOptionMenuBlock = styled.div`
  border: 1px solid blue;
  background: #c6a1a1;
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const SearchOptionMenu = ({
  handleSearchClick,
  handleResetClick,
  handleCategoryChange,
  handleKeywordChange,
  handleKeydown,
  searchCategory,
  searchKeyword,
  sortType,
  pageNumber,
  tag,
  inputEl,
}) => {
  // keydown 이벤트 활성화
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);

  return (
    <SearchOptionMenuBlock>
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
    </SearchOptionMenuBlock>
  );
};

export default SearchOptionMenu;
