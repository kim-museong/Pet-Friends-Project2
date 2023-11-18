import styled from 'styled-components';
import { ButtonBox, InputBox, InputContainBox } from '../share.style';

export const RegisterWrapper = styled.div`
  width: 400px;
  margin: 0 auto;

  @media all and (max-width: 767px) {
    width: 100%;
    padding: 0 30px;
  }
`;

export const RegisterInputBox = styled(InputContainBox)`
  margin-bottom: 5px;
`;
export const RegisterInput = styled(InputBox)``;

export const ButtonWidthMarginTop = styled(ButtonBox)`
  width: 100%;
`;

export const RegisterBox = styled.div`
  p {
    width: 70%;
    margin: 0 auto;
    text-align: left;
  }

  .message {
    font-size: 14px;
    color: rgb(150, 150, 150);
  }
`;

export const ErrorBox = styled.div`
  text-align: center;
  min-height: 30px;
  font-size: 14px;
  color: red;
  margin: 20px auto;

  div + div {
    margin-top: 2px;
  }
`;
