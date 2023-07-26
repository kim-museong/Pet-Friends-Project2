import Popularpost from '../../components/main/Popularpost';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLikeAsync } from '../../modules/main';

const PopularpostContainer = () => {
  const dispatch = useDispatch();
  const like = useSelector((state) => state.main.like);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    dispatch(getLikeAsync({ sortType: 'highestLikes', boardName: 'community', limit: '10' }));
  }, [dispatch]);
  return (
    <>
      <Popularpost like={like} theme={theme} />
    </>
  );
};

export default React.memo(PopularpostContainer);
