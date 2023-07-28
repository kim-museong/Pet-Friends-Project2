import React from 'react';
import PictureButton from '../../components/posts/PictureButton';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PictureButtonContainer = () => {
  const user = useSelector((state) => state.user.user);

  const location = useLocation();
  const boardName = location.pathname.split('/')[1];
  return <PictureButton boardName={boardName} user={user}></PictureButton>;
};

export default PictureButtonContainer;
