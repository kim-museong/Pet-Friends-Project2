import styled from 'styled-components';
import { useSelector } from 'react-redux';
import palette from '../../lib/styles/palette';

const SubBtnBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 20px;

  .attend {
    position: relative; /* 이미지가 위치를 기준으로 확대/축소하도록 설정합니다. */
    background-image: url('../../../images/attend.png');
    background-repeat: no-repeat;
    background-size: 120%;
    background-position: 50% 20%; /* 이미지를 가로로 50% 위치로 이동 */
    background-color: ${palette.mainColor};
    cursor: pointer;
    transition: background-size 0.4s ease; /* hover 시에 변화를 부드럽게 만들어줍니다. */

    &:hover {
      background-size: 180%; /* 이미지 크기를 1.5배 확대합니다. */
    }
  }
`;

const SubBtn = styled.div`
  width: 110px;
  height: 110px;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'white')};
  margin: 0 auto;
`;

const SubButton = () => {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <>
      <SubBtnBox theme={String(theme)}>
        <SubBtn theme={String(theme)} className="attend"></SubBtn>
        <SubBtn theme={String(theme)}></SubBtn>
        <SubBtn theme={String(theme)}></SubBtn>
      </SubBtnBox>
    </>
  );
};

export default SubButton;
