import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SearchOptionMenu from '../../components/common/SearchOptionMenu';
import { changeSearchOptions } from '../../modules/search';
import { selectSortType } from '../../modules/sort';
import { changePageNumber } from '../../modules/pagination';
import { getPostsAsync } from '../../modules/posts';

const SearchOptionMenuContainer = () => {
  const [category, setCategory] = useState('');
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  const handleSearchClick = useCallback(
    (searchCategory, searchKeyword) => {
      dispatch(selectSortType('newest'));
      dispatch(changePageNumber(1));
      dispatch(changeSearchOptions({ searchCategory, searchKeyword }));
      dispatch(
        getPostsAsync({
          searchCategory,
          searchKeyword,
          sortType: 'newest',
          currPageNum: 1,
          boardName: 'community',
          limit: 10,
        }),
      );
    },
    [dispatch],
  );
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  useEffect(() => {
    handleSearchClick('titleDetail', '');
  }, [handleSearchClick]);

  return (
    <SearchOptionMenu
      handleSearchClick={handleSearchClick}
      handleCategoryChange={handleCategoryChange}
      handleKeywordChange={handleKeywordChange}
      category={category}
      keyword={keyword}
    ></SearchOptionMenu>
  );
};

export default SearchOptionMenuContainer;
