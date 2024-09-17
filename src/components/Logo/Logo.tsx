import styles from './Logo.module.css';
import logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';

export const Logo = () => {
  return (
    <div className={styles.container}>
      <NavLink to={'/'}>
        <img src={logo} alt="logo" className={styles.icon} />
      </NavLink>
    </div>
  );
};
