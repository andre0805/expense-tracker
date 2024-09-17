import styles from './Home.module.css';
import { Transaction } from '../../models/Transaction';
import { Category } from '../../models/Category';
import { TransactionList } from '../../components/TransactionList';
import { useState } from 'react';

export const Home = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    new Transaction('Salary', 1000, Category.Income),
    new Transaction('Rent', 500, Category.Expense),
  ]);

  return (
    <div className={styles.container}>
      <h1 className={styles.balance}>Balance: {0}€</h1>
      <TransactionList
        transactions={transactions}
        onTransactionAdded={(t) => setTransactions([...transactions, t])}
      />
    </div>
  );
};
