import { useSelector } from '../../../node_modules/react-redux/es/exports';
import AgreeContainer from '../../containers/auth/AgreeContainer';
import RegisterContainer from '../../containers/auth/RegisterContainer';

const RegisterPage = () => {
  const confirm = useSelector((state) => state.auth.register.agree.confirm);
  console.log(confirm);
  return <>{confirm ? <RegisterContainer /> : <AgreeContainer />}</>;
};

export default RegisterPage;
