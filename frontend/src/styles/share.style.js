import styled from 'styled-components';
import palette from '../lib/styles/palette';

export const InputContainBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  margin: 0 auto;
  border: 1px solid ${palette.border};
  overflow: hidden;

  svg {
    cursor: pointer;
    font-size: 26px;
    margin: 5px 15px;
    color: ${palette.mainColor};
  }
`;

export const InputBox = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: inherit;
  font-size: 16px;
  border-radius: 0;
  color: black;
  padding: 2px 10px 0 0;
`;

export const ButtonBox = styled.button`
  height: 50px;
  border: none;
  background-color: ${palette.mainColor};
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: ${palette.gray};
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
