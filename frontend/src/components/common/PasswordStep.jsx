import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import palette from '../../lib/styles/palette';
import { MdArrowForwardIos } from 'react-icons/md';

const StepBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 550px;
  margin: 80px auto 10px;
  text-align: center;
  color: rgb(150, 150, 150);

  svg {
    margin-top: 5px;
  }

  .userId,
  .certification,
  .newPassword {
    color: ${palette.mainColor};
  }
`;

const StepBar = styled.div`
  width: 550px;
  margin: 15px auto 0;
  border-bottom: 1px solid rgb(150, 150, 150);
`;

const PasswordStep = () => {
  const step = useSelector((state) => state.find.findPwd.step);
  return (
    <>
      <StepBox>
        <span className={step === 1 && 'userId'}>1. 아이디 입력 </span>
        <span>
          <MdArrowForwardIos />
        </span>
        <span className={step === 2 && 'certification'}>2. 본인인증 </span>
        <span>
          <MdArrowForwardIos />
        </span>
        <span className={step === 3 && 'newPassword'}>3. 새비밀번호 입력</span>
      </StepBox>
      <StepBar />
    </>
  );
};

export default PasswordStep;
