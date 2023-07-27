import React from 'react';
import { styled, css } from 'styled-components';
import Button from './Button';
import palette from '../../lib/styles/palette';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';

const PaginationBlock = styled.div`
  background: ${({ theme }) => (theme === 'true' ? 'rgb(30,30,30)' : 'white')};
  display: flex;
  justify-content: center;
  padding: 10px;
  margin-top: 10px;
`;

const StyledButton = styled(Button)`
  width: 50px;
  background: inherit;
  color: ${({ theme }) => (theme === 'true' ? 'white' : 'black')};
  border-radius: 4px;

  svg {
    padding-top: 3px;
    padding-right: 3px;
    font-size: 20px;
  }

  & + & {
    margin-left: 3px;
  }

  &:hover {
    background: inherit;
    color: ${palette.mainColor};
  }

  &:disabled {
    background: inherit;
    opacity: 0.5; // TODO : 테스트용. 동작 확인되면 0으로 바꿔서 아예 안보이게.
    cursor: default;
  }

  ${({ active }) => active && activeButtonStyles}
`;

const activeButtonStyles = css`
  ${StyledButton};
  opacity: 1;
  color: ${palette.mainColor};
`;

const PageButton = ({ handleClick, buttonText, disabled, type }) => {
  return (
    <StyledButton disabled={disabled} onClick={() => handleClick(buttonText, type)}>
      {buttonText}
    </StyledButton>
  );
};

const Pagination = ({ firstPageNum, lastPageNum, handleClick, currPageNum, totalPage }) => {
  return (
    <PaginationBlock>
      <PageButton
        disabled={currPageNum === 1}
        handleClick={handleClick}
        buttonText={<MdKeyboardDoubleArrowLeft />}
        type={'<<'}
      ></PageButton>
      <PageButton
        disabled={currPageNum === 1}
        handleClick={handleClick}
        buttonText={<MdKeyboardArrowLeft />}
        type={'<'}
      ></PageButton>
      {Array(lastPageNum - firstPageNum + 1)
        .fill()
        .map((_, index) => (
          <PageButton key={index} handleClick={handleClick} buttonText={firstPageNum + index}></PageButton>
        ))}
      <PageButton
        disabled={currPageNum === totalPage}
        handleClick={handleClick}
        buttonText={<MdKeyboardArrowRight />}
        type={'>'}
      ></PageButton>
      <PageButton
        disabled={currPageNum === totalPage}
        handleClick={handleClick}
        buttonText={<MdKeyboardDoubleArrowRight />}
        type={'>>'}
      ></PageButton>
    </PaginationBlock>
  );
};

export default Pagination;

// const PageButton = ({ handleClick, buttonText, disabled, theme, key, type }) => {
//   return (
//     <StyledButton theme={String(theme)} disabled={disabled} onClick={() => handleClick(type, key)}>
//       {buttonText}
//     </StyledButton>
//   );
// };

// const Pagination = ({ firstPageNum, lastPageNum, handleClick, currPageNum, totalPage, theme }) => {
//   return (
//     <PaginationBlock theme={String(theme)}>
//       <PageButton
//         theme={String(theme)}
//         disabled={currPageNum === 1}
//         handleClick={handleClick}
//         buttonText={<MdKeyboardDoubleArrowLeft />}
//         type="first"
//       ></PageButton>
//       <PageButton
//         theme={String(theme)}
//         disabled={currPageNum === 1}
//         handleClick={handleClick}
//         buttonText={<MdKeyboardArrowLeft />}
//         type="prev"
//       ></PageButton>
//       {Array(lastPageNum - firstPageNum + 1)
//         .fill()
//         .map((_, index) => (
//           <PageButton
//             key={firstPageNum + index}
//             handleClick={handleClick}
//             buttonText={firstPageNum + index}
//             theme={String(theme)}
//           ></PageButton>
//         ))}
//       <PageButton
//         theme={String(theme)}
//         disabled={currPageNum === totalPage}
//         handleClick={handleClick}
//         buttonText={<MdKeyboardArrowRight />}
//         type="next"
//       ></PageButton>
//       <PageButton
//         theme={String(theme)}
//         disabled={currPageNum === totalPage}
//         handleClick={handleClick}
//         buttonText={<MdKeyboardDoubleArrowRight />}
//         type="last"
//       ></PageButton>
//     </PaginationBlock>
//   );
// };

// export default Pagination;
