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
`;

export const InputBox = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: inherit;
  font-size: 16px;
  padding: 5px 15px 0;
  border-radius: 0;
  color: black;
`;

export const ButtonBox = styled.button`
  border: none;
  background-color: ${palette.mainColor};
  color: white;
  font-weight: bold;
  height: 50px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: ${palette.gray};
  }
`;
