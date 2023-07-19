import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const RandomBox = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 20px;
  box-shadow: ${({ theme }) => (theme === 'true' ? '' : `0 0 2px 1px ${palette.border}`)};
`;

const RandomTitle = styled.div`
  text-align: center;
  background: ${palette.mainColor};
`;

const Random = ({ theme }) => {
  return (
    <>
      <RandomBox theme={String(theme)}>
        <RandomTitle> 랜덤 사진</RandomTitle>
      </RandomBox>
    </>
  );
};

export default Random;
