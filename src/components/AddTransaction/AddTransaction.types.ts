import { Transaction } from '../../models/Transaction';

export interface IAddTransactionProps {
  onTransactionAdded: (transaction: Transaction) => Promise<void>;
}
