import { useState } from 'react';
import { MdSettings } from 'react-icons/md';
import ThemeContainer from '../../containers/common/ThemeContainer';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';

const SetBox = styled.div`
  width: 60px;
  height: 60px;
  position: fixed;
  z-index: 1;
  cursor: pointer;
  border: 1px solid rgb(186, 186, 186);
  border-radius: 50%;
  right: 3%;
  bottom: 3%;
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
    box-shadow: -1px 1px 4px ${({ theme }) => (theme === 'true' ? 'rgb(186,186,186)' : 'rgb(186,186,186)')};
    background: ${({ theme }) => (theme === 'true' ? 'rgb(80,80,80)' : 'rgb(245,245,245)')};
  }
`;

const ShowBox = styled.div`
  width: 150px;
  height: 100px;
  border: 1px solid rgb(186, 186, 186);
  box-shadow: -1px 1px 4px rgb(186, 186, 186);
  position: fixed;
  right: 3%;
  bottom: 11%;

  div {
    margin: 26px auto;
  }
`;

const Setting = () => {
  const [showsetting, setShowSetting] = useState(false);
  const theme = useSelector((state) => state.theme.theme);

  const onClick = () => {
    setShowSetting((prev) => !prev);
  };

  return (
    <>
      {showsetting && (
        <ShowBox theme={String(theme)}>
          <ThemeContainer />
        </ShowBox>
      )}
      <SetBox theme={String(theme)} showsetting={String(showsetting)} onClick={onClick}>
        <MdSettings />
      </SetBox>
    </>
  );
};

export default Setting;
