import styles from './NotFound.module.css';
import { Link } from 'react-router-dom';

// h1, h2 itd imaju svoju komponentu unutar mantinea, gledati i nju koristit sto je vise moguce
// isto vrijedi i za ostalo, moze se koristit Text komponenta, pa proslijediti component="p" npr ako ide paragraf sa tim stilom

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
