import React, { useCallback, useEffect, useState } from 'react';
import SortOptionMenu from '../../components/common/SortOptionMenu';
import { useDispatch, useSelector } from 'react-redux';
import { selectSortType } from '../../modules/sort';
import { changePageNumber } from '../../modules/pagination';
import { changeSearchOptions } from '../../modules/search';
import { getPostsAsync } from '../../modules/posts';

const SortOptionMenuContainer = () => {
  const category = useSelector((state) => state.search.searchCategory);
  const keyword = useSelector((state) => state.search.searchKeyword);
  const dispatch = useDispatch();
  const handleSortClick = useCallback(
    (searchCategory, searchKeyword, sortType) => {
      dispatch(selectSortType(sortType));
      dispatch(changePageNumber(1));
      dispatch(changeSearchOptions({ searchCategory, searchKeyword }));
      dispatch(
        getPostsAsync({
          searchCategory,
          searchKeyword,
          sortType,
          currPageNum: 1,
          boardName: 'community',
          limit: 10,
        }),
      );
    },
    [dispatch],
  );

  useEffect(() => {
    // 초기값 : 최신순
    handleSortClick('titleDetail', '', 'newest');
  }, [handleSortClick]);

  return <SortOptionMenu handleSortClick={handleSortClick} category={category} keyword={keyword}></SortOptionMenu>;
};

export default SortOptionMenuContainer;
