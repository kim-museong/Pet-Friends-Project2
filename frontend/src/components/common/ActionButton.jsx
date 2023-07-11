import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AlertModal from '../common/AlertModal';
import Button from './Button';
import { storeOriginPost } from '../../modules/write';
import { useDispatch, useSelector } from 'react-redux';

const ActionButtonBlock = styled.div`
  border: 1px solid green;
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

const ActionButton = ({ onDelete }) => {
  const post = useSelector((state) => state.post.post);
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
    dispatch(storeOriginPost(post));
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

  // modal창의 확인 버튼
  const onModalSubmitClick = () => {
    setVisible(false);
    onDelete();
  };

  // modal창의 취소 버튼
  const onModalCancelClick = () => {
    setVisible(false);
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
      <ActionButtonBlock>
        <StyledButton onClick={onEditPost}> 수정 </StyledButton>
        <StyledButton onClick={onDeleteClick}> 삭제 </StyledButton>
      </ActionButtonBlock>
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
