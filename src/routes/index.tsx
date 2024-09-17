import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import { NotFound } from '../pages/NotFound/NotFound';
import { Layout } from '../components/Layout';
import { ProtectedRoutes } from '../components';
import Auth from '../pages/Auth/Auth';
import Profile from '../pages/Profile/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoutes />,
    errorElement: <h1>Error</h1>,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            path: '/',
            element: <Home />,
          },
          {
            path: '/dashboard',
            element: <h1>Dashboard</h1>,
          },
          {
            path: '/profile',
            element: <Profile />,
          },
        ],
      },
    ],
  },
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/*',
    element: <NotFound />,
  },
]);

export default router;
