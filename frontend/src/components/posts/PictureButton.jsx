import React from 'react';
import { Link } from 'react-router-dom';

const PictureButton = () => {
  return (
    <Link to={`/picture/write`}>
      <button>글쓰기</button>
    </Link>
  );
};

export default PictureButton;
