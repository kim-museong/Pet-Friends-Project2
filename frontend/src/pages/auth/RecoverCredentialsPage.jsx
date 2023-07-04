import FindIdContainer from '../../containers/auth/FindIdContainer';
import FindPwdContainer from '../../containers/auth/FindPwdContainer';
import { useLocation } from 'react-router-dom';

const RecoverCredentialsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get('type');

  return (
    <>
      {type === 'findPwd' && <FindPwdContainer />}
      {type === 'findId' && <FindIdContainer />}
    </>
  );
};

export default RecoverCredentialsPage;
