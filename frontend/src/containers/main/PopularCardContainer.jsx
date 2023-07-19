import React, { useEffect } from 'react';
import PopularCard from '../../components/main/PopularCard';
import { useDispatch, useSelector } from 'react-redux';
import { getCardAsync } from '../../modules/main';

const PopularCardContainer = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.main.cardPosts);

  useEffect(() => {
    dispatch(getCardAsync({ sortType: 'highestViews', boardName: 'picture', limit: '9' }));
  }, []);

  return (
    <>
      <PopularCard posts={posts} />
    </>
  );
};

export default React.memo(PopularCardContainer);
