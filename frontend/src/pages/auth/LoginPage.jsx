import { Helmet } from 'react-helmet-async';
import LoginContainer from '../../containers/auth/LoginContainer';

const LoginPage = ({ light }) => {
  return (
    <>
      <Helmet>
        <title>펫프렌즈 - 로그인</title>
      </Helmet>
      <LoginContainer light={light} />
    </>
  );
};

export default LoginPage;
