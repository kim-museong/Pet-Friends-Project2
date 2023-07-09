import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const SearchOptionMenuBlock = styled.div`
  border: 1px solid blue;
  background: #c6a1a1;
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const SearchOptionMenu = ({ handleSearchClick, handleCategoryChange, handleKeywordChange, category, keyword }) => {
  // const handleOptionChange = (event) => {
  //   onSelectSearchCategory(event.target.value);
  // };
  // const handleInputChange = (event) => {
  //   onSelectSearchKeyword(event.target.value);
  // };

  return (
    <SearchOptionMenuBlock>
      <select name="" id="searchType" onChange={handleCategoryChange}>
        <option value="titleDetail">제목+내용</option>
        <option value="title">제목</option>
        <option value="nickname">작성자</option>
      </select>
      <input type="text" placeholder="검색어를 입력하세요." onChange={handleKeywordChange} />
      <button onClick={handleSearchClick(category, keyword)}>검색</button>
    </SearchOptionMenuBlock>
  );
};

export default SearchOptionMenu;
