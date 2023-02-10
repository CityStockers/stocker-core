import { Account } from "../Types/Account";

export function newAccount(userID: string): Account {
  return {
    userID: userID,
    wallets: [
      {
        symbol: "USD",
        amount: 1,
        avgPrice: 0,
      },
    ],
  };
}
