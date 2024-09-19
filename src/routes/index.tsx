import { createBrowserRouter } from 'react-router-dom';
import { Auth, Home, NotFound, Profile } from '../pages';
import { Layout, ProtectedRoutes } from '../components';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoutes />,
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
