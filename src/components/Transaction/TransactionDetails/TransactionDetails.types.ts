import { ITransaction } from '../../../utils';

export interface ITransactionDetailsProps {
  transaction: ITransaction;
  onTransactionDeleted: (transactionId: string) => Promise<void>;
}
