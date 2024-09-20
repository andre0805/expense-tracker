import { useAuth } from '../../providers/AuthProvider';
import { Avatar, Flex, Text } from '@mantine/core';
import styles from './Profile.module.css';
import { IconLogout } from '@tabler/icons-react';
import { SecondaryButton } from '../../components';

export const Profile = () => {
  const auth = useAuth();
  const user = auth.user;

  const logout = () => {
    return auth.logout();
  };

  return (
    <Flex direction={'column'} justify={'center'} align={'center'} className={styles.container}>
      <Flex direction={'column'} justify={'center'} align={'center'} gap={16}>
        <Avatar
          src={user?.photoURL || null}
          alt="User profile"
          variant="light"
          size={100}
          color={'green'}
          radius="50%"
        >
          {user?.displayName
            ?.split(' ')
            .map((name) => name[0].toUpperCase())
            .join('')}
        </Avatar>

        <Text className={styles.name}>{user?.displayName}</Text>
        <Text className={styles.email}>{user?.email}</Text>
      </Flex>

      <SecondaryButton
        className={styles.logoutButton}
        leftSection={<IconLogout size={16} />}
        onClick={logout}
      >
        Logout
      </SecondaryButton>
    </Flex>
  );
};
