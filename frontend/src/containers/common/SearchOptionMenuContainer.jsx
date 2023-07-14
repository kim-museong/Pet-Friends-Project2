import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchOptionMenu from '../../components/common/SearchOptionMenu';
import { getPostsAsync } from '../../modules/posts';
import { useLocation } from '../../../node_modules/react-router-dom/dist/index';
import { selectPageNumber, selectSearchOptions, selectSortType } from '../../modules/searchOption';

const SearchOptionMenuContainer = () => {
  const location = useLocation();

  const searchCategory = useSelector((state) => state.searchOption.searchCategory);
  const searchKeyword = useSelector((state) => state.searchOption.searchKeyword);
  const tag = useSelector((state) => state.searchOption.tag);
  const boardName = location.pathname.split('/')[1];
  const limit = useRef(10);

  const inputEl = useRef(null);
  const dispatch = useDispatch();

  // 검색 버튼 클릭
  const handleSearchClick = useCallback(
    (searchCategory, searchKeyword) => {
      dispatch(selectSortType('newest'));
      dispatch(selectPageNumber(1));
      dispatch(
        getPostsAsync({
          searchCategory,
          searchKeyword,
          sortType: 'newest',
          currPageNum: 1,
          tag: '',
          boardName,
          limit: limit.current,
        }),
      );
    },
    [boardName, dispatch],
  );
  const handleCategoryChange = (event) => {
    dispatch(selectSearchOptions({ searchCategory: event.target.value, searchKeyword: searchKeyword }));
  };
  const handleKeywordChange = (event) => {
    dispatch(selectSearchOptions({ searchCategory: searchCategory, searchKeyword: event.target.value }));
  };
  const handleKeydown = (event) => {
    // enter키 && input이 현재 활성화되어있음
    if (event.keyCode === 13 && inputEl.current === document.activeElement) {
      event.preventDefault();
      inputEl.current.blur();
      handleSearchClick(searchCategory, searchKeyword);
    }
  };

  return (
    <SearchOptionMenu
      handleSearchClick={handleSearchClick}
      handleCategoryChange={handleCategoryChange}
      handleKeywordChange={handleKeywordChange}
      handleKeydown={handleKeydown}
      searchCategory={searchCategory}
      searchKeyword={searchKeyword}
      inputEl={inputEl}
    ></SearchOptionMenu>
  );
};

export default React.memo(SearchOptionMenuContainer);
