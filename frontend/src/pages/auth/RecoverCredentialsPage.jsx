import FindIdContainer from '../../containers/auth/FindIdContainer';
import { useLocation } from 'react-router-dom';
import FindPwdFirstContainer from '../../containers/find/FindPwdFirstContainer';
import FindPwdSecondContainer from '../../containers/find/FindPwdSecondContainer';
import { useSelector } from 'react-redux';
import PasswordStep from '../../components/common/PasswordStep';
import FindPwdThirdContainer from '../../containers/find/FindPwdThirdContainer';

const RecoverCredentialsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get('type');
  const step = useSelector((state) => state.find.findPwd.step);
  console.log(type, step);

  return (
    <>
      {type === 'findPwd' && (
        <>
          <PasswordStep />
          {step === 1 && <FindPwdFirstContainer />}
          {step === 2 && <FindPwdSecondContainer />}
          {step === 3 && <FindPwdThirdContainer />}
        </>
      )}
      {type === 'findId' && <FindIdContainer />}
    </>
  );
};

export default RecoverCredentialsPage;
