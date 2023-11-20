import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { ButtonBox, InputBox, InputContainBox } from '../share.style';

export const FindIdWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  @media all and (min-width: 1024px) {
    width: 400px;
  }

  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 400px;
  }

  @media all and (max-width: 767px) {
    width: 100%;
    padding: 0 20px;
  }
`;

export const FindLogoBox = styled.div`
  margin: 30px auto 10px;
  text-align: center;

  a {
    background-image: url('../../../images/petFriendsLogo.png');
    display: inline-block;
    width: 200px;
    height: 100px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: 150%;

    @media all and (max-width: 767px) {
      width: 100px;
      height: 50px;
    }
  }
`;

export const FindSelectBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const FindCheckBox = styled.input`
  width: 30px;
  margin: 20px 0;
  display: none;
`;

export const FindCheckLabel = styled.label`
  padding-bottom: 5px;
  cursor: pointer;

  &:hover {
    color: ${palette.mainColor};
  }
`;

export const FindNickWrapper = styled.div`
  position: relative;
  margin-top: 30px;

  @media all and (max-width: 767px) {
    margin-top: 30px;
  }
`;

export const NickInfoBox = styled.div`
  text-align: center;
  margin: 20px auto 5px;
  color: rgb(160, 160, 160);
  font-size: 12px;
`;

export const FindInputBox = styled(InputContainBox)``;
export const FindInput = styled(InputBox)`
  padding: 0 20px;
`;

export const FindButton = styled(ButtonBox)`
  width: 100%;
  margin-top: 10px;
`;

export const StatusBox = styled.div`
  height: 45px;
  text-align: center;
  margin: 20px auto;
  color: red;
`;

export const TimeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 51px;
  margin-top: 10px;
  margin-left: 5px;
  padding: 20px 20px;
  border: 1px solid ${palette.border};
  font-size: 20px;

  color: ${({ timer, timerexpired }) => {
    if (timerexpired === 'true') {
      switch (true) {
        case timer > 120:
          return 'green';
        case timer > 60:
          return 'orange';
        case timer > 30:
          return 'red';
        default:
          return 'red';
      }
    } else {
      return `${palette.border}`;
    }
  }};

  border-color: ${({ timer, timerexpired }) => {
    if (timerexpired === 'true') {
      switch (true) {
        case timer > 120:
          return 'green';
        case timer > 60:
          return 'orange';
        case timer > 30:
          return 'red';
        default:
          return 'red';
      }
    } else {
      return `${palette.border}`;
    }
  }};

  svg {
    font-size: 25px;
    margin-top: 5px;
    margin-right: 5px;
  }
`;

export const CertificationBox = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin: 0 auto;
`;

export const InfoBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  font-size: 16px;
  color: rgb(140 140, 140);

  svg {
    font-size: 16px;
    margin-left: 3px;
    margin-top: 1px;
  }

  svg:hover {
    color: ${palette.mainColor};
  }
`;

export const ExplanationBox = styled.div`
  position: absolute;
  top: -67px;
  left: 180px;
  width: 364px;
  box-shadow: 0px 0px 2px 1px ${palette.border};
  padding: 10px;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'white')};
  font-size: 14px;
  text-align: left;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  ${({ ishovered }) => ishovered === 'true' && `opacity: 1;`}

  .triangle {
    position: absolute;
    top: 55px;
    left: 64.5px;
    width: 10px;
    height: 10px;
    background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'white')};
    border-radius: 0 2px;
    box-shadow: -1px 1px ${palette.border};
    transform: rotate(315deg);
    z-index: 2;
  }
`;

/** 결과창 CSS */
export const ResultBox = styled.div`
  width: 350px;
  height: auto;
  position: absolute;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid ${palette.border};
  padding: 20px;
  background: white;
  text-align: center;

  h2 {
    margin-bottom: 50px;
  }
`;

export const ResultValueBox = styled.div`
  margin: 10px 0 50px;
  padding: 20px;
  border: 1px solid ${palette.border};
`;

export const ResultInfoBox = styled.div`
  text-align: left;
  font-size: 12px;
  color: rgb(160, 160, 160);
  margin-top: 10px;
`;

export const FlexBox = styled.div`
  display: flex;
  justify-content: center;
`;

export const activeButtonStyles = css`
  color: ${palette.mainColor};
  border-bottom: 2px solid ${palette.mainColor};
`;

export const RadioBox = styled.div`
  text-align: center;
  width: 60px;
  border-radius: 0;
  padding-bottom: 3px;
  ${({ active }) => active && activeButtonStyles}
  margin: 0 20px;
`;
