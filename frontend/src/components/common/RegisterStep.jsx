import { useSelector, useDispatch } from 'react-redux';
import { styled } from 'styled-components';
import palette from '../../lib/styles/palette';
import { MdArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useCallback } from 'react';
import { changeStep } from '../../modules/auth';

const StepBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 550px;
  margin: 40px auto 10px;
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
`;

const StepBar = styled.div`
  width: 550px;
  margin: 15px auto 30px;
  border-bottom: 1px solid rgb(150, 150, 150);
`;

const TitleBox = styled.div`
  margin-top: 40px;
  text-align: center;
  font-size: 30px;

  a {
    display: inline-block;
    width: 200px;
    height: 100px;
    background-image: url('../../images/petFriendsLogo.png');
    background-repeat: no-repeat;
    background-position: 50% 57%;
    background-size: 150%;
  }
`;

const RegisterStep = () => {
  const step = useSelector((state) => state.auth.register.step);
  const dispatch = useDispatch();

  const prevChangeStep = useCallback(
    (number) => {
      if (step > number) dispatch(changeStep(number));
    },
    [dispatch, step],
  );

  return (
    <>
      <TitleBox>
        <Link to="/"></Link>
      </TitleBox>
      <StepBox>
        <span className={step >= 1 ? 'userId' : ''} onClick={() => prevChangeStep(1)}>
          1. 약관동의
        </span>
        <span>
          <MdArrowForwardIos />
        </span>
        <span className={step >= 2 ? 'certification' : ''} onClick={() => prevChangeStep(2)}>
          2. 휴대번호인증
        </span>
        <span>
          <MdArrowForwardIos />
        </span>
        <span className={step === 3 ? 'newPassword' : ''} onClick={() => prevChangeStep(3)}>
          3. 정보입력
        </span>
      </StepBox>
      <StepBar />
    </>
  );
};

export default RegisterStep;
