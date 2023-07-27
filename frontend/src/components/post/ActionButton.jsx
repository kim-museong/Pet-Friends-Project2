import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AlertModal from '../common/AlertModal';
import Button from '../common/Button';
import { storeOriginPost } from '../../modules/write';
import { useDispatch } from 'react-redux';

const ActionButtonBlock = styled.div`
  border: 1px solid green;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
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

const ActionButton = ({ onDelete, onLike, handleUnlikeClick, post, user, boardName, isLiked }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const [visible, setVisible] = useState(false); // for model on-off
  const [modalData, setModalData] = useState({
    title: '',
    description: '',
    confirmText: '확인',
    cancelText: '취소',
    onConfirm: null,
    onCancel: null,
  });

  // 수정 버튼 클릭
  const onEditPost = () => {
    console.log('=======================', post);
    dispatch(storeOriginPost({ post, boardName }));
    if (boardName === 'community' || boardName === 'information' || boardName === 'notice') {
      navigate(`/editor/post`, { state: { boardName } });
    } else if (boardName === 'picture') {
      navigate(`/editor/picture`, { state: { boardName } });
    }
  };

  // 삭제 버튼 클릭
  const onDeleteClick = () => {
    setModalData({
      title: '삭제 확인',
      description: '정말 게시글을 삭제하시겠습니까?',
      confirmText: '삭제',
      cancelText: '취소',
      onConfirm: onModalSubmitClick,
      onCancel: onModalCancelClick,
    });
    setVisible(true);
  };

  // 추천 버튼 클릭
  const handleLikeClick = () => {
    setModalData({
      title: '추천 확인',
      description: '정말 이 게시글을 추천하시겠습니까?',
      confirmText: '추천',
      cancelText: '취소',
      onConfirm: onModalLikeClick,
      onCancel: onModalCancelClick,
    });
    setVisible(true);
  };

  // modal창의 확인 버튼
  const onModalSubmitClick = () => {
    setVisible(false);
    onDelete();
  };

  // modal창의 취소 버튼
  const onModalCancelClick = () => {
    setVisible(false);
  };

  // modal창의 추천 버튼
  const onModalLikeClick = () => {
    setVisible(false);
    onLike();
  };

  // modal창이 떴을 때 클릭 이벤트
  const onModalOutSideClick = (event) => {
    // target과 currentTarget이 같을 때 모달창 꺼짐(=모달창 외부 클릭)
    if (modalRef.current === event.target) {
      setVisible(false);
    }
  };

  return (
    <>
      {user ? (
        user.id === post?.post.UserId ? (
          <ActionButtonBlock>
            {!isLiked() ? (
              <StyledButton onClick={handleLikeClick}>추천</StyledButton>
            ) : (
              <StyledButton onClick={handleUnlikeClick}>추천해제</StyledButton>
            )}
            <StyledButton onClick={onEditPost}>{' 수정 '}</StyledButton>
            <StyledButton onClick={onDeleteClick}>{' 삭제 '}</StyledButton>
          </ActionButtonBlock>
        ) : (
          <ActionButtonBlock>
            {!isLiked() ? (
              <StyledButton onClick={handleLikeClick}>추천</StyledButton>
            ) : (
              <StyledButton onClick={handleUnlikeClick}>추천해제</StyledButton>
            )}
          </ActionButtonBlock>
        )
      ) : null}
      <AlertModal
        modalRef={modalRef}
        visible={visible}
        modalData={modalData}
        onModalOutSideClick={onModalOutSideClick}
      ></AlertModal>
    </>
  );
};

export default ActionButton;
