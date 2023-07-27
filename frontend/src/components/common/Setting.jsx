import { useState } from 'react';
import { MdSettings } from 'react-icons/md';
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi';
import ThemeContainer from '../../containers/common/ThemeContainer';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import palette from '../../lib/styles/palette';
import { useLocation } from 'react-router-dom'; // useLocation 가져오기

const Contain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 5;

  div + div {
    margin-top: 10px;
  }
`;

const SetBox = styled.div`
  width: 60px;
  height: 60px;
  z-index: 1;
  cursor: pointer;
  border: 1px solid ${palette.border};
  background: ${({ theme }) => (theme === 'true' ? 'rgb(35,35,35)' : 'white')};
  border-radius: 50%;
  svg {
    font-size: 35px;
    margin: 12px 0 0 12px;
    color: ${({ theme, showsetting }) =>
      theme === 'true'
        ? showsetting === 'true'
          ? 'rgb(255, 140, 0)'
          : 'white'
        : showsetting === 'true'
        ? 'rgb(255, 140, 0)'
        : 'rgb(50,50,50)'};
  }

  &:hover {
    box-shadow: -1px 1px 4px ${palette.border};
    background: ${({ theme }) => (theme === 'true' ? 'rgb(80,80,80)' : 'rgb(245,245,245)')};
  }
`;

const ShowBox = styled.div`
  width: 150px;
  height: 100px;
  border: 1px solid ${palette.border};
  background: ${({ theme }) => (theme === 'true' ? 'rgb(35,35,35)' : 'white')};
  box-shadow: -1px 1px 4px ${palette.border};
  position: absolute;
  right: 70px;
  bottom: 0;
  div {
    margin: 26px auto;
  }
`;

const ScrollUpBtn = styled.div`
  width: 60px;
  height: 60px;
  z-index: 1;
  cursor: pointer;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(35,35,35)' : 'white')};
  border: 1px solid ${palette.border};
  border-radius: 50%;

  svg {
    font-size: 30px;
    margin: 13px 0 0 15px;
    color: ${({ theme }) => (theme === 'true' ? '' : 'rgb(50,50,50)')};
  }

  &:hover {
    background: ${({ theme }) => (theme === 'true' ? 'rgb(80,80,80)' : 'rgb(245,245,245)')};
    svg {
      color: rgb(255, 140, 0);
    }
  }
`;

const ScrollDownBtn = styled.div`
  width: 60px;
  height: 60px;

  z-index: 1;
  cursor: pointer;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(35,35,35)' : 'white')};
  border: 1px solid ${palette.border};
  border-radius: 50%;

  svg {
    font-size: 30px;
    margin: 16px 0 0 15px;
    color: ${({ theme }) => (theme === 'true' ? '' : 'rgb(50,50,50)')};
  }

  &:hover {
    background: ${({ theme }) => (theme === 'true' ? 'rgb(80,80,80)' : 'rgb(245,245,245)')};
    svg {
      color: rgb(255, 140, 0);
    }
  }
`;

const Setting = () => {
  const [showsetting, setShowSetting] = useState(false);
  const theme = useSelector((state) => state.theme.theme);

  const onClick = () => {
    setShowSetting((prev) => !prev);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 부드러운 스크롤을 위해 behavior를 'smooth'로 설정합니다.
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const location = useLocation();
  const isSettingVisible =
    !location.pathname.includes('/memo') &&
    !location.pathname.includes('/auth/') &&
    !location.pathname.includes('/random') &&
    !location.pathname.includes('/attendance') &&
    !location.pathname.includes('/hospital') &&
    !location.pathname.includes('/admin/');

  return (
    <>
      {isSettingVisible && (
        <>
          <Contain>
            <ScrollUpBtn theme={String(theme)} onClick={scrollToTop}>
              <BiSolidUpArrow />
            </ScrollUpBtn>
            <ScrollDownBtn theme={String(theme)} onClick={scrollToBottom}>
              <BiSolidDownArrow />
            </ScrollDownBtn>
            {showsetting && (
              <ShowBox theme={String(theme)}>
                <ThemeContainer />
              </ShowBox>
            )}
            <SetBox theme={String(theme)} showsetting={String(showsetting)} onClick={onClick}>
              <MdSettings />
            </SetBox>
          </Contain>
        </>
      )}
    </>
  );
};

export default Setting;
