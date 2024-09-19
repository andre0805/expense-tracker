import styles from './Loading.module.css';
import { ILoadingProps } from './Loading.types';
import { Center } from '@mantine/core';

export const Loading = ({ isFullPage, width, height }: ILoadingProps) => {
  if (isFullPage) {
    return (
      <Center w={'100vw'} h={'100vh'}>
        <div className={styles.spinner}></div>
      </Center>
    );
  } else {
    return (
      <Center w={width} h={height}>
        <div className={styles.spinner}></div>
      </Center>
    );
  }
};
