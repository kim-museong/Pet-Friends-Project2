import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SearchOptionMenu from '../../components/common/SearchOptionMenu';
import { changeSearchOptions } from '../../modules/search';
import { selectSortType } from '../../modules/sort';
import { changePageNumber } from '../../modules/pagination';

const SearchOptionMenuContainer = () => {
  const [category, setCategory] = useState('titleDetail');
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  const handleSearchClick = useCallback(
    (searchCategory, searchKeyword) => {
      dispatch(selectSortType('newest'));
      dispatch(changePageNumber(1));
      dispatch(changeSearchOptions(searchCategory, searchKeyword));
    },
    [dispatch],
  );
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };
  // const onSelectSearchKeyword = useCallback(
  //   (searchKeyword) => dispatch(selectSearchKeyword(searchKeyword)),
  //   [dispatch],
  // );
  // const onSelectSearchCategory = useCallback(
  //   (searchCategory) => dispatch(selectSearchCategory(searchCategory)),
  //   [dispatch],
  // );

  useEffect(() => {
    // 초기값 : ''
    // onSelectSearchKeyword('');
    // 초기값 : 제목+내용
    // onSelectSearchCategory('titleDetail');
    handleSearchClick('titleDetail', '');
  }, []);

  return (
    <SearchOptionMenu
      handleSearchClick={handleSearchClick}
      handleCategoryChange={handleCategoryChange}
      handleKeywordChange={handleKeywordChange}
      category={category}
      keyword={keyword}
      // onSelectSearchKeyword={onSelectSearchKeyword}
      // onSelectSearchCategory={onSelectSearchCategory}
    ></SearchOptionMenu>
  );
};

export default SearchOptionMenuContainer;
