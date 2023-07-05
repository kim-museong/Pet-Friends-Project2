import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const PictureButton = () => {
  return (
    <Link to={`/editor/picture`}>
      <Button>글쓰기</Button>
    </Link>
  );
};

export default PictureButton;
