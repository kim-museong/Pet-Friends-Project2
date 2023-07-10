import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchOptionMenu from '../../components/common/SearchOptionMenu';
import { changeSearchOptions } from '../../modules/search';
import { selectSortType } from '../../modules/sort';
import { changePageNumber } from '../../modules/pagination';
import { getPostsAsync } from '../../modules/posts';

const SearchOptionMenuContainer = () => {
  const searchCategory = useSelector((state) => state.search.searchCategory);
  const searchKeyword = useSelector((state) => state.search.searcKeyword);
  const [category, setCategory] = useState('titleDetail');
  const [keyword, setKeyword] = useState('');
  const inputEl = useRef(null);
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
    if (searchCategory === null && searchKeyword === null) {
      dispatch(
        getPostsAsync({
          searchCategory: 'titleDetail',
          searchKeyword: '',
          sortType: 'newest',
          currPageNum: 1,
          boardName: 'community',
          limit: 10,
        }),
      );
    }
  }, [dispatch, handleSearchClick, searchCategory, searchKeyword]);

  return (
    <SearchOptionMenu
      handleSearchClick={handleSearchClick}
      handleCategoryChange={handleCategoryChange}
      handleKeywordChange={handleKeywordChange}
      searchCategory={searchCategory}
      searchKeyword={searchKeyword}
      category={category}
      keyword={keyword}
      inputEl={inputEl}
    ></SearchOptionMenu>
  );
};

export default SearchOptionMenuContainer;
