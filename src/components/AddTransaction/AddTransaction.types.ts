import { ITransaction } from '../../utils';

export interface IAddTransactionProps {
  onTransactionAdded: (transaction: ITransaction) => Promise<void>;
}
