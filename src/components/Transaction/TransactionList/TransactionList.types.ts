import { ITransaction } from '../../../utils';

export interface ITransactionListProps {
  transactions: ITransaction[];
  onTransactionAdded: (transaction: ITransaction) => Promise<void>;
  onTransactionDeleted: (transactionId: string) => Promise<void>;
}
