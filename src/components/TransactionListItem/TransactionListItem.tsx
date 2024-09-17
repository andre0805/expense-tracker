import { ITransactionListItemProps } from './TransactionListItem.types';
import styles from './TransactionListItem.module.css';
import { Category } from '../../models/Category';

export const TransactionListItem = ({ transaction }: ITransactionListItemProps) => {
  const isIncome = transaction.category == Category.Income;

  return (
    <div className={styles.container.concat(' ').concat(isIncome ? styles.income : styles.expense)}>
      <div className={styles.leftInfo}>
        <div className={styles.date}>
          <div className={styles.day}>{transaction.date.getDate()}</div>
          <div className={styles.month}>
            {transaction.date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
          </div>
        </div>
        <div className={styles.description}>{transaction.description}</div>
      </div>
      <div className={styles.rightInfo}>
        <div className={styles.amount}>
          {transaction.category == Category.Income ? '+' : '-'}
          {transaction.amount}€
        </div>
      </div>
    </div>
  );
};
