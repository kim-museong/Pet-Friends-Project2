import React from 'react';
import Meunlists from '../../components/main/Meunlists';
import { useSelector } from 'react-redux';

const MeunlistsContainer = () => {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <>
      <Meunlists theme={theme} />
    </>
  );
};

export default React.memo(MeunlistsContainer);
