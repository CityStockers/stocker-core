export type Account = {
  wallets: Wallet[];
  user_id: string;
};

export type Wallet = {
  currency: Currency;
  amount: number;
  histories: Transaction[];
};

export type Transaction = {
  currency: Currency;
  amount: number;
  timestamp: number; // Date.getTime()
};

export type Currency = {
  type: "CASH" | "CRYPTO" | "STOCK";
  ticker: string; // USD, BTCUSDT, AAPL, TSLA
  name: string; // Dollar, Bitcoin-Dollar, Apple Inc, Tesla
};

export default Account;
