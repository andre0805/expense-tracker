import { NavBar } from '../../NavBar';
import { Outlet } from 'react-router';

export const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
