import styled from 'styled-components';
import Info from './Info';
import palette from '../../lib/styles/palette';
import PopularCardContainer from '../../containers/main/PopularCardContainer';

const MainBox = styled.div`
  box-shadow: ${({ theme }) => (theme === 'true' ? '' : `0 0 2px 1px ${palette.border}`)};
`;

const Meunlists = ({ theme }) => {
  return (
    <>
      <MainBox theme={String(theme)}>
        <Info />
        <PopularCardContainer />
      </MainBox>
    </>
  );
};

export default Meunlists;
