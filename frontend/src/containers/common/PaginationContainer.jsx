import React, { useCallback, useEffect, useRef, useState } from 'react';
import Pagination from '../../components/common/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { selectPageNumber } from '../../modules/searchOption';
import { useLocation } from 'react-router-dom';
import { getPostsAsync } from '../../modules/posts';

const PaginationContainer = () => {
  const location = useLocation();

  const searchCategory = useSelector((state) => state.searchOption.searchCategory);
  const searchKeyword = useSelector((state) => state.searchOption.searchKeyword);
  const sortType = useSelector((state) => state.searchOption.sortType);
  const tag = useSelector((state) => state.searchOption.tag);
  const boardName = location.pathname.split('/')[1];
  const postCount = useSelector((state) => state.posts.postCount);
  const currPageNum = useSelector((state) => state.searchOption.pageNumber);

  const limit = useRef(10);

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
    (buttonText) => {
      let pageNumber = parseInt(buttonText);
      switch (buttonText) {
        case '<<':
          pageNumber = currPageNum > 10 ? currPageNum - 10 : 1;
          break;
        case '<':
          pageNumber = currPageNum > 1 ? currPageNum - 1 : 1;
          break;
        case '>':
          pageNumber = currPageNum < totalPage ? currPageNum + 1 : totalPage;
          break;
        case '>>':
          pageNumber = currPageNum + 9 < totalPage ? currPageNum + 10 : totalPage;
          break;
        default:
          pageNumber = buttonText;
          break;
      }
      dispatch(selectPageNumber(pageNumber));
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
    ></Pagination>
  );
};

export default PaginationContainer;
