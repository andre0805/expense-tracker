import { Category } from '../enums';
import { ITransaction } from '../types';

export const createTransaction = (
  description: string,
  amount: number,
  category: Category,
): ITransaction => {
  return {
    id: Math.random().toString(36),
    description,
    amount,
    category,
    date: new Date(),
  };
};
