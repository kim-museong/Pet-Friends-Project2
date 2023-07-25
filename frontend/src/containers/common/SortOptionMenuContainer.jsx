import React, { useCallback, useEffect, useRef } from 'react';
import SortOptionMenu from '../../components/common/SortOptionMenu';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsAsync } from '../../modules/posts';
import { useLocation } from 'react-router-dom';
import { resetSearch, selectPageNumber, selectSortType } from '../../modules/searchOption';

const SortOptionMenuContainer = () => {
  const location = useLocation();

  const searchCategory = useSelector((state) => state.searchOption.searchCategory);
  const searchKeyword = useSelector((state) => state.searchOption.searchKeyword);
  const tag = useSelector((state) => state.searchOption.tag);
  const boardName = location.pathname.split('/')[1];
  const limit = useRef(10);

  const dispatch = useDispatch();

  // 정렬 버튼 클릭
  const handleSortClick = useCallback(
    (searchCategory, searchKeyword, sortType) => {
      console.log('정렬버튼 클릭', tag);
      dispatch(selectSortType(sortType));
      dispatch(selectPageNumber(1));
      dispatch(
        getPostsAsync({
          searchCategory,
          searchKeyword,
          sortType,
          currPageNum: 1,
          tag,
          boardName,
          limit: limit.current,
        }),
      );
    },
    [boardName, dispatch, tag],
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
