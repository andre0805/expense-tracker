import { db } from '../firebase.config';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { Transaction, transactionConverter } from '../models/Transaction';

const COLLECTION_NAME = 'transactions';

export const getTransactions = async (uid: string) => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('uid', '==', uid),
    orderBy('date', 'desc'),
  );
  return getDocs(q);
};

export const addTransaction = async (transaction: Transaction) => {
  return addDoc(collection(db, COLLECTION_NAME), transactionConverter.toFirestore(transaction));
};

export const deleteTransaction = async (id: string) => {
  return deleteDoc(doc(db, COLLECTION_NAME, id));
};
