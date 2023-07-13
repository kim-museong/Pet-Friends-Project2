import FindIdContainer from '../../containers/auth/FindIdContainer';
import { useLocation } from 'react-router-dom';
import FindPwdFirstContainer from '../../containers/find/FindPwdFirstContainer';
import FindPwdSecondContainer from '../../containers/find/FindPwdSecondContainer';
import { useSelector } from 'react-redux';

const RecoverCredentialsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get('type');
  const step = useSelector((state) => state.find.findPwd.step);

  return (
    <>
      {type === 'findPwd' && (
        <>
          {step === 1 && <FindPwdFirstContainer />}

          {step === 2 && <FindPwdSecondContainer />}
        </>
      )}
      {type === 'findId' && <FindIdContainer />}
    </>
  );
};

export default RecoverCredentialsPage;
