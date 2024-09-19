import { ITransaction } from '../types';
import { Category } from '../enums';
import { v4 as uuidV4 } from 'uuid';

export const createTransaction = (
  id: string | null = null,
  uid: string,
  description: string,
  amount: number,
  category: Category,
  date?: Date,
): ITransaction => {
  return {
    id: id ?? uuidV4(),
    uid,
    description,
    amount,
    category,
    date: date ?? new Date(),
  };
};

export const isIncome = (transaction: ITransaction) => {
  return transaction.category === Category.Income;
};

export const isExpense = (transaction: ITransaction) => {
  return transaction.category === Category.Expense;
};

export const getDateString = (transaction: ITransaction) => {
  return transaction.date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export const transactionConverter = {
  toFirestore: (transaction: ITransaction) => {
    return {
      ...transaction,
      date: transaction.date.toISOString(),
    };
  },
  fromFirestore: (snapshot: any, options: any): ITransaction => {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      uid: data.uid,
      description: data.description,
      amount: data.amount,
      category: data.category,
      date: new Date(data.date),
    };
  },
};
