import styled from 'styled-components';
import palette from '../../lib/styles/palette';

export const FindIdBox = styled.div`
  width: 80%;
  margin: 5% auto;
  border-radius: 5px;
  text-align: center;
  overflow: hidden;
  position: 'relative';
  h1 {
    margin: 0;
    padding: 20px;
  }

  div:first-child > a {
    font-size: 30px;
  }
`;

export const FindInputBox = styled.div`
  width: 600px;
  margin: 50px auto 0;
  padding: 0 30px;

  input {
    width: 80%;
    padding: 15px 22px 13px;
    border: 1px solid ${palette.border};
    outline: none;
    margin-top: 10px;
    font-size: 18px;
  }

  button {
    display: inline-block;
    width: 80%;
    background: ${palette.mainColor};
    border: none;
    margin-top: 10px;
    padding: 10px 22px;
    color: white;
    font-weight: bold;
    font-size: 18px;

    &:hover {
      background: ${palette.border};
    }
  }

  .userIdError,
  .nicknameError,
  .emailError,
  .certificationError {
    border-color: red;
  }

  .error {
    color: red;
    width: 80%;
    margin: 0 auto;
    margin-top: 10px;
    text-align: left;
  }

  .success {
    width: 80%;
    margin: 0 auto;
    margin-top: 10px;
    color: ${palette.mainColor};
  }

  .error + .error {
    margin-top: 5px;
  }

  .certificationNumber {
    width: 100%;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;

  a {
    color: ${({ theme }) => (theme === 'true' ? `${palette.border}` : 'rgb(110,110,110)')};
    &:hover {
      text-decoration: underline;
    }
  }

  a + a:before {
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    content: '|';
  }
`;

export const ResultBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  font-size: 18px;
  color: red;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(50,50,50)' : 'white')};
  button {
    width: 80%;
  }

  div:first-child {
    margin-top: 60px;
  }

  div + div {
    margin-top: 20px;
  }

  div + button {
    margin-top: 5%;
  }
`;

export const StyledInput = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;
  border: 1px solid ${palette.gray[5]};
  background: ${({ theme }) => (theme === 'true' ? 'rgb(40,40,40)' : '')};
  overflow: hidden;

  input {
    width: 100%;
    border: none;
    outline: none;
    background: inherit;
    font-size: 16px;
    padding: 5px 15px 0;
    border-radius: 0;
    color: ${({ theme }) => (theme === 'true' ? 'white' : 'black')};
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px ${({ theme }) => (theme === 'true' ? 'rgb(40,40,40)' : 'white')}inset;
    box-shadow: 0 0 0 1000px ${({ theme }) => (theme === 'true' ? 'rgb(40,40,40)' : 'white')} inset;
    -webkit-text-fill-color: ${({ theme }) => (theme === 'true' ? 'white' : 'black')} !important;
  }

  svg {
    color: ${palette.mainColor};
    font-size: 30px;
    margin: 10px 10px 5px 0;
  }

  .icon {
    margin-left: 10px;

    svg {
      color: ${palette.mainColor};
      font-size: 30px;
      margin-right: 0px;
    }
  }

  & + & {
    margin-top: 5px;
  }

  &.errorUserId,
  &.errorPwd,
  &.errorPwdCf,
  &.errorPwdCf,
  &.errorNickname,
  &.errorEmail {
    border: 1px solid red;
  }
`;
