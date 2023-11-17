import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { ButtonBox, InputBox, InputContainBox } from '../share.style';

export const Wrapper = styled.div`
  width: 400px;
  margin: 50px auto 0;

  @media all and (max-width: 767px) {
    width: 100%;
    padding: 0 30px;
  }
`;

export const CertificationInputBox = styled(InputContainBox)`
  position: relative;
`;

export const CertificationInput = styled(InputBox)`
  padding: 3px 15px 0;
`;

export const CertificationButtonBox = styled(ButtonBox)`
  width: 100%;
  margin-top: 10px;
`;

export const StatusBox = styled.div`
  text-align: center;
  line-height: 3;
  height: 45px;
  margin-bottom: 20px;
  margin: 10px auto 50px;

  @media all and (max-width: 767px) {
    font-size: 12px;
  }

  div {
    &.error {
      color: red;
    }

    &.success {
      color: green;
    }
  }
`;

export const CertificationBox = styled.div`
  input {
    width: 80%;

    @media all and (max-width: 767px) {
      width: 70%;
    }
  }
`;

export const TimeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  position: absolute;
  margin-top: 5px;
  top: 0;
  right: 15px;

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
    font-size: 22px;
    margin-top: 8px;
    margin-right: 5px;

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
  }
`;

export const InfoBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  font-size: 12px;
  color: rgb(140 140, 140);

  svg {
    font-size: 16px;
    margin-right: 3px;
    margin-top: 1px;
  }

  svg:hover {
    color: ${palette.mainColor};
  }

  @media all and (max-width: 767px) {
    font-size: 12px;
  }
`;

export const ExplanationBox = styled.div`
  position: absolute;
  top: -46px;
  left: 32px;
  box-shadow: 0px 0px 2px 1px ${palette.border};
  padding: 10px 15px;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'white')};
  font-size: 12px;
  text-align: left;
  z-index: 1;
  opacity: ${({ ishovered }) => (ishovered === 'true' ? '1' : '0')};
  transition: opacity 0.3s ease-in-out;

  .triangle {
    position: absolute;
    top: 31px;
    left: 64.5px;
    width: 10px;
    height: 10px;
    background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'white')};
    border-radius: 0 2px;
    box-shadow: -1px 1px ${palette.border};
    transform: rotate(315deg);
    z-index: 2;

    @media all and (max-width: 767px) {
      left: 43px;
    }
  }

  @media all and (max-width: 767px) {
    left: 3px;
  }
`;
