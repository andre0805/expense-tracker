import styles from './NotFound.module.css';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Not Found</h1>
      <h3 className={styles.description}>The page you are looking for does not exist</h3>
      <Link to="/" className={styles.backButton}>
        Homepage
      </Link>
    </div>
  );
};
