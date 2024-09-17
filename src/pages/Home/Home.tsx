import styles from './Home.module.css';
import { Transaction } from '../../models/Transaction';
import { TransactionList } from '../../components/TransactionList';
import { useState } from 'react';

export const Home = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const balance = transactions.reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className={styles.container}>
      <h1 className={styles.balance}>Balance: {balance}€</h1>
      <TransactionList
        transactions={transactions}
        onTransactionAdded={(t) => setTransactions([...transactions, t])}
      />
    </div>
  );
};
