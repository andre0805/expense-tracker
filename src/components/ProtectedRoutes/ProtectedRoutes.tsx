import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../../providers/AuthProvider';

export const ProtectedRoutes = () => {
  const userAuth = useAuth();
  const isAuthenticated = userAuth.user != null;
  const location = useLocation();
  return isAuthenticated ? <Outlet /> : <Navigate to={'/auth'} state={{ from: { location } }} />;
};
