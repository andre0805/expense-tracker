import { useAuth } from '../../providers/AuthProvider';
import { Button } from '@mantine/core';
import styles from './Profile.module.css';
import avatarPlaceholder from '../../assets/avatar.svg';
import { IconLogout } from '@tabler/icons-react';

export const Profile = () => {
  const auth = useAuth();
  const user = auth.user;

  const logout = () => {
    return auth.logout();
  };

  const profileImage = user?.photoURL ? user.photoURL : avatarPlaceholder;

  return (
    <div className={styles.container}>
      <div className={styles.userDetails}>
        <img src={profileImage} alt="User profile" className={styles.profileImage} />
        <p className={styles.name}>{user?.displayName}</p>
        <p className={styles.email}>{user?.email}</p>
      </div>
      <Button
        className={styles.logoutButton}
        leftSection={<IconLogout size={16} />}
        onClick={logout}
      >
        Logout
      </Button>
    </div>
  );
};
