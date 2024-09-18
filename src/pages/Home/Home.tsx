import styles from './Home.module.css';
import { Transaction } from '../../models/Transaction';
import { useState } from 'react';
import { LineChart } from '@mantine/charts';
import { Category } from '../../models/Category';
import { TransactionList } from '../../components/TransactionList';

export const Home = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const balance = transactions.reduce(
    (acc, t) => acc + (t.category === Category.Income ? t.amount : -t.amount),
    0,
  );
  const maxAmount = transactions.map((t) => t.amount).sort((a, b) => b - a)[0];

  return (
    <div className={styles.container}>
      <div className={styles.transactions}>
        <h1 className={styles.balance}>Balance: {balance.toFixed(2)}€</h1>
        <TransactionList
          transactions={transactions.sort((t1, t2) => (t1.date > t2.date ? -1 : 1))}
          onTransactionAdded={(t) => setTransactions([...transactions, t])}
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
                date: t.dateString,
                [Category.Income]: t.category === Category.Income ? t.amount : null,
                [Category.Expense]: t.category === Category.Expense ? t.amount : null,
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
