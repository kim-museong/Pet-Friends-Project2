import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AuthorityRoute({ access }) {
  const user = useSelector((state) => state.user.user);

  const loginMember = user;

  if (loginMember?.rank === access) return <Outlet />;
  else if (loginMember?.rank !== access) return <Navigate to={'/permission'} />;
  else return <Navigate to={'*'} />;
}
