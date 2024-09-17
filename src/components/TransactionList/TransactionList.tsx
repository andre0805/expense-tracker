import { ITransactionListProps } from './TransactionList.types';
import { TransactionListItem } from '../TransactionListItem';
import styles from './TransactionList.module.css';
import { ActionIcon, Modal } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

export const TransactionList = ({ transactions }: ITransactionListProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className={styles.container}>
      <Modal opened={opened} onClose={close} centered title="Add new transaction" />

      <div className={styles.header}>
        <h4 className={styles.title}>Transactions</h4>
        <ActionIcon
          variant="outline"
          size="sm"
          radius="xl"
          className={styles.addButton}
          onClick={open}
        >
          <IconPlus style={{ width: '70%', height: '70%' }} stroke={2} />
        </ActionIcon>
      </div>

      {transactions.map((transaction) => (
        <TransactionListItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};
