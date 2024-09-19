import { useState } from 'react';
import { ITransactionDetailsProps } from './TransactionDetails.types';
import styles from '../TransactionDetails/TransactionDetails.module.css';
import { Flex, NumberInput, SegmentedControl, Text, TextInput } from '@mantine/core';
import { Loading } from '../../Loading';
import { SecondaryButton } from '../../Button';
import { IconTrash } from '@tabler/icons-react';
import { isIncome } from '../../../utils';

export const TransactionDetails = ({
  transaction,
  onTransactionDeleted,
}: ITransactionDetailsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await onTransactionDeleted(transaction.id);
    } catch (e) {
      console.log(e);
      setError('Failed to add transaction');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading width={'100%'} height={'200px'} />;
  }

  return (
    <Flex direction={'column'} gap={24} mt={8}>
      <Flex direction={'column'} justify={'center'} gap={8}>
        <Text component={'p'}>Amount</Text>
        <NumberInput size="md" suffix="€" value={transaction.amount} disabled />
      </Flex>

      <Flex direction={'column'} justify={'center'} gap={8}>
        <Text component={'p'}>Category</Text>
        <SegmentedControl
          data={['Income', 'Expense']}
          value={isIncome(transaction) ? 'Income' : 'Expense'}
          color={
            isIncome(transaction) ? 'var(--mantine-color-green-5)' : 'var(--mantine-color-red-8)'
          }
          fullWidth
          readOnly
        />
      </Flex>

      <Flex direction={'column'} justify={'center'} gap={8}>
        <Text component={'p'}>Description</Text>
        <TextInput value={transaction.description} disabled />
      </Flex>

      {error && (
        <Text component={'p'} className={styles.error}>
          {error}
        </Text>
      )}

      <SecondaryButton
        mt={8}
        mx={'auto'}
        leftSection={<IconTrash size={16} />}
        onClick={handleDelete}
      >
        Delete
      </SecondaryButton>
    </Flex>
  );
};
