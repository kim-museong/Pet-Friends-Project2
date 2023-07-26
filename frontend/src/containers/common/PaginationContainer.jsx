import React, { useCallback, useEffect, useRef, useState } from 'react';
import Pagination from '../../components/common/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { selectPageNumber } from '../../modules/searchOption';
import { useLocation } from 'react-router-dom';
import { getPostsAsync } from '../../modules/posts';

const PaginationContainer = () => {
  const location = useLocation();
  const boardName = location.pathname.split('/')[1];
  const { searchCategory, searchKeyword, sortType, tag, postCount, currPageNum, theme } = useSelector(
    ({ searchOption, posts, theme }) => ({
      searchCategory: searchOption.searchCategory,
      searchKeyword: searchOption.searchKeyword,
      sortType: searchOption.sortType,
      tag: searchOption.tag,
      postCount: posts.postCount,
      currPageNum: searchOption.pageNumber,
      theme: theme.theme,
    }),
  );

  const limit = useRef(10);
  const [selcetPage, setSelectPage] = useState(1);
  const [firstPageNum, setFirstPageNum] = useState(1);
  const [lastPageNum, setLastPageNum] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const dispatch = useDispatch();

  // 총 page 수 결정
  useEffect(() => {
    setTotalPage(Math.ceil(postCount / 10));
  }, [postCount]);

  // 페이지네이션 시작점, 끝점 결정
  useEffect(() => {
    if (totalPage < 11) {
      setFirstPageNum(1);
      setLastPageNum(totalPage);
    } else {
      if (currPageNum < 5) {
        setFirstPageNum(1);
        setLastPageNum(10);
      } else if (totalPage - currPageNum < 5) {
        setFirstPageNum(totalPage - 9);
        setLastPageNum(totalPage);
      } else {
        setFirstPageNum(currPageNum - 4);
        setLastPageNum(currPageNum + 5);
      }
    }
  }, [totalPage, currPageNum]);

  // 페이지네이션 아이콘 버튼 동작 설정
  const handleClick = useCallback(
    (type, key) => {
      let pageNumber = parseInt(type);
      switch (type) {
        case 'first':
          pageNumber = currPageNum > 10 ? currPageNum - 10 : 1;
          break;
        case 'prev':
          pageNumber = currPageNum > 1 ? currPageNum - 1 : 1;
          break;
        case 'next':
          pageNumber = currPageNum < totalPage ? currPageNum + 1 : totalPage;
          break;
        case 'last':
          pageNumber = currPageNum + 9 < totalPage ? currPageNum + 10 : totalPage;
          break;
        default:
          pageNumber = type;
          break;
      }
      dispatch(selectPageNumber(pageNumber));
      setSelectPage(key);
      dispatch(
        getPostsAsync({
          searchCategory,
          searchKeyword,
          sortType,
          currPageNum: pageNumber,
          tag,
          boardName,
          limit: limit.current,
        }),
      );
    },
    [dispatch, searchCategory, searchKeyword, sortType, tag, boardName, currPageNum, totalPage],
  );

  return (
    <Pagination
      firstPageNum={firstPageNum}
      lastPageNum={lastPageNum}
      handleClick={handleClick}
      currPageNum={currPageNum}
      totalPage={totalPage}
      theme={theme}
      selcetPage={selcetPage}
    ></Pagination>
  );
};

export default PaginationContainer;
