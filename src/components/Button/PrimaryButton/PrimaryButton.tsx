import { Button } from '../Button';
import styles from './PrimaryButton.module.css';

export const PrimaryButton = ({ ...props }) => {
  return <Button className={styles.button} {...props}></Button>;
};
