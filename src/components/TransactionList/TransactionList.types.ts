import { Transaction } from '../../models/Transaction';

export interface ITransactionListProps {
  transactions: Transaction[];
  onTransactionAdded: (transaction: Transaction) => void;
}
