import React, { useCallback, useEffect, useRef } from 'react';
import PictureList from '../../components/posts/PictureList';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsAsync } from '../../modules/posts';
import { useLocation } from 'react-router-dom';

const INIT_PICTURE_COUNT = 15;
const LOAD_PICTURE_COUNT = 6;

const PictureListContainer = () => {
  // limit 초기값, 추가 로드 갯수 유동적으로 불러오게 조절
  const limit = useRef(INIT_PICTURE_COUNT);
  let column = useRef(LOAD_PICTURE_COUNT);

  const location = useLocation();

  // backend에 요청시 필요 정보
  // 1. sortType : state에서 꺼냄.
  // 2. boardId or boardName : 특정 컴포넌트 내부이므로 수동으로 지정.
  // 3. limit : 화면의 사이즈와 사진div 크기에 따라서 유동적으로 결정.
  const posts = useSelector((state) => state.posts.posts);
  const sortType = useSelector((state) => state.searchOption.sortType) || 'newest';
  const tag = useSelector((state) => state.searchOption.tag);
  const loading = useSelector((state) => state.loading['posts/GET_POSTS']);
  const boardName = location.pathname.split('/')[1] || 'picture';

  const dispatch = useDispatch();

  const getPosts = useCallback(
    ({ sortType = 'newest', tag, boardName = 'picture', limit }) =>
      dispatch(getPostsAsync({ sortType, tag, boardName, limit })),
    [dispatch],
  );

  // useEffect
  // fetch pictureList on mount
  useEffect(() => {
    console.log('사진 리스트 불러옵니다');
    getPosts({ sortType, tag, boardName, limit: limit.current });
  }, [getPosts, sortType]);

  // fetch additional pictureList on scroll to bottom
  useEffect(() => {
    const handleScroll = () => {
      // 한번에 불러올 Item 수 결정
      // 반응형 디자인에 따라 PictureListBlock이 3가지 경우로 나뉨
      // 150은 ItemWidth, 30은 ItemMargin
      // 16은 PictureListBlock Padding
      if (window.innerWidth > 1024) {
        column.current = Math.floor(1024 / 180);
      } else if (window.innerWidth < 768) {
        column.current = Math.floor((window.innerWidth - 16) / 180);
      } else {
        column.current = Math.floor(768 / 180);
      }
      // 스크롤바 바닥에 닿았는지 감지
      const { clientHeight, scrollTop, scrollHeight } = document.documentElement;
      if (clientHeight + scrollTop + 1 >= scrollHeight) {
        // 필요한 만큼의 데이터만 추가로 요청함
        if (posts?.length + column.current > limit.current) {
          limit.current += column.current;
        }
        console.log(`사진 ${column.current}개를 추가로 불러옵니다`);
        getPosts({ sortType, tag, boardName, limit: limit.current });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [getPosts, posts, sortType]);

  return <PictureList posts={posts} loading={loading}></PictureList>;
};

export default React.memo(PictureListContainer);
