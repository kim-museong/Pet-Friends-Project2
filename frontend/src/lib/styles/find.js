import styled from 'styled-components';
import palette from '../../lib/styles/palette';

export const FindIdBox = styled.div`
  width: 50%;
  margin: 5% auto;
  border-radius: 5px;
  text-align: center;
  overflow: hidden;

  h1 {
    margin: 0;
    padding: 20px;
  }

  div:first-child > a {
    font-size: 30px;
  }
`;

export const FindInputBox = styled.div`
  border: 1px solid rgb(255, 140, 0);
  border-radius: 5px;
  width: 50%;
  margin: 5% auto;
  padding: 50px;
  position: relative;

  div:first-child{
    margin-bottom: 20px;
  }

  input {
    width: 80%;
    padding:10px; 20px;
    border-radius: 5px;
    border:1px solid rgb(186,186,186);
    outline:none;
    margin-top:10px;

    &:focus{
      border: 1px solid rgb(255, 140, 0);
    }

    
  }

  button {
    display: inline-block;
    width: 80%;
    background: rgb(255, 140, 0);
    border:none;
    border-radius: 5px;
    padding: 10px 20px;
    color: white;
    font-weight: bold;

    &:hover{
      background: rgb(186,186,186);
    }
  }

  input + button {
    margin-top: 30px;
  }

`;

export const FindMethod = styled.div`
  width: 90%;
  margin: 5% auto;

  .method {
    display: inline-block;
    width: 20%;
    border-radius: 5px;
    cursor: pointer;
    margin: 10px;
    padding: 10px;
    color: ${({ light }) => (light ? 'white' : 'rgb(50, 50, 50)')};
    font-size: 14px;

    &:hover {
      border: 1px solid rgb(255, 140, 0);
    }
  }

  .nick {
    border: 1px solid ${({ isNickname }) => (isNickname === 'true' ? 'rgb(255, 140, 0)' : '')};
    svg {
      font-size: 50px;
      color: ${({ isNickname }) => (isNickname === 'true' ? 'rgb(255, 140, 0)' : '')};
    }
  }

  .email {
    border: 1px solid ${({ isNickname }) => (isNickname === 'true' ? '' : 'rgb(255, 140, 0)')};

    svg {
      font-size: 50px;
      color: ${({ isNickname }) => (isNickname === 'true' ? '' : 'rgb(255, 140, 0)')};
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;

  a {
    font-size: 20px;
    color: ${({ light }) => (light ? 'rgb(186,186,186)' : 'rgb(110,110,110)')};
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
  background: ${({ light }) => (light ? 'rgb(50,50,50)' : 'white')};
  border-radius: 5px;
  button {
    width: 80%;
  }

  div:first-child {
    margin-top: 50px;
  }

  div + div {
    margin-top: 20px;
  }

  div + button {
    margin-top: 30px;
  }
`;

export const StyledInput = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  border: 1px solid ${palette.gray[5]};
  font-size: 26px;
  padding: 5px;
  background: ${({ light }) => (light ? 'rgb(40,40,40)' : '')};

  input {
    width: 100%;
    border: none;
    outline: none;
    background: inherit;
    font-size: 22px;
    padding: 5px 15px 0;
    color: ${({ light }) => (light ? 'white' : 'black')};
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: color: ${({ light }) => (light ? 'white' : 'black')};
  }

  svg {
    color: rgb(255, 140, 0);
    font-size: 40px;
    margin: 10px 10px 0 0 ;
  }

  .icon{
    margin-left: 10px;
    
    svg {
      color: rgb(255, 140, 0);
      font-size: 40px;
      margin-right:0px;
    }
  }

  & + & {
    margin-top: 10px;
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
