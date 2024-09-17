import { IAddTransactionProps } from './AddTransaction.types';
import styles from './AddTransaction.module.css';
import { Button, NumberInput, SegmentedControl, TextInput } from '@mantine/core';
import { Transaction } from '../../models/Transaction';
import { Category } from '../../models/Category';
import { Loading } from '../Loading';
import { useState } from 'react';

export const AddTransaction = ({ onTransactionAdded }: IAddTransactionProps) => {
  const [amount, setAmount] = useState(0.01);
  const [category, setCategory] = useState(Category.Income);
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAmountChange = (value: number | string) => {
    setAmount(Number(value));
  };

  const handleCategoryChange = (category: Category) => {
    setCategory(category);
  };

  const handleDescriptionChange = (description: string) => {
    setDescription(description);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      onTransactionAdded(new Transaction(description, amount, category));
      setIsLoading(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className={styles.spinnerContainer}>
        <Loading />
      </div>
    );
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.transactionItem}>
        <p>Amount</p>
        <NumberInput
          className={styles.amount}
          placeholder="20€"
          size="md"
          min={0.01}
          decimalScale={2}
          fixedDecimalScale
          suffix="€"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>

      <div className={styles.transactionItem}>
        <p>Category</p>
        <SegmentedControl
          className={styles.category}
          data={['Income', 'Expense']}
          color={category == Category.Income ? 'teal' : 'red'}
          fullWidth
          onChange={(category) =>
            handleCategoryChange(category === 'Income' ? Category.Income : Category.Expense)
          }
        />
      </div>

      <div className={styles.transactionItem}>
        <p>Description</p>
        <TextInput
          className={styles.description}
          placeholder="Description"
          value={description}
          required
          onChange={(event) => handleDescriptionChange(event.currentTarget.value)}
        />
      </div>

      <Button className={styles.submitButton} type="submit">
        Add
      </Button>
    </form>
  );
};
