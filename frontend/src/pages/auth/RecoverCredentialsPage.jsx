import FindIdContainer from '../../containers/auth/FindIdContainer';
import { useLocation } from 'react-router-dom';
import FindPwdFirstContainer from '../../containers/find/FindPwdFirstContainer';
import FindPwdSecondContainer from '../../containers/find/FindPwdSecondContainer';
import { useSelector } from 'react-redux';
import PasswordStep from '../../components/common/PasswordStep';
import FindPwdThirdContainer from '../../containers/find/FindPwdThirdContainer';
import FindPwdFinishContainer from '../../containers/find/FindPwdFinishContainer';
import { Helmet } from 'react-helmet-async';

const RecoverCredentialsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get('type');
  const step = useSelector((state) => state.find.findPwd.step);

  return (
    <>
      {type === 'findPwd' && (
        <>
          <Helmet>
            <title>펫프렌즈 - 비밀번호찾기</title>
          </Helmet>
          {step !== 4 && <PasswordStep />}
          {step === 1 && <FindPwdFirstContainer />}
          {step === 2 && <FindPwdSecondContainer />}
          {step === 3 && <FindPwdThirdContainer />}
          {step === 4 && <FindPwdFinishContainer />}
        </>
      )}
      {type === 'findId' && (
        <>
          <Helmet>
            <title>펫프렌즈 - 아이디찾기</title>
          </Helmet>
          <FindIdContainer />
        </>
      )}
    </>
  );
};

export default RecoverCredentialsPage;
