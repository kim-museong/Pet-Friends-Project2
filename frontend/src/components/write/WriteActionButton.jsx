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
  const navigate = useNavigate();
  const onSubmitClick = () => {
    if (title.trim() && content.trim()) {
      setVisible(true);
    } else {
      // 경고 : title or content null
    }
  };
  const onCancelClick = () => {
    if (!(title.trim() || content.trim())) {
      onCancel();
    } else {
      // 경고 : title or content not null
    }
  };
  const onModalSubmitClick = () => {
    setVisible(false);
    onSubmit();
  };
  const onModalCancelClick = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (post && postError === null) {
      // 글 작성 성공, 이전 페이지로
      navigate(-1);
    } else if (postError && post === null) {
      // 에러 발생
    }
  }, [navigate, post, postError]);

  return (
    <>
      <WriteActionButtonBlock>
        <StyledButton onClick={onSubmitClick}> 글쓰기 </StyledButton>
        <StyledButton onClick={onCancelClick}> 취소 </StyledButton>
      </WriteActionButtonBlock>
      <AlertModal
        visible={visible}
        title="글쓰기 확인"
        description="입력하신 내용으로 글을 작성하시겠습니까?"
        onConfirm={onModalSubmitClick}
        onCancel={onModalCancelClick}
      ></AlertModal>
    </>
  );
};

export default WriteActionButton;
