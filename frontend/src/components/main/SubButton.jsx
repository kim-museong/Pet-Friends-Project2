import styled from 'styled-components';
import { useSelector } from 'react-redux';
import palette from '../../lib/styles/palette';
import { FaStamp } from 'react-icons/fa';
import { useCallback } from 'react';

const SubBtnBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 20px;

  cursor: pointer;

  .attend {
    text-align: center;
    color: ${palette.mainColor};
    font-weight: bold;

    svg {
      margin: 20px 0 5px;
      color: ${palette.mainColor};
      font-size: 50px;
    }
  }

  .memo {
    position: relative;
  }

  .memoTitle {
    background: ${palette.mainColor};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    padding: 5px;
    text-align: center;
    color: white;
    font-weight: bold;
  }

  .line {
    border: 1px dashed ${palette.border};
    margin-top: 25px;
  }
`;

const SubBtn = styled.div`
  width: 110px;
  height: 110px;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'white')};
  box-shadow: ${({ theme }) => (theme === 'true' ? '' : `0 0 2px 1px ${palette.border}`)};
  margin: 0 auto;

  &:hover {
    border: 1px solid ${palette.border};
  }
`;

const SubButton = () => {
  const theme = useSelector((state) => state.theme.theme);

  const memoClick = useCallback(() => {
    const popupUrl = `/memo`;
    const popupOptions = 'width=500,height=600,scrollbars=yes,resizable=yes';
    window.open(popupUrl, '메모', popupOptions);
  }, []);

  return (
    <>
      <SubBtnBox theme={String(theme)}>
        <SubBtn theme={String(theme)} className="attend">
          <FaStamp />
          <div>출석체크</div>
        </SubBtn>
        <SubBtn theme={String(theme)}></SubBtn>
        <SubBtn theme={String(theme)} className="memo" onClick={memoClick}>
          <div className="memoTitle">메모</div>
          <div className="line"></div>
          <div className="line"></div>
        </SubBtn>
      </SubBtnBox>
    </>
  );
};

export default SubButton;
