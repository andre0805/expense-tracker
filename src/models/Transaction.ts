import { Category } from './Category';

export class Transaction {
  id: string;
  uid: string;
  category: Category;
  amount: number;
  description: string;
  date: Date;

  constructor(
    id: string | null = null,
    uid: string,
    description: string,
    amount: number,
    category: Category,
    date?: Date,
  ) {
    this.id = id ?? Math.random().toString(36);
    this.uid = uid;
    this.description = description;
    this.amount = amount;
    this.date = date ?? new Date();
    this.category = category;
  }

  isIncome() {
    return this.category === Category.Income;
  }

  getDateString() {
    return this.date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  }
}

export const transactionConverter = {
  toFirestore: (transaction: Transaction) => {
    return {
      ...transaction,
      date: transaction.date.toISOString(),
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new Transaction(
      snapshot.id,
      data.uid,
      data.description,
      data.amount,
      data.category,
      new Date(data.date),
    );
  },
};
