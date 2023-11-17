import styled from 'styled-components';
import palette from '../../lib/styles/palette';

export const Wrapper = styled.div`
  text-align: center;
  margin: 50px auto 0;
  padding: 0 40px;
  width: 600px;

  @media all and (max-width: 767px) {
    width: 100%;
    margin-top: 0px;
  }
`;

export const InfoBox = styled.div`
  margin: 0 auto 50px;
  padding: 5px;
  text-align: left;
  font-size: 14px;
  color: rgb(120, 120, 120);

  @media all and (max-width: 767px) {
    margin: 0 auto 20px;
  }
`;

export const AllCheckBox = styled.div`
  margin-left: 12px;
  font-size: 20px;

  @media all and (max-width: 767px) {
    margin-left: 5px;
    font-size: 16px;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 16px;

  svg {
    margin-top: 6px;
    margin-left: 5px;
  }

  @media all and (max-width: 767px) {
    font-size: 12px;
  }
`;

export const RequiredBox = styled.div`
  color: ${palette.mainColor};
  margin: 0 8px 2px;
`;

export const AgreeBox = styled.div`
  display: flex;
  margin: 0 auto 10px;

  input[type='checkbox'] {
    margin-top: 1px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: ${({ theme }) => (theme === 'true' ? 'rgb(60, 60, 60)' : '')};
    border: 1px solid ${palette.mainColor};
    border-radius: 50%;
    cursor: pointer;
    height: 30px;
    outline: 0;
    width: 30px;

    @media all and (max-width: 767px) {
      height: 20px;
      width: 20px;
    }
  }

  input[type='checkbox']::after {
    border: solid ${({ theme }) => (theme === 'true' ? 'rgb(60, 60, 60)' : 'white')};
    border-width: 0 3px 3px 0;
    content: '';
    display: none;
    height: 40%;
    left: 35%;
    position: relative;
    top: 19%;
    transform: rotate(45deg);
    width: 15%;
  }

  input[type='checkbox']:checked {
    background: ${palette.mainColor};
    border: ${palette.mainColor};
  }

  input[type='checkbox']:checked::after {
    display: block;
  }

  @media all and (max-width: 767px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

export const Detail = styled.div`
  height: 120px;
  border: 1px solid ${palette.border};
  margin: 0 auto 30px;
  padding: 5px 15px;
  overflow: scroll;
  text-align: left;
  font-size: 14px;

  p {
    color: rgb(120, 120, 120);
  }

  div {
    font-weight: bold;
    margin: 5px 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  @media all and (max-width: 767px) {
    display: none;
  }
`;

export const ButtonBox = styled.div`
  position: fixed;
  width: 100%;
  height: 140px;
  left: 0;
  bottom: 0;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(30,30,30)' : 'white')};

  @media all and (max-width: 767px) {
    height: 100px;
  }
`;

export const Space = styled.div`
  height: 150px;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(30,30,30)' : 'white')};

  @media all and (max-width: 767px) {
    height: 110px;
  }
`;

export const NextBtn = styled.button`
  width: 600px;
  margin: 20px auto 0;
  padding: 15px 20px;
  background: ${palette.mainColor};
  border: none;
  font-size: 18px;
  font-weight: bold;
  color: white;
  cursor: pointer;

  &:hover {
    background: ${palette.border};
  }

  &:disabled {
    background: ${palette.border};
    cursor: default;
  }

  @media all and (max-width: 767px) {
    width: 100%;
    padding: 8px 20px;
  }
`;
