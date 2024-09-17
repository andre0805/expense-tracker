import { useAuth } from '../../providers/AuthProvider';
import { Button } from '@mantine/core';

const Profile = () => {
  const auth = useAuth();

  const logout = () => {
    return auth.logout();
  };

  return (
    <div>
      <p>Logged in as {auth.user?.email}</p>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default Profile;
