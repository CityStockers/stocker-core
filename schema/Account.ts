export type Account = {
  wallets: Wallet;
  user_id: string;
};

export type Wallet = {
  type: CurrencyType;
  currency: string; // USD, BTCUSDT, AAPL
  amount: number;
  histories: Purchase[];
};

export type Purchase = {
  type: CurrencyType;
  currency: string;
  amount: number;
  timestamp: number; // Date.getTime()
};

export type CurrencyType = "CASH" | "CRYPTO" | "STOCK";
