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
  handleCategoryChange,
  handleKeywordChange,
  searchCategory,
  searchKeyword,
  category,
  keyword,
  inputEl,
}) => {
  // enter 키로 검색
  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.keyCode === 13 && inputEl.current === document.activeElement /* enter 키 */) {
        inputEl.current.blur();
        handleSearchClick(category, keyword);
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [category, handleSearchClick, inputEl, keyword]);

  return (
    <SearchOptionMenuBlock>
      <select name="" id="searchType" onChange={handleCategoryChange}>
        <option value="titleDetail">제목+내용</option>
        <option value="title">제목</option>
        <option value="nickname">작성자</option>
      </select>
      <input type="text" placeholder="검색어를 입력하세요." onChange={handleKeywordChange} ref={inputEl} />
      <button onClick={() => handleSearchClick(category, keyword)}>검색</button>
    </SearchOptionMenuBlock>
  );
};

export default SearchOptionMenu;
