import React, { useCallback, useEffect } from 'react';
import PictureList from '../../components/posts/PictureList';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsAsync } from '../../modules/posts';

const PictureListContainer = () => {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();
  const getPosts = useCallback(() => dispatch(getPostsAsync()), [dispatch]);

  // useEffect
  // fetch pictureList on mount
  useEffect(() => {
    console.log('사진 리스트 불러옵니다');
    getPosts(); // 추후 게시판이름, 정렬순서, 추가 로드 갯수로 posts 얻어오는 함수로 대체
  }, []);

  // fetch additional pictureList on scroll to bottom
  useEffect(() => {
    const handleScroll = () => {
      const { clientHeight, scrollTop, scrollHeight } = document.documentElement;
      if (clientHeight + scrollTop >= scrollHeight) {
        console.log('사진 리스트를 추가로 불러옵니다');
        getPosts(); // 추후 게시판이름, 정렬순서, 추가 로드 갯수로 posts 얻어오는 함수로 대체
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [posts]);

  return <PictureList posts={posts}></PictureList>;
};

export default React.memo(PictureListContainer);
