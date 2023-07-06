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

  useEffect(() => {
    if (post) {
      navigate(-1);
    }
  }, [navigate, post]);

  useEffect(() => {
    if (postError) {
    }
  }, [navigate, postError]);

  const onSubmit = () => {
    // 제목, 본문 null 체크
    // 본문내용 필터링
    dispatch(createPost({ boardName, title, content }));
  };
  const onCancel = () => {
    // 제목, 본문 !null 체크
    navigate(-1);
  };
  return <WriteActionButton onSubmit={onSubmit} onCancel={onCancel} />;
};

export default WriteActionButtonContainer;
