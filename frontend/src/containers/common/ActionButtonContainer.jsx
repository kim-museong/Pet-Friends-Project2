import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ActionButton from '../../components/common/ActionButton';
import { deletePost } from '../../lib/api/post';
import { useNavigate } from 'react-router-dom';

const ActionButtonContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const postId = params.postId;
  const boardName = location.pathname.split('/')[1];

  // boardName, postId 필요
  const onDelete = async () => {
    try {
      await deletePost({ boardName, postId });
      navigate(-1);
    } catch (error) {}
  };

  return <ActionButton onDelete={onDelete}></ActionButton>;
};

export default ActionButtonContainer;
