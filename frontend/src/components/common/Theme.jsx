import React from 'react';
import { MdSunny, MdDarkMode } from 'react-icons/md';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const ChangeMode = styled.div`
  width: 105px;
  height: 46px;
  border: 2px solid ${({ theme }) => (theme === true ? 'white' : `${palette.border}`)};
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 10px;
  position: relative;
  overflow: hidden;

  button {
    width: 40px;
    height: 40px;
    border: 2px solid ${({ theme }) => (theme === true ? 'white' : `${palette.border}`)};
    border-radius: 50%;
    cursor: pointer;
    background: rgb(255, 140, 0);
    position: absolute;
    transform: translateY(-50%);
    transition: all 0.2s ease-in-out;
    top: 21px;
    left: ${({ theme }) => (theme === true ? '60px' : '1px')};
  }

  & svg {
    font-size: 32px;
    margin: 0 8px 0 !important;
    color: rgb(255, 140, 0) !important;
  }
`;

const Theme = ({ theme, onClick }) => {
  return (
    <>
      <ChangeMode theme={theme} onClick={onClick}>
        <button />
        <MdDarkMode />
        <MdSunny />
      </ChangeMode>
    </>
  );
};

export default Theme;
