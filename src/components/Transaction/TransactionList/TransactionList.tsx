import { ITransactionListProps } from './TransactionList.types';
import { TransactionListItem } from '../TransactionListItem';
import styles from './TransactionList.module.css';
import { ActionIcon, Flex, Modal, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { AddTransaction } from '../AddTransaction';
import { ITransaction } from '../../../utils';

export const TransactionList = ({
  transactions,
  onTransactionAdded,
  onTransactionDeleted,
}: ITransactionListProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  const handleTransactionAdded = async (transaction: ITransaction) => {
    await onTransactionAdded(transaction);
    close();
  };

  return (
    <Flex direction={'column'} gap={16}>
      <Modal
        opened={opened}
        onClose={close}
        onSubmit={() => {}}
        title="Add Transaction"
        centered
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        <AddTransaction onTransactionAdded={handleTransactionAdded} />
      </Modal>

      <Flex justify={'space-between'} align={'center'}>
        <Text className={styles.title}>Transactions ({transactions.length})</Text>
        <ActionIcon
          variant="outline"
          size="sm"
          radius="xl"
          className={styles.addButton}
          onClick={open}
        >
          <IconPlus style={{ width: '70%', height: '70%' }} stroke={2} />
        </ActionIcon>
      </Flex>

      {transactions.length === 0 && <Text className={styles.empty}>No transactions yet</Text>}

      {transactions.map((transaction) => (
        <TransactionListItem
          key={transaction.id}
          transaction={transaction}
          onTransactionDeleted={onTransactionDeleted}
        />
      ))}
    </Flex>
  );
};
