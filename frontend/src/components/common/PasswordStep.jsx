import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import palette from '../../lib/styles/palette';
import { MdArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useDispatch } from '../../../node_modules/react-redux/es/exports';
import { prevStep } from '../../modules/find';
import { useCallback } from 'react';

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
  margin: 15px auto 0;
  border-bottom: 1px solid rgb(150, 150, 150);
`;

const TitleBox = styled.div`
  margin-top: 40px;
  text-align: center;
  font-size: 30px;
`;

const PasswordStep = () => {
  const step = useSelector((state) => state.find.findPwd.step);
  const dispatch = useDispatch();

  const prevChangeStep = useCallback(() => {
    dispatch(prevStep());
  }, [dispatch]);

  return (
    <>
      <TitleBox>
        <Link to="/">Logo</Link>
      </TitleBox>
      <StepBox>
        <span className={step >= 1 ? 'userId' : ''} onClick={prevChangeStep}>
          1. 아이디 입력
        </span>
        <span>
          <MdArrowForwardIos />
        </span>
        <span className={step >= 2 ? 'certification' : ''}>2. 본인인증 </span>
        <span>
          <MdArrowForwardIos />
        </span>
        <span className={step === 3 ? 'newPassword' : ''}>3. 새비밀번호 입력</span>
      </StepBox>
      <StepBar />
    </>
  );
};

export default PasswordStep;
