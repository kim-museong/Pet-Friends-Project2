import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularAsync } from '../../modules/main';
import HeightViewpost from '../../components/main/HeightViewpost';

const HeightViewPostContainer = () => {
  const dispatch = useDispatch();
  const pupularPosts = useSelector((state) => state.main.popularPost);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    dispatch(getPopularAsync({ sortType: 'highestViews', boardName: 'community', limit: '10' }));
  }, [dispatch]);
  return (
    <>
      <HeightViewpost pupularPosts={pupularPosts} theme={theme} />
    </>
  );
};

export default React.memo(HeightViewPostContainer);
