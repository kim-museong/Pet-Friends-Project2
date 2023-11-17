import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
  width: 550px;
  margin: 0 auto;

  @media all and (max-width: 767px) {
    width: 100%;
    padding: 0 40px;
  }
`;

export const StepBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0px auto;
  text-align: center;
  color: rgb(150, 150, 150);

  svg {
    margin-top: 5px;
  }

  .userId,
  .certification,
  .newPassword {
    color: ${palette.mainColor};
    cursor: pointer;
  }

  @media all and (max-width: 767px) {
    font-size: 12px;
    margin: 0 auto;
  }
`;

export const StepLine = styled.div`
  margin: 10px auto 30px;
  border-bottom: 1px solid rgb(200, 200, 200);
`;

export const LogoBox = styled.div`
  margin-top: 27px;
  text-align: center;
  font-size: 30px;
`;

export const LogoBtn = styled(Link)`
  display: inline-block;
  width: 200px;
  height: 100px;
  background-image: url('../../images/petFriendsLogo.png');
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 150%;
`;
