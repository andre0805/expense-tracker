import { Category } from '../enums';

export interface ITransaction {
  id: string;
  uid: string;
  category: Category;
  amount: number;
  description: string;
  date: Date;
}
