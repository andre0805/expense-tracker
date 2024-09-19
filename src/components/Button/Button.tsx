import styles from './Button.module.css';
import { Button as MantineButton } from '@mantine/core';

export const Button = ({ ...props }) => {
  return <MantineButton className={styles.button} {...props} />;
};
