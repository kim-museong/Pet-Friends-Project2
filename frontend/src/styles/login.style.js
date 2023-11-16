import styled from 'styled-components';
import palette from '../lib/styles/palette';
import { Link } from 'react-router-dom/';
import { InputBox, InputContainBox, ButtonBox } from './share.style';

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 100px auto 0;

  @media all and (min-width: 1024px) {
    width: 400px;
  }

  @media all and (max-width: 767px) {
    width: 100%;
    padding: 0 20px;
  }
`;

export const LogoBtn = styled(Link)`
  display: block;
  margin: 0 auto;
  width: 300px;
  height: 150px;
  color: ${({ theme }) => (theme === 'true' ? 'white' : 'black')};
  background-image: url('../../images/petFriendsLogo.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: 50% 50%;
  overflow: hidden;
`;

export const LoginInputBox = styled(InputContainBox)`
  margin-bottom: 10px;
`;
export const LoginInput = styled(InputBox)``;

export const LoginButton = styled(ButtonBox)`
  width: 100%;
  font-size: 16px;
  margin-bottom: 10px;
`;

export const SaveUserIdBox = styled.div`
  display: flex;
  align-items: center;
  -webkit-tap-hightheme-color: rgba(0, 0, 0, 0);

  input[type='checkbox'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: ${({ theme }) => (theme === 'true' ? 'rgb(60, 60, 60)' : '')};
    border: 1px solid ${palette.mainColor};
    border-radius: 50%;
    cursor: pointer;
    width: 20px;
    height: 20px;
    outline: 0;
  }
  input[type='checkbox']::after {
    border: solid ${({ theme }) => (theme === 'true' ? 'rgb(60, 60, 60)' : 'white')};
    border-width: 0 3px 3px 0;
    content: '';
    display: none;
    height: 40%;
    left: 37%;
    position: relative;
    top: 22%;
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

  div {
    margin-left: 7px;
    font-size: 12px;
  }
`;

export const ErrorBox = styled.div`
  text-align: center;
  font-size: 16px;
  color: rgb(255, 0, 0);
  margin: 35px auto;
`;
