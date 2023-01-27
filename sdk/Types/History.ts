import firebase from "firebase/compat/app";

export type History = {
  userID: string;
  transactions: Transaction[];
};

export type Transaction = {
  symbol: string;
  type: TransactionType;
  amount: number;
  timestamp: firebase.firestore.FieldValue; // Date.getTime()
};

export type TransactionType = "BUY" | "SELL";
