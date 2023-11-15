import styled from 'styled-components';
import palette from '../lib/styles/palette';
import { StyledInput } from '../lib/styles/find';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom/';

export const AuthFormBlock = styled.div`
  width: 450px;
  text-align: center;
  margin: 70px auto 0;

  .logo {
  }

  form {
    margin-top: 2rem;
  }

  div + div {
    margin-top: 20px;
  }

  @media all and (max-width: 767px) {
    width: 100%;
  }
`;

export const LogoBtnBox = styled.div``;
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

export const ButtonWidthMarginTop = styled(Button)`
  width: 100%;
  height: 60px;
  font-size: 25px;
`;

export const SaveUserIdBox = styled.div`
  margin: 15px 0 0 10px !important;

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
    height: 25px;
    outline: 0;
    width: 25px;
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
  }
`;

export const InputStyle = styled(StyledInput)`
  width: 100%;
`;

export const LoginBox = styled.div`
  margin: 20px auto 0;
  border-radius: 10px;
  padding: 20px;
`;

export const ErrorBox = styled.div`
  height: 30px;
  font-size: 16px;
  color: red;
  margin: 35px auto 20px !important;

  div {
    text-align: left;
  }

  div + div {
    margin-top: 2px;
  }
`;
