import { ITransaction } from '../../../utils';

export interface ITransactionListItemProps {
  transaction: ITransaction;
  onTransactionDeleted: (transactionId: string) => Promise<void>;
}
