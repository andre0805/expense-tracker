import classes from './Component.module.css';
import type { IComponentProps } from './Component.types';

export const Component = ({ prop1, prop2 }: IComponentProps) => {
  return (
    <div className={classes.componentContainer}>
      <h2 className={classes.componentHeading}>{prop1}</h2>
      <p className={classes.componentSubheading}>{prop2}</p>
    </div>
  );
};
