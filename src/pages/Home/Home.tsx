import styles from './Home.module.css';
import { Transaction, transactionConverter } from '../../models/Transaction';
import { useEffect, useState } from 'react';
import { LineChart } from '@mantine/charts';
import { Category } from '../../models/Category';
import { TransactionList } from '../../components/TransactionList';
import { addTransaction, getTransactions } from '../../repository/transactions.service';
import { useAuth } from '../../providers/AuthProvider';

export const Home = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (user?.uid) {
      getAllTransactions(user.uid);
    }
  }, []);

  const getAllTransactions = async (uid: string) => {
    try {
      const snapshot = await getTransactions(uid);
      const data = snapshot.docs.map((doc) => transactionConverter.fromFirestore(doc, {}));
      setTransactions(data);
    } catch (e) {
      console.log(e);
    }
  };

  const balance = transactions.reduce((acc, t) => acc + (t.isIncome() ? t.amount : -t.amount), 0);
  const maxAmount = transactions.map((t) => t.amount).sort((a, b) => b - a)[0];

  const handleTransactionAdded = async (transaction: Transaction) => {
    try {
      await addTransaction(transaction);
      setTransactions([...transactions, transaction]);
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.transactions}>
        <h1 className={styles.balance}>Balance: {balance.toFixed(2)}€</h1>
        <TransactionList
          transactions={transactions.sort((t1, t2) => (t1.date > t2.date ? -1 : 1))}
          onTransactionAdded={handleTransactionAdded}
        />
      </div>

      {transactions.length != 0 && (
        <div className={styles.chartContainer}>
          <h1 className={styles.stats}>Stats</h1>
          <LineChart
            className={styles.chart}
            h={300}
            data={transactions
              .sort((t1, t2) => (t1.date < t2.date ? -1 : 1))
              .map((t) => ({
                date: t.getDateString(),
                [Category.Income]: t.isIncome() ? t.amount : null,
                [Category.Expense]: t.isIncome() ? null : t.amount,
              }))}
            dataKey="date"
            series={[
              { color: 'rgb(144 238 144)', name: Category.Income },
              { color: 'rgb(255 99 71)', name: Category.Expense },
            ]}
            xAxisProps={{ padding: { left: 30, right: 30 } }}
            yAxisProps={{ domain: [0, maxAmount * 1.4] }}
            unit="€"
            curveType="monotone"
            strokeDasharray="10 10"
          />
        </div>
      )}
    </div>
  );
};
