import React, { useCallback, useRef } from 'react';
import SortOptionMenu from '../../components/common/SortOptionMenu';
import { useDispatch, useSelector } from 'react-redux';
import { selectSortType } from '../../modules/sort';
import { changePageNumber } from '../../modules/pagination';
import { getPostsAsync } from '../../modules/posts';
import { useLocation } from 'react-router-dom';

const SortOptionMenuContainer = () => {
  const location = useLocation();

  const searchCategory = useSelector((state) => state.search.searchCategory);
  const searchKeyword = useSelector((state) => state.search.searchKeyword);
  const boardName = location.pathname.split('/')[1];
  const limit = useRef(10);

  const dispatch = useDispatch();

  // 정렬 버튼 클릭
  const handleSortClick = useCallback(
    (searchCategory, searchKeyword, sortType) => {
      dispatch(selectSortType(sortType));
      dispatch(changePageNumber(1));
      dispatch(
        getPostsAsync({
          searchCategory,
          searchKeyword,
          sortType,
          currPageNum: 1,
          boardName,
          limit: limit.current,
        }),
      );
    },
    [boardName, dispatch],
  );

  return (
    <SortOptionMenu
      handleSortClick={handleSortClick}
      searchCategory={searchCategory}
      searchKeyword={searchKeyword}
    ></SortOptionMenu>
  );
};

export default SortOptionMenuContainer;
