import styles from './NotFound.module.css';
import { Flex, Text } from '@mantine/core';
import { useNavigate } from 'react-router';
import { PrimaryButton } from '../../components';

export const NotFound = () => {
  const navigate = useNavigate();

  const goToHomepage = () => {
    navigate('/');
  };

  return (
    <Flex
      direction={'column'}
      justify={'center'}
      align={'center'}
      gap={32}
      className={styles.container}
    >
      <Text className={styles.title}>Not Found</Text>
      <Text className={styles.subtitle}>The page you are looking for does not exist</Text>
      <PrimaryButton onClick={goToHomepage}>Homepage</PrimaryButton>
    </Flex>
  );
};
