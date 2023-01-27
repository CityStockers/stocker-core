import { Account } from "../Types/Account";

function genNewAccount(userID: string): Account {
  return {
    userID: userID,
    wallets: [
      {
        symbol: "USD",
        amount: 0,
      },
    ],
  };
}

export default genNewAccount;
