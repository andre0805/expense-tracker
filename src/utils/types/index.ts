import { Category } from '../enums';

// interface gledamo uvijek nazivati sa pocetnim I, tako da bi islo ITransaction

export interface ITransaction {
  id: string;
  category: Category;
  amount: number;
  description: string;
  date: Date;
}
