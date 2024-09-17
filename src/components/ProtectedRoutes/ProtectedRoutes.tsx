import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../../providers/AuthProvider';
import { Loading } from '../Loading';
import styles from './ProtectedRoutes.module.css';

export const ProtectedRoutes = () => {
  const auth = useAuth();
  const isAuthenticated = auth.user != null;
  const location = useLocation();

  if (auth.isLoading) {
    return (
      <div className={styles.spinnerContainer}>
        <Loading />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={'/auth'} state={{ from: { location } }} />;
};
