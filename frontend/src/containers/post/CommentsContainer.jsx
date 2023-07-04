import React from 'react';
import Comments from '../../components/post/Comments';

const CommentsContainer = () => {
  const post = useSelector((state) => state.post.post);

  return <Comments comments={post.comments}></Comments>;
};

export default CommentsContainer;
