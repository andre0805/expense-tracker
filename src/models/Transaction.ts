import { Category } from './Category';

export class Transaction {
  id: string;
  category: Category;
  amount: number;
  description: string;
  date: Date;
  dateString: string;

  constructor(description: string, amount: number, category: Category, date?: Date) {
    this.id = Math.random().toString(36);
    this.description = description;
    this.amount = amount;
    this.date = date ?? new Date();
    this.category = category;

    // Format date as Mar 23
    this.dateString = this.date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  }
}
