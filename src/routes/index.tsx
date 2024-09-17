import { createBrowserRouter } from 'react-router-dom';
import { Auth, Home, NotFound, Profile } from '../pages';
import { Layout, ProtectedRoutes } from '../components';

export const router = createBrowserRouter([
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
