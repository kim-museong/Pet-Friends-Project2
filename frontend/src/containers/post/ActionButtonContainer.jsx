import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ActionButton from '../../components/post/ActionButton';
import { deletePost } from '../../lib/api/post';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ActionButtonContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const postId = params.postId;
  const boardName = location.pathname.split('/')[1];

  const post = useSelector((state) => state.post.post);
  const user = useSelector((state) => state.user.user);

  // boardName, postId 필요
  const onDelete = async () => {
    try {
      await deletePost({ boardName, postId });
      navigate(-1);
    } catch (error) {
      // post 삭제 실패
      // 추후 삭제 실패 모달로 대체
      console.log(error);
    }
  };

  return <ActionButton onDelete={onDelete} post={post} user={user} boardName={boardName}></ActionButton>;
};

export default ActionButtonContainer;
