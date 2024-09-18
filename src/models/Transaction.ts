import { Category } from './Category';

// kod funkcionalnog programiranja ne koristimo class basec nista

export class Transaction {
  //ovaj dio bi postao tip podatka (utils/types)

  id: string;
  category: Category;
  amount: number;
  description: string;
  date: Date;

  // konstruktore pretvaramo u funkcije (utils/transactions.ts)

  constructor(description: string, amount: number, category: Category) {
    this.id = Math.random().toString(36);
    this.description = description;
    this.amount = amount;
    this.date = new Date();
    this.category = category;
  }
}
