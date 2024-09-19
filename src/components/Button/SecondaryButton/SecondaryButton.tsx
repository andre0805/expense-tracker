import styles from './SecondaryButton.module.css';
import { Button } from '../Button';

export const SecondaryButton = ({ ...props }) => {
  return <Button className={styles.button} {...props}></Button>;
};
