import React from 'react';
import WriteActionButton from '../../components/write/WriteActionButton';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const WriteActionButtonContainer = ({ boardName }) => {
  const title = useSelector((state) => state.write.title);
  const content = useSelector((state) => state.write.content);

  const navigate = useNavigate();

  const onSubmit = () => {
    // 제목, 본문 null 체크
  };
  const onCancel = () => {
    // 제목, 본문 !null 체크
    navigate(-1);
  };
  return <WriteActionButton onSubmit={onSubmit} onCancel={onCancel} />;
};

export default WriteActionButtonContainer;
