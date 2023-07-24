import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const PictureButton = ({ boardName, user }) => {
  return (
    <Link to="/editor/picture" state={{ boardName }}>
      {user && <Button>글쓰기</Button>}
    </Link>
  );
};

export default PictureButton;
