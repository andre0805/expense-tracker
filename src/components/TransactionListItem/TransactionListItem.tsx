import { ITransactionListItemProps } from './TransactionListItem.types';
import styles from './TransactionListItem.module.css';
import { isIncome } from '../../utils';
import { Flex, Text } from '@mantine/core';
import clsx from 'clsx';

export const TransactionListItem = ({ transaction }: ITransactionListItemProps) => {
  return (
    <Flex
      justify={'space-between'}
      align={'center'}
      className={clsx(styles.container, isIncome(transaction) ? styles.income : styles.expense)}
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
  );
};
