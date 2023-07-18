import { useDispatch, useSelector } from 'react-redux';
import { getMainAsync } from '../../modules/main';
import React, { useCallback, useEffect, useState } from 'react';

const MeunlistsContainer = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.main.posts);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    dispatch(getMainAsync({ boardName: 'notice', limit: '5' }));
  }, []);

  return <></>;
};

export default React.memo(MeunlistsContainer);
