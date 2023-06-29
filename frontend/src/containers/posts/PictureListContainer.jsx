import React, { useEffect } from 'react';
import PictureList from '../../components/posts/PictureList';

const PictureListContainer = () => {
  // fetch pictureList on mount
  useEffect(() => {
    console.log('사진 리스트 불러옵니다'); // 추후 dispatch로 대체
  }, []);

  // fetch additional pictureList on scroll to bottom
  useEffect(() => {
    const handleScroll = () => {
      const { clientHeight, scrollTop, scrollHeight } = document.documentElement;
      if (clientHeight + scrollTop >= scrollHeight) {
        console.log('사진 리스트 불러옵니다'); // 추후 dispatch로 대체
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <PictureList></PictureList>;
};

export default PictureListContainer;
