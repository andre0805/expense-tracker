import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';
import { Logo } from '../Logo';

export const NavBar = () => {
  return (
    <nav>
      <Logo />

      <NavLink to={'/profile'} className={styles.link}>
        Profile
      </NavLink>
    </nav>
  );
};
