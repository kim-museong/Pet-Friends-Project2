import styled from 'styled-components';
import palette from '../../lib/styles/palette';

export const Wrapper = styled.div`
  width: 400px;
  margin: 0 auto;

  @media all and (max-width: 767px) {
    width: 100%;
    padding: 0 40px;
  }
`;

// 입력창 css
export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputNameBox = styled.div`
  font-size: 12px;
  font-weight: bold;
`;

export const InputStyle = styled.input`
  border: none;
  outline: none;
  border-bottom: 1px solid rgb(200, 200, 200);
  border-radius: 0;
  font-size: 16px;
  margin: 10px 0 0;
  padding: 5px 0;
`;

// -----------------

export const ButtonStyle = styled.button`
  border: none;
  border-radius: 5px;
  background-color: ${palette.mainColor};
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  margin-top: 40px;

  &:hover {
    background-color: ${palette.gray};
  }
`;

export const StatusBox = styled.div`
  height: 45px;
  margin-bottom: 20px;
  text-align: left;
  margin: 5px auto 30px;
`;

export const CertificationBox = styled.div`
  position: relative;

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
  right: 0;

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
