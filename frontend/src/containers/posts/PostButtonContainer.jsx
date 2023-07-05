import React from 'react';
import PostButton from '../../components/posts/PostButton';
import { useLocation } from 'react-router-dom';

const PostButtonContainer = () => {
  const location = useLocation();
  const boardName = location.pathname.split('/')[1];
  return <PostButton boardName={boardName}></PostButton>;
};

export default PostButtonContainer;
