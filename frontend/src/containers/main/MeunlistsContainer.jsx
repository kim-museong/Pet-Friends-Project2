import Meunlists from '../../components/main/Meunlists';
import { useDispatch, useSelector } from 'react-redux';
import { getMainAsync } from '../../modules/main';
import React, { useCallback, useEffect, useState } from 'react';

const MeunlistsContainer = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.main.posts);
  const theme = useSelector((state) => state.theme.theme);
  const [notice, setNotice] = useState(true);
  const [info, setInfo] = useState(false);
  const [community, setCommunity] = useState(false);

  const onClick = useCallback(
    (e) => {
      const { type } = e.target.dataset;

      if (type === 'info') {
        setInfo(true);
        setNotice(false);
        setCommunity(false);
      }
      if (type === 'community') {
        setInfo(false);
        setNotice(false);
        setCommunity(true);
      }
      if (type === 'notice') {
        setInfo(false);
        setNotice(true);
        setCommunity(false);
      }

      dispatch(getMainAsync({ boardName: type, limit: '10' }));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(getMainAsync({ boardName: 'notice', limit: '10' }));
  }, []);

  return (
    <>
      <Meunlists posts={posts} onClick={onClick} notice={notice} info={info} community={community} theme={theme} />
    </>
  );
};

export default React.memo(MeunlistsContainer);
