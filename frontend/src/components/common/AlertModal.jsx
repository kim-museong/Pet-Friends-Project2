import { useEffect } from 'react';
import styled from 'styled-components';
import Button from './Button';

const Fullscreen = styled.div`
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AlertModalBlock = styled.div`
  width: 320px;
  background: white;
  padding: 1.5rem;
  border-radius: 4px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  p {
    margin-bottom: 1rem;
  }
  .buttons {
    display: flex;
    justify-content: flex-end;
  }
`;

const StyledButton = styled(Button)`
  height: 3rem;
  & + & {
    margin-left: 0.5rem;
  }
`;

const AlertModal = ({ visible, modalData, modalRef, onModalOutSideClick }) => {
  // useEffect에 enter, esc키로 버튼을 동작하게 하기 위한 이벤트 등록
  useEffect(() => {
    if (visible) {
      const handleKeydown = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.keyCode === 13 /* enter 키 */) {
          console.log('enter 눌림', event.target);
          modalData.onConfirm && modalData.onConfirm();
        } else if (event.keyCode === 27 /* esc 키 */) {
          console.log('esc 눌림', event.target);
          modalData.onCancel && modalData.onCancel();
        }
      };
      window.addEventListener('keydown', handleKeydown);

      return () => {
        window.removeEventListener('keydown', handleKeydown);
      };
    }
  }, [modalData, visible]);

  // visible의 상태에 따라 모달컴포넌트, null 전환
  if (!visible) return null;
  return (
    <Fullscreen ref={modalRef} onClick={onModalOutSideClick}>
      <AlertModalBlock>
        <h2>{modalData.title}</h2>
        <p>{modalData.description}</p>
        <div className="buttons">
          <StyledButton onClick={modalData.onConfirm}>{modalData.confirmText}</StyledButton>
          {modalData.onCancel && <StyledButton onClick={modalData.onCancel}>{modalData.cancelText}</StyledButton>}
        </div>
      </AlertModalBlock>
    </Fullscreen>
  );
};

export default AlertModal;
