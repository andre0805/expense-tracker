import styles from './NotFound.module.css';
import { Button, Flex, Text } from '@mantine/core';
import { useNavigate } from 'react-router';

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
      <Button className={styles.backButton} onClick={goToHomepage}>
        Homepage
      </Button>
    </Flex>
  );
};
