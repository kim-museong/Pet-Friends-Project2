import React, { useCallback, useRef, useState } from 'react';
import SortOptionMenu from '../../components/common/SortOptionMenu';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsAsync } from '../../modules/posts';
import { useLocation } from 'react-router-dom';
import { selectPageNumber, selectSortType } from '../../modules/searchOption';

const SortOptionMenuContainer = () => {
  const location = useLocation();
  const { searchCategory, searchKeyword, tag, theme } = useSelector(({ searchOption, theme }) => ({
    searchCategory: searchOption.searchCategory,
    searchKeyword: searchOption.searchKeyword,
    tag: searchOption.tag,
    theme: theme.theme,
  }));

  const boardName = location.pathname.split('/')[1];
  const limit = useRef(10);
  const [activeButton, setActiveButton] = useState('newest');

  const dispatch = useDispatch();

  // 정렬 버튼 클릭
  const handleSortClick = useCallback(
    (searchCategory, searchKeyword, sortType) => {
      console.log('정렬버튼 클릭', tag);
      setActiveButton(sortType);
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
      theme={theme}
      activeButton={activeButton}
    ></SortOptionMenu>
  );
};

export default SortOptionMenuContainer;
