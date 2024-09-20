import { ButtonProps } from '@mantine/core';

export interface BaseButtonProps extends ButtonProps {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}
