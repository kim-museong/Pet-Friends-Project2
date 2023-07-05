import React from 'react';
import { Link } from 'react-router-dom';

const PostButton = () => {
  return (
    <Link to={`/community/write`}>
      <button>글쓰기</button>
    </Link>
  );
};

export default PostButton;
