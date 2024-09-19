import { ITransaction } from '../../utils';

export interface ITransactionListProps {
  transactions: ITransaction[];
  onTransactionAdded: (transaction: ITransaction) => void;
}
