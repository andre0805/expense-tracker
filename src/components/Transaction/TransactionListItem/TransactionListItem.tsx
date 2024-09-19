import { ITransactionListItemProps } from './TransactionListItem.types';
import styles from './TransactionListItem.module.css';
import { isIncome } from '../../../utils';
import { Flex, Modal, Text } from '@mantine/core';
import clsx from 'clsx';
import { useDisclosure } from '@mantine/hooks';
import { TransactionDetails } from '../TransactionDetails/TransactionDetails';

export const TransactionListItem = ({
  transaction,
  onTransactionDeleted,
}: ITransactionListItemProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        onSubmit={() => {}}
        title="Transaction details"
        centered
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        <TransactionDetails transaction={transaction} onTransactionDeleted={onTransactionDeleted} />
      </Modal>

      <Flex
        justify={'space-between'}
        align={'center'}
        className={clsx(styles.container, isIncome(transaction) ? styles.income : styles.expense)}
        onClick={open}
      >
        <Flex justify={'center'} align={'center'} gap={16}>
          <Flex
            direction={'column'}
            justify={'center'}
            align={'center'}
            gap={0}
            className={styles.date}
          >
            <Text className={styles.day}>{transaction.date.getDate()}</Text>
            <Text className={styles.month}>
              {transaction.date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
            </Text>
          </Flex>
          <Text className={styles.description}>{transaction.description}</Text>
        </Flex>

        <Text className={styles.amount}>
          {isIncome(transaction) ? '+' : '-'}
          {transaction.amount}€
        </Text>
      </Flex>
    </>
  );
};
