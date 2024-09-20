import { Button } from '@mantine/core';
import { BaseButtonProps } from './BaseButton.types';
import clsx from 'clsx';

export const BaseButton = ({
  children,
  className,
  type = 'button',
  onClick,
  ...rest
}: BaseButtonProps) => {
  const combinedClassName = clsx(className);

  return (
    <Button className={combinedClassName} type={type} onClick={onClick} {...rest}>
      {children}
    </Button>
  );
};
