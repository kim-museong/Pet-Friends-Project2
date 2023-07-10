import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchOptionMenu from '../../components/common/SearchOptionMenu';
import { changeSearchOptions } from '../../modules/search';
import { selectSortType } from '../../modules/sort';
import { changePageNumber } from '../../modules/pagination';
import { getPostsAsync } from '../../modules/posts';
import { useLocation } from '../../../node_modules/react-router-dom/dist/index';

const SearchOptionMenuContainer = () => {
  const location = useLocation();

  const searchCategory = useSelector((state) => state.search.searchCategory);
  const searchKeyword = useSelector((state) => state.search.searchKeyword);
  const sortType = useSelector((state) => state.sort.sortType);
  const currPageNum = useSelector((state) => state.pagination.pageNumber);
  const boardName = location.pathname.split('/')[1];
  const limit = useRef(10);

  const inputEl = useRef(null);
  const dispatch = useDispatch();

  // postlist쪽으로 옮겨야함
  // 렌더링, 리렌더링
  // useEffect(() => {
  //   if (searchCategory === null && searchKeyword === null) {
  //     console.log('SearchOptionMenuContainer 첫 렌더링. 초기화 시작.');
  //     dispatch(
  //       getPostsAsync({
  //         searchCategory: 'titleDetail',
  //         searchKeyword: '',
  //         sortType: 'newest',
  //         currPageNum: 1,
  //         boardName,
  //         limit: limit.current,
  //       }),
  //     );
  //   } else {
  //     console.log('SearchOptionMenuContainer 리렌더링. 초기화 시작.');
  //     dispatch(
  //       getPostsAsync({
  //         searchCategory,
  //         searchKeyword,
  //         sortType,
  //         currPageNum,
  //         boardName,
  //         limit: limit.current,
  //       }),
  //     );
  //   }
  // }, [dispatch]);

  const handleSearchClick = useCallback(
    (searchCategory, searchKeyword) => {
      dispatch(selectSortType('newest'));
      dispatch(changePageNumber(1));
      dispatch(
        getPostsAsync({
          searchCategory,
          searchKeyword,
          sortType: 'newest',
          currPageNum: 1,
          boardName,
          limit: limit.current,
        }),
      );
    },
    [dispatch],
  );
  const handleCategoryChange = (event) => {
    dispatch(changeSearchOptions({ searchCategory: event.target.value, searchKeyword: searchKeyword }));
  };
  const handleKeywordChange = (event) => {
    dispatch(changeSearchOptions({ searchCategory: searchCategory, searchKeyword: event.target.value }));
  };
  const handleKeydown = (event) => {
    // enter키 && input이 현재 활성화되어있음
    if (event.keyCode === 13 && inputEl.current === document.activeElement) {
      event.preventDefault();
      console.log('enter키 눌림&&input활성화 상태');
      console.log(searchCategory, searchKeyword, '111111111');
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
