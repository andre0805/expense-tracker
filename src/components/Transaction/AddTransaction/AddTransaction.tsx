import { IAddTransactionProps } from './AddTransaction.types';
import styles from './AddTransaction.module.css';
import { Flex, NumberInput, SegmentedControl, Text, TextInput } from '@mantine/core';
import { Loading } from '../../Loading';
import { FormEvent, useState } from 'react';
import { useAuth } from '../../../providers/AuthProvider';
import { Category, createTransaction } from '../../../utils';
import { PrimaryButton } from '../../index';

export const AddTransaction = ({ onTransactionAdded }: IAddTransactionProps) => {
  const { user } = useAuth();
  const [amount, setAmount] = useState(0.01);
  const [category, setCategory] = useState(Category.Income);
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAmountChange = (value: number | string) => {
    setAmount(Number(value));
  };

  const handleCategoryChange = (category: Category) => {
    setCategory(category);
  };

  const handleDescriptionChange = (description: string) => {
    setDescription(description);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await onTransactionAdded(
        createTransaction(null, user?.uid ?? 'unknown', description, amount, category),
      );
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
    <form onSubmit={handleSubmit}>
      <Flex direction={'column'} justify={'center'} gap={8}>
        <Text component={'p'}>Amount</Text>
        <NumberInput
          placeholder="20€"
          size="md"
          min={0.01}
          decimalScale={2}
          fixedDecimalScale
          suffix="€"
          value={amount}
          onChange={handleAmountChange}
        />
      </Flex>

      <Flex direction={'column'} justify={'center'} gap={8}>
        <Text component={'p'}>Category</Text>
        <SegmentedControl
          data={['Income', 'Expense']}
          color={
            category == Category.Income
              ? 'var(--mantine-color-green-5)'
              : 'var(--mantine-color-red-8)'
          }
          fullWidth
          onChange={(category) =>
            handleCategoryChange(category === 'Income' ? Category.Income : Category.Expense)
          }
        />
      </Flex>

      <Flex direction={'column'} justify={'center'} gap={8}>
        <Text component={'p'}>Description</Text>
        <TextInput
          placeholder="Description"
          value={description}
          required
          onChange={(event) => handleDescriptionChange(event.currentTarget.value)}
        />
      </Flex>

      {error && (
        <Text component={'p'} className={styles.error}>
          {error}
        </Text>
      )}

      <PrimaryButton mt={8} mx={'auto'} type="submit">
        Add
      </PrimaryButton>
    </form>
  );
};
