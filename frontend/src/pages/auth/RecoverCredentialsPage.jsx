import FindIdContainer from '../../containers/auth/FindIdContainer';
import FindPwdContainer from '../../containers/auth/FindPwdContainer';

const RecoverCredentialsPage = ({ light }) => {
  return (
    <>
      <FindPwdContainer light={light} />
      <FindIdContainer light={light} />
    </>
  );
};

export default RecoverCredentialsPage;
