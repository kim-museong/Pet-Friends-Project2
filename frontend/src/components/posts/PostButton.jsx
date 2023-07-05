import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const PostButton = ({ boardName }) => {
  return (
    <Link to="/editor/post" state={{ boardName }}>
      <Button>글쓰기</Button>
    </Link>
  );
};

export default PostButton;
