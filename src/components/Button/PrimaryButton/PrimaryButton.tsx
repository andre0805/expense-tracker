import { BaseButton } from '../BaseButton';
import styles from './PrimaryButton.module.css';
import { BaseButtonProps } from '../BaseButton.types';
import clsx from 'clsx';

export const PrimaryButton = ({ className, ...props }: BaseButtonProps) => {
  const combinedClassName = clsx(styles.button, className);
  return <BaseButton {...props} className={combinedClassName}></BaseButton>;
};
