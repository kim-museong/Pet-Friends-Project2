import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchOptionMenu from '../../components/common/SearchOptionMenu';
import { getPostsAsync } from '../../modules/posts';
import { useLocation } from '../../../node_modules/react-router-dom/dist/index';
import { selectPageNumber, selectSearchOptions, selectSortType, selectTag } from '../../modules/searchOption';

const SearchOptionMenuContainer = () => {
  const location = useLocation();

  const searchCategory = useSelector((state) => state.searchOption.searchCategory);
  const searchKeyword = useSelector((state) => state.searchOption.searchKeyword);
  const sortType = useSelector((state) => state.searchOption.sortType);
  const pageNumber = useSelector((state) => state.searchOption.pageNumber);
  const tag = useSelector((state) => state.searchOption.tag);

  const boardName = location.pathname.split('/')[1];
  const limit = useRef(10);

  const inputEl = useRef(null);
  const dispatch = useDispatch();

  // 검색 버튼 클릭
  const handleSearchClick = useCallback(
    (searchCategory, searchKeyword) => {
      dispatch(selectTag(null));
      dispatch(selectSortType('newest'));
      dispatch(selectPageNumber(1));
      dispatch(
        getPostsAsync({
          searchCategory,
          searchKeyword,
          sortType: 'newest',
          currPageNum: 1,
          tag: null,
          boardName,
          limit: limit.current,
        }),
      );
    },
    [boardName, dispatch],
  );
  // 검색 초기화 버튼 클릭
  const handleResetClick = () => {
    dispatch(selectSearchOptions({ searchCategory: 'titleDetail', searchKeyword: '' }));
    dispatch(selectSortType('newest'));
    dispatch(selectPageNumber(1));
    dispatch(selectTag(null));
    dispatch(
      getPostsAsync({
        // searchCategory: 'titleDetail',
        // searchKeyword: '',
        // sortType: 'newest',
        // currPageNum: 1,
        // tag: null,
        boardName,
        // limit: limit.current,
      }),
    );
    inputEl.current.value = '';
  };
  // 검색 카테고리 변경
  const handleCategoryChange = (event) => {
    dispatch(selectSearchOptions({ searchCategory: event.target.value, searchKeyword: searchKeyword }));
  };
  // 검색 키워드 변경
  const handleKeywordChange = (event) => {
    dispatch(selectSearchOptions({ searchCategory: searchCategory, searchKeyword: event.target.value }));
  };
  // 키보드 입력 감지
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
      handleResetClick={handleResetClick}
      handleCategoryChange={handleCategoryChange}
      handleKeywordChange={handleKeywordChange}
      handleKeydown={handleKeydown}
      searchCategory={searchCategory}
      searchKeyword={searchKeyword}
      sortType={sortType}
      pageNumber={pageNumber}
      tag={tag}
      inputEl={inputEl}
    ></SearchOptionMenu>
  );
};

export default React.memo(SearchOptionMenuContainer);
