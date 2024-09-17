import styles from './Loading.module.css';

export const Loading = () => {
  // create circle loading
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
};
