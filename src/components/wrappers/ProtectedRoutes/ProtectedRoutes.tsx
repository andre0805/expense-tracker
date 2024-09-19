import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../../../providers/AuthProvider';
import { Loading } from '../../Loading';

export const ProtectedRoutes = () => {
  const auth = useAuth();
  const isAuthenticated = auth.user != null;
  const location = useLocation();

  if (auth.isLoading) {
    return <Loading isFullPage={true} />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={'/auth'} state={{ from: { location } }} />;
};
