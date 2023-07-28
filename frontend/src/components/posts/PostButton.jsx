import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const PostButton = ({ boardName, user }) => {
  return (
    <>
      {boardName === 'notice' ? (
        <Link to="/editor/post" state={{ boardName }}>
          {user && user.rank === 'admin' && <Button>글쓰기</Button>}
        </Link>
      ) : (
        <Link to="/editor/post" state={{ boardName }}>
          {user && <Button>글쓰기</Button>}
        </Link>
      )}
    </>
  );
};

export default PostButton;
