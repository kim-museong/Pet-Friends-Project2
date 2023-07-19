import Popularpost from '../../components/main/Popularpost';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularAsync } from '../../modules/main';

const PopularpostContainer = () => {
  const dispatch = useDispatch();
  const pupularPosts = useSelector((state) => state.main.popularPost);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    dispatch(getPopularAsync({ sortType: 'highestViews', boardName: 'community', limit: '10' }));
  }, []);
  return (
    <>
      <Popularpost pupularPosts={pupularPosts} theme={theme} />
    </>
  );
};

export default React.memo(PopularpostContainer);
