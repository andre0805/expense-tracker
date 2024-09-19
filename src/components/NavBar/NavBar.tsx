import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';
import { Logo } from '../Logo';
import { Flex, Text } from '@mantine/core';

export const NavBar = () => {
  return (
    <nav>
      <Flex justify={'center'} align={'center'} gap={12}>
        <Logo />

        <NavLink to={'/'}>
          <Text size={'1.1rem'} fw={700} c={'var(--mantine-color-white)'}>
            Expense
            <br />
            Tracker
          </Text>
        </NavLink>
      </Flex>

      <NavLink to={'/profile'} className={styles.link}>
        Profile
      </NavLink>
    </nav>
  );
};
