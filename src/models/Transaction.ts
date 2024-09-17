import { Category } from './Category';

export class Transaction {
  id: string;
  category: Category;
  amount: number;
  description: string;
  date: Date;

  constructor(description: string, amount: number, category: Category) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.description = description;
    this.amount = amount;
    this.date = new Date();
    this.category = category;
  }
}
