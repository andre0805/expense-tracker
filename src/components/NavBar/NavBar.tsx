import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import { Logo } from '../Logo';

export const NavBar = () => {
  return (
    <nav>
      <Logo />

      <div className={styles.items}>
        <div className={styles.leftItems}>
          <NavLink to={'/dashboard'} className={styles.link}>
            Dashboard
          </NavLink>
        </div>

        <div className={styles.rightItems}>
          <NavLink to={'/profile'} className={styles.link}>
            Profile
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
