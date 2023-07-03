import React from 'react';
import styled from 'styled-components';

const SearchOptionMenuBlock = styled.div`
  border: 1px solid blue;
  background: #c6a1a1;
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const SearchOptionMenu = () => {
  return (
    <SearchOptionMenuBlock>
      <select name="" id="searchType">
        <option value="titleContent">제목+내용</option>
        <option value="title">제목</option>
        <option value="nickname">작성자</option>
      </select>
      <input type="text" placeholder="검색어를 입력하세요." />
      <button>검색</button>
    </SearchOptionMenuBlock>
  );
};

export default SearchOptionMenu;
