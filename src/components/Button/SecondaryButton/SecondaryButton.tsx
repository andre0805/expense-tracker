import styles from './SecondaryButton.module.css';
import { BaseButton } from '../BaseButton';
import { BaseButtonProps } from '../BaseButton.types';
import clsx from 'clsx';

export const SecondaryButton = ({ className, ...props }: BaseButtonProps) => {
  const combinedClassName = clsx(styles.button, className);
  return <BaseButton {...props} className={combinedClassName}></BaseButton>;
};
