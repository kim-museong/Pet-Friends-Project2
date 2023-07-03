import FindIdContainer from '../../containers/auth/FindIdContainer';
import FindPwdContainer from '../../containers/auth/FindPwdContainer';

const RecoverCredentialsPage = () => {
  return (
    <>
      <FindPwdContainer />
      <FindIdContainer />
    </>
  );
};

export default RecoverCredentialsPage;
