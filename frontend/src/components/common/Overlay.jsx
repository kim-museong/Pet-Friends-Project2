import React from 'react';
import styled from 'styled-components';

// 스타일드 컴포넌트를 사용하여 반투명한 이미지를 출력하는 오버레이의 스타일을 정의합니다.
const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.1);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  /* opacity: 0; */
  transition: 3s;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 200px; /* 이미지의 크기를 조절해주세요 */
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  opacity: 0.7; /* 이미지의 불투명도를 조절합니다 */
`;

const Overlay = () => {
  return (
    <OverlayContainer>
      <ImageContainer>
        {/* 로딩 중에 표시할 특정 이미지를 넣어주세요 */}
        <Image src="./images/loading_spinner.gif" alt="Loading Image" />
      </ImageContainer>
    </OverlayContainer>
  );
};

export default Overlay;
