import { useSelector, useDispatch } from 'react-redux';
import { MdArrowForwardIos } from 'react-icons/md';
import { useCallback } from 'react';
import { changeStep } from '../../modules/auth';
import * as S from '../../styles/register/step.style';

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
    <S.Wrapper>
      <S.LogoBox>
        <S.LogoBtn to="/"></S.LogoBtn>
      </S.LogoBox>
      <S.StepBox>
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
      </S.StepBox>
      <S.StepLine />
    </S.Wrapper>
  );
};

export default RegisterStep;
