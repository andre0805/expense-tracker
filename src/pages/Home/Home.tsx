import styles from './Home.module.css';
import { useEffect, useState } from 'react';
import { LineChart } from '@mantine/charts';
import { Loading, TransactionList } from '../../components';
import {
  addTransaction,
  deleteTransaction,
  getTransactions,
} from '../../repository/transactions.service';
import { useAuth } from '../../providers/AuthProvider';
import {
  Category,
  getDateString,
  isExpense,
  isIncome,
  ITransaction,
  transactionConverter,
} from '../../utils';
import { Flex, Text } from '@mantine/core';

export const Home = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.uid) {
      setIsLoading(true);
      getAllTransactions(user.uid)
        .catch((e) => console.log(e))
        .finally(() => setIsLoading(false));
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

  const balance = transactions.reduce((acc, t) => acc + (isIncome(t) ? t.amount : -t.amount), 0);
  const maxAmount = transactions.map((t) => t.amount).sort((a, b) => b - a)[0];

  const handleTransactionAdded = async (transaction: ITransaction) => {
    try {
      await addTransaction(transaction);
      setTransactions([...transactions, transaction]);
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const handleTransactionDeleted = async (transactionId: string) => {
    try {
      await deleteTransaction(transactionId);
      setTransactions(transactions.filter((t) => t.id !== transactionId));
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  if (isLoading) {
    return <Loading height={'200'} />;
  }

  return (
    <Flex gap={48} className={styles.container}>
      <Flex direction={'column'} gap={8} className={styles.transactions}>
        <Text className={styles.balance}>Balance: {balance.toFixed(2)}€</Text>
        <TransactionList
          transactions={transactions.sort((t1, t2) => (t1.date > t2.date ? -1 : 1))}
          onTransactionAdded={handleTransactionAdded}
          onTransactionDeleted={handleTransactionDeleted}
        />
      </Flex>

      {transactions.length != 0 && (
        <Flex direction={'column'} gap={8} className={styles.chartContainer}>
          <Text className={styles.stats}>Stats</Text>
          <LineChart
            className={styles.chart}
            h={300}
            data={transactions
              .sort((t1, t2) => (t1.date < t2.date ? -1 : 1))
              .map((t) => ({
                date: getDateString(t),
                [Category.Income]: isIncome(t) ? t.amount : null,
                [Category.Expense]: isExpense(t) ? t.amount : null,
              }))}
            dataKey="date"
            series={[
              { color: 'var(--mantine-color-green-5)', name: Category.Income },
              { color: 'var(--mantine-color-red-8)', name: Category.Expense },
            ]}
            xAxisProps={{ padding: { left: 30, right: 30 } }}
            yAxisProps={{ domain: [0, maxAmount * 1.4] }}
            unit="€"
            curveType="monotone"
            strokeDasharray="10 10"
          />
        </Flex>
      )}
    </Flex>
  );
};
