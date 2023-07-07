import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const PictureButton = ({ user }) => {
  return <Link to={`/editor/picture`}>{user && <Button>글쓰기</Button>}</Link>;
};

export default PictureButton;
