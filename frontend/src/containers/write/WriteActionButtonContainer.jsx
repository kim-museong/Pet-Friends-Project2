import React, { useEffect } from 'react';
import WriteActionButton from '../../components/write/WriteActionButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../modules/write';

const WriteActionButtonContainer = ({ boardName }) => {
  const title = useSelector((state) => state.write.title);
  const content = useSelector((state) => state.write.content);
  const post = useSelector((state) => state.write.post);
  const postError = useSelector((state) => state.write.postError);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(createPost({ boardName, title, content }));
    // 본문내용 필터링
  };
  const onCancel = () => {
    navigate(-1);
  };
  return (
    <WriteActionButton
      title={title}
      content={content}
      post={post}
      postError={postError}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
};

export default WriteActionButtonContainer;
