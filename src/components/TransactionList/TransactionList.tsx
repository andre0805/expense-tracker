import { ITransactionListProps } from './TransactionList.types';
import { TransactionListItem } from '../TransactionListItem';
import styles from './TransactionList.module.css';
import { ActionIcon, Modal } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { AddTransaction } from '../AddTransaction';
import { ITransaction } from '../../utils';

export const TransactionList = ({ transactions, onTransactionAdded }: ITransactionListProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 25em)');

  const handleTransactionAdded = async (transaction: ITransaction) => {
    await onTransactionAdded(transaction);
    close();
  };

  return (
    <div className={styles.container}>
      <Modal
        opened={opened}
        onClose={close}
        onSubmit={() => {}}
        title="Add ITransaction"
        centered
        fullScreen={isMobile ?? false}
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        <AddTransaction onTransactionAdded={handleTransactionAdded} />
      </Modal>

      <div className={styles.header}>
        <h4 className={styles.title}>Transactions ({transactions.length})</h4>
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

      {transactions.length === 0 && <div className={styles.empty}>No transactions yet</div>}

      {transactions.map((transaction) => (
        <TransactionListItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};
