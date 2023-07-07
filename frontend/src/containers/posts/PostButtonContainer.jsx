import React from 'react';
import PostButton from '../../components/posts/PostButton';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PostButtonContainer = () => {
  const user = useSelector((state) => state.user.user);

  const location = useLocation();
  const boardName = location.pathname.split('/')[1];
  return <PostButton boardName={boardName} user={user}></PostButton>;
};

export default PostButtonContainer;
