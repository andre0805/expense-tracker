import { ITransactionListProps } from './TransactionList.types';
import { TransactionListItem } from '../TransactionListItem';
import styles from './TransactionList.module.css';
import { ActionIcon, Modal } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { AddTransaction } from '../AddTransaction';
import { Transaction } from '../../models/Transaction';

export const TransactionList = ({ transactions, onTransactionAdded }: ITransactionListProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 25em)');

  const handleTransactionAdded = (transaction: Transaction) => {
    onTransactionAdded(transaction);
    close();
  };

  return (
    <div className={styles.container}>
      <Modal
        opened={opened}
        onClose={close}
        title="Add Transaction"
        centered
        fullScreen={isMobile ?? false}
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        <AddTransaction onTransactionAdded={handleTransactionAdded} />
      </Modal>

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
