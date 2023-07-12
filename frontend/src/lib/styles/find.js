import styled from 'styled-components';
import palette from '../../lib/styles/palette';

export const FindIdBox = styled.div`
  width: 50%;
  margin: 5% auto;
  border-radius: 5px;
  text-align: center;
  overflow: hidden;
  position: 'relative' h1 {
    margin: 0;
    padding: 20px;
  }

  div:first-child > a {
    font-size: 30px;
  }
`;

export const FindInputBox = styled.div`
  width: 600px;
  margin: 5% auto;
  padding: 50px;
  position: relative;

  input {
    width: 80%;
    padding: 14px 20px 10px;
    border: 1px solid rgb(186, 186, 186);
    outline: none;
    margin-top: 10px;
    font-size: 18px;

    &:focus {
      border: 1px solid ${palette.mainColor};
    }
  }

  button {
    display: inline-block;
    width: 80%;
    background: ${palette.mainColor};
    border: none;
    padding: 10px 20px;
    color: white;
    font-weight: bold;
    font-size: 18px;

    &:hover {
      background: rgb(186, 186, 186);
    }
  }

  .nicknameError,
  .emailError {
    border: 1px solid red;
  }

  .error {
    font-size: 14px;
    color: red;
    width: 80%;
    margin: 0 auto;
    margin-top: 10px;
    text-align: left;
  }

  .error + .error {
    margin-top: 5px;
  }

  .certificationNumber {
    margin-bottom: 10px;
    width: 100%;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;

  a {
    color: ${({ theme }) => (theme === 'true' ? 'rgb(186,186,186)' : 'rgb(110,110,110)')};
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
