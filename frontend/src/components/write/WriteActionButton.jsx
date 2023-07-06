import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AlertModal from '../common/AlertModal';
import Button from '../common/Button';

const WriteActionButtonBlock = styled.div`
  margin-top: 1rem;
  margin-bottom: 3rem;
  button + button {
    margin-left: 0.5rem;
  }
  display: flex;
  justify-content: flex-end;
`;

const StyledButton = styled(Button)`
  height: 2.125rem;
  & + & {
    margin-left: 0.5rem;
  }
`;

const WriteActionButton = ({ title, content, post, postError, onSubmit, onCancel }) => {
  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    description: '',
    confirmText: '확인',
    cancelText: '취소',
    onConfirm: null,
    onCancel: null,
  });
  const navigate = useNavigate();
  const onSubmitClick = () => {
    if (title.trim() && content.trim()) {
      setModalData({
        title: '글쓰기 확인',
        description: '입력하신 내용으로 글을 작성하시겠습니까?',
        confirmText: '글쓰기',
        cancelText: '취소',
        onConfirm: onModalSubmitClick,
        onCancel: onModalCancelClick,
      });
      setVisible(true);
    } else {
      console.log('title or content null');
      // 경고 : title or content null
      setModalData({
        title: '경고',
        description: '제목 또는 본문을 마저 입력해주세요.',
        confirmText: '확인',
        cancelText: null,
        onConfirm: onModalCancelClick,
        onCancel: null,
      });
      setVisible(true);
    }
  };
  const onCancelClick = () => {
    if (!(title.trim() || content.trim())) {
      onCancel();
    } else {
      console.log('title or content not null');
      // 경고 : title or content not null
      setModalData({
        title: '경고',
        description: '작성중인 내용이 존재합니다. 정말 돌아가시겠습니까?',
        confirmText: '돌아가기',
        cancelText: '취소',
        onConfirm: onModalBackClick,
        onCancel: onModalCancelClick,
      });
      setVisible(true);
    }
  };
  const onModalSubmitClick = () => {
    setVisible(false);
    onSubmit();
  };
  const onModalBackClick = () => {
    setVisible(false);
    navigate(-1);
  };
  const onModalCancelClick = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (post && postError === null) {
      // 글 작성 성공, 이전 페이지로
      navigate(-1);
    } else if (postError && post === null) {
      console.log('unknown error');
      // 에러 발생
      setModalData({
        title: '에러',
        description: `글 작성 실패. 잠시 후 다시 시도해주세요.\n${postError}`,
        confirmText: '확인',
        cancelText: null,
        onConfirm: onModalCancelClick,
        onCancel: null,
      });
      setVisible(true);
    }
  }, [navigate, post, postError]);

  return (
    <>
      <WriteActionButtonBlock>
        <StyledButton onClick={onSubmitClick}> 글쓰기 </StyledButton>
        <StyledButton onClick={onCancelClick}> 취소 </StyledButton>
      </WriteActionButtonBlock>
      <AlertModal visible={visible} modalData={modalData}></AlertModal>
    </>
  );
};

export default WriteActionButton;
