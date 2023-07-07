import React from 'react';
import { useSelector } from 'react-redux';
import PictureButton from '../../components/posts/PictureButton';

const PictureButtonContainer = () => {
  const user = useSelector((state) => state.user.user);
  return <PictureButton user={user}></PictureButton>;
};

export default PictureButtonContainer;
