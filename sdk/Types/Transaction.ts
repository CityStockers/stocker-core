export type Transaction = {
  userID: string;
  symbol: string;
  type: TransactionType;
  amount: number;
  timestamp: number; // Date.getTime()
};

export type TransactionType = "BUY" | "SELL";
